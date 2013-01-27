using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using NodeJSLibrary;
using RedisLibrary;
namespace ChatServer
{
    public class ChatServer
    {
        private RedisClient client;
        private JsDictionary<string, List<UserModel>> registeredChannels = new JsDictionary<string, List<UserModel>>();

        public ChatServer()
        {
            var queueManager = new QueueManager("Chat1",
                                                new QueueManagerOptions(new[] {
                                                                                      new QueueWatcher("ChatServer", null),
                                                                              },
                                                                        new[] {"GatewayServer", "Gateway*"}));

            /*queueManager.AddChannel<ChatMessageRoomModel>("Area.Chat.SendMessageToRoom",
                                                          (sender, data) => {
                                                              client.RPush("ChatServer.ChatRoom." + data.Channel, data.User.UserName + ": " + data.Content);
                                                              foreach (var item in registeredChannels["ChatServer.ChatRoom." + data.Channel]) {
                                                                  queueManager.SendMessage(item, item.Gateway, "Area.Chat.MessageReceived", data);
                                                              }
                                                          });

            queueManager.AddChannel<ChatJoinRoomModel>("Area.Chat.JoinRoom",
                                                       (sender, data) => {
                                                           if (registeredChannels.ContainsKey(data.Channel))
                                                               registeredChannels[data.Channel].Add(sender);
                                                       });

            queueManager.AddChannel<ChatCreateRoomModel>("Area.Chat.CreateRoom",
                                                         (sender, data) => {
                                                             queueManager.qw.Add(new QueueWatcher("ChatServer.Room." + data.Channel, null));
                                                             registerChannel(data.Channel).Add(sender);
                                                         });*/

            var redis = Global.Require<Redis>("redis");
            client = redis.CreateClient(6379, IPs.RedisIP);
        }

        public static void Main()
        {
            try {
                new ChatServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
        }

        public void Cycle(string channel)
        {
            client.BLPop(new object[] {channel, 0}, (caller, dtj) => { Cycle(channel); });
        }

        private List<UserModel> registerChannel(string channel)
        {
            var chan = registeredChannels["ChatServer.ChatRoom." + channel] = new List<UserModel>();
            Cycle(channel);
            return chan;
        }
    }
    [Serializable]
    public sealed class ChatCreateRoomModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }

        public ChatCreateRoomModel(string channel)
        {
            Channel = channel;
        }
    }
    [Serializable]
    public sealed class ChatJoinRoomModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }

        public ChatJoinRoomModel(string channel)
        {
            Channel = channel;
        }
    }
    [Serializable]
    public sealed class ChatMessageRoomModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }
        [IntrinsicProperty]
        public UserModel User { get; set; }
        [IntrinsicProperty]
        public string Content { get; set; }

        public ChatMessageRoomModel(string channel, UserModel user, string content)
        {
            Channel = channel;
            User = user;
            Content = content;
        }
    }
    [Serializable]
    public sealed class SendMessageToRoomModel {}
}
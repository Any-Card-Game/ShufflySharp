using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using NodeJSLibrary;
using RedisLibrary;
using global;
namespace ChatServer
{
    public class ChatServer
    {

        private string chatServerIndex;

        public ChatServer()
        {
            new ArrayUtils();
            chatServerIndex = "ChatServer" + Guid.NewGuid();
            Global.Process.On("exit", () => Console.Log("exi ChatServer"));

            ChatManager chatManager = new ChatManager(chatServerIndex);
        }

        public static void Main()
        {
            try
            {
                new ChatServer();
            }
            catch (Exception exc)
            {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
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
    public sealed class SendMessageToRoomModel { }
}
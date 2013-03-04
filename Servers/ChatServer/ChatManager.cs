using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonServerLibraries;
using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
namespace ChatServer
{
    public class ChatManager
    {
        private readonly DataManager myDataManager;
        private ChatClientManager myServerManager;
        private List<ChatRoomModel> runningRooms = new List<ChatRoomModel>();

        public ChatManager(string chatServerIndex)
        {
            myDataManager = new DataManager();
            myServerManager = new ChatClientManager(chatServerIndex);

            myServerManager.OnCreateChatChannel += OnCreateChatChannel;
            myServerManager.OnJoinChatChannel += OnJoinChatChannel;
            myServerManager.OnSendMessage += OnSendMessage;
            myServerManager.OnLeaveChatRoom += OnLeaveChatRoom;

            myServerManager.OnUserDisconnect += OnUserDisconnect;
        }

        private void OnLeaveChatRoom(UserLogicModel user)
        {
            leaveChatRoom(user);
        }

        private void leaveChatRoom(UserLogicModel user)
        {
            ExtensionMethods.debugger();
            var room = getRoomFromUser(user);
            if (room == null) throw new Exception("idk");

            foreach (var userLogicModel in room.Users) {
                if (userLogicModel.Hash == user.Hash) {
                    room.Users.Remove(userLogicModel);
                    break;
                }
            }
            myDataManager.ChatData.RemoveUser(room,
                                              user,
                                              (a) => {
                                                  myServerManager.UnregisterChatServer(user);
                                                  var roomToSend = new ChatRoomModel(room.RoomName, room.Users, null);

                                                  foreach (var userLogicModel in room.Users) {
                                                      myServerManager.SendChatInfo(userLogicModel, roomToSend);
                                                  }
                                              });
        }

        private void OnSendMessage(UserLogicModel user, SendChatMessageModel data)
        {
            var room = getRoomFromUser(user);
            if (room == null)
                throw new Exception("idk");

            myDataManager.ChatData.AddChatLine(user,
                                               room,
                                               data.Message,
                                               a => {
                                                   foreach (var userLogicModel in room.Users) {
                                                       myServerManager.SendChatLines(userLogicModel, new ChatMessagesModel(new List<ChatMessageRoomModel>() {a}));
                                                   }
                                               });
        }

        private ChatRoomModel getRoomFromUser(UserLogicModel user)
        {
            ChatRoomModel currentRoom = null;
            foreach (var chatRoomModel in runningRooms) {
                foreach (var item in chatRoomModel.Users) {
                    if (item.UserName == user.UserName) currentRoom = chatRoomModel;
                }
            }
            return currentRoom;
        }

        private void OnJoinChatChannel(UserLogicModel user, JoinChatRoomRequest data)
        {
            var cur = getRoomFromUser(user);
            if (cur != null) leaveChatRoom(user);

            ChatRoomModel currentRoom = null;
            foreach (var chatRoomModel in runningRooms) {
                if (chatRoomModel.RoomName == data.Room.ChatChannel)
                    currentRoom = chatRoomModel;
            }
            if (currentRoom == null)
                throw new Exception("idk");


            myDataManager.ChatData.AddUser(currentRoom,
                                           user,
                                           room => {
                                               myServerManager.RegisterChatServer(user);
                                               var roomToSend = new ChatRoomModel(room.RoomName, room.Users, room.Messages);

                                               roomToSend.Messages = room.Messages.Extract(room.Messages.Count - 5);
                                               myServerManager.SendChatInfo(user, roomToSend);

                                               roomToSend = new ChatRoomModel(room.RoomName, room.Users, null);

                                               foreach (var userLogicModel in currentRoom.Users) {
                                                   myServerManager.SendChatInfo(userLogicModel, roomToSend);
                                               }
                                           });
        }

        private void OnCreateChatChannel(UserLogicModel user, CreateChatRoomRequest data)
        {
            var cur = getRoomFromUser(user);
            if (cur != null)
                leaveChatRoom(user);
            myDataManager.SiteData.Room_SetChatServer(data.Room,
                                                      myServerManager.ChatServerIndex,
                                                      (r) => {
                                                          myDataManager.ChatData.CreateChatChannel(data.Room.ChatChannel,
                                                                                                   user,
                                                                                                   a => {
                                                                                                       myServerManager.RegisterChatServer(user);

                                                                                                       runningRooms.Add(a);
                                                                                                       myServerManager.SendChatInfo(user, a);
                                                                                                   });
                                                      });


        }

        private void OnUserDisconnect(UserLogicModel user, UserDisconnectModel data)
        {
            Logger.Log("Awww, dat " + user.UserName + " disconnected", LogLevel.DebugInformation);
            myServerManager.UnregisterChatServer(user);
            leaveChatRoom(user);

            //removeUserFromRoom(data.User, (room) => { });
        }
    }
}
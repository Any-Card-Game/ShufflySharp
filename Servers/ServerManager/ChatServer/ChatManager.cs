using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using DataModels.ChatManagerModels;
using Models;
using Models.ChatManagerModels;
using NodeLibraries.Common.Logging;
using DataManager = CommonShuffleLibrary.DataManager;
namespace ServerManager.ChatServer
{
    public class ChatManager
    {
        private readonly DataManager myDataManager;
        private ChatClientManager myServerManager;
        private List<ChatRoomDataModel> runningRooms = new List<ChatRoomDataModel>();

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
            //ExtensionMethods.debugger();
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
                                                  var roomToSend = new ChatRoomDataModel(room.RoomName, room.Users, null);

                                                         if (room.Users.Count == 0)
                                                         {
                                                             myDataManager.ChatData.RemoveRoom(room, () => { });
                                                             return;
                                                         }

                                                  foreach (var userLogicModel in room.Users) {
                                                      myServerManager.SendChatInfo(userLogicModel, roomToSend.ToModel());
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

        private ChatRoomDataModel getRoomFromUser(UserLogicModel user)
        {
            ChatRoomDataModel currentRoomData = null;
            foreach (var chatRoomModel in runningRooms) {
                foreach (var item in chatRoomModel.Users) {
                    if (item.UserName == user.UserName) currentRoomData = chatRoomModel;
                }
            }
            return currentRoomData;
        }

        private void OnJoinChatChannel(UserLogicModel user, JoinChatRoomRequest data)
        {
            var cur = getRoomFromUser(user);
            if (cur != null) leaveChatRoom(user);

            ChatRoomDataModel currentRoomData = null;
            foreach (var chatRoomModel in runningRooms) {
                if (chatRoomModel.RoomName == data.Room.ChatChannel)
                    currentRoomData = chatRoomModel;
            }
            if (currentRoomData == null)
                throw new Exception("idk");


            myDataManager.ChatData.AddUser(currentRoomData,
                                           user,
                                           room => {
                                               myServerManager.RegisterChatServer(user);
                                               var roomToSend = new ChatRoomDataModel(room.RoomName, room.Users, room.Messages);

                                               roomToSend.Messages = room.Messages.Extract(room.Messages.Count - 5);
                                               myServerManager.SendChatInfo(user, roomToSend.ToModel());

                                               roomToSend = new ChatRoomDataModel(room.RoomName, room.Users, null);

                                               foreach (var userLogicModel in currentRoomData.Users) {
                                                   myServerManager.SendChatInfo(userLogicModel, roomToSend.ToModel() );
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
                                                                                                       myServerManager.SendChatInfo(user, a.ToModel());
                                                                                                   });
                                                      });


        }

        private void OnUserDisconnect(UserLogicModel user, UserDisconnectModel data)
        {
            ServerLogger.Log("Awww, dat " + user.UserName + " disconnected", LogLevel.DebugInformation);
            myServerManager.UnregisterChatServer(user);
            leaveChatRoom(user);

            //removeUserFromRoom(data.User, (room) => { });
        }
    }
}
using System;
using System.Collections.Generic;
using CommonLibraries;
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

            myServerManager.OnUserDisconnect += OnUserDisconnect;
        }

        private void OnSendMessage(UserModel user, SendChatMessageModel data)
        {
            var room = getRoomFromUser(user);
            if (room == null)
                throw new Exception("idk");

            myDataManager.ChatData.AddChatLine(user,
                                               room,
                                               data.Message,
                                               a => {
                                                   foreach (var userModel in room.Users) {
                                                       myServerManager.SendChatLines(userModel, new ChatMessagesModel(new List<ChatMessageRoomModel>() {a}));
                                                   }
                                               });
        }

        private ChatRoomModel getRoomFromUser(UserModel user)
        {
            ChatRoomModel currentRoom = null;
            foreach (var chatRoomModel in runningRooms) {
                foreach (var item in chatRoomModel.Users) {
                    if (item.UserName == user.UserName) currentRoom = chatRoomModel;
                }
            }
            return currentRoom;
        }

        private void OnJoinChatChannel(UserModel user, JoinChatRoomRequest data)
        {
            ChatRoomModel currentRoom = null;
            foreach (var chatRoomModel in runningRooms) {
                if (chatRoomModel.RoomName == data.RoomName)
                    currentRoom = chatRoomModel;
            }
            if (currentRoom == null)
                throw new Exception("idk");

            myDataManager.ChatData.AddUser(currentRoom,
                                           user,
                                           room => {
                                               ExtensionMethods.debugger();
                                               var roomToSend = new ChatRoomModel(room.RoomName, room.Users, room.Messages);

                                               roomToSend.Messages = room.Messages.Extract(room.Messages.Count - 5);
                                               myServerManager.SendChatInfo(user, roomToSend);

                                               roomToSend = new ChatRoomModel(room.RoomName, room.Users, null);

                                               foreach (var userModel in currentRoom.Users) {
                                                   myServerManager.SendChatInfo(userModel, roomToSend);
                                               }
                                           });
        }

        private void OnCreateChatChannel(UserModel user, CreateChatRoomRequest data)
        {
            myDataManager.ChatData.CreateChatChannel(data.RoomName,
                                                     user,
                                                     a => {
                                                         runningRooms.Add(a);
                                                         myServerManager.SendChatInfo(user, a);
                                                     });
        }

        /*todo 
         * chat create channel  
         *  notify gateway of the new chatserver for specific user
         * join chat 
         *  notify gateway of new chatserver for specific user 
         * chat server on disconnect remove
         */

        private void OnUserDisconnect(UserModel user, UserDisconnectModel data)
        {
            Console.Log("Awww, dat " + user.UserName + " disconnected");
            //removeUserFromRoom(data.User, (room) => { });
        }
    }
}
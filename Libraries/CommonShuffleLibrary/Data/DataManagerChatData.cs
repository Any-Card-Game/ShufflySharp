using System;
using System.Collections.Generic;
using CommonLibraries;
using Models;
using Models.ChatManagerModels;
using MongoDBLibrary;
namespace CommonShuffleLibrary.Data
{
    public class DataManagerChatData
    {
        private DataManager manager;

        public DataManagerChatData(DataManager manager)
        {
            this.manager = manager;
        }

        public void CreateChatChannel(string roomName, UserModel user, Action<ChatRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          ChatRoomModel chatRoomModel = new ChatRoomModel(roomName, new List<UserModel>() {user}, new List<ChatMessageRoomModel>());
                                          collection.Insert(chatRoomModel);
                                          complete(chatRoomModel);
                                      });
        }

        public void AddChatLine(UserModel user, ChatRoomModel room, string message, Action<ChatMessageRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          ChatMessageRoomModel messageModel = new ChatMessageRoomModel(user, message, DateTime.Now);
                                          collection.Update(new {_id = room.ID},
                                                            new MongoUpdateStructure(push: new {messages = messageModel}),
                                                            (err2) => {
                                                                if (err2 != null)
                                                                    Console.Log("Data Error: " + err2);
                                                                room.Messages.Add(messageModel);
                                                                complete(messageModel);
                                                            });
                                      });
        }

        public void AddUser(ChatRoomModel currentRoom, UserModel user, Action<ChatRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          collection.Update(new {_id = currentRoom.ID},
                                                            new MongoUpdateStructure(push: new {users = user}),
                                                            (err2) => {
                                                                if (err2 != null) Console.Log("Data Error: " + err2);
                                                                currentRoom.Users.Add(user);

                                                                complete(currentRoom);
                                                            });
                                      });
        }
    }
}
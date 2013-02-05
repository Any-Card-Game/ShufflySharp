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

        public void CreateChatChannel(string roomName, UserLogicModel user, Action<ChatRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          ChatRoomModel chatRoomModel = new ChatRoomModel(roomName, new List<UserLogicModel>() {user}, new List<ChatMessageRoomModel>());
                                        collection.Insert(chatRoomModel);
                                          complete(chatRoomModel);
                                      });
        }

        public void AddChatLine(UserLogicModel user, ChatRoomModel room, string message, Action<ChatMessageRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          ChatMessageRoomModel messageModel = new ChatMessageRoomModel(user, message, DateTime.Now);

                                          JsDictionary<string, object> query = new JsDictionary<string, object>();

                                          query["$push"] = new {messages = messageModel};

                                          collection.Update(new { _id = MongoDocument.GetID(room.ID )},
                                                            query,
                                                            (err2) => {
                                                                if (err2 != null)
                                                                    Console.Log("Data Error: " + err2);
                                                                room.Messages.Add(messageModel);
                                                                complete(messageModel);
                                                            });
                                      });
        }

        public void AddUser(ChatRoomModel room, UserLogicModel user, Action<ChatRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          JsDictionary<string, object> query = new JsDictionary<string, object>();

                                          query["$push"] = new {users = user};

                                          collection.Update(new { _id = MongoDocument.GetID(room.ID) },
                                                            query,
                                                            (err2) => {
                                                                if (err2 != null) Console.Log("Data Error: " + err2);
                                                                room.Users.Add(user);

                                                                complete(room);
                                                            });
                                      });
        }

        public void RemoveUser(ChatRoomModel room, UserLogicModel user, Action<ChatRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          JsDictionary<string, object> query = new JsDictionary<string, object>();

                                          query["$pop"] = new {users = user};

                                          collection.Update(new { _id = MongoDocument.GetID(room.ID) },
                                                            query,
                                                            (err2) => {
                                                                if (err2 != null) Console.Log("Data Error: " + err2);
                                                                room.Users.Remove(user);

                                                                complete(room);
                                                            });
                                      });
        }
    }
}
using System;
using System.Collections.Generic;
using CommonLibraries;
using DataModels.ChatManagerModels;
using Models;
using Models.ChatManagerModels;
using NodeLibraries.Common.Logging;
using NodeLibraries.MongoDB;
namespace CommonShuffleLibrary.Data
{
    public class DataManagerChatData
    {
        private DataManager manager;

        public DataManagerChatData(DataManager manager)
        {
            this.manager = manager;
        }

        public void CreateChatChannel(string roomName, UserLogicModel user, Action<ChatRoomDataModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          ChatRoomDataModel chatRoomDataModel = new ChatRoomDataModel(roomName, new List<UserLogicModel>() {user}, new List<ChatMessageRoomModel>());
                                        collection.Insert(chatRoomDataModel);
                                          complete(chatRoomDataModel);
                                      });
        }

        public void AddChatLine(UserLogicModel user, ChatRoomDataModel roomData, string message, Action<ChatMessageRoomModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          ChatMessageRoomModel messageModel = new ChatMessageRoomModel(user, message, DateTime.Now);

                                          JsDictionary<string, object> query = new JsDictionary<string, object>();

                                          query["$push"] = new {messages = messageModel};

                                          collection.Update(new { _id = MongoDocument.GetID(roomData.ID )},
                                                            query,
                                                            (err2) => {
                                                                if (err2 != null)
                                                                    ServerLogger.Log("Data Error: " + err2,LogLevel.Error);
                                                                roomData.Messages.Add(messageModel);
                                                                complete(messageModel);
                                                            });
                                      });
        }

        public void AddUser(ChatRoomDataModel roomData, UserLogicModel user, Action<ChatRoomDataModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) => {
                                          JsDictionary<string, object> query = new JsDictionary<string, object>();

                                          query["$push"] = new {users = user};

                                          collection.Update(new { _id = MongoDocument.GetID(roomData.ID) },
                                                            query,
                                                            (err2) => {
                                                                if (err2 != null) ServerLogger.Log("Data Error: " + err2,LogLevel.Error);
                                                                roomData.Users.Add(user);

                                                                complete(roomData);
                                                            });
                                      });
        }

        public void RemoveUser(ChatRoomDataModel roomData, UserLogicModel user, Action<ChatRoomDataModel> complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) =>
                                      {
                                          JsDictionary<string, object> query = new JsDictionary<string, object>();

                                          query["$pop"] = new { users = user };

                                          collection.Update(new { _id = MongoDocument.GetID(roomData.ID) },
                                                            query,
                                                            (err2) =>
                                                            {
                                                                if (err2 != null) ServerLogger.Log("Data Error: " + err2, LogLevel.Error);
                                                                roomData.Users.Remove(user);

                                                                complete(roomData);
                                                            });
                                      });
        }
        public void RemoveRoom(ChatRoomDataModel roomData, Action complete)
        {
            manager.client.Collection("ChatRoom",
                                      (err, collection) =>
                                      {
                                          
                                          collection.Remove(new { _id = MongoDocument.GetID(roomData.ID) } );

                                          complete();
                                      });
        }
    }
}
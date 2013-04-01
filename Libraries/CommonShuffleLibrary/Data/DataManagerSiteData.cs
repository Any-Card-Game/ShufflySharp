using System;
using System.Collections.Generic;
using CommonLibraries;
using Models;
using Models.SiteManagerModels;
using NodeLibraries.Common.Logging;
using NodeLibraries.MongoDB;
namespace CommonShuffleLibrary.Data
{
    public class DataManagerSiteData
    {
        private DataManager manager;

        public DataManagerSiteData(DataManager manager)
        {
            this.manager = manager;
        }

        public void User_Insert(UserModelData data)
        {
            manager.client.Collection("User", (err, collection) => { collection.Insert(data); });
        }

        public void User_GetFirstByUsernamePassword(string username, string password, Action<List<UserModelData>> results)
        {
            manager.client.Collection("User",
                                      (err, collection) =>
                                      {
                                          var j = new { username, password };

                                          MongoHelper.Find<UserModelData>(collection, j, (a, b) => results(b));
                                      });
        }

        public void Room_GetRoomByUser(UserLogicModel user, Action<RoomData> results)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          JsDictionary<string, object> j = new JsDictionary<string, object>();
                                          j["players.userName"] = user.UserName;
                                          MongoHelper.Find<RoomData>(collection, j, (a, b) => results(b.Count > 0 ? b[0] : null));
                                      });
        }

        public void Room_GetAllByGameType(string gameType, Action<List<RoomData>> results)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          var j = new { gameType };
                                          MongoHelper.Find<RoomData>(collection, j, (a, b) => results(b));
                                      });
        }

        public void Room_CreateRoom(string gameType, string roomName, UserLogicModel user, Action<RoomData> onRoomCreated)
        {
            ExtensionMethods.debugger();

            RoomData rd = new RoomData(gameType, roomName, roomName + "RoomName", roomName + "GameRoom", new List<UserLogicModel>() { user });
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          collection.Insert(rd);
                                          
                                          onRoomCreated(rd);
                                      });
        }

        public void Room_JoinRoom(string gameType, string roomName, UserLogicModel user, Action<RoomData> onRoomJoined)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          var j = new { gameType, roomName };
                                          MongoHelper.Find<RoomData>(collection,
                                                                     j,
                                                                     (a, b) =>
                                                                     {
                                                                         if (b.Count == 0)
                                                                             onRoomJoined(null);
                                                                         else
                                                                         {
                                                                             var roomData = b[0]; 
                                                                             Room_AddPlayer(roomData, user, (ro) =>
                                                                             {
                                                                                 onRoomJoined(roomData);

                                                                             });
                                                                         }
                                                                     });
                                      });
        }

        public void Room_GetByRoomName(string gameType, string roomName, Action<RoomData> results)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          var j = new { gameType, roomName };
                                          MongoHelper.Find<RoomData>(collection, j, (a, b) => results(b.Count > 0 ? b[0] : null));
                                      });
        }

        public void Room_AddPlayer(RoomData room, UserLogicModel user, Action<RoomData> complete)
        {
            manager.client.Collection("Room",
                          (err, collection) =>
                          {

                              JsDictionary<string, object> query = new JsDictionary<string, object>();

                              query["$push"] = new { players = user };

                              collection.Update(new { _id = MongoDocument.GetID(room.ID) },
                                                query,
                                                (err2) =>
                                                {
                                                    if (err2 != null)
                                                        Logger.Log("Data Error: " + err2, LogLevel.Error);
                                                    room.Players.Add(user);

                                                    complete(room);
                                                });
                          });

        }
        public void Room_RemovePlayer(RoomData room, UserLogicModel user, Action<RoomData> complete)
        {
            manager.client.Collection("Room",
                          (err, collection) =>
                          {

                              JsDictionary<string, object> query = new JsDictionary<string, object>();

                              query["$pop"] = new { players = user };

                              collection.Update(new { _id = MongoDocument.GetID(room.ID) },
                                                query,
                                                (err2) =>
                                                {
                                                    if (err2 != null)
                                                        Logger.Log("Data Error: " + err2,LogLevel.Error);
                                                    foreach (var userLogicModel in room.Players)
                                                    {
                                                        if (userLogicModel.UserName == user.UserName)
                                                        {
                                                            room.Players.Remove(userLogicModel);
                                                            break;
                                                        }
                                                    }

                                                    complete(room);
                                                });
                          });

        }

        public void Room_DeleteRoom(RoomData room)
        {
            manager.client.Collection("Room", (err, collection) => { collection.Remove(new { _id = MongoDocument.GetID(room.ID) }); });
        }

        public void Room_SetChatServer(RoomData room, string chatServerIndex, Action<object> complete)
        {
            manager.client.Collection("Room",
                 (err, collection) =>
                 {

                     JsDictionary<string, object> query = new JsDictionary<string, object>();
                     query["$set"] = new {chatServer = chatServerIndex};
                     collection.Update(new { _id = MongoDocument.GetID(room.ID) },
                                       query,
                                       (err2) =>
                                       {
                                           if (err2 != null)
                                               Logger.Log("Data Error: " + err2, LogLevel.Error);
                                           room.ChatServer = chatServerIndex;

                                           complete(room);
                                       });
                 });

        }
    }
}
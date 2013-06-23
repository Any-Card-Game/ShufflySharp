using System;
using System.Collections.Generic;
using CommonLibraries;
using DataModels.SiteManagerModels;
using DataModels.SiteManagerModels.Game;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;
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

        public void User_Insert(UserModelData data, Action result)
        {
            manager.client.Collection("User",
                                      (err, collection) => {
                                          collection.Insert(data);
                                          result();
                                      });
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
        public void User_CheckUsernameExists(string username, Action<bool> results)
        {
            manager.client.Collection("User",
                                      (err, collection) =>
                                      {
                                          var j = new { username };

                                          MongoHelper.Find<UserModelData>(collection, j, (a, b) => results(b.Count>0));
                                      });
        }

        public void Room_GetRoomByUser(UserLogicModel user, Action<RoomDataModel> results)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          JsDictionary<string, object> j = new JsDictionary<string, object>();
                                          j["players.userName"] = user.UserName;
                                          MongoHelper.Find<RoomDataModel>(collection, j, (a, b) => results(b.Count > 0 ? b[0] : null));
                                      });
        }

        public void Room_GetAllByGameType(string gameType, Action<List<RoomDataModel>> results)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          var j = new { gameType };
                                          MongoHelper.Find<RoomDataModel>(collection, j, (a, b) => results(b));
                                      });
        }

        public void Room_CreateRoom(string gameType, string roomName, UserLogicModel user, Action<RoomDataModel> onRoomCreated)
        {
            //ExtensionMethods.debugger();

            RoomDataModel rd = new RoomDataModel(gameType, roomName, roomName + "RoomName", roomName + "GameRoom", new List<UserLogicModel>() { user });
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          collection.Insert(rd);
                                          
                                          onRoomCreated(rd);
                                      });
        }

        public void Room_JoinRoom(string gameType, string roomName, UserLogicModel user, Action<RoomDataModel> onRoomJoined)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          var j = new { gameType, roomName };
                                          MongoHelper.Find<RoomDataModel>(collection,
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

        public void Room_GetByRoomName(string gameType, string roomName, Action<RoomDataModel> results)
        {
            manager.client.Collection("Room",
                                      (err, collection) =>
                                      {
                                          var j = new { gameType, roomName };
                                          MongoHelper.Find<RoomDataModel>(collection, j, (a, b) => results(b.Count > 0 ? b[0] : null));
                                      });
        }

        public void Room_AddPlayer(RoomDataModel room, UserLogicModel user, Action<RoomDataModel> complete)
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
        public void Room_RemovePlayer(RoomDataModel room, UserLogicModel user, Action<RoomDataModel> complete)
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

        public void Room_DeleteRoom(RoomDataModel room)
        {
            manager.client.Collection("Room", (err, collection) => { collection.Remove(new { _id = MongoDocument.GetID(room.ID) }); });
        }

        public void Room_SetChatServer(RoomModel room, string chatServerIndex, Action<RoomModel> complete)
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

        public void Game_GetGamesByUser(string userHash, Action<List<GameDataModel>> action)
        {
            manager.client.Collection("Games",
                                      (err, collection) =>
                                      {

                                          var j = new { userHash };
                                          MongoHelper.Find<GameDataModel>(collection, j, (a, b) => action(b));
                                      });
        }
        public void Game_CreateGame(string userHash, string gameName, Action result)
        {
            manager.client.Collection("Games",
                                      (err, collection) =>
                                      {
                                          collection.Insert(new GameDataModel()
                                          {
                                              UserHash = userHash,
                                              Name = gameName
                                          });
                                          result();
                                      });
        }

        public void Game_GameNameExists(string gameName, Action<bool> result)
        {
            manager.client.Collection("Games",
                                      (err, collection) => {
                                          var j = new {name = gameName};
                                          MongoHelper.Find<GameDataModel>(collection, j, (a, b) => result(b.Count > 0));
                                      });
        }

        public void Game_UpdateGame(GameModel model, Action result)
        {
            manager.client.Collection("Games",
                                      (err, collection) =>
                                      {
                                          collection.Save(new GameDataModel()
                                          {
                                              ID = model.ID,
                                              Name = model.Name,
                                              UserHash = model.UserHash,
                                              Description = model.Description,
                                              MaxNumberOfPlayers = model.MaxNumberOfPlayers,
                                              CardImages = model.CardImages,
                                              Assets = model.Assets,
                                              GameCode = model.GameCode,
                                              GameLayout = model.GameLayout,
                                              GameLayoutScenarios = model.GameLayoutScenarios,
                                              Effects = model.Effects,
                                          });
                                          result();

                                      });
        }
    }
}
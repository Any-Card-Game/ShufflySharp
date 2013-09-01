using System;
using System.Collections.Generic;
using CommonShuffleLibrary;
using DataModels.SiteManagerModels;
using Models;
using Models.ChatManagerModels;
using Models.GameManagerModels;
using Models.SiteManagerModels;
using NodeLibraries.Common.Logging;
using DataManager = CommonShuffleLibrary.DataManager;
namespace ServerManager.SiteServer
{
    public class SiteManager
    {
        private readonly DataManager myDataManager;
        private SiteClientManager mySiteClientManager;

        public SiteManager(string siteServerIndex)
        {
            myDataManager = new DataManager();
            mySiteClientManager = new SiteClientManager(siteServerIndex);

            mySiteClientManager.OnUserLogin += OnUserLogin;
            mySiteClientManager.OnUserCreate += OnUserCreate;
            mySiteClientManager.OnGetGameTypes += OnGetGameTypes;
            mySiteClientManager.OnGetRoomInfo += OnGetRoomInfo;
            mySiteClientManager.OnGetRooms += OnGetRooms;
            mySiteClientManager.OnCreateRoom += OnCreateRoom;
            mySiteClientManager.OnJoinRoom += OnJoinRoom;
            mySiteClientManager.OnLeaveRoom += OnLeaveRoom;
            mySiteClientManager.OnStartGame += OnStartGame;


            mySiteClientManager.OnGetGamesByUser += OnGetGamesByUser;
            mySiteClientManager.OnDoesGameNameExist += OnDoesGameNameExist;
            mySiteClientManager.OnDeveloperCreateGame += OnDeveloperCreateGame;
            mySiteClientManager.OnDeveloperUpdateGame += OnDeveloperUpdateGame;

            mySiteClientManager.OnUserDisconnect += OnUserDisconnect;
        }



        private void OnLeaveRoom(UserLogicModel user, LeaveRoomRequest data)
        {
            ServerLogger.LogDebug(user.UserName + " manual leave", user);
            removeUserFromRoom(user, (room) => { });
        }

        private void OnUserDisconnect(UserLogicModel user, UserDisconnectModel data)
        {
            ServerLogger.LogDebug("Awww, dat " + user.UserName + " disconnected " + DateTime.Now, user);
            removeUserFromRoom(data.User, (room) => { });
        }

        private void removeUserFromRoom(UserLogicModel user, Action<RoomModel> result)
        {
            ServerLogger.LogDebug(user.UserName + " removing", user);
            myDataManager.SiteData.Room_GetRoomByUser(user,
                                                      room =>
                                                      {
                                                          if (room == null)
                                                          {
                                                              result(null);
                                                              return;
                                                          }
                                                          if (user.CurrentChatServer != null)
                                                              mySiteClientManager.LeaveChatRoom(user);
                                                          if (user.CurrentGameServer != null)
                                                          {
                                                              mySiteClientManager.LeaveGameRoom(user);
                                                              ServerLogger.LogDebug(user.UserName + " left Game room", user);
                                                              user.CurrentGameServer = null;
                                                          }
                                                          foreach (var player in room.Players)
                                                          {
                                                              if (player.UserName == user.UserName) room.Players.Remove(player);
                                                          }
                                                          if (room.Players.Count == 0)
                                                              myDataManager.SiteData.Room_DeleteRoom(room);
                                                          else
                                                          {
                                                              myDataManager.SiteData.Room_RemovePlayer(room, user, (ro) =>
                                                              {
                                                                  foreach (var userLogicModel in room.Players)
                                                                  {
                                                                      mySiteClientManager.SendRoomInfo(userLogicModel, new GetRoomInfoResponse(room.ToModel()));
                                                                  }

                                                              });
                                                          }
                                                          result(room.ToModel());
                                                      });
        }

        private void OnGetRooms(UserLogicModel user, GetRoomsRequest data)
        {
            myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { mySiteClientManager.SendRooms(user, new GetRoomsResponse(a.Map(b => b.ToModel()))); });
        }
        private void OnStartGame(UserLogicModel user, StartGameRequest data)
        {
            //   ServerLogger.Log("--game started 1 ", LogLevel.DebugInformation);

            myDataManager.SiteData.Room_GetRoomByUser(user,
                                          room =>
                                          {
                                              if (room == null)
                                              {
                                                  throw new Exception("idk");
                                              }
                                              //       ServerLogger.Log("--game started 2", LogLevel.DebugInformation);

                                              mySiteClientManager.CreateGame(new GameCreateRequestModel(room.GameType, room.Players));
                                          });



        }

        private void OnGetRoomInfo(UserLogicModel user, GetRoomInfoRequest data)
        {
            myDataManager.SiteData.Room_GetByRoomName(data.GameType, data.RoomName, a => { mySiteClientManager.SendRoomInfo(user, new GetRoomInfoResponse(a.ToModel())); });
        }

        private void OnCreateRoom(UserLogicModel user, CreateRoomRequest data)
        {

            ServerLogger.LogDebug(user.UserName + " create room", user);
            removeUserFromRoom(user,
                               disconnectedRoom =>
                               {
                                   myDataManager.SiteData.Room_CreateRoom(data.GameType,
                                                                          data.RoomName,
                                                                          user,
                                                                          (room) =>
                                                                          {
                                                                              mySiteClientManager.CreateChatRoom(user, new CreateChatRoomRequest(room.ToModel()));

                                                                              mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room.ToModel()));
                                                                              myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { mySiteClientManager.SendRooms(user, new GetRoomsResponse(a.Map(b => b.ToModel()))); });
                                                                          });
                               });
        }

        private void OnJoinRoom(UserLogicModel user, RoomJoinRequest data)
        {
            ServerLogger.LogDebug(user.UserName + " join room", user);

            removeUserFromRoom(user,
                               disconnectedRoom =>
                               {
                                   myDataManager.SiteData.Room_JoinRoom(data.GameType,
                                                                        data.RoomName,
                                                                        user,
                                                                        (room) =>
                                                                        {
                                                                            mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room.ToModel()));
                                                                            mySiteClientManager.JoinChatRoom(user, new JoinChatRoomRequest(room.ToModel()));

                                                                            foreach (var UserLogicModel in room.Players)
                                                                            {
                                                                                mySiteClientManager.SendRoomInfo(UserLogicModel, new GetRoomInfoResponse(room.ToModel()));
                                                                            }
                                                                        }
                                           );
                               });
        }

        private void OnGetGameTypes(UserLogicModel user)
        {
            var types = new List<GameTypeModel>() { new GameTypeModel("Blackjack"), new GameTypeModel("Sevens"), new GameTypeModel("NewSevens") };

            mySiteClientManager.SendGameTypes(user, new GetGameTypesReceivedResponse(types));
        }

        private void OnUserLogin(UserLogicModel user, SiteLoginRequest data)
        {
            myDataManager.SiteData.User_GetFirstByUsernamePassword(user.UserName,
                                                                   user.Password,
                                                                   (users) =>
                                                                   {
                                                                       mySiteClientManager.SendLoginResponse(user, users.Count != 0);
                                                                   });
        }
        private void OnUserCreate(UserLogicModel user, SiteCreateUserRequest data)
        {
            myDataManager.SiteData.User_CheckUsernameExists(data.UserName,
                                               (exists) =>
                                               {
                                                   if (!exists) {
                                                       myDataManager.SiteData.User_Insert(new UserModelData() {Username = data.UserName, Password = data.Password},
                                                                                          () => {
                                                                                              mySiteClientManager.SendCreateResponse(user, true);
                                                                                          });
                                                   } else {
                                                       mySiteClientManager.SendCreateResponse(user, false);
                                                       
                                                   }
                                               });
            

        }



        private void OnGetGamesByUser(UserLogicModel user, GetGamesByUserRequest data)
        {
            myDataManager.SiteData.Game_GetGamesByUser(data.UserHash,
                                      (games) =>
                                      {
                                          mySiteClientManager.SendGamesByUser(user, new GetGamesByUserResponse(games.Map(a => a.ToModel())));
                                      });
        }
        private void OnDoesGameNameExist(UserLogicModel user, DoesGameExistRequest data)
        {
            myDataManager.SiteData.Game_GameNameExists(data.GameName,
                                      (exists) =>
                                      {
                                          mySiteClientManager.SendDoesGameNameExist(user, new DoesGameExistResponse(data.GameName, exists));
                                      });


        }
        private void OnDeveloperUpdateGame(UserLogicModel user, DeveloperUpdateGameRequest data)
        {
            myDataManager.SiteData.Game_UpdateGame(data.GameModel,
                             (success) =>
                             {
                                 mySiteClientManager.SendUpdateGameResponse(user, new DeveloperUpdateGameResponse(success));
                             });

        }

        private void OnDeveloperCreateGame(UserLogicModel user, DeveloperCreateGameRequest data)
        {
            myDataManager.SiteData.Game_CreateGame(user.Hash,data.GameName,
                             (game) =>
                             {
                                 mySiteClientManager.SendCreateGameResponse(user, new DeveloperCreateGameResponse(game.ToModel()));
                             });

        }
    }
}
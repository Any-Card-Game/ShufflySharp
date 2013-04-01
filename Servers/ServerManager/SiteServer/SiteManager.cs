using System;
using System.Collections.Generic;
using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
using Models.GameManagerModels;
using Models.SiteManagerModels;
using NodeLibraries.Common.Logging;
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
            mySiteClientManager.OnGetGameTypes += OnGetGameTypes;
            mySiteClientManager.OnGetRoomInfo += OnGetRoomInfo;
            mySiteClientManager.OnGetRooms += OnGetRooms;
            mySiteClientManager.OnCreateRoom += OnCreateRoom;
            mySiteClientManager.OnJoinRoom += OnJoinRoom;
            mySiteClientManager.OnLeaveRoom += OnLeaveRoom;
            mySiteClientManager.OnStartGame += OnStartGame;

            mySiteClientManager.OnUserDisconnect += OnUserDisconnect;
        }

        private void OnLeaveRoom(UserLogicModel user, LeaveRoomRequest data)
        {
            Logger.Log(user.UserName + " manual leave", LogLevel.DebugInformation);
            removeUserFromRoom(user, (room) => { });
        }

        private void OnUserDisconnect(UserLogicModel user, UserDisconnectModel data)
        {
            Logger.Log(user.UserName + " disconnected", LogLevel.DebugInformation);
            removeUserFromRoom(data.User, (room) => { });
        }

        private void removeUserFromRoom(UserLogicModel user, Action<RoomData> result)
        {
            Logger.Log(user.UserName + " removing", LogLevel.DebugInformation);
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
                                                              Logger.Log(user.UserName + " left Game room", LogLevel.DebugInformation);
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
                                                                      mySiteClientManager.SendRoomInfo(userLogicModel, new GetRoomInfoResponse(room));
                                                                  }

                                                              });
                                                          }
                                                          result(room);
                                                      });
        }

        private void OnGetRooms(UserLogicModel user, GetRoomsRequest data)
        {
            myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { mySiteClientManager.SendRooms(user, new GetRoomsResponse(a)); });
        }
        private void OnStartGame(UserLogicModel user, StartGameRequest data)
        {
            //   Logger.Log("--game started 1 ", LogLevel.DebugInformation);

            myDataManager.SiteData.Room_GetRoomByUser(user,
                                          room =>
                                          {
                                              if (room == null)
                                              {
                                                  throw new Exception("idk");
                                                  return;
                                              }
                                              //       Logger.Log("--game started 2", LogLevel.DebugInformation);

                                              mySiteClientManager.CreateGame(new GameCreateRequestModel(room.GameType, room.Players));
                                          });



        }

        private void OnGetRoomInfo(UserLogicModel user, GetRoomInfoRequest data)
        {
            myDataManager.SiteData.Room_GetByRoomName(data.GameType, data.RoomName, a => { mySiteClientManager.SendRoomInfo(user, new GetRoomInfoResponse(a)); });
        }

        private void OnCreateRoom(UserLogicModel user, CreateRoomRequest data)
        {

            Logger.Log(user.UserName + " create room", LogLevel.DebugInformation);
            removeUserFromRoom(user,
                               disconnectedRoom =>
                               {
                                   myDataManager.SiteData.Room_CreateRoom(data.GameType,
                                                                          data.RoomName,
                                                                          user,
                                                                          (room) =>
                                                                          {
                                                                              mySiteClientManager.CreateChatRoom(user, new CreateChatRoomRequest(room));

                                                                              mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room));
                                                                              myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { mySiteClientManager.SendRooms(user, new GetRoomsResponse(a)); });
                                                                          });
                               });
        }

        private void OnJoinRoom(UserLogicModel user, RoomJoinRequest data)
        {
            Logger.Log(user.UserName + " join room", LogLevel.DebugInformation);

            removeUserFromRoom(user,
                               disconnectedRoom =>
                               {
                                   myDataManager.SiteData.Room_JoinRoom(data.GameType,
                                                                        data.RoomName,
                                                                        user,
                                                                        (room) =>
                                                                        {
                                                                            mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room));
                                                                            mySiteClientManager.JoinChatRoom(user, new JoinChatRoomRequest(room));

                                                                            foreach (var UserLogicModel in room.Players)
                                                                            {
                                                                                mySiteClientManager.SendRoomInfo(UserLogicModel, new GetRoomInfoResponse(room));
                                                                            }
                                                                        }
                                           );
                               });
        }

        private void OnGetGameTypes(UserLogicModel user)
        {
            var types = new List<GameTypeModel>() { new GameTypeModel("Blackjack"), new GameTypeModel("Sevens") };

            mySiteClientManager.SendGameTypes(user, new GetGameTypesReceivedResponse(types));
        }

        private void OnUserLogin(UserLogicModel user, SiteLoginRequest data)
        {
            mySiteClientManager.SendLoginResponse(user);
        }
    }
}
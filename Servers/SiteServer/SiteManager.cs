using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
using Models.GameManagerModels;
using Models.SiteManagerModels;
namespace SiteServer
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
            removeUserFromRoom(user, (room) => { });
        }

        private void OnUserDisconnect(UserLogicModel user, UserDisconnectModel data)
        {
            Console.Log(user.UserName + " disconnected");
            removeUserFromRoom(data.User, (room) => { });
        }

        private void removeUserFromRoom(UserLogicModel user, Action<RoomData> result)
        {
            myDataManager.SiteData.Room_GetRoomByUser(user,
                                                      room => {
                                                          if (room == null) {
                                                              result(null);
                                                              return;
                                                          }
                                                          mySiteClientManager.LeaveChatRoom(user);
                                                          mySiteClientManager.LeaveGameRoom(user);
                                                          foreach (var player in room.Players) {
                                                              if (player.UserName == user.UserName) room.Players.Remove(player);
                                                          }
                                                          if (room.Players.Count == 0)
                                                              myDataManager.SiteData.Room_DeleteRoom(room);
                                                          else {
                                                              myDataManager.SiteData.Room_UpdateRoom(room);
                                                              foreach (var userLogicModel in room.Players) {
                                                                  mySiteClientManager.SendRoomInfo(userLogicModel, new GetRoomInfoResponse(room));
                                                              }
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
            myDataManager.SiteData.Room_GetRoomByUser(user,
                                          room =>
                                          {
                                              if (room == null)
                                              { 
                                                  throw new Exception("idk");
                                                  return;
                                              }
                                              
                                              mySiteClientManager.CreateGame(new GameCreateRequestModel(room.GameType,room.Players));
                                          });


             
        }

        private void OnGetRoomInfo(UserLogicModel user, GetRoomInfoRequest data)
        {
            myDataManager.SiteData.Room_GetByRoomName(data.GameType, data.RoomName, a => { mySiteClientManager.SendRoomInfo(user, new GetRoomInfoResponse(a)); });
        }

        private void OnCreateRoom(UserLogicModel user, CreateRoomRequest data)
        {
            removeUserFromRoom(user,
                               disconnectedRoom => {
                                   myDataManager.SiteData.Room_CreateRoom(data.GameType,
                                                                          data.RoomName,
                                                                          user,
                                                                          (room) => {
                                                                              mySiteClientManager.CreateChatRoom(user, new CreateChatRoomRequest(room.ChatChannel));

                                                                              mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room));
                                                                              myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { mySiteClientManager.SendRooms(user, new GetRoomsResponse(a)); });
                                                                          });
                               });
        }

        private void OnJoinRoom(UserLogicModel user, RoomJoinRequest data)
        {
            removeUserFromRoom(user,
                               disconnectedRoom => {
                                   myDataManager.SiteData.Room_JoinRoom(data.GameType,
                                                                        data.RoomName,
                                                                        user,
                                                                        (room) => {
                                                                            mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room));
                                                                            mySiteClientManager.JoinChatRoom(user, new JoinChatRoomRequest(room.ChatChannel));

                                                                            foreach (var UserLogicModel in room.Players) {
                                                                                mySiteClientManager.SendRoomInfo(UserLogicModel, new GetRoomInfoResponse(room));
                                                                            }
                                                                        }
                                           );
                               });
        }

        private void OnGetGameTypes(UserLogicModel user)
        {
            var types = new List<GameTypeModel>() {new GameTypeModel("Blackjack"), new GameTypeModel("Sevens")};

            mySiteClientManager.SendGameTypes(user, new GetGameTypesReceivedResponse(types));
        }

        private void OnUserLogin(UserLogicModel user, SiteLoginRequest data)
        {
            mySiteClientManager.SendLoginResponse(user);
        }
    }
}
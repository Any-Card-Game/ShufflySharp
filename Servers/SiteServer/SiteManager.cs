using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
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

            mySiteClientManager.OnUserDisconnect += OnUserDisconnect;
        }

        private void OnLeaveRoom(UserModel user, LeaveRoomRequest data)
        {
            removeUserFromRoom(user, (room) => { });
        }

        private void OnUserDisconnect(UserModel user, UserDisconnectModel data)
        {
            Console.Log(user.UserName + " disconnected");
            removeUserFromRoom(data.User, (room) => { });
        }

        private void removeUserFromRoom(UserModel user, Action<RoomData> result)
        {
            myDataManager.SiteData.Room_GetRoomByUser(user,
                                                      room => {
                                                          if (room == null) {
                                                              result(null);
                                                              return;
                                                          }
                                                          //       mySiteClientManager.LeaveChatRoom(user);
                                                          foreach (var player in room.Players) {
                                                              if (player.UserName == user.UserName) room.Players.Remove(player);
                                                          }
                                                          if (room.Players.Count == 0)
                                                              myDataManager.SiteData.Room_DeleteRoom(room);
                                                          else {
                                                              myDataManager.SiteData.Room_UpdateRoom(room);
                                                              foreach (var userModel in room.Players) {
                                                                  mySiteClientManager.SendRoomInfo(userModel, new GetRoomInfoResponse(room));
                                                              }
                                                          }
                                                          result(room);
                                                      });
        }

        private void OnGetRooms(UserModel user, GetRoomsRequest data)
        {
            myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { mySiteClientManager.SendRooms(user, new GetRoomsResponse(a)); });
        }

        private void OnGetRoomInfo(UserModel user, GetRoomInfoRequest data)
        {
            myDataManager.SiteData.Room_GetByRoomName(data.GameType, data.RoomName, a => { mySiteClientManager.SendRoomInfo(user, new GetRoomInfoResponse(a)); });
        }

        private void OnCreateRoom(UserModel user, CreateRoomRequest data)
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

        private void OnJoinRoom(UserModel user, RoomJoinRequest data)
        {
            removeUserFromRoom(user,
                               disconnectedRoom => {
                                   myDataManager.SiteData.Room_JoinRoom(data.GameType,
                                                                        data.RoomName,
                                                                        user,
                                                                        (room) => {
                                                                            mySiteClientManager.RoomJoined(user, new RoomJoinResponse(room));
                                                                            mySiteClientManager.JoinChatRoom(user, new JoinChatRoomRequest(room.ChatChannel));

                                                                            foreach (var userModel in room.Players) {
                                                                                mySiteClientManager.SendRoomInfo(userModel, new GetRoomInfoResponse(room));
                                                                            }
                                                                        }
                                           );
                               });
        }

        private void OnGetGameTypes(UserModel user)
        {
            var types = new List<GameTypeModel>() {new GameTypeModel("Blackjack"), new GameTypeModel("Sevens")};

            mySiteClientManager.SendGameTypes(user, new GetGameTypesReceivedResponse(types));
        }

        private void OnUserLogin(UserModel user, SiteLoginRequest data)
        {
            mySiteClientManager.SendLoginResponse(user);
        }
    }
}
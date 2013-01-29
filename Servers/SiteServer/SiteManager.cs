using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace SiteServer
{
    public class SiteManager
    {
        private readonly DataManager myDataManager;
        private SiteClientManager myServerManager;

        public SiteManager(string siteServerIndex)
        {
            myDataManager = new DataManager();
            myServerManager = new SiteClientManager(siteServerIndex);


            myServerManager.OnUserLogin += OnUserLogin;
            myServerManager.OnGetGameTypes += OnGetGameTypes;
            myServerManager.OnGetRoomInfo += OnGetRoomInfo;
            myServerManager.OnGetRooms += OnGetRooms;
            myServerManager.OnCreateRoom += OnCreateRoom;
            myServerManager.OnJoinRoom += OnJoinRoom;
        }

        void OnGetRooms(UserModel user, GetRoomsRequest data)
        {
            myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { myServerManager.SendRooms(user, new GetRoomsResponse(a)); });

        }
        void OnGetRoomInfo(UserModel user, GetRoomInfoRequest data)
        {
            myDataManager.SiteData.Room_GetByRoomName(data.GameType, data.RoomName, a => { myServerManager.SendRoomInfo(user, new GetRoomInfoResponse(a)); });

        }
        void OnCreateRoom(UserModel user, CreateRoomRequest data)
        {
            myDataManager.SiteData.Room_CreateRoom(data.GameType, data.RoomName, user, (room) =>
            {

                myServerManager.RoomJoined(user, new RoomJoinResponse(room));
                myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { myServerManager.SendRooms(user, new GetRoomsResponse(a)); });
            });


        }
        void OnJoinRoom(UserModel user, RoomJoinRequest data)
        {
            myDataManager.SiteData.Room_JoinRoom(data.GameType,
                                                 data.RoomName,
                                                 user,
                                                 (room) =>
                                                 {

                                                     myServerManager.RoomJoined(user, new RoomJoinResponse(room));

                                                     foreach (var userModel in room.Players) {
                                                         myServerManager.SendRoomInfo(userModel, new GetRoomInfoResponse(room));
                                                     }
                                                 }

                    );


        }

        private void OnGetGameTypes(UserModel user)
        {
            var types = new List<GameTypeModel>() { new GameTypeModel("Blackjack"), new GameTypeModel("Sevens") };

            myServerManager.SendGameTypes(user, new GetGameTypesReceivedResponse(types));
        }

        private void OnUserLogin(UserModel user, SiteLoginRequest data)
        {
            Console.Log(user.UserName + "  " + data.Hash + "    We did it!");

            myServerManager.SendLoginResponse(user);
        }
    }
}
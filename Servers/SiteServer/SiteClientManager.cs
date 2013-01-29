using System;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace SiteServer
{
    public class SiteClientManager
    {
        #region Delegates

        public delegate void UserLogin(UserModel user, SiteLoginRequest data);
        public delegate void GetGameTypes(UserModel user);
        public delegate void GetRooms(UserModel user, GetRoomsRequest data);
        public delegate void CreateRoom(UserModel user, CreateRoomRequest data);
        public delegate void JoinRoom(UserModel user, RoomJoinRequest data);
        public delegate void GetRoomInfo(UserModel user, GetRoomInfoRequest data);
        public delegate void UserDisconnect(UserModel user, UserDisconnectModel data);
        
        #endregion

        private QueueManager qManager;
        public string SiteServerIndex { get; set; }

        public SiteClientManager(string siteServerIndex)
        {
            SiteServerIndex = siteServerIndex;

            Setup();
        }

        public event UserLogin OnUserLogin;
        public event GetGameTypes OnGetGameTypes;
        public event GetRooms OnGetRooms;
        public event GetRoomInfo OnGetRoomInfo;
        public event UserDisconnect OnUserDisconnect;
        

        public event CreateRoom OnCreateRoom;
        public event JoinRoom OnJoinRoom;

        private void Setup()
        {
            qManager = new QueueManager(SiteServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("SiteServer", null),
                                                                              new QueueWatcher(SiteServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "SiteServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));
            qManager.AddChannel("Area.Site.Login", (user, data) => OnUserLogin(user, (SiteLoginRequest) data));
            qManager.AddChannel("Area.Site.GetGameTypes", (user, data) => OnGetGameTypes(user));
            qManager.AddChannel("Area.Site.GetRooms", (user, data) => OnGetRooms(user, (GetRoomsRequest)data));
            qManager.AddChannel("Area.Site.GetRoomInfo", (user, data) => OnGetRoomInfo(user, (GetRoomInfoRequest)data));

            qManager.AddChannel("Area.Site.CreateRoom", (user, data) => OnCreateRoom(user, (CreateRoomRequest)data));
            qManager.AddChannel("Area.Site.JoinRoom", (user, data) => OnJoinRoom(user, (RoomJoinRequest)data));
            qManager.AddChannel("Area.Site.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel)data));
            
        }

        public void SendLoginResponse(UserModel user)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.Login.Response", new UserLoginResponse(true, user));
        }

        public void SendGameTypes(UserModel user, GetGameTypesReceivedResponse gameTypes)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetGameTypes.Response", gameTypes);
        }

        public void SendRooms(UserModel user, GetRoomsResponse response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetRooms.Response", response);
        }
        public void SendRoomInfo(UserModel user, GetRoomInfoResponse response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetRoomInfo.Response", response);
        }
        public void RoomJoined(UserModel user, RoomJoinResponse roomJoinResponse)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.JoinRoom.Response", roomJoinResponse);
        }
    }
}
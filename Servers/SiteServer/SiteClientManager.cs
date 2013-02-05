using System;
using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
using Models.GameManagerModels;
using Models.SiteManagerModels;
namespace SiteServer
{
    public class SiteClientManager
    {
        #region Delegates

        public delegate void CreateRoom(UserLogicModel user, CreateRoomRequest data);
        public delegate void GetGameTypes(UserLogicModel user);
        public delegate void GetRoomInfo(UserLogicModel user, GetRoomInfoRequest data);
        public delegate void GetRooms(UserLogicModel user, GetRoomsRequest data);
        public delegate void JoinRoom(UserLogicModel user, RoomJoinRequest data);
        public delegate void LeaveRoom(UserLogicModel user, LeaveRoomRequest data);
        public delegate void UserDisconnect(UserLogicModel user, UserDisconnectModel data);
        public delegate void UserLogin(UserLogicModel user, SiteLoginRequest data);
        public delegate void StartGame(UserLogicModel user, StartGameRequest data);

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
        public event LeaveRoom OnLeaveRoom;
        public event CreateRoom OnCreateRoom;
        public event JoinRoom OnJoinRoom;
        public event StartGame OnStartGame;

        private void Setup()
        {
            qManager = new QueueManager(SiteServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("SiteServer", null),
                                                                              new QueueWatcher(SiteServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "ChatServer",
                                                                              "GameServer",
                                                                              "SiteServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));
            qManager.AddChannel("Area.Site.Login", (user, data) => OnUserLogin(user, (SiteLoginRequest) data));
            qManager.AddChannel("Area.Site.GetGameTypes", (user, data) => OnGetGameTypes(user));
            qManager.AddChannel("Area.Site.GetRooms", (user, data) => OnGetRooms(user, (GetRoomsRequest) data));
            qManager.AddChannel("Area.Site.GetRoomInfo", (user, data) => OnGetRoomInfo(user, (GetRoomInfoRequest) data));

            qManager.AddChannel("Area.Site.CreateRoom", (user, data) => OnCreateRoom(user, (CreateRoomRequest) data));
            qManager.AddChannel("Area.Site.LeaveRoom", (user, data) => OnLeaveRoom(user, (LeaveRoomRequest) data));
            qManager.AddChannel("Area.Site.JoinRoom", (user, data) => OnJoinRoom(user, (RoomJoinRequest)data));
            qManager.AddChannel("Area.Site.StartGame", (user, data) => OnStartGame(user, (StartGameRequest)data));
            qManager.AddChannel("Area.Site.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel) data));
        }

        public void SendLoginResponse(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Site.Login.Response", user, new UserLoginResponse(true));
        }

        public void SendGameTypes(UserLogicModel user, GetGameTypesReceivedResponse gameTypes)
        {
            qManager.SendMessage(user.Gateway, "Area.Site.GetGameTypes.Response", user, gameTypes);
        }

        public void CreateChatRoom(UserLogicModel user, CreateChatRoomRequest roomRequest)
        {
            qManager.SendMessage("ChatServer", "Area.Chat.CreateChatRoom", user, roomRequest);
        }

        public void JoinChatRoom(UserLogicModel user, JoinChatRoomRequest joinChatRoomRequest)
        {
            qManager.SendMessage(joinChatRoomRequest.Room.ChatServer, "Area.Chat.JoinChatRoom", user, joinChatRoomRequest);
        }

        public void SendRooms(UserLogicModel user, GetRoomsResponse response)
        {
            qManager.SendMessage(user.Gateway, "Area.Site.GetRooms.Response", user, response);
        }

        public void SendRoomInfo(UserLogicModel user, GetRoomInfoResponse response)
        {
            qManager.SendMessage(user.Gateway, "Area.Site.GetRoomInfo.Response", user, response);
        }

        public void RoomJoined(UserLogicModel user, RoomJoinResponse roomJoinResponse)
        {
            qManager.SendMessage(user.Gateway, "Area.Site.JoinRoom.Response", user, roomJoinResponse);
        }

        public void LeaveChatRoom(UserLogicModel user)
        {
            qManager.SendMessage(user.CurrentChatServer, "Area.Chat.LeaveChatRoom", user, null);
        }
        public void LeaveGameRoom(UserLogicModel user)
        {
            qManager.SendMessage(user.CurrentGameServer, "Area.Game.LeaveGameRoom", user,null);
        }

        public void CreateGame(GameCreateRequestModel gameCreateRequestModel)
        {
            qManager.SendMessage("GameServer", "Area.Game.Create", null, gameCreateRequestModel);
        }

    }
}
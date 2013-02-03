using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
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

        private void Setup()
        {
            qManager = new QueueManager(SiteServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("SiteServer", null),
                                                                              new QueueWatcher(SiteServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "ChatServer",
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
            qManager.AddChannel("Area.Site.JoinRoom", (user, data) => OnJoinRoom(user, (RoomJoinRequest) data));
            qManager.AddChannel("Area.Site.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel) data));
        }

        public void SendLoginResponse(UserLogicModel user)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.Login.Response", new UserLoginResponse(true));
        }

        public void SendGameTypes(UserLogicModel user, GetGameTypesReceivedResponse gameTypes)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetGameTypes.Response", gameTypes);
        }

        public void CreateChatRoom(UserLogicModel user, CreateChatRoomRequest roomRequest)
        {
            qManager.SendMessage(user, "ChatServer", "Area.Chat.CreateChatRoom", roomRequest);
        }

        public void JoinChatRoom(UserLogicModel user, JoinChatRoomRequest joinChatRoomRequest)
        {
            qManager.SendMessage(user, "ChatServer", "Area.Chat.JoinChatRoom", joinChatRoomRequest);
        }

        public void SendRooms(UserLogicModel user, GetRoomsResponse response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetRooms.Response", response);
        }

        public void SendRoomInfo(UserLogicModel user, GetRoomInfoResponse response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetRoomInfo.Response", response);
        }

        public void RoomJoined(UserLogicModel user, RoomJoinResponse roomJoinResponse)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.JoinRoom.Response", roomJoinResponse);
        }

        public void LeaveChatRoom(UserLogicModel user)
        {
            qManager.SendMessage(user, user.CurrentChatServer, "Area.Chat.LeaveChatRoom");

        }
    }
}
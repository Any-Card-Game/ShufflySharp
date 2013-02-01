using Client.Libs;
using Models;
using Models.SiteManagerModels;
namespace Client.Managers
{
    public class ClientSiteManager
    {
        #region Delegates

        public delegate void GetGameTypesReceived(GetGameTypesReceivedResponse o);
        public delegate void GetRoomInfoReceived(GetRoomInfoResponse o);
        public delegate void GetRoomsReceived(GetRoomsResponse o);
        public delegate void RoomJoined(RoomJoinResponse o);
        public delegate void UserLogin(UserLoginResponse o);

        #endregion

        private readonly Gateway myGateway;

        public ClientSiteManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetGameTypesReceived OnGetGameTypesReceived;
        public event UserLogin OnLogin;
        public event GetRoomsReceived OnGetRoomsReceived;
        public event RoomJoined OnRoomJoined;
        public event GetRoomInfoReceived OnGetRoomInfoReceived;

        private void Setup()
        {
            myGateway.On("Area.Main.Login.Response",
                         a => {
                             UserLoginResponse userLoginResponse = (UserLoginResponse) a;
                             if (userLoginResponse.Successful)
                                 SiteLogin(userLoginResponse.User.Hash);
                         });

            myGateway.On("Area.Site.Login.Response", a => { OnLogin(( (UserLoginResponse) a )); });
            myGateway.On("Area.Site.GetGameTypes.Response", a => { OnGetGameTypesReceived(( (GetGameTypesReceivedResponse) a )); });
            myGateway.On("Area.Site.GetRooms.Response", a => { OnGetRoomsReceived(( (GetRoomsResponse) a )); });
            myGateway.On("Area.Site.GetRoomInfo.Response", a => { OnGetRoomInfoReceived(( (GetRoomInfoResponse) a )); });
            myGateway.On("Area.Site.JoinRoom.Response", a => { OnRoomJoined(( (RoomJoinResponse) a )); });
        }

        private void SiteLogin(string hash)
        {
            myGateway.Emit("Area.Site.Login", new SiteLoginRequest(hash));
        }

        public void Login(string userName, string password)
        {
            myGateway.Login(userName, password);
        }

        public void GetGameTypes()
        {
            myGateway.Emit("Area.Site.GetGameTypes");
        }

        public void GetRooms(GetRoomsRequest getRoomsRequest)
        {
            myGateway.Emit("Area.Site.GetRooms", getRoomsRequest);
        }

        public void CreateRoom(CreateRoomRequest createRoom)
        {
            myGateway.Emit("Area.Site.CreateRoom", createRoom);
        }

        public void GetRoomInfo(GetRoomInfoRequest roomInfo)
        {
            myGateway.Emit("Area.Site.GetRoomInfo", roomInfo);
        }

        public void JoinRoom(RoomJoinRequest joinRoom)
        {
            myGateway.Emit("Area.Site.JoinRoom", joinRoom);
        }

        public void LeaveRoom(LeaveRoomRequest leaveRoom)
        {
            myGateway.Emit("Area.Site.LeaveRoom", leaveRoom);
        }
    }
}
using Models;
using Models.SiteManagerModels;
namespace ClientLibs.Managers
{
    public class ClientSiteManager
    {
        #region Delegates

        public delegate void GetGameTypesReceived(UserModel user, GetGameTypesReceivedResponse o);
        public delegate void GetRoomInfoReceived(UserModel user, GetRoomInfoResponse o);
        public delegate void GetRoomsReceived(UserModel user, GetRoomsResponse o);
        public delegate void RoomJoined(UserModel user, RoomJoinResponse o);
        public delegate void UserLogin(UserModel user, UserLoginResponse o);
        public delegate void UserCreate(UserModel user, UserCreateResponse o);

        public delegate void GetGamesByUserReceived(UserModel user, GetGamesByUserResponse o);
        #endregion

        private readonly Gateway myGateway;

        public ClientSiteManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetGameTypesReceived OnGetGameTypesReceived;
        public event UserLogin OnLogin;
        public event UserCreate OnUserCreate;
        public event GetRoomsReceived OnGetRoomsReceived;
        public event RoomJoined OnRoomJoined;
        public event GetRoomInfoReceived OnGetRoomInfoReceived;

        public event GetGamesByUserReceived OnGetGamesByUserReceived;

        private void Setup()
        {


            myGateway.On("Area.Site.Login.Response", (user, data) => { if (OnLogin != null) OnLogin(user, ((UserLoginResponse)data)); });
            myGateway.On("Area.Site.CreateUser.Response", (user, data) => { if (OnUserCreate != null) OnUserCreate(user, (UserCreateResponse)data); });
            myGateway.On("Area.Site.GetGameTypes.Response", (user, data) => { if (OnGetGameTypesReceived != null) OnGetGameTypesReceived(user, ( (GetGameTypesReceivedResponse) data )); });
            myGateway.On("Area.Site.GetRooms.Response", (user, data) => { if (OnGetRoomsReceived != null) OnGetRoomsReceived(user, ( (GetRoomsResponse) data )); });
            myGateway.On("Area.Site.GetRoomInfo.Response", (user, data) => { if (OnGetRoomInfoReceived != null) OnGetRoomInfoReceived(user, ( (GetRoomInfoResponse) data )); });
            myGateway.On("Area.Site.JoinRoom.Response", (user, data) => { if (OnRoomJoined != null) OnRoomJoined(user, ((RoomJoinResponse)data)); });

            myGateway.On("Area.Site.GetGamesByUser.Response", (user, data) => { if (OnGetGamesByUserReceived != null) OnGetGamesByUserReceived(user, ((GetGamesByUserResponse)data)); });
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

        public void StartGame(StartGameRequest startGameRequest)
        {
            myGateway.Emit("Area.Site.StartGame", startGameRequest);
        }
        public void CreateUser(SiteCreateUserRequest createUser)
        {
            myGateway.Emit("Area.Site.CreateUser", createUser);
        }

        public void GetGamesByUser(GetGamesByUserRequest getGamesByUser)
        {
            myGateway.Emit("Area.Site.GetGamesByUser", getGamesByUser);
        }
    }
}
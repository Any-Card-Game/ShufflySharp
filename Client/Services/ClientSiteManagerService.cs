using ClientLibs.Managers;
using Models.SiteManagerModels;
namespace Client.Services
{
    public class ClientSiteManagerService
    {

        public event ClientSiteManager.GetGameTypesReceived OnGetGameTypesReceived;
        public event ClientSiteManager.UserCreate OnUserCreate;
        public event ClientSiteManager.UserLogin OnLogin;
        public event ClientSiteManager.GetRoomsReceived OnGetRoomsReceived;
        public event ClientSiteManager.RoomJoined OnRoomJoined;
        public event ClientSiteManager.GetRoomInfoReceived OnGetRoomInfoReceived;

        private readonly ClientSiteManager clientSiteManager;

        public ClientSiteManagerService(GatewayService gateway)
        {
            clientSiteManager = new ClientSiteManager(gateway.Gateway);
            clientSiteManager.OnGetGameTypesReceived += (user, model) => { if (OnGetGameTypesReceived != null) OnGetGameTypesReceived(user, model); };
            clientSiteManager.OnLogin += (user, model) => { if (OnLogin != null) OnLogin(user, model); };
            clientSiteManager.OnUserCreate += (user, model) => { if (OnUserCreate != null) OnUserCreate(user, model); };
            clientSiteManager.OnGetRoomsReceived += (user, model) => { if (OnGetRoomsReceived != null) OnGetRoomsReceived(user, model); };
            clientSiteManager.OnRoomJoined += (user, model) => { if (OnRoomJoined != null) OnRoomJoined(user, model); };
            clientSiteManager.OnGetRoomInfoReceived += (user, model) => { if (OnGetRoomInfoReceived != null) OnGetRoomInfoReceived(user, model); };

        }


        public void Login(string userName, string password)
        {
            clientSiteManager.Login(userName, password);

        }

        public void CreateUser(string userName, string password)
        {
            clientSiteManager.CreateUser(new SiteCreateUserRequest(userName, password));

        }

        public void GetGameTypes()
        {
            clientSiteManager.GetGameTypes();

        }

        public void GetRooms(GetRoomsRequest getRoomsRequest)
        {
            clientSiteManager.GetRooms(getRoomsRequest);
        }

        public void CreateRoom(CreateRoomRequest createRoom)
        {
            clientSiteManager.CreateRoom(createRoom);

        }

        public void GetRoomInfo(GetRoomInfoRequest roomInfo)
        {
            clientSiteManager.GetRoomInfo(roomInfo);

        }

        public void JoinRoom(RoomJoinRequest joinRoom)
        {
            clientSiteManager.JoinRoom(joinRoom);

        }

        public void LeaveRoom(LeaveRoomRequest leaveRoom)
        {
            clientSiteManager.LeaveRoom(leaveRoom);

        }

        public void StartGame(StartGameRequest startGameRequest)
        {
            clientSiteManager.StartGame(startGameRequest);

        }

    }
}
using ClientLibs.Managers;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;

namespace Client.Services
{
    public class ClientSiteManagerService
    {
        public const string Name = "ClientSiteManagerService";
        private readonly ClientSiteManager clientSiteManager;

        public ClientSiteManagerService(GatewayService gateway)
        {
            clientSiteManager = new ClientSiteManager(gateway.Gateway);
            clientSiteManager.OnGetGameTypesReceived +=
                (user, model) => { if (OnGetGameTypesReceived != null) OnGetGameTypesReceived(user, model); };
            clientSiteManager.OnLogin += (user, model) => { if (OnLogin != null) OnLogin(user, model); };
            clientSiteManager.OnUserCreate += (user, model) => { if (OnUserCreate != null) OnUserCreate(user, model); };
            clientSiteManager.OnGetRoomsReceived +=
                (user, model) => { if (OnGetRoomsReceived != null) OnGetRoomsReceived(user, model); };
            clientSiteManager.OnRoomJoined += (user, model) => { if (OnRoomJoined != null) OnRoomJoined(user, model); };
            clientSiteManager.OnGetRoomInfoReceived +=
                (user, model) => { if (OnGetRoomInfoReceived != null) OnGetRoomInfoReceived(user, model); };

            clientSiteManager.OnGetGamesByUserReceived +=
                (user, model) => { if (OnGetGamesByUserReceived != null) OnGetGamesByUserReceived(user, model); };
            clientSiteManager.OnDoesGameNameExistReceived +=
                (user, model) => { if (OnDoesGameNameExistReceived != null) OnDoesGameNameExistReceived(user, model); };
            clientSiteManager.OnDeveloperCreateGameReceived +=
                (user, model) =>
                {
                    if (OnDeveloperCreateGameReceived != null) OnDeveloperCreateGameReceived(user, model);
                };
            clientSiteManager.OnDeveloperUpdateGameReceived +=
                (user, model) =>
                {
                    if (OnDeveloperUpdateGameReceived != null) OnDeveloperUpdateGameReceived(user, model);
                };
        }

        public event ClientSiteManager.GetGameTypesReceived OnGetGameTypesReceived;
        public event ClientSiteManager.UserCreate OnUserCreate;
        public event ClientSiteManager.UserLogin OnLogin;
        public event ClientSiteManager.GetRoomsReceived OnGetRoomsReceived;
        public event ClientSiteManager.RoomJoined OnRoomJoined;
        public event ClientSiteManager.GetRoomInfoReceived OnGetRoomInfoReceived;

        public event ClientSiteManager.GetGamesByUserReceived OnGetGamesByUserReceived;
        public event ClientSiteManager.DoesGameNameExistReceived OnDoesGameNameExistReceived;
        public event ClientSiteManager.DeveloperCreateGameReceived OnDeveloperCreateGameReceived;
        public event ClientSiteManager.DeveloperUpdateGameReceived OnDeveloperUpdateGameReceived;


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

        public void GetGamesByUser(string hash)
        {
            clientSiteManager.GetGamesByUser(new GetGamesByUserRequest(hash));
        }

        public void DeveloperCreateGame(string gameName)
        {
            clientSiteManager.DeveloperCreateGame(new DeveloperCreateGameRequest(gameName));
        }

        public void DeveloperUpdateGame(GameModel gameModel)
        {
            clientSiteManager.DeveloperUpdateGame(new DeveloperUpdateGameRequest(gameModel));
        }
    }
}
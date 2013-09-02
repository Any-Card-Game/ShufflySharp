using System.Runtime.CompilerServices;
using ClientLibs.Managers;
using Models;
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
            clientSiteManager.OnGetGameTypesReceived += (user, model) => OnGetGameTypesReceived.Trigger(user, model);
            clientSiteManager.OnLogin += (user, model) => OnLogin.Trigger(user, model);
            clientSiteManager.OnUserCreate += (user, model) => OnUserCreate.Trigger(user, model);
            clientSiteManager.OnGetRoomsReceived += (user, model) => OnGetRoomsReceived.Trigger(user, model);
            clientSiteManager.OnRoomJoined += (user, model) => OnRoomJoined.Trigger(user, model);
            clientSiteManager.OnGetRoomInfoReceived += (user, model) => OnGetRoomInfoReceived.Trigger(user, model);
            clientSiteManager.OnGetGamesByUserReceived += (user, model) => OnGetGamesByUserReceived.Trigger(user, model);
            clientSiteManager.OnDoesGameNameExistReceived += (user, model) => OnDoesGameNameExistReceived.Trigger(user, model);
            clientSiteManager.OnDeveloperCreateGameReceived += (user, model) => OnDeveloperCreateGameReceived.Trigger(user, model);
            clientSiteManager.OnDeveloperUpdateGameReceived += (user, model) => OnDeveloperUpdateGameReceived.Trigger(user, model);
        }

        public UserEventCacher<GetGameTypesReceivedResponse> OnGetGameTypesReceived = new UserEventCacher<GetGameTypesReceivedResponse>();
        public UserEventCacher<UserCreateResponse> OnUserCreate = new UserEventCacher<UserCreateResponse>();
        public UserEventCacher<UserLoginResponse> OnLogin = new UserEventCacher<UserLoginResponse>();
        public UserEventCacher<GetRoomsResponse> OnGetRoomsReceived = new UserEventCacher<GetRoomsResponse>();
        public UserEventCacher<RoomJoinResponse> OnRoomJoined = new UserEventCacher<RoomJoinResponse>();
        public UserEventCacher<GetRoomInfoResponse> OnGetRoomInfoReceived = new UserEventCacher<GetRoomInfoResponse>();
        public UserEventCacher<GetGamesByUserResponse> OnGetGamesByUserReceived = new UserEventCacher<GetGamesByUserResponse>();
        public UserEventCacher<DoesGameExistResponse> OnDoesGameNameExistReceived = new UserEventCacher<DoesGameExistResponse>();
        public UserEventCacher<DeveloperCreateGameResponse> OnDeveloperCreateGameReceived = new UserEventCacher<DeveloperCreateGameResponse>();
        public UserEventCacher<DeveloperUpdateGameResponse> OnDeveloperUpdateGameReceived = new UserEventCacher<DeveloperUpdateGameResponse>();



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

    public class ClientManagerService
    {
        public const string Name = "ClientManagerService";

        [IntrinsicProperty]
        public ClientSiteManagerService ClientSiteManagerService { get; set; }
        [IntrinsicProperty]
        public ClientGameManagerService ClientGameManagerService { get; set; }
        [IntrinsicProperty]
        public ClientDebugManagerService ClientDebugManagerService { get; set; }
        [IntrinsicProperty]
        public ClientChatManagerService ClientChatManagerService { get; set; }



        public ClientManagerService(ClientSiteManagerService clientSiteManagerService, ClientGameManagerService clientGameManagerService, ClientDebugManagerService clientDebugManagerService, ClientChatManagerService clientChatManagerService)
        {
            ClientSiteManagerService = clientSiteManagerService;
            ClientGameManagerService = clientGameManagerService;
            ClientDebugManagerService = clientDebugManagerService;
            ClientChatManagerService = clientChatManagerService;
        }
    }
}
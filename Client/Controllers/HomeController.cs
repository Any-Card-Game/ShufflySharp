using System;
using Client.Scope;
using Client.Services;
using Models;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class HomeController
    {
        private readonly HomeScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;

        public HomeController(HomeScope scope, UIManagerService uiManager,ClientSiteManagerService clientSiteManagerService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myScope .Model= new HomeModel();
            myUIManager.UserLoggedIn += myUIManager_UserLoggedIn;
            myScope.Visible = false;
            scope.Model.GameTypeSelected += GameTypeSelectedFn;
            scope.Model.RoomSelected += RoomSelectedFn;
            scope.Model.CreateRoom += CreateRoomFn;
            scope.Model.JoinRoom += JoinRoomFn;
            scope.watch<HomeScope>((_scope) => { return myScope.Model.SelectedGameType; },
                                   () =>
                                   {
                                       scope.Model.GameTypeSelected();
                                   });
            /*  scope.watch<HomeScope>((_scope) => { return myScope.Model.SelectedRoom; },
                                 () =>
                                   {
                                       scope.Model.RoomSelected();
                                   });*/

            myUIManager.RoomLeft += () => {
                                        myScope.SwingBack(null);
                                    };

            myClientSiteManagerService.OnGetGameTypesReceived += PopulateGames;
            myClientSiteManagerService.OnGetRoomsReceived += PopulateRooms;
            myClientSiteManagerService.OnRoomJoined += RoomJoined;
            myClientSiteManagerService.OnGetRoomInfoReceived += GetRoomInfoReceived;

        }

        private void JoinRoomFn()
        {
            myClientSiteManagerService.JoinRoom(new RoomJoinRequest(myScope.Model.SelectedGameType.Name, myScope.Model.SelectedRoom.RoomName));
        }

        private void CreateRoomFn()
        {
            Action<string> action=null;
            action = (roomName) => {
                myClientSiteManagerService.CreateRoom(new CreateRoomRequest(myScope.Model.SelectedGameType.Name, roomName));
                         myUIManager.CreateRoom -= action;
                     };
            myUIManager.CreateRoom += action;
            myUIManager.OpenCreateRoomDialog();
        }

        private void RoomSelectedFn()
        {
            if (myScope.Model.SelectedGameType == null || myScope.Model.SelectedRoom==null) return;
            myClientSiteManagerService.GetRoomInfo(new GetRoomInfoRequest(myScope.Model.SelectedGameType.Name, myScope.Model.SelectedRoom.RoomName));
        }

        private void GameTypeSelectedFn()
        {
            if (myScope.Model.SelectedGameType == null) return;
            myClientSiteManagerService.GetRooms(new GetRoomsRequest(myScope.Model.SelectedGameType.Name));
            myScope.Model.SelectedRoom = null;
        }

        private void GetRoomInfoReceived(UserModel user, GetRoomInfoResponse o)
        {
            for (int i = 0; i < myScope.Model.Rooms.Count; i++)
            {
                if (myScope.Model.Rooms[i].ID == o.Room.ID)
                {
                    myScope.Model.Rooms.RemoveAt(i);
                    myScope.Model.Rooms.Insert(i, o.Room);
                    break;
                }
            }

            PopulateRoom(o.Room);
        }

        private void RoomJoined(UserModel user, RoomJoinResponse o)
        {
            PopulateRoom(o.Room);

            myScope.SwingAway(SwingDirection.TopLeft, false, null);
            myUIManager.OnRoomJoined(o.Room);

        }
         

        private void PopulateGames(UserModel user, GetGameTypesReceivedResponse o)
        {
            myScope.Model.GameTypes = o.GameTypes;
            myScope.Model.SelectedGameType = myScope.Model.GameTypes[0];
            myScope.Apply();

            myClientSiteManagerService.GetRooms(new GetRoomsRequest(o.GameTypes[0].Name));
        }

        private void PopulateRooms(UserModel user, GetRoomsResponse o)
        {
            myScope.Model.Rooms = o.Rooms;
            myScope.Model.SelectedRoom = null;

            myScope.Apply();

            if (myScope.Model.Rooms.Count == 0) return;
            PopulateRoom(myScope.Model.Rooms[0]);
        }

        private void PopulateRoom(RoomModel roomModel)
        {
            myScope.Model.SelectedRoom = roomModel;
            myScope.Apply();
        }
        void myUIManager_UserLoggedIn()
        {
            myScope.Visible = true;
            myScope.SwingAway(SwingDirection.BottomLeft, true, null);
            myScope.SwingBack(null);
            myScope.Apply();
            myScope.Model.User= myUIManager.ClientInfo.LoggedInUser;
            myClientSiteManagerService.GetGameTypes();

        } 
    } 
}
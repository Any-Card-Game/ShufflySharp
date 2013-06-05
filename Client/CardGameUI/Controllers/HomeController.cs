using System;
using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using Client;
using Client.UIWindow;
using Models;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Controllers
{
    internal class HomeController
    {
        private readonly HomeScope myScope;
        private readonly UIManagerService myUIManager;

        public HomeController(HomeScope scope, UIManagerService uiManager)
        {
            myScope = scope;
            myUIManager = uiManager;
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
                                        myScope.SwingBack();
                                    };

            uiManager.PageHandler.ClientSiteManager.OnGetGameTypesReceived += PopulateGames;
            uiManager.PageHandler.ClientSiteManager.OnGetRoomsReceived += PopulateRooms;
            uiManager.PageHandler.ClientSiteManager.OnRoomJoined += RoomJoined;
            uiManager.PageHandler.ClientSiteManager.OnGetRoomInfoReceived += GetRoomInfoReceived;

        }

        private void JoinRoomFn()
        {
            myUIManager.PageHandler.ClientSiteManager.JoinRoom(new RoomJoinRequest(myScope.Model.SelectedGameType.Name, myScope.Model.SelectedRoom.RoomName));
        }

        private void CreateRoomFn()
        {
            Action<string> action=null;
            action = (roomName) => {
                         myUIManager.PageHandler.ClientSiteManager.CreateRoom(new CreateRoomRequest(myScope.Model.SelectedGameType.Name, roomName));
                         myUIManager.CreateRoom -= action;
                     };
            myUIManager.CreateRoom += action;
            myUIManager.OpenCreateRoomDialog();
        }

        private void RoomSelectedFn()
        {
            myUIManager.PageHandler.ClientSiteManager.GetRoomInfo(new GetRoomInfoRequest(myScope.Model.SelectedGameType.Name, myScope.Model.SelectedRoom.RoomName));
        }

        private void GameTypeSelectedFn()
        {
            myUIManager.PageHandler.ClientSiteManager.GetRooms(new GetRoomsRequest(myScope.Model.SelectedGameType.Name));
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

            myScope.SwingAway(SwingDirection.TopLeft,false);
            myUIManager.OnRoomJoined(o.Room);

        //    new ActiveLobbyUI(myShuffUIManager, myPageHandler, o.Room);
        }
         

        private void PopulateGames(UserModel user, GetGameTypesReceivedResponse o)
        {
            myScope.Model.GameTypes = o.GameTypes;
            myScope.Model.SelectedGameType = myScope.Model.GameTypes[0];
            myScope.Apply();

            myUIManager.PageHandler.ClientSiteManager.GetRooms(new GetRoomsRequest(o.GameTypes[0].Name));
        }

        private void PopulateRooms(UserModel user, GetRoomsResponse o)
        {
            myScope.Model.Rooms = o.Rooms;
            myScope.Model.SelectedRoom = null;

            myScope.Apply();

            if (myScope.Model.Rooms.Count == 0) return;
            PopulateRoom(myScope.Model.Rooms[0]);
        }

        private void PopulateRoom(RoomData roomData)
        {
            myScope.Model.SelectedRoom = roomData;
            myScope.Apply();
        }
        void myUIManager_UserLoggedIn()
        {
            myScope.Visible = true;
            myScope.SwingAway(SwingDirection.BottomLeft, true);
            myScope.SwingBack();
            myScope.Apply();

            myUIManager.PageHandler.ClientSiteManager.GetGameTypes();

        } 
    } 
}
using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Runtime.CompilerServices;
using Models;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.UIWindow
{
    public class HomeUI
    {
        private readonly PageHandler myPageHandler;
        private readonly ShuffUIManager myShuffUIManager;
        private ShuffLabel lblHeader;
        private ShuffButton myCreateGameType;
        private ShuffButton myCreateRoom;
        private ShuffListBox myGameTypeList;
        private ShuffButton myJoinRoom;
        private List<RoomData> myLoadedRooms;
        private ShuffButton myRefreshRoom;
        private ShuffLabel myRoomGameType;
        private ShuffLabel myRoomName;
        private ShuffListBox myRoomPlayers;
        private ShuffListBox myRoomsList;
        private ShuffButton mySpectateRoom;
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public HomeUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            myShuffUIManager = shuffUIManager;
            myPageHandler = pageHandler;

            pageHandler.ClientSiteManager.OnGetGameTypesReceived += PopulateGames;
            pageHandler.ClientSiteManager.OnGetRoomsReceived += PopulateRooms;
            pageHandler.ClientSiteManager.OnRoomJoined += RoomJoined;
            pageHandler.ClientSiteManager.OnGetRoomInfoReceived += GetRoomInfo;

            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "CardGame",
                                                                             X = 400,
                                                                             Y = 100,
                                                                             Width = 600,
                                                                             Height = 450,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = false
                                                                     });

            lblHeader = UIWindow.AddElement(new ShuffLabel(40, 44, "Please Login!"));

            UIWindow.AddElement(new ShuffLabel(30, 80, "Game Types"));
            myGameTypeList = UIWindow.AddElement(new ShuffListBox(25, 100, 150, 300) {
                                                                                             OnClick = (item) => { myPageHandler.ClientSiteManager.GetRooms(new GetRoomsRequest((string) item.Value)); }
                                                                                     });

            myCreateGameType = UIWindow.AddElement(new ShuffButton(45, 410, 100, 40, "Create New Game!", c => {

                                                                                                             CodeEditorUI ui = new CodeEditorUI(shuffUIManager, pageHandler);

                                                                                                         }));

            UIWindow.AddElement(new ShuffLabel(210, 80, "Rooms"));

            myCreateRoom = UIWindow.AddElement(new ShuffButton(260,
                                                               70,
                                                               70,
                                                               25,
                                                               "Refresh!",
                                                               c => { myPageHandler.ClientSiteManager.GetRooms(new GetRoomsRequest((string) myGameTypeList.SelectedItem.Value)); }));

            myRoomsList = UIWindow.AddElement(new ShuffListBox(200, 100, 175, 300) {
                                                                                           OnClick = (item) => {
                                                                                                         var room = myLoadedRooms.First(a => a.RoomName == (string) item.Value);

                                                                                                         PopulateRoom(room);
                                                                                                     }
                                                                                   });

            myCreateRoom = UIWindow.AddElement(new ShuffButton(225,
                                                               410,
                                                               100,
                                                               40,
                                                               "Create New Room!",
                                                               c => {
                                                                   var create = new CreateRoomUI(shuffUIManager, pageHandler, (string) myGameTypeList.SelectedItem.Value);
                                                                   shuffUIManager.Focus(create.UIWindow);
                                                               }));

            myRoomPlayers = UIWindow.AddElement(new ShuffListBox(400, 200, 175, 200) {Visible = false});

            myRoomGameType = UIWindow.AddElement(new ShuffLabel(400, 100, "") {Visible = false});
            myRoomName = UIWindow.AddElement(new ShuffLabel(400, 130, "") {Visible = false});
            myJoinRoom = UIWindow.AddElement(new ShuffButton(410, 160, 75, 25, "Join!", c => { pageHandler.ClientSiteManager.JoinRoom(new RoomJoinRequest((string) myGameTypeList.SelectedItem.Value, (string) myRoomsList.SelectedItem.Value)); }) {Visible = false});

            mySpectateRoom = UIWindow.AddElement(new ShuffButton(490, 160, 75, 25, "Spectate!", c => { }) {Visible = false});

            myRefreshRoom = UIWindow.AddElement(new ShuffButton(420, 410, 150, 25, "Refresh!", c => { pageHandler.ClientSiteManager.GetRoomInfo(new GetRoomInfoRequest((string) myGameTypeList.SelectedItem.Value, (string) myRoomsList.SelectedItem.Value)); }) {Visible = false});

            //UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.ClientSiteManager.GetGameList(); }));
        }

        private void GetRoomInfo(UserModel user, GetRoomInfoResponse o)
        {
            for (int i = 0; i < myLoadedRooms.Count; i++) {
                if (myLoadedRooms[i].ID == o.Room.ID) {
                    myLoadedRooms.RemoveAt(i);
                    myLoadedRooms.Insert(i, o.Room);
                    break;
                }
            }

            PopulateRoom(o.Room);
        }

        private void RoomJoined(UserModel user, RoomJoinResponse o)
        {
            PopulateRoom(o.Room);

            UIWindow.SwingAway(SwingDirection.TopLeft);
            new ActiveLobbyUI(myShuffUIManager, myPageHandler, o.Room);
        }

        public void UserLoggedIn()
        {
            lblHeader.Text = string.Format("Welcome: {0}!", myPageHandler.ClientInfo.LoggedInUser.UserName);
            myPageHandler.ClientSiteManager.GetGameTypes();
            UIWindow.Visible = true;
            UIWindow.SwingAway(SwingDirection.BottomLeft, true);
            UIWindow.SwingBack();
        }

        private void PopulateGames(UserModel user, GetGameTypesReceivedResponse o)
        {
            myGameTypeList.ClearItems();

            foreach (var gameType in o.GameTypes) {
                myGameTypeList.AddItem(new ShuffListItem(gameType.Name, gameType.Name));
            }

            myPageHandler.ClientSiteManager.GetRooms(new GetRoomsRequest(o.GameTypes[0].Name));
        }

        private void PopulateRooms(UserModel user, GetRoomsResponse o)
        {
            myRoomsList.ClearItems();
            myLoadedRooms = o.Rooms;
            if (o.Rooms.Count == 0) return;
            foreach (var room in o.Rooms) {
                myRoomsList.AddItem(new ShuffListItem(room.RoomName, room.RoomName));
            }
            PopulateRoom(o.Rooms[0]);
        }

        private void PopulateRoom(RoomData roomData)
        {
            myRoomPlayers.Visible = true;
            myRoomName.Visible = true;
            myRoomGameType.Visible = true;
            myJoinRoom.Visible = true;
            mySpectateRoom.Visible = true;
            myRefreshRoom.Visible = true;

            myRoomPlayers.ClearItems();
            foreach (var userModel in roomData.Players) {
                myRoomPlayers.AddItem(new ShuffListItem(userModel.UserName, userModel.UserName));
            }
            myRoomName.Text = string.Format("Room: {0}", roomData.RoomName);
            myRoomGameType.Text = string.Format("Game Type: {0}", roomData.GameType);
        }
    }
}
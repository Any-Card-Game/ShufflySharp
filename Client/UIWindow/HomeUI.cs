using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
using ShuffUI;
namespace Client.UIWindow
{
    public class HomeUI
    {
        private readonly PageHandler myPageHandler;
        private readonly ShuffUIManager myShuffUIManager;
        private ShuffLabel lblHeader;
        private ShuffListBox myGameTypeList;
        private List<RoomData> myLoadedRooms;
        private ShuffListBox myRoomsList;
        private ShuffListBox myRoomPlayers;
        private ShuffLabel myRoomName;
        private ShuffLabel myRoomGameType;
        private ShuffButton myJoinRoom;
        private ShuffButton mySpectateRoom;
        private ShuffButton myCreateGameType;
        private ShuffButton myCreateRoom;
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public HomeUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            myShuffUIManager = shuffUIManager;
            myPageHandler = pageHandler;

            pageHandler.ClientSiteManager.OnGetGameTypesReceived += PopulateGames;
            pageHandler.ClientSiteManager.OnGetRoomsReceived += PopulateRooms;

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

            myCreateGameType = UIWindow.AddElement(new ShuffButton(45, 410, 100, 40, "Create New Game!", c => { Window.Alert("Insert Developer UI Here"); }));

            UIWindow.AddElement(new ShuffLabel(240, 80, "Rooms"));

            myRoomsList = UIWindow.AddElement(new ShuffListBox(200, 100, 175, 300)
            {
                OnClick = (item) =>
                {
                    var room = myLoadedRooms.First(a => a.RoomName == (string)item.Value);
                    PopulateRoom(room);
                }
            });
            myCreateRoom = UIWindow.AddElement(new ShuffButton(225, 410, 100, 40, "Create New Room!", c => { Window.Alert("Insert Insert Here"); }));

            myRoomPlayers = UIWindow.AddElement(new ShuffListBox(400, 200, 175, 250){Visible=false});


            myRoomGameType = UIWindow.AddElement(new ShuffLabel(400, 100, "") { Visible = false });
            myRoomName = UIWindow.AddElement(new ShuffLabel(400, 130, "") { Visible = false });
            myJoinRoom = UIWindow.AddElement(new ShuffButton(410, 160, 75, 25, "Join!", c =>
            {
                Window.Alert("Joined!");
            }) { Visible = false });

            mySpectateRoom = UIWindow.AddElement(new ShuffButton(490, 160, 75, 25, "Spectate!", c =>
            {
                Window.Alert("Spectate!");
            }) { Visible = false });

            //UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.ClientSiteManager.GetGameList(); }));
        }

        public void UserLoggedIn()
        {
            lblHeader.Text = string.Format("Welcome: {0}!", myPageHandler.ClientInfo.LoggedInUser.UserName);
            myPageHandler.ClientSiteManager.GetGameTypes();
            UIWindow.Visible = true;
        }

        private void PopulateGames(GetGameTypesReceivedResponse o)
        {
            myGameTypeList.ClearItems();

            foreach (var gameType in o.GameTypes) {
                myGameTypeList.AddItem(new ShuffListItem(gameType.Name, gameType.Name));
            }

            myPageHandler.ClientSiteManager.GetRooms(new GetRoomsRequest(o.GameTypes[0].Name));
        }

        private void PopulateRooms(GetRoomsResponse o)
        {
            myRoomsList.ClearItems();
            myLoadedRooms = o.Rooms;
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

            myRoomPlayers.ClearItems();
            foreach (var userModel in roomData.Players) {
                myRoomPlayers.AddItem(new ShuffListItem(userModel.UserName, userModel.UserName));
            }
            myRoomName.Text = string.Format("Room: {0}", roomData.RoomName);
            myRoomGameType.Text = string.Format("Game Type: {0}", roomData.GameType);
        }
    }
}
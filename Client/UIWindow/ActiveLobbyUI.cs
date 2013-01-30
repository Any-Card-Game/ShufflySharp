using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Runtime.CompilerServices;
using Models.ChatManagerModels;
using Models.SiteManagerModels;
using ShuffUI;
using jQueryApi;
using jQueryApi.UI.Widgets;
namespace Client.UIWindow
{
    public class ActiveLobbyUI
    {
        private readonly PageHandler myPageHandler;
        private readonly RoomData myRoom;
        private readonly ShuffUIManager myShuffUIManager;
        private ShuffListBox myRoomPlayers;
        private ChatBox myChatBox;
        private ShuffTextbox myChatText;
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public ActiveLobbyUI(ShuffUIManager shuffUIManager, PageHandler pageHandler,RoomData room)
        {
            pageHandler.ClientSiteManager.OnGetRoomInfoReceived += GetRoomInfo;
            pageHandler.ClientChatManager.OnGetChatContent += GetChatInfo;


            myShuffUIManager = shuffUIManager;
            myPageHandler = pageHandler;
            myRoom = room;

            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = string.Format("{0} Lobby", myRoom.RoomName),
                                                                             X = 250,
                                                                             Y = 100,
                                                                             Width = 800,
                                                                             Height = 600,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = true
                                                                     });
            UIWindow.OnClose += () => {
                pageHandler.HomeUI.UIWindow.SwingBack();
                                };

            UIWindow.SwingAway(SwingDirection.BottomRight, true);


            myRoomPlayers = UIWindow.AddElement(new ShuffListBox(600, 200, 175, 300) { Visible = true });
            
            myChatBox=UIWindow.AddElement(new ChatBox(50, 50, 550, 500) {Visible = true});
            
            myChatText = UIWindow.AddElement(new ShuffTextbox(50, 560, 50, 30, "", ""));

            UIWindow.AddElement(new ShuffButton(560, 560, 50, 30, "Send", (e) =>
            {

                //pageHandler.ClientChatManager.SendChatMessage();
            }));

            UIWindow.SwingBack();
            pageHandler.ClientChatManager.RegisterChatChannel(room.ChatChannel);
            PopulateRoom(room);
        }

        protected void GetChatInfo(GetChatInfoMessages o)
        {
            
        }
      

        private void GetRoomInfo(GetRoomInfoResponse o)
        { 
            PopulateRoom(o.Room);
        }
        private void PopulateRoom(RoomData roomData)
        { 

            myRoomPlayers.ClearItems();
            foreach (var userModel in roomData.Players)
            {
                myRoomPlayers.AddItem(new ShuffListItem(userModel.UserName, userModel.UserName));
            } 
        }

    }
    public class ChatBox:ShuffElement
    {
        public ChatBox(int x, int y, int width, int height)
        {
            Element = jQuery.Select("<div></div>");
            Element.CSS("position", "absolute");
            Element.CSS("background-color", "red");



            X = x;
            Y = y;
            Width = width;
            Height = height;
            Visible = true;  
        }
    }
}
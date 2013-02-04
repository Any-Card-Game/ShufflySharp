using System.Runtime.CompilerServices;
using Client.UIWindow.Controls;
using Models;
using Models.ChatManagerModels;
using Models.SiteManagerModels;
using ShuffUI;
namespace Client.UIWindow
{
    public class ActiveLobbyUI
    {
        private readonly PageHandler myPageHandler;
        private readonly RoomData myRoom;
        private readonly ShuffUIManager myShuffUIManager;
        private ChatBox myChatBox;
        private ShuffTextbox myChatText;
        private ShuffListBox myRoomPlayers;
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public ActiveLobbyUI(ShuffUIManager shuffUIManager, PageHandler pageHandler, RoomData room)
        {
            pageHandler.ClientSiteManager.OnGetRoomInfoReceived += GetRoomInfo;
            pageHandler.ClientChatManager.OnGetChatLines += GetChatLines;
            pageHandler.ClientChatManager.OnGetChatInfo += GetChatInfo;

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
                                    UIWindow.Visible = true;
                                    UIWindow.SwingAway(SwingDirection.BottomRight);
                                    pageHandler.ClientSiteManager.LeaveRoom(new LeaveRoomRequest(room));
                                    pageHandler.HomeUI.UIWindow.SwingBack();
                                };

            UIWindow.SwingAway(SwingDirection.BottomRight, true);

            myRoomPlayers = UIWindow.AddElement(new ShuffListBox(600, 200, 175, 300) {Visible = true});

            UIWindow.AddElement(new ShuffButton(600, 510, 175, 23, "Start Game!", (a) =>
            { 
                pageHandler.GameManager.StartGame( );

                UIWindow.Height = 200;
            }));



            myChatBox = UIWindow.AddElement(new ChatBox(50, 50, 550, 500) {Visible = true});

            myChatText = UIWindow.AddElement(new ShuffTextbox(50, 560, 500, 30, "", "")
            {
                OnEnter = () =>
                {
                    if (myChatText.Text.Trim() == string.Empty)
                        return;

                    pageHandler.ClientChatManager.SendChatMessage(new SendChatMessageModel(myChatText.Text));
                    myChatText.Text = "";
                }
            });

            UIWindow.AddElement(new ShuffButton(560,
                                                560,
                                                50,
                                                30,
                                                "Send",
                                                (e) => {
                                                    if (myChatText.Text.Trim() == string.Empty)
                                                        return;

                                                    pageHandler.ClientChatManager.SendChatMessage(new SendChatMessageModel(myChatText.Text));
                                                    myChatText.Text = "";
                                                }));

            UIWindow.SwingBack();
            PopulateGameRoom(room);
        }

        private void GetChatLines(UserModel user, ChatMessagesModel o)
        {
            myChatBox.AddChatMessages(o.Messages);
        }

        private void GetChatInfo(UserModel user, ChatRoomInfoModel o)
        {
            PopulateChatRoom(o.Info);
        }

        private void GetRoomInfo(UserModel user, GetRoomInfoResponse o)
        {
            PopulateGameRoom(o.Room);
        }

        private void PopulateChatRoom(ChatRoomModel roomData)
        {
            myRoomPlayers.ClearItems();
            foreach (var userModel in roomData.Users) {
                myRoomPlayers.AddItem(new ShuffListItem(userModel.UserName, userModel.UserName));
            }
            if (roomData.Messages != null)
                myChatBox.AddChatMessages(roomData.Messages);
        }

        private void PopulateGameRoom(RoomData roomData) {}
    }
}
/* http://www.youtube.com/watch?v=dsQHNmaNxDg */
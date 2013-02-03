using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
using ShuffUI;
using jQueryApi;
namespace Client.UIWindow
{
    public class CreateRoomUI
    {
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public CreateRoomUI(ShuffUIManager shuffUIManager, PageHandler pageHandler, string gameType)
        {
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "Create Room",
                                                                             X = jQuery.Select("body").GetInnerWidth() / 2 - 280 / 2,
                                                                             Y = jQuery.Select("body").GetInnerHeight() / 2 - 125 / 2,
                                                                             Width = 280,
                                                                             Height = 125,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = true
                                                                     });
            UIWindow.SwingAway(SwingDirection.BottomLeft, true);
            UIWindow.SwingBack();

            ShuffTextbox roomName = null;
            UIWindow.AddElement(roomName = new ShuffTextbox(115, 40, 150, 30, "", "Room Name") {OnEnter = () => { createRoom(pageHandler, gameType, roomName); }});

            UIWindow.AddElement(new ShuffButton(55,
                                                100,
                                                90,
                                                30,
                                                "Create",
                                                (e) => { createRoom(pageHandler, gameType, roomName); }));
            roomName.Focus();
        }

        private void createRoom(PageHandler pageHandler, string gameType, ShuffTextbox roomName)
        {
            pageHandler.ClientSiteManager.CreateRoom(new CreateRoomRequest(gameType, roomName.Text));

            UIWindow.SwingAway(SwingDirection.TopRight);
        }
    }
}
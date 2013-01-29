using System.Html;
using System.Runtime.CompilerServices;
using Models;
using Models.SiteManagerModels;
using ShuffUI;
using jQueryApi;
namespace Client.UIWindow
{
    public class CreateRoomUI
    {
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public CreateRoomUI(ShuffUIManager shuffUIManager, PageHandler pageHandler,string gameType)
        {
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow()
            {
                Title = "Login",
                X = jQuery.Select("body").GetInnerWidth()/2-280/2,
                Y = jQuery.Select("body").GetInnerHeight() / 2-125/2,
                Width = 280,
                Height = 125,
                AllowClose = true,
                AllowMinimize = true,
                Visible = true
            });

            ShuffTextbox roomName;
            UIWindow.AddElement(roomName = new ShuffTextbox(115, 40, 150, 30, "", "Room Name"));

            UIWindow.AddElement(new ShuffButton(55, 100, 90, 30, "Create", (e) => { pageHandler.ClientSiteManager.CreateRoom(new CreateRoomRequest(gameType,roomName.Text));

                                                                               UIWindow.Visible = false;//todo: delete
                                                                           })); 

            pageHandler.ClientSiteManager.OnLogin += (data) =>
            {
                pageHandler.ClientInfo.LoggedInUser = data.User;
                pageHandler.HomeUI.UserLoggedIn();
            };
        }
    }
}
using System.Html;
using System.Runtime.CompilerServices;
using Models;
using ShuffUI;
using jQueryApi;
namespace Client.UIWindow
{
    public class LoginUI
    {
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public LoginUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow()
            {
                Title = "Login",
                X = jQuery.Select("body").GetInnerWidth() - 500,
                Y = 100,
                Width = 280,
                Height = 165,
                AllowClose = true,
                AllowMinimize = true,
                Visible = true
            });

            ShuffTextbox loginName;
            ShuffTextbox password;
            UIWindow.AddElement(loginName = new ShuffTextbox(115, 40, 150, 30, "", "Username"));
            UIWindow.AddElement(password = new ShuffTextbox(115, 75, 150, 30, "", "Password"));

            UIWindow.AddElement(new ShuffButton(55, 150, 90, 30, "Create", (e) => { pageHandler.ClientSiteManager.Login(loginName.Text, password.Text); }));
            UIWindow.AddElement(new ShuffButton(155, 150, 90, 30, "Login", (e) => { pageHandler.ClientSiteManager.Login(loginName.Text, password.Text); }));

            pageHandler.ClientSiteManager.OnLogin += (data) =>
            {
                pageHandler.ClientInfo.LoggedInUser = data.User;
                pageHandler.HomeUI.UserLoggedIn();
            };
        }
    }
}
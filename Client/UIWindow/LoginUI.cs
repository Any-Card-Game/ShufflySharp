using System.Html;
using System.Runtime.CompilerServices;
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
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "Login",
                                                                             X = jQuery.Select("body").GetInnerWidth() - 500,
                                                                             Y = 100,
                                                                             Width = 250,
                                                                             Height = 165,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = true
                                                                     });

            ShuffTextbox loginName;
            ShuffTextbox password;
            UIWindow.AddElement(loginName = new ShuffTextbox(140, 40, 150, 30, "", "Username"));
            UIWindow.AddElement(password = new ShuffTextbox(140, 75, 150, 30, "", "Password"));

            UIWindow.AddElement(new ShuffButton(40, 150, 250, 30, "Login", (e) => { pageHandler.ClientSiteManager.Login(loginName.Text, password.Text); }));

            pageHandler.ClientSiteManager.OnLogin += (data) => { Window.Alert("GooooD!"); };
        }
    }
}
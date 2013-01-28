using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
using ShuffUI;
namespace Client.UIWindow
{
    public class ActiveLobbyUI
    {
        private readonly PageHandler myPageHandler;
        private readonly ShuffUIManager myShuffUIManager; 
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public ActiveLobbyUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            myShuffUIManager = shuffUIManager;
            myPageHandler = pageHandler;
             

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
             
        }
         
    }
}
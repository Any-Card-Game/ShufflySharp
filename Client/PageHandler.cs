using System;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Libs;
using Client.ShufflyGame;
using Client.UIWindow;
using ClientLibs;
using ClientLibs.Managers;
using CommonLibraries;
using CommonWebLibraries;
using Models.GameManagerModels;
using ShuffUI;
using global;
namespace Client
{
    public class PageHandler
    {
        public readonly GameDrawer gameDrawer;
        private readonly ShuffUIManager shuffUIManager; 
        [IntrinsicProperty]
        public ClientGameManager ClientGameManager { get; set; }
        [IntrinsicProperty]
        public ClientDebugManager ClientDebugManager { get; set; }
        [IntrinsicProperty]
        public ClientSiteManager ClientSiteManager { get; set; }
        [IntrinsicProperty]
        public ClientChatManager ClientChatManager { get; set; }
        [IntrinsicProperty]
        public TimeTracker TimeTracker { get; set; }
        [IntrinsicProperty]
        public CodeEditorUI CodeEditorUI { get; set; }
        [IntrinsicProperty]
        public QuestionUI QuestionUI { get; set; }
        [IntrinsicProperty]
        public DebugUI DebugUI { get; set; }
        [IntrinsicProperty]
        public HomeUI HomeUI { get; set; }
        [IntrinsicProperty]
        public LoginUI LoginUI { get; set; }
        [IntrinsicProperty]
        public ClientInformation ClientInfo { get; set; }

        public PageHandler(string gatewayServerAddress)
        {
            shuffUIManager = new ShuffUIManager();

            gameDrawer = new GameDrawer();
            TimeTracker = new TimeTracker();

            var gateway = new Gateway(gatewayServerAddress);
            ClientGameManager = new ClientGameManager(gateway);
            ClientSiteManager = new ClientSiteManager(gateway);
            ClientDebugManager = new ClientDebugManager(gateway);
            ClientChatManager = new ClientChatManager(gateway);

            ClientInfo = new ClientInformation();
            this.GameManager = new GameManager(this);

            LoginUI = new LoginUI(shuffUIManager, this);
            HomeUI = new HomeUI(shuffUIManager, this); 
            QuestionUI = new QuestionUI(shuffUIManager, this);

            /*gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
            gateway.On("Area.Lobby.ListRooms.Response", (data) => { Logger.Log });*/

            //ie8
            /*   {
                   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;

                   var m = (Action<string, ElementEventHandler>)d2;
                   m("contextmenu", () =>
                       {
                        
                       }); 
               }*/
        }

        public GameManager GameManager { get; set; }
 
    }
}
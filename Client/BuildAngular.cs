using System;
using System.Runtime.CompilerServices;
using Client.Controllers;
using Client.Directives;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using jQueryApi;
using ng;
namespace Client
{
    public static class BuildAngular
    {
        public static void Setup(string gatewayServer)
        {
            angular.module("acg", new string[] { "ui.utils", "ui.codemirror" })
                 
                .config(new object[] {"$routeProvider",new Action<IRouteProviderProvider>(buildRouteProvider)})
                 .config(new object[] {"$httpProvider", new Action<dynamic>(buildHttpProvider)})
                 
                 .value("gatewayServerURL", gatewayServer)

                 .controller("MinimizeController", new object[] { "$scope", "UIManager", new Func<MinimizeScope, UIManagerService, object>((scope, uiManager) => new MinimizeController(scope, uiManager)) })
                 .controller("GameController", new object[] { "$scope", "clientGameManager", "gameContentManager", new Func<GameControllerScope, ClientGameManagerService, GameContentManager, object>((scope,  clientGameManagerService, gameContentManager) => new GameController(scope,  clientGameManagerService, gameContentManager)) })
                 .controller("TestGameController", new object[] { "$scope",  new Func<TestGameControllerScope, object>((scope ) => new TestGameController(scope)) })
                 .controller("GameEffectsEditorController", new object[] { "$scope", "createUIService", new Func<GameEffectsEditorScope, CreateUIService, object>((scope, createUIService) => new GameEffectsEditorController(scope, createUIService)) })
                 .controller("LoginController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", "createUIService", new Func<LoginScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, messageService, createUIService) => new LoginController(scope, uiManager, clientSiteManagerService, messageService, createUIService)) })
                 .controller("QuestionController", new object[] { "$scope", "UIManager", "clientGameManager", new Func<QuestionScope, UIManagerService, ClientGameManagerService, object>((scope, uiManager, clientGameManagerService) => new QuestionController(scope, uiManager, clientGameManagerService)) })
                 .controller("HomeController", new object[] { "$scope", "UIManager", "clientSiteManager", "createUIService", new Func<HomeScope, UIManagerService, ClientSiteManagerService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, createUIService) => new HomeController(scope, uiManager, clientSiteManagerService, createUIService)) })
                 .controller("ActiveLobbyController", new object[] { "$scope", "UIManager", "clientSiteManager", "clientChatManager", "createUIService", new Func<ActiveLobbyScope, UIManagerService, ClientSiteManagerService, ClientChatManagerService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, clientChatManagerService, createUIService) => new ActiveLobbyController(scope, uiManager, clientSiteManagerService, clientChatManagerService, createUIService)) })
                 .controller("CreateRoomController", new object[] { "$scope", "UIManager", new Func<CreateRoomScope, UIManagerService, object>((scope, uiManager) => new CreateRoomController(scope, uiManager)) })
                 .controller("GameManagerController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", new Func<GameManagerScope, UIManagerService, ClientSiteManagerService, MessageService, object>((scope, uiManagerService, clientSiteManagerService, messageService) => new GameManagerController(scope, uiManagerService, clientSiteManagerService, messageService)) })
                 .controller("GameEditorController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", "createUIService", new Func<GameEditorScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, uiManagerService, clientSiteManagerService, messageService, createUIService) => new GameEditorController(scope, uiManagerService, clientSiteManagerService, messageService, createUIService)) })
                 .controller("GameLayoutEditorController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", "createUIService", new Func<GameLayoutEditorScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, uiManagerService, clientSiteManagerService, messageService, createUIService) => new GameLayoutEditorController(scope, uiManagerService, clientSiteManagerService, messageService, createUIService)) })
                 .controller("GameScenarioEditorController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", "createUIService", new Func<GameScenarioEditorScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, uiManagerService, clientSiteManagerService, messageService, createUIService) => new GameScenarioEditorController(scope, uiManagerService, clientSiteManagerService, messageService, createUIService)) })
                 .controller("GameCodeController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", new Func<GameCodeScope, UIManagerService, ClientSiteManagerService, MessageService, object>((scope, uiManager, clientSiteManagerService, messageService) => new GameCodeController(scope, uiManager, clientSiteManagerService, messageService)) })
                 .controller("MessageController", new object[] { "$scope", new Func<MessageScope, object>((scope) => new MessageController(scope)) })
                 .controller("EffectTesterController", new object[] { "$scope", new Func<EffectTesterControllerScope, object>((scope) => new EffectTesterController(scope)) })
                 
                 .service("UIManager", new object[] { "clientGameManager",new Func<ClientGameManagerService,object>((clientGameManagerService) => new UIManagerService(clientGameManagerService)) })
   
                 .service("clientChatManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientChatManagerService(gatewayService)) })
                 .service("clientGameManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientGameManagerService(gatewayService)) })
                 .service("clientDebugManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientDebugManagerService(gatewayService)) })
                 .service("clientSiteManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientSiteManagerService(gatewayService)) })
                 .service("gateway", new object[] { "gatewayServerURL", new Func<string, object>((serverUrl) => new GatewayService(serverUrl)) })
                 .service("gameContentManager", new object[] { new Func<object>(() => new GameContentManager()) })
                 .service("messageService", new object[] { "createUIService", "$rootScope", new Func<CreateUIService, IRootScopeService, object>((createUIService, rootScopeService) => new MessageService(createUIService, rootScopeService)) })
                 .service("createUIService", new object[] { "$compile", "$rootScope", new Func<CompileService, IRootScopeService, object>((compileService, rootScopeService) => new CreateUIService(compileService, rootScopeService)) })

                 .directive("grid", new object[] { new Func<object>(() => new GridDirective()) })
                 .directive("draggable", new object[] { new Func<object>(() => new DraggableDirective()) })
                 .directive("floatingWindow", new object[] { "UIManager",new Func<UIManagerService, object>((uiManagerService) => new FloatingWindowDirective(uiManagerService)) })
                 .directive("fancyList", new object[] { new Func<object>(() => new FancyListDirective()) })
                 .directive("chatBox", new object[] { new Func<object>(() => new ChatBoxDirective()) })
                 .directive("property", new object[] { new Func<object>(() => new PropertyDirective()) })
                 .directive("acgDrawCard", new object[] {  new Func< object>(() => new AcgDrawCardDirective()) })
                 .directive("acgDrawSpace", new object[] { new Func<object>(() => new AcgDrawSpaceDirective()) })
                 .directive("acgTestDrawCard", new object[] { new Func<object>(() => new AcgTestDrawCardDirective()) })
                 .directive("acgTestDrawSpace", new object[] { new Func<object>(() => new AcgTestDrawSpaceDirective()) })

                 .directive("acgEffectTestDrawArea", new object[] { new Func<object>(() => new AcgEffectTestDrawAreaDirective()) })
                 .directive("acgEffectTestDrawText", new object[] { new Func<object>(() => new AcgEffectTestDrawTextDirective()) })
                 .directive("acgEffectTestDrawCard", new object[] { new Func<object>(() => new AcgEffectTestDrawCardDirective()) })
                 .directive("acgEffectTestDrawSpace", new object[] { new Func<object>(() => new AcgEffectTestDrawSpaceDirective()) })
                 .directive("acgTestDrawArea", new object[] { new Func<object>(() => new AcgTestDrawAreaDirective()) })
                 .directive("acgTestDrawText", new object[] { new Func<object>(() => new AcgTestDrawTextDirective()) })
                 .directive("acgSpaces", new object[] { "$compile", "gameContentManager", new Func<CompileService, GameContentManager, object>((compile, gameContentManager) => new AcgSpacesDirective(compile, gameContentManager)) });
            
        }

        private static void buildRouteProvider(IRouteProviderProvider provider)
        {
        }

        private static void buildHttpProvider(dynamic httpProvider)
        {
            httpProvider.defaults.useXDomain = true;
            Delete(httpProvider.defaults.headers.common["X-Requested-With"]);
        }

        [InlineCode("delete {o};")]
        private static void Delete(object o)
        {
        }
    }
}
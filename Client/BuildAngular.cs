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
            angular.module("acg", new string[] { "ui.utils" })
                 
                .config(new object[] {"$routeProvider",new Action<IRouteProviderProvider>(buildRouteProvider)})
                 .config(new object[] {"$httpProvider", new Action<dynamic>(buildHttpProvider)})
                 
                 .value("gatewayServerURL", gatewayServer)

                 .controller("GameCodeController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", new Func<GameCodeScope, UIManagerService, ClientSiteManagerService, MessageService, object>((scope, uiManager, clientSiteManagerService, messageService) => new GameCodeController(scope, uiManager, clientSiteManagerService, messageService)) })
                 .controller("MinimizeController", new object[] { "$scope", "UIManager", new Func<MinimizeScope, UIManagerService, object>((scope, uiManager) => new MinimizeController(scope, uiManager)) })
                 .controller("GameController", new object[] { "$scope", "effectWatcher", "clientGameManager", "gameContentManager", "effectManager", new Func<GameCtrlScope, EffectWatcherService, ClientGameManagerService, GameContentManager, EffectManagerService, object>((scope, effectWatcher, clientGameManagerService, gameContentManager, effectManager) => new GameController(scope, effectWatcher, clientGameManagerService, gameContentManager, effectManager)) })
                 .controller("ListEffectsController", new object[] { "$scope", "editEffects", "effectWatcher", "effectManager", new Func<ListEffectsScope, EditEffectService, EffectWatcherService, EffectManagerService, object>((scope, editEffects, effectWatcher, effectmanager) => new ListEffectsController(scope, editEffects, effectWatcher, effectmanager)) })
                 .controller("EffectEditorController", new object[] { "$scope", "editEffects", new Func<EffectEditorScope, EditEffectService, object>((scope, editEffects) => new EffectEditorController(scope, editEffects)) })
                 .controller("LoginController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", new Func<LoginScope, UIManagerService, ClientSiteManagerService, MessageService, object>((scope, uiManager, clientSiteManagerService, messageService) => new LoginController(scope, uiManager, clientSiteManagerService, messageService)) })
                 .controller("QuestionController", new object[] { "$scope", "UIManager", "clientGameManager", new Func<QuestionScope, UIManagerService, ClientGameManagerService, object>((scope, uiManager, clientGameManagerService) => new QuestionController(scope, uiManager, clientGameManagerService)) })
                 .controller("HomeController", new object[] { "$scope", "UIManager", "clientSiteManager", "createUIService", new Func<HomeScope, UIManagerService, ClientSiteManagerService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, createUIService) => new HomeController(scope, uiManager, clientSiteManagerService, createUIService)) })
                 .controller("ActiveLobbyController", new object[] { "$scope", "UIManager", "clientSiteManager", "clientChatManager", "createUIService", new Func<ActiveLobbyScope, UIManagerService, ClientSiteManagerService, ClientChatManagerService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, clientChatManagerService, createUIService) => new ActiveLobbyController(scope, uiManager, clientSiteManagerService, clientChatManagerService, createUIService)) })
                 .controller("CreateRoomController", new object[] { "$scope", "UIManager", new Func<CreateRoomScope, UIManagerService, object>((scope, uiManager) => new CreateRoomController(scope, uiManager)) })
                 .controller("GameManagerController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", new Func<GameManagerScope, UIManagerService, ClientSiteManagerService, MessageService, object>((scope, uiManagerService, clientSiteManagerService, messageService) => new GameManagerController(scope, uiManagerService, clientSiteManagerService, messageService)) })
                 .controller("GameEditorController", new object[] { "$scope", "UIManager", "clientSiteManager", "messageService", "createUIService", new Func<GameEditorScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, uiManagerService, clientSiteManagerService, messageService, createUIService) => new GameEditorController(scope, uiManagerService, clientSiteManagerService, messageService, createUIService)) })
                 .controller("MessageController", new object[] { "$scope", new Func<MessageScope, object>((scope) => new MessageController(scope)) })
                 
                 .service("UIManager", new object[] { "clientGameManager",new Func<ClientGameManagerService,object>((clientGameManagerService) => new UIManagerService(clientGameManagerService)) })
                 .service("editEffects", new object[] { new Func<object>(() => new EditEffectService()) })
                 .service("effectWatcher", new object[] { new Func<object>(() => new EffectWatcherService()) })
                 .service("effectManager", new object[] { new Func<object>(() => new EffectManagerService()) })
                 .service("clientChatManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientChatManagerService(gatewayService)) })
                 .service("clientGameManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientGameManagerService(gatewayService)) })
                 .service("clientDebugManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientDebugManagerService(gatewayService)) })
                 .service("clientSiteManager", new object[] { "gateway", new Func<GatewayService, object>((gatewayService) => new ClientSiteManagerService(gatewayService)) })
                 .service("gateway", new object[] { "gatewayServerURL", new Func<string, object>((serverUrl) => new GatewayService(serverUrl)) })
                 .service("gameContentManager", new object[] { new Func<object>(() => new GameContentManager()) })
                 .service("messageService", new object[] { "createUIService", "$rootScope", new Func<CreateUIService, IRootScopeService, object>((createUIService, rootScopeService) => new MessageService(createUIService, rootScopeService)) })
                 .service("createUIService", new object[] { "$compile", "$rootScope", new Func<CompileService, IRootScopeService, object>((compileService, rootScopeService) => new CreateUIService(compileService, rootScopeService)) })
                 
                 .directive("draggable", new object[] { new Func<object>(() => new DraggableDirective()) })
                 .directive("floatingWindow", new object[] { "UIManager",new Func<UIManagerService, object>((uiManagerService) => new FloatingWindowDirective(uiManagerService)) })
                 .directive("fancyList", new object[] { new Func<object>(() => new FancyListDirective()) })
                 .directive("chatBox", new object[] { new Func<object>(() => new ChatBoxDirective()) })
                 .directive("property", new object[] { new Func<object>(() => new PropertyDirective()) })
                 .directive("acgDrawCard", new object[] { "effectManager", new Func<EffectManagerService, object>((effectManager) => new AcgDrawCardDirective(effectManager)) })
                 .directive("acgDrawSpace", new object[] { new Func<object>(() => new AcgDrawSpaceDirective()) })
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
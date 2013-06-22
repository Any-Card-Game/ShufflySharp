using System;
using System.Runtime.CompilerServices;
using CardGameUI.Controllers;
using CardGameUI.Directives;
using CardGameUI.Scope;
using CardGameUI.Services;
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
                 .controller("MinimizeController", new object[] { "$scope", "UIManager", new Func<MinimizeScope, UIManagerService, object>((scope, uiManager) => new MinimizeController(scope, uiManager)) })
                 .controller("GameController", new object[] { "$scope", "effectWatcher", "clientGameManager", "gameContentManager", "effectManager", new Func<GameCtrlScope, EffectWatcherService, ClientGameManagerService, GameContentManager, EffectManagerService, object>((scope, effectWatcher, clientGameManagerService, gameContentManager, effectManager) => new GameController(scope, effectWatcher, clientGameManagerService, gameContentManager, effectManager)) })
                 .controller("ListEffectsController", new object[] { "$scope", "editEffects", "effectWatcher", "effectManager", new Func<ListEffectsScope, EditEffectService, EffectWatcherService, EffectManagerService, object>((scope, editEffects, effectWatcher, effectmanager) => new ListEffectsController(scope, editEffects, effectWatcher, effectmanager)) })
                 .controller("EffectEditorController", new object[] { "$scope", "editEffects", new Func<EffectEditorScope, EditEffectService, object>((scope, editEffects) => new EffectEditorController(scope, editEffects)) })
                 .controller("LoginController", new object[] { "$scope", "UIManager", "clientSiteManager", new Func<LoginScope, UIManagerService, ClientSiteManagerService, object>((scope, uiManager, clientSiteManagerService) => new LoginController(scope, uiManager, clientSiteManagerService)) })
                 .controller("QuestionController", new object[] { "$scope", "UIManager", "clientGameManager", new Func<QuestionScope, UIManagerService, ClientGameManagerService, object>((scope, uiManager, clientGameManagerService) => new QuestionController(scope, uiManager, clientGameManagerService)) })
                 .controller("HomeController", new object[] { "$scope", "UIManager", "clientSiteManager", new Func<HomeScope, UIManagerService, ClientSiteManagerService, object>((scope, uiManager, clientSiteManagerService) => new HomeController(scope, uiManager, clientSiteManagerService)) })
                 .controller("ActiveLobbyController", new object[] { "$scope", "UIManager", "clientSiteManager", "clientChatManager", "$compile", new Func<ActiveLobbyScope, UIManagerService, ClientSiteManagerService, ClientChatManagerService, CompileService, object>((scope, uiManager, clientSiteManagerService, clientChatManagerService, compile) => new ActiveLobbyController(scope, uiManager, clientSiteManagerService, clientChatManagerService, compile)) })
                 .controller("CreateRoomController", new object[] { "$scope", "UIManager", new Func<CreateRoomScope, UIManagerService, object>((scope, uiManager) => new CreateRoomController(scope, uiManager)) })
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
            // provider.When("/gameUI", new Route() {Controller = "GameController", TemplateURL = "http://content.anycardgame.com/partials/gameUI.html"}).Otherwise(new OtherwiseRoute() {RedirectTo = "/gameUI"});
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
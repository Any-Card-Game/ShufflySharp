using System;
using System.Runtime.CompilerServices;
using Client.Controllers;
using Client.Directives;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using ng;

namespace Client
{
    public static class BuildAngular
    {
        private const string ScopeName = "$scope";
        private const string RootScopeName = "$rootScope";
        private const string CompileName = "$compile";
        public static void Setup(string gatewayServer)
        {
            
            angular.module("acg", new string[] {"ui.utils", "ui.codemirror"})
                .config(new object[] {"$routeProvider", new Action<IRouteProviderProvider>(buildRouteProvider)})
                .config(new object[] {"$httpProvider", new Action<dynamic>(buildHttpProvider)})
                .value("gatewayServerURL", gatewayServer)
                .controller(MinimizeController.Name, new object[] {ScopeName, UIManagerService.Name, new Func<MinimizeScope, UIManagerService, object>((scope, uiManager) => new MinimizeController(scope, uiManager))})
                .controller(GameController.Name,
                    new object[]
                    {
                        ScopeName, ClientGameManagerService.Name, GameContentManagerService.Name, CreateUIService.Name,
                        new Func<GameControllerScope, ClientGameManagerService, GameContentManagerService, CreateUIService, object>(
                            (scope, clientGameManagerService, gameContentManager, createUIService) => new GameController(scope, clientGameManagerService, gameContentManager, createUIService))
                    })
                .controller(DebugGameController.Name,
                    new object[]
                    {
                        ScopeName, ClientDebugManagerService.Name, GameContentManagerService.Name, CreateUIService.Name,
                        new Func<DebugGameControllerScope, ClientDebugManagerService, GameContentManagerService, CreateUIService, object>(
                            (scope, clientGameManagerService, gameContentManager, createUIService) => new DebugGameController(scope, clientGameManagerService, gameContentManager, createUIService))
                    })
                .controller(TestGameController.Name, new object[] {ScopeName, new Func<TestGameControllerScope, object>((scope) => new TestGameController(scope))})
                .controller(GameEffectsEditorController.Name,
                    new object[] {ScopeName, CreateUIService.Name, new Func<GameEffectsEditorScope, CreateUIService, object>((scope, createUIService) => new GameEffectsEditorController(scope, createUIService))})
                .controller(LoginController.Name,
                    new object[]
                    {
                        ScopeName, UIManagerService.Name, ClientSiteManagerService.Name, MessageService.Name, CreateUIService.Name,
                        new Func<LoginScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>(
                            (scope, uiManager, clientSiteManagerService, messageService, createUIService) => new LoginController(scope, uiManager, clientSiteManagerService, messageService, createUIService))
                    })
                .controller(DebugQuestionController.Name,
                    new object[] {ScopeName, ClientDebugManagerService.Name, new Func<QuestionScope, ClientDebugManagerService, object>((scope, clientDebugManagerService) => new DebugQuestionController(scope, clientDebugManagerService))})
                .controller(QuestionController.Name,
                    new object[] {ScopeName, ClientGameManagerService.Name, new Func<QuestionScope, ClientGameManagerService, object>((scope, clientGameManagerService) => new QuestionController(scope, clientGameManagerService))})
                .controller(HomeController.Name,
                    new object[]
                    {
                        ScopeName, UIManagerService.Name, ClientSiteManagerService.Name, CreateUIService.Name,
                        new Func<HomeScope, UIManagerService, ClientSiteManagerService, CreateUIService, object>(
                            (scope, uiManager, clientSiteManagerService, createUIService) => new HomeController(scope, uiManager, clientSiteManagerService, createUIService))
                    })
                .controller(ActiveLobbyController.Name,
                    new object[]
                    {
                        ScopeName, ClientSiteManagerService.Name, ClientChatManagerService.Name, CreateUIService.Name,
                        new Func<ActiveLobbyScope, ClientSiteManagerService, ClientChatManagerService, CreateUIService, object>(
                            (scope, clientSiteManagerService, clientChatManagerService, createUIService) => new ActiveLobbyController(scope, clientSiteManagerService, clientChatManagerService, createUIService))
                    })
                .controller(CreateRoomController.Name, new object[] {ScopeName, new Func<CreateRoomScope, object>((scope) => new CreateRoomController(scope))})
                .controller(GameManagerController.Name,
                    new object[]
                    {
                        ScopeName, UIManagerService.Name, CreateUIService.Name, ClientSiteManagerService.Name, MessageService.Name,
                        new Func<GameManagerScope, UIManagerService, CreateUIService, ClientSiteManagerService, MessageService, object>(
                            (scope, uiManagerService, createUIService, clientSiteManagerService, messageService) => new GameManagerController(scope, uiManagerService, createUIService, clientSiteManagerService, messageService))
                    })
                .controller(GameEditorController.Name,
                    new object[]
                    {
                        ScopeName, ClientSiteManagerService.Name, ClientDebugManagerService.Name, MessageService.Name, CreateUIService.Name,
                        new Func<GameEditorScope, ClientSiteManagerService, ClientDebugManagerService, MessageService, CreateUIService, object>(
                            (scope, clientSiteManagerService, clientDebugManagerService, messageService, createUIService) => new GameEditorController(scope, clientSiteManagerService, clientDebugManagerService, messageService, createUIService))
                    })
                .controller(GameLayoutEditorController.Name,
                    new object[]
                    {
                        ScopeName, ClientSiteManagerService.Name, MessageService.Name, CreateUIService.Name,
                        new Func<GameLayoutEditorScope, ClientSiteManagerService, MessageService, CreateUIService, object>(
                            (scope, clientSiteManagerService, messageService, createUIService) => new GameLayoutEditorController(scope, clientSiteManagerService, messageService, createUIService))
                    })
                .controller(GameScenarioEditorController.Name,
                    new object[]
                    {
                        ScopeName, ClientSiteManagerService.Name, MessageService.Name, CreateUIService.Name, ClientGameManagerService.Name,
                        new Func<GameScenarioEditorScope, ClientSiteManagerService, MessageService, CreateUIService, object>(
                            (scope, clientSiteManagerService, messageService, createUIService) => new GameScenarioEditorController(scope, clientSiteManagerService, messageService, createUIService))
                    })
                .controller(GameCodeController.Name,
                    new object[]
                    {
                        ScopeName, ClientSiteManagerService.Name, MessageService.Name,
                        new Func<GameCodeScope, ClientSiteManagerService, MessageService, object>((scope, clientSiteManagerService, messageService) => new GameCodeController(scope, clientSiteManagerService, messageService))
                    })
                .controller(MessageController.Name, new object[] {ScopeName, new Func<MessageScope, object>((scope) => new MessageController(scope))})
                .controller(EffectTesterController.Name, new object[] {ScopeName, new Func<EffectTesterControllerScope, object>((scope) => new EffectTesterController(scope))})
                .service(UIManagerService.Name, new object[] {ClientGameManagerService.Name, new Func<object>(() => new UIManagerService())})
                .service(ClientChatManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientChatManagerService(gatewayService))})
                .service(ClientGameManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientGameManagerService(gatewayService))})
                .service(ClientDebugManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientDebugManagerService(gatewayService))})
                .service(ClientSiteManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientSiteManagerService(gatewayService))})
                .service(GatewayService.Name, new object[] {"gatewayServerURL", new Func<string, object>((serverUrl) => new GatewayService(serverUrl))})
                .service(GameContentManagerService.Name, new object[] {new Func<object>(() => new GameContentManagerService())})
                .service(MessageService.Name, new object[] {CreateUIService.Name, RootScopeName, new Func<CreateUIService, IRootScopeService, object>((createUIService, rootScopeService) => new MessageService(createUIService, rootScopeService))})
                .service(CreateUIService.Name, new object[] {CompileName, RootScopeName, new Func<CompileService, IRootScopeService, object>((compileService, rootScopeService) => new CreateUIService(compileService, rootScopeService))})
                .directive(GridDirective.Name, new object[] {new Func<object>(() => new GridDirective())})
                .directive(DraggableDirective.Name, new object[] {new Func<object>(() => new DraggableDirective())})
                .directive(FloatingWindowDirective.Name, new object[] {UIManagerService.Name, new Func<UIManagerService, object>((uiManagerService) => new FloatingWindowDirective(uiManagerService))})
                .directive(FancyListDirective.Name, new object[] {new Func<object>(() => new FancyListDirective())})
                .directive(ChatBoxDirective.Name, new object[] {new Func<object>(() => new ChatBoxDirective())})
                .directive(PropertyDirective.Name, new object[] {new Func<object>(() => new PropertyDirective())})
                .directive(AcgDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgDrawCardDirective())})
                .directive(AcgDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgDrawSpaceDirective())})
                .directive(AcgTestDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawCardDirective())})
                .directive(AcgTestDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawSpaceDirective())})
                .directive(AcgEffectTestDrawAreaDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawAreaDirective())})
                .directive(AcgEffectTestDrawTextDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawTextDirective())})
                .directive(AcgEffectTestDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawCardDirective())})
                .directive(AcgEffectTestDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawSpaceDirective())})
                .directive(AcgTestDrawAreaDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawAreaDirective())})
                .directive(AcgTestDrawTextDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawTextDirective())})
                .directive(AcgSpacesDirective.Name, new object[] {CompileName, GameContentManagerService.Name, new Func<CompileService, GameContentManagerService, object>((compile, gameContentManager) => new AcgSpacesDirective(compile, gameContentManager))});
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
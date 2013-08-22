using System;
using System.Runtime.CompilerServices;
using Client.Controllers;
using Client.Directives;
using Client.Filters;
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
            angular.Module("acg", new string[] {"ui.utils", "ui.codemirror"})
                .Config(new object[] {"$routeProvider", new Action<IRouteProviderProvider>(buildRouteProvider)})
                .Config(new object[] {"$httpProvider", new Action<dynamic>(buildHttpProvider)})
                .Value("gatewayServerURL", gatewayServer)
                .Controller(MinimizeController.Name, new object[] {ScopeName, UIManagerService.Name, new Func<MinimizeScope, UIManagerService, object>((scope, uiManager) => new MinimizeController(scope, uiManager))})
                .Controller(GameController.Name, new object[] {ScopeName, ClientGameManagerService.Name, GameContentManagerService.Name, CreateUIService.Name, new Func<GameControllerScope, ClientGameManagerService, GameContentManagerService, CreateUIService, object>((scope, clientGameManagerService, gameContentManager, createUIService) => new GameController(scope, clientGameManagerService, gameContentManager, createUIService))})
                .Controller(DebugGameController.Name, new object[] {ScopeName, ClientDebugManagerService.Name, GameContentManagerService.Name, CreateUIService.Name, new Func<DebugGameControllerScope, ClientDebugManagerService, GameContentManagerService, CreateUIService, object>((scope, clientGameManagerService, gameContentManager, createUIService) => new DebugGameController(scope, clientGameManagerService, gameContentManager, createUIService))})
                .Controller(TestGameController.Name, new object[] {ScopeName, new Func<TestGameControllerScope, object>((scope) => new TestGameController(scope))})
                .Controller(GameEffectsEditorController.Name, new object[] {ScopeName, CreateUIService.Name, new Func<GameEffectsEditorScope, CreateUIService, object>((scope, createUIService) => new GameEffectsEditorController(scope, createUIService))})
                .Controller(LoginController.Name, new object[] {ScopeName, UIManagerService.Name, ClientSiteManagerService.Name, MessageService.Name, CreateUIService.Name, new Func<LoginScope, UIManagerService, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, messageService, createUIService) => new LoginController(scope, uiManager, clientSiteManagerService, messageService, createUIService))})
                .Controller(DebugQuestionController.Name, new object[] {ScopeName, ClientDebugManagerService.Name, new Func<QuestionScope, ClientDebugManagerService, object>((scope, clientDebugManagerService) => new DebugQuestionController(scope, clientDebugManagerService))})
                .Controller(QuestionController.Name, new object[] {ScopeName, ClientGameManagerService.Name, new Func<QuestionScope, ClientGameManagerService, object>((scope, clientGameManagerService) => new QuestionController(scope, clientGameManagerService))})
                .Controller(HomeController.Name, new object[] {ScopeName, UIManagerService.Name, ClientSiteManagerService.Name, CreateUIService.Name, new Func<HomeScope, UIManagerService, ClientSiteManagerService, CreateUIService, object>((scope, uiManager, clientSiteManagerService, createUIService) => new HomeController(scope, uiManager, clientSiteManagerService, createUIService))})
                .Controller(ActiveLobbyController.Name, new object[] {ScopeName, ClientSiteManagerService.Name, ClientChatManagerService.Name, CreateUIService.Name, new Func<ActiveLobbyScope, ClientSiteManagerService, ClientChatManagerService, CreateUIService, object>((scope, clientSiteManagerService, clientChatManagerService, createUIService) => new ActiveLobbyController(scope, clientSiteManagerService, clientChatManagerService, createUIService))})
                .Controller(CreateRoomController.Name, new object[] {ScopeName, new Func<CreateRoomScope, object>((scope) => new CreateRoomController(scope))})
                .Controller(GameManagerController.Name, new object[] {ScopeName, UIManagerService.Name, CreateUIService.Name, ClientSiteManagerService.Name, MessageService.Name, new Func<GameManagerScope, UIManagerService, CreateUIService, ClientSiteManagerService, MessageService, object>((scope, uiManagerService, createUIService, clientSiteManagerService, messageService) => new GameManagerController(scope, uiManagerService, createUIService, clientSiteManagerService, messageService))})
                .Controller(GameEditorController.Name, new object[] {ScopeName, ClientSiteManagerService.Name, ClientDebugManagerService.Name, MessageService.Name, CreateUIService.Name, new Func<GameEditorScope, ClientSiteManagerService, ClientDebugManagerService, MessageService, CreateUIService, object>((scope, clientSiteManagerService, clientDebugManagerService, messageService, createUIService) => new GameEditorController(scope, clientSiteManagerService, clientDebugManagerService, messageService, createUIService))})
                .Controller(GameLayoutEditorController.Name, new object[] {ScopeName, ClientSiteManagerService.Name, MessageService.Name, CreateUIService.Name, new Func<GameLayoutEditorScope, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, clientSiteManagerService, messageService, createUIService) => new GameLayoutEditorController(scope, clientSiteManagerService, messageService, createUIService))})
                .Controller(GameTestEditorController.Name, new object[] { ScopeName, ClientSiteManagerService.Name, ClientDebugManagerService.Name, MessageService.Name, CreateUIService.Name, new Func<GameTestEditorScope, ClientSiteManagerService, ClientDebugManagerService, MessageService, CreateUIService, object>((scope, clientSiteManagerService, clientDebugManagerService, messageService, createUIService) => new GameTestEditorController(scope, clientSiteManagerService, clientDebugManagerService, messageService, createUIService)) })
                .Controller(GameScenarioEditorController.Name, new object[] {ScopeName, ClientSiteManagerService.Name, MessageService.Name, CreateUIService.Name, ClientGameManagerService.Name, new Func<GameScenarioEditorScope, ClientSiteManagerService, MessageService, CreateUIService, object>((scope, clientSiteManagerService, messageService, createUIService) => new GameScenarioEditorController(scope, clientSiteManagerService, messageService, createUIService))})
                .Controller(GameCodeController.Name, new object[] {ScopeName, ClientSiteManagerService.Name, MessageService.Name, new Func<GameCodeScope, ClientSiteManagerService, MessageService, object>((scope, clientSiteManagerService, messageService) => new GameCodeController(scope, clientSiteManagerService, messageService))})
                .Controller(MessageController.Name, new object[] {ScopeName, new Func<MessageScope, object>((scope) => new MessageController(scope))})
                .Controller(EffectTesterController.Name, new object[] {ScopeName, new Func<EffectTesterControllerScope, object>((scope) => new EffectTesterController(scope))})
                .Service(UIManagerService.Name, new object[] {ClientGameManagerService.Name, new Func<object>(() => new UIManagerService())})
                .Service(ClientChatManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientChatManagerService(gatewayService))})
                .Service(ClientGameManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientGameManagerService(gatewayService))})
                .Service(ClientDebugManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientDebugManagerService(gatewayService))})
                .Service(ClientSiteManagerService.Name, new object[] {GatewayService.Name, new Func<GatewayService, object>((gatewayService) => new ClientSiteManagerService(gatewayService))})
                .Service(GatewayService.Name, new object[] {"gatewayServerURL", new Func<string, object>((serverUrl) => new GatewayService(serverUrl))})
                .Service(GameContentManagerService.Name, new object[] {new Func<object>(() => new GameContentManagerService())})
                .Service(MessageService.Name, new object[] {CreateUIService.Name, RootScopeName, new Func<CreateUIService, IRootScopeService, object>((createUIService, rootScopeService) => new MessageService(createUIService, rootScopeService))})
                .Service(CreateUIService.Name, new object[] {CompileName, RootScopeName, new Func<CompileService, IRootScopeService, object>((compileService, rootScopeService) => new CreateUIService(compileService, rootScopeService))})
                .Directive(GridDirective.Name, new object[] {new Func<object>(() => new GridDirective())})
                .Directive(DraggableDirective.Name, new object[] {new Func<object>(() => new DraggableDirective())})
                .Directive(FloatingWindowDirective.Name, new object[] {UIManagerService.Name, new Func<UIManagerService, object>((uiManagerService) => new FloatingWindowDirective(uiManagerService))})
                .Directive(FancyListDirective.Name, new object[] {new Func<object>(() => new FancyListDirective())})
                .Directive(ChatBoxDirective.Name, new object[] {new Func<object>(() => new ChatBoxDirective())})
                .Directive(PropertyDirective.Name, new object[] {new Func<object>(() => new PropertyDirective())})
                .Directive(AcgDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgDrawCardDirective())})
                .Directive(AcgDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgDrawSpaceDirective())})
                .Directive(AcgDebugDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgDebugDrawCardDirective())})
                .Directive(AcgDebugDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgDebugDrawSpaceDirective())})
                .Directive(AcgTestDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawCardDirective())})
                .Directive(AcgTestDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawSpaceDirective())})
                .Directive(AcgEffectTestDrawAreaDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawAreaDirective())})
                .Directive(AcgEffectTestDrawTextDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawTextDirective())})
                .Directive(AcgEffectTestDrawCardDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawCardDirective())})
                .Directive(AcgEffectTestDrawSpaceDirective.Name, new object[] {new Func<object>(() => new AcgEffectTestDrawSpaceDirective())})
                .Directive(AcgTestDrawAreaDirective.Name, new object[] {new Func<object>(() => new AcgTestDrawAreaDirective())})
                .Directive(AcgTestDrawTextDirective.Name, new object[] { new Func<object>(() => new AcgTestDrawTextDirective()) })
                .Directive(ForNextDirective.Name, new object[] { new Func<object>(() => new ForNextDirective()) })
                .Directive(AcgSpacesDirective.Name, new object[] {CompileName, GameContentManagerService.Name, new Func<CompileService, GameContentManagerService, object>((compile, gameContentManager) => new AcgSpacesDirective(compile, gameContentManager))})
                .Filter(RoundFilter.Name, new object[] {new Func<Func<object, object>>(() => new RoundFilter().Filter)});
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
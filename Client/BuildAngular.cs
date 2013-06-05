using System;
using System.Runtime.CompilerServices;
using CardGameUI.Controllers;
using CardGameUI.Directives;
using CardGameUI.Scope;
using CardGameUI.Services;
using ng;
namespace Client
{
    public static class BuildAngular
    {
        static BuildAngular()
        {
            angular.module("acg", new string[] { "ui.utils" })
                 .config(new object[] {
                                                "$routeProvider",
                                                new Action<IRouteProviderProvider>(provider => {
                                                                                       // provider.When("/gameUI", new Route() {Controller = "GameCtrl", TemplateURL = "http://content.anycardgame.com/partials/gameUI.html"}).Otherwise(new OtherwiseRoute() {RedirectTo = "/gameUI"});
                                                                                   })
                                        })
                 .config(new object[] {
                                                "$httpProvider", new Action<dynamic>((httpProvider) => {
                                                                                         httpProvider.defaults.useXDomain = true;
                                                                                         Delete(httpProvider.defaults.headers.common["X-Requested-With"]);
                                                                                     })
                                        })
                 .controller("GameCtrl", new object[] { "$scope", "effectWatcher", new Func<GameCtrlScope, EffectWatcherService, object>((scope, effectWatcher) => new GameCtrl(scope, effectWatcher)) })
                 .controller("ListEffectsController", new object[] { "$scope", "editEffects", "effectWatcher", "effectManager", new Func<ListEffectsScope, EditEffectService, EffectWatcherService, EffectManagerService, object>((scope, editEffects, effectWatcher, effectmanager) => new ListEffectsController(scope, editEffects, effectWatcher, effectmanager)) })
                 .controller("EffectEditorController", new object[] { "$scope", "editEffects", new Func<EffectEditorScope, EditEffectService, object>((scope, editEffects) => new EffectEditorController(scope, editEffects)) })
                 .controller("LoginController", new object[] { "$scope", "UIManager", new Func<LoginScope, UIManagerService, object>((scope, uiManager) => new LoginController(scope, uiManager)) })
                 .controller("QuestionController", new object[] { "$scope", "UIManager", new Func<QuestionScope, UIManagerService, object>((scope, uiManager) => new QuestionController(scope, uiManager)) })
                 .controller("HomeController", new object[] { "$scope", "UIManager", new Func<HomeScope, UIManagerService, object>((scope, uiManager) => new HomeController(scope, uiManager)) })
                 .controller("ActiveLobbyController", new object[] { "$scope", "UIManager", new Func<ActiveLobbyScope, UIManagerService, object>((scope, uiManager) => new ActiveLobbyController(scope, uiManager)) })
                 .controller("CreateRoomController", new object[] { "$scope", "UIManager", new Func<CreateRoomScope, UIManagerService, object>((scope, uiManager) => new CreateRoomController(scope, uiManager)) })
                 .service("UIManager", new object[] { new Func<object>(() => new UIManagerService()) })
                 .service("editEffects", new object[] { new Func<object>(() => new EditEffectService()) })
                 .service("effectWatcher", new object[] { new Func<object>(() => new EffectWatcherService()) })
                 .service("effectManager", new object[] { new Func<object>(() => new EffectManagerService()) })
                 .directive("draggable", new object[] { new Func<object>(() => new DraggableDirective()) })
                 .directive("floatingWindow", new object[] { new Func<object>(() => new FloatingWindowDirective()) })
                 .directive("fancyList", new object[] { new Func<object>(() => new FancyListDirective()) })
                 .directive("chatBox", new object[] { new Func<object>(() => new ChatBoxDirective()) })
                 .directive("property", new object[] { new Func<object>(() => new PropertyDirective()) })
                 .directive("acgDrawCard", new object[] { "effectManager", new Func<EffectManagerService, object>((effectManager) => new AcgDrawCardDirective(effectManager)) })
                 .directive("acgDrawSpace", new object[] { new Func<object>(() => new AcgDrawSpaceDirective()) });

        }
        [InlineCode("delete {o};")]
        private static void Delete(object o)
        {
        }
    }
}
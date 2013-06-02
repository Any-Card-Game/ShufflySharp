using System;
using System.Html;
using System.Runtime.CompilerServices;
using CardGameUI.Controllers;
using CardGameUI.Directives;
using CardGameUI.Scope;
using CardGameUI.Services;
using Client.Libs;
using CommonLibraries;
using WebLibraries.Common;
using WebLibraries.ShuffUI.ShuffUI;
using jQueryApi;
using ng;
[assembly: ScriptSharpCompatibility(OmitDowncasts = true, OmitNullableChecks = true)]
namespace Client
{
    public class BuildSite
    {
        private string gatewayServerAddress;
        public ShuffUIManager shuffUIManager;
        [IntrinsicProperty]
        public static BuildSite Instance { get; set; }

        public BuildSite(string gatewayServerAddress)
        {
            Instance = this;
            this.gatewayServerAddress = gatewayServerAddress;
            loadJunk(IPs.WebIP, ready);
        }

        private static void loadJunk(string url, Action ready)
        {
            ScriptLoader scriptLoader = new ScriptLoader();

            ScriptLoader.LoadCss(url + "lib/jquery-ui.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/lib/codemirror.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/theme/night.css");
            ScriptLoader.LoadCss(url + "lib/jqwidgets/styles/jqx.base.css");
            ScriptLoader.LoadCss(url + "lib/site.css");

            Action stepThree = () => scriptLoader.Load(new[] {
                                                                    url + "lib/RawDeflate.js",
                                                            },
                                                      true,
                                                      ready); 
            Action stepTwo = () => scriptLoader.Load(new[] {
                                                                   url + "lib/codemirror/mode/javascript/javascript.js",
                                                                   url + "lib/WorkerConsole.js",
                                                                   url + "lib/FunctionWorker.js",
                                                                   url + "lib/Stats.js",
                                                                   url + "lib/keyboardjs.js",
                                                                   url + "lib/Dialog.js",
                                                           },
                                                     false,
                                                     stepThree);
            Action stepOne = () => scriptLoader.Load(new[] {
                                                                   url + "lib/jqwidgets/jqxbuttons.js",
                                                                   url + "lib/jqwidgets/jqxscrollbar.js",
                                                                   url + "lib/linq.js",
                                                                   url + "lib/tween.js",
                                                                   url + "lib/socket.io.js",
                                                                   url + "lib/codemirror/lib/codemirror.js",
                                                                   url + "lib/jqwidgets/jqxlistbox.js"
                                                           },
                                                     false,
                                                     stepTwo);
            scriptLoader.LoadSync(new[] { 
                                                url + "lib/jqwidgets/scripts/gettheme.js",
                                                url + "lib/jqwidgets/jqxcore.js",
                                        },
                                  stepOne);
        }


                static  BuildSite  ()
        {
            angular.module("acg", new string[] { })
                .config(new object[] {
                                                                                     "$routeProvider",
                                                                                     new Action<IRouteProviderProvider>(provider => {
                                                                                                                            provider.When("/gameUI", new Route() {Controller = "GameCtrl", TemplateURL = "http://198.211.107.101:8881/partials/gameUI.html"}).
                                                                                                                                     Otherwise(new OtherwiseRoute() {RedirectTo = "/gameUI"});
                                                                                                                        })
                                                                             })
                .config(new object[] {
                                                                                     "$httpProvider", new Action<dynamic>((httpProvider) => {
                                                                                                                              httpProvider.defaults.useXDomain = true;
                                                                                                                              Delete(httpProvider.defaults.headers.common["X-Requested-With"]);
                                                                                                                          })
                                                                             })
                .controller("GameCtrl", new object[] { "$scope", "effectWatcher", new Func<GameCtrlScope, EffectWatcherService, object>((scope, effectWatcher) => new GameCtrl(scope, effectWatcher)) })
                .controller("ListEffectsController",
                      new object[] {
                                                                                         "$scope", "editEffects", "effectWatcher", "effectManager",
                                                                                         new Func<ListEffectsScope, EditEffectService, EffectWatcherService, EffectManagerService, object>((scope, editEffects, effectWatcher, effectmanager) => new ListEffectsController(scope, editEffects, effectWatcher, effectmanager))
                                                                                 })
                .controller("EffectEditorController", new object[] { "$scope", "editEffects", new Func<EffectEditorScope, EditEffectService, object>((scope, editEffects) => new EffectEditorController(scope, editEffects)) })
                .service("editEffects", new object[] { new Func<object>(() => new EditEffectService()) })
                .service("effectWatcher", new object[] { new Func<object>(() => new EffectWatcherService()) })
                .service("effectManager", new object[] { new Func<object>(() => new EffectManagerService()) })
                .directive("draggable", new object[] { new Func<object>(() => new DraggableDirective()) })
                .directive("property", new object[] { new Func<object>(() => new PropertyDirective()) })
                .directive("acgDrawCard", new object[] { "effectManager", new Func<EffectManagerService, object>((effectManager) => new AcgDrawCardDirective(effectManager)) })
                .directive("acgDrawSpace", new object[] { new Func<object>(() => new AcgDrawSpaceDirective()) });

        }
         
        [InlineCode("delete {o};")]
        private static void Delete(object o)
        { 
        }


        private void ready()
        {
          
            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);
            Window.SetTimeout(() => {
                                  jQuery.Select(".xstats").CSS("right", "0px");
                                  jQuery.Select(".xstats").CSS("position", "absolute");
                                  jQuery.Select(".xstats").CSS("z-index", "9998!important");
                                  jQuery.Select(".xstats").Children().CSS("z-index", "9998!important");
                              },
                              1000);
            Window.Instance.AddEventListener("scroll", (e) =>
            { 
                Window.ScrollTo(0, 0);
                e.StopImmediatePropagation();
            }); 

            Element dvGame = Document.CreateElement("div");
            jQuery.Select("body").Append(dvGame);
            dvGame.ID = "dvGame";
            dvGame.Style.Left = "0%";
            dvGame.Style.Position = "absolute";
            dvGame.Style.Top = "0";
            dvGame.Style.Right = "0";
            dvGame.Style.Bottom = "0";
            dvGame.Style["-webkit-transform"] = "scale(1.2)";
            Document.Body.Style["overflow"] = "hidden";

            Document.Body.AddEventListener("contextmenu",
                                           e => {
                                             //  e.PreventDefault();
                                               //todo: Special right click menu;
                                           },
                                           false);

            var pageHandler = new PageHandler(gatewayServerAddress);

            /*




        var chatArea = shuffUIManager.createWindow({
            title: "Chat",
            x: 600,
            y: 100,
            width: 300,
            height: 275,
            allowClose: true,
            allowMinimize: true,
            visible: false

        });
             */
        }
    }
}
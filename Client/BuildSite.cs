using System;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Libs;
using CommonWebLibraries;
using ShuffUI;
using jQueryApi;
namespace Client
{
    public class BuildSite
    {
        public static string TopLevelURL = "http://50.116.22.241:8881/";
        private string gatewayServerAddress;
        public ShuffUIManager shuffUIManager;
        [IntrinsicProperty]
        public static BuildSite Instance { get; set; }

        public BuildSite(string gatewayServerAddress)
        {
            Instance = this;
            this.gatewayServerAddress = gatewayServerAddress;
            loadJunk(TopLevelURL, ready);
            ;
        }

        private static void loadJunk(string url, Action ready)
        {
            ScriptLoader scriptLoader = new ScriptLoader();

            ScriptLoader.LoadCss(url + "lib/jquery-ui-1.8.20.custom.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/lib/codemirror.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/theme/night.css");
            ScriptLoader.LoadCss(url + "lib/jqwidgets/styles/jqx.base.css");
            ScriptLoader.LoadCss(url + "lib/site.css");

            Action stepFour = () => scriptLoader.Load(new[] {
                                                                    url + "lib/RawDeflate.js",
                                                                    url + "ShuffUI.js"
                                                            },
                                                      true,
                                                      ready);

            Action stepThree = () => scriptLoader.Load(new[] {
                                                                     url + "CommonLibraries.js",
                                                                     url + "ShuffleGameLibrary.js",
                                                                     url + "Models.js",
                                                             },
                                                       true,
                                                       stepFour);
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
                                                url + "lib/jquery-1.7.2.min.js",
                                                url + "lib/jquery-ui-1.8.20.custom.min.js",
                                                url + "lib/jqwidgets/scripts/gettheme.js",
                                                url + "lib/jqwidgets/jqxcore.js"
                                        },
                                  stepOne);
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
                                               e.PreventDefault();
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
using System;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Libs;
using CommonLibraries;
using jQueryApi;
using WebLibraries.Common;

[assembly: ScriptSharpCompatibility(OmitDowncasts = true, OmitNullableChecks = true)]

namespace Client
{
    public class BuildSite
    {
        private string gatewayServerAddress;

        public BuildSite(string gatewayServerAddress)
        {
            Instance = this;
            this.gatewayServerAddress = gatewayServerAddress;
            loadJunk(Constants.ContentAddress, ready);
        }

        [IntrinsicProperty]
        public static BuildSite Instance { get; set; }

        private static void loadJunk(string url, Action ready)
        {
            var scriptLoader = new ScriptLoader();

            ScriptLoader.LoadCss(url + "lib/jquery-ui.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/lib/codemirror.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/theme/night.css");
            ScriptLoader.LoadCss(url + "lib/site.css");

            Action stepThree = () => scriptLoader.Load(new[]
                                                       {
                                                           url + "lib/RawDeflate.js",
                                                       },
                true,
                ready);
            Action stepTwo = () => scriptLoader.Load(new[]
                                                     {
                                                         url + "lib/codemirror/mode/javascript/javascript.js",
                                                         url + "lib/WorkerConsole.js",
                                                         url + "lib/FunctionWorker.js",
                                                         url + "lib/Stats.js",
                                                         url + "lib/keyboardjs.js",
                                                     },
                false,
                stepThree);
            scriptLoader.Load(new[]
                              {
                                  url + "lib/linq.js",
                                  url + "lib/tween.js",
                                  url + "lib/socket.io.js",
                                  url + "lib/codemirror/lib/codemirror.js",
                              },
                false,
                stepTwo);
        }


        private void ready()
        {
            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);
            Window.SetTimeout(() =>
                              {
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


            Document.Body.Style["overflow"] = "hidden";

            Document.Body.AddEventListener("contextmenu",
                e =>
                {
                    //  e.PreventDefault();
                    //todo: Special right click menu;
                },
                false);


            BuildAngular.Setup(gatewayServerAddress);


            angular.Bootstrap(Window.Document, "acg");

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
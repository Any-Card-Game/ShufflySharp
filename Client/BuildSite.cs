using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using Client.ShuffUI;
using CommonWebLibraries;
using jQueryApi;

namespace Client
{
    public class BuildSite
    {
        private readonly string gatewayServerAddress;
        private ScriptLoader scriptLoader = new ScriptLoader();
        public BuildSite(string gatewayServerAddress)
        {
            this.gatewayServerAddress = gatewayServerAddress;
            var url = "http://50.116.22.241:8881/";
            //       window .topLevel = url;

            loadCss(url + "lib/jquery-ui-1.8.20.custom.css");
            loadCss(url + "lib/codemirror/codemirror.css");
            loadCss(url + "lib/site.css");
            loadCss(url + "lib/codemirror/theme/night.css");
            loadCss(url + "lib/jqwidgets/styles/jqx.base.css");


            scriptLoader.LoadSync(new[]{url + "lib/jquery-1.7.2.min.js",
                url + "lib/jquery-ui-1.8.20.custom.min.js",
                url + "lib/jqwidgets/scripts/gettheme.js",
                url + "lib/jqwidgets/jqxcore.js"}, () => scriptLoader.Load(new[]{
                    url + "lib/jqwidgets/jqxbuttons.js",
                    url + "lib/jqwidgets/jqxscrollbar.js",
                    url + "lib/linq.js",
                    url + "lib/tween.js",
                    url + "lib/socket.io.js",
                    url + "lib/codemirror/codemirror.js",
                    url + "lib/jqwidgets/jqxlistbox.js"}, () => scriptLoader.Load(new[] {
                        //url + "ClientHelp.js",
                        //url + "common/Help.js",
                        url + "lib/codemirror/mode/javascript/javascript.js",
                        url + "lib/WorkerConsole.js",
                        //url + "Gateway.js",
                        url + "lib/FunctionWorker.js",
                        url + "lib/Stats.js",
                        url + "lib/keyboardjs.js",
                        //url + "UIManager.js",
                        //url + "UIArea.js",
                        //url + "PageHandler.js",
                        //url + "uis/genericArea.js",
                        //url + "ShuffUIManager.js",
                        url + "lib/Dialog.js",
                    }, ready)));

        }

        private ShuffWindow home;
        private ShuffWindow devArea;
        private ShuffWindow genericArea;
        private void ready()
        {

            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);



            var pageHandler = new PageHandler(gatewayServerAddress);


            var shuffUIManager = new ShuffUIManager();
            Globals.Window.shuffUIManager = shuffUIManager;

            
            Globals.Window.shuffUIManager.genericArea = genericArea;

            home = shuffUIManager.CreateWindow(new ShuffWindow()
            {
                Title = "CardGame",
                X = jQuery.Select("body").GetInnerWidth() - 500,
                Y = 100,
                Width = 420,
                Height = 450,
                AllowClose = true,
                AllowMinimize = true,
                Visible = true
            });

            home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 54,
                Width = 150,
                Height = 25,
                Text = "Update Game List",
                Click = (e) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Game.GetGames",
                        devArea.Instance.gameServer); //NO EMIT'ING OUTSIDE OF PageHandler

                }
            });

            home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 84,
                Width = 150,
                Height = 25,
                Text = "Create Game",
                Click = (e) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Game.Create",new { User= new { UserName= genericArea.Instance.txtUserName[0].value} }, devArea.Instance.GameServer); //NO EMIT'ING OUTSIDE OF PageHandler


                }
            });


        }

        private void loadCss(string filename)
        {
            var fileref = Document.CreateElement("link");
            fileref.SetAttribute("rel", "stylesheet");
            fileref.SetAttribute("type", "text/css");
            fileref.SetAttribute("href", filename);
            Document.GetElementsByTagName("head")[0].AppendChild(fileref);
        }
    }
}

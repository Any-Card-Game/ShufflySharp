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

            loadCss(url + "client/lib/jquery-ui-1.8.20.custom.css");
            loadCss(url + "client/lib/codemirror/codemirror.css");
            loadCss(url + "client/lib/site.css");
            loadCss(url + "client/lib/codemirror/theme/night.css");
            loadCss(url + "client/lib/jqwidgets/styles/jqx.base.css");


            scriptLoader.LoadSync(new[]{url + "client/lib/jquery-1.7.2.min.js",
                url + "client/lib/jquery-ui-1.8.20.custom.min.js",
                url + "client/lib/jqwidgets/scripts/gettheme.js",
                url + "client/lib/jqwidgets/jqxcore.js"}, () => scriptLoader.Load(new[]{
                    url + "client/lib/jqwidgets/jqxbuttons.js",
                    url + "client/lib/jqwidgets/jqxscrollbar.js",
                    url + "client/lib/linq.js",
                    url + "client/lib/tween.js",
                    url + "client/lib/socket.io.js",
                    url + "client/lib/codemirror/codemirror.js",
                    url + "client/lib/jqwidgets/jqxlistbox.js"}, () => scriptLoader.Load(new[] {url + "client/ClientHelp.js",
                        url + "common/Help.js",
                        url + "client/lib/codemirror/mode/javascript/javascript.js",
                        url + "client/lib/WorkerConsole.js",
                        url + "client/Gateway.js",
                        url + "client/lib/FunctionWorker.js",
                        url + "client/lib/Stats.js",
                        url + "client/lib/keyboardjs.js",
                        url + "client/UIManager.js",
                        url + "client/UIArea.js",
                        url + "client/PageHandler.js",
                        url + "client/uis/genericArea.js",
                        url + "client/ShuffUIManager.js",
                        url + "client/lib/Dialog.js",
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
                Visible = false
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

        public void loadCss(string filename)
        {
            var fileref = Document.CreateElement("link");
            fileref.SetAttribute("rel", "stylesheet");
            fileref.SetAttribute("type", "text/css");
            fileref.SetAttribute("href", filename);
            Document.GetElementsByTagName("head")[0].AppendChild(fileref);
        }
    }
}

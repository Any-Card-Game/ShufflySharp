

using System;
using System.Html;

namespace Client
{
    public class BuildSite
    {
        private ScriptLoader scriptLoader = new ScriptLoader();
        public BuildSite(string gatewayServerAddress)
        {
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

        private void ready()
        {

            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);


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
    public class ScriptLoader
    {
        private void loadScript(string url, Action callback)
        {

            var head = Document.GetElementsByTagName("head")[0];
            var script = Document.CreateElement("script");
            script.SetAttribute("type", "text/javascript");
            script.SetAttribute("src", url);  // +"?" + (Math.floor(Math.random() * 10000)); //caching
            if (callback != null)
            {
                script.AddEventListener("onreadystatechange", a =>
                    {
                        dynamic b = script;
                        if (b.readyState == "loaded") callback();

                    }, true);

                script.AddEventListener("onload", a => callback(), true);

            }
            head.AppendChild(script);
        }
        public void Load(string[] items, Action done)
        {
            var counter = 0;
            for (int i = 0; i < items.Length; i++)
            {
                loadScript(items[i], () =>
                {
                    counter++;
                    if (counter >= items.Length)
                    {
                        done();
                    }
                });
            }
        }
        public void LoadSync(string[] items, Action done)
        {
            var counter = 0;
            Action nextOne = null;
            nextOne = () =>
                {

                    counter++;
                    if (counter >= items.Length)
                    {
                        done();
                    }
                    else
                    {
                        loadScript(items[counter], nextOne);
                    }
                };
            loadScript(items[0], nextOne);

        }
    }
}

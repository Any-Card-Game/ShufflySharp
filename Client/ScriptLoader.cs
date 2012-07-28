using System;
using System.Html;

namespace Client
{
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
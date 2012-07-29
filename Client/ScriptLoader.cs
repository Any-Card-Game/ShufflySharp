using System;
using System.Html;
using System.Runtime.CompilerServices;
using CommonLibraries;

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

               script.me().onreadystatechange = (Action<object>) (a =>
                    {

                        if (script.me().readyState == "loaded") callback();

                    });
               script.me().onload = (Action<object>)(a => callback());

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
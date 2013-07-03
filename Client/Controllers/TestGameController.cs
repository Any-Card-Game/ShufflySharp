using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using jQueryApi;
using Models.SiteManagerModels.Game;
using WebLibraries.Common;
using global;
using EffectType = Models.SiteManagerModels.Game.EffectType;
namespace Client.Controllers
{
    public class TestGameController
    {
        private readonly TestGameControllerScope scope;
        private readonly EffectWatcherService myEffectWatcher;
        private readonly EffectManagerService myEffectManager;

        public TestGameController(TestGameControllerScope scope, EffectWatcherService effectWatcher, EffectManagerService effectManager)
        {
            this.scope = scope;
            myEffectWatcher = effectWatcher;
            myEffectManager = effectManager;
            effectManager.Effects = new List<GameEffectModel>();
            effectManager.Effects.Add(ListEffectsController.makeEffect("bend", EffectType.Bend));


            var addRule = (new Func<Element, Action<string, JsDictionary<string, object>>>(style =>
            {
                var document = (dynamic)Script.Eval("window.document");

                var sheet = document.head.appendChild(style).sheet;
                return (selector, css) =>
                {
                    var propText = Object.Keys(css).Map((p) =>
                    {
                        return p + ":" + css[p];
                    }).Join(";");
                    sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);

                };
            }))(Document.CreateElement("style"));



            effectWatcher.ApplyEffect += (effect) =>
            {
                if (scope.Model.SelectedCard == null)
                    return;

                scope.Model.SelectedCard.Appearance.EffectNames.Add(effect.Name);
            };

            scope.watch("model.mainLayout.width + model.mainLayout.height", () =>
                                                                            {
                                                                                Console.Log("hap");
                                                                                scope.Model.Scale = new Point(jQuery.Window.GetWidth() / (double)scope.Model.MainLayout.Width * .9, ((jQuery.Window.GetHeight() - 250) / (double)scope.Model.MainLayout.Height) * .9);
                                                                            });

            jQuery.Window.Bind("resize", (a) =>
            {

                scope.Model.Scale = new Point(jQuery.Window.GetWidth() / (double)scope.Model.MainLayout.Width * .9, ((jQuery.Window.GetHeight() - 250) / (double)scope.Model.MainLayout.Height) * .9);
                scope.Apply();

            });

            scope.Model.Scale = new Point(jQuery.Window.GetWidth() / (double)scope.Model.MainLayout.Width * .9, ((jQuery.Window.GetHeight() - 250) / (double)scope.Model.MainLayout.Height) * .9);

            foreach (var space in scope.Model.MainLayout.Spaces)
            {
                addRule(".space" + space.Name, new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::before", new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::after", new JsDictionary<string, object>());


                /*
                                    foreach (var card in space.Pile.Cards)
                                    {
                                        card.Appearance.EffectNames = new List<string>();

                                        if (space.Name.StartsWith("User"))
                                        {
                                            card.Appearance.EffectNames.Add("bend");

                                        }

                                        addRule(".card" + card.Type + "-" + card.Value + "", new JsDictionary<string, object>());
                                        addRule(".card" + card.Type + "-" + card.Value + "::before", new JsDictionary<string, object>());
                                        addRule(".card" + card.Type + "-" + card.Value + "::after", new JsDictionary<string, object>());
                                    }
                */
            }





            //  myGameContentManager.Redraw();


        }


    }
}

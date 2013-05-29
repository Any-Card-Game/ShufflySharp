using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using global;
using jQueryApi;
namespace CardGameUI.Controllers
{
    public class GameCtrl
    {
        private readonly GameCtrlScope scope;
        private readonly EffectWatcherService myEffectWatcher;

        public GameCtrl(GameCtrlScope scope, EffectWatcherService effectWatcher)
        {
            this.scope = scope;
            myEffectWatcher = effectWatcher;

            scope.MainArea = (GameCardGame)Script.Eval("loadMainArea()");
            scope.SelectedCard = null;

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

            //new Action<string,JsDictionary<string,object>>()

            foreach (var space in scope.MainArea.Spaces)
            {
                addRule(".space" + space.Name, new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::before", new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::after", new JsDictionary<string, object>());


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
            }



            scope.Scale = new Point()
            {
                X = jQueryApi.jQuery.Window.GetWidth() / scope.MainArea.Size.Width * .9,
                Y = ((jQueryApi.jQuery.Window.GetHeight() - 250) / scope.MainArea.Size.Height) * .9
            };

            scope.MoveCard = () =>
            {

                for (var i = 0; i < 1; i++)
                {
                    CardGameCard card = null;
                    while (card == null)
                    {
                        var pile = scope.MainArea.Spaces.RandomElement().Pile;
                        card = pile.Cards.RandomElement();
                        var _pile = scope.MainArea.Spaces.RandomElement();

                        if (card != null && _pile != null)
                        {
                            card.Appearance.EffectNames.Remove("bend");
                            if (_pile.Name.StartsWith("User"))
                            {

                                card.Appearance.EffectNames.Add("bend");

                            }


                            pile.Cards.Remove(card);
                            _pile.Pile.Cards.Add(card);
                        }
                    }
                }
            };

            scope.AnimateCard = () =>
            {

                for (var i = 0; i < 1; i++)
                {
                    CardGameCard card = null;
                    while (card == null)
                    {
                        var pile = scope.MainArea.Spaces.RandomElement().Pile;
                        card = pile.Cards.RandomElement();
                        var _pile = scope.MainArea.Spaces.RandomElement();

                        if (card != null && _pile != null)
                        {

                            var css = string.Format(".card{0}-{1}", card.Type, card.Value);
                            var clone = jQueryApi.jQuery.Select(css).FuckingClone();


                            var space=jQuery.Select(string.Format(".space{0}", _pile.Name));
                            var off = space.GetOffset();

                            clone.CSS("z-index", 1000);

                            JsDictionary ops = new JsDictionary();
                            ops["left"] = off.Left + space.GetWidth() / 2 - 71 / 2;
                            ops["top"] = off.Top + space.GetHeight() / 2 - 96 / 2;
                            ops["rotate"] = "0deg";
                            

                            pile.Cards.Remove(card);
                            clone.Animate(ops, 6000, (EffectEasing)(dynamic)("easeInOutQuart"), () =>
                            {
                                card.Appearance.EffectNames.Remove("bend");
                                if (_pile.Name.StartsWith("User"))
                                {

                                    card.Appearance.EffectNames.Add("bend");

                                }

                                clone.Remove();
                                _pile.Pile.Cards.Add(card);
                                scope.Apply();

                            });
                             


                        }
                    }
                }
            };

            effectWatcher.ApplyEffect += (effect) =>
            {
                if (scope.SelectedCard == null)
                    return;

                scope.SelectedCard.Appearance.EffectNames.Add(effect.Name);
            };


        }


    }
}

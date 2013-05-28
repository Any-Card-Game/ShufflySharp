using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Angular.interfaces;
using global;
namespace Client.Angular.controllers
{
    public class GameCtrl
    {
        private readonly GameCtrlScope scope;

        public GameCtrl(GameCtrlScope scope)
        {
            this.scope = scope;

            scope.MainArea = (GameCardGame)Script.Eval("loadMainArea()");
            scope.SelectedCard = null;

            var addRule = ( new Func<Element, Action<string, JsDictionary<string, object>>>(style => {
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
                                                                                            }) )(Document.CreateElement("style"));

                //new Action<string,JsDictionary<string,object>>()

            foreach (var space in scope.MainArea.Spaces) {
                addRule(".space" + space.Name, new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::before", new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::after", new JsDictionary<string, object>());


                foreach (var card in space.Pile.Cards) {
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
                            pile.Cards.Remove(card);
                            _pile.Pile.Cards.Add(card);
                        }
                    }
                }
            };


        }


    }
    public static class Extensions
    {
        public static T RandomElement<T>(this List<T> arr)
        {
            return arr[(int)Math.Floor(Math.Random() * arr.Count)];

        }

        [InlineCode("{script}")]
        [InstanceMethodOnFirstArgument]
        public static dynamic Me(this object script)
        {
            return script;

        }

    }
}

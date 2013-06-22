using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using CommonLibraries;
using WebLibraries.Common;
using global;
using jQueryApi; 
namespace CardGameUI.Controllers
{
    public class GameController
    {
        private readonly GameCtrlScope scope;
        private readonly EffectWatcherService myEffectWatcher;
        private readonly ClientGameManagerService myClientGameManagerService;
        private readonly GameContentManager myGameContentManager;
        private readonly EffectManagerService myEffectManager;

        public GameController(GameCtrlScope scope, EffectWatcherService effectWatcher, ClientGameManagerService clientGameManagerService, GameContentManager gameContentManager, EffectManagerService effectManager)
        {
            this.scope = scope;
            myEffectWatcher = effectWatcher;
            myClientGameManagerService = clientGameManagerService;
            myGameContentManager = gameContentManager;
            myEffectManager = effectManager;
            effectManager .Effects= new List<Effect>();
            effectManager.Effects.Add(ListEffectsController.makeEffect("bend", EffectType2.Bend));
             
            /*     myClientGameManagerService.OnAskQuestion += (user, gameSendAnswerModel) => {
                                                        PageHandler.QuestionUI.Load(gameSendAnswerModel);
                                                        //alert(JSON.stringify(data));
                                                        PageHandler.TimeTracker.EndTime = new DateTime();
                                                        var time = PageHandler.TimeTracker.EndTime - PageHandler.TimeTracker.StartTime;
                                                      PageHandler.  DebugUI.lblHowFast.Text = ( "how long: " + time ); 
                                                    }; */

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



            myClientGameManagerService.OnUpdateState += (user, update) =>
            {
                var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));

                                                            var create = false;
                if (scope.MainArea == null) {
                    create = true;
                }

                scope.MainArea = data;


                if (create) {
                    scope.Scale = new Point(jQueryApi.jQuery.Window.GetWidth() / scope.MainArea.Size.Width * .9, ((jQueryApi.jQuery.Window.GetHeight() - 250) / scope.MainArea.Size.Height) * .9);

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

                }

                


                scope.Apply();
                myGameContentManager.Redraw();

            };

            myClientGameManagerService.OnGameStarted += (user, room) =>
            {
                //alert(JSON.stringify(data));
            };

            myClientGameManagerService.OnGameOver += (user, room) =>
            {
                //alert(JSON.stringify(data));
            };



            scope.MainArea = null;
            scope.SelectedCard = null;


            //new Action<string,JsDictionary<string,object>>()

            



           /* scope.MoveCard = () =>
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


                            var space = jQuery.Select(string.Format(".space{0}", _pile.Name));
                            var off = space.GetOffset();

                            clone.CSS("z-index", 1000);

                            JsDictionary ops = new JsDictionary();
                            ops["left"] = off.Left + space.GetWidth() / 2 - 71 / 2;
                            ops["top"] = off.Top + space.GetHeight() / 2 - 96 / 2;
                            ops["rotate"] = "0deg";


                            pile.Cards.Remove(card);
                            clone.Animate(ops, 700, (EffectEasing)(dynamic)("easeInOutQuart"), () =>
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
            };*/

            effectWatcher.ApplyEffect += (effect) =>
            {
                if (scope.SelectedCard == null)
                    return;

                scope.SelectedCard.Appearance.EffectNames.Add(effect.Name);
            };


        }


    }
}

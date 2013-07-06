using System;
using System.Collections.Generic;
using System.Html;
using System.Linq;
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

        public TestGameController(TestGameControllerScope scope)
        {
            this.scope = scope;
/*
            effectManager.Effects = new List<GameEffectModel>();
            effectManager.Effects.Add(GameEffectsEditorController.makeEffect("bend", EffectType.Bend));
*/

            scope.Model.GetCardsFromScenario = GetCardsFromScenarioFn;

            var scenario = this.scope.Model.Selection.SelectedScenario;

            if (scenario == null)
            {
                this.scope.Model.Selection.SelectedScenario = this.scope.Model.Game.GameLayoutScenarios.Filter((scen) => scen.Name == "Default")[0];
            }



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



/*
            effectWatcher.ApplyEffect += (effect) =>
            {
                if (scope.Model.Selection.SelectedCard == null)
                    return;

                //todo scope.Model.Selection.SelectedCard.Appearance.EffectNames.Add(effect.Name);
            };
*/
            
            scope.watch("model.game.gameLayout.width + model.game.gameLayout.height", () =>
                                                                            {
                                                                                scope.Model.Scale = new Point(scope.Model.Selection.SelectedScenario.ScreenSize.X / (double)scope.Model.Game.GameLayout.Width * .9, ((scope.Model.Selection.SelectedScenario.ScreenSize.Y) / (double)scope.Model.Game.GameLayout.Height) * .9);
                                                                            });


            scope.watch("model.selection.selectedScenario.screenSize.x + model.selection.selectedScenario.screenSize.y", () =>
                                                                            {
                                                                                scope.Model.Scale = new Point(scope.Model.Selection.SelectedScenario.ScreenSize.X / (double)scope.Model.Game.GameLayout.Width * .9, ((scope.Model.Selection.SelectedScenario.ScreenSize.Y) / (double)scope.Model.Game.GameLayout.Height) * .9);
                                                                            });

            scope.Model.Scale = new Point(scope.Model.Selection.SelectedScenario.ScreenSize.X / (double)scope.Model.Game.GameLayout.Width * .9, ((scope.Model.Selection.SelectedScenario.ScreenSize.Y) / (double)scope.Model.Game.GameLayout.Height) * .9);

//            scope.Model.Scale = new Point(jQuery.Window.GetWidth() / (double)scope.Model.Game.GameLayout.Width * .9, ((jQuery.Window.GetHeight() - 250) / (double)scope.Model.Game.GameLayout.Height) * .9);

            foreach (var space in scope.Model.Game.GameLayout.Spaces)
            {
                addRule(".space" + space.Name, new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::before", new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::after", new JsDictionary<string, object>());


                for (int t = 0; t < 4; t++)
                {
                    for (int c = 0; c < 13; c++)
                    {
                        addRule(".card" + t + "-" + c + "", new JsDictionary<string, object>());
                        addRule(".card" + t + "-" + c + "::before", new JsDictionary<string, object>());
                        addRule(".card" + t + "-" + c + "::after", new JsDictionary<string, object>());

                    }
                }

            }





            //  myGameContentManager.Redraw();


        }

        private List<GameLayoutScenarioCard> GetCardsFromScenarioFn(GameSpaceModel arg)
        {

            var scenario = this.scope.Model.Selection.SelectedScenario;

        




            var defaultCards = new List<GameLayoutScenarioCard>()
                               {
                                   new GameLayoutScenarioCard() {Type = 1,Value=5,State = GameLayoutCardState.FaceDown},
                                   new GameLayoutScenarioCard() {Type = 1,Value=5,State = GameLayoutCardState.FaceUp},
                                   new GameLayoutScenarioCard() {Type = 1,Value=5,State = GameLayoutCardState.FaceDown},
                                   new GameLayoutScenarioCard() {Type = 1,Value=5,State = GameLayoutCardState.FaceUp},
                                   new GameLayoutScenarioCard() {Type = 1,Value=5,State = GameLayoutCardState.FaceDown},
                                   new GameLayoutScenarioCard() {Type = 1,Value=5,State = GameLayoutCardState.FaceUp},
                               };


            var spaces = scenario.Spaces.Filter((s) => s.SpaceGuid == arg.Guid);
            GameLayoutScenarioSpace space;
            if (spaces.Count == 0)
            {
                scenario.Spaces.Add(space = new GameLayoutScenarioSpace() { SpaceGuid = arg.Guid, Cards = defaultCards });
            }
            else
            {
                space = spaces[0];
            }


            return space.Cards;
        }
    }
}

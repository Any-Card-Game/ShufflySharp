using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope.Controller;
using CommonLibraries;
using Models.SiteManagerModels.Game;

namespace Client.Controllers
{
    public class TestGameController
    {
        public const string Name = "TestGameController";
        public const string View = "TestGameUI";
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
                this.scope.Model.Selection.SelectedScenario =
                    this.scope.Model.Game.GameLayoutScenarios.Filter((scen) => scen.Name == "Default")[0];
                //todo fix default to guid idiot
            }


            var addRule = (new Func<Element, Action<string, JsDictionary<string, object>>>(style =>
            {
                var document = (dynamic)Script.Eval("window.document");
                var sheet = document.head.appendChild(style).sheet;
                return (selector, css) =>
                {
                    var propText = Keys(css).Map((p) => { return p + ":" + css[p]; }).Join(";");
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

            scope.Watch("model.game.gameLayout.width + model.game.gameLayout.height",
                () =>
                {
                    scope.Model.Scale = new Point(scope.Model.Selection.SelectedScenario.ScreenSize.X/(double) scope.Model.Game.GameLayout.Width*.9, ((scope.Model.Selection.SelectedScenario.ScreenSize.Y)/(double) scope.Model.Game.GameLayout.Height)*.9);
                });


            scope.Watch(
                "model.selection.selectedScenario.screenSize.x + model.selection.selectedScenario.screenSize.y",() =>
                {
                    scope.Model.Scale =new Point(scope.Model.Selection.SelectedScenario.ScreenSize.X/(double) scope.Model.Game.GameLayout.Width*.9,((scope.Model.Selection.SelectedScenario.ScreenSize.Y)/(double) scope.Model.Game.GameLayout.Height)*.9);
                });

            scope.Model.Scale =
                new Point(
                    scope.Model.Selection.SelectedScenario.ScreenSize.X/(double) scope.Model.Game.GameLayout.Width*.9,
                    ((scope.Model.Selection.SelectedScenario.ScreenSize.Y)/(double) scope.Model.Game.GameLayout.Height)*
                    .9);

            //            scope.Model.Scale = new Point(jQuery.Window.GetWidth() / (double)scope.Model.Game.GameLayout.Width * .9, ((jQuery.Window.GetHeight() - 250) / (double)scope.Model.Game.GameLayout.Height) * .9);

            foreach (var space in scope.Model.Game.GameLayout.Spaces)
            {
                addRule(".space" + space.Name, new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::before", new JsDictionary<string, object>());
                addRule(".space" + space.Name + "::after", new JsDictionary<string, object>());
            }
            foreach (var area in scope.Model.Game.GameLayout.Areas)
            {
                addRule(".area" + area.Name, new JsDictionary<string, object>());
                addRule(".area" + area.Name + "::before", new JsDictionary<string, object>());
                addRule(".area" + area.Name + "::after", new JsDictionary<string, object>());
            }
            foreach (var text in scope.Model.Game.GameLayout.Texts)
            {
                addRule(".text" + text.Name, new JsDictionary<string, object>());
                addRule(".text" + text.Name + "::before", new JsDictionary<string, object>());
                addRule(".text" + text.Name + "::after", new JsDictionary<string, object>());
            }
            for (int t = 0; t < 4; t++)
            {
                for (int c = 0; c < 13; c++)
                {
                    addRule(".card" + t + "-" + c + "", new JsDictionary<string, object>());
                    addRule(".card" + t + "-" + c + "::before", new JsDictionary<string, object>());
                    addRule(".card" + t + "-" + c + "::after", new JsDictionary<string, object>());
                }
            }

            addRule(".card" + -1 + "-" + -1 + "", new JsDictionary<string, object>());
            addRule(".card" + -1 + "-" + -1 + "::before", new JsDictionary<string, object>());
            addRule(".card" + -1 + "-" + -1 + "::after", new JsDictionary<string, object>());

            //  myGameContentManager.Redraw();
        }


        private List<GameLayoutScenarioCard> GetCardsFromScenarioFn(GameSpaceModel arg)
        {
            var scenario = scope.Model.Selection.SelectedScenario;
            return scenario.Spaces.Filter((s) => s.SpaceGuid == arg.Guid)[0].Cards;
        }
    }
}
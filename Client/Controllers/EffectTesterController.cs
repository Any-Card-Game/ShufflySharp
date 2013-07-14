using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope.Controller;
using CommonLibraries;
using jQueryApi;
using Models.SiteManagerModels.Game;

namespace Client.Controllers
{
    public class EffectTesterController
    {
        public const string Name = "EffectTesterController";
        public const string View = "EffectTester";
        private readonly EffectTesterControllerScope scope;

        public EffectTesterController(EffectTesterControllerScope scope)
        {
            this.scope = scope;
            scope.Model.SpaceTest = new EffectTesterSpaceModel();
            scope.Model.SpaceTest.Space = new GameSpaceModel()
                                          {
                                              Guid = Guid.NewGuid(),
                                              Left = 3,
                                              Top = 3,
                                              Height = 2,
                                              Width = 7,
                                              LayoutType = GameSpaceLayoutType.Grow,
                                              Name = "SpaceTest",
                                              Vertical = false
                                          };
            scope.Model.SpaceTest.Cards = new List<GameLayoutScenarioCard>()
                                          {
                                              new GameLayoutScenarioCard()
                                              {
                                                  CardGuid = Guid.NewGuid(),
                                                  State = GameLayoutCardState.FaceDown,
                                                  Type = 1,
                                                  Value = 5
                                              },
                                              new GameLayoutScenarioCard()
                                              {
                                                  CardGuid = Guid.NewGuid(),
                                                  State = GameLayoutCardState.FaceDown,
                                                  Type = 1,
                                                  Value = 6
                                              },
                                              new GameLayoutScenarioCard()
                                              {
                                                  CardGuid = Guid.NewGuid(),
                                                  State = GameLayoutCardState.FaceDown,
                                                  Type = 1,
                                                  Value = 7
                                              },
                                              new GameLayoutScenarioCard()
                                              {
                                                  CardGuid = Guid.NewGuid(),
                                                  State = GameLayoutCardState.FaceDown,
                                                  Type = 1,
                                                  Value = 8
                                              },
                                              new GameLayoutScenarioCard()
                                              {
                                                  CardGuid = Guid.NewGuid(),
                                                  State = GameLayoutCardState.FaceDown,
                                                  Type = 1,
                                                  Value = 9
                                              },
                                              new GameLayoutScenarioCard()
                                              {
                                                  CardGuid = Guid.NewGuid(),
                                                  State = GameLayoutCardState.FaceDown,
                                                  Type = 1,
                                                  Value = 10
                                              }
                                          };


            scope.Model.CardTest = new EffectTesterCardModel();
            scope.Model.CardTest.Space = new GameSpaceModel()
                                         {
                                             Guid = Guid.NewGuid(),
                                             Left = 3,
                                             Top = 8,
                                             Height = 2,
                                             Width = 7,
                                             LayoutType = GameSpaceLayoutType.Grow,
                                             Name = "CardTest",
                                             Vertical = false
                                         };
            scope.Model.CardTest.Card = new GameLayoutScenarioCard()
                                        {
                                            CardGuid = Guid.NewGuid(),
                                            State = GameLayoutCardState.FaceDown,
                                            Type = 2,
                                            Value = 0
                                        };

            scope.Model.AreaTest = new EffectTesterAreaModel();
            scope.Model.AreaTest.Area = new GameAreaModel()
                                        {
                                            Guid = Guid.NewGuid(),
                                            Left = 3,
                                            Top = 6,
                                            Height = 2,
                                            Width = 2,
                                            Name = "AreaTest"
                                        };

            scope.Model.TextTest = new EffectTesterTextModel();
            scope.Model.TextTest.Text = new GameTextModel()
                                        {
                                            Guid = Guid.NewGuid(),
                                            Left = 7,
                                            Top = 6,
                                            Text = "This is some text!",
                                            Name = "TextTest"
                                        };


            scope.Model.Scale = new Point(jQuery.Window.GetWidth()/(double) scope.Model.Game.GameLayout.Width*.9,
                ((jQuery.Window.GetHeight())/(double) scope.Model.Game.GameLayout.Height)*.9);
            var addRule = (new Func<Element, Action<string, JsDictionary<string, object>>>(style =>
                                                                                           {
                                                                                               var document =
                                                                                                   (dynamic)
                                                                                                       Script.Eval(
                                                                                                           "window.document");

                                                                                               var sheet =
                                                                                                   document.head
                                                                                                       .appendChild(
                                                                                                           style).sheet;
                                                                                               return (selector, css) =>
                                                                                                      {
                                                                                                          var propText =
                                                                                                              Keys(css)
                                                                                                                  .Map(
                                                                                                                      (p)
                                                                                                                          =>
                                                                                                                      {
                                                                                                                          return
                                                                                                                              p +
                                                                                                                              ":" +
                                                                                                                              css
                                                                                                                                  [
                                                                                                                                      p
                                                                                                                                  ];
                                                                                                                      })
                                                                                                                  .Join(
                                                                                                                      ";");
                                                                                                          sheet
                                                                                                              .insertRule
                                                                                                              (selector +
                                                                                                               "{" +
                                                                                                               propText +
                                                                                                               "}",
                                                                                                                  sheet
                                                                                                                      .cssRules
                                                                                                                      .length);
                                                                                                      };
                                                                                           }))(
                                                                                               Document.CreateElement(
                                                                                                   "style"));

            var space = scope.Model.SpaceTest.Space;
            addRule(".space" + space.Name, new JsDictionary<string, object>());
            addRule(".space" + space.Name + "::before", new JsDictionary<string, object>());
            addRule(".space" + space.Name + "::after", new JsDictionary<string, object>());

            var area = scope.Model.AreaTest.Area;
            addRule(".area" + area.Name, new JsDictionary<string, object>());
            addRule(".area" + area.Name + "::before", new JsDictionary<string, object>());
            addRule(".area" + area.Name + "::after", new JsDictionary<string, object>());

            var text = scope.Model.TextTest.Text;
            addRule(".text" + text.Name, new JsDictionary<string, object>());
            addRule(".text" + text.Name + "::before", new JsDictionary<string, object>());
            addRule(".text" + text.Name + "::after", new JsDictionary<string, object>());

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
    }
}
using System;
using System.Collections.Generic;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using global;
using jQueryApi;
using WebLibraries.Common;

namespace Client.Controllers
{
    public class DebugGameController
    {
        public const string Name = "DebugGameController";
        public const string View = "DebugGameUI";
        private readonly CreateUIService createUIService;
        private readonly ClientDebugManagerService myClientDebugManagerService;
        private readonly GameContentManagerService myGameContentManagerService;
        private readonly DebugGameControllerScope scope;

        public DebugGameController(DebugGameControllerScope scope, ClientDebugManagerService clientDebugManagerService,
            GameContentManagerService gameContentManagerService, CreateUIService createUIService)
        {
            this.scope = scope;

            myClientDebugManagerService = clientDebugManagerService;
            myGameContentManagerService = gameContentManagerService;
            this.createUIService = createUIService;
            scope.GameModel = new DebugGameModel();


            CreatedUI<QuestionScope> lastQuestion = null;

            myClientDebugManagerService.OnAskQuestion += (user, gameSendAnswerModel) =>
                                                         {
                                                             lastQuestion = createUIService.CreateSingleton<QuestionScope>(DebugQuestionController.View,
                                                                 (myScope, elem) =>
                                                                 {
                                                                     myScope.Model = new QuestionScopeModel();
                                                                     myScope.Model.Question = gameSendAnswerModel.Question;
                                                                     myScope.Model.Answers = gameSendAnswerModel.Answers;
                                                                     myScope.Model.SelectedAnswer = gameSendAnswerModel.Answers[0];
                                                                 });
                                                         };
            scope.OnDestroy += () =>
                               {
                                   if (lastQuestion != null)
                                   {
                                       lastQuestion.Destroy();
                                   }
                               };

            /* effectManager.Effects =new List<GameEffectModel>();
             effectManager.Effects.Add(GameEffectsEditorController.makeEffect("bend", EffectType.Bend));
              */
            /*     myClientDebugManagerService.OnAskQuestion += (user, gameSendAnswerModel) => {
                                                        PageHandler.QuestionUI.Load(gameSendAnswerModel);
                                                        //alert(JSON.stringify(data));
                                                        PageHandler.TimeTracker.EndTime = new DateTime();
                                                        var time = PageHandler.TimeTracker.EndTime - PageHandler.TimeTracker.StartTime;
                                                      PageHandler.  DebugUI.lblHowFast.Text = ( "how long: " + time ); 
                                                    }; */


            var sheet = ClientHelpers.CreateCSSSheet();


            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 13; j++)
                {
                    ClientHelpers.AddCSSRule(sheet, ".card" + i + "-" + j + "", new JsDictionary<string, object>());
                    ClientHelpers.AddCSSRule(sheet, ".card" + i + "-" + j + "::before", new JsDictionary<string, object>());
                    ClientHelpers.AddCSSRule(sheet, ".card" + i + "-" + j + "::after", new JsDictionary<string, object>());
                }
            }
            ClientHelpers.AddCSSRule(sheet, ".card" + -1 + "-" + -1 + "", new JsDictionary<string, object>());
            ClientHelpers.AddCSSRule(sheet, ".card" + -1 + "-" + -1 + "::before", new JsDictionary<string, object>());
            ClientHelpers.AddCSSRule(sheet, ".card" + -1 + "-" + -1 + "::after", new JsDictionary<string, object>());

            var spaceLookups = new JsDictionary<string, DebugSpace>();


            myClientDebugManagerService.OnUpdateState += (user, update) =>
                                                         {
                                                             GoodConsole.Time("Render");
                                                             var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));

                                                             bool create = scope.GameModel.MainArea == null;

                                                             scope.GameModel.MainArea = data;


                                                             if (create)
                                                             {
                                                                 scope.GameModel.Scale = new Point(jQuery.Window.GetWidth()/(double) scope.GameModel.MainArea.Size.Width*.9, ((jQuery.Window.GetHeight())/(double) scope.GameModel.MainArea.Size.Height)*.9);
                                                                 foreach (var cardGameTableSpace in scope.GameModel.MainArea.Spaces)
                                                                 {
                                                                     ClientHelpers.AddCSSRule(sheet, ".space" + cardGameTableSpace.Name + "", new JsDictionary<string, object>());
                                                                     ClientHelpers.AddCSSRule(sheet, ".space" + cardGameTableSpace.Name + "::before", new JsDictionary<string, object>());
                                                                     ClientHelpers.AddCSSRule(sheet, ".space" + cardGameTableSpace.Name + "::after", new JsDictionary<string, object>());
                                                                 }
                                                             }


                                                             scope.GameModel.Spaces = scope.GameModel.MainArea.Spaces.Map(space =>
                                                                                                                          {
                                                                                                                              DebugSpace debugSpace = spaceLookups[space.Name] ?? (spaceLookups[space.Name] = new DebugSpace());
                                                                                                                              debugSpace.GameSpace = space;
                                                                                                                              return debugSpace;
                                                                                                                          });

                                                             scope.Broadcast("spaceUpdated");
                                                             scope.Apply();
                                                             GoodConsole.TimeEnd("Render");

                                                             //         myGameContentManagerService.Redraw();
                                                         };

            jQuery.Window.Bind("resize", (a) =>
                                         {
                                             scope.GameModel.Scale = new Point(jQuery.Window.GetWidth()/(double) scope.GameModel.MainArea.Size.Width*.9, ((jQuery.Window.GetHeight())/(double) scope.GameModel.MainArea.Size.Height)*.9);
                                             scope.Broadcast("redraw");
                                             scope.Apply();
                                         });


            myClientDebugManagerService.OnGameStarted += (user, room) =>
                                                         {
                                                             //alert(JSON.stringify(data));
                                                         };

            myClientDebugManagerService.OnGameOver += (user, room) =>
                                                      {
                                                          //alert(JSON.stringify(data));
                                                      };


            scope.GameModel.MainArea = null;


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
        }
    }
}
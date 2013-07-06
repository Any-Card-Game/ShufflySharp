using System;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models.GameManagerModels;
using Client.Scope.Directive;
namespace Client.Controllers
{
    internal class QuestionController
    {
        private readonly QuestionScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientGameManagerService myClientGameManagerService;

        public QuestionController(QuestionScope scope, UIManagerService uiManager, ClientGameManagerService clientGameManagerService)
        {
            myScope = scope; 
            myUIManager = uiManager;
            myClientGameManagerService = clientGameManagerService;
            myScope.Model = new QuestionScopeModel();

            myScope.Model.WindowClosed = () =>
            {
                Window.Alert("woooo");
            };
            myScope.Model.AnswerQuestion = AnswerQuestionFn;
            myScope.Visible = false;
             

            myClientGameManagerService.OnAskQuestion += (user, gameSendAnswerModel) => {
                                                            Window.SetTimeout(() => {
                                                                                  myScope.Visible = true;
                                                                                  myScope.SwingAway(SwingDirection.TopLeft, true, null);
                                                                                  myScope.SwingBack(null);
                                                                                  OnQuestionAskedFn(gameSendAnswerModel);

                                                                              },500);
                                                        };


        }

        private void OnQuestionAskedFn(GameSendAnswerModel arg)
        {

            myScope.Model.Question = arg.Question;
            myScope.Model.Answers = arg.Answers;
            myScope.Model.SelectedAnswer = arg.Answers[0];
            myScope.Apply();
        }

        private void AnswerQuestionFn()
        {
            myScope.SwingAway(SwingDirection.BottomRight, false, () => {
                                                                     myClientGameManagerService.AnswerQuestion(new GameAnswerQuestionModel(myScope.Model.Answers.IndexOf(myScope.Model.SelectedAnswer)));
                                                                 });
        }
    }
}
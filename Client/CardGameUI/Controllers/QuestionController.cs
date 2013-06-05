using System;
using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using Client;
using Models.GameManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Controllers
{
    internal class QuestionController
    {
        private readonly QuestionScope myScope;
        private readonly UIManagerService myUIManager;

        public QuestionController(QuestionScope scope, UIManagerService uiManager)
        {
            myScope = scope;
            myUIManager = uiManager;
            myScope.Model = new QuestionModel();

            myScope.Model.WindowClosed = () =>
            {
                Window.Alert("woooo");
            };
            myScope.Model.AnswerQuestion = AnswerQuestionFn;
            myScope.Visible = false;

            myUIManager.OnQuestionAsked += OnQuestionAskedFn;

            uiManager.PageHandler.ClientGameManager.OnAskQuestion += (user, gameSendAnswerModel) =>
            {
                myScope.Visible = true;
                myScope.SwingAway(SwingDirection.TopLeft, true);
                                                                         myScope.SwingBack();
                myUIManager.OnQuestionAsked(gameSendAnswerModel);
            };


        }

        private void OnQuestionAskedFn(GameSendAnswerModel arg)
        {

            myScope.Model.Question = arg.Question;
            myScope.Model.Answers = arg.Answers;
            myScope.Model.SelectedAnswer = arg.Answers[0];
            myScope.SwingBack();
            myScope.Apply();
        }

        private void AnswerQuestionFn()
        {
            myUIManager.PageHandler.ClientGameManager.AnswerQuestion(new GameAnswerQuestionModel(myScope.Model.Answers.IndexOf(myScope.Model.SelectedAnswer)));

            myScope.SwingAway(SwingDirection.TopLeft, false);
        }
    }
}
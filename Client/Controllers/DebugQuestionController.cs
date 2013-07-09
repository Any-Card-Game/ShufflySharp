using System;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models.GameManagerModels;
using Client.Scope.Directive;
namespace Client.Controllers
{
    internal class DebugQuestionController
    {
        private readonly QuestionScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientGameManagerService myClientGameManagerService;

        public DebugQuestionController(QuestionScope scope, UIManagerService uiManager, ClientGameManagerService clientGameManagerService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientGameManagerService = clientGameManagerService;
             
            myScope.Model.AnswerQuestion = AnswerQuestionFn;
            myScope.Visible = false;


            Window.SetTimeout(() =>
            {
                myScope.Visible = true;
                myScope.SwingAway(SwingDirection.TopLeft, true, null);
                myScope.SwingBack(null);

            }, 500);



        }

        private void AnswerQuestionFn()
        {
            myScope.SwingAway(SwingDirection.BottomRight, false, () =>
            {
                myClientGameManagerService.AnswerQuestion(new GameAnswerQuestionModel(myScope.Model.Answers.IndexOf(myScope.Model.SelectedAnswer)));
                myScope.DestroyWindow();
            });
        }
    }
}
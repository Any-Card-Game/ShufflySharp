using System;
using System.Html;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using Models.GameManagerModels;

namespace Client.Controllers
{
    internal class QuestionController
    {
        public const string View = "Question";
        public const string Name = "QuestionController";
        private readonly ClientGameManagerService myClientGameManagerService;
        private readonly QuestionScope myScope;

        public QuestionController(QuestionScope scope, ClientGameManagerService clientGameManagerService)
        {
            myScope = scope;
            myClientGameManagerService = clientGameManagerService;

            myScope.Model.WindowClosed = () => { Window.Alert("woooo"); };

            myScope.Model.AnswerQuestion = AnswerQuestionFn;
            myScope.Visible = false;

            myScope.OnReady += () =>
                               {
                                   myScope.SwingAway(SwingDirection.TopLeft, true, null);
                                   myScope.SwingBack(null);
                               };
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
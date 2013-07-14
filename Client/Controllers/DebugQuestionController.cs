using System;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using Models.GameManagerModels;

namespace Client.Controllers
{
    internal class DebugQuestionController
    {
        public const string Name = "DebugQuestionController";
        public const string View = "DebugQuestion";

        private readonly ClientDebugManagerService myClientDebugManagerService;
        private readonly QuestionScope myScope;

        public DebugQuestionController(QuestionScope scope,  
            ClientDebugManagerService clientDebugManagerService)
        {
            myScope = scope; 
            myClientDebugManagerService = clientDebugManagerService;

            myScope.Model.AnswerQuestion = AnswerQuestionFn;
            myScope.Visible = false;

            myScope.OnReady += () =>
                               {
                                   myScope.Visible = true;
                                   myScope.SwingAway(SwingDirection.TopLeft, true, null);
                                   myScope.SwingBack(null);
                               };
        }

        private void AnswerQuestionFn()
        {
            myScope.SwingAway(SwingDirection.BottomRight, false, () =>
                                                                 {
                                                                     myClientDebugManagerService.AnswerQuestion(
                                                                         new GameAnswerQuestionModel(
                                                                             myScope.Model.Answers.IndexOf(
                                                                                 myScope.Model.SelectedAnswer)));
                                                                     myScope.DestroyWindow();
                                                                 });
        }
    }
}
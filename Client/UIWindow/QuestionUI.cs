using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models.GameManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.UIWindow
{
    public class QuestionUI
    {
        public PageHandler PageHandler { get; set; }
        [IntrinsicProperty]
        public ShuffLabel Question { get; set; }
        [IntrinsicProperty]
        public ShuffListBox AnswerBox { get; set; }
        [IntrinsicProperty]
        public Action<GameSendAnswerModel> Load { get; set; }
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public QuestionUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            PageHandler = pageHandler;
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "Question",
                                                                             X = 600,
                                                                             Y = 100,
                                                                             Width = 300,
                                                                             Height = 275,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = true
                                                                     });
            UIWindow.SwingAway(SwingDirection.TopLeft,true);

            Question = UIWindow.AddElement(new ShuffLabel(20, 40, ""));

            Load = (question) => {
                UIWindow.SwingBack();

                       Question.Text = ( question.Question );
                       AnswerBox.ClearItems();

                       for (var i = 0; i < question.Answers.Length; i++) {
                           AnswerBox.AddItem(new ShuffListItem(question.Answers[i], i));
                       }

                   };
            //ExtensionMethods.debugger();

            AnswerBox = UIWindow.AddElement(new ShuffListBox(30, 65, 215, 25 * 5) {
                                                                                          OnClick = e => selectAnswer( e)
                                                                                  });
        }

        private void selectAnswer( ShuffListItem e)
        { 

            PageHandler.ClientGameManager.AnswerQuestion(new GameAnswerQuestionModel((int) e.Value));

            UIWindow.SwingAway(SwingDirection.TopLeft);
            PageHandler.TimeTracker.StartTime = new DateTime();
        }
    }
}
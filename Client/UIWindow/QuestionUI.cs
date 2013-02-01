using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.GameManagerModels;
using ShuffUI;
namespace Client.UIWindow
{
    public class QuestionUI
    {
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
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "Question",
                                                                             X = 600,
                                                                             Y = 100,
                                                                             Width = 300,
                                                                             Height = 275,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = false
                                                                     });

            Question = UIWindow.AddElement(new ShuffLabel(20, 40, ""));

            Load = (question) => {
                       UIWindow.Visible = true;
                       Question.Text = ( question.Question );
                       AnswerBox.Parent.RemoveElement(AnswerBox);

                       var answers = new List<ShuffListItem>();
                       for (var i = 0; i < question.Answers.Length; i++) {
                           answers.Add(new ShuffListItem(question.Answers[i], i));
                       }

                       AnswerBox = UIWindow.AddElement(new ShuffListBox(30, 95, 215, 25 * 5) {
                                                                                                     Items = answers,
                                                                                                     /*OnClick = (e) =>
{
pageHandler.gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(pageHandler.gameStuff.RoomID, e.Item.Value), devArea.Data.gameServer);
questionArea.Visible = false;
}*/
                                                                                             });
                   };

            AnswerBox = UIWindow.AddElement(new ShuffListBox(30, 65, 215, 25 * 5) {
                                                                                          /*OnClick = (e) =>
{
pageHandler.gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(pageHandler.gameStuff.RoomID, e.Item.Value), devArea.Data.gameServer);
questionArea.Visible = false;
}*/
                                                                                  });
        }
    }
}
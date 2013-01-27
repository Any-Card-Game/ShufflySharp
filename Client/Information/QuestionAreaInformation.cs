using System;
using System.Runtime.CompilerServices;
using Client.ShuffUI;
using Models.GameManagerModels;
namespace Client.Information
{
    [Serializable]
    public class QuestionAreaInformation
    {
        public ShuffLabel Question { get; set; }
        public ShuffListBox AnswerBox { get; set; }
        public Action<GameSendAnswerModel> Load { get; set; }
    }
}
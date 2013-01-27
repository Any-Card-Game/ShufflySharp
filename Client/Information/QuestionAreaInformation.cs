using System;
using System.Runtime.CompilerServices;
using Models.GameManagerModels;
using ShuffUI;
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
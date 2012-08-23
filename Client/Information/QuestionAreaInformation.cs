using System;
using System.Runtime.CompilerServices;
using Client.ShuffUI;
using Models;
using jQueryApi;

namespace Client.Information
{
    public class QuestionAreaInformation
    {
        [IntrinsicProperty]
        public ShuffLabel question { get; set; }

        [IntrinsicProperty]
        public ShuffLabel answerBox { get; set; }

        [IntrinsicProperty]
        public Action<GameSendAnswerModel> load { get; set; }
    }
}
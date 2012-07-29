using System;
using System.Runtime.CompilerServices;
using Models;
using jQueryApi;

namespace Client.Information
{
    public class QuestionAreaInformation
    {
        [IntrinsicProperty]
        public jQueryObject question { get; set; }

        [IntrinsicProperty]
        public jQueryObject answerBox { get; set; }

        [IntrinsicProperty]
        public Action<GameSendAnswerModel> load { get; set; }
    }
}
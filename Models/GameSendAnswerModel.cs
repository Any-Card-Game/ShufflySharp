using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public sealed class GameSendAnswerModel
    {
        [IntrinsicProperty]
        public string Question { get; set; }

        [IntrinsicProperty]
        public string[] Answers { get; set; }
    }
}
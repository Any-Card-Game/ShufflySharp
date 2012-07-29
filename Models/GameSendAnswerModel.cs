using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class GameSendAnswerModel
    {
        [IntrinsicProperty]
        public string Question { get; set; }

        [IntrinsicProperty]
        public string[] Answers { get; set; }
    }
}
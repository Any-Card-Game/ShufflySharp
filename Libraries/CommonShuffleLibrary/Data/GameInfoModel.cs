using System;
namespace CommonShuffleLibrary.Data
{
    [Serializable]
    public class GameInfoModel
    {
        public int AnswerIndex { get; set; }
        public string GameName { get; set; }
    }
}
using ShufflyGame;
using ShufflyNode.Common;

namespace ShufflyNode.GameServer
{
    public class GameQuestionAnswer
    {
        public User User;
        public string Question;
        public string[] Answers;
        public GameCardGame CardGame;
    }
}
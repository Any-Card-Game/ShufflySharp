using Models;
using global;
namespace GameServer
{
    public class GameQuestionAnswerModel
    {
        public string[] Answers;
        public GameCardGame CardGame;
        public string Question;
        public UserModel User;
    }
}
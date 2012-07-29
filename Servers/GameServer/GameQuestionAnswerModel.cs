
using CommonShuffleLibrary;
using Models;
using global;

namespace GameServer
{
    public class GameQuestionAnswerModel
    {
        public UserModel User;
        public string Question;
        public string[] Answers;
        public GameCardGame CardGame;
    }
     
}
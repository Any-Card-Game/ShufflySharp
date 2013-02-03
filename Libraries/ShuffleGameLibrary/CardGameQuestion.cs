using System.Runtime.CompilerServices;
using Models;
namespace global
{
    public class CardGameQuestion
    {
        [IntrinsicProperty]
        public UserLogicModel User { get; set; }
        [IntrinsicProperty]
        public string Question { get; set; }
        [IntrinsicProperty]
        public string[] Answers { get; set; }
        [IntrinsicProperty]
        public GameCardGame CardGame { get; set; }

        public CardGameQuestion(UserLogicModel user, string question, string[] answers, GameCardGame cardGame)
        {
            User = user;
            Question = question;
            Answers = answers;
            CardGame = cardGame;
        }
    }
}
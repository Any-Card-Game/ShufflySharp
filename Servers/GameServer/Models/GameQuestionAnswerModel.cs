using System;
using Models;
using global;
namespace GameServer.Models
{
    [Serializable]
    public class GameQuestionAnswerModel
    {
        public string[] Answers { get; set; }
        public GameCardGame CardGame { get; set; }
        public string Question { get; set; }
        public UserModel User { get; set; }
    }
}
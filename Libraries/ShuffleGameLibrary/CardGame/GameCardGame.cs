using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models;
namespace global
{
    [ScriptName("CardGame")]
    public class GameCardGame
    {
        [ScriptName("emulating")]
        [IntrinsicProperty]
        public bool Emulating { get; set; }
        [ScriptName("name")]
        [IntrinsicProperty]
        protected string Name { get; set; }
        [ScriptName("answerIndex")]
        [IntrinsicProperty]
        public int AnswerIndex { get; set; }
        [ScriptName("spaces")]
        [IntrinsicProperty]
        public List<CardGameTableSpace> Spaces { get; set; }
        [IntrinsicProperty]
        [ScriptName("textAreas")]
        public List<GameCardGameTextArea> TextAreas { get; set; }
        [ScriptName("size")]
        [IntrinsicProperty]
        public Size Size { get; set; }
        [ScriptName("answers")]
        [IntrinsicProperty]
        public List<CardGameAnswer> Answers { get; set; }
        [ScriptName("users")]
        [IntrinsicProperty]
        public List<CardGameUser> Users { get; set; }
        [ScriptName("deck")]
        [IntrinsicProperty]
        public CardGamePile Deck { get; set; }
        [IntrinsicProperty]
        [ScriptName("numberOfCards")]
        public int NumberOfCards { get; set; }
        [IntrinsicProperty]
        [ScriptName("numberOfJokers")]
        public int NumberOfJokers { get; set; }

        public GameCardGame(GameCardGameOptions options)
        {
            Spaces = new List<CardGameTableSpace>();
            TextAreas = new List<GameCardGameTextArea>();
            Answers = new List<CardGameAnswer>();
            Users = new List<CardGameUser>();
            NumberOfCards = options.NumberOfCards == 0 ? 52 : options.NumberOfCards;
            NumberOfJokers = options.NumberOfJokers == 0 ? 52 : options.NumberOfJokers;

            Deck = new CardGamePile("deck");
            for (var i = 0; i < NumberOfCards; i++) {
                Deck.Cards.Add(new CardGameCard(i % 13, (int) Math.Floor(i / 13)));
            }
            for (var i = 0; i < NumberOfJokers; i++) {
                Deck.Cards.Add(new CardGameCard(0, 0));
            }

            Size = new Size {Width = 22, Height = 10};

            /*
           

    this.setAnswers = function (answers) {
        this.answers = answers;
    };
             */
        }

        [ScriptName("setAnswers")]
        public void SetAnswers(List<CardGameAnswer> answers)
        {
            Answers = answers;
        }

        [ScriptName("setPlayers")]
        public void SetPlayers(List<UserModel> players)
        {
            Users = new List<CardGameUser>();

            if (players == null || players.Count == 0)
                return;
            if (players.Count > 6)
                players.RemoveRange(6, players.Count - 6);
            for (var j = 0; j < players.Count; j++) {
                Users.Add(new CardGameUser(players[j].UserName));
            }
        }

        //arg0: cards per player
        //arg1: CardState
        //return undefined 
        [ScriptName("dealCards")]
        public void DealCards(int numberOfCards, int state) {}
    }
}
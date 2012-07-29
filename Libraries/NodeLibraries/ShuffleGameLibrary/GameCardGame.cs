using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibrary;

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


        [ScriptName("setAnswers")]
        public void SetAnswers(List<CardGameAnswer> answers)
        {
            this.Answers = answers;
        }
        [IgnoreGenericArguments]
        [ScriptName("setPlayers")]
        public void SetPlayers(List<User> players)
        {

            Users = new List<CardGameUser>();


            if (players == null || players.Count == 0)
            {
                return;
            }
            if (players.Count > 6)
                players.RemoveRange(6, players.Count - 6);
            for (var j = 0; j < players.Count; j++)
            {
                this.Users.Add(new CardGameUser(players[j].UserName));
            }


        }
        //arg0: cards per player
        //arg1: CardState
        //return undefined 
        [ScriptName("dealCards")]
        public void DealCards(int numberOfCards, int state)
        {

        }
        public GameCardGame(GameCardGameOptions options)
        {

            Spaces = new List<CardGameTableSpace>();
            TextAreas = new List<GameCardGameTextArea>();
            Answers = new List<CardGameAnswer>();
            Users = new List<CardGameUser>();
            NumberOfCards = options.NumberOfCards == 0 ? 52 : options.NumberOfCards;
            NumberOfJokers = options.NumberOfJokers == 0 ? 52 : options.NumberOfJokers;

            Deck = new CardGamePile("deck");
            for (int i = 0; i < NumberOfCards; i++)
            {
                this.Deck.Cards.Add(new CardGameCard(i % 13, Math.Floor(i / 13)));
            } for (int i = 0; i < NumberOfJokers; i++)
            {
                this.Deck.Cards.Add(new CardGameCard(0, 0));
            }

            Size = new Size() { Width = 16, Height = 12 };




            /*
           

    this.setAnswers = function (answers) {
        this.answers = answers;
    };
             */
        }


    }
    [Record]
    public sealed class GameCardGameOptions
    {
        [IntrinsicProperty]
        [ScriptName("numberOfCards")]
        public int NumberOfCards { get; set; }
        [IntrinsicProperty]
        [ScriptName("numberOfJokers")]
        public int NumberOfJokers { get; set; }

    }

    public class CardGameAnswer
    {
        [ScriptName("value")]
        [IntrinsicProperty]
        public int Value { get; set; }
    }
    [ScriptName("User")]
    public class CardGameUser
    {
        public CardGameUser(string name)
        {
            UserName = name;
            Cards = new CardGamePile(name);
        }
        [ScriptName("userName")]
        [IntrinsicProperty]
        public string UserName { get; set; }
        [ScriptName("playerDealingOrder")]
        [IntrinsicProperty]
        public int PlayerDealingOrder { get; set; }
        [ScriptName("cards")]
        [IntrinsicProperty]
        public CardGamePile Cards { get; set; }
    }


    [ScriptName("PokerResult")]
    public class CardGamePokerResult
    {
        public CardGamePokerResult(double weight, CardGamePokerWinType type, List<CardGameCard> cards)
        {
            this.Weight = weight;
            this.Type = type;
            this.Cards = cards;
        }

        [ScriptName("weight")]
        [IntrinsicProperty]
        public double Weight { get; set; }

        [ScriptName("state")]
        [IntrinsicProperty]
        public CardGamePokerWinType Type { get; set; }

        [ScriptName("cards")]
        [IntrinsicProperty]
        public List<CardGameCard> Cards { get; set; }

    }

    [ScriptName("PokerWinType")]
    public enum CardGamePokerWinType
    {
        Straight = 1,
        Flush = 2,
        Pair = 3,
        ThreeOfAKind = 4,
        FourOfAKind = 5,
        StraightFlush = 6
    }

    [ScriptName("Card")]
    public class CardGameCard
    {
        public CardGameCard(int value, int type)
        {
            Value = value;
            Type = type;
        }

        [ScriptName("value")]
        [IntrinsicProperty]
        public int Value { get; set; }
        [ScriptName("type")]
        [IntrinsicProperty]
        public int Type { get; set; }
        [ScriptName("state")]
        [IntrinsicProperty]
        public CardGameCardState State { get; set; }
        [ScriptName("effects")]
        [IntrinsicProperty]
        public List<CardGameEffect> Effects { get; set; }

    }

    [ScriptName("CardState")]
    public enum CardGameCardState
    {
        [ScriptName("faceUp")]
        FaceUp = 0,
        [ScriptName("faceDown")]
        FaceDown = 1,
        [ScriptName("faceUpIfOwned")]
        FaceUpIfOwned = 2
    }
    [ScriptName("CardType")]
    public enum CardGameCardType
    {
        [ScriptName("heart")]
        Heart = 0,
        [ScriptName("diamond")]
        Diamond = 1,
        [ScriptName("spade")]
        Spade = 2,
        [ScriptName("club")]
        Club = 3
    } 
    [ScriptName("Effects")] 

    public class CardGameEffect
    {
        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }
        public CardGameEffect()
        {
            this.Type = "";
        }
    } 
    [ScriptName("Effect$Highlight")]
    public  class CardGameEffectHighlight : CardGameEffect
    {
        [ScriptName("radius")]
        [IntrinsicProperty]
        public double Radius { get; set; }
        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }
        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [ScriptName("offsetX")]
        [IntrinsicProperty]
        public double OffsetX { get; set; }
        [ScriptName("offsetY")]
        [IntrinsicProperty]
        public double OffsetY { get; set; }

        public CardGameEffectHighlight(CardGameEffectHighlightOptions options)
        {
            this.Type = "highlight";
            this.Radius = options.Radius == 0 ? 0 : options.Radius;
            this.Color = options.Color == null ? "yellow" : options.Color;
            this.Rotate = options.Rotate == 0 ? 0 : options.Rotate;
            this.OffsetX = options.OffsetX == 0 ? 0 : options.OffsetX;
            this.OffsetY = options.OffsetY == 0 ? 0 : options.OffsetY;
        }
    }
    [Record]
    public sealed class CardGameEffectHighlightOptions
    {
        [ScriptName("radius")]
        [IntrinsicProperty]
        public double Radius { get; set; }
        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }
        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [ScriptName("offsetX")]
        [IntrinsicProperty]
        public double OffsetX { get; set; }
        [ScriptName("offsetY")]
        [IntrinsicProperty]
        public double OffsetY { get; set; }

    }

    public enum EffectType
    {
        Highlight
    }
    [Record]
    public sealed class CardGameArea
    {
        [ScriptName("size")]
        [IntrinsicProperty]
        public Size Size { get; set; }

        [ScriptName("spaces")]
        [IntrinsicProperty]
        public List<CardGameTableSpace> Spaces { get; set; }

        [ScriptName("textAreas")]
        [IntrinsicProperty]
        public List<CardGameTextArea> TextAreas { get; set; }
    }

    [ScriptName("TableTextArea")]
    public class GameCardGameTextArea
    {
        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }
        [ScriptName("x")]
        [IntrinsicProperty]
        public int X { get; set; }
        [ScriptName("nayme")]
        [IntrinsicProperty]
        public int Y { get; set; }
        [ScriptName("text")]
        [IntrinsicProperty]
        public string Text { get; set; }

        public GameCardGameTextArea(GameCardGameTextAreaOptions options)
        {
            this.Name = options.Name == null ? "Text Area" : options.Name;
            this.X = options.X == 0 ? 0 : options.X;
            this.Y = options.Y == 0 ? 0 : options.Y;
            this.Text = options.Text == null ? "Text" : options.Text;
        }
    }

    public class Rectangle
    {
        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }
        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
        [ScriptName("width")]
        [IntrinsicProperty]
        public double Width { get; set; }
        [ScriptName("height")]
        [IntrinsicProperty]
        public double Height { get; set; }

        public Rectangle(double x, double y, double width, double height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }
    }
    [Record]
    public sealed class GameCardGameTextAreaOptions
    {
        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }
        [ScriptName("x")]
        [IntrinsicProperty]
        public int X { get; set; }
        [ScriptName("nayme")]
        [IntrinsicProperty]
        public int Y { get; set; }
        [ScriptName("text")]
        [IntrinsicProperty]
        public string Text { get; set; }

    }
     

    [ScriptName("TableSpace")]
    public class CardGameTableSpace
    {
        [ScriptName("vertical")]
        [IntrinsicProperty]
        public bool Vertical { get; set; }
        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }
        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
        [ScriptName("width")]
        [IntrinsicProperty]
        public double Width { get; set; }
        [ScriptName("height")]
        [IntrinsicProperty]
        public double Height { get; set; }
        [ScriptName("pile")]
        [IntrinsicProperty]
        public CardGamePile Pile { get; set; }
        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [ScriptName("visible")]
        [IntrinsicProperty]
        public bool Visible { get; set; }
        [ScriptName("stackCards")]
        [IntrinsicProperty]
        public bool StackCards { get; set; }
        [ScriptName("drawCardsBent")]
        [IntrinsicProperty]
        public bool DrawCardsBent { get; set; }
        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }
        [ScriptName("sortPrder")]
        [IntrinsicProperty]
        public CardGameOrder SortOrder { get; set; }
        [ScriptName("numerOfCardsHorizontal")]
        [IntrinsicProperty]
        public int NumerOfCardsHorizontal { get; set; }
        [ScriptName("numerOfCardsVertical")]
        [IntrinsicProperty]
        public int NumerOfCardsVertical { get; set; }

        public CardGameTableSpace(CardGameTableSpaceOptions options)
        {
            this.Vertical = !options.Vertical ? true : options.Vertical;
            this.X = options.X == 0 ? 0 : options.X;
            this.Y = options.Y == 0 ? 0 : options.Y;
            this.Width = options.Width == 0 ? 0 : options.Width;
            this.Height = options.Height == 0 ? 0 : options.Height;
            this.Pile = options.Pile;
            this.Rotate = options.Rotate == 0 ? 0 : options.Rotate;
            this.Visible = !options.Visible ? true : options.Visible;
            this.StackCards = !options.StackCards ? false : options.StackCards;
            this.DrawCardsBent = !options.DrawCardsBent ? true : options.DrawCardsBent;
            this.Name = options.Name ?? "TableSpace";
            this.SortOrder = options.SortOrder;
            this.NumerOfCardsHorizontal = options.NumerOfCardsHorizontal == 0 ? 1 : options.NumerOfCardsHorizontal;
            this.NumerOfCardsVertical = options.NumerOfCardsVertical == 0 ? 1 : options.NumerOfCardsVertical;

        }
    }
    [ScriptName("Order")]
    public enum CardGameOrder
    {
        NoOrder = 0, Ascending = 1, Descending = 2
    }
    [Record]
    public sealed class CardGameTableSpaceOptions
    {
        [ScriptName("vertical")]
        [IntrinsicProperty]
        public bool Vertical { get; set; }
        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }
        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
        [ScriptName("width")]
        [IntrinsicProperty]
        public double Width { get; set; }
        [ScriptName("height")]
        [IntrinsicProperty]
        public double Height { get; set; }
        [ScriptName("pile")]
        [IntrinsicProperty]
        public CardGamePile Pile { get; set; }
        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [ScriptName("visible")]
        [IntrinsicProperty]
        public bool Visible { get; set; }
        [ScriptName("stackCards")]
        [IntrinsicProperty]
        public bool StackCards { get; set; }
        [ScriptName("drawCardsBent")]
        [IntrinsicProperty]
        public bool DrawCardsBent { get; set; }
        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }
        [ScriptName("sortPrder")]
        [IntrinsicProperty]
        public CardGameOrder SortOrder { get; set; }
        [ScriptName("numerOfCardsHorizontal")]
        [IntrinsicProperty]
        public int NumerOfCardsHorizontal { get; set; }
        [ScriptName("numerOfCardsVertical")]
        [IntrinsicProperty]
        public int NumerOfCardsVertical { get; set; }
    }

    [ScriptName("Pile")]
    public class CardGamePile
    {

        public CardGamePile(string name)
        {
            Name = name;
            Cards = new List<CardGameCard>();
        }
        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }
        [ScriptName("cards")]
        [IntrinsicProperty]
        public List<CardGameCard> Cards { get; set; }

        [ScriptName("shuffle")]
        public void Shuffle()
        {
            var o = this.Cards;
            CardGameCard x;
            for (int j, i = o.Count; i == 0; j = int.Parse((Math.Random() * i).ToString()), x = o[--i], o[i] = o[j], o[j] = x) ;//lol
            this.Cards = o;
        }
    }
    [ScriptName("TableTextArea")]
    public class CardGameTextArea
    {
        [ScriptName("text")]
        [IntrinsicProperty]
        public string Text { get; set; }
        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }
        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
    }


}

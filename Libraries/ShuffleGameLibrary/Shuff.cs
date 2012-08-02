using System;
using System.Runtime.CompilerServices;
using FibersLibrary;
using Models;

namespace global
{
    [ScriptName("shuff")]
    public static class Shuff
    {
        [ScriptName("askQuestion")]
        public static int AskQuestion(UserModel user, string question, string[] answers, GameCardGame cardGame)
        {
            cardGame.Emulating = false;
            if (cardGame.Answers.Count - 1 > cardGame.AnswerIndex)
            {
                cardGame.Emulating = true;
                return cardGame.Answers[cardGame.AnswerIndex++].Value; //todo .value
            }
            var m = new CardGameQuestion(user, question, answers, cardGame);

            var answer = Fiber<CardGameAnswer>.Yield(new FiberYieldResponse(FiberYieldResponseType.AskQuestion, m));
            cardGame.AnswerIndex++;
            return answer == null ? 0 : answer.Value;
        }

        [ScriptName("declareWinner")]
        public static void DeclareWinner(UserModel user)
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.GameOver));
        }

        [ScriptName("log")]
        public static void Log(string msg)
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.Log, msg));
        }

        [ScriptName("break_")]
        public static void Break(int lineNumber, GameCardGame cardGame, Func<string, string> varLookup)
        {
            if (cardGame.Emulating)
            {
                return;
            }

            var yieldObject = new FiberYieldResponse(FiberYieldResponseType.Break, lineNumber - 1, "");
            while (true)
            {
                var answ = Fiber<FiberYieldResponse>.Yield(yieldObject);

                if (answ == null)
                {
                    //continue
                    return;
                }
                if (answ.VariableLookup != null)
                {
                    yieldObject = new FiberYieldResponse(FiberYieldResponseType.VariableLookup, 0, varLookup(answ.VariableLookup));
                    continue;
                }
                break;
            }
        }
    }

    public class FiberYieldResponse
    {
        public FiberYieldResponse(FiberYieldResponseType type, CardGameQuestion question) //answerQuestion
        {
            Type = type;
            Question = question;
        }

        public FiberYieldResponse(FiberYieldResponseType type, string contents) //log
        {
            Type = type;
            Contents = contents;
        }

        public FiberYieldResponse(FiberYieldResponseType type) //gameOver
        {
            Type = type;
        }

        public FiberYieldResponse(FiberYieldResponseType type, int lineNumber, string value) //break,variableLookup
        {
            Type = type;
            LineNumber = lineNumber;
            Value = value;
        }

        [ScriptName("variableLookup")]
        [IntrinsicProperty]
        public string VariableLookup { get; set; }

        [ScriptName("type")]
        [IntrinsicProperty]
        public FiberYieldResponseType Type { get; set; }

        [ScriptName("contents")]
        [IntrinsicProperty]
        public string Contents { get; set; }

        [ScriptName("question")]
        [IntrinsicProperty]
        public CardGameQuestion Question { get; set; }

        [ScriptName("lineNumber")]
        [IntrinsicProperty]
        public int LineNumber { get; set; }

        [ScriptName("value")]
        [IntrinsicProperty]
        public string Value { get; set; }
    }
    //[NamedValues]todo:::
    public enum FiberYieldResponseType
    {
        AskQuestion,
        Log,
        GameOver,
        Break,
        VariableLookup
    }

    public class CardGameQuestion
    {
        public CardGameQuestion(UserModel user, string question, string[] answers, GameCardGame cardGame)
        {
            User = user;
            Question = question;
            Answers = answers;
            CardGame = cardGame;
        }

        [ScriptName("user")]
        [IntrinsicProperty]
        public UserModel User { get; set; }

        [ScriptName("question")]
        [IntrinsicProperty]
        public string Question { get; set; }

        [ScriptName("answers")]
        [IntrinsicProperty]
        public string[] Answers { get; set; }

        [ScriptName("cardGame")]
        [IntrinsicProperty]
        public GameCardGame CardGame { get; set; }
    }
}


using System;
using System.Runtime.CompilerServices;
using CommonShuffleLibrary;
using FibersLibrary;
using Models;
using NodeJSLibrary; 

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
                return cardGame.Answers[cardGame.AnswerIndex++].Value;//todo .value
            }
            var m = new CardGameQuestion(user,question,answers,cardGame) ;

            var answer = Fiber<CardGameAnswer>.Yield(new FiberYieldResponse("askQuestion",m));
            cardGame.AnswerIndex++;
            return answer == null ? 0 : answer.Value;


        }
        [ScriptName("declareWinner")]
        public static void DeclareWinner(UserModel user)
        {

            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse("gameOver"));
        }
        [ScriptName("log")]
        public static void Log(string msg)
        {


            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse("log", msg));
        }
        [ScriptName("break_")]
        public static void Break(int lineNumber, GameCardGame cardGame, Func<string,string> varLookup)
        {
            if (cardGame.Emulating)
            {
                return;
            }

            var yieldObject = new FiberYieldResponse("break", lineNumber - 1, "");
            while (true)
            {
                var answ = Fiber<FiberYieldResponse>.Yield(yieldObject);

                if (answ == null)
                {
                    //continue
                    return;
                }
                if (answ.VariableLookup!=null)
                {
                    yieldObject = new FiberYieldResponse("variableLookup", 0, varLookup(answ.VariableLookup));
                    continue;
                }
                break;
            }
        }
    }

    public class FiberYieldResponse
    {
        [ScriptName("variableLookup")]
        [IntrinsicProperty]
        public string VariableLookup { get; set; }

        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }

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


        public FiberYieldResponse(string type, CardGameQuestion question)//answerQuestion
        {
            Type = type;
            Question = question;
        }
        public FiberYieldResponse(string type, string contents)//log
        {
            Type = type;
            Contents = contents;
        }

        public FiberYieldResponse(string type)//gameOver
        {
            Type = type;
        }
        public FiberYieldResponse(string type, int lineNumber, string value)//break,variableLookup
        {
            Type = type;
            LineNumber = lineNumber;
            Value = value;
        }
    }

    public class CardGameQuestion
    {
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

        public CardGameQuestion(UserModel user, string question, string[] answers, GameCardGame cardGame)
        {
            User = user;
            Question = question;
            Answers = answers;
            CardGame = cardGame;
        }
    }
}
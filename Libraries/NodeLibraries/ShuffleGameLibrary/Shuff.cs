

using System;
using System.Runtime.CompilerServices;
using CommonShuffleLibraries;
using FibersLibrary;
using NodeJSLibrary; 

namespace global
{
    public class Card
    {
        public int Number { get; set; }
        public int Type { get; set; }

        public Card(int  number, int type)
        {
            this.Number = number;
            this.Type = type;
        }

        public string Name
        {
            [ScriptName("getName")]
            get { return this.Number + " " + this.Type; }
        }
    } 


    [ScriptName("shuff")]
    public static class Shuff
    {

        [ScriptName("askQuestion")]
        public static int AskQuestion(User user, string question, string[] answers, GameCardGame cardGame)
        {
            cardGame.Emulating = false;
            if (cardGame.Answers.Count - 1 > cardGame.AnswerIndex)
            {
                cardGame.Emulating = true;
                return cardGame.Answers[cardGame.AnswerIndex++].Value;//todo .value
            }
            var m = new { user = user, question = question, answers = answers, cardGame = cardGame };
            var answer = Fiber<CardGameAnswer>.Yield(new { type = "askQuestion", question = m });
            cardGame.AnswerIndex++;
            return answer == null ? 0 : answer.Value;


        }
        [ScriptName("declareWinner")]
        public static void DeclareWinner(User user)
        {

            Fiber<object>.Yield(new { type = "gameOver" });
        }
        [ScriptName("log")]
        public static void Log(string msg)
        {


            Fiber<object>.Yield(new { type = "log", contents = msg });
        }
        [ScriptName("break_")]
        public static void Break(int lineNumber, GameCardGame cardGame, Func<string,string> varLookup)
        {
            if (cardGame.Emulating)
            {
                return;
            }

            var yieldObject = new YieldObject()
                {
                    Type = "break",
                    LineNumber = lineNumber - 1,
                    Value = ""
                };
            while (true)
            {

                var answ = Fiber<dynamic>.Yield(yieldObject);

                if (answ == null)
                {
                    //continue
                    return;
                }
                if (answ.variableLookup)
                {
                    yieldObject.Type = "variableLookup";
                    yieldObject.Value = varLookup(answ.variableLookup);
                    yieldObject.LineNumber = 0;
                    continue;
                }
                break;
            }
        }
    }

    [Record]
    public sealed class YieldObject
    {
        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }
        [ScriptName("lineNumber")]
        [IntrinsicProperty]
        public int LineNumber { get; set; }
        [ScriptName("value")]
        [IntrinsicProperty]
        public string Value { get; set; }
    }
}
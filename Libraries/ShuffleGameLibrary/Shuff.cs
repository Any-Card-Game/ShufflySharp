using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using FibersLibrary;
using Models;
namespace global
{
    [ScriptName("shuff")]
    public static class Shuff
    {
        [ScriptName("askQuestion")]
        public static int AskQuestion(UserLogicModel user, string question, string[] answers, GameCardGame cardGame)
        {
            cardGame.Emulating = false;
            if (cardGame.Answers.Count - 1 > cardGame.AnswerIndex) {
                cardGame.Emulating = true;
                return cardGame.Answers[cardGame.AnswerIndex++].Value; //todo .value
            }
            var m = new CardGameQuestion(user, question, answers, cardGame);

            var answer = Fiber<CardGameAnswer>.Yield(new FiberYieldResponse(FiberYieldResponseType.AskQuestion, m));
            cardGame.AnswerIndex++;
            return answer == null ? 0 : answer.Value;
        }

        [ScriptName("declareWinner")]
        public static void DeclareWinner(UserLogicModel user)
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.GameOver));
        }
        [ScriptName("gameOver")]
        public static void GameOver()
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.GameOver));
        }
        [ScriptName("playersLeave")]
        public static void PlayersLeave(Action<List<UserLogicModel>> usersLeft)
        {

            var users= Fiber<List<UserLogicModel>>.Yield(new FiberYieldResponse(FiberYieldResponseType.PlayersLeft));

            if (users.Count > 0) {
                usersLeft(users);
            }
        
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
                return;

            var yieldObject = new FiberYieldResponse(FiberYieldResponseType.Break, lineNumber - 1, "");
            while (true) {
                var answ = Fiber<FiberYieldResponse>.Yield(yieldObject);

                if (answ == null) {
                    //continue
                    return;
                }
                if (answ.VariableLookup != null) {
                    yieldObject = new FiberYieldResponse(FiberYieldResponseType.VariableLookup, 0, varLookup(answ.VariableLookup));
                    continue;
                }
                break;
            }
        }
    }
    //[NamedValues]todo:::
}
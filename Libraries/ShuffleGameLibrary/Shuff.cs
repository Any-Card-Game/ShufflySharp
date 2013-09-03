using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models;
using NodeLibraries.Fibers;
namespace global
{
    [ScriptName("shuff")]
    public static class Shuff
    {
        public static int AskQuestion(UserLogicModel user, string question, string[] answers, GameCardGame cardGame)
        {
            cardGame.Emulating = false;
            if (cardGame.EmulatedAnswers.Count - 1 > cardGame.EmulatedAnswerIndex) {
                cardGame.Emulating = true;
                return cardGame.EmulatedAnswers[cardGame.EmulatedAnswerIndex++].Value; //todo .value
            }
            var m = new CardGameQuestion(user, question, answers, cardGame);

            var answer = Fiber<CardGameAnswer>.Yield(new FiberYieldResponse(FiberYieldResponseType.AskQuestion, m));
            cardGame.EmulatedAnswerIndex++;
            return answer == null ? 0 : answer.Value;
        }

        public static void DeclareWinner(UserLogicModel user)
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.GameOver));
        }
        public static void GameOver()
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.GameOver));
        }
        public static void PlayersLeave(Action<List<UserLogicModel>> usersLeft)
        {

            var users= Fiber<List<UserLogicModel>>.Yield(new FiberYieldResponse(FiberYieldResponseType.PlayersLeft));

            if (users.Count > 0) {
                usersLeft(users);
            }
        
        }

        public static void Log(string msg)
        {
            Fiber<FiberYieldResponse>.Yield(new FiberYieldResponse(FiberYieldResponseType.Log, msg));
        }

        [ScriptName("break_")]
        public static void Break(BreakInfoObject breakInfo, GameCardGame cardGame, Func<string, string> varLookup)
        {
         /*   if (cardGame.Emulating)
                return;*/

            if (cardGame!=null && cardGame.DebugInfo != null)
            {
                if (cardGame.DebugInfo.Breakpoints.Contains(breakInfo.Line) || cardGame.DebugInfo.StepThrough)
                {
                    if (cardGame.DebugInfo.LastBrokenLine == breakInfo.Line) return;
                    cardGame.DebugInfo.LastBrokenLine = breakInfo.Line;

                    var yieldObject = new FiberYieldResponse(FiberYieldResponseType.Break, breakInfo.Line, "");
                    while (true)
                    {
                        Console.WriteLine("breaking");
                        var answ = Fiber<FiberYieldResponse>.Yield(yieldObject);

                        if (answ == null)
                        {
                            //continue
                            return;
                        }
                        if (answ.VariableLookup != null)
                        {
                            yieldObject = new FiberYieldResponse(FiberYieldResponseType.VariableLookup, breakInfo.Line, Json.Stringify(varLookup(answ.VariableLookup)));
                            continue;
                        }
                        break;
                    }
                }
            }

        }
    }
    //[NamedValues]todo:::
}
[Serializable]
public class BreakInfoObject
{
    public int Line { get; set; }
    public int Col { get; set; }
    public int Funcdef { get; set; }
}
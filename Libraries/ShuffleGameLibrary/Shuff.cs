using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models;
using Models.DebugGameManagerModels;
using NodeLibraries.Fibers;
namespace global
{
    [ScriptName("shuff")]
    public static class Shuff
    {
        public static int AskQuestion(UserLogicModel user, string question, string[] answers, GameCardGame cardGame)
        {
            cardGame.Emulating = false;
            if (cardGame.EmulatedAnswers.Count - 1 > cardGame.EmulatedAnswerIndex)
            {
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

            var users = Fiber<List<UserLogicModel>>.Yield(new FiberYieldResponse(FiberYieldResponseType.PlayersLeft));

            if (users.Count > 0)
            {
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

            if (cardGame != null && cardGame.DebugInfo != null)
            {
                if (cardGame.DebugInfo.Breakpoints.Contains(breakInfo.Line) || (!!(dynamic)cardGame.DebugInfo.StepThrough && cardGame.DebugInfo.StepThrough != StepType.Continue))
                {
                    if (cardGame.DebugInfo.LastBrokenLine == breakInfo.Line) return;
                    cardGame.DebugInfo.LastBrokenLine = breakInfo.Line;

                    var wasLastBreakLast = cardGame.DebugInfo.LastWasEndOfFunction;
                    var wasLastIndexBreakLast = cardGame.DebugInfo.LastWasEndOfFunctionIndex;
                    cardGame.DebugInfo.LastWasEndOfFunction = breakInfo.IsLast;
                    if (cardGame.DebugInfo.LastWasEndOfFunction)
                    {
                        cardGame.DebugInfo.LastWasEndOfFunctionIndex = breakInfo.Funcdef;
                    }

                    //step out
                    // if step into/over 
                    //  if end of function is reached (determined at parse time) then
                    //    allow lastfunc to != funcdef
                    // if step out
                    //  wait until end of function, trigger next debug?

                    switch (cardGame.DebugInfo.StepThrough)
                    {
                        case StepType.Into:
                            if (cardGame.DebugInfo.LastFunction == breakInfo.Funcdef)
                            {
                                Console.WriteLine("step over happened " + cardGame.DebugInfo.LastFunction + " == " + breakInfo.Funcdef);
                            }
                            else if (cardGame.DebugInfo.LastFunction != breakInfo.Funcdef)
                            {
                                Console.WriteLine("step into happened " + cardGame.DebugInfo.LastFunction + " != " + breakInfo.Funcdef);
                            }
                            break;
                        case StepType.Out:
                            if (cardGame.DebugInfo.LastFunction != breakInfo.Funcdef)
                            {
                                Console.WriteLine("step over/out skipped " + cardGame.DebugInfo.LastFunction + " != " + breakInfo.Funcdef);
                                return;
                            }
                            Console.WriteLine("step over/out okay");
                            break;
                        case StepType.Over:
                            if (cardGame.DebugInfo.LastFunction != breakInfo.Funcdef)
                            {
                                Console.WriteLine("step over skipped " + cardGame.DebugInfo.LastFunction + " != " + breakInfo.Funcdef);

                                if (!wasLastBreakLast)
                                {
                                    Console.WriteLine("wasnt last line, gonna skip ");
                                    return;
                                }
                                if (wasLastIndexBreakLast != breakInfo.Funcdef)
                                {
                                    Console.WriteLine("wasnt idk line, gonna skip ");
                                    return;
                                }
                                Console.WriteLine("was last line, gonna continue");
                            }
                            Console.WriteLine("step over/out okay");
                            break;
                        case StepType.Lookup:
                            Console.WriteLine("Lookup");
                            break;
                        default:
                            Console.WriteLine("idk step " + cardGame.DebugInfo.StepThrough);
                            break;
                    }

                    cardGame.DebugInfo.LastFunction = breakInfo.Funcdef;

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
                            object lookup;
                            try
                            {
                                lookup = varLookup(answ.VariableLookup);
                            }
                            catch (Exception e)
                            {
                                lookup = e.Message;
                            }
                            yieldObject = new FiberYieldResponse(FiberYieldResponseType.VariableLookup, breakInfo.Line, Json.Stringify(lookup));
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
    public bool IsLast { get; set; }
    public int Line { get; set; }
    public int Col { get; set; }
    public int Funcdef { get; set; }
}
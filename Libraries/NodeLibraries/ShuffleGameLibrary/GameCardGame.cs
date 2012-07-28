using System;
using System.Collections.Generic; 
using System.Runtime.CompilerServices;
using CommonLibraries;

namespace ShufflyGameLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class GameCardGame
    {
        [ScriptName("emulating")]
        public bool Emulating;

        [ScriptName("answerIndex")]
        public int AnswerIndex;

        [ScriptName("spaces")]
        public List<GameCardGameSpace> Spaces;
        [ScriptName("textAreas")]
        public List<GameCardGameTextArea> TextAreas;


        [ScriptName("size")]
        public Size Size;

        public void SetAnswers(List<GameAnswer> answers)
        { 
        } 
        [IgnoreGenericArguments]
        public void SetPlayers<T>(List<T> players)
        {
        }
    }

    public class GameCardGameTextArea

    {
    }

    public class GameCardGameSpace
    {
    }
    

}

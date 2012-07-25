// Class1.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CommonLibraries;

namespace ShufflyGameLibrary
{
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

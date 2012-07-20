// Class1.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;

namespace ShufflyGame
{
    public class GameCardGame
    {
        [ScriptName("emulating")]
        public bool Emulating;

        [ScriptName("answerIndex")]
        public int AnswerIndex;

        public void SetAnswers(List<GameAnswer> answers)
        { 
        }

        public void SetPlayers<T>(List<T> players)
        { 
        }
    }
    public class GameAnswer
    {
        public int Value;
        public int LineNumber;
    }

}

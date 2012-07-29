using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibraries;

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
        public List<GameCardGameSpace> Spaces { get; set; }

        [IntrinsicProperty]
        [ScriptName("textAreas")]
        public List<GameCardGameTextArea> TextAreas { get; set; }


        [ScriptName("size")]
        [IntrinsicProperty]
        public Size Size { get; set; }

        [ScriptName("answers")]
        [IntrinsicProperty]
        public List<CardGameAnswer> Answers { get; set; }

        [ScriptName("setAnswers")]
        public void SetAnswers(List<GameAnswer> answers)
        { 
        } 
        [IgnoreGenericArguments]
        [ScriptName("setPlayers")]
        public void SetPlayers(List<User> players)
        {
        }

        public GameCardGame(string name)
        {
            Name = name;

        }

    }
    public class CardGameAnswer
    {
        [ScriptName("value")]
        [IntrinsicProperty]
        public int Value { get; set; }
    } 

    public class GameCardGameTextArea

    {
    }

    public class GameCardGameSpace
    {
    }
    

}

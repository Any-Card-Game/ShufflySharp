using System;
using System.Runtime.CompilerServices;
namespace Client.Scope
{
    public class QuestionScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public QuestionModel Model { get; set; } 
    }
    [Serializable]
    public class QuestionModel 
    {
        public Action WindowClosed { get; set; }
        public string Question { get; set; }
        public string[] Answers { get; set; }
        public string SelectedAnswer { get; set; }
        public Action AnswerQuestion { get; set; }
    }
}
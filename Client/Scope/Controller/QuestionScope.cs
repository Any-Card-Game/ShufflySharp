using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
namespace Client.Scope.Controller
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
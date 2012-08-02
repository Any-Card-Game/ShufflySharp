using System.Runtime.CompilerServices;

namespace GameServer
{
    public class FiberYieldResponse
    {
        public int Contents;
        public int LineNumber;
        public FiberYieldResponseType Type;
        public GameQuestionAnswerModel question;
    }
    [NamedValues]
    public enum FiberYieldResponseType
    {
        AskQuestion,
        Log,
        GameOver,
        Break
    }
}
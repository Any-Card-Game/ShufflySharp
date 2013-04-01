using System;
using global;
namespace ServerManager.GameServer.Models
{
    [Serializable]
    public class FiberYieldResponse
    {
        public int Contents { get; set; }
        public int LineNumber { get; set; }
        public FiberYieldResponseType Type { get; set; }
        public GameQuestionAnswerModel question { get; set; }
    }
}
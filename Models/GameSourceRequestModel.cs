using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class GameSourceRequestModel
    {
        public GameSourceRequestModel(string name)
        {
            GameName = name;
        }

        [IntrinsicProperty]
        public string GameName { get; set; }
    }
    public class GameSourceResponseModel
    {
        [IntrinsicProperty]
        public string Content { get; set; }

        public GameSourceResponseModel(string content)
        {
            Content = content;
        }
    }


    [Record]
    public sealed class JoinGameRequest
    {
        public JoinGameRequest(string roomId)
        {
            RoomID = roomId;
        }

        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
    [Record]
    public sealed class GatewayMessageModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }
        [IntrinsicProperty]
        public object Content { get; set; }
        [IntrinsicProperty]
        public string GameServer { get; set; }

        public GatewayMessageModel(string channel, object content, string gameServer)
        {
            Channel = channel;
            Content = content;
            GameServer = gameServer;
        }
    }

    [Record]
    public sealed class GameAnswerQuestionModel
    {
        public GameAnswerQuestionModel(string roomId, object answer)
        {
            RoomID = roomId;
            Answer = answer;
        }

        [IntrinsicProperty]
        public object Answer { get; set; }

        [IntrinsicProperty]
        public string RoomID { get; set; }

        public GameAnswerQuestionModel()
        {
         }

    }
}
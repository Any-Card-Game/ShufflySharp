using CommonLibraries;
using CommonShuffleLibrary;
using CommonWebLibraries;
using GameServer.Models;
using Models;
using Models.ShufflyManagerModels;
namespace GameServer
{

    public delegate void UserJoinGame(UserModel user, JoinGameRequestModel data);
    public delegate void DebuggerJoinGame(UserModel user, DebuggerJoinRequestModel data);
    public delegate void GameCreate(UserModel user, CreateGameRequestModel data);
    public delegate void StartGame(StartGameRequestModel data);
    public delegate void UserAnswerQuestion(UserModel user, GameAnswerQuestionModel data);
    public class ShufflyServerManager
    {
        private QueueManager qManager;

        public ShufflyServerManager(string gameServerIndex)
        {
            GameServerIndex = gameServerIndex;

            Setup();
        }

        private void Setup()
        {
            qManager = new QueueManager(GameServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("GameServer", null),
                                                                              new QueueWatcher(GameServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "GameServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));

            qManager.AddChannel("Area.Debug.Create", (user, data) => OnGameCreate(user, (CreateGameRequestModel) data));
            qManager.AddChannel("Area.Game.Join", (user, data) => OnUserJoinGame(user, (JoinGameRequestModel) data));
            qManager.AddChannel("Area.Game.DebuggerJoin", (user, data) => OnDebuggerJoinGame(user, (DebuggerJoinRequestModel) data));
            qManager.AddChannel("Area.Game.Start", (user, data) => OnStartGame((StartGameRequestModel) data));
            qManager.AddChannel("Area.Game.AnswerQuestion", (user, data) => OnUserAnswerQuestion(user, (GameAnswerQuestionModel) data));
        }

        public string GameServerIndex { get; set; }

        public UserJoinGame OnUserJoinGame { get; set; }
        public DebuggerJoinGame OnDebuggerJoinGame { get; set; }
        public GameCreate OnGameCreate { get; set; }
        public StartGame OnStartGame { get; set; }
        public UserAnswerQuestion OnUserAnswerQuestion { get; set; }
        


        
        private void SendMessageToAll(GameRoom room, string message, object val)
        {
            foreach (var player in room.Players)
            {
                qManager.SendMessage(player, player.Gateway, message, val);
            }
        }

        public void SendRoomInfo(GameRoom room)
        { 
            SendMessageToAll(room, "Area.Game.RoomInfo", room.CleanUp());//gay

        }

        public void SendGameStarted(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.Started", Json.Parse(Json.Stringify(room, Help.Sanitize)));

        }

        public void SendGameOver(GameRoom room)
        {

            SendMessageToAll(room, "Area.Game.GameOver", "a");
             
            if (room.DebuggingSender != null)
                qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.GameOver", new object());

        }

        public void SendUpdateState(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.UpdateState", new Compressor().CompressText(Json.Stringify(room.Game.CardGame.CleanUp())));

        }

        public void SendDebugLog(GameRoom room, GameAnswerModel ganswer)
        {
            qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.Log", ganswer); 
        }

        public void SendDebugBreak(GameRoom room, GameAnswerModel ganswer)
        { 
            qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.Break", ganswer);
        }

        public void SendAskQuestion(UserModel user, GameSendAnswerModel gameAnswer)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Game.AskQuestion", gameAnswer.CleanUp());
        }
    }
}
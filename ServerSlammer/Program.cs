using System;
using ClientLibs;
using ClientLibs.Managers;
using CommonLibraries;
using Models.GameManagerModels;
using Models.SiteManagerModels;
using NodeJSLibrary;
namespace ServerSlammer
{
    internal class Program
    {
        private int count = 0;
        private Http myHttp;
        private string userName;

        public Program()
        {
            Global.SetInterval(() => {
                                   //Console.Log("timer " + DateTime.Now);
                               },
                               2000);

            myHttp = Global.Require<Http>("http");
            runGame( );
        }

        private void runGame( )
        {
            var gameName = randomString(20);
            GrabIP((data) => { start(data, gameName, true); });
            for (int i = 0; i < 5; i++) {
                GrabIP((data) => { start(data, gameName, false); });
            }
        }

        public void GrabIP(Action<string> ip)
        {
            myHttp.Get("http://198.211.107.235:8844",
                       (r) => {
                           r.SetEncoding(Encoding.Utf8);
                           r.On<string>("data", ip);
                       });
        }

        private static void Main()
        {
            new Program();
        }

        private void start(string gatewayAddress, string gameName, bool create)
        {
            int myCount = count++;
            var gateway = new Gateway(gatewayAddress, true);
            ClientSiteManager clientManager = new ClientSiteManager(gateway);
            ClientGameManager gameManager = new ClientGameManager(gateway);
            ClientChatManager chatManager = new ClientChatManager(gateway);
            ClientDebugManager debugManager = new ClientDebugManager(gateway);
            clientManager.Login(userName = randomString(10), "");
            clientManager.OnLogin += (user, response) => {
                                         Console.Log("Success: " + response.Successful + "    " + user.UserName + myCount);
                                         if (create)
                                             clientManager.CreateRoom(new CreateRoomRequest("Sevens", gameName));
                                         else {
                                             Global.SetTimeout(() => { clientManager.JoinRoom(new RoomJoinRequest("Sevens", gameName)); },
                                                               3000);
                                         }
                                     };
            clientManager.OnGetRoomsReceived += (user, response) => {
                                                    /*     foreach (var room in response.Rooms) {
                    if (room.Players.Count < 6) {
                        clientManager.JoinRoom(new RoomJoinRequest("Sevens", room.RoomName));
                        return;
                    }
                }*/
                                                };

         
            clientManager.OnRoomJoined += (user, response) => {
                                              Console.Log("joined " + response.Room.Players.Count + " Players");
 
                                                  if (response.Room.Players.Count == 6)
                                                      clientManager.StartGame(new StartGameRequest());
                                              
                                          };
            clientManager.OnGetRoomInfoReceived += (user, response) => {
                                                       
                                                   };
            gameManager.OnGameStarted += (user, model) => { Console.Log("Game Started: " + model.RoomID + "  " + userName); };

            gameManager.OnGameOver += (user, model) => { 
                                          gateway.Close();
                if(create)
                                          runGame(); 
                                      };

            gameManager.OnAskQuestion += (user, model) => {
                                             Console.Log("Question Asked: "+user.UserName+"   Num Of Answers: "+model.Answers.Length);
                                             gameManager.AnswerQuestion(new GameAnswerQuestionModel(1));
                                         };
            gameManager.OnUpdateState += (user, s) => {
                                             //Console.Log("state updated ");
                                         };
        }

        private string randomString(int i)
        {
            string sb = "";
            for (int j = 0; j < i; j++) {
                sb += (string) (char) (int) ( Math.Random() * 26 + 65 );
            }
            return sb;
        }
    }
}
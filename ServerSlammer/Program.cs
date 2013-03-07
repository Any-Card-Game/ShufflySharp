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
        private string userName;

        public Program()
        {
            Global.SetInterval(() => {
                                   //Console.Log("timer " + DateTime.Now);
                               }, 2000);

            var http = Global.Require<Http>("http");
            http.Get("http://198.211.107.101:8844",
                     (r) => {
                         r.SetEncoding(Encoding.Utf8);
                         r.On<string>("data", (data) => {

                                                  var gameName=randomString(20);

                                                  start(data, gameName, true);
                                                  start(data, gameName, false);
                                                  start(data, gameName, false);
                                                  start(data, gameName, false);
                                                  start(data, gameName, false);
                                                  start(data, gameName, false);
                             
                         });
                     });
        }

        private static void Main()
        {
            new Program();
        }

        private void start(string gatewayAddress,string gameName,bool create)
        {
            var gateway = new Gateway(gatewayAddress, true);
            ClientSiteManager clientManager = new ClientSiteManager(gateway);
            ClientGameManager gameManager = new ClientGameManager(gateway);
            ClientChatManager chatManager = new ClientChatManager(gateway);
            ClientDebugManager debugManager = new ClientDebugManager(gateway);
            clientManager.Login(userName=randomString(10), "");
            clientManager.OnLogin += (user, response) => {
                Console.Log("Success: " + response.Successful + "    " + user.UserName);
                                         if (create)
                                         {
                                             clientManager.CreateRoom(new CreateRoomRequest("Sevens", gameName));
                                         }
                                         else
                                         {
                                             Global.SetTimeout(() =>
                                             {
                                                 clientManager.JoinRoom(new RoomJoinRequest("Sevens", gameName));

                                             },
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

   
            bool created = false;
            bool joined = false;
            clientManager.OnRoomJoined += (user, response) => {
                Console.Log("jj " + response.Room.Players.Count);
                if (!joined)
                {
                                                  Console.Log("joined " + response.Room.Players.Count);
                                                  joined = true;
                                                  if (response.Room.Players.Count == 6) {
                                                      clientManager.StartGame(new StartGameRequest());
                                                  }
                                              }
                                          };
            clientManager.OnGetRoomInfoReceived += (user, response) => {
                Console.Log("cc " + response.Room.Players.Count);
                
                                                       if (!created) {
                                                           Console.Log("ccccc " + response.Room.Players.Count);
                                                           clientManager.JoinRoom(new RoomJoinRequest("Sevens", response.Room.RoomName));

                                                           created = true;
                                                       }
                                                   };
            gameManager.OnGameStarted += (user, model) => {
                                             Console.Log("Game Started: " + model.RoomID+"  "+userName);
                                         };

            gameManager.OnGameOver += (user, model) => { 
                                                                created = false;
                                                                joined = false;
                                                                clientManager.CreateRoom(new CreateRoomRequest("Sevens", randomString(10)));
                                                          
                                      };

            gameManager.OnAskQuestion += (user, model) => {
                                             Console.Log(model.Answers.Join(", "));
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
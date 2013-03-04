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
        public Program()
        {
            Global.SetInterval(() =>
            {
                Console.Log("timer "+DateTime.Now);
            }, 2000);
            


            var http = Global.Require<Http>("http");
            http.Get("http://50.116.22.241:8844",
                     (r) => {
                         r.SetEncoding(Encoding.Utf8);
                         r.On<string>("data", (data) => { start(data); });
                     });
        }

        private static void Main()
        {
            new Program();
        }

        private void start(string gatewayAddress)
        {
            var gateway = new Gateway(gatewayAddress, true);
            ClientSiteManager clientManager = new ClientSiteManager(gateway);
            ClientGameManager gameManager = new ClientGameManager(gateway);
            ClientChatManager chatManager = new ClientChatManager(gateway);
            ClientDebugManager debugManager = new ClientDebugManager(gateway);
            clientManager.Login(randomString(10), "");
            clientManager.OnLogin += (user, response) => {
                                         Console.Log("Success: " + response.Successful);
                                         clientManager.GetRooms(new GetRoomsRequest("Sevens"));
                                     };
            clientManager.OnGetRoomsReceived += (user, response) => {
                                               /*     foreach (var room in response.Rooms) {
                                                        if (room.Players.Count < 6) {
                                                            clientManager.JoinRoom(new RoomJoinRequest("Sevens", room.RoomName));
                                                            return;
                                                        }
                                                    }*/
                                                };

            clientManager.CreateRoom(new CreateRoomRequest("Sevens", randomString(10)));

            bool created = false;
            bool joined = false;
            clientManager.OnRoomJoined += (user, response) =>
            {
                if (!joined)
                { 
                    joined = true;
                    clientManager.StartGame(new StartGameRequest());
                }

            };
            clientManager.OnGetRoomInfoReceived += (user, response) =>
            {
                if (!created) {
                    clientManager.JoinRoom(new RoomJoinRequest("Sevens", response.Room.RoomName));

                    created = true; 
                }
            };
            gameManager.OnGameStarted += (user, model) =>
            {
                Console.Log("Game Started: " + model.RoomID);
            };

            gameManager.OnGameOver += (user, model) =>
            {
                Global.SetTimeout(() =>
                {
                    created = false;
                    joined = false;
                    clientManager.CreateRoom(new CreateRoomRequest("Sevens", randomString(10)));
                },2000);                 
            };
            
            gameManager.OnAskQuestion += (user, model) =>
            {
                Console.Log(model.Question);
                                             Console.Log(model.Answers.Join(","));
                gameManager.AnswerQuestion(new GameAnswerQuestionModel(1));
                                         };
            gameManager.OnUpdateState += (user, s) => {
               // Console.Log("state updated "+s);
                
                                         };
        }

        private string randomString(int i)
        {
            string sb = "";
            for (int j = 0; j < i; j++) {
                sb += (string)(char)(int)(Math.Random() * 26+65);
            }
            return sb;
        }
    }
}
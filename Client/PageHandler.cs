using System;
using System.Html;
using CommonLibraries;
using CommonShuffleLibrary;
using CommonWebLibraries;
using GameServer;
using GameServer.Models;
using Models;
using Models.ShufflyManagerModels;
using global;
using jQueryApi;
namespace Client
{
    public class PageHandler
    {
        private readonly BuildSite buildSite;
        private DateTime endTime;
        private GameDrawer gameDrawer;
        public GameInfo gameStuff;
        public Gateway gateway;
        private int numOfTimes;
        private DateTime startTime;
        private int timeValue;

        public PageHandler(string gatewayServerAddress, BuildSite buildSite)
        {
            this.buildSite = buildSite;
            gameStuff = new GameInfo();

            gameDrawer = new GameDrawer();
            startTime = DateTime.Now;
            //            Window.SetTimeout(() => { buildSite.devArea.Data.beginGame(); }, 2000);
            gateway = new Gateway(gatewayServerAddress);

            gateway.On("Area.Main.Login.Response", (data) => { Window.Alert(Json.Stringify(data)); });
            gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
            gateway.On("Area.Lobby.ListRooms.Response", (data) => { Console.Log(data); });

            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++) {
                randomName += String.FromCharCode((char) ( 65 + ( Math.Random() * 26 ) ));
            }

            gateway.Login(randomName);

            gateway.On("Area.Debug.GetGameSource.Response",
                       delegate(object data_) {
                           var data = (GameSourceResponseModel)data_ ;

                           var endTime = new DateTime();
                           var time = endTime - startTime;
                           numOfTimes++;
                           timeValue += time;
                           buildSite.devArea.Data.lblHowFast.Text = ( "Time Taken: " + ( timeValue / numOfTimes ) );

                           buildSite.codeArea.Data.codeEditor.Information.editor.SetValue(data.Content);
                           buildSite.codeArea.Data.codeEditor.Information.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
                           buildSite.codeArea.Data.codeEditor.Information.editor.Refresh();
                       });

            Element dvGame;
            jQuery.Select("body").Append(dvGame = Document.CreateElement("div"));
            dvGame.ID = "dvGame";
            dvGame.Style.Left = "50%";
            dvGame.Style.Position = "absolute";
            dvGame.Style.Top = "0";
            dvGame.Style.Right = "0";
            dvGame.Style.Bottom = "0";

            Document.Body.AddEventListener("contextmenu",
                                           e => {
                                               //e.PreventDefault();
                                               //todo: Special right click menu;
                                           },
                                           false);

            //ie8
            /*   {
                   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;

                   var m = (Action<string, ElementEventHandler>)d2;
                   m("contextmenu", () =>
                       {
                        
                       }); 
               }*/
        }

        public void startGameServer()
        {
            gateway.On("Area.Game.RoomInfo",
                                 data => {
                                     var roomInfo = data.Cast<GameRoom>();
                                     gameStuff.RoomID = roomInfo.RoomID;
                                     buildSite.home.Data.loadRoomInfo(roomInfo);
                                     buildSite.devArea.Data.loadRoomInfo(roomInfo);
                                 });
            /*
                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
                            {
                                buildSite.home.Data.loadRoomInfos(data);

                            });
            */
            gateway.On ("Area.Debug.Log",
                                   data => {

                                       var gameAnswer = (GameAnswerModel)data;
                                       buildSite.home.Data.loadRoomInfos(gameAnswer);

                                       var lines = buildSite.codeArea.Data.console.Information.editor.GetValue().Split("\n");
                                       lines = (string[]) lines.Extract(lines.Length - 40, 40);

                                       buildSite.codeArea.Data.console.Information.editor.SetValue(lines.Join("\n") + "\n" + gameAnswer.Value);
                                       buildSite.codeArea.Data.console.Information.editor.SetCursor(buildSite.codeArea.Data.console.Information.editor.LineCount(), 0);
                                   });

            gateway.On ("Area.Debug.Break",
                                   data => {
                                       var gameAnswer = (GameAnswerModel)data;
                                       buildSite.home.Data.loadRoomInfos(gameAnswer);

                                       var cm = buildSite.codeArea.Data.codeEditor;

                                       cm.Information.editor.ClearMarker(gameAnswer.LineNumber);
                                       cm.Information.editor.SetMarker(gameAnswer.LineNumber, "<span style=\"color: #059\">●</span> %N%");
                                       cm.Information.editor.SetCursor(gameAnswer.LineNumber + 15, 0);
                                       cm.Information.editor.SetCursor(gameAnswer.LineNumber - 15, 0);
                                       cm.Information.editor.SetCursor(gameAnswer.LineNumber, 0);
                                   });

            /*
                        gateway.On("Area.Debug.VariableLookup.Response", data =>
                            {
                                Window.Alert(Json.Stringify(data));
                            });
            */
            gateway.On ("Area.Game.AskQuestion",
                                            data => {
                                                var gameSendAnswerModel = (GameSendAnswerModel)data;

                                                buildSite.questionArea.Data.load(gameSendAnswerModel);
                                                //alert(JSON.stringify(data));
                                                endTime = new DateTime();
                                                var time = endTime - startTime;
                                                buildSite.devArea.Data.lblHowFast.Text = ( "how long: " + time );
                                                Window.SetTimeout(() => {
                                                                      gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(gameStuff.RoomID, 1), buildSite.devArea.Data.gameServer);
                                                                      buildSite.questionArea.Visible = false;
                                                                      startTime = new DateTime();
                                                                  },
                                                                  200);
                                            });

            gateway.On ("Area.Game.UpdateState",
                               data2 => {
                                   var update = (string)data2;

                                   var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
                                   //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                                   gameDrawer.Draw(data);
                               });
            gateway.On ("Area.Game.Started",
                                 data => {
                                     var room = (GameRoom)data;

                                     //alert(JSON.stringify(data));
                                 });
            gateway.On ("Area.Game.GameOver", data => {
                var room = (string)data;

                                                     });
            gateway.On ("Area.Debug.GameOver", data => {
                var room = (string)data;

                                                      });
        }
    }
}
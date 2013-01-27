using System;
using System.Html;
using CommonLibraries;
using CommonWebLibraries;
using Models.GameManagerModels;
using global;
using jQueryApi;
namespace Client
{
    public class PageHandler
    {
        private readonly BuildSite buildSite;
        public ClientGameManager clientGameManager;
        public ClientDebugManager clientDebugManager;
        public ClientSiteManager clientSiteManager;
        private DateTime endTime;
        public GameDrawer gameDrawer;
        public GameInfo gameStuff;
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


            var gateway = new Gateway(gatewayServerAddress);
            clientGameManager = new ClientGameManager(gateway);
            clientSiteManager = new ClientSiteManager(gateway);
            clientDebugManager = new ClientDebugManager(gateway);

            clientSiteManager.OnLogin += (data) => { Window.Alert("GooooD!"); };

            /*gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
            gateway.On("Area.Lobby.ListRooms.Response", (data) => { Console.Log(data); });*/

            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++) {
                randomName += String.FromCharCode((char) ( 65 + ( Math.Random() * 26 ) ));
            }


            clientDebugManager.OnGetGameSource += gameSource =>
            {
                                                 var endTime = new DateTime();
                                                 var time = endTime - startTime;
                                                 numOfTimes++;
                                                 timeValue += time;
                                                 buildSite.devArea.Data.lblHowFast.Text = ( "Time Taken: " + ( timeValue / numOfTimes ) ); 
                                                 buildSite.codeArea.Data.codeEditor.Information.editor.SetValue(gameSource.Content);/*
                                                 buildSite.codeArea.Data.codeEditor.Information.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");*/
                                                 buildSite.codeArea.Data.codeEditor.Information.editor.Refresh();
                                             };

           

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
            clientGameManager.OnGetRoomInfo += roomInfo => {
                                               clientGameManager.GameServer = roomInfo.GameServer;

                                               gameStuff.RoomID = roomInfo.RoomID;
                                               buildSite.home.Data.loadRoomInfo(roomInfo);
                                               buildSite.devArea.Data.loadRoomInfo(roomInfo);
                                           };

            /*
                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
                            {
                                buildSite.home.Data.loadRoomInfos(data);

                            });
            */
            clientGameManager.OnGetDebugLog += gameAnswer => {
                                               buildSite.home.Data.loadRoomInfos(gameAnswer);

                                               var lines = buildSite.codeArea.Data.console.Information.editor.GetValue().Split("\n");
                                               lines = lines.Extract(lines.Length - 40, 40);

                                               buildSite.codeArea.Data.console.Information.editor.SetValue(lines.Join("\n") + "\n" + gameAnswer.Value);
                                               buildSite.codeArea.Data.console.Information.editor.SetCursor(buildSite.codeArea.Data.console.Information.editor.LineCount(), 0);
                                           };
            clientGameManager.OnGetDebugBreak += gameAnswer => {
                                                 buildSite.home.Data.loadRoomInfos(gameAnswer);

                                                 var cm = buildSite.codeArea.Data.codeEditor;

                                             /*    cm.Information.editor.ClearMarker(gameAnswer.LineNumber);
                                                 cm.Information.editor.SetMarker(gameAnswer.LineNumber, "<span style=\"color: #059\">●</span> %N%");
                                                 cm.Information.editor.SetCursor(gameAnswer.LineNumber + 15, 0);
                                                 cm.Information.editor.SetCursor(gameAnswer.LineNumber - 15, 0);
                                                 cm.Information.editor.SetCursor(gameAnswer.LineNumber, 0);*/
                                             };

            /*
                        gateway.On("Area.Debug.VariableLookup.Response", data =>
                            {
                                Window.Alert(Json.Stringify(data));
                            });
            */

            clientGameManager.OnAskQuestion += gameSendAnswerModel => {
                                               buildSite.questionArea.Data.Load(gameSendAnswerModel);
                                               //alert(JSON.stringify(data));
                                               endTime = new DateTime();
                                               var time = endTime - startTime;
                                               buildSite.devArea.Data.lblHowFast.Text = ( "how long: " + time );
                                               Window.SetTimeout(() => {
                                                                     clientGameManager.AnswerQuestion(new GameAnswerQuestionModel(gameStuff.RoomID, 1));

                                                                     buildSite.questionArea.Visible = false;
                                                                     startTime = new DateTime();
                                                                 },
                                                                 200);
                                           };

            clientGameManager.OnUpdateState += update => {
                                               var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
                                               //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                                               gameDrawer.Draw(data);
                                           };

            clientGameManager.OnGameStarted += room => {
                                               //alert(JSON.stringify(data));
                                           };

            clientGameManager.OnGameOver += room => {
                                            //alert(JSON.stringify(data));
                                        };

            clientGameManager.OnDebugGameOver += room => {
                //alert(JSON.stringify(data));
                                             };
        }
    }
}
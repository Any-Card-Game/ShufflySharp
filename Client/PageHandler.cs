using System;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Managers;
using Client.UIWindow;
using CommonLibraries;
using CommonWebLibraries;
using Models.GameManagerModels;
using global;
namespace Client
{
    [Serializable]
    public class TimeTracker
    {
        public int NumOfTimes { get; set; }
        public DateTime StartTime { get; set; }
        public int TimeValue { get; set; }
        public DateTime EndTime { get; set; }

        public TimeTracker()
        {
            StartTime = DateTime.Now;
        }
    }
    public class PageHandler
    {
        private readonly BuildSite buildSite;
        public GameDrawer gameDrawer;
        public GameInfo gameStuff;
        [IntrinsicProperty]
        public ClientGameManager ClientGameManager { get; set; }
        [IntrinsicProperty]
        public ClientDebugManager ClientDebugManager { get; set; }
        [IntrinsicProperty]
        public ClientSiteManager ClientSiteManager { get; set; }
        [IntrinsicProperty]
        public TimeTracker TimeTracker { get; set; }
        [IntrinsicProperty]
        public CodeEditorUI CodeEditorUI { get; set; }
        [IntrinsicProperty]
        public QuestionUI QuestionUI { get; set; }
        [IntrinsicProperty]
        public DebugUI DebugUI { get; set; }
        [IntrinsicProperty]
        public HomeUI HomeUI { get; set; }
        [IntrinsicProperty]
        public LoginUI LoginUI { get; set; }

        public PageHandler(string gatewayServerAddress, BuildSite buildSite)
        {
            this.buildSite = buildSite;
            gameStuff = new GameInfo();

            gameDrawer = new GameDrawer();
            TimeTracker = new TimeTracker();

            var gateway = new Gateway(gatewayServerAddress);
            ClientGameManager = new ClientGameManager(gateway);
            ClientSiteManager = new ClientSiteManager(gateway);
            ClientDebugManager = new ClientDebugManager(gateway);

            LoginUI = new LoginUI(buildSite.shuffUIManager, this);
            HomeUI = new HomeUI(buildSite.shuffUIManager, this);
            DebugUI = new DebugUI(buildSite.shuffUIManager, this);
            QuestionUI = new QuestionUI(buildSite.shuffUIManager, this);
            CodeEditorUI = new CodeEditorUI(buildSite.shuffUIManager, this);

            /*gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
            gateway.On("Area.Lobby.ListRooms.Response", (data) => { Console.Log(data); });*/

            //ie8
            /*   {
                   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;

                   var m = (Action<string, ElementEventHandler>)d2;
                   m("contextmenu", () =>
                       {
                        
                       }); 
               }*/
        }

        public void StartGameServer()
        {
            ClientGameManager.OnGetRoomInfo += roomInfo => {
                                                   ClientGameManager.GameServer = roomInfo.GameServer;
                                                   gameStuff.RoomID = roomInfo.RoomID;
                                                   HomeUI.loadRoomInfo(roomInfo);
                                                   DebugUI.loadRoomInfo(roomInfo);
                                               };

            /*
                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
                            {
                                buildSite.home.Data.loadRoomInfos(data);

                            });
            */
            ClientGameManager.OnGetDebugLog += gameAnswer => {
                                                   HomeUI.loadRoomInfos(gameAnswer);

                                                   var lines = CodeEditorUI.console.Information.editor.GetValue().Split("\n");
                                                   lines = lines.Extract(lines.Length - 40, 40);

                                                   CodeEditorUI.console.Information.editor.SetValue(lines.Join("\n") + "\n" + gameAnswer.Value);
                                                   CodeEditorUI.console.Information.editor.SetCursor(CodeEditorUI.console.Information.editor.LineCount(), 0);
                                               };
            ClientGameManager.OnGetDebugBreak += gameAnswer => {
                                                     HomeUI.loadRoomInfos(gameAnswer);

                                                     var cm = CodeEditorUI.codeEditor;

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

            ClientGameManager.OnAskQuestion += gameSendAnswerModel => {
                                                   QuestionUI.Load(gameSendAnswerModel);
                                                   //alert(JSON.stringify(data));
                                                   TimeTracker.EndTime = new DateTime();
                                                   var time = TimeTracker.EndTime - TimeTracker.StartTime;
                                                   DebugUI.lblHowFast.Text = ( "how long: " + time );
                                                   Window.SetTimeout(() => {
                                                                         ClientGameManager.AnswerQuestion(new GameAnswerQuestionModel(gameStuff.RoomID, 1));

                                                                         QuestionUI.UIWindow.Visible = false;
                                                                         TimeTracker.StartTime = new DateTime();
                                                                     },
                                                                     200);
                                               };

            ClientGameManager.OnUpdateState += update => {
                                                   var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
                                                   //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                                                   gameDrawer.Draw(data);
                                               };

            ClientGameManager.OnGameStarted += room => {
                                                   //alert(JSON.stringify(data));
                                               };

            ClientGameManager.OnGameOver += room => {
                                                //alert(JSON.stringify(data));
                                            };

            ClientGameManager.OnDebugGameOver += room => {
                                                     //alert(JSON.stringify(data));
                                                 };
        }
    }
}
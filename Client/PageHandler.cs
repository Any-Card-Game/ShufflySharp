using System;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Libs;
using Client.Managers;
using Client.ShufflyGame;
using Client.UIWindow;
using CommonLibraries;
using CommonWebLibraries;
using Models.GameManagerModels;
using ShuffUI;
using global;
namespace Client
{
    public class PageHandler
    {
        public readonly GameDrawer gameDrawer;
        private readonly ShuffUIManager shuffUIManager;
        private string RoomID;
        [IntrinsicProperty]
        public ClientGameManager ClientGameManager { get; set; }
        [IntrinsicProperty]
        public ClientDebugManager ClientDebugManager { get; set; }
        [IntrinsicProperty]
        public ClientSiteManager ClientSiteManager { get; set; }
        [IntrinsicProperty]
        public ClientChatManager ClientChatManager { get; set; }
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
        [IntrinsicProperty]
        public ClientInformation ClientInfo { get; set; }

        public PageHandler(string gatewayServerAddress)
        {
            shuffUIManager = new ShuffUIManager();

            gameDrawer = new GameDrawer();
            TimeTracker = new TimeTracker();

            var gateway = new Gateway(gatewayServerAddress);
            ClientGameManager = new ClientGameManager(gateway);
            ClientSiteManager = new ClientSiteManager(gateway);
            ClientDebugManager = new ClientDebugManager(gateway);
            ClientChatManager = new ClientChatManager(gateway);

            ClientInfo = new ClientInformation();

            LoginUI = new LoginUI(shuffUIManager, this);
            HomeUI = new HomeUI(shuffUIManager, this);
            DebugUI = new DebugUI(shuffUIManager, this);
            QuestionUI = new QuestionUI(shuffUIManager, this);
            CodeEditorUI = new CodeEditorUI(shuffUIManager, this);

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
            ClientGameManager.OnGetRoomInfo += (user, roomInfo) => {
                                                   RoomID = roomInfo.RoomID;
//                                                   HomeUI.loadRoomInfo(roomInfo);
                                                   DebugUI.loadRoomInfo(roomInfo);
                                               };

            /*
                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
                            {
                                buildSite.home.Data.loadRoomInfos(data);

                            });
            */
            ClientGameManager.OnGetDebugLog += (user, gameAnswer) => {
//                                                   HomeUI.loadRoomInfos(gameAnswer);

                                                   var lines = CodeEditorUI.console.Information.editor.GetValue().Split("\n");
                                                   lines = lines.Extract(lines.Length - 40, 40);

                                                   CodeEditorUI.console.Information.editor.SetValue(lines.Join("\n") + "\n" + gameAnswer.Value);
                                                   CodeEditorUI.console.Information.editor.SetCursor(CodeEditorUI.console.Information.editor.LineCount(), 0);
                                               };
            ClientGameManager.OnGetDebugBreak += (user, gameAnswer) => {
//                                                     HomeUI.loadRoomInfos(gameAnswer);

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

            ClientGameManager.OnAskQuestion += (user, gameSendAnswerModel) => {
                                                   QuestionUI.Load(gameSendAnswerModel);
                                                   //alert(JSON.stringify(data));
                                                   TimeTracker.EndTime = new DateTime();
                                                   var time = TimeTracker.EndTime - TimeTracker.StartTime;
                                                   DebugUI.lblHowFast.Text = ( "how long: " + time );
                                                   Window.SetTimeout(() => {
                                                                         ClientGameManager.AnswerQuestion(new GameAnswerQuestionModel(RoomID, 1));

                                                                         QuestionUI.UIWindow.Visible = false;
                                                                         TimeTracker.StartTime = new DateTime();
                                                                     },
                                                                     200);
                                               };

            ClientGameManager.OnUpdateState += (user, update) => {
                                                   var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
                                                   //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                                                   gameDrawer.Draw(data);
                                               };

            ClientGameManager.OnGameStarted += (user, room) => {
                                                   //alert(JSON.stringify(data));
                                               };

            ClientGameManager.OnGameOver += (user, room) => {
                                                //alert(JSON.stringify(data));
                                            };

            ClientGameManager.OnDebugGameOver += (user, room) => {
                                                     //alert(JSON.stringify(data));
                                                 };
        }
    }
}
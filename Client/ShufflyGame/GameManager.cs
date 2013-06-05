using System;
using ClientLibs.Managers;
using CommonLibraries;
using Models.SiteManagerModels;
using WebLibraries.Common;
using global;
namespace Client.ShufflyGame
{
    public class GameManager
    {
        public PageHandler PageHandler { get; set; }
        public ClientGameManager ClientGameManager;
        public GameManager(PageHandler pageHandler)
        {

            PageHandler = pageHandler;
            ClientGameManager = pageHandler.ClientGameManager; 
            Init( );

        }

        private void Init( )
        {
 

       /*     ClientGameManager.OnAskQuestion += (user, gameSendAnswerModel) => {
                                                   PageHandler.QuestionUI.Load(gameSendAnswerModel);
                                                   //alert(JSON.stringify(data));
                                                   PageHandler.TimeTracker.EndTime = new DateTime();
                                                   var time = PageHandler.TimeTracker.EndTime - PageHandler.TimeTracker.StartTime;
                                                 PageHandler.  DebugUI.lblHowFast.Text = ( "how long: " + time ); 
                                               };*/

            ClientGameManager.OnUpdateState += (user, update) => {
                                                   var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
                                                   //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                                                   PageHandler.gameDrawer.Draw(data);
                                               };

            ClientGameManager.OnGameStarted += (user, room) => {
                                                   //alert(JSON.stringify(data));
                                               };

            ClientGameManager.OnGameOver += (user, room) => {
                                                //alert(JSON.stringify(data));
                                            };

        }

 

 
        public void StartGame()
        {
            PageHandler.gameDrawer.Init();


            PageHandler.ClientSiteManager.StartGame(new StartGameRequest());  
        }


/* 
            /*
                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
                            {
                                buildSite.home.Data.loadRoomInfos(data);

                            });
            * /
           
            /*
                        gateway.On("Area.Debug.VariableLookup.Response", data =>
                            {
                                Window.Alert(Json.Stringify(data));
                            });
            * /
        ClientGameManager.OnGetDebugLog += (user, gameAnswer) => {
                                                   //                                                   HomeUI.loadRoomInfos(gameAnswer);

                                                   var lines = PageHandler.CodeEditorUI.console.Information.editor.GetValue().Split("\n");
                                                   lines = lines.Extract(lines.Length - 40, 40);

                                                   PageHandler.CodeEditorUI.console.Information.editor.SetValue(lines.Join("\n") + "\n" + gameAnswer.Value);
                                                   PageHandler.CodeEditorUI.console.Information.editor.SetCursor(PageHandler.CodeEditorUI.console.Information.editor.LineCount(), 0);
                                               };
            ClientGameManager.OnGetDebugBreak += (user, gameAnswer) => {
                                                     //                                                     HomeUI.loadRoomInfos(gameAnswer);

                                                     var cm = PageHandler.CodeEditorUI.codeEditor;

                                                     /*    cm.Information.editor.ClearMarker(gameAnswer.LineNumber);
            cm.Information.editor.SetMarker(gameAnswer.LineNumber, "<span style=\"color: #059\">●</span> %N%");
            cm.Information.editor.SetCursor(gameAnswer.LineNumber + 15, 0);
            cm.Information.editor.SetCursor(gameAnswer.LineNumber - 15, 0);
            cm.Information.editor.SetCursor(gameAnswer.LineNumber, 0);* /
                                                 };

            ClientGameManager.OnDebugGameOver += (user, room) =>
            {
                //alert(JSON.stringify(data));
            };*/
    }
}

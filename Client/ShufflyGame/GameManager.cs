using System;
using CardGameUI.Services;
using ClientLibs.Managers;
using CommonLibraries;
using Models.SiteManagerModels;
using WebLibraries.Common;
using global;
namespace Client.ShufflyGame
{
    public class GameManager
    {
        private readonly ClientGameManagerService myClientGameManagerService;
        private readonly UIManagerService myUIManagerService;
        public GameManager(ClientGameManagerService clientGameManagerService,UIManagerService uiManagerService)
        {
            myClientGameManagerService = clientGameManagerService;
            myUIManagerService = uiManagerService;
            Init( );

        }

        private void Init( )
        {


            /*     myClientGameManagerService.OnAskQuestion += (user, gameSendAnswerModel) => {
                                                        PageHandler.QuestionUI.Load(gameSendAnswerModel);
                                                        //alert(JSON.stringify(data));
                                                        PageHandler.TimeTracker.EndTime = new DateTime();
                                                        var time = PageHandler.TimeTracker.EndTime - PageHandler.TimeTracker.StartTime;
                                                      PageHandler.  DebugUI.lblHowFast.Text = ( "how long: " + time ); 
                                                    }; */

            myClientGameManagerService.OnUpdateState += (user, update) =>
            {
                                                   var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
                                                   //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                                                   myUIManagerService.gameDrawer.Draw(data);
                                               };

            myClientGameManagerService.OnGameStarted += (user, room) =>
            {
                                                   //alert(JSON.stringify(data));
                                               };

            myClientGameManagerService.OnGameOver += (user, room) =>
            {
                                                //alert(JSON.stringify(data));
                                            };

        }

 

 
        public void StartGame()
        {
            myUIManagerService.gameDrawer.Init();

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

using System;
using System.Runtime.CompilerServices;
using Models;
using Models.GameManagerModels;
using ShuffUI;
using jQueryApi;
namespace Client.UIWindow
{
    public class DebugUI
    {
        public string selectedGame = "Sevens";
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }
        [IntrinsicProperty]
        public ShuffTextbox txtNumOfPlayers { get; set; }
        [IntrinsicProperty]
        public Action<GameRoomModel> loadRoomInfo { get; set; }
        [IntrinsicProperty]
        public ShuffTextbox varText { get; set; }
        [IntrinsicProperty]
        public ShuffLabel lblAnother { get; set; }
        [IntrinsicProperty]
        public ShuffLabel lblHowFast { get; set; }
        [IntrinsicProperty]
        public string gameServer { get; set; }
        [IntrinsicProperty]
        public Action beginGame { get; set; }
        [IntrinsicProperty]
        public int Joined { get; set; }
        [IntrinsicProperty]
        public bool Created { get; set; }

        public DebugUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "Developer",
                                                                             X = 500, //jQuery.Select("body").GetInnerWidth() -
                                                                             Y = 100,
                                                                             Width = 420,
                                                                             Height = 450,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = false
                                                                     });

            beginGame = ( () => {
                              jQuery.Select("#dvGame").Empty();
                              // pageHandler.ClearCache();
                              pageHandler.gameDrawer.ClearCache();

                              jQuery.Select("#dvGame").Width("100%");
                              jQuery.Select("#dvGame").Height("100%");

                              //clearLevel();
                              Created = false;
                              Joined = 0;
                              pageHandler.StartGameServer();

                              pageHandler.ClientGameManager.CreateDebuggedGame(new DebugCreateGameRequestModel("main room", selectedGame, /*codeArea.Data.codeEditor.Information.editor.GetValue(), codeArea.Data.breakPoints*/null, null));
                          } );

            UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Begin Game", (e) => beginGame()));

            ShuffButton but = null;
            UIWindow.AddElement(but = new ShuffButton(280,
                                                      84,
                                                      150,
                                                      25,
                                                      new Func<string>(() => "Game: " + selectedGame),
                                                      (e) => {
                                                          if (selectedGame == "Sevens") selectedGame = "BlackJack";
                                                          else selectedGame = "Sevens";

                                                          pageHandler.ClientDebugManager.RequestGameSource(new GameSourceRequestModel(selectedGame));

                                                          string m = but.Text;
                                                      }
                                              ));

            lblHowFast = UIWindow.AddElement(new ShuffLabel(280 - 200, 80, "Time Taken:"));
            lblAnother = UIWindow.AddElement(new ShuffLabel(280 - 200, 100, "Another: "));

            /* devArea.AddButton(new ShuffButton()
             {
                 X = 280,
                 Y = 94,
                 Width = "150",
                 Height = "25",
                 Text = "Continue",
                 Click = (evt) =>
                 {
                     pageHandler.gateway.Emit("Area.Debug.Continue", new { }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                 }
             });*/

            ShuffListBox pop;
            var propBox = UIWindow.AddElement(pop = new ShuffListBox(25, 200, 250, 250) {
                                                                                                ItemCreation = (item, index) => {
                                                                                                                   var ik = jQuery.Select(string.Format("<div style='width=100%;height=25px; background-color={0};'></div>", ( index % 2 == 0 ? "red" : "green" )));
                                                                                                                   var ikc = jQuery.Select(string.Format("<div style='width=50%;height=25px; float=left;'>{0}</div>", item.Label));
                                                                                                                   ik.Append(ikc);
                                                                                                                   var ikd = jQuery.Select(string.Format("<input type='text' style='width=48%;height=25px' value='{0}' />", item.Value));
                                                                                                                   ik.Append(ikd);
                                                                                                                   return ik;
                                                                                                               }
                                                                                        });

            pop.AddItem(new ShuffListItem("foos", 99));

            varText = UIWindow.AddElement(new ShuffTextbox(150, 134, 100, 25, "Var Lookup"));
            /*  devArea.AddButton(new ShuffButton()
              {
                  X = 280,
                  Y = 134,
                  Width = "150",
                  Height = "25",
                  Text = "Lookup",
                  Click = (evt) =>
                  {
                      pageHandler.gateway.Emit("Area.Debug.VariableLookup.Request", new { variableName = devArea.Data.varText.GetValue() }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                  }
              });*/

            /*   devArea.AddButton(new ShuffButton()
               {
                   X = 280,
                   Y = 164,
                   Width = "150",
                   Height = "25",
                   Text = "Push New Source",
                   Click = (evt) =>
                   {
                       pageHandler.gateway.Emit("Area.Debug.PushNewSource", new { source = codeArea.Data.codeEditor.editor.GetValue(), breakPoints = codeArea.Data.breakPoints },
                           devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                   }
               });*/

            loadRoomInfo = ( (room) => {
                                 gameServer = room.GameServer;
                                 lblAnother.Text = ( room.GameServer );

                                 var count = int.Parse(txtNumOfPlayers.Text);
                                 if (!Created) {
                                     pageHandler.ClientGameManager.JoinDebugger(new DebuggerJoinRequestModel(room.RoomID));

                                     for (var i = 0; i < count; i++) {
                                         pageHandler.ClientGameManager.JoinPlayer(new JoinGameRequestModel(room.RoomID, new UserModel {UserName = "player " + ( i + 1 )}));
                                     }
                                     Created = true;
                                 } else {
                                     if (( ++Joined ) == count)
                                         pageHandler.ClientGameManager.StartGame(new StartGameRequestModel(room.RoomID));
                                 }
                             } );

            txtNumOfPlayers = UIWindow.AddElement(new ShuffTextbox(130, 43, 130, 20, "6", "Number of players=", "font-size:13px"));
        }
    }
}
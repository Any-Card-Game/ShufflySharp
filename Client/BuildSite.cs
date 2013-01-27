using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Client;
using Client.Information;
using Client.ShuffUI;
using CommonWebLibraries;
using Models;
using Models.GameManagerModels;
using jQueryApi;
namespace Client
{
    public class BuildSite
    {
        public ShuffWindow<CodeAreaInformation> codeArea;
        public ShuffWindow<DevAreaInformation> devArea;
        private string gatewayServerAddress;
        public ShuffWindow<HomeAreaInformation> home;
        public ShuffWindow<QuestionAreaInformation> questionArea;
        public string selectedGame = "Sevens";
        private ShuffUIManager shuffUIManager;
        [IntrinsicProperty]
        public static BuildSite Instance { get; set; }

        public BuildSite(string gatewayServerAddress)
        {
            Instance = this;
            this.gatewayServerAddress = gatewayServerAddress;
            var url = "http://50.116.22.241:8881/";
            Globals.Window.topLevel = url;

            loadJunk(url, ready);
        }

        private static void loadJunk(string url, Action ready)
        {
            ScriptLoader scriptLoader = new ScriptLoader();

            ScriptLoader.LoadCss(url + "lib/jquery-ui-1.8.20.custom.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/lib/codemirror.css");
            ScriptLoader.LoadCss(url + "lib/site.css");
            ScriptLoader.LoadCss(url + "lib/codemirror/theme/night.css");
            ScriptLoader.LoadCss(url + "lib/jqwidgets/styles/jqx.base.css");

            scriptLoader.LoadSync(new[] {
                                                url + "lib/jquery-1.7.2.min.js",
                                                url + "lib/jquery-ui-1.8.20.custom.min.js",
                                                url + "lib/jqwidgets/scripts/gettheme.js",
                                                url + "lib/jqwidgets/jqxcore.js"
                                        },
                                  () => scriptLoader.Load(new[] {
                                                                        url + "lib/jqwidgets/jqxbuttons.js",
                                                                        url + "lib/jqwidgets/jqxscrollbar.js",
                                                                        url + "lib/linq.js",
                                                                        url + "lib/tween.js",
                                                                        url + "lib/socket.io.js",
                                                                        url + "lib/codemirror/lib/codemirror.js",
                                                                        url + "lib/jqwidgets/jqxlistbox.js"
                                                                },
                                                          false,
                                                          () => scriptLoader.Load(new[] {
                                                                                                url + "lib/codemirror/mode/javascript/javascript.js",
                                                                                                url + "lib/WorkerConsole.js",
                                                                                                url + "lib/FunctionWorker.js",
                                                                                                url + "lib/Stats.js",
                                                                                                url + "lib/keyboardjs.js",
                                                                                                url + "lib/Dialog.js",
                                                                                        },
                                                                                  false,
                                                                                  () => scriptLoader.Load(new[] {
                                                                                                                        url + "CommonLibraries.js",
                                                                                                                        //url + "SalterelleTest.js",
                                                                                                                        url + "ShuffleGameLibrary.js",
                                                                                                                        url + "Models.js",

                                                                                                                        //url + "uis/genericArea.js", 
                                                                                                                },
                                                                                                          true,
                                                                                                          () => scriptLoader.Load(new[] {
                                                                                                                                                url + "lib/RawDeflate.js",
                                                                                                                                        },
                                                                                                                                  true,
                                                                                                                                  ready)))));
        }

        private void ready()
        {
            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);
            Window.SetTimeout(() => {
                                  jQuery.Select(".xstats").CSS("right", "0px");
                                  jQuery.Select(".xstats").CSS("position", "absolute");

                                  jQuery.Select(".xstats").CSS("z-index", "9998!important");
                                  jQuery.Select(".xstats").Children().CSS("z-index", "9998!important");
                              },
                              1000);


            Element dvGame;
            jQuery.Select("body").Append(dvGame = Document.CreateElement("div"));
            dvGame.ID = "dvGame";
            dvGame.Style.Left = "0%";
            dvGame.Style.Position = "absolute";
            dvGame.Style.Top = "0";
            dvGame.Style.Right = "0";
            dvGame.Style.Bottom = "0";
            dvGame.Style["-webkit-transform"] = "scale(1.2)";
            Document.Body.Style["overflow"] = "hidden";

            Document.Body.AddEventListener("contextmenu",
                                           e =>
                                           {
                                               //e.PreventDefault();
                                               //todo: Special right click menu;
                                           },
                                           false);


            var pageHandler = new PageHandler(gatewayServerAddress, this);
             
            shuffUIManager = new ShuffUIManager();

            new LoginUI(shuffUIManager, pageHandler);

            home = shuffUIManager.CreateWindow(new ShuffWindow<HomeAreaInformation>(new HomeAreaInformation()) {
                                                                                                                       Title = "CardGame",
                                                                                                                       X = jQuery.Select("body").GetInnerWidth() - 500,
                                                                                                                       Y = 100,
                                                                                                                       Width = 420,
                                                                                                                       Height = 450,
                                                                                                                       AllowClose = true,
                                                                                                                       AllowMinimize = true,
                                                                                                                       Visible = true
                                                                                                               });

            home.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.clientSiteManager.GetGameList(); }));

            /*home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 84,
                Width = "150",
                Height = "25",
                Text = "Create Game",
                Click = (e) =>
                {

                    pageHandler.gateway.Emit("Area.Game.Create", new { user = new { userName = home.Data.txtUserName[0].NodeValue } }, devArea.Data.gameServer); //NO EMIT'ING OUTSIDE OF PageHandler


                }
            });*/

            home.Data.btnStartGame = home.AddElement(new ShuffButton(280, 164, 120, 25, "Start Game", (e) => { pageHandler.clientGameManager.StartGame(new StartGameRequestModel(pageHandler.gameStuff.RoomID)); }));

            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++) {
                randomName += String.FromCharCode((char) ( 65 + ( Math.Random() * 26 ) ));
            }

            home.Data.txtUserName = home.AddElement(new ShuffTextbox(130, 43, 130, 20, randomName, "Username="));

            /*home.Data.gameList = home.AddListBox(new ShuffListBox()
            {
                X = 30,
                Y = 85,
                Width = "215",
                Height = "150".ToString(),
                Label = "Rooms",
                Click = (e) =>
                {
                    pageHandler.gateway.Emit("Area.Game.Join", new { roomID = "foo", user = new { userName = home.Data.txtUserName.GetValue() } }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                }
            });*/

            /*
            home.Data.userList = home.AddElement(new ShuffListBox(new ShuffListBoxOptions() {
                    X = 30,
                    Y = 280,
                    Width = 215,
                    Height = 25 * 5,
                    Label = "Users"
                }));
*/

            home.Data.loadRoomInfo = (room) => {
                                         /*

home.Data.userList.Remove();
home.Data.btnStartGame.CSS("display","block");

var users = new List<string>();

for (var i = 0; i < room.players.length; i++) {

users.Add(room.players[i]);

}


home.Data.userList = home.AddListBox(new ShuffListBox(){
X= 30,
Y= 280,
Width= "215",
Height = "125",
Label= "Users",
Items= users
});*/
                                     };

            home.Data.loadRoomInfos = (room) => {
                                          /*   home.Data.gameList.Remove();

                             var rooms = new List<string>();

for (var i = 0; i < room.length; i++) {
//rooms.Add({ label= room[i].name, value= room[i].roomID });
}


home.Data.gameList = home.AddListBox(new ShuffListBox(){
X= 30,
Y= 85,
Width = "215",
Height = "150",
Label= "Rooms",
Items= rooms,
Click=  (item)=> {
 pageHandler.gateway.Emit("Area.Game.Join", new { roomID= item.value, user=new  { userName= home.Data.txtUserName.GetValue()} }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
}
});*/
                                      };

            devArea = shuffUIManager.CreateWindow(new ShuffWindow<DevAreaInformation>(new DevAreaInformation()) {
                                                                                                                        Title = "Developer",
                                                                                                                        X = 500, //jQuery.Select("body").GetInnerWidth() -
                                                                                                                        Y = 100,
                                                                                                                        Width = 420,
                                                                                                                        Height = 450,
                                                                                                                        AllowClose = true,
                                                                                                                        AllowMinimize = true
                                                                                                                });

            devArea.Data.beginGame = ( () => {
                                           jQuery.Select("#dvGame").Empty();
                                           // pageHandler.ClearCache();
                                        pageHandler.   gameDrawer.ClearCache();


                                           jQuery.Select("#dvGame").Width("100%");
                                           jQuery.Select("#dvGame").Height("100%");

                                           //clearLevel();
                                           devArea.Data.Created = false;
                                           devArea.Data.Joined = 0;
                                           pageHandler.startGameServer();

                                           pageHandler.clientGameManager.CreateDebuggedGame(new DebugCreateGameRequestModel("main room", selectedGame, codeArea.Data.codeEditor.Information.editor.GetValue(), codeArea.Data.breakPoints));
                                       } );

            devArea.AddElement(new ShuffButton(280, 54, 150, 25, "Begin Game", (e) => devArea.Data.beginGame()));

            ShuffButton but = null;
            devArea.AddElement(but = new ShuffButton(280,84,150,25,new Func<string>(() => "Game: " + selectedGame),
                                                     (e) => {
                                                         if (selectedGame == "Sevens") selectedGame = "BlackJack";
                                                         else selectedGame = "Sevens";

                                                         pageHandler.clientDebugManager.RequestGameSource(new GameSourceRequestModel(selectedGame));

                                                         string m = but.Text;
                                                     }
                                             ));

            devArea.Data.lblHowFast = devArea.AddElement(new ShuffLabel(280 - 200, 80, "Time Taken:"));
            devArea.Data.lblAnother = devArea.AddElement(new ShuffLabel(280 - 200, 100, "Another: "));

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
            var propBox = devArea.AddElement(pop = new ShuffListBox(25, 200, 250, 250) {
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

            devArea.Data.varText = devArea.AddElement(new ShuffTextbox(150, 134, 100, 25, "Var Lookup"));
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

            devArea.Data.loadRoomInfo = ( (room) => {
                                              devArea.Data.gameServer = room.GameServer;
                                              devArea.Data.lblAnother.Text = ( room.GameServer );

                                              var count = int.Parse(devArea.Data.txtNumOfPlayers.Text);
                                              if (!devArea.Data.Created) {
                                                  pageHandler.clientGameManager.JoinDebugger(new DebuggerJoinRequestModel(room.RoomID));

                                                  for (var i = 0; i < count; i++) {
                                                      pageHandler.clientGameManager.JoinPlayer(new JoinGameRequestModel(room.RoomID, new UserModel {UserName = "player " + ( i + 1 )}));
                                                  }
                                                  devArea.Data.Created = true;
                                              } else {
                                                  if (( ++devArea.Data.Joined ) == count)
                                                      pageHandler.clientGameManager.StartGame(new StartGameRequestModel(room.RoomID));
                                              }
                                          } );

            devArea.Data.txtNumOfPlayers = devArea.AddElement(new ShuffTextbox(130, 43, 130, 20, "6", "Number of players=", "font-size=13px"));

            codeArea = shuffUIManager.CreateWindow(new ShuffWindow<CodeAreaInformation>(new CodeAreaInformation()) {
                                                                                                                           Title = "Code",
                                                                                                                           X = 0,
                                                                                                                           Y = 0,
                                                                                                                           StaticPositioning = false,
                                                                                                                           Width = jQuery.Window.GetWidth() * .50,
                                                                                                                           Height = jQuery.Window.GetHeight() * .90,
                                                                                                                           AllowClose = true,
                                                                                                                           AllowMinimize = true,
                                                                                                                           Visible = false
                                                                                                                   });

            codeArea.Data.breakPoints = new List<int>();

            codeArea.Data.codeEditor = codeArea.AddElement(new ShuffCodeEditor(0, 0, "100%", "80%", ""){Dock=DockStyle.FillWidth});

            codeArea.Data.console = codeArea.AddElement(new ShuffCodeEditor(0, 0, "100%", "20%", "") { LineNumbers = false, Dock = DockStyle.FillWidth });

            questionArea = shuffUIManager.CreateWindow(new ShuffWindow<QuestionAreaInformation>(new QuestionAreaInformation()) {
                                                                                                                                       Title = "Question",
                                                                                                                                       X = 600,
                                                                                                                                       Y = 100,
                                                                                                                                       Width = 300,
                                                                                                                                       Height = 275,
                                                                                                                                       AllowClose = true,
                                                                                                                                       AllowMinimize = true,
                                                                                                                                       Visible = true
                                                                                                                               });

            questionArea.Data.Question = questionArea.AddElement(new ShuffLabel(20, 70, ""));

            questionArea.Data.Load = (question) => {
                                         questionArea.Visible = true;
                                         questionArea.Data.Question.Text = ( question.Question );
                                         questionArea.Data.AnswerBox.Parent.RemoveElement(questionArea.Data.AnswerBox);

                                         var answers = new List<ShuffListItem>();
                                         for (var i = 0; i < question.Answers.Length; i++) {
                                             answers.Add(new ShuffListItem(question.Answers[i], i));
                                         }

                                         questionArea.Data.AnswerBox = questionArea.AddElement(new ShuffListBox(30, 65, 215, 25 * 5) {
                                                                                                                                             Items = answers,
                                                                                                                                             /*OnClick = (e) =>
{
pageHandler.gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(pageHandler.gameStuff.RoomID, e.Item.Value), devArea.Data.gameServer);
questionArea.Visible = false;
}*/
                                                                                                                                     });
                                     };

            questionArea.Data.AnswerBox = questionArea.AddElement(new ShuffListBox(30, 65, 215, 25 * 5) {
                                                                                                                /*OnClick = (e) =>
                                              {
                                                  pageHandler.gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(pageHandler.gameStuff.RoomID, e.Item.Value), devArea.Data.gameServer);
                                                  questionArea.Visible = false;
                                              }*/
                                                                                                        });
            shuffUIManager.Focus(devArea.Information);

            /*




        var chatArea = shuffUIManager.createWindow({
            title: "Chat",
            x: 600,
            y: 100,
            width: 300,
            height: 275,
            allowClose: true,
            allowMinimize: true,
            visible: false

        });
             */
        }
    }
}
public class LoginUI
{
    public LoginUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
    {
        var loginScreen = shuffUIManager.CreateWindow(new ShuffWindow<object>() {
                                                                                        Title = "Login",
                                                                                        X = jQuery.Select("body").GetInnerWidth() - 500,
                                                                                        Y = 100,
                                                                                        Width = 250,
                                                                                        Height = 165,
                                                                                        AllowClose = true,
                                                                                        AllowMinimize = true,
                                                                                        Visible = true
                                                                                });

        ShuffTextbox loginName;
        ShuffTextbox password;
        loginScreen.AddElement(loginName = new ShuffTextbox(140, 40, 150, 30, "", "Username"));
        loginScreen.AddElement(password = new ShuffTextbox(140, 75, 150, 30, "", "Password"));

        loginScreen.AddElement(new ShuffButton(40,
                                               150,
                                               250,
                                               30,
                                               "Login",
                                               (e) => {
                                                   pageHandler.clientSiteManager.Login(loginName.Text,password.Text);
                                               }));
    }
}
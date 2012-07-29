using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Information;
using Client.ShuffUI;
using CommonLibraries;
using CommonWebLibraries;
using GameServer;
using Models;
using jQueryApi;

namespace Client
{
    public class BuildSite
    {
        private readonly string gatewayServerAddress;
        private ScriptLoader scriptLoader = new ScriptLoader();

        public ShuffWindow<HomeAreaInformation> home;
        public ShuffWindow<DevAreaInformation> devArea;
        public ShuffWindow<QuestionAreaInformation> questionArea;
        public ShuffWindow<CodeAreaInformation> codeArea;
        private ShuffUIManager shuffUIManager;


        [IntrinsicProperty]
        public static BuildSite Instance { get; set; }
        public BuildSite(string gatewayServerAddress)
        {
            Instance = this;
            this.gatewayServerAddress = gatewayServerAddress;
            var url = "http://50.116.22.241:8881/";
            Globals.Window.topLevel = url;

            loadCss(url + "lib/jquery-ui-1.8.20.custom.css");
            loadCss(url + "lib/codemirror/codemirror.css");
            loadCss(url + "lib/site.css");
            loadCss(url + "lib/codemirror/theme/night.css");
            loadCss(url + "lib/jqwidgets/styles/jqx.base.css");


            scriptLoader.LoadSync(new[]{url + "lib/jquery-1.7.2.min.js",
                url + "lib/jquery-ui-1.8.20.custom.min.js",
                url + "lib/jqwidgets/scripts/gettheme.js",
                url + "lib/jqwidgets/jqxcore.js"}, () => scriptLoader.Load(new[]{
                    url + "lib/jqwidgets/jqxbuttons.js",
                    url + "lib/jqwidgets/jqxscrollbar.js",
                    url + "lib/linq.js",
                    url + "lib/tween.js",
                    url + "lib/socket.io.js",
                    url + "lib/codemirror/codemirror.js",
                    url + "lib/jqwidgets/jqxlistbox.js"}, () => scriptLoader.Load(new[] {
                        //url + "ClientHelp.js",
                        //url + "common/Help.js",
                        url + "lib/codemirror/mode/javascript/javascript.js",
                        url + "lib/WorkerConsole.js",
                        //url + "Gateway.js",
                        url + "lib/FunctionWorker.js",
                        url + "lib/Stats.js",
                        url + "lib/keyboardjs.js",
                        url + "CommonLibraries.js",
                        url + "ShuffleGameLibrary.js",
                        url + "Models.js",
                        //url + "UIManager.js",
                        //url + "UIArea.js",
                        //url + "PageHandler.js",
                        //url + "uis/genericArea.js",
                        //url + "ShuffUIManager.js",
                        url + "lib/Dialog.js",
                    }, ready)));

        }


        private void ready()
        {

            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);



            var pageHandler = new PageHandler(gatewayServerAddress, this);


            var shuffUIManager = new ShuffUIManager();
            this.shuffUIManager = shuffUIManager;


            home = shuffUIManager.CreateWindow(new ShuffWindow<HomeAreaInformation>(new HomeAreaInformation())
                        {
                            Title = "CardGame",
                            X = jQuery.Select("body").GetInnerWidth() - 500,
                            Y = 100,
                            Width = "420",
                            Height = "450",
                            AllowClose = true,
                            AllowMinimize = true,
                            Visible = false
                        });

            home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 54,
                Width = "150",
                Height = "25",
                Text = "Update Game List",
                Click = (e) =>
                {
                    pageHandler.gateway.Emit("Area.Game.GetGames", devArea.Data.gameServer); //NO EMIT'ING OUTSIDE OF PageHandler

                }
            });

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

            home.Data.btnStartGame = home.AddButton(new ShuffButton()
                {
                    X = 280,
                    Y = 164,
                    Width = "120",
                    Height = "25",
                    Text = "Start Game",
                    Click = (e) =>
                        {
                            pageHandler.gateway.Emit("Area.Game.Start", new StartGameRequestModel(pageHandler.gameStuff.RoomID), devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                        }

                });


            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++)
            {
                randomName += String.FromCharCode((char)(65 + (Math.Random() * 26)));
            }


            home.Data.txtUserName = home.AddTextbox(new ShuffTextBox()
            {
                X = 130,
                Y = 43,
                Width = "130",
                Height = "20",
                Text = randomName,
                Label = "Username="
            });

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
            home.Data.userList = home.AddListBox(new ShuffListBox()
            {
                X = 30,
                Y = 280,
                Width = "215",
                Height = "125",
                Label = "Users"
            });



            home.Data.loadRoomInfo = (room) =>
            {
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

            home.Data.loadRoomInfos = (room) =>
            {
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


            devArea = shuffUIManager.CreateWindow(new ShuffWindow<DevAreaInformation>(new DevAreaInformation())
               {
                   Title = "Developer",
                   X = jQuery.Select("body").GetInnerWidth() - 500,
                   Y = 100,
                   Width = "420",
                   Height = "450",
                   AllowClose = true,
                   AllowMinimize = true
               });



            devArea.Data.beginGame = (() =>
                {
                    devArea.Data.Created = false;
                    devArea.Data.Joined = 0;
                    pageHandler.startGameServer();
                    pageHandler.gateway.Emit("Area.Debug.Create", new
                        {
                            user = new UserModel() { UserName = devArea.Data.txtNumOfPlayers.GetValue() },
                            Name = "main room",
                            Source = codeArea.Data.codeEditor.editor.GetValue(),
                            BreakPoints = codeArea.Data.breakPoints
                        });
                });

            devArea.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 54,
                Width = "150",
                Height = "25",
                Text = "Begin Game",
                Click = (e) => devArea.Data.beginGame()
            });

            devArea.Data.lblHowFast = devArea.AddLabel(new ShuffLabel()
            {
                X = 280 - 200,
                Y = 80,
                Width = "250",
                Height = "25",
                Text = "How Many= "
            });
            devArea.Data.lblAnother = devArea.AddLabel(new ShuffLabel()
            {
                X = 280 - 200,
                Y = 100,
                Width = "250",
                Height = "25",
                Text = "Another: "
            });

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

            ShuffPropertyBox pop;
            var propBox = devArea.AddPropertyBox(pop = new ShuffPropertyBox()
                {
                    X = 25,
                    Y = 200,
                    Width = "250",
                    Height = "250",
                    ItemCreation = (item, index) =>
                        {
                            var ik = jQuery.Select(string.Format("<div style='width=100%;height=25px; background-color={0};'></div>", (index % 2 == 0 ? "red" : "green")));
                            var ikc = jQuery.Select(string.Format("<div style='width=50%;height=25px; float=left;'>{0}</div>", item.Label));
                            ik.Append(ikc);
                            var ikd = jQuery.Select(string.Format("<input type='text' style='width=48%;height=25px' value='{0}' />", item.Value));
                            ik.Append(ikd);
                            return ik;
                        }
                });
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));
            pop.addItem(new ShuffListItem("foos", 99));


            devArea.Data.varText = devArea.AddTextbox(new ShuffTextBox()
            {
                X = 150,
                Y = 134,
                Width = "100",
                Height = "25",
                Label = "Var Lookup"
            });
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


            devArea.Data.loadRoomInfo = ((room) =>
            {
                devArea.Data.gameServer = room.GameServer;
                devArea.Data.lblAnother.Text(room.GameServer);

                var count = int.Parse(devArea.Data.txtNumOfPlayers.GetValue());
                if (!devArea.Data.Created)
                {
                    pageHandler.gateway.Emit("Area.Game.DebuggerJoin", new DebuggerJoinRequestModel(room.RoomID), devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler

                    for (var i = 0; i < count; i++)
                    {
                        pageHandler.gateway.Emit("Area.Game.Join", new JoinGameRequestModel(room.RoomID, new UserModel() { UserName = "player " + (i + 1) }), devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                    }
                    devArea.Data.Created = true;
                }
                else
                {
                    if ((++devArea.Data.Joined) == count)
                    {
                        pageHandler.gateway.Emit("Area.Game.Start", new StartGameRequestModel(room.RoomID), devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                    }
                }
            });


            devArea.Data.txtNumOfPlayers = devArea.AddTextbox(new ShuffTextBox()
            {
                X = 130,
                Y = 43,
                Width = "130",
                Height = "20",
                Text = "6",
                Label = "Number of players=",
                LabelStyle = "font-size=13px"
            });

            codeArea = shuffUIManager.CreateWindow(new ShuffWindow<CodeAreaInformation>(new CodeAreaInformation())
            {
                Title = "Code",
                X = 0,
                Y = 0,
                Static = true,
                Width = ((int)(jQuery.Window.GetWidth() * .50)).ToString(),
                Height = ((int)(jQuery.Window.GetHeight() * .90)).ToString(),
                AllowClose = true,
                AllowMinimize = true,
                Visible = true
            });



            codeArea.Data.breakPoints = new List<int>();
            codeArea.Data.console = codeArea.AddCodeEditor(new ShuffCodeEditor() { Height = "20%", LineNumbers = false });

            codeArea.Data.codeEditor = codeArea.AddCodeEditor(new ShuffCodeEditor() { Height = "80%", LineNumbers = true });



            questionArea = shuffUIManager.CreateWindow(new ShuffWindow<QuestionAreaInformation>(new QuestionAreaInformation())
            {
                Title = "Question",
                X = 600,
                Y = 100,
                Width = "300",
                Height = "275",
                AllowClose = true,
                AllowMinimize = true,
                Visible = false

            });






            questionArea.Data.question = questionArea.AddLabel(new ShuffLabel()
            {
                X = 20,
                Y = 5,
                Width = "150",
                Height = "25",
                Text = "",

            });


            questionArea.Data.load = (question) =>
            {
                questionArea.Visible = true;
                questionArea.Data.question.Text(question.Question);
                questionArea.Data.answerBox.Remove();

                var answers = new List<ShuffListItem>();
                for (var i = 0; i < question.Answers.Length; i++)
                {
                    answers.Add(new ShuffListItem(question.Answers[i], i));
                }

                questionArea.Data.answerBox = questionArea.AddListBox(new ShuffListBox()
                {
                    X = 30,
                    Y = 65,
                    Width = "215",
                    Height = "125",
                    Label = "Answers",
                    Items = answers,
                    Click = (item) =>
                        {
                            pageHandler.gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(pageHandler.gameStuff.RoomID, item.Value), devArea.Data.gameServer);
                            questionArea.Visible = false;

                        }
                });

            };

            questionArea.Data.answerBox = questionArea.AddListBox(new ShuffListBox()
            {
                X = 30,
                Y = 65,
                Width = "215",
                Height = "125",
                Label = "Answers",
                Click = (item) =>
                {
                    pageHandler.gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(pageHandler.gameStuff.RoomID,item.Value), devArea.Data.gameServer);
                    questionArea.Visible = false;

                }
            });


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

        private void loadCss(string filename)
        {
            var fileref =  Document.CreateElement("link");
            fileref.SetAttribute("rel", "stylesheet");
            fileref.SetAttribute("type", "text/css");
            fileref.SetAttribute("href", filename);
            Document.GetElementsByTagName("head")[0].AppendChild(fileref);
        }
    }

}

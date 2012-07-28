using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using Client.ShuffUI;
using CommonLibraries;
using CommonWebLibraries;
using jQueryApi;

namespace Client
{
    public class BuildSite
    {
        private readonly string gatewayServerAddress;
        private ScriptLoader scriptLoader = new ScriptLoader();

        private ShuffWindow home;
        private ShuffWindow devArea;
        private ShuffWindow codeArea;



        public BuildSite(string gatewayServerAddress)
        {
            this.gatewayServerAddress = gatewayServerAddress;
            var url = "http://50.116.22.241:8881/";
            //       window .topLevel = url;

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



            var pageHandler = new PageHandler(gatewayServerAddress);


            var shuffUIManager = new ShuffUIManager();
            Globals.Window.shuffUIManager = shuffUIManager;


            home = shuffUIManager.CreateWindow(new ShuffWindow()
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
                    Globals.Window.PageHandler.gateway.emit("Area.Game.GetGames",
                        devArea.Inline().gameServer); //NO EMIT'ING OUTSIDE OF PageHandler

                }
            });

            home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 84,
                Width = "150",
                Height = "25",
                Text = "Create Game",
                Click = (e) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Game.Create", new { User = new { UserName = home.Inline().txtUserName[0].value } }, devArea.Inline().GameServer); //NO EMIT'ING OUTSIDE OF PageHandler


                }
            });

            home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 84,
                Width = "150",
                Height = "25",
                Text = "Create Game",
                Click = (e) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Game.Create", new { User = new { UserName = home.Inline().txtUserName[0].value } }, devArea.Inline().GameServer); //NO EMIT'ING OUTSIDE OF PageHandler


                }
            });
            home.Inline().btnStartGame = home.AddButton(new ShuffButton()
                {
                    X = 280,
                    Y = 164,
                    Width = "120",
                    Height = "25",
                    Text = "Start Game",
                    Click = (e) =>
                        {
                            Globals.Window.PageHandler.gateway.emit("Area.Game.Start", new { roomID = Globals.Window.PageHandler.gameStuff.roomID }, devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                        }

                });


            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++)
            {
                randomName += String.FromCharCode((char)(65 + (Math.Random() * 26)));
            }


            home.Inline().txtUserName = home.AddTextbox(new ShuffTextBox()
            {
                X = 130,
                Y = 43,
                Width = "130",
                Height = "20",
                Text = randomName,
                Label = "Username="
            });

            /*
        genericArea.gameList = home.addListBox({
            x: 30,
            y: 85,
            width: 215,
            height: 25 * 6,
            label: "Rooms",
            click: function () {
                window.PageHandler.gateway.emit("Area.Game.Join", { roomID: id, user: { userName: genericArea.txtUserName[0].value} }, devArea.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
            }
        });
        genericArea.userList = home.addListBox({
            x: 30,
            y: 280,
            width: 215,
            height: 25 * 5,
            label: "Users"
        });



        genericArea.loadRoomInfo = function (room) {


            genericArea.userList.remove();
            genericArea.btnStartGame.visible(true);

            var users = [];

            for (var i = 0; i < room.players.length; i++) {

                users.push(room.players[i]);

            }


            genericArea.userList = home.addListBox({
                x: 30,
                y: 280,
                width: 215,
                height: 25 * 5,
                label: "Users",
                items: users
            });

        };

        genericArea.loadRoomInfos = function (room) {
            genericArea.gameList.remove();

            var rooms = [];

            for (var i = 0; i < room.length; i++) {
                rooms.push({ label: room[i].name, value: room[i].roomID });
            }


            genericArea.gameList = home.addListBox({
                x: 30,
                y: 85,
                width: 215,
                height: 25 * 6,
                label: "Rooms",
                items: rooms,
                click: function (item) {
                    window.PageHandler.gateway.emit("Area.Game.Join", { roomID: item.value, user: { userName: genericArea.txtUserName.val()} }, devArea.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                }
            });
        };
             */


            devArea = shuffUIManager.CreateWindow(new ShuffWindow()
               {
                   Title = "Developer",
                   X = jQuery.Select("body").GetInnerWidth() - 500,
                   Y = 100,
                   Width = "420",
                   Height = "450",
                   AllowClose = true,
                   AllowMinimize = true
               });



            devArea.Inline().beginGame = (Action)(() =>
                {
                    devArea.Inline().Created = false;
                    devArea.Inline().Joined = 0;
                    Globals.Window.PageHandler.startGameServer();
                    Globals.Window.PageHandler.gateway.emit("Area.Debug.Create", new
                        {
                            user = new { userName = devArea.Inline().txtNumOfPlayers.val() },
                            Name = "main room",
                            Source = Globals.Window.shuffUIManager.codeArea.codeEditor.getValue(),
                            BreakPoints = Globals.Window.shuffUIManager.codeArea.breakPoints
                        });
                });

            devArea.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 54,
                Width = "150",
                Height = "25",
                Text = "Begin Game",
                Click = devArea.Inline().beginGame
            });

            devArea.Inline().lblHowFast = devArea.AddLabel(new ShuffLabel()
            {
                X = 280 - 200,
                Y = 80,
                Width = "250",
                Height = "25",
                Text = "How Many= "
            });
            devArea.Inline().lblAnother = devArea.AddLabel(new ShuffLabel()
            {
                X = 280 - 200,
                Y = 100,
                Width = "250",
                Height = "25",
                Text = "Another: "
            });

            devArea.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 94,
                Width = "150",
                Height = "25",
                Text = "Continue",
                Click = (evt) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Debug.Continue", new { }, devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                }
            });

            var propBox = devArea.AddPropertyBox(new ShuffPropertyBox()
                {
                    X = 25,
                    Y = 200,
                    Width = "250",
                    Height = "250",
                    ItemCreation = (item, index) =>
                        {
                            var ik = jQuery.Select("<div style='width=100%;height=25px; background-color=" + (index%2 == 0 ? "red" : "green") + ";'></div>");
                            var ikc = jQuery.Select("<div style='width=50%;height=25px; float=left;'>" + item.key + "</div>");
                            ik.Append(ikc);
                            var ikd = jQuery.Select("<input type='text' style='width=48%;height=25px' value='" + item.value + "' />");
                            ik.Append(ikd);
                            return ik;
                        }
                });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });
            propBox.Inline().addItem(new { key = "Foos", value = "99" });


            devArea.Inline().varText = devArea.AddTextbox(new ShuffTextBox()
            {
                X = 150,
                Y = 134,
                Width = "100",
                Height = "25",
                Label = "Var Lookup"
            });
            devArea.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 134,
                Width = "150",
                Height = "25",
                Text = "Lookup",
                Click = (evt) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Debug.VariableLookup.Request", new { variableName = devArea.Inline().varText.val() }, devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                }
            });


            devArea.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 164,
                Width = "150",
                Height = "25",
                Text = "Push New Source",
                Click = (evt) =>
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Debug.PushNewSource", new { source = Globals.Window.shuffUIManager.codeArea.codeEditor.getValue(), breakPoints = Globals.Window.shuffUIManager.codeArea.breakPoints },
                        devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                }
            });


            devArea.Inline().beginGame = (Action<dynamic>)((room) =>
            {
                devArea.Inline().gameServer = room.gameServer;
                devArea.Inline().lblAnother.text(room.gameServer);

                var count = int.Parse(devArea.Inline().txtNumOfPlayers.val());
                if (!devArea.Inline().created)
                {
                    Globals.Window.PageHandler.gateway.emit("Area.Game.DebuggerJoin", new { roomID = room.roomID }, devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler

                    for (var i = 0; i < count; i++)
                    {
                        Globals.Window.PageHandler.gateway.emit("Area.Game.Join", new { roomID = room.roomID, user = new { userName = "player " + (i + 1) } }, devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                    }
                    devArea.Inline().created = true;
                }
                else
                {
                    if ((++devArea.Inline().joined) == count)
                    {
                        Globals.Window.PageHandler.gateway.emit("Area.Game.Start", new { roomID = room.roomID }, devArea.Inline().gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                    }
                }
            });


            devArea.Inline().txtNumOfPlayers = devArea.AddTextbox(new ShuffTextBox()
            {
                X = 130,
                Y = 43,
                Width = "130",
                Height = "20",
                Text = "6",
                Label = "Number of players=",
                LabelStyle = "font-size=13px"
            });

            codeArea = shuffUIManager.CreateWindow(new ShuffWindow()
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



            codeArea.Inline().breakPoints = new List<int>();
            codeArea.Inline().console = codeArea.AddCodeEditor(new ShuffCodeEditor() { Height = "20%", LineNumbers = false });

            codeArea.Inline().codeEditor = codeArea.AddCodeEditor(new ShuffCodeEditor() { Height = "80%", LineNumbers = true });



            /*
             
        var questionArea = shuffUIManager.createWindow({
            title: "Question",
            x: 600,
            y: 100,
            width: 300,
            height: 275,
            allowClose: true,
            allowMinimize: true,
            visible: false

        });



        window.shuffUIManager.questionArea = questionArea;


        window.shuffUIManager.questionArea.question = questionArea.addLabel({
            x: 20,
            y: 5,
            width: 150,
            height: 25,
            text: "",
            click: function (e) {
                window.PageHandler.gateway.emit("Area.Game.GetGames", devArea.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler

            }
        });

        
        window.shuffUIManager.questionArea.load = function (question) {
            window.shuffUIManager.questionArea.visible(true);
            window.shuffUIManager.questionArea.question.text = question.question;
            window.shuffUIManager.questionArea.answerBox.remove();

            var answers = [];
            for (var i = 0; i < question.answers.length; i++) {
                answers.push({ label: question.answers[i], value: i });
            }

            window.shuffUIManager.questionArea.answerBox = questionArea.addListBox({
                x: 30,
                y: 65,
                width: 215,
                height: 25 * 5,
                label: "Answers",
                items: answers,
                click: function (item) {
                    window.PageHandler.gateway.emit("Area.Game.AnswerQuestion", { answer: item.value, roomID: window.PageHandler.gameStuff.roomID }, devArea.gameServer);
                    window.shuffUIManager.questionArea.visible(false);

                }
            });

        };

        window.shuffUIManager.questionArea.answerBox = questionArea.addListBox({
            x: 30,
            y: 65,
            width: 215,
            height: 25 * 5,
            label: "Answers",
            click: function (item) {
                window.PageHandler.gateway.emit("Area.Game.AnswerQuestion", { answer: item.index, roomID: window.PageHandler.gameStuff.roomID }, devArea.gameServer);
                window.shuffUIManager.questionArea.visible = false;

            }
        });



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
            var fileref = Document.CreateElement("link");
            fileref.SetAttribute("rel", "stylesheet");
            fileref.SetAttribute("type", "text/css");
            fileref.SetAttribute("href", filename);
            Document.GetElementsByTagName("head")[0].AppendChild(fileref);
        }
    }

}

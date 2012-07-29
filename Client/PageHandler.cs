using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Serialization;
using CommonLibraries;
using jQueryApi;

namespace Client
{
    public class PageHandler
    {
        private readonly BuildSite buildSite;
        public Gateway gateway;
        private dynamic lastMouseMove;
        private CardGameArea lastMainArea;
        private CanvasContext2D gameContext;
        private DateTime startTime;
        private int numOfTimes;
        private int timeValue;
        private JsDictionary<string, WorkingImageElement> cardImages;
        private CanvasElement gameCanvas;

        public GameInfo gameStuff;
        private DateTime endTime;

        public PageHandler(string gatewayServerAddress, BuildSite buildSite)
        {
            this.buildSite = buildSite;
            gameStuff = new GameInfo();

            startTime = DateTime.Now;
            Window.SetTimeout(() =>
                {
                    buildSite.devArea.Data.beginGame();
                }, 2000);
            gateway = new Gateway(gatewayServerAddress);

            gateway.On("Area.Main.Login.Response", (data) =>
            {
                Window.Alert(Json.Stringify(data));

            });
            gateway.On("Area.Lobby.ListCardGames.Response", (data) =>
            {

            });
            gateway.On("Area.Lobby.ListRooms.Response", (data) =>
            {
                Console.Log(data);

            });


            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++)
            {
                randomName += String.FromCharCode((char)(65 + (Math.Random() * 26)));
            }

            gateway.Login(randomName);

            gateway.On("Area.Debug.GetGameSource.Response", (data) =>
                {
                    var endTime = new DateTime();
                    var time = endTime - startTime;
                    numOfTimes++;
                    timeValue += time;
                    buildSite.devArea.Data.lblHowFast.Text("How Many: " + (timeValue / numOfTimes));
                    buildSite.codeArea.Data.codeEditor.SetValue(data);
                    buildSite.codeArea.Data.codeEditor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
                    buildSite.codeArea.Data.codeEditor.Refresh();
                });
            gateway.Emit("Area.Debug2.GetGameSource.Request", new { gameName = "Sevens" });
            cardImages = new JsDictionary<string, WorkingImageElement>();
            for (int i = 101; i < 153; i++)
            {
                var img = new WorkingImageElement();
                var domain = Globals.Window.topLevel + "client/assets";
                var src = domain + "/cards/" + i;
                string jm;
                img.Src = jm = src + ".gif";
                cardImages[jm] = img;
            }
            lastMainArea = null;

            jQuery.Select("body").Append(gameCanvas = (CanvasElement)Document.CreateElement("canvas"));


            var props = new JsDictionary();
            props["margin"] = "0px";
            props["position"] = "absolute";
            props["top"] = "0px";
            props["left"] = (jQuery.Window.GetWidth() * .5) + "px";
            props["z-index"] = (jQuery.Window.GetWidth() * .5) + "px";

            jQuery.FromElement(gameCanvas).CSS(props);//todo css prop object

            gameContext = (CanvasContext2D)gameCanvas.GetContext("2d");
            gameContext.me().canvas = gameCanvas;
            gameContext.me().domCanvas = jQuery.FromElement(gameCanvas);
            gameContext.me().canvas.width = jQuery.Window.GetWidth() * .5;
            gameContext.me().canvas.height = jQuery.Window.GetHeight();

            lastMouseMove = false;
            gameCanvas.AddEventListener("DOMMouseScroll", handleScroll, false);
            gameCanvas.AddEventListener("mousewheel", handleScroll, false);

            gameCanvas.AddEventListener("touchmove", CanvasMouseMove, true);
            gameCanvas.AddEventListener("touchstart", CanvasOnClick, true);
            gameCanvas.AddEventListener("touchend", CanvasMouseUp, true);

            gameCanvas.AddEventListener("mousedown", CanvasMouseMove, true);
            gameCanvas.AddEventListener("mouseup", CanvasOnClick, true);
            gameCanvas.AddEventListener("mousemove", CanvasMouseUp, true);
            gameCanvas.AddEventListener("contextmenu", e =>
            {
                e.PreventDefault();
                //todo: Sspecial right click menu;
            }, false);

            jQuery.Window.Resize(ResizeCanvas);
            ResizeCanvas(null);
            Window.SetInterval(Draw, 1000 / 60);
        }
        public void startGameServer()
        {

            gateway.On("Area.Game.RoomInfo", data =>
                {
                    gameStuff.RoomID = data.roomID;
                    buildSite.home.Data.loadRoomInfo(data);
                    buildSite.devArea.Data.loadRoomInfo(data);

                });
            gateway.On("Area.Game.RoomInfos", data =>
                {
                    buildSite.devArea.Data.loadRoomInfos(data);

                });
            gateway.On("Area.Debug.Log", data =>
                {
                    buildSite.devArea.Data.loadRoomInfos(data);

                    var lines = buildSite.codeArea.Data.console.GetValue().Split('\n');
                    lines = lines.me().slice(lines.Length - 40, lines.Length);

                    buildSite.codeArea.me().console.setValue(lines.me().join('\n') + "\n" + data.value);
                    buildSite.codeArea.me().console.setCursor(buildSite.codeArea.Data.console.me().lineCount(), 0);

                });


            gateway.On("Area.Debug.Break", data =>
                {
                    buildSite.devArea.Data.loadRoomInfos(data);


                    var cm = buildSite.codeArea.Data.codeEditor;

                    cm.ClearMarker(data.lineNumber);

                    cm.SetMarker(data.lineNumber, "<span style=\"color: #059\">●</span> %N%");


                    cm.SetCursor(data.lineNumber + 15, 0);
                    cm.SetCursor(data.lineNumber - 15, 0);
                    cm.SetCursor(data.lineNumber, 0);
                });

            gateway.On("Area.Debug.VariableLookup.Response", data =>
                {
                    Window.Alert(Json.Stringify(data));

                });
            gateway.On("Area.Game.AskQuestion", data =>
            {
                buildSite.questionArea.Data.load(data);
                //alert(JSON.stringify(data));
                endTime = new DateTime();
                var time = endTime - startTime;
                buildSite.devArea.Data.lblHowFast.Text("how long: " + time);
                Window.SetTimeout(() =>
                    {

                        gateway.Emit("Area.Game.AnswerQuestion", new { Answer = 1, RoomID = gameStuff.RoomID }, buildSite.devArea.Data.gameServer);
                        buildSite.questionArea.Visible=false;
                        startTime = new DateTime();
                    }, 200);
            });

            gateway.On("Area.Game.UpdateState", data =>
            {
                gameContext.ClearRect(0, 0, gameContext.me().canvas.width, gameContext.me().canvas.height);
                drawArea(data);
            });
            gateway.On("Area.Game.Started", data =>
            {
                //alert(JSON.stringify(data));

            });
            gateway.On("Area.Game.GameOver", data =>
            {

            });
            gateway.On("Area.Debug.GameOver", data =>
            {
                Window.SetTimeout(() =>
                    {
                        buildSite.devArea.Data.beginGame();
                    }, 1000); 
            });


        }

        public void drawArea(CardGameArea mainArea)
        {
            var gameboard = gameContext;
            lastMainArea = mainArea;
            var scale = new Point(gameContext.me().canvas.width / mainArea.Size.Width, gameContext.me().canvas.height / mainArea.Size.Height);
            gameboard.FillStyle = "rgba(0,0,200,0.5)";
            foreach (var space in mainArea.Spaces)
            {
                var vertical = space.Vertical;
                gameboard.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);

                var spaceScale = new Point(space.Width / space.Pile.Cards.Count, space.Height / space.Pile.Cards.Count);

                int j = 0;
                foreach (var card in space.Pile.Cards)
                {
                    var xx = Math.Floor((space.X * scale.X) + (!vertical ? (j * spaceScale.X * scale.X) : 0));
                    var yy = Math.Floor((space.Y * scale.Y) + (vertical ? (j * spaceScale.Y * scale.Y) : 0));
                    var cardImage = cardImages[drawCard(card)];
                    gameboard.Save();
                    gameboard.Translate(xx + (vertical ? space.Width * scale.X / 2 : 0), yy + (!vertical ? space.Height * scale.Y / 2 : 0));
                    gameboard.Rotate(space.Rotate * Math.PI / 180);
                    gameboard.Translate((-cardImage.Width / 2), (-cardImage.Height / 2));
                    foreach (var effect in card.Effects)
                    {

                        switch (effect.Type)
                        {
                            case EffectType.Highlight:
                                gameboard.Save();
                                gameboard.Translate(effect.OffsetX, effect.OffsetY);
                                gameboard.Rotate(effect.Rotate * Math.PI / 180);
                                gameboard.Translate(-effect.Radius, -effect.Radius);
                                gameboard.FillStyle = effect.Color;
                                gameboard.StrokeStyle = "black";
                                gameboard.FillRect(0, 0, cardImage.Width + effect.Radius * 2, cardImage.Height + effect.Radius * 2);
                                gameboard.StrokeRect(0, 0, cardImage.Width + effect.Radius * 2, cardImage.Height + effect.Radius * 2);
                                gameboard.Restore();

                                break;
                        }
                    }
                    //todo gayness
                    gameboard.DrawImage(cardImage.me(), 0, 0);
                    gameboard.Restore();
                    j++;
                }

            }


            foreach (var ta in mainArea.TextAreas)
            {
                gameboard.FillStyle = "rgba(200, 0, 200, 0.5)";
                gameboard.FillText(ta.Text, ta.X*scale.X, ta.Y*scale.Y);
            }



        }
        public string drawCard(CardGameCard card)
        {
            var src = "";
            var domain = Globals.Window.topLevel + "client/assets";


            src = domain + "/cards/" + (100 + (card.Value + 1) + (card.Type) * 13);

            return src + ".gif";
        }

        public void CanvasOnClick(ElementEvent e)
        {
            e.PreventDefault();

        }
        public void CanvasMouseMove(ElementEvent e)
        {
            e.PreventDefault();

            Document.Body.Style.Cursor = "default";
            this.lastMouseMove = e;

        }
        public void CanvasMouseUp(ElementEvent e)
        {
            e.PreventDefault();

        }
        public void handleScroll(ElementEvent e)
        {
            e.PreventDefault();

        }
        public void ResizeCanvas(jQueryEvent jQueryEvent)
        {
            if (gameContext.me().domCanvas.attr("width") != jQuery.Window.GetWidth())
                gameContext.me().domCanvas.attr("width", jQuery.Window.GetWidth() * .5);
            if (gameContext.me().domCanvas.attr("height") != jQuery.Window.GetHeight())
                gameContext.me().domCanvas.attr("height", jQuery.Window.GetHeight());
            if (lastMainArea != null)
                this.drawArea(lastMainArea);
        }
        public void Draw()
        {
            this.gameContext.me().canvas.width = this.gameContext.me().canvas.width;
            if (this.lastMainArea != null)
                this.drawArea(this.lastMainArea);
        }
    }
}
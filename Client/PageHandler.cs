using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using System.Serialization;
using CommonLibraries;
using GameServer;
using Models;
using global;
using jQueryApi;
using Json = CommonLibraries.Json;

namespace Client
{
    public class PageHandler
    {
        private readonly BuildSite buildSite;
        public Gateway gateway;
        private GameCardGame lastMainArea;
        private Tuple<CanvasContext2D, GameCanvasInformation> gameContext;
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

            gateway.On<string>("Area.Main.Login.Response", (data) =>
            {
                Window.Alert(Json.Stringify(data));

            });
            gateway.On<string>("Area.Lobby.ListCardGames.Response", (data) =>
            {

            });
            gateway.On<string>("Area.Lobby.ListRooms.Response", (data) =>
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

            gateway.On<GameSourceResponseModel>("Area.Debug.GetGameSource.Response", (data) =>
                {
                    var endTime = new DateTime();
                    var time = endTime - startTime;
                    numOfTimes++;
                    timeValue += time;
                    buildSite.devArea.Data.lblHowFast.Text("How Many: " + (timeValue / numOfTimes));
                    buildSite.codeArea.Data.codeEditor.editor.SetValue(data.Content);
                    buildSite.codeArea.Data.codeEditor.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
                    buildSite.codeArea.Data.codeEditor.editor.Refresh();
                });
            gateway.Emit("Area.Debug2.GetGameSource.Request", new GameSourceRequestModel("Sevens"));
            cardImages = new JsDictionary<string, WorkingImageElement>();
            for (int i = 101; i < 153; i++)
            {
                var img = new WorkingImageElement();
                var domain = Globals.Window.topLevel + "assets";
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

            jQuery.FromElement(gameCanvas).CSS(props);

            gameContext = new Tuple<CanvasContext2D, GameCanvasInformation>((CanvasContext2D)gameCanvas.GetContext("2d"), new GameCanvasInformation());
            gameContext.Item2.canvas = gameCanvas;
            gameContext.Item2.domCanvas = jQuery.FromElement(gameCanvas);
            gameContext.Item2.canvas.Width = (int)(jQuery.Window.GetWidth() * .5);
            gameContext.Item2.canvas.Height = jQuery.Window.GetHeight();

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

            gateway.On<GameRoom>("Area.Game.RoomInfo", data =>
                {
                    gameStuff.RoomID = data.RoomID;
                    buildSite.home.Data.loadRoomInfo(data);
                    buildSite.devArea.Data.loadRoomInfo(data);

                });
            /*
                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
                            {
                                buildSite.home.Data.loadRoomInfos(data);

                            });
            */
            gateway.On<GameAnswer>("Area.Debug.Log", data =>
                {
                    buildSite.home.Data.loadRoomInfos(data);

                    var lines = buildSite.codeArea.Data.console.editor.GetValue().Split("\n");
                    lines = (string[])lines.Extract(lines.Length - 40, lines.Length);

                    buildSite.codeArea.Data.console.editor.SetValue(lines.Join("\n") + "\n" + data.Value);
                    buildSite.codeArea.Data.console.editor.SetCursor(buildSite.codeArea.Data.console.editor.LineCount(), 0);

                });


            gateway.On<GameAnswer>("Area.Debug.Break", data =>
                {
                    buildSite.home.Data.loadRoomInfos(data);


                    var cm = buildSite.codeArea.Data.codeEditor;

                    cm.editor.ClearMarker(data.LineNumber);
                    cm.editor.SetMarker(data.LineNumber, "<span style=\"color: #059\">●</span> %N%");
                    cm.editor.SetCursor(data.LineNumber + 15, 0);
                    cm.editor.SetCursor(data.LineNumber - 15, 0);
                    cm.editor.SetCursor(data.LineNumber, 0);
                });

            /*
                        gateway.On("Area.Debug.VariableLookup.Response", data =>
                            {
                                Window.Alert(Json.Stringify(data));
                            });
            */
            gateway.On<GameSendAnswerModel>("Area.Game.AskQuestion", data =>
            {
                buildSite.questionArea.Data.load(data);
                //alert(JSON.stringify(data));
                endTime = new DateTime();
                var time = endTime - startTime;
                buildSite.devArea.Data.lblHowFast.Text("how long: " + time);
                Window.SetTimeout(() =>
                    {

                        gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(gameStuff.RoomID, 1), buildSite.devArea.Data.gameServer);
                        buildSite.questionArea.Visible = false;
                        startTime = new DateTime();
                    }, 200);
            });

            gateway.On<GameCardGame>("Area.Game.UpdateState", data =>
            {
                gameContext.Item1.ClearRect(0, 0, gameContext.Item2.canvas.Width, gameContext.Item2.canvas.Height);
                drawArea(data);
            });
            gateway.On<GameRoom>("Area.Game.Started", data =>
            {
                //alert(JSON.stringify(data));

            });
            gateway.On<string>("Area.Game.GameOver", data =>
            {

            });
            gateway.On<string>("Area.Debug.GameOver", data =>
            {
                Window.SetTimeout(() =>
                    {
                        buildSite.devArea.Data.beginGame();
                    }, 1000);
            });


        }

        public void drawArea(GameCardGame mainArea)
        {
            var gameboard = gameContext;
            lastMainArea = mainArea;
            var scale = new Point(gameContext.Item2.canvas.Width / mainArea.Size.Width, gameContext.Item2.canvas.Height / mainArea.Size.Height);
            gameboard.Item1.FillStyle = "rgba(0,0,200,0.5)";
            foreach (var space in mainArea.Spaces)
            {
                var vertical = space.Vertical;
                gameboard.Item1.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);

                var spaceScale = new Point(space.Width / space.Pile.Cards.Count, space.Height / space.Pile.Cards.Count);

                int j = 0;
                foreach (var card in space.Pile.Cards)
                {
                    var xx = Math.Floor((space.X * scale.X) + (!vertical ? (j * spaceScale.X * scale.X) : 0));
                    var yy = Math.Floor((space.Y * scale.Y) + (vertical ? (j * spaceScale.Y * scale.Y) : 0));
                    var cardImage = cardImages[drawCard(card)];
                    gameboard.Item1.Save();
                    gameboard.Item1.Translate(xx + (vertical ? space.Width * scale.X / 2 : 0), yy + (!vertical ? space.Height * scale.Y / 2 : 0));
                    gameboard.Item1.Rotate(space.Rotate * Math.PI / 180);
                    gameboard.Item1.Translate((-cardImage.Width / 2), (-cardImage.Height / 2));
                    foreach (var effect in card.Effects)
                    {

                        if (effect.Type == "highlight")
                        {
                            var hEffect = effect.castValue<CardGameEffectHighlight>();
                            gameboard.Item1.Save();
                            gameboard.Item1.Translate(hEffect.OffsetX, hEffect.OffsetY);
                            gameboard.Item1.Rotate(hEffect.Rotate * Math.PI / 180);
                            gameboard.Item1.Translate(-hEffect.Radius, -hEffect.Radius);
                            gameboard.Item1.FillStyle = hEffect.Color;
                            gameboard.Item1.StrokeStyle = "black";
                            gameboard.Item1.FillRect(0, 0, cardImage.Width + hEffect.Radius * 2, cardImage.Height + hEffect.Radius * 2);
                            gameboard.Item1.StrokeRect(0, 0, cardImage.Width + hEffect.Radius * 2, cardImage.Height + hEffect.Radius * 2);
                            gameboard.Item1.Restore();
                        }/*
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
                        }*/
                    }
                    //todo gayness
                    gameboard.Item1.DrawImage(cardImage.me(), 0, 0);
                    gameboard.Item1.Restore();
                    j++;
                }

            }


            foreach (var ta in mainArea.TextAreas)
            {
                gameboard.Item1.FillStyle = "rgba(200, 0, 200, 0.5)";
                gameboard.Item1.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
            }



        }
        public string drawCard(CardGameCard card)
        {
            var src = "";
            var domain = Globals.Window.topLevel + "assets";


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
            if (gameContext.Item2.domCanvas.GetAttribute("width") != jQuery.Window.GetWidth().ToString())
                gameContext.Item2.domCanvas.Attribute("width", (jQuery.Window.GetWidth() * .5).ToString());
            if (gameContext.Item2.domCanvas.GetAttribute("height") != jQuery.Window.GetHeight().ToString())
                gameContext.Item2.domCanvas.Attribute("height", jQuery.Window.GetHeight().ToString());
            if (lastMainArea != null)
                this.drawArea(lastMainArea);
        }
        public void Draw()
        {
            this.gameContext.Item2.canvas.Width = this.gameContext.Item2.canvas.Width;
            if (this.lastMainArea != null)
                this.drawArea(this.lastMainArea);
        }
    }

    public class GameCanvasInformation
    {
        [IntrinsicProperty]
        public CanvasElement canvas { get; set; }

        [IntrinsicProperty]
        public jQueryObject domCanvas { get; set; }
    }
}
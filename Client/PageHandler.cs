using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
using GameServer;
using Models;
using global;
using jQueryApi;

namespace Client
{
    public class PageHandler
    {
        private readonly BuildSite buildSite;
        private JsDictionary<string, ImageElement> cardImages;
        private DateTime endTime;
        private CanvasElement gameCanvas;
        private PageGameContext gameContext;
        public GameInfo gameStuff;
        public Gateway gateway;
        private GameCardGame lastMainArea;
        private int numOfTimes;
        private DateTime startTime;
        private int timeValue;

        public PageHandler(string gatewayServerAddress, BuildSite buildSite)
        {
            this.buildSite = buildSite;
            gameStuff = new GameInfo();

            startTime = DateTime.Now;
            Window.SetTimeout(() => { buildSite.devArea.Data.beginGame(); }, 2000);
            gateway = new Gateway(gatewayServerAddress);

            gateway.On<object>("Area.Main.Login.Response", (data) => { Window.Alert(Json.Stringify(data)); });
            gateway.On<object>("Area.Lobby.ListCardGames.Response", (data) => { });
            gateway.On<object>("Area.Lobby.ListRooms.Response", (data) => { Console.Log(data); });


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
            cardImages = new JsDictionary<string, ImageElement>();
            for (var i = 101; i < 153; i++)
            {
                var img = new ImageElement();
                var domain = Globals.Window.topLevel + "assets";
                var src = domain + "/cards/" + i;
                string jm;
                img.Src = jm = src + ".gif";
                cardImages[jm] = img;
            }
            lastMainArea = null;

            jQuery.Select("body").Append(gameCanvas = (CanvasElement)Document.CreateElement("canvas"));

            Element dvGame;
            jQuery.Select("body").Append(dvGame = Document.CreateElement("div"));
            dvGame.ID = "dvGame";
            dvGame.Style.Left = "50%";
            dvGame.Style.Position = "absolute";
            dvGame.Style.Top = "0";
            dvGame.Style.Right = "0";
            dvGame.Style.Bottom = "0";



            var props = new JsDictionary();
            props["margin"] = "0px";
            props["position"] = "absolute";
            props["top"] = "0px";
            props["left"] = (jQuery.Window.GetWidth() * .5) + "px";
            props["z-index"] = (jQuery.Window.GetWidth() * .5) + "px";

            jQuery.FromElement(gameCanvas).CSS(props);

            gameContext = new PageGameContext((CanvasContext2D)gameCanvas.GetContext("2d"), new GameCanvasInformation());
            gameContext.CanvasInfo.canvas = gameCanvas;
            gameContext.CanvasInfo.domCanvas = jQuery.FromElement(gameCanvas);
            gameContext.CanvasInfo.canvas.Width = (int)(jQuery.Window.GetWidth() * .5);
            gameContext.CanvasInfo.canvas.Height = jQuery.Window.GetHeight();

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
                    lines = (string[])lines.Extract(lines.Length - 40, 40);

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
                    gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
                    drawArea(data);
                });
            gateway.On<GameRoom>("Area.Game.Started", data =>
                {
                    //alert(JSON.stringify(data));
                });
            gateway.On<string>("Area.Game.GameOver", data => { });
            gateway.On<string>("Area.Debug.GameOver", data => { Window.SetTimeout(() => { buildSite.devArea.Data.beginGame(); }, 1000); });
        }

        public void drawArea(GameCardGame mainArea)
        {
            var gameboard = gameContext;
            lastMainArea = mainArea;
            var scale = new Point(gameContext.CanvasInfo.canvas.Width / mainArea.Size.Width, gameContext.CanvasInfo.canvas.Height / mainArea.Size.Height);

            newDrawArea(mainArea);


            return;


            /*
                        gameboard.Context.FillStyle = "rgba(0,0,200,0.5)";
                        foreach (var space in mainArea.Spaces)
                        {
                            var vertical = space.Vertical;




                            foreach (var effect in space.Effects)
                            {
                                switch (effect.Type)
                                {
                                    case EffectType.Highlight:
                                        var hEffect = effect.castValue<CardGameAppearanceEffectHighlight>();
                                        gameboard.Context.Save();
                                        gameboard.Context.Translate(hEffect.OffsetX, hEffect.OffsetY);
                                        gameboard.Context.Rotate(hEffect.Rotate * Math.PI / 180);
                                        gameboard.Context.Translate(-hEffect.Radius, -hEffect.Radius);
                                        gameboard.Context.FillStyle = hEffect.Color;
                                        gameboard.Context.StrokeStyle = "black";
                                        gameboard.Context.LineWidth = 5;

                                        gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X + hEffect.Radius * 2, space.Height * scale.Y + hEffect.Radius * 2);
                                        gameboard.Context.StrokeRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X + hEffect.Radius * 2, space.Height * scale.Y + hEffect.Radius * 2);
                                        gameboard.Context.Restore();

                                        break;
                                    case EffectType.Rotate:
                                        break;
                                    case EffectType.Bend:
                                        break;
                                    case EffectType.StyleProperty:
                                        break;
                                    case EffectType.Animated:
                                        break;
                                }

                            }



                            gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);

                            var spaceScale = new Point(space.Width / space.Pile.Cards.Count, space.Height / space.Pile.Cards.Count);

                            var j = 0;
                            foreach (var card in space.Pile.Cards)
                            {
                                var xx = 0.0;
                                var yy = 0.0;

                                switch (space.ResizeType)
                                {
                                    case TableSpaceResizeType.Grow:
                                        xx = Math.Floor((space.X * scale.X) + (!vertical ? (j * spaceScale.X * scale.X) : 0));
                                        yy = Math.Floor((space.Y * scale.Y) + (vertical ? (j * spaceScale.Y * scale.Y) : 0));

                                        break;
                                    case TableSpaceResizeType.Static:
                                        if (vertical)
                                        {
                                            xx = space.X * scale.X;
                                            yy = space.Y * scale.Y + card.Value * scale.Y / 2;
                                        }
                                        else
                                        {
                                            xx = space.X * scale.X + card.Value * scale.X / 2;
                                            yy = space.Y * scale.Y;
                                        }

                                        break;
                                }


                                var cardImage = cardImages[drawCard(card)];
                                gameboard.Context.Save();
                                gameboard.Context.Translate(xx + (vertical ? space.Width * scale.X / 2 : 0), yy + (!vertical ? space.Height * scale.Y / 2 : 0));
                                gameboard.Context.Rotate(space.Rotate * Math.PI / 180);
                                gameboard.Context.Translate((-cardImage.Width / 2), (-cardImage.Height / 2));
                                /*


                                                    foreach (var effect in card.Effects)
                                                    {

                                                        if (effect.Type == "highlight")
                                                        {
                                                            var hEffect = effect.castValue<CardGameAppearanceEffectHighlight>();
                                                            gameboard.Context.Save();
                                                            gameboard.Context.Translate(hEffect.OffsetX, hEffect.OffsetY);
                                                            gameboard.Context.Rotate(hEffect.Rotate * Math.PI / 180);
                                                            gameboard.Context.Translate(-hEffect.Radius, -hEffect.Radius);
                                                            gameboard.Context.LineWidth = 2;
                                                            gameboard.Context.FillStyle = hEffect.Color;
                                                            gameboard.Context.StrokeStyle = "#454545";
                                                            gameboard.Context.FillRect(0, 0, cardImage.Width + hEffect.Radius * 2, cardImage.Height + hEffect.Radius * 2);
                                                            gameboard.Context.StrokeRect(0, 0, cardImage.Width + hEffect.Radius * 2, cardImage.Height + hEffect.Radius * 2);
                                                            gameboard.Context.Restore();
                                                        }

                                                    }

                                                    foreach (var effect in card.Effects)
                                                    {
                                                        switch (effect.DrawTime)
                                                        {
                                                            case DrawTime.During:
                                                                if (effect.Type == "rotate")
                                                                {
                                                                    var hEffect = effect.castValue<CardGameAppearanceEffectRotate>();
                                                                    gameboard.Context.Save();
                                                                    gameboard.Context.Translate(cardImage.Width / 2, cardImage.Height / 2);
                                                                    gameboard.Context.Rotate(hEffect.Degrees * Math.PI / 180);
                                                                    gameboard.Context.Translate(-cardImage.Width / 2, -cardImage.Height / 2);

                                                                }



                                                                break;
                                                        }
                                                    }

                                                    foreach (var effect in space.Effects)
                                                    {
                                                        switch (effect.DrawTime)
                                                        {
                                                            case DrawTime.During:
                                                                if (effect.Type == "bend")
                                                                {

                                                                    var hEffect = effect.castValue<CardGameAppearanceEffectBend>();
                                                                    gameboard.Context.Save();

                                                                    gameboard.Context.Translate(cardImage.Width / 2, cardImage.Height / 2);
                                                                    gameboard.Context.Rotate((-hEffect.Degrees / 2 + hEffect.Degrees / (space.Pile.Cards.Count - 1) * j) * Math.PI / 180);
                                                                    gameboard.Context.Translate(-cardImage.Width / 2, -cardImage.Height / 2);

                                                                    //gameboard.Context.Translate(0, -(j - (space.Pile.Cards.Count - 1) / 2) * 5);

                                                                }
                                                                break;
                                                        }
                                                    }

                                                    gameboard.Context.DrawImage(cardImage, 0, 0);
                                                    foreach (var effect in card.Effects)
                                                    {
                                                        switch (effect.DrawTime)
                                                        {
                                                            case DrawTime.During:
                                                                if (effect.Type == "rotate")
                                                                {
                                                                    gameboard.Context.Restore();
                                                                }

                                                                break;
                                                        }
                                                    }
                                                    foreach (var effect in space.Effects)
                                                    {
                                                        switch (effect.DrawTime)
                                                        {
                                                            case DrawTime.During:
                                                                if (effect.Type == "bend")
                                                                {
                                                                    gameboard.Context.Restore();
                                                                }
                                                                break;
                                                        }
                                                    }

                                                    gameboard.Context.Restore();



                                                    j++;#1#
                            }
                        }
            */


            foreach (var ta in mainArea.TextAreas)
            {
                gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
                gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
            }
        }

        private Element findSpace(CardGameTableSpace space)
        {
            Element doc;
            string id = "dv_space_" + space.Name;
            if (Document.GetElementById(id) != null)
            {
                doc=Document.GetElementById(id);
            }
            else
            {
                var sp = Document.CreateElement("div");
                sp.ID = id;
                jQuery.Select("#dvGame").Append(sp);

                doc= sp;
            }

            doc.Style.me()["transform"] = "none";
            return doc;
        }
        private Tuple<Element, ImageElement> findCard(CardGameTableSpace wantedSpace, CardGameCard card)//todo fix for show face down cards lol typevalue
        {
            string id = "dv_card_" + card.Type + "_" + card.Value;
            var space = findSpace(wantedSpace);
            
            Tuple<Element, ImageElement> doc;
            if (Document.GetElementById(id) != null)
            {
                var m = Document.GetElementById(id);
                if (m.ParentNode != (space))
                {
                    m.ParentNode.RemoveChild(m);
                    space.AppendChild(m);
                }
;
                doc= new Tuple<Element, ImageElement>(m,(ImageElement) m.ChildNodes[0]);
            }
            else
            {
                var sp = Document.CreateElement("div");
                sp.ID = id;
                jQuery.FromElement(space).Append(sp);

                var cardImage = cloneImage(cardImages[drawCard(card)]);
                sp.AppendChild(cardImage);
                doc=new Tuple<Element, ImageElement>(sp, cardImage);
            }

            doc.Item1.Style.me().transform = "";
            doc.Item1.Style.me().webkitTransform = "";
            doc.Item2.Style.me().transform = "";
            doc.Item2.Style.me().webkitTransform = "";

            return doc;

        }

        private void newDrawArea(GameCardGame mainArea)
        {
            //jQuery.Select("#dvGame").Children().Remove();

            var scale = new Point(jQuery.Select("#dvGame").GetWidth() / mainArea.Size.Width, (jQuery.Document.GetHeight() - 100) / mainArea.Size.Height);

            foreach (var space in mainArea.Spaces)
            {
                var vertical = space.Vertical;

                var spaceDiv = findSpace(space);
                // var spaceDivJ = jQuery.FromElement(spaceDiv);




                foreach (var effect in space.Effects)
                {
                }



                //   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);

                var spaceScale = new Point(space.Width / space.Pile.Cards.Count, space.Height / space.Pile.Cards.Count);

                var j = 0;
                foreach (var card in space.Pile.Cards)
                {
                    var xx = 0.0;
                    var yy = 0.0;

                    switch (space.ResizeType)
                    {
                        case "static":
                            if (vertical)
                            {
                                xx = space.X * scale.X;
                                yy = space.Y * scale.Y + card.Value * scale.Y / 2;
                            }
                            else
                            {
                                xx = space.X * scale.X + card.Value * scale.X / 2;
                                yy = space.Y * scale.Y;
                            }

                            break;

                        case "grow":
                            xx = Math.Floor((space.X * scale.X) + (!vertical ? (j * spaceScale.X * scale.X) : 0));
                            yy = Math.Floor((space.Y * scale.Y) + (vertical ? (j * spaceScale.Y * scale.Y) : 0));
                            break;
                        default:
                            xx = Math.Floor((space.X * scale.X) + (!vertical ? (j * spaceScale.X * scale.X) : 0));
                            yy = Math.Floor((space.Y * scale.Y) + (vertical ? (j * spaceScale.Y * scale.Y) : 0));

                            break;
                    }



                    var cardDiv = findCard(space,card);
                    var cardDivJ = jQuery.FromElement(cardDiv.Item1);

                    cardDiv.Item2.Style.Position = "absolute";
                    cardDiv.Item2.Style.Left = (xx + (vertical ? space.Width * scale.X / 2 : 0)) + "px";
                    cardDiv.Item2.Style.Top = (yy + (!vertical ? space.Height * scale.Y / 2 : 0)) + "px";
                    cardDiv.Item2.Style.me()["transform"] = string.Format("rotate({0}deg)", space.Rotate);



                    styleAppearanceFromSpace(cardDiv.Item2,j, space);
                    styleAppearance(cardDiv.Item2, card.Appearance);


                    FixBrowserPrefixes(cardDiv.Item2);


//                    spaceDiv.AppendChild(cardDiv);

                    j++;

                    //effects
                }
            }
            /*

            foreach (var ta in mainArea.TextAreas)
            {
                gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
                gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
            }*/


        }

        private void styleAppearanceFromSpace(Element element,int cardIndex,CardGameTableSpace space)
        {
            CardGameAppearance appearance = space.Appearance;
            foreach (var cardGameAppearanceEffect in appearance.Effects)
            {
                switch (cardGameAppearanceEffect.Type)
                {
                    case EffectType.Bend:

                        var hEffect = cardGameAppearanceEffect.castValue<CardGameAppearanceEffectBend>(); 

                                                 


                        //rotate
                        string trans = element.Style.me()["transform"];

                        if (trans.StartsWith("rotate("))
                        {
                            element.Style.me()["transform"] = string.Format("rotate({0}deg)", (-hEffect.Degrees / 2 + hEffect.Degrees / (space.Pile.Cards.Count - 1) * cardIndex) + int.Parse(trans.Replace("rotate(", "").Replace("deg)", "")));//todo regex??
                        }
                        else
                        {
                            element.Style.me()["transform"] = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate);
                        }



                        break;

                }
            }

          

            element.Style.BackgroundColor = appearance.InnerStyle.BackColor;
        }


        private void styleAppearance(Element element, CardGameAppearance appearance)
        {

            //rotate
            string trans = element.Style.me()["transform"];

            if (trans.StartsWith("rotate("))
            {
                element.Style.me()["transform"] = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate + int.Parse(trans.Replace("rotate(", "").Replace("deg)", "")));//todo regex??
            }
            else
            {
                element.Style.me()["transform"] = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate);
            }

            element.Style.BackgroundColor = appearance.InnerStyle.BackColor;
        }

        public void FixBrowserPrefixes(ImageElement cardImage)
        {
            dynamic style = cardImage.Style;


            var f = (style["transform"] && (cardImage.Style.me()["-webkit-transform"] = cardImage.Style.me()["transform"]));
            f = (style["box-shadow"] && (cardImage.Style.me()["-moz-box-shadow"] = cardImage.Style.me()["box-shadow"]));
            f = (style["box-shadow"] && (cardImage.Style.me()["-webkit-box-shadow"] = cardImage.Style.me()["box-shadow"]));
            f = (style["box-radius"] && (cardImage.Style.me()["-moz-box-radius"] = cardImage.Style.me()["box-radius"]));
            f = (style["box-radius"] && (cardImage.Style.me()["-webkit-box-radius"] = cardImage.Style.me()["box-radius"]));
            /*
                        b = style["box-shadow"];
                        if (b)
                        {
                            cardImage.Style.me()["-moz-box-shadow"] = cardImage.Style.me()["box-shadow"];
                            cardImage.Style.me()["-webkit-box-shadow"] = cardImage.Style.me()["box-shadow"];
                        }
                        b = style["box-radius"];
                        if (b)
                        {
                            cardImage.Style.me()["-moz-box-radius"] = cardImage.Style.me()["box-radius"];
                            cardImage.Style.me()["-webkit-box-radius"] = cardImage.Style.me()["box-radius"];
                        }
            */
        }

        private ImageElement cloneImage(ImageElement cardImage)
        {
            var img = new ImageElement();
            img.Src = cardImage.Src;

            return img;

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
            if (gameContext.CanvasInfo.domCanvas.GetAttribute("width") != jQuery.Window.GetWidth().ToString())
                gameContext.CanvasInfo.domCanvas.Attribute("width", (jQuery.Window.GetWidth() * .5).ToString());
            if (gameContext.CanvasInfo.domCanvas.GetAttribute("height") != jQuery.Window.GetHeight().ToString())
                gameContext.CanvasInfo.domCanvas.Attribute("height", jQuery.Window.GetHeight().ToString());
            if (lastMainArea != null)
                drawArea(lastMainArea);
        }

        public void Draw()
        {
            gameContext.CanvasInfo.canvas.Width = gameContext.CanvasInfo.canvas.Width;
            if (lastMainArea != null)
                drawArea(lastMainArea);
        }
    }

    public class PageGameContext
    {
        public PageGameContext(CanvasContext2D context, GameCanvasInformation canvasInfo)
        {
            Context = context;
            CanvasInfo = canvasInfo;
        }

        [IntrinsicProperty]
        public CanvasContext2D Context { get; set; }

        [IntrinsicProperty]
        public GameCanvasInformation CanvasInfo { get; set; }
    }

    public class GameCanvasInformation
    {
        [IntrinsicProperty]
        public CanvasElement canvas { get; set; }

        [IntrinsicProperty]
        public jQueryObject domCanvas { get; set; }
    }
}
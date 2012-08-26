using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonWebLibraries;
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
        public GameInfo gameStuff;
        public Gateway gateway;
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
                    buildSite.devArea.Data.lblHowFast.Text=("How Many: " + (timeValue / numOfTimes));

                    buildSite.codeArea.Data.codeEditor.Information.editor.SetValue(data.Content);
                    buildSite.codeArea.Data.codeEditor.Information.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
                    buildSite.codeArea.Data.codeEditor.Information.editor.Refresh();
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

            Element dvGame;
            jQuery.Select("body").Append(dvGame = Document.CreateElement("div"));
            dvGame.ID = "dvGame";
            dvGame.Style.Left = "50%";
            dvGame.Style.Position = "absolute";
            dvGame.Style.Top = "0";
            dvGame.Style.Right = "0";
            dvGame.Style.Bottom = "0";


            Document.Body.AddEventListener("contextmenu", e =>
                {
                    //e.PreventDefault();
                    //todo: Sspecial right click menu;
                }, false);

            //ie8
            /*   {
                   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;

                   var m = (Action<string, ElementEventHandler>)d2;
                   m("contextmenu", () =>
                       {
                        
                       }); 
               }*/


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

                    var lines = buildSite.codeArea.Data.console.Information.editor.GetValue().Split("\n");
                    lines = (string[])lines.Extract(lines.Length - 40, 40);

                    buildSite.codeArea.Data.console.Information.editor.SetValue(lines.Join("\n") + "\n" + data.Value);
                    buildSite.codeArea.Data.console.Information.editor.SetCursor(buildSite.codeArea.Data.console.Information.editor.LineCount(), 0);
                });


            gateway.On<GameAnswer>("Area.Debug.Break", data =>
                {
                    buildSite.home.Data.loadRoomInfos(data);


                    var cm = buildSite.codeArea.Data.codeEditor;

                    cm.Information.editor.ClearMarker(data.LineNumber);
                    cm.Information.editor.SetMarker(data.LineNumber, "<span style=\"color: #059\">●</span> %N%");
                    cm.Information.editor.SetCursor(data.LineNumber + 15, 0);
                    cm.Information.editor.SetCursor(data.LineNumber - 15, 0);
                    cm.Information.editor.SetCursor(data.LineNumber, 0);
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
                    buildSite.devArea.Data.lblHowFast.Text=("how long: " + time);
                    Window.SetTimeout(() =>
                        {
                            gateway.Emit("Area.Game.AnswerQuestion", new GameAnswerQuestionModel(gameStuff.RoomID, 1), buildSite.devArea.Data.gameServer);
                            buildSite.questionArea.Visible = false;
                            startTime = new DateTime();
                        }, 200);
                });

            gateway.On<string>("Area.Game.UpdateState", data2 =>
                {

                    var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(data2));
                    //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);

                    foreach (var space in data.Spaces)
                    {
                        space.Appearance = fixAppearance(space.Appearance);
                        foreach (var card in space.Pile.Cards)
                        {
                            card.Appearance = fixAppearance(card.Appearance);
                        }
                    }

                    drawArea(data);
                });
            gateway.On<GameRoom>("Area.Game.Started", data =>
                {
                    //alert(JSON.stringify(data));
                });
            gateway.On<string>("Area.Game.GameOver", data => { });
            gateway.On<string>("Area.Debug.GameOver", data => { Window.SetTimeout(() => { buildSite.devArea.Data.beginGame(); }, 1000); });
        }

        private CardGameAppearance fixAppearance(CardGameAppearance appearance)
        {
            return CardGameAppearance.FromJson(appearance);
        }

        public void drawArea(GameCardGame mainArea)
        {

            newDrawArea(mainArea);



            foreach (var ta in mainArea.TextAreas)
            {
                //  gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
                //  gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
            }


        }


        JsDictionary<string, SpaceDrawing> spaces = new JsDictionary<string, SpaceDrawing>();
        JsDictionary<string, CardDrawing> cards = new JsDictionary<string, CardDrawing>();
        private SpaceDrawing findSpace(CardGameTableSpace space)
        {
            string id = "dv_space_" + space.Name;
            if (spaces[id]!=null)
            {
                return spaces[id];
            }
            else
            {
                var sp = Document.CreateElement("div");
                sp.ID = id;
                sp.Style.Position = "absolute";
                jQuery.Select("#dvGame").Append(sp);
                return spaces[id] = new SpaceDrawing(sp);

            }
        }
        private CardDrawing findCard(CardGameTableSpace wantedSpace, CardGameCard card)//todo fix for show face down cards lol typevalue
        {
            string id = "dv_card_" + card.Type + "_" + card.Value;
            var space = findSpace(wantedSpace);

            CardDrawing doc;
            if (cards[id]!=null)
            {
                var m = Document.GetElementById(id);
                if (m.ParentNode != (space.OuterElement))
                {
                    m.ParentNode.RemoveChild(m);
                    space.OuterElement.AppendChild(m);

                }

                doc = cards[id];
            }
            else
            {
                var sp = Document.CreateElement("div");
                sp.ID = id;
                jQuery.FromElement(space.OuterElement).Append(sp);

                var cardImage = cloneImage(cardImages[drawCard(card)]);
                sp.AppendChild(cardImage);
                sp.Style.Position = "absolute";

                 doc = cards[id]=new CardDrawing(sp, cardImage);
            }


            return doc;

 
        }

        string[] resetStyles=new string[]
            {
               "border-radius", 
               "-moz-border-radius", 
               "-webkit-border-radius",
               "box-shadow", 
               "-moz-box-shadow", 
               "transform", 
               "-webkit-transform", 
               "padding", 
               "background-color", 
               "border", 
            };

        private void newDrawArea(GameCardGame mainArea)
        {
            //jQuery.Select("#dvGame").Children().Remove();

            var scale = new Point(jQuery.Select("#dvGame").GetWidth() / mainArea.Size.Width, (jQuery.Document.GetHeight() - 100) / mainArea.Size.Height);
            //ExtensionMethods.debugger(null);
            int l;
            var sl = mainArea.Spaces.Count;
            for (int spaceIndex = 0; spaceIndex < sl; spaceIndex++)
            {
                var space = mainArea.Spaces[spaceIndex];
                var jf = findSpace(space).OuterElement;


                for (int i = 0; i < resetStyles.Length; i++)
                {
                    jf.Style[resetStyles[i]] = null;
                }

                l = space.Pile.Cards.Count;
                for (int index = 0; index < l; index++)
                {
                    var card = space.Pile.Cards[index];
                    var m = findCard(space, card);

                    for (int i = 0; i < resetStyles.Length; i++)
                    {
                        m.OuterElement.Style[resetStyles[i]] = null;
                        m.Image.Style[resetStyles[i]] = null;
                    }
                }
            }
            l = mainArea.Spaces.Count;
            for (int index = 0; index < l; index++)
            {
                var space = mainArea.Spaces[index];
                var vertical = space.Vertical;

                var spaceDiv = findSpace(space);
                // var spaceDivJ = jQuery.FromElement(spaceDiv);

                 
                spaceDiv.OuterElement.Style.Left = (space.X*scale.X).px();
                spaceDiv.OuterElement.Style.Top = (space.Y*scale.Y).px();
                spaceDiv.OuterElement.Style.Width = (space.Width*scale.X).px();
                spaceDiv.OuterElement.Style.Height = (space.Height*scale.Y).px();

                //ExtensionMethods.debugger();
                var cl = space.Appearance.Effects.Count;
                for (int i = 0; i < cl; i++)
                {
                    var effect = space.Appearance.Effects[i];
                    effect.Build(spaceDiv);
                }


                //   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);

                var spaceScale = new Point(space.Width/space.Pile.Cards.Count, space.Height/space.Pile.Cards.Count);

                var j = 0;
                var lc = space.Pile.Cards.Count;
                for (int i = 0; i < lc; i++)
                {
                    var card = space.Pile.Cards[i];
                    var xx = 0.0;
                    var yy = 0.0;

                    switch (space.ResizeType)
                    {
                        case TableSpaceResizeType.Static:
                            if (vertical)
                            {
                                yy = card.Value*scale.Y/2;
                            }
                            else
                            {
                                xx = card.Value*scale.X/2;
                            }

                            break;

                        case TableSpaceResizeType.Grow:
                            xx = (!vertical ? (j*spaceScale.X*scale.X) : 0);
                            yy = (vertical ? (j*spaceScale.Y*scale.Y) : 0);
                            break;
                        default:
                            xx = (!vertical ? (j*spaceScale.X*scale.X) : 0);
                            yy = (vertical ? (j*spaceScale.Y*scale.Y) : 0);

                            break;
                    }


                    var cardDiv = findCard(space, card);
                    xx -= cardDiv.Image.Width/2;
                    yy -= cardDiv.Image.Height/2;

                    //cardDiv.OuterElement.Style["transform"] = 0.0.transformRadius();
                    cardDiv.OuterElement.Style.Left = (xx + (vertical ? space.Width*scale.X/2 : 0)).px();
                    cardDiv.OuterElement.Style.Top = (yy + (!vertical ? space.Height*scale.Y/2 : 0)).px();
                    cardDiv.OuterElement.Style["transform"] = space.Appearance.InnerStyle.Rotate.transformRadius();


                    styleAppearanceFromSpace(cardDiv, j, space);
                    styleAppearance(cardDiv, card.Appearance);

                    cardDiv.Image.Style["border-radius"] = "5px";
                    cardDiv.Image.Style["box-shadow"] = "3px 3px 2px #2c2c2c";

                    FixBrowserPrefixes(cardDiv.OuterElement.Style);
                    FixBrowserPrefixes(cardDiv.Image.Style);


                    //                    spaceDiv.AppendChild(cardDiv);

                    j++;

                    //effects
                }

                var el = space.Appearance.Effects.Count;
                for (int i = 0; i < el; i++)
                {
                    var effect = space.Appearance.Effects[i];
                    effect.TearDown(spaceDiv);
                }
            }


            /*   foreach (var space in mainArea.Spaces)
            {
                setStyle(findSpace(space).OuterElement.Style, findSpace(space).OuterElement.Style);
                foreach (var card in space.Pile.Cards)
                {
                    var m = findCard(space, card);
                    setStyle(findSpace(space).OuterElement.Style, findSpace(space).OuterElementStyle);

                    m.ImageStyle = new MyStyle();
                    m.OuterElementStyle = new MyStyle();

                }
            }*/



            /*

            foreach (var ta in mainArea.TextAreas)
            {
                gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
                gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
            }*/


        }

      /*  private void setStyle(Style style, MyStyle myStyle)
        {
            string item="";
            ExtensionMethods.ForInItem(style);
            {
                if(myStyle[item]!=null)
                {
                    style[item] = myStyle[item];
                }else
                {
                    style[item] = null;
                }
            }
            ExtensionMethods.CloseForIn();
        }*/

        private void styleAppearanceFromSpace(CardDrawing element, int cardIndex, CardGameTableSpace space)
        {
            CardGameAppearance appearance = space.Appearance;
            foreach (var cardGameAppearanceEffect in appearance.Effects)
            {

                //   cardGameAppearanceEffect.Build(element.Item1);

                switch (cardGameAppearanceEffect.Type)
                {

                    case EffectType.Bend:

                        var bEffect = cardGameAppearanceEffect.castValue<CardGameAppearanceEffectBend>();

                        //rotate
                        string trans = element.OuterElement.Style["transform"];

                        if (trans.StartsWith("rotate("))
                        {
                            element.OuterElement.Style["transform"] = (((-bEffect.Degrees / 2 + bEffect.Degrees / (space.Pile.Cards.Count - 1) * cardIndex) + trans.noTransformRadius())).transformRadius();
                        }
                        else
                        {
                            element.OuterElement.Style["transform"] = appearance.InnerStyle.Rotate.transformRadius();
                        }


                        break;

                }
            }



            element.Image.Style.BackgroundColor = appearance.InnerStyle.BackColor;
        }


        private void styleAppearance(CardDrawing element, CardGameAppearance appearance)
        {


            foreach (var cardGameAppearanceEffect in appearance.Effects)
            {
                cardGameAppearanceEffect.Build(element);
                //new object().debugger();
                cardGameAppearanceEffect.TearDown(element);
            }

            //rotate
            string trans = element.OuterElement.Style["transform"];

            if (trans.StartsWith("rotate("))
            {
                element.OuterElement.Style["transform"] = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate + int.Parse(trans.Replace("rotate(", "").Replace("deg)", "")));//todo regex??
            }
            else
            {
                element.OuterElement.Style["transform"] = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate);
            }

            element.Image.Style.BackgroundColor = appearance.InnerStyle.BackColor;
        }

        public void FixBrowserPrefixes(Style cardImage)//todo static method
        {
             

            if (cardImage["transform"] != null)
            {
                cardImage["-webkit-transform"] = cardImage["transform"];
            }
            if (cardImage["box-shadow"] != null)
            {
                cardImage["-moz-box-shadow"] = cardImage["box-shadow"];
                cardImage["-webkit-box-shadow"] = cardImage["box-shadow"];
            }
            if (cardImage["border-radius"] != null)
            {
                cardImage["-moz-border-radius"] = cardImage["box-shadow"];
                cardImage["-webkit-border-radius"] = cardImage["box-shadow"];
            }


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

        /*public void ResizeCanvas(jQueryEvent jQueryEvent)
        {
            if (lastMainArea != null)
                drawArea(lastMainArea);
        }

        public void Draw()
        {
            if (lastMainArea != null)
                drawArea(lastMainArea);
        }*/
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
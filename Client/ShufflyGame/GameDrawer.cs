using System.Collections.Generic;
using System.Html;
using CommonLibraries;
using global;
using jQueryApi;
namespace Client.ShufflyGame
{
    public class GameDrawer
    {
        private JsDictionary<string, ImageElement> cardImages;
        public JsDictionary<string, CardDrawing> cards = new JsDictionary<string, CardDrawing>();
        private string[] resetStyles = new string[] {
                                                            "border-radius",
                                                            "-moz-border-radius",
                                                            "left",
                                                            "top",
                                                            "-webkit-border-radius",
                                                            "box-shadow",
                                                            "-moz-box-shadow",
                                                            "transform",
                                                            "-webkit-transform",
                                                            "padding",
                                                            "background-color",
                                                            "border",
                                                    };
        public JsDictionary<string, SpaceDrawing> spaces = new JsDictionary<string, SpaceDrawing>();

        public GameDrawer()
        {
            cardImages = new JsDictionary<string, ImageElement>();
            for (var i = 101; i < 153; i++) {
                var img = new ImageElement();
                var domain = IPs.WebIP + "assets";
                var src = domain + "/cards/" + i;
                string jm;
                img.Src = jm = src + ".gif";
                cardImages[jm] = img;
            }
        }

        public void Draw(GameCardGame data)
        {
            foreach (var space in data.Spaces) {
                space.Appearance = fixAppearance(space.Appearance);
                foreach (var card in space.Pile.Cards) {
                    card.Appearance = fixAppearance(card.Appearance);
                }
            }
            drawArea(data);
        }

        private CardGameAppearance fixAppearance(CardGameAppearance appearance)
        {
            return CardGameAppearance.FromJson(appearance);
        }

        public void drawArea(GameCardGame mainArea)
        {
            newDrawArea(mainArea);

            foreach (var ta in mainArea.TextAreas) {
                //  gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
                //  gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
            }
        }

        private SpaceDrawing findSpace(CardGameTableSpace space)
        {
            string id = "dv_space_" + space.Name;
            if (spaces[id] != null)
                return spaces[id];
            else {
                var sp = Document.CreateElement("div");
                sp.ID = id;
                sp.Style.Position = "absolute";
                jQuery.Select("#dvGame").Append(sp);
                return spaces[id] = new SpaceDrawing(sp);
            }
        }

        private CardDrawing findCard(CardGameTableSpace wantedSpace, CardGameCard card) //todo fix for show face down cards lol typevalue
        {
            string id = "dv_card_" + card.Type + "_" + card.Value;
            var space = findSpace(wantedSpace);

            CardDrawing doc;
            if (cards[id] != null) {
                var m = Document.GetElementById(id);
                if (m.ParentNode != ( space.OuterElement )) {
                    m.ParentNode.RemoveChild(m);
                    space.OuterElement.AppendChild(m);
                }

                doc = cards[id];
            } else {
                var sp = Document.CreateElement("div");
                sp.ID = id;
                jQuery.FromElement(space.OuterElement).Append(sp);

                var cardImage = cloneImage(cardImages[drawCard(card)]);
                sp.AppendChild(cardImage);
                sp.Style.Position = "absolute";

                doc = cards[id] = new CardDrawing(sp);
            }

            return doc;
        }

        private void newDrawArea(GameCardGame mainArea)
        {
            //jQuery.Select("#dvGame").Children().Remove();

            var scale = new Point(Document.DocumentElement.ClientWidth / mainArea.Size.Width * .9, ( Document.DocumentElement.ClientHeight - 250 ) / mainArea.Size.Height * .9);
            //ExtensionMethods.debugger(null); 
            /*
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
            */

            foreach (var space in mainArea.Spaces) {
                var vertical = space.Vertical;

                var spaceDiv = findSpace(space);
                // var spaceDivJ = jQuery.FromElement(spaceDiv);

                //ExtensionMethods.debugger();
                var cl = space.Appearance.Effects.Count;
                for (int i = 0; i < cl; i++) {
                    var effect = space.Appearance.Effects[i];
                    effect.Build(spaceDiv);     
                }

                spaceDiv.OuterElementStyle.Width = ( space.Width * scale.X ).px();
                spaceDiv.OuterElementStyle.Height = ( space.Height * scale.Y ).px();

                //   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);

                var spaceScale = new Point(space.Width / space.Pile.Cards.Count, space.Height / space.Pile.Cards.Count);

                var j = 0;
                var numOfCards = space.Pile.Cards.Count;
                for (int i = 0; i < numOfCards; i++) {
                    var card = space.Pile.Cards[i];
                    var xx = 0.0;
                    var yy = 0.0;

                    switch (space.ResizeType) {
                        case TableSpaceResizeType.Static:
                            if (vertical)
                                yy = card.Value * scale.Y / 2;
                            else
                                xx = card.Value * scale.X / 2;

                            break;

                        case TableSpaceResizeType.Grow:
                            xx = ( !vertical ? ( j * spaceScale.X * scale.X ) : 0 );
                            yy = ( vertical ? ( j * spaceScale.Y * scale.Y ) : 0 );
                            break;
                        default:
                            xx = ( !vertical ? ( j * spaceScale.X * scale.X ) : 0 );
                            yy = ( vertical ? ( j * spaceScale.Y * scale.Y ) : 0 );

                            break;
                    }

                    var cardDiv = findCard(space, card);
                    xx -= cardDiv.OuterElementStyle.Width.nopx() / 2;
                    yy -= cardDiv.OuterElementStyle.Height.nopx() / 2;
                    cardDiv.OuterElementStyle.BorderRadius = "5px";
                    cardDiv.OuterElementStyle.BoxShadow = "3px 3px 2px #2c2c2c";

                    styleAppearanceFromSpace(cardDiv, j, space);
                    styleAppearance(cardDiv, card.Appearance);

                    spaceDiv.OuterElementStyle.Left = ( ( space.X ) * scale.X ).px();
                    spaceDiv.OuterElementStyle.Top = ( ( space.Y ) * scale.Y ).px();

                    //cardDiv.OuterElement.Style["transform"] = 0.0.TransformRotate();
                    cardDiv.OuterElementStyle.Left = ( xx + ( vertical ? space.Width * scale.X / 2 : 0 ) ).px();
                    cardDiv.OuterElementStyle.Top = ( yy + ( !vertical ? space.Height * scale.Y / 2 : 0 ) ).px();
                    cardDiv.OuterElementStyle.Transform = space.Appearance.InnerStyle.Rotate.TransformRotate();

                    cardDiv.OuterElementStyle.SetStyle(cardDiv.OuterElement);

                    FixBrowserPrefixes(cardDiv.OuterElement.Style);
                    //                    spaceDiv.AppendChild(cardDiv);

                    j++;

                    //effects
                }

                var el = space.Appearance.Effects.Count;
                for (int i = 0; i < el; i++) {
                    var effect = space.Appearance.Effects[i];
                    effect.TearDown(spaceDiv);
                }
            }

            foreach (var space in mainArea.Spaces) {
                findSpace(space).OuterElementStyle.SetStyle(findSpace(space).OuterElement);

                foreach (var card in space.Pile.Cards) {
                    //   
                    var m = findCard(space, card);
                    findSpace(space).OuterElementStyle.SetStyle(findSpace(space).OuterElement);

                    /*
                                        m.ImageStyle = new MyStyle();
                                        m.OuterElementStyle = new MyStyle();
                    */
                }
            }

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
            foreach (var cardGameAppearanceEffect in appearance.Effects) {
                //   cardGameAppearanceEffect.Build(element.Item1);

                switch (cardGameAppearanceEffect.Type) {
                    case EffectType.Bend:

                        var bEffect = (CardGameAppearanceEffectBend) cardGameAppearanceEffect;

                        //rotate
                        string trans = element.OuterElementStyle.Transform;

                        if (( trans ?? "" ).StartsWith("rotate("))
                            element.OuterElementStyle.Transform = ( ( ( -bEffect.Degrees / 2 + bEffect.Degrees / ( space.Pile.Cards.Count - 1 ) * cardIndex ) + trans.NoTransformRotate() ) ).TransformRotate();
                        else
                            element.OuterElementStyle.Transform = appearance.InnerStyle.Rotate.TransformRotate();

                        break;
                }
            }

            element.OuterElementStyle.BackgroundColor = appearance.InnerStyle.BackColor;
        }

        private void styleAppearance(CardDrawing element, CardGameAppearance appearance)
        {
            foreach (var cardGameAppearanceEffect in appearance.Effects) {
                cardGameAppearanceEffect.Build(element);
                //new object().debugger();
                cardGameAppearanceEffect.TearDown(element);
            }

            //rotate
            string trans = element.OuterElementStyle.Transform;

            if (( trans ?? "" ).StartsWith("rotate("))
                element.OuterElementStyle.Transform = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate + int.Parse(trans.Replace("rotate(", "").Replace("deg)", ""))); //todo regex??
            else
                element.OuterElementStyle.Transform = string.Format("rotate({0}deg)", appearance.InnerStyle.Rotate);

            element.OuterElementStyle.BackgroundColor = appearance.InnerStyle.BackColor;
        }

        public void FixBrowserPrefixes(Style cardImage) //todo static method
        {
            if (cardImage["transform"] != null)
                cardImage["-webkit-transform"] = cardImage["transform"];
            if (cardImage["box-shadow"] != null) {
                cardImage["-moz-box-shadow"] = cardImage["box-shadow"];
                cardImage["-webkit-box-shadow"] = cardImage["box-shadow"];
            }
            if (cardImage["border-radius"] != null) {
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
            var domain = IPs.WebIP + "assets";
            src = domain + "/cards/" + ( 100 + ( card.Value + 1 ) + ( card.Type ) * 13 );
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

        public void ClearCache()
        {
            cards = new JsDictionary<string, CardDrawing>();
            spaces = new JsDictionary<string, SpaceDrawing>();
        }

        public void Init()
        {
            ClearCache();

            jQuery.Select("#dvGame").Width("100%");
            jQuery.Select("#dvGame").Height("100%");
            jQuery.Select("#dvGame").Empty();


        }
    }
}
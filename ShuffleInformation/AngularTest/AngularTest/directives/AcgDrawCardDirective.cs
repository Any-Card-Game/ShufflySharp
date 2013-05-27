using System;
using System.Collections.Generic;
using System.Html;
using Client.Angular.controllers;
using Client.Angular.interfaces;
using global;
using jQueryApi;
using ng;
namespace Client.Angular.directives
{
  


    public class AcgDrawCardDirective
    {
        public Action<CardScope, jQueryObject, object> link;
        public AcgDrawCardDirective()
        {
            link = linkFn;

        }

        private void linkFn(CardScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("style", "width:71px; height:96px;");
            element.Attribute("class", "card" + scope.Card.Type + "-" + scope.Card.Value + "");


            Action redrawCard = () =>
            {

                var spaceScale = new { width = scope.Space.Width / scope.Space.Pile.Cards.Count, height = scope.Space.Height / scope.Space.Pile.Cards.Count };

                var vertical = scope.Space.Vertical;
                var cardIndex = scope.Space.Pile.Cards.IndexOf(scope.Card);
                //console.log("watched", scope.space.name, cardIndex);

                scope.CardStyle = new { };

                var xx = 0.0;
                var yy = 0.0;

                switch (scope.Space.ResizeType)
                {
                    case TableSpaceResizeType.Static:
                        if (vertical)
                            yy = scope.Card.Value * scope.Scale.Y / 2;
                        else
                            xx = scope.Card.Value * scope.Scale.X / 2;

                        break;
                    case TableSpaceResizeType.Grow:
                        xx = (!vertical ? (cardIndex * spaceScale.width * scope.Scale.X) : 0);
                        yy = (vertical ? (cardIndex * spaceScale.height * scope.Scale.Y) : 0);
                        break;
                    default:
                        xx = (!vertical ? (cardIndex * spaceScale.width * scope.Scale.X) : 0);
                        yy = (vertical ? (cardIndex * spaceScale.height * scope.Scale.Y) : 0);
                        break;
                }

                xx -= 71 / 2;
                yy -= 96 / 2;

                scope.CardStyle.position = "absolute";
                scope.CardStyle.zIndex = cardIndex;
                scope.CardStyle.borderRadius = "5px";
                scope.CardStyle.left = (xx + (vertical ? scope.Space.Width * scope.Scale.X / 2 : 0));
                scope.CardStyle.top = (yy + (!vertical ? scope.Space.Height * scope.Scale.Y / 2 : 0));
                scope.CardStyle.transform = "rotate(" + scope.Space.Appearance.InnerStyle.Rotate + "deg)";

                scope.CardStyle.content = "\"\"";


                if (scope.Space.Name.StartsWith("User")) {
                    if (scope.Card.Appearance.Effects.Count==0) 
                    scope.Card.Appearance.Effects.Add(new CardGameAppearanceEffectBend(new CardGameEffectBendOptions() { Degrees = 15 }));
                    
                }

                foreach (var effect in scope.Card.Appearance.Effects)
                {
                    switch (effect.Type)
                    {
                        case EffectType.Highlight:
                            Window.Alert("type " + effect.Type.ToString());
                            break;
                        case EffectType.Rotate:
                            Window.Alert("type " + effect.Type.ToString());
                            break;
                        case EffectType.Bend:
                            var bEffect = ((CardGameAppearanceEffectBend)effect);


                            var trans = (string)scope.CardStyle.transform;
                            if ((trans ?? "").StartsWith("rotate("))
                                scope.CardStyle.transform = TransformRotate(((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(trans)));
                            else
                                scope.CardStyle.transform = TransformRotate(scope.Space.Appearance.InnerStyle.Rotate);


                            break;
                        case EffectType.StyleProperty:
                            Window.Alert("type " + effect.Type.ToString());
                            break;
                        case EffectType.Animated:
                            Window.Alert("type " + effect.Type.ToString());
                            break;
                        default:
                            Window.Alert("type " + effect.Type.ToString());
                            break;
                    }
                }



                JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
                if (Math.Random() * 200 < 50)
                {

                    beforeStyle["display"] = "block";
                    beforeStyle["position"] = "relative";
                    beforeStyle["z-index"] = "-1";
                    beforeStyle["width"] = "100%";
                    beforeStyle["height"] = "100%";
                    beforeStyle["left"] = "-5px";
                    beforeStyle["top"] = "-5px";
                    beforeStyle["padding"] = "5px";
                    beforeStyle["border-radius"] = "5px";
                    beforeStyle["box-shadow"] = "rgb(44, 44, 44) 3px 3px 2px";
                    beforeStyle["background"] = "rgba(0, 12, 58, 0.231373)";
                    beforeStyle["border"] = "2px solid black";

                    ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", beforeStyle);
                }

                JsDictionary<string, string> keys = new JsDictionary<string, string>() { };
                keys["content"] = "url('assets/cards/" + (100 + (scope.Card.Value + 1) + (scope.Card.Type) * 13) + ".gif')";
                ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", keys);


            };

            scope.watch("space.pile.cards", redrawCard, true);

            redrawCard();
        }
        public static string TransformRotate(double ar)
        {
            return string.Format("rotate({0}deg)", ar);
        }

        public static double NoTransformRotate(string ar)
        {
            return double.Parse(ar.Replace("rotate(", "").Replace("deg)", "")); //todo regex??
        }

        private static void ChangeCSS(string myClass, JsDictionary<string, string> values)
        {
            myClass = "." + myClass;
            string CSSRules = "";
            var document = (dynamic)Script.Eval("window.document");
            if (document.all)
                CSSRules = "rules";
            else if (document.getElementById)
                CSSRules = "cssRules";
            for (var a = 0; a < document.styleSheets.length; a++)
            {
                for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++)
                {
                    if (document.styleSheets[a][CSSRules][i].selectorText == myClass)
                    {
                        foreach (var m in values)
                        {
                            document.styleSheets[a][CSSRules][i].style[m.Key] = m.Value;
                        }
                    }
                }
            }

        }
    }
    public class AcgDrawSpaceDirective
    {
        public Action<SpaceScope, jQueryObject, object> link;
        public AcgDrawSpaceDirective()
        {
            link = linkFn;

        }

        private void linkFn(SpaceScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("class", "space" + scope.Space.Name);

            JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
            beforeStyle["display"] = "block";
            beforeStyle["position"] = "relative";
            beforeStyle["z-index"] = "-1";
            beforeStyle["width"] = "100%";
            beforeStyle["height"] = "100%";
            beforeStyle["left"] = "-50px";
            beforeStyle["top"] = "-50px";
            beforeStyle["padding"] = "50px";
            beforeStyle["border-radius"] = "15px";
            beforeStyle["box-shadow"] = "rgb(51, 51, 51) 4px 4px 2px";
            beforeStyle["content"] = "\"\"";
            beforeStyle["background"] = "rgba(112, 12, 58, 0.231373)";
            ChangeCSS("space" + scope.Space.Name + "::before", beforeStyle);

            scope.SpaceStyle = new { };



            scope.SpaceStyle.position = "absolute";
            scope.SpaceStyle.left = scope.Space.X * scope.Scale.X;
            scope.SpaceStyle.top = scope.Space.Y * scope.Scale.Y;

            scope.SpaceStyle.width = scope.Space.Width * scope.Scale.X;
            scope.SpaceStyle.height = scope.Space.Height * scope.Scale.Y;
            scope.SpaceStyle.backgroundColor = "red";



            foreach (var effect in scope.Space.Appearance.Effects)
            {
                switch (effect.Type)
                {
                    case EffectType.Highlight:
                        var hEffect = ((CardGameAppearanceEffectHighlight)effect);
                        scope.SpaceStyle.padding = string.Format("{0} {0} {0} {0}", hEffect.Radius);
                        scope.SpaceStyle.backgroundColor = hEffect.Color;
                        scope.SpaceStyle.border = "solid 2px black";
                        scope.SpaceStyle.borderRadius = 15.0;
                        scope.SpaceStyle.boxShadow = "4px 4px 2px #333";
                        break;
                    case EffectType.Rotate:
                        Window.Alert(effect.Type.ToString());
                        break;
                    case EffectType.Bend:
                        var bEffect = (CardGameAppearanceEffectBend)effect;

                        //rotate


                        break;
                    case EffectType.StyleProperty:
                        Window.Alert(effect.Type.ToString());
                        break;
                    case EffectType.Animated:
                        Window.Alert(effect.Type.ToString());
                        break;
                    default:

                        break;
                }
            }

        }
        public static string TransformRotate(double ar)
        {
            return string.Format("rotate({0}deg)", ar);
        }

        private static void ChangeCSS(string myClass, JsDictionary<string, string> values)
        {
            myClass = "." + myClass;
            string CSSRules = "";
            var document = (dynamic)Script.Eval("window.document");
            if (document.all)
                CSSRules = "rules";
            else if (document.getElementById)
                CSSRules = "cssRules";
            for (var a = 0; a < document.styleSheets.length; a++)
            {
                for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++)
                {
                    if (document.styleSheets[a][CSSRules][i].selectorText == myClass)
                    {
                        foreach (var m in values)
                        {
                            document.styleSheets[a][CSSRules][i].style[m.Key] = m.Value;
                        }
                    }
                }
            }

        }
    }

}

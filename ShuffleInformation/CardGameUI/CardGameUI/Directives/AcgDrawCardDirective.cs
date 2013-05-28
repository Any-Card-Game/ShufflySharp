using System;
using System.Collections.Generic;
using System.Html;
using System.Text.RegularExpressions;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using CommonLibraries;
using global;
using jQueryApi;
namespace CardGameUI.Directives
{



    public class AcgDrawCardDirective
    {
        private readonly EffectManagerService myEffectManager;
        public Action<CardScope, jQueryObject, object> link;
        public AcgDrawCardDirective(EffectManagerService effectManager)
        {
            myEffectManager = effectManager;
            link = linkFn;
        }

        private void linkFn(CardScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("style", "width:71px; height:96px;");
            element.Attribute("class", "card card" + scope.Card.Type + "-" + scope.Card.Value + "");


            scope.watch("$parent.$parent.selectedCard",
                        () =>
                        {
                            if (scope.Parent.Parent.SelectedCard == null || scope.Parent.Parent.SelectedCard != scope.Card)
                            {
                                scope.CardStyle.border = Script.Undefined;

                            }
                            else
                            {

                                scope.CardStyle.border = "solid 4px green";
                            }
                        });

            scope.CardClick = () =>
            {
                if (scope.Parent.Parent.SelectedCard == scope.Card)
                {
                    scope.Parent.Parent.SelectedCard = null;
                }
                else
                {
                    scope.Parent.Parent.SelectedCard = scope.Card;

                }
            };
            Action redrawCard = () =>
            {

                var spaceScale = new { width = scope.Parent.Space.Width / scope.Parent.Space.Pile.Cards.Count, height = scope.Parent.Space.Height / scope.Parent.Space.Pile.Cards.Count };

                var vertical = scope.Parent.Space.Vertical;
                var cardIndex = scope.Parent.Space.Pile.Cards.IndexOf(scope.Card);

                scope.CardStyle = new { };

                var xx = 0.0;
                var yy = 0.0;

                switch (scope.Parent.Space.ResizeType)
                {
                    case TableSpaceResizeType.Static:
                        if (vertical)
                            yy = scope.Card.Value * scope.Parent.Parent.Scale.Y / 2;
                        else
                            xx = scope.Card.Value * scope.Parent.Parent.Scale.X / 2;

                        break;
                    case TableSpaceResizeType.Grow:
                        xx = (!vertical ? (cardIndex * spaceScale.width * scope.Parent.Parent.Scale.X) : 0);
                        yy = (vertical ? (cardIndex * spaceScale.height * scope.Parent.Parent.Scale.Y) : 0);
                        break;
                    default:
                        xx = (!vertical ? (cardIndex * spaceScale.width * scope.Parent.Parent.Scale.X) : 0);
                        yy = (vertical ? (cardIndex * spaceScale.height * scope.Parent.Parent.Scale.Y) : 0);
                        break;
                }

                xx -= 71 / 2;
                yy -= 96 / 2;

                scope.CardStyle.position = "absolute";
                scope.CardStyle.zIndex = cardIndex;
                scope.CardStyle.borderRadius = "5px";
                scope.CardStyle.left = (xx + (vertical ? scope.Parent.Space.Width * scope.Parent.Parent.Scale.X / 2 : 0));
                scope.CardStyle.top = (yy + (!vertical ? scope.Parent.Space.Height * scope.Parent.Parent.Scale.Y / 2 : 0));
                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";

                scope.CardStyle.content = "\"\"";


                if (scope.Parent.Space.Name.StartsWith("User"))
                {

                    if (scope.Card.Appearance.Effects.Count == 0)
                        scope.Card.Appearance.Effects.Add(new CardGameAppearanceEffectBend(new CardGameEffectBendOptions() { Degrees = 15 }));

                }
                else
                {
                    for (var index = scope.Card.Appearance.Effects.Count - 1; index >= 0; index--)
                    {
                        var cardGameAppearanceEffect = scope.Card.Appearance.Effects[index];
                        if (cardGameAppearanceEffect.Type == EffectType.Bend)
                            scope.Card.Appearance.Effects.Remove(cardGameAppearanceEffect);
                    }
                }


                foreach (var effect in scope.Card.Appearance.EffectNames)
                {
                    Effect grabbedEffect = myEffectManager.GetEffectByName(effect);
                    if (grabbedEffect == null)
                    {
                        continue;
                    }
                    switch (grabbedEffect.Type)
                    {
                        case EffectType2.Highlight:

                            var _effect = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions()
                            {
                                Color = grabbedEffect.GetPropertyByName<string>("color"),
                                Radius = grabbedEffect.GetPropertyByName<double>("radius"),
                                Rotate = grabbedEffect.GetPropertyByName<double>("rotate"),
                                OffsetX = grabbedEffect.GetPropertyByName<double>("offsetx"),
                                OffsetY = grabbedEffect.GetPropertyByName<double>("offsety"),
                                Opacity = grabbedEffect.GetPropertyByName<double>("opacity"),
                            });

                            JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
                            beforeStyle["display"] = "block";
                            beforeStyle["position"] = "relative";
                            beforeStyle["z-index"] = "-1";
                            beforeStyle["width"] = "100%";
                            beforeStyle["height"] = "100%";
                            beforeStyle["left"] = (-_effect.Radius + _effect.OffsetX) + "px";
                            beforeStyle["top"] = (-_effect.Radius + _effect.OffsetY) + "px";
                            beforeStyle["padding"] = (_effect.Radius) + "px";
                            beforeStyle["border-radius"] = "5px";
                            beforeStyle["box-shadow"] = "rgb(44, 44, 44) 3px 3px 2px";
                            var color = hextorgb(_effect.Color);

                            beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", color.R, color.G, color.B, _effect.Opacity);
                            beforeStyle["border"] = "2px solid black";

                            ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", beforeStyle);




                            break;
                        case EffectType2.Rotate:
                            break;
                        case EffectType2.Bend:




                            var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
                            {
                                Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
                            }));

                            var trans = (string)scope.CardStyle["-webkit-transform"];
                            if ((trans ?? "").StartsWith("rotate("))
                                scope.CardStyle["-webkit-transform"] = TransformRotate(((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Parent.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(trans)));
                            else
                                scope.CardStyle["-webkit-transform"] = TransformRotate(scope.Parent.Space.Appearance.InnerStyle.Rotate);
                            break;
                        case EffectType2.StyleProperty:
                            break;
                        case EffectType2.Animated:
                            break;
                    }
                }




                /*                foreach (var effect in scope.Card.Appearance.Effects)
                                {
                                    switch (effect.Type)
                                    {
                                        case EffectType.Highlight:
                            
                                            var hEffect = ((CardGameAppearanceEffectHighlight)effect);

                            
                                JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
                                beforeStyle["display"] = "block";
                                beforeStyle["position"] = "relative";
                                beforeStyle["z-index"] = "-1";
                                beforeStyle["width"] = "100%";
                                beforeStyle["height"] = "100%";
                                beforeStyle["left"] = (-hEffect.Radius+hEffect.OffsetX)+"px";
                                beforeStyle["top"] = (-hEffect.Radius + hEffect.OffsetY) + "px";
                                beforeStyle["padding"] = (hEffect.Radius) + "px";
                                beforeStyle["border-radius"] = "5px";
                                beforeStyle["box-shadow"] = "rgb(44, 44, 44) 3px 3px 2px";
                                            var color = hextorgb(hEffect.Color);

                                            beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", color.R, color.G, color.B, hEffect.Opacity);
                                beforeStyle["border"] = "2px solid black";

                                ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", beforeStyle);



                                            break;
                                        case EffectType.Rotate:
                                            Window.Alert("type " + effect.Type.ToString());
                                            break;
                                        case EffectType.Bend:
                                            var bEffect = ((CardGameAppearanceEffectBend)effect);

                                            var trans = (string)scope.CardStyle["-webkit-transform"];
                                            if ((trans ?? "").StartsWith("rotate("))
                                                scope.CardStyle["-webkit-transform"] = TransformRotate(((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Parent.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(trans)));
                                            else
                                                scope.CardStyle["-webkit-transform"] = TransformRotate(scope.Parent.Space.Appearance.InnerStyle.Rotate);
                                            Console.Log("bending " + scope.Parent.Space.Name + " " + scope.CardStyle["-webkit-transform"]);


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
                */


           
            };
            JsDictionary<string, string> keys = new JsDictionary<string, string>() { };
            keys["content"] = "url('assets/cards/" + (100 + (scope.Card.Value + 1) + (scope.Card.Type) * 13) + ".gif')";
            ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", keys);



            scope.watch("$parent.space.pile.cards", () =>
            {
                Console.Log("a");
                redrawCard();
            }, true);
            scope.watch("card.appearance.effectNames", () =>
            {
                Console.Log("b");
                redrawCard();
            }, true);
            scope.watch<CardScope>((_scope) =>
            {

                List<Effect> effects = new List<Effect>();

                foreach (var ef in _scope.Card.Appearance.EffectNames)
                {
                    var _ef = myEffectManager.GetEffectByName(ef);
                    effects.Add(_ef);
                }
                return effects;
            }, () => {
                Console.Log("c");
                   redrawCard();
               }, true);


            redrawCard();
        }
        public static dynamic hextorgb(string hex)
        {

            var result = new Regex(@"^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$").Exec(hex);
            return result != null ? new
            {
                R = int.Parse(result[1], 16),
                G = int.Parse(result[2], 16),
                B = int.Parse(result[3], 16)
            } : null;


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
}

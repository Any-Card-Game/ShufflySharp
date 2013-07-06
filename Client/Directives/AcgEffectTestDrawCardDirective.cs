using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Client.Scope;
using Client.Scope.Directive;
using Client.Services;
using CommonLibraries;
using Models.SiteManagerModels.Game;
using global;
using jQueryApi;
using EffectType = Models.SiteManagerModels.Game.EffectType;

namespace Client.Directives
{



    public class AcgEffectTestDrawCardDirective
    {
        public Action<EffectTestCardScope, jQueryObject, object> link;

        public AcgEffectTestDrawCardDirective()
        {
            link = linkFn;
        }

        private void linkFn(EffectTestCardScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("style", "width:71px; height:96px;");
            element.Attribute("class", "card " + string.Format("card{0}-{1}", scope.Card.Type, scope.Card.Value));

            var test = scope.Test;
            GameSpaceModel space=null;
            switch (test)
            {
                case EffectTestType.Card:
                    space = scope.Model.CardTest.Space;
                    break;
                case EffectTestType.Space:
                    space = scope.Model.SpaceTest.Space;
                    break;
                
            }
            Action redrawCard = () =>
                                {

                                    Point scale;
                                    int cardIndex;
                                    Point spaceScale;
                                    if (test == EffectTestType.Card)
                                    {

                                        scale = scope.Model.Scale;

                                        var cardCount = 1;

                                        spaceScale = new Point(space.Width, space.Height);
                                          cardIndex = cardCount;

                                    }
                                    else
                                    {

                                          scale = scope.Model.Scale;

                                        var cards = scope.Model.SpaceTest.Cards;

                                        spaceScale = new Point(space.Width / (cards.Count - 1), space.Height / (cards.Count - 1));
                                          cardIndex = cards.IndexOf(scope.Card);

                                    }
                                    var vertical = space.Vertical;


                                    scope.CardStyle = new {};

                                    var xx = 0.0;
                                    var yy = 0.0;


                                    switch (space.LayoutType)
                                    {
                                        case GameSpaceLayoutType.Static:
                                            if (vertical)
                                                yy = ((scope.Card.Value + 1) / 13.0) * space.Height * scale.Y;
                                            else
                                                xx = ((scope.Card.Value + 1)/13.0)*space.Width*scale.X;
                                            break;
                                        case GameSpaceLayoutType.Grow:
                                            xx = (!vertical ? (cardIndex*spaceScale.X*scale.X) : 0);
                                            yy = (vertical ? (cardIndex*spaceScale.Y*scale.Y) : 0);
                                            break;
                                        default:
                                            xx = (!vertical ? (cardIndex*spaceScale.X*scale.X) : 0);
                                            yy = (vertical ? (cardIndex*spaceScale.Y*scale.Y) : 0);
                                            break;
                                    }

                                    xx -= 71/2;
                                    yy -= 96/2;

                                    scope.CardStyle.position = "absolute";
                                    scope.CardStyle.zIndex = cardIndex;
                                    scope.CardStyle.borderRadius = "5px";
                                    scope.CardStyle.left = (xx + (vertical ? space.Width * scale.X / 2 : 0));
                                    scope.CardStyle.top = (yy + (!vertical ? space.Height * scale.Y / 2 : 0));

                                    if (test == EffectTestType.Card)
                                    {
                                        scope.CardStyle.left += space.Left * scale.X;
                                        scope.CardStyle.top += space.Top * scale.Y;
                                    }
                                    //                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";
                                    //                element.me().rotate(space.Appearance.InnerStyle.Rotate);
                                    scope.CardStyle.content = "\"\"";


                                };
            JsDictionary<string, string> keys;
            scope.watch("model.selection.selectedEffect", () =>
                                                          {
                                                              if (test != EffectTestType.Card) return;
                                                              PurgeCSS(string.Format("card{0}-{1}::before", scope.Card.Type, scope.Card.Value));

                                                              keys = new JsDictionary<string, string>() {};
                                                              keys["content"] =
                                                                  string.Format("url('{1}assets/cards/{0}.gif')",
                                                                      (100 + (scope.Card.Value + 1) +
                                                                       (scope.Card.Type)*13), Constants.ContentAddress);
                                                              ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", keys);

                                                              var effect = scope.Model.Selection.SelectedEffect;
                                                              if (effect == null) return;

                                                              switch (effect.Type)
                                                              {
                                                                  case EffectType.Highlight:


                                                                      var color = effect.GetString("color");
                                                                      var radius = effect.GetNumber("radius");
                                                                      var rotate = effect.GetNumber("rotate");
                                                                      var offsetX = effect.GetNumber("offsetx");
                                                                      var offsetY = effect.GetNumber("offsety");
                                                                      var opacity = effect.GetNumber("opacity");


                                                                      JsDictionary<string, string> beforeStyle =new JsDictionary<string, string>();
                                                                      beforeStyle["display"] = "block";
                                                                      beforeStyle["position"] = "relative";
                                                                      beforeStyle["z-index"] = "-1";
                                                                      beforeStyle["width"] = "100%";
                                                                      beforeStyle["height"] = "100%";
                                                                      beforeStyle["left"] = (-radius + offsetX) + "px";
                                                                      beforeStyle["top"] = (-radius + offsetY) + "px";
                                                                      beforeStyle["padding"] = (radius) + "px";
                                                                      beforeStyle["border-radius"] = "5px";
                                                                      beforeStyle["box-shadow"] =
                                                                          "rgb(44, 44, 44) 3px 3px 2px";
                                                                      var hexcolor = hextorgb(color);

                                                                      beforeStyle["background-color"] =
                                                                          string.Format("rgba({0}, {1}, {2}, {3})",
                                                                              hexcolor.R, hexcolor.G, hexcolor.B,
                                                                              opacity);
                                                                      beforeStyle["border"] = "2px solid black";

                                                                      ChangeCSS(
                                                                          "card" + scope.Card.Type + "-" +
                                                                          scope.Card.Value + "::before", beforeStyle);




                                                                      break;
                                                                  case EffectType.Rotate:
                                                                      break;
                                                                  case EffectType.Bend:



                                                                      /*

                                                                                          var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
                                                                                          {
                                                                                              Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
                                                                                          }));


                                                                                          var rotate = element.GetCSS("transform").Replace(" scale(1, 1)", "");

                                                                                          element.me().rotate((((-bEffect.Degrees / 2 + bEffect.Degrees / (space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(rotate))));
                                                                      */

                                                                      break;
                                                                  case EffectType.StyleProperty:
                                                                      break;
                                                                  case EffectType.Animated:
                                                                      break;
                                                              }
                                                          }, true);




            keys = new JsDictionary<string, string>() {};
            keys["content"] = string.Format("url('{1}assets/cards/{0}.gif')",
                (100 + (scope.Card.Value + 1) + (scope.Card.Type)*13), Constants.ContentAddress);
            ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", keys);

            scope.watch("space", redrawCard, true);

            scope.watch("model.selection.selectedScenario", redrawCard, true);

//            scope.On("redrawCard", redrawCard);

            //   redrawCard();
            /*
                          
 
            scope.watch("$parent.space", () =>
            {
                Console.Log("ac");
                redrawCard();
            }, true);
            scope.watch("card.appearance.effectNames.join()", () =>
            {
                Console.Log("b");
                redrawCard();
            }, true);*/
            /*scope.watch<CardScope>((_scope) =>
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

*/
            redrawCard();
        }

        private static void PurgeCSS(string myClass)
        {
            myClass = "." + myClass;
            string CSSRules = "";
            var document = (dynamic) Script.Eval("window.document");
            if (document.all)
                CSSRules = "rules";
            else if (document.getElementById)
                CSSRules = "cssRules";
            for (var a = 0; a < document.styleSheets.length; a++)
            {
                if (document.styleSheets[a][CSSRules] == null) continue;
                for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++)
                {
                    if (document.styleSheets[a][CSSRules][i].selectorText == myClass)
                    {
                        document.styleSheets[a].removeRule(i);
                        document.styleSheets[a].insertRule(myClass + "{}");

                    }
                }
            }

        }

        public static dynamic hextorgb(string hex)
        {

            var result = new Regex(@"^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$").Exec(hex);
            return result != null
                ? new
                  {
                      R = int.Parse(result[1], 16),
                      G = int.Parse(result[2], 16),
                      B = int.Parse(result[3], 16)
                  }
                : null;


        }

        public static string TransformRotate(double ar)
        {
            return string.Format("rotate({0}deg)", ar);
        }

        public static double NoTransformRotate(string ar)
        {
            if (ar == "") return 0;
            return double.Parse(ar.Replace("rotate(", "").Replace("deg)", "")); //todo regex??
        }

        private static void ChangeCSS(string myClass, JsDictionary<string, string> values)
        {
            myClass = "." + myClass;
            string CSSRules = "";
            var document = (dynamic) Script.Eval("window.document");
            if (document.all)
                CSSRules = "rules";
            else if (document.getElementById)
                CSSRules = "cssRules";
            for (var a = 0; a < document.styleSheets.length; a++)
            {
                if (document.styleSheets[a][CSSRules] == null) continue;
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
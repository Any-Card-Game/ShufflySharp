using System;
using System.Collections.Generic;
using System.Html;
using System.Text.RegularExpressions;
using Client.Scope;
using Client.Scope.Directive;
using CommonLibraries;
using global;
using jQueryApi;
using jQueryApi.UI.Effects;
using jQueryApi.UI.Interactions;
using Models.SiteManagerModels.Game;
using EffectType = Models.SiteManagerModels.Game.EffectType;

namespace Client.Directives
{
    public class AcgDebugDrawCardDirective
    {
        private readonly BaseScope rootScope;
        public const string Name = "acgDebugDrawCard";
        public Action<DebugCardScope, jQueryObject, object> link;

        public AcgDebugDrawCardDirective(BaseScope rootScope)
        {
            this.rootScope = rootScope;
            link = linkFn;
        }

        private void linkFn(DebugCardScope scope, jQueryObject element, object attrs)
        {
            var card = scope.Card.GameCard;
            scope.Classes = new List<string>();
            
            element.Attribute("style", "width:71px; height:96px;");
            var beforeStyle = new JsDictionary<string, string>() { };
            var lastStyle = new JsDictionary<string, string>() { };
            element.Draggable(new DraggableOptions()
            {
                OnStart = (@event, uiEvent) =>
                          {
                              scope.Card.Dragging = true;
                              scope.CardStyle.zIndex = 1000;
                              rootScope.Broadcast("redrawCard");
                              scope.Apply();
                          },
                OnDrag = (@event, uiEvent) =>
                         {
                             scope.Card.Location.X = @event.ClientX ;
                             scope.Card.Location.Y = @event.ClientY ;
                             bool updated = false;
                             foreach (var debugSpace in scope.GameModel.Spaces)
                             {
                                 for (int index = debugSpace.Cards.Count - 1; index >= 0; index--)
                                 {
                                     if (debugSpace.Cards[index].PlaceHolder)
                                     {
                                         updated = true;
                                         debugSpace.Cards.RemoveAt(index);

                                     }
                                 }
                             }


                             foreach (var debugSpace in scope.GameModel.Spaces)
                             {
                                 if (debugSpace.Location.Expand(30).Contains(scope.Card.Location))
                                 {
                                     foreach (var debugSpaceCard in debugSpace.Cards)
                                     {
                                         Rectangle rectangle = debugSpaceCard.Location.Offset(debugSpace.Location.X, debugSpace.Location.Y);
                                         Console.WriteLine(string.Format("{0},{1}   {2} {3}", debugSpace.Location.X, debugSpace.Location.Y, debugSpaceCard, rectangle.Expand(10).ToString(), scope.Card.Location.ToString()));
                                         if (rectangle.Expand(10).Contains(scope.Card.Location))
                                         {
                                             debugSpace.Cards.Insert(debugSpace.Cards.IndexOf(debugSpaceCard), new DebugSpaceCard() { PlaceHolder = true, GameCard = null });

/*
                                             if (rectangle.X + rectangle.Width/2 < scope.Card.Location.X)
                                             {
                                                 debugSpace.Cards.Insert(debugSpace.Cards.IndexOf(debugSpaceCard), new DebugSpaceCard() { PlaceHolder = true, GameCard = null });
                                             }
                                             else
                                             {
                                                 debugSpace.Cards.Insert(debugSpace.Cards.IndexOf(debugSpaceCard)+1, new DebugSpaceCard() { PlaceHolder = true, GameCard = null });
                                             }
*/


                                             Console.WriteLine("Took");
                                             updated = true;
                                             break;
                                         }
                                     }
                                 }
                             }
                             if (updated)
                             {
                                 rootScope.Broadcast("redrawCard");
                                 scope.Apply();
                             }
                         },
                OnStop = (@event, uiEvent) =>
                {
                    foreach (var debugSpace in scope.GameModel.Spaces)
                    {
                        for (int index = debugSpace.Cards.Count - 1; index >= 0; index--)
                        {
                            if (debugSpace.Cards[index].PlaceHolder)
                            {
                                debugSpace.Cards.RemoveAt(index);
                                scope.Space.Cards.Remove(scope.Card);

                                foreach (var debugSpaceCard in scope.Space.Cards)
                                {
                                    if (debugSpaceCard.Index > scope.Card.Index)
                                    {
                                        debugSpaceCard.Index--;
                                    }
                                }

                                scope.Card.Index = index;

                                foreach (var debugSpaceCard in debugSpace.Cards)
                                {
                                    if (debugSpaceCard.Index >= scope.Card.Index)
                                    {
                                        debugSpaceCard.Index++;
                                    }
                                }

                                debugSpace.Cards.Insert(index,scope.Card);
                                break;
                            }
                        }
                    }
                    ExtensionMethods.Delete(scope.CardStyle.zIndex);
                    scope.Card.Dragging = false;
                    rootScope.Broadcast("redrawCard");
                    scope.Apply();
                }
            });

            Action redrawCard = () =>
            {

                Console.WriteLine(string.Format("card{0}-{1} being called ", card.Type, card.Value));
                if (scope.Card.Dragging)
                {
                    return;
                }
                scope.CardStyle = new { };
                card = scope.Card.GameCard;
                var scale = scope.GameModel.Scale;


                var goodCards = scope.Space.Cards.Where(a => !a.Dragging);
                int spaceCardLength = goodCards.Count - 1;
                var debugSpace = scope.Space.GameSpace;

                var spaceScale =
                    new
                    {
                        width = debugSpace.Width / spaceCardLength,
                        height = debugSpace.Height / spaceCardLength
                    };
                var vertical = debugSpace.Vertical;
                var cardIndex = goodCards.IndexOf(scope.Card);


                var xx = 0.0;
                var yy = 0.0;


                switch (debugSpace.ResizeType)
                {
                    case TableSpaceResizeType.Static:
                        if (vertical)
                            yy = ((card.Value + 1) / 13.0) * debugSpace.Height * scale.Y;
                        else
                            xx = ((card.Value + 1) / 13.0) * debugSpace.Width * scale.X;
                        break;
                    case TableSpaceResizeType.Grow:
                        xx = (!vertical ? (cardIndex * spaceScale.width * scale.X) : 0);
                        yy = (vertical ? (cardIndex * spaceScale.height * scale.Y) : 0);
                        break;
                    default:
                        xx = (!vertical ? (cardIndex * spaceScale.width * scale.X) : 0);
                        yy = (vertical ? (cardIndex * spaceScale.height * scale.Y) : 0);
                        break;
                }

                xx -= 71 / 2;
                yy -= 96 / 2;


                scope.CardStyle.position = "absolute";
                scope.CardStyle.zIndex = cardIndex;
                scope.CardStyle.borderRadius = 5.ToPx();
                xx = (xx + (vertical ? debugSpace.Width * scale.X / 2 : 0));
                element.CSS("left", xx.ToPx());
                yy = (yy + (!vertical ? debugSpace.Height * scale.Y / 2 : 0));
                element.CSS("top", yy.ToPx());

                scope.Card.Location = new Rectangle(xx, yy, 71, 96);
                //                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";
                //                element.me().rotate(scope.Parent.Space.Appearance.InnerStyle.Rotate);
                scope.CardStyle.content = "\"\"";



                if (card == null)
                {
                    scope.CardStyle.border = "solid 2px blue";
                    scope.CardStyle.width = "71px";
                    scope.CardStyle.height = "96px";
                }

                else
                {


                    beforeStyle = new JsDictionary<string, string>() { };
                    if (card.Value == -1 && card.Type == -1)
                    {
                        beforeStyle["content"] = string.Format("url('{1}assets/cards/{0}.gif')", 155, Constants.ContentAddress);
                    }
                    else
                    {
                        beforeStyle["content"] = string.Format("url('{1}assets/cards/{0}.gif')", (100 + (card.Value + 1) + (card.Type) * 13), Constants.ContentAddress);
                    }
                     

                    foreach (var effectName in card.Effects)
                    {
                        var effect = scope.GameModel.MainArea.ClientGetEffectByName(effectName);

                        switch (effect.Type)
                        {
                            case EffectType.Highlight:
                                {
                                    var color = effect.GetString("color");
                                    var radius = effect.GetNumber("radius");
                                    var rotate = effect.GetNumber("rotate");
                                    var offsetX = effect.GetNumber("offsetx");
                                    var offsetY = effect.GetNumber("offsety");
                                    var opacity = effect.GetNumber("opacity");

                                     
                                    beforeStyle["display"] = "block";
                                    beforeStyle["position"] = "relative";
                                    beforeStyle["z-index"] = "-1";
                                    beforeStyle["width"] = "100%";
                                    beforeStyle["height"] = "100%";
                                    beforeStyle["left"] = (-radius + offsetX) + "px";
                                    beforeStyle["top"] = (-radius + offsetY) + "px";
                                    beforeStyle["padding"] = (radius) + "px";
                                    beforeStyle["border-radius"] = "5px";
                                    beforeStyle["box-shadow"] = "rgb(44, 44, 44) 3px 3px 2px";
                                    beforeStyle["content"] = string.Format("url('{1}assets/cards/{0}.gif')", (100 + (card.Value + 1) + (card.Type) * 13), Constants.ContentAddress);
                                    var hexcolor = ClientHelpers.HexToRGB(color);
                                    beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", hexcolor.R, hexcolor.G, hexcolor.B, opacity);
                                    beforeStyle["border"] = "2px solid black";



                                }
                                break;
                            case EffectType.Rotate:
                                {
                                    var rotate = effect.GetNumber("degrees");
                                    scope.CardStyle["-webkit-transform"] = "rotate(" + rotate + "deg)";
                                    scope.CardStyle.transform = "rotate(" + rotate + "deg)";



                                }

                                break;
                            case EffectType.Bend:

                                /*


                              var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
                              {
                                  Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
                              }));


                              var rotate = element.GetCSS("transform").Replace(" scale(1, 1)", "");

                              element.me().rotate((((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(rotate))));
                 
  */

                                break;
                            case EffectType.StyleProperty:
                                break;
                            case EffectType.Animated:
                                break;
                        }

                    }


                    if (!lastStyle.SameAs(beforeStyle))
                    {
                        Console.WriteLine(string.Format("card{0}-{1} being updated ", card.Type, card.Value));
                        ClientHelpers.PurgeCSS(string.Format("card{0}-{1}", card.Type, card.Value) + "::before");
                        ClientHelpers.ChangeCSS(string.Format("card{0}-{1}::before", card.Type, card.Value), beforeStyle);
                    }
                    lastStyle = beforeStyle;

                }





                /*
                                foreach (var effect in scope.Card.Appearance.EffectNames)
                                {
                                    GameEffectModel grabbedEffect = myEffectManager.GetEffectByName(effect);
                                    if (grabbedEffect == null)
                                    {
                                        continue;
                                    }
                                    switch (grabbedEffect.Type)
                                    {
                                        case EffectType.Highlight:

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
                                        case EffectType.Rotate:
                                            break;
                                        case EffectType.Bend:




                                            var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
                                            {
                                                Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
                                            }));


                                            var rotate = element.GetCSS("transform").Replace(" scale(1, 1)", "");

                                            element.me().rotate((((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(rotate))) );

                                            break;
                                        case EffectType.StyleProperty:
                                            break;
                                        case EffectType.Animated:
                                            break;
                                    }
                                }
                */
            };
            if (card != null)
            {
                if (card.Value == -1 && card.Type == -1)
                {
                    beforeStyle["content"] = string.Format("url('{1}assets/cards/{0}.gif')", 155, Constants.ContentAddress);
                }
                else
                {
                    beforeStyle["content"] = string.Format("url('{1}assets/cards/{0}.gif')", (100 + (card.Value + 1) + (card.Type) * 13), Constants.ContentAddress);
                }

                scope.Classes.Add(string.Format("card{0}-{1}", card.Type, card.Value));

                ClientHelpers.ChangeCSS("card" + card.Type + "-" + card.Value + "::before", beforeStyle);
            }

            scope.On("redrawCard", redrawCard);

            //   redrawCard();
            /*
                          
 
            scope.Watch("$parent.space", () =>
            {
                Console.Log("ac");
                redrawCard();
            }, true);
            scope.Watch("card.appearance.effectNames.join()", () =>
            {
                Console.Log("b");
                redrawCard();
            }, true);*/
            /*scope.Watch<CardScope>((_scope) =>
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

    }
}
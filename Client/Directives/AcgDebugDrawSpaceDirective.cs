using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using Client.Scope.Directive;
using CommonLibraries;
using global;
using jQueryApi;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgDebugDrawSpaceDirective
    {
        public const string Name = "acgDebugDrawSpace";
        public Action<DebugSpaceScope, jQueryObject, object> link;

        public AcgDebugDrawSpaceDirective()
        {
            link = linkFn;
        }

        private void linkFn(DebugSpaceScope scope, jQueryObject element, object attrs)
        {
            var scale = scope.GameModel.Scale;

            var debugSpace = scope.Space.GameSpace;
            
            element.Attribute("class", "space " + string.Format("space{0}", debugSpace.Name));

            var cardLookups = new JsDictionary<Guid, DebugSpaceCard>();

         

            Console.WriteLine("Smash");
            scope.Space.Cards = debugSpace.Pile.Cards.Map((card,index, cards) => cardLookups[card.Guid] ?? (cardLookups[card.Guid] = new DebugSpaceCard() { GameCard = card, PlaceHolder = false,Index=index }));


            var process = new Action(() =>
            {
                  debugSpace = scope.Space.GameSpace;
                Console.WriteLine("did");

                scope.SpaceStyle = new { }; 

                scope.SpaceStyle.position = "absolute";
                scope.SpaceStyle.left = debugSpace.X * scale.X;
                scope.SpaceStyle.top = debugSpace.Y * scale.Y;

                scope.SpaceStyle.width = debugSpace.Width * scale.X;
                scope.SpaceStyle.height = debugSpace.Height * scale.Y;
                scope.SpaceStyle.backgroundColor = "red";

                scope.SpaceStyle = new { };

                var left = debugSpace.X;
                var top = debugSpace.Y;
                var w = debugSpace.Width;
                var h = debugSpace.Height;
                var scaleLeft = scale.X;
                var scaleTop = scale.Y;

                scope.SpaceStyle.position = "absolute";
                scope.SpaceStyle.left = left * scaleLeft;
                scope.SpaceStyle.top = top * scaleTop;
                scope.SpaceStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                scope.SpaceStyle.borderRadius = "15px";


                scope.SpaceStyle.width = w * scaleLeft;
                scope.SpaceStyle.height = h * scaleTop;
                scope.SpaceStyle.backgroundColor = "red";

                scope.Space.Location = new Rectangle(left * scaleLeft, top * scaleTop, w * scaleLeft, h * scaleTop);

                ClientHelpers.PurgeCSS("space" + debugSpace.Name + "::before");


                var beforeStyle =new JsDictionary<string, string>();

                foreach (var effectName in debugSpace.Effects)
                {
                    var effect = scope.GameModel.MainArea.ClientGetEffectByName(effectName);
                    switch (effect.Type)
                    {
                        case EffectType.Highlight:

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
                            beforeStyle["box-shadow"] =
                                "rgb(44, 44, 44) 3px 3px 2px";
                            var hexcolor = ClientHelpers.HexToRGB(color);
                            beforeStyle["content"] = "\"\"";

                            beforeStyle["background-color"] =
                                string.Format("rgba({0}, {1}, {2}, {3})",
                                    hexcolor.R, hexcolor.G, hexcolor.B,
                                    opacity);
                            beforeStyle["border"] = "2px solid black";

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


                ClientHelpers.ChangeCSS("space" + debugSpace.Name + "::before", beforeStyle);




                scope.Broadcast("redrawCard");
            });



            scope.On("spaceUpdated", () =>
                                     {
                                         Console.WriteLine("UpSmash");
                                           debugSpace = scope.Space.GameSpace;
                                         scope.Space.Cards = debugSpace.Pile.Cards.Map((card, index, cards) =>
                                                                                       {
                                                                                           var lookup = cardLookups[card.Guid] ?? (cardLookups[card.Guid] = new DebugSpaceCard() {GameCard = card, PlaceHolder = false, Index = index});
                                                                                           lookup.GameCard.Effects = card.Effects;
                                                                                           return lookup;
                                                                                       });
                                         process();
                                     });


            scope.Watch("space", process);
        }
         
    }
}
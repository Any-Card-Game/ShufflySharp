using System;
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
            var scale = scope.Scale;

            element.Attribute("class", "space " + string.Format("space{0}", scope.Space.Name));
 
            scope.watch("space", () =>
                                 { 

                                     scope.SpaceStyle = new {};


                                     scope.SpaceStyle.position = "absolute";
                                     scope.SpaceStyle.left = scope.Space.X*scale.X;
                                     scope.SpaceStyle.top = scope.Space.Y*scale.Y;

                                     scope.SpaceStyle.width = scope.Space.Width*scale.X;
                                     scope.SpaceStyle.height = scope.Space.Height*scale.Y;
                                     scope.SpaceStyle.backgroundColor = "red";

                                     scope.SpaceStyle = new { };

                                     var l = scope.Space.X;
                                     var t = scope.Space.Y;
                                     var w = scope.Space.Width;
                                     var h = scope.Space.Height;
                                     var sl = scale.X;
                                     var st = scale.Y;

                                     scope.SpaceStyle.position = "absolute";
                                     scope.SpaceStyle.left = l * sl;
                                     scope.SpaceStyle.top = t * st;
                                     scope.SpaceStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                                     scope.SpaceStyle.borderRadius = "15px";


                                     scope.SpaceStyle.width = w * sl;
                                     scope.SpaceStyle.height = h * st;
                                     scope.SpaceStyle.backgroundColor = "red";

                                     ClientHelpers.PurgeCSS("space" + scope.Space.Name + "::before"); 

                                     foreach (var effectName in scope.Space.Effects)
                                     {
                                         var effect = scope.MainArea.ClientGetEffectByName(effectName);
                                         switch (effect.Type)
                                         {
                                             case EffectType.Highlight:

                                                 var color = effect.GetString("color");
                                                 var radius = effect.GetNumber("radius");
                                                 var rotate = effect.GetNumber("rotate");
                                                 var offsetX = effect.GetNumber("offsetx");
                                                 var offsetY = effect.GetNumber("offsety");
                                                 var opacity = effect.GetNumber("opacity");

                                                 var beforeStyle =
                                                     new JsDictionary<string, string>();

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

                                                 ClientHelpers.ChangeCSS("space" + scope.Space.Name + "::before", beforeStyle);

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




                                      scope.Broadcast("redrawCard");
                                 }, true);
        }
         
    }
}
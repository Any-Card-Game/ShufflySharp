using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope.Directive;
using CommonLibraries;
using global;
using jQueryApi;

namespace Client.Directives
{
    public class AcgDrawSpaceDirective
    {
        public const string Name = "acgDrawSpace";
        public Action<SpaceScope, jQueryObject, object> link;

        public AcgDrawSpaceDirective()
        {
            link = linkFn;
        }

        private void linkFn(SpaceScope scope, jQueryObject element, object attrs)
        {
            var scale = ((Point) ((dynamic) scope.Parent)["$parent"].scale);

            element.Attribute("class", "space " + string.Format("space{0}", scope.Space.Name));
            /*  element.Resizable(new ResizableOptions()
            {
                Grid = new[] { scale.X, scale.Y },
                MinHeight = -1,
                MinWidth = -1,
                Handles = "n, e, s, w,nw,sw,ne,se",
                OnResize = (ev, ele) =>
                {
                    scope.Space.Width = ele.Size.Width / scale.X;
                    scope.Space.Height = ele.Size.Height / scale.Y;
                    scope.Apply();

                }
            });
            element.Draggable(new DraggableOptions()
            {
                Cursor = "crosshair",
                Grid = new[] { scale.X, scale.Y }, 
                OnDrag = (ev, ele) =>
                {
                    scope.Space.X = ele.Position.Left / scale.X;
                    scope.Space.Y = ele.Position.Top/ scale.Y;
                    scope.Apply();

                }
            });*/

            scope.Watch("space", () =>
                                 {
                                     var beforeStyle = new JsDictionary<string, string>();
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
                                     ClientHelpers.ChangeCSS("space" + scope.Space.Name + "::before", beforeStyle);

                                     scope.SpaceStyle = new {};


                                     scope.SpaceStyle.position = "absolute";
                                     scope.SpaceStyle.left = scope.Space.X*scale.X;
                                     scope.SpaceStyle.top = scope.Space.Y*scale.Y;

                                     scope.SpaceStyle.width = scope.Space.Width*scale.X;
                                     scope.SpaceStyle.height = scope.Space.Height*scale.Y;
                                     scope.SpaceStyle.backgroundColor = "red";


/*
                                     foreach (var effect in scope.Space.Appearance.Effects)
                                     {
                                         switch (effect.Type)
                                         {
                                             case EffectType.Highlight:
                                                 var hEffect = ((CardGameAppearanceEffectHighlight) effect);
                                                 scope.SpaceStyle.padding = string.Format("{0} {0} {0} {0}",
                                                     hEffect.Radius);
                                                 scope.SpaceStyle.backgroundColor = hEffect.Color;
                                                 scope.SpaceStyle.border = "solid 2px black";
                                                 scope.SpaceStyle.borderRadius = 15.0;
                                                 scope.SpaceStyle.boxShadow = "4px 4px 2px #333";
                                                 break;
                                             case EffectType.Rotate:
                                                 Window.Alert(effect.Type.ToString());
                                                 break;
                                             case EffectType.Bend:
                                                 var bEffect = (CardGameAppearanceEffectBend) effect;

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
*/
                                     scope.Broadcast("redrawCard");
                                 }, true);
        }
          
    }
}
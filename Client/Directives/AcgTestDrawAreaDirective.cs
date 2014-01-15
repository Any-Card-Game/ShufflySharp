using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Client.Scope.Directive;
using jQueryApi;
using jQueryApi.UI.Interactions;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgTestDrawAreaDirective
    {
        public const string Name = "acgTestDrawArea";
        public Action<TestAreaScope, jQueryObject, object> link;

        public AcgTestDrawAreaDirective()
        {
            link = linkFn;
        }

        private void linkFn(TestAreaScope scope, jQueryObject element, object attrs)
        {
            element.MouseDown((e) =>
                              {
                                  scope.Model.Selection.SelectedArea = scope.Area;
                                  scope.Apply();
                              });

            var scale = scope.Model.Scale;
            Action reApplyAreaBind = () =>
                                     {
                                         scope.AreaStyle = new {};


                                         scope.AreaStyle.position = "absolute";
                                         scope.AreaStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                                         scope.AreaStyle.borderRadius = "15px";

                                         scope.AreaStyle.left = scope.Area.Left*scale.X;
                                         scope.AreaStyle.top = scope.Area.Top*scale.Y;

                                         scope.AreaStyle.width = scope.Area.Width*scale.X;
                                         scope.AreaStyle.height = scope.Area.Height*scale.Y;
                                         scope.AreaStyle.backgroundColor = "blue";


                                         ClientHelpers.PurgeCSS("area" + scope.Area.Name + "::before");


                                         foreach (
                                             var gameLayoutScenarioEffect in
                                                 scope.Model.Selection.SelectedScenario.Effects)
                                         {
                                             foreach (var areaGuid in gameLayoutScenarioEffect.AreaGuids)
                                             {
                                                 if (areaGuid == scope.Area.Guid)
                                                 {
                                                     foreach (var gameEffectModel in scope.Model.Game.Effects)
                                                     {
                                                         if (gameEffectModel.Guid == gameLayoutScenarioEffect.EffectGuid)
                                                         {
                                                             var effect = gameEffectModel;
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
                                                                             hexcolor.R, hexcolor.G, hexcolor.B, opacity);
                                                                     beforeStyle["border"] = "2px solid black";

                                                                     ClientHelpers.ChangeCSS("area" + scope.Area.Name + "::before",beforeStyle);

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
                                                     }
                                                 }
                                             }
                                         }
                                     };
            scope.Watch("model.scale", () =>
                                       {
                                           scale = scope.Model.Scale;


                                           element.Attribute("class",
                                               "area " + string.Format("area{0}", scope.Area.Name));
                                           element.Resizable(new ResizableOptions()
                                                             {
                                                                 Grid = new[] {scale.X, scale.Y},
                                                                 MinHeight = -1,
                                                                 MinWidth = -1,
                                                                 Handles = "n, e, s, w,nw,sw,ne,se",
                                                                 OnResize = (ev, ele) =>
                                                                            {
                                                                                scope.Area.Left =
                                                                                    (int) (ele.Position.Left/scale.X);
                                                                                scope.Area.Top =
                                                                                    (int) (ele.Position.Top/
                                                                                           scale.Y);
                                                                                scope.Area.Width =
                                                                                    (int) (ele.Size.Width/
                                                                                           scale.X);
                                                                                scope.Area.Height =
                                                                                    (int) (ele.Size.Height/
                                                                                           scale.Y);


                                                                                scope.Apply();
                                                                            }
                                                             });
                                           element.Draggable(new DraggableOptions()
                                                             {
                                                                 Cursor = "crosshair",
                                                                 Grid = new[] {scale.X, scale.Y},
                                                                 OnDrag = (ev, ele) =>
                                                                          {
                                                                              scope.Area.Left =
                                                                                  (int) (ele.Position.Left/scale.X);
                                                                              scope.Area.Top = (int) (ele.Position.Top/
                                                                                                      scale.Y);
                                                                              scope.Apply();
                                                                          }
                                                             });
                                           reApplyAreaBind();
                                       });


            scope.Watch("area", reApplyAreaBind, true);
            scope.Watch("model.selection.selectedEffect", reApplyAreaBind, true);
            scope.Watch("model.selection.selectedScenario.effects", reApplyAreaBind, true);
        }
         
    }
}
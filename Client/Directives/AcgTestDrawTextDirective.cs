using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Client.Scope.Directive;
using jQueryApi;
using jQueryApi.UI.Interactions;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgTestDrawTextDirective
    {
        public const string Name = "acgTestDrawText";
        public Action<TestTextScope, jQueryObject, object> link;

        public AcgTestDrawTextDirective()
        {
            link = linkFn;
        }

        private void linkFn(TestTextScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("class", "text " + string.Format("text{0}", scope.Text.Name));
            element.MouseDown((e) =>
                              {
                                  scope.Model.Selection.SelectedText = scope.Text;
                                  scope.Apply();
                              });


            var scale = scope.Model.Scale;
            Action reApplyTextBind = () =>
                                     {
                                         scope.TextStyle = new { };


                                         scope.TextStyle.position = "absolute";
                                         scope.TextStyle.left = scope.Text.Left * scale.X;
                                         scope.TextStyle.top = scope.Text.Top * scale.Y;
                                         scope.TextStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                                         scope.TextStyle.borderRadius = "15px";


                                         element.Text(scope.Text.Text);

                                         ClientHelpers.PurgeCSS("text" + scope.Text.Name + "::before");

                                         foreach (var gameLayoutScenarioEffect in scope.Model.Selection.SelectedScenario.Effects)
                                         {
                                             foreach (var textGuid in gameLayoutScenarioEffect.TextGuids)
                                             {
                                                 if (textGuid == scope.Text.Guid)
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

                                                                     beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", hexcolor.R, hexcolor.G, hexcolor.B, opacity);
                                                                     beforeStyle["border"] = "2px solid black";

                                                                     ClientHelpers.ChangeCSS("text" + scope.Text.Name + "::before", beforeStyle);

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
            scope.watch("model.scale", () =>
                                       {
                                           scale = scope.Model.Scale;


                                           element.Draggable(new DraggableOptions()
                                                             {
                                                                 Cursor = "crosshair",
                                                                 Grid = new[] { scale.X, scale.Y },
                                                                 OnDrag = (ev, ele) =>
                                                                          {
                                                                              scope.Text.Left = (ele.Position.Left /
                                                                                                 scale.X);
                                                                              scope.Text.Top = (ele.Position.Top / scale.Y);
                                                                              scope.Apply();
                                                                          }
                                                             });
                                           reApplyTextBind();
                                       });


            scope.watch("text", reApplyTextBind, true);
            scope.watch("model.selection.selectedEffect", reApplyTextBind, true);
            scope.watch("model.selection.selectedScenario.effects", reApplyTextBind, true);
        }
    }
}
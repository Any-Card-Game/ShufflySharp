using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Client.Scope.Directive;
using jQueryApi;
using jQueryApi.UI.Interactions;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgTestDrawSpaceDirective
    {
        public const string Name = "acgTestDrawSpace";
        public Action<TestSpaceScope, jQueryObject, object> link;
        public dynamic scope;

        public AcgTestDrawSpaceDirective()
        {
            link = linkFn;
            /*scope=new
                  {
                      space = "=acgTestDrawSpace"
                  };*/
        }

        private void linkFn(TestSpaceScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("class", "space " + string.Format("space{0}", scope.Space.Name));

            element.MouseDown((e) =>
                              {
                                  scope.Model.Selection.SelectedSpace = scope.Space;
                                  scope.Apply();
                              });
            var scale = scope.Model.Scale;
            Action reApplySpaceBind = () =>
                                      {
                                          scope.SpaceStyle = new {};

                                          var l = scope.Space.Left;
                                          var t = scope.Space.Top;
                                          var w = scope.Space.Width;
                                          var h = scope.Space.Height;
                                          var sl = scale.X;
                                          var st = scale.Y;

                                          scope.SpaceStyle.position = "absolute";
                                          scope.SpaceStyle.left = l*sl;
                                          scope.SpaceStyle.top = t*st;
                                          scope.SpaceStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                                          scope.SpaceStyle.borderRadius = "15px";


                                          scope.SpaceStyle.width = w*sl;
                                          scope.SpaceStyle.height = h*st;
                                          scope.SpaceStyle.backgroundColor = "red";

                                          ClientHelpers.PurgeCSS("space" + scope.Space.Name + "::before");


                                          foreach (
                                              var gameLayoutScenarioEffect in
                                                  scope.Model.Selection.SelectedScenario.Effects)
                                          {
                                              foreach (var spaceGuid in gameLayoutScenarioEffect.SpaceGuids)
                                              {
                                                  if (spaceGuid == scope.Space.Guid)
                                                  {
                                                      foreach (var gameEffectModel in scope.Model.Game.Effects)
                                                      {
                                                          if (gameEffectModel.Guid ==
                                                              gameLayoutScenarioEffect.EffectGuid)
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
                                                                              hexcolor.R, hexcolor.G, hexcolor.B,
                                                                              opacity);
                                                                      beforeStyle["border"] = "2px solid black";

                                                                      ClientHelpers.ChangeCSS("space" + scope.Space.Name + "::before",beforeStyle);

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


                                           element.Resizable(new ResizableOptions()
                                                             {
                                                                 Grid = new[] {scale.X, scale.Y},
                                                                 MinHeight = -1,
                                                                 MinWidth = -1,
                                                                 Handles = "n, e, s, w,nw,sw,ne,se",
                                                                 OnResize = (ev, ele) =>
                                                                            {
                                                                                scope.Space.Left = (ele.Position.Left/
                                                                                                    scale.X);
                                                                                scope.Space.Top = (ele.Position.Top/
                                                                                                   scale.Y);
                                                                                scope.Space.Width = (ele.Size.Width/
                                                                                                     scale.X);
                                                                                scope.Space.Height = (ele.Size.Height/
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
                                                                              scope.Space.Left = (ele.Position.Left/
                                                                                                  scale.X);
                                                                              scope.Space.Top = (ele.Position.Top/
                                                                                                 scale.Y);
                                                                              scope.Apply();
                                                                          }
                                                             });
                                           reApplySpaceBind();
                                       });


            scope.watch("space", reApplySpaceBind, true);

            scope.watch("model.selection.selectedEffect", reApplySpaceBind, true);
            scope.watch("model.selection.selectedScenario.effects", reApplySpaceBind, true);
        } 
    }
}
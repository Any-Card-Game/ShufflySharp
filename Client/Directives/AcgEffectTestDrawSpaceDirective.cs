using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Client.Scope.Directive;
using jQueryApi;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgEffectTestDrawSpaceDirective
    {
        public const string Name = "acgEffectTestDrawSpace";
        public Action<EffectTestSpaceScope, jQueryObject, object> link;
        public dynamic scope;

        public AcgEffectTestDrawSpaceDirective()
        {
            link = linkFn;
        }

        private void linkFn(EffectTestSpaceScope scope, jQueryObject element, object attrs)
        {
            GameSpaceModel space = null;
            space = scope.Model.SpaceTest.Space;
            element.Attribute("class", "space " + string.Format("space{0}", space.Name));

            var scale = scope.Model.Scale;
            Action reApplySpaceBind = () =>
                                      {
                                          /*   JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
                if (false)
                {
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
                }
                ChangeCSS("space" + space.Name + "::before", beforeStyle);*/
                                          scope.SpaceStyle = new {};

                                          var l = space.Left;
                                          var t = space.Top;
                                          var w = space.Width;
                                          var h = space.Height;
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
                                      };
            scope.watch("model.selection.selectedEffect", () =>
                                                          {
                                                              ClientHelpers.PurgeCSS("space" + space.Name + "::before");

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

                                                                      ClientHelpers.ChangeCSS("space" + space.Name + "::before",
                                                                          beforeStyle);

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
                                                          }, true);

            scope.watch("space", reApplySpaceBind, true);
        }
         
    }
}
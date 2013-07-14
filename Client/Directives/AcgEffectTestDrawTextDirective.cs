using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Client.Scope.Directive;
using jQueryApi;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgEffectTestDrawTextDirective
    {
        public const string Name = "acgEffectTestDrawText";
        public Action<EffectTestTextScope, jQueryObject, object> link;
        public dynamic scope;

        public AcgEffectTestDrawTextDirective()
        {
            link = linkFn;
        }

        private void linkFn(EffectTestTextScope scope, jQueryObject element, object attrs)
        {
            GameTextModel text = null;
            text = scope.Model.TextTest.Text;
            element.Attribute("class", "text " + string.Format("text{0}", text.Name));

            var scale = scope.Model.Scale;
            Action reApplyTextBind = () =>
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
                   ChangeCSS("text" + text.Name + "::before", beforeStyle);*/
                                         scope.TextStyle = new {};

                                         var l = text.Left;
                                         var t = text.Top;
                                         var sl = scale.X;
                                         var st = scale.Y;

                                         scope.TextStyle.position = "absolute";
                                         scope.TextStyle.left = l*sl;
                                         scope.TextStyle.top = t*st;
                                         scope.TextStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                                         scope.TextStyle.borderRadius = "15px";


                                         element.Text(scope.Text.Text);
                                     };
            scope.watch("model.selection.selectedEffect", () =>
                                                          {
                                                              ClientHelpers.PurgeCSS("text" + text.Name + "::before");

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

                                                                      var beforeStyle =new JsDictionary<string, string>();

                                                                      beforeStyle["display"] = "block";
                                                                      beforeStyle["position"] = "relative";
                                                                      beforeStyle["z-index"] = "-1";
                                                                      beforeStyle["width"] = "100%";
                                                                      beforeStyle["height"] = "100%";
                                                                      beforeStyle["left"] = (-radius + offsetX) + "px";
                                                                      beforeStyle["top"] = (-radius + offsetY) + "px";
                                                                      beforeStyle["padding"] = (radius) + "px";
                                                                      beforeStyle["border-radius"] = "5px";
                                                                      beforeStyle["box-shadow"] ="rgb(44, 44, 44) 3px 3px 2px";
                                                                      var hexcolor = ClientHelpers.HexToRGB(color);
                                                                      beforeStyle["content"] = "\"\"";

                                                                      beforeStyle["background-color"] =string.Format("rgba({0}, {1}, {2}, {3})",hexcolor.R, hexcolor.G, hexcolor.B,
                                                                              opacity);
                                                                      beforeStyle["border"] = "2px solid black";

                                                                 ClientHelpers.     ChangeCSS("text" + text.Name + "::before",beforeStyle);

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

            scope.watch("text", reApplyTextBind, true);
        }
          
    }
}
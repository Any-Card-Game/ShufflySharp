using System;
using System.Collections.Generic;
using System.Html;
using System.Text.RegularExpressions;
using Client.Scope;
using Client.Scope.Directive;
using CommonLibraries;
using jQueryApi;
using jQueryApi.UI.Interactions;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class AcgEffectTestDrawAreaDirective
    {
        public Action<EffectTestAreaScope, jQueryObject, object> link;
        public dynamic scope;
        public AcgEffectTestDrawAreaDirective()
        {
            link = linkFn;
        }

        private void linkFn(EffectTestAreaScope scope, jQueryObject element, object attrs)
        {


            GameAreaModel area = null;
            area = scope.Model.AreaTest.Area;
            element.Attribute("class", "area " + string.Format("area{0}", area.Name));

            var scale = scope.Model.Scale;
            Action  reApplyAreaBind = () =>
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
                   ChangeCSS("area" + area.Name + "::before", beforeStyle);*/
                scope.AreaStyle = new { };

                var l = area.Left;
                var t = area.Top;
                var w = area.Width;
                var h = area.Height;
               var sl =  scale.X;
               var st =  scale.Y;

               scope.AreaStyle.position = "absolute";
               scope.AreaStyle.left = l * sl;
               scope.AreaStyle.top = t * st;
               scope.AreaStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
               scope.AreaStyle.borderRadius = "15px";


               scope.AreaStyle.width = w * sl;
               scope.AreaStyle.height = h * st;
               scope.AreaStyle.backgroundColor = "blue";


            };
            scope.watch("model.selection.selectedEffect", () =>
                                                          {

                                                              PurgeCSS("area" + area.Name + "::before");

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
                         
                        JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();

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
                        var hexcolor = hextorgb(color);
                        beforeStyle["content"] = "\"\"";

                        beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", hexcolor.R, hexcolor.G, hexcolor.B, opacity);
                        beforeStyle["border"] = "2px solid black";

                        ChangeCSS("area" + area.Name + "::before", beforeStyle);  

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

                            },true);

            scope.watch("area", reApplyAreaBind, true);
        }
        public static string TransformRotate(double ar)
        {
            return string.Format("rotate({0}deg)", ar);
        }
        public static dynamic hextorgb(string hex)
        {

            var result = new Regex(@"^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$").Exec(hex);
            return result != null ? new
            {
                R = int.Parse(result[1], 16),
                G = int.Parse(result[2], 16),
                B = int.Parse(result[3], 16)
            } : null;


        }
         
        private static void ChangeCSS(string myClass, JsDictionary<string, string> values)
        {
            myClass = "." + myClass;
            string CSSRules = "";
            var document = (dynamic)Script.Eval("window.document");
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
        private static void PurgeCSS(string myClass)
        {
            myClass = "." + myClass;
            string CSSRules = "";
            var document = (dynamic)Script.Eval("window.document");
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
                        document.styleSheets[a].insertRule(myClass+"{}");

                    }
                }
            }

        }
    }
}
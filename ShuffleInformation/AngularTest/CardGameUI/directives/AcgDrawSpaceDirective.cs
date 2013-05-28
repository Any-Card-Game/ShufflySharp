using System;
using System.Collections.Generic;
using System.Html;
using AngularTest.scope;
using Client.Angular.interfaces;
using global;
using jQueryApi;
namespace Client.Angular.directives
{
    public class AcgDrawSpaceDirective
    {
        public Action<SpaceScope, jQueryObject, object> link;
        public AcgDrawSpaceDirective()
        {
            link = linkFn;

        }

        private void linkFn(SpaceScope scope, jQueryObject element, object attrs)
        {
            element.Attribute("class", "space space" + scope.Space.Name);

            JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
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
            ChangeCSS("space" + scope.Space.Name + "::before", beforeStyle);

            scope.SpaceStyle = new { };



            scope.SpaceStyle.position = "absolute";
            scope.SpaceStyle.left = scope.Space.X * scope.Parent.Scale.X;
            scope.SpaceStyle.top = scope.Space.Y * scope.Parent.Scale.Y;

            scope.SpaceStyle.width = scope.Space.Width * scope.Parent.Scale.X;
            scope.SpaceStyle.height = scope.Space.Height * scope.Parent.Scale.Y;
            scope.SpaceStyle.backgroundColor = "red";



            foreach (var effect in scope.Space.Appearance.Effects)
            {
                switch (effect.Type)
                {
                    case EffectType.Highlight:
                        var hEffect = ((CardGameAppearanceEffectHighlight)effect);
                        scope.SpaceStyle.padding = string.Format("{0} {0} {0} {0}", hEffect.Radius);
                        scope.SpaceStyle.backgroundColor = hEffect.Color;
                        scope.SpaceStyle.border = "solid 2px black";
                        scope.SpaceStyle.borderRadius = 15.0;
                        scope.SpaceStyle.boxShadow = "4px 4px 2px #333";
                        break;
                    case EffectType.Rotate:
                        Window.Alert(effect.Type.ToString());
                        break;
                    case EffectType.Bend:
                        var bEffect = (CardGameAppearanceEffectBend)effect;

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

        }
        public static string TransformRotate(double ar)
        {
            return string.Format("rotate({0}deg)", ar);
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
    }
}
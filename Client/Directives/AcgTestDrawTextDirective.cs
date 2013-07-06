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
    public class AcgTestDrawTextDirective
    {
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
                scope.Model.Selection.SelectedText= scope.Text;
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








                PurgeCSS("text" + scope.Text.Name + "::before"); 

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

                                            ChangeCSS("text" + scope.Text.Name + "::before", beforeStyle);

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
                                                                              scope.Text.Left =  (ele.Position.Left / scale.X);
                                                                              scope.Text.Top =  (ele.Position.Top / scale.Y);
                                                                              scope.Apply();

                                                                          }
                                                             });
                                           reApplyTextBind();
                                       });



            scope.watch("text", reApplyTextBind, true);
            scope.watch("model.selection.selectedEffect", reApplyTextBind, true);
            scope.watch("model.selection.selectedScenario.effects", reApplyTextBind, true);
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
                        document.styleSheets[a].insertRule(myClass + "{}");

                    }
                }
            }

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

    }
}
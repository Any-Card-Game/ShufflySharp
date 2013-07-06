using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Directive;
using CommonLibraries;
using global;
using jQueryApi;
using jQueryApi.UI.Interactions;
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
            element.MouseDown((e) =>
            {
                scope.Model.Selection.SelectedText= scope.Text;
                scope.Apply();
            });


            var scale = scope.Model.Scale;
            Action reApplyTextBind = () =>
            {
                JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
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
                ChangeCSS("text" + scope.Text.Name + "::before", beforeStyle);
                scope.TextStyle = new { };



                scope.TextStyle.position = "absolute";
                scope.TextStyle.left = scope.Text.Left * scale.X;
                scope.TextStyle.top = scope.Text.Top * scale.Y;
                scope.TextStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                scope.TextStyle.borderRadius = "15px";

                
                element.Text(scope.Text.Text);
            };
            scope.watch("model.scale", () =>
                                       {
                                           scale = scope.Model.Scale;


                                           element.Attribute("class", "text " + string.Format("text{0}", scope.Text.Name));
                                           
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
    }
}
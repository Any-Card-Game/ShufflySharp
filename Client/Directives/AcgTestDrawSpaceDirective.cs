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
    public class AcgTestDrawSpaceDirective
    {
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
            Action  reApplySpaceBind = () =>
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
                ChangeCSS("space" + scope.Space.Name + "::before", beforeStyle);
                scope.SpaceStyle = new { };

               var l  =  scope.Space.Left;
               var t  =  scope.Space.Top;
               var w  =  scope.Space.Width;
               var h  =  scope.Space.Height;
               var sl =  scale.X;
               var st =  scale.Y;

                scope.SpaceStyle.position = "absolute";
                scope.SpaceStyle.left = l * sl;
                scope.SpaceStyle.top = t * st;
                scope.SpaceStyle.boxShadow = "rgb(51, 51, 51) 4px 4px 2px";
                scope.SpaceStyle.borderRadius = "15px";


                scope.SpaceStyle.width = w * sl;
                scope.SpaceStyle.height = h * st;
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
            };
            scope.watch("model.scale", () =>
                                       {
                                           scale = scope.Model.Scale;


                                           element.Resizable(new ResizableOptions()
                                                             {
                                                                 Grid = new[] { scale.X, scale.Y },
                                                                 MinHeight = -1,
                                                                 MinWidth = -1,
                                                                 Handles = "n, e, s, w,nw,sw,ne,se",
                                                                 OnResize = (ev, ele) =>
                                                                            {
                                                                                scope.Space.Left =  (ele.Position.Left / scale.X);
                                                                                scope.Space.Top =  (ele.Position.Top /scale.Y);
                                                                                scope.Space.Width =  (ele.Size.Width /scale.X);
                                                                                scope.Space.Height =  (ele.Size.Height /scale.Y);
                                                                                scope.Apply(); 
                                                                            }
                                                             });
                                           element.Draggable(new DraggableOptions()
                                                             {
                                                                 Cursor = "crosshair",
                                                                 Grid = new[] { scale.X, scale.Y },
                                                                 OnDrag = (ev, ele) =>
                                                                          {
                                                                              scope.Space.Left =  (ele.Position.Left /scale.X);
                                                                              scope.Space.Top =  (ele.Position.Top / scale.Y);
                                                                              scope.Apply();

                                                                          }
                                                             });
                                           reApplySpaceBind();
                                       });



            scope.watch("space", reApplySpaceBind, true);
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
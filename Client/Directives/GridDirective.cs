using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Client.Scope;
using Client.Scope.Directive;
using CommonLibraries;
using global;
using jQueryApi;
using jQueryApi.UI;
using jQueryApi.UI.Interactions;
namespace Client.Directives
{
    public class GridDirective
    {
        public Action<TestTextScope, jQueryObject, object> link;
        public bool replace;
        public dynamic scope;

        public GridDirective()
        {
            link = linkFn;
            replace = true;
            scope = new
            {
                scale = "=grid", 
            };
        }

        private void linkFn(dynamic scope, jQueryObject element, object attrs)
        {

            scope["$watch"]("scale", new Action(() =>
            {
                element.Empty();
                var scale = (Point)scope.scale;
                CanvasElement n = (CanvasElement)Document.CreateElement("canvas");
                var w =  scale.X;
                var h =  scale.Y ;
                n.Width =  (int) w+1;
                n.Height = (int) h+1;
                var context = (CanvasContext2D)n.GetContext("2d");
                context.LineWidth = 1;
                context.MoveTo(w, 0);
                context.LineTo(w, h);
                context.Stroke();
                context.MoveTo(0, h);
                context.LineTo(w, h);
                context.Stroke();
                var url=(string)((dynamic) n).toDataURL("image/png");
                element.CSS("background-image", string.Format("url({0})", url));
                element.CSS("background-repeat", "repeat-x repeat-y");
                element.CSS("width", "100%");
                element.CSS("height", "100%");
                element.CSS("margin-left", "auto");
                element.CSS("margin-right", "auto");
                element.CSS("margin-bottom", "auto");
                element.CSS("margin-top", "auto");
                element.ZIndex(-10000);
            }), true);
/*
            scope["$watch"]("scale", new Action(() =>
                                                {
                                                    element.Empty();
                                                    var scale = (Point) scope.scale;
                                                    var w = jQueryApi.jQuery.Window.GetWidth();
                                                    var h = jQueryApi.jQuery.Window.GetHeight();

                                                    for (int i = 0; i < (w/scale.X) + 2; i++)
                                                    {
                                                        for (int j = 0; j < (h/scale.Y) + 2; j++)
                                                        {
                                                            element.Append(
                                                                string.Format(
                                                                    "<div style='border:solid 1px black;position:absolute;left:{0}px;top:{1}px;width:{2}px;height:{3}px;'></div>",
                                                                    i*scale.X, j*scale.Y, scale.X, scale.Y));
                                                        }
                                                    }
                                                }), true);
*/

        }
    }
}
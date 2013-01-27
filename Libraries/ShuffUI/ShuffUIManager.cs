using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using jQueryApi;
using jQueryApi.UI.Interactions;
using jQueryApi.UI.Widgets;
namespace ShuffUI
{
    public class ShuffUIManager
    {
        private List<UIAreaInformation> UIAreas = new List<UIAreaInformation>();

        public ShuffWindow CreateWindow(ShuffWindow ui)
        {
            var windowID = ui.Title;
            var outer = jQuery.Select("<div class='window-outer' style='background-color: #87B6D9; overflow:hidden;'></div>");

            jQuery.Select("body").Append(outer);
            ui.outer = outer;

            Style tp = outer[0].Style;

            tp["box-shadow"] = "4px 4px 2px #333";

            if (tp["box-shadow"] != null) {
                tp["-moz-box-shadow"] = tp["box-shadow"];
                tp["-webkit-box-shadow"] = tp["box-shadow"];
            }

            outer.CSS("position", "absolute");
            outer.CSS("padding", "2em 1em 1em 1em");
            outer.CSS("left", ui.X + "px");
            outer.CSS("top", ui.Y + "px");
            outer.CSS("width", ui.Width);
            outer.CSS("height", ui.Height);
            outer.CSS("display", ui.Visible == false ? "none" : "block");

            var top = jQuery.Select("<div style='width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;  '></div>");
            outer.Append(top);

            var title = jQuery.Select("<div class='rounded' style='margin:auto; background-color:white; width:40%; text-align:center;opacity:0.4;'>" + ui.Title + "</div>");
            top.Append(title);

            var rightSideBar = jQuery.Select("<div style='width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;'></div>");
            top.Append(rightSideBar);

            var x = jQuery.Select("<div class='rounded window-header-button window-close' style='height:30px; vertical-align:top;background-color:white; width:6%; text-align:center;opacity:0.4;float:right;'>X</div> ");
            rightSideBar.Append(x);
            var max = jQuery.Select("<div class='rounded window-header-button window-maximize' style='height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;'>[]</div>  ");
            rightSideBar.Append(max);
            var min = jQuery.Select("<div class='rounded window-header-button window-minimize' style='height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;'>_</div>  ");
            rightSideBar.Append(min);

            var inner = jQuery.Select("<div class='window-inner' id='window" + windowID + "' style='background-color: #FDFEFE;width:100%; height:100%; '> </div> ");
            outer.Append(inner);
            ui.Window = jQuery.Select("#window" + windowID);

            UIAreaInformation info;
            UIAreas.Add(info = new UIAreaInformation(outer, inner));
            ui.Information = info;

            x.Click((evt) => { outer.CSS("display", "none"); });
            var toggleSize = false;
            var toggleMinSize = false;
            max.Click((evt) => {
                          toggleSize = !toggleSize;
                          if (toggleSize) {
                              outer.CSS("width", "100%");
                              outer.CSS("height", "100%");
                              outer.CSS("left", "0px");
                              outer.CSS("top", "0px");
                          } else {
                              outer.CSS("width", "100%");
                              outer.CSS("height", "100%");
                          }
                      });
            jQuery.Select(".window-minimize").Click((evt) => {
                                                        toggleMinSize = !toggleMinSize;
                                                        if (toggleMinSize)
                                                            outer.CSS("height", "25px");
                                                        else {
                                                            outer.CSS("height", ui.Height + "px");

//                    outer.CSS("height", "100%");
                                                        }
                                                    });

            outer.MouseDown((evt) => { Focus(info); });

            WidgetExtensions.Button(jQuery.Select(".window-header-button"));

            if (!ui.StaticPositioning) {
                InteractionExtensions.Draggable(outer,
                                                new DraggableOptions {
                                                                             Cancel = ".window-inner, .CodeMirror, .CodeMirror-fullscreen, .CodeMirror-wrap, .CodeMirror-focused",
                                                                             Containment = "window",
                                                                             //TODO                Animate= true,
                                                                             OnStart = (evt, o) => { }
                                                                     }
                        );
                InteractionExtensions.Resizable(outer,
                                                new ResizableOptions {
                                                                             Handles = "n, e, s, w, ne, se, sw, nw",
                                                                             OnResize = (evt, o) => { ui.onResize(evt, o); }
                                                                     });
            }

            ui.Element = inner;

            //inner.Append(ui.Element);
            return ui;
        }

        public void Focus(UIAreaInformation info)
        {
            for (var i = 0; i < UIAreas.Count; i++) {
                UIAreas[i].Element.CSS("z-index", int.Parse(UIAreas[i].Element.GetCSS("z-index")) - 1);
            }
            info.Element.CSS("z-index", 1900);
        }
    }
    public class UIAreaInformation
    {
        [ScriptName("element")]
        public jQueryObject Element { get; set; }
        [ScriptName("inner")]
        public jQueryObject Inner { get; set; }

        public UIAreaInformation(jQueryObject element, jQueryObject inner)
        {
            Element = element;
            Inner = inner;
        }
    }
}
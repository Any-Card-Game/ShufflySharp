using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi;
using jQueryApi.UI.Interactions;
namespace ShuffUI
{
    public class ShuffWindow : ShuffPanel
    {
        public jQueryObject outer;
        [IntrinsicProperty]
        internal jQueryObject Window { get; set; }
        internal jQueryObject Outer
        {
            get { return outer; }
            set
            {
                outer = value;
                InteractionExtensions.Resizable(outer, new ResizableOptions {Handles = "n, e, s, w, ne, se, sw, nw", OnResize = onResize});
            }
        }
        [IntrinsicProperty]
        public Action OnClose { get; set; }
        [IntrinsicProperty]
        public string Title { get; set; }
        [IntrinsicProperty]
        public bool AllowClose { get; set; }
        [IntrinsicProperty]
        public bool AllowMinimize { get; set; }
        [IntrinsicProperty]
        public bool StaticPositioning { get; set; }
        [IntrinsicProperty]
        public UIAreaInformation Information { get; set; }

        public ShuffWindow()
                : base() {}

        public void onResize(jQueryEvent e, ResizableResizeEvent uievent)
        {
            Width = uievent.Size.Width + "px";
            Height = uievent.Size.Height + "px";

            foreach (var shuffElement in Elements) {
                shuffElement.ParentSizeChanged(new SizeChangedEvent(Width, Height));
            }
        }

        public override void BindCustomEvents()
        {
            base.BindCustomEvents();
            VisibleChanged += (e) => {
                                  if (Outer != null)
                                      Outer.CSS("display", e.Visible ? "block" : "none");
                              };
/*            SizeChanged += (e) => {

                               outer.CSS("width", this.Width);
                               outer.CSS("height", this.Height);
                           };*/
        }

        public void SwingBack()
        {
            JsDictionary<string, object> js = new JsDictionary<string, object>();

            js["left"] = X + "px";
            js["top"] = Y + "px";

            Information.Element.Animate(js, EffectDuration.Fast, EffectEasing.Swing);
        }

        public void SwingAway(SwingDirection direction, bool simulate = false)
        {
            JsDictionary<string, object> js = new JsDictionary<string, object>();

            string distance = "2000";

            switch (direction) {
                case SwingDirection.TopLeft:
                    js["left"] = "-" + distance + "px";
                    js["top"] = "-" + distance + "px";
                    break;
                case SwingDirection.Top:
                    js["top"] = "-" + distance + "px";
                    break;
                case SwingDirection.TopRight:
                    js["left"] = distance + "px";
                    js["top"] = "-" + distance + "px";
                    break;
                case SwingDirection.Right:
                    js["left"] = distance + "px";
                    break;
                case SwingDirection.BottomRight:
                    js["left"] = distance + "px";
                    js["top"] = distance + "px";
                    break;
                case SwingDirection.Bottom:
                    js["top"] = distance + "px";
                    break;
                case SwingDirection.BottomLeft:
                    js["left"] = "-" + distance + "px";
                    js["top"] = distance + "px";
                    break;
                case SwingDirection.Left:
                    js["left"] = distance + "px";
                    break;
            }

            if (simulate) Information.Element.CSS(js);
            else Information.Element.Animate(js, EffectDuration.Slow, EffectEasing.Swing);
        }
    }
    public class ShuffWindow<T> : ShuffWindow
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffWindow(T data)
                : base() {}
    }
}
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

        public void onResize(jQueryEvent e, ResizeEvent uievent)
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
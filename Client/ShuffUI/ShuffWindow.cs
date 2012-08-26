using System.Runtime.CompilerServices;
using jQueryApi;
using jQueryApi.UI.Interactions;

namespace Client.ShuffUI
{
    public class ShuffWindow<T> : ShuffPanel
    {
        public jQueryObject outer;

        public ShuffWindow(T data)
            : base()
        {
            Data = data;
        }
        public ShuffWindow()
            : base()
        {
        }

        [IntrinsicProperty]
        public T Data { get; set; }

        internal jQueryObject Window { get; set; }

        internal jQueryObject Outer
        {
            get { return outer; }
            set
            {
                outer = value;
                outer.Resizable(new ResizableOptions { Handles = "n, e, s, w, ne, se, sw, nw" });
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


        public override void BindCustomEvents()
        {
            base.BindCustomEvents();
            VisibleChanged += (e) =>
                                  {
                                      if (Window != null)
                                      {
                                          Window.CSS("display", e.Visible ? "block" : "none");
                                      }
                                  };

        }
    }
}
using System.Runtime.CompilerServices;
using CommonLibraries;
using jQueryApi;
namespace WebLibraries.ShuffUI.ShuffUI
{
    public class ShuffElement
    {
        public ShuffUIEvent<ParentChangedEvent> ParentChanged;
        public ShuffUIEvent<SizeChangedEvent> ParentSizeChanged;
        public ShuffUIEvent<PositionChangedEvent> PositionChanged;
        public ShuffUIEvent<SizeChangedEvent> SizeChanged;
        public ShuffUIEvent<VisibleChangedEvent> VisibleChanged;
        private Number myHeight;
        private bool myVisible;
        private Number myWidth;
        private int myX;
        private int myY;
        public DockStyle Dock { get; set; }
        public int X
        {
            get { return myX; }
            set
            {
                myX = value;
                PositionChanged(new PositionChangedEvent(myX, myY));
            }
        }
        public ShuffPanel Parent { get; set; }
        public int Y
        {
            get { return myY; }
            set
            {
                myY = value;
                PositionChanged(new PositionChangedEvent(myX, myY));
            }
        }
        public Number Width
        {
            get { return myWidth; }
            set
            {
                myWidth = value;
                SizeChanged(new SizeChangedEvent(myWidth, myHeight));
            }
        }
        public Number Height
        {
            get { return myHeight; }
            set
            {
                myHeight = value;
                SizeChanged(new SizeChangedEvent(myWidth, myHeight));
            }
        }
        [IntrinsicProperty]
        public jQueryObject Element { get; set; }
        public bool Visible
        {
            get { return myVisible; }
            set
            {
                myVisible = value;
                VisibleChanged(new VisibleChangedEvent(myVisible));
            }
        }

        public ShuffElement()
        {
            myWidth = 0;
            myHeight = 0;
            BindEvents();
        }

        internal void BindEvents()
        {
            SizeChanged += (e) => {
                               if (( (dynamic) e.Width )) {
                                   myWidth = e.Width;
                                   Element.CSS("width", e.Width);
                               }
                               if (( (dynamic) e.Height )) {
                                   myHeight = e.Height;

                                   Element.CSS("height", e.Height);
                               }
                           };
            ParentSizeChanged += (e) => {
                                     switch (Dock) {
                                         case DockStyle.None:
                                             break;
                                         case DockStyle.Fill:
                                             Width = e.Width;
                                             Height = e.Height;
                                             break;
                                         case DockStyle.FillWidth:
                                             Width = e.Width;
                                             break;
                                         case DockStyle.FillHeight:
                                             Height = e.Height;
                                             break;
                                     }
                                 };
            PositionChanged += (e) => {
                                   Element.CSS("left", e.X + "px");
                                   Element.CSS("top", e.Y + "px");
                               };

            VisibleChanged += (e) => Element.CSS("display", e.Visible ? "block" : "none");

            ParentChanged += ( (e) => {
                                   Parent = e.Parent;

                                   if (Parent == null)
                                       Element.Remove();
                                   else
                                       Parent.Element.Append(Element);
                               } );
            BindCustomEvents();
        }

        public virtual void BindCustomEvents() {}
    }
}
using System;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    [Serializable]
    public class ShuffOptions
    {
        public bool Visible = true;

        public int X { get; set; }
        public int Y { get; set; }
        public Number Width { get; set; }
        public Number Height { get; set; }
    }

    public class ShuffElement
    {
        private bool myVisible;
        private int myX;
        private int myY;
        private Number myWidth;
        private Number myHeight;


        public ShuffUIEvent<ParentChangedEvent> ParentChanged;
        public ShuffUIEvent<PositionChangedEvent> PositionChanged;
        public ShuffUIEvent<SizeChangedEvent> SizeChanged;
        public ShuffUIEvent<VisibleChangedEvent> VisibleChanged;

        public ShuffElement()
        {
            myWidth = 0;
            myHeight = 0;
            BindEvents();
        }

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
        internal void BindEvents()
        {

            SizeChanged += (e) =>
                               {
                                   if (((dynamic)e.Width))
                                       Element.CSS("width", e.Width );
                                   if (((dynamic)e.Height))
                                       Element.CSS("height", e.Height );
                               };

            PositionChanged += (e) =>
                                   {

                                       Element.CSS("left", e.X + "px");
                                       Element.CSS("top", e.Y + "px");
                                   };

            VisibleChanged += (e) => Element.CSS("display", e.Visible ? "block" : "none");

            ParentChanged += ((e) =>
                                  {
                                      Parent = e.Parent;

                                      if (Parent == null)
                                          Element.Remove();
                                      else
                                      {
                                          Parent.Element.Append(this.Element);
                                      }

                                  });
            BindCustomEvents();
        }

        public virtual void BindCustomEvents()
        {
        }
    }
}
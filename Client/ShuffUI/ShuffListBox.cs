using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{


    [Serializable]
    public class ShuffListBoxOptions : ShuffOptions
    {
        [IntrinsicProperty]
        public string Label { get; set; }
        [IntrinsicProperty]
        public List<ShuffListItem> Items { get; set; }
        [IntrinsicProperty]
        public Func<ShuffListItem, int, jQueryObject> ItemCreation { get; set; }
        [IntrinsicProperty]
        public ShuffUIEvent<ItemClickedEvent> OnClick { get; set; }
    }

    public class ShuffListBox : ShuffElement
    {
        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public Func<ShuffListItem, int, jQueryObject> ItemCreation { get; set; }
        [IntrinsicProperty]
        public ShuffUIEvent<ItemClickedEvent> OnClick { get; set; }

        [IntrinsicProperty]
        public List<ShuffListItem> Items { get; set; }


        public ShuffListBox(ShuffListBoxOptions options)
        {

            var but = jQuery.Select("<div></div>");
            this.Element = but;

            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;






            /* var theme = "getTheme()".me();
                     var theme = getTheme();
        but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
        but.bind('select', function (event) {
            var item = event.args.item;
            if (options.click)
                options.click(item);
        });
        return but;
             */

        }

        public override void BindCustomEvents()
        {
        }

        public void AddItem(ShuffListItem p0)
        {
        }
    }

    public class ShuffListItem
    {
        public ShuffListItem(string label, int value)
        {
            Label = label;
            Value = value;
        }

        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public int Value { get; set; }
    }

    public class ShuffListBox<T> : ShuffListBox
    {
        public ShuffListBox(ShuffListBoxOptions opts, T data)
            : base(opts)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }
}



/*
        public jQueryObject AddListBox(ShuffListBox element)
        {
            Elements.Add(element);


            var but = jQuery.Select("<div></div>");
            element.Element = but;
            Window.Append(but);
            but.CSS("position", "absolute");
            but.CSS("left", element.X + "px");
            but.CSS("top", element.Y + "px");


            /* var theme = "getTheme()".me();
                     var theme = getTheme();
        but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
        but.bind('select', function (event) {
            var item = event.args.item;
            if (options.click)
                options.click(item);
        });
        return but;
             #1#
            return but;
        }

        public jQueryObject AddPropertyBox(ShuffPropertyBox shuffPropertyBox)
        {
            var but = jQuery.Select("<div></div>");
            Window.Append(but);
            but.CSS("position", "absolute");
            but.CSS("left", shuffPropertyBox.X);
            but.CSS("top", shuffPropertyBox.Y);
            but.CSS("width", shuffPropertyBox.Width);
            but.CSS("height", shuffPropertyBox.Height);
            but.CSS("overflow", "scroll");


            shuffPropertyBox.items = new List<ShuffListItem>();
            shuffPropertyBox.addItem = (ij) =>
                {
                    but.Append(shuffPropertyBox.ItemCreation(ij, shuffPropertyBox.items.Count));
                    shuffPropertyBox.items.Add(ij);
                };
            return but;
        }
        */
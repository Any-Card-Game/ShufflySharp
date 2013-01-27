using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CommonLibraries;
using jQueryApi;
namespace ShuffUI
{
    public class ShuffListBox : ShuffElement
    {
        [IntrinsicProperty]
        public Func<ShuffListItem, int, jQueryObject> ItemCreation { get; set; }
        [IntrinsicProperty]
        public ShuffUIEvent<ItemClickedEvent> OnClick { get; set; }
        [IntrinsicProperty]
        public List<ShuffListItem> Items { get; set; }

        public ShuffListBox(int x, int y, Number width, Number height)
        {
            var but = jQuery.Select("<div style='position:absolute;'></div>");
            Element = but;

            X = x;
            Y = y;
            Width = width;
            Height = height;
            Visible = true;
            Items = new List<ShuffListItem>();

            var theme = "getTheme()".eval();
            ExtensionMethods.me(but).jqxListBox(new {source = Items, width = (int) width, height = (int) height, theme = theme});

            Window.SetTimeout(() => {
                                  but.GetElement(0).Style.Left = X + "px";
                                  but.GetElement(0).Style.Top = Y + "px";
                              },
                              2000);

            but.Bind("select",
                     (e) => {
                         var item = ExtensionMethods.me(e).args.item;
                         if (OnClick != null)
                             OnClick(item);
                     });
        }

        public override void BindCustomEvents() {}

        public void AddItem(ShuffListItem p0)
        {
            Items.Add(p0);
            update();
        }

        private void update()
        {
            var theme = "getTheme()".me();
            ExtensionMethods.me(Element).jqxListBox(new {source = Items, width = (int) Width, height = (int) Height, theme = theme});
        }
    }
    public class ShuffListItem
    {
        [IntrinsicProperty]
        public string Label { get; set; }
        [IntrinsicProperty]
        public int Value { get; set; }

        public ShuffListItem(string label, int value)
        {
            Label = label;
            Value = value;
        }
    }
    public class ShuffListBox<T> : ShuffListBox
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffListBox(T data, int x, int y, Number width, Number height)
                : base(x, y, width, height)
        {
            Data = data;
        }
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
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi;
using jQueryApi.UI.Widgets;
namespace Client.ShuffUI
{
    [Serializable]
    public class ShuffButtonOptions : ShuffOptions
    {
        public DelegateOrValue<string> Text { get; set; }
        public ShuffUIEvent<ButtonClickedEvent> OnClick { get; set; }
    }
    public class ShuffButton : ShuffElement
    {
        private DelegateOrValue<string> myText;
        [IntrinsicProperty]
        public DelegateOrValue<string> Text
        {
            get { return myText; }
            set
            {
                myText = value;

            }
        }

        public ShuffButton(ShuffButtonOptions options)
        {
            Element = jQuery.Select("<div></div>");
            Element.CSS("position", "absolute");

            Text = options.Text;

            Text.StaticValueChanges += (value) =>
            {
                Element.Text(value);
            };

            Element.Text(Text);
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;
            Element.Button();
            Element.Click(a => options.OnClick(new ButtonClickedEvent(a.ClientX, a.ClientY)));

            Element.DisableSelection();
        }

        public override void BindCustomEvents() { }
    }
    public class ShuffButton<T> : ShuffButton
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffButton(ShuffButtonOptions options, T data)
            : base(options)
        {
            Data = data;
        }
    }
    public class DelegateOrValue<T>
    {
        public bool isValue;
        private Func<T> method;
        private T value;

        private DelegateOrValue(T d)
        {
            value = d;
            isValue = true;
        }

        private DelegateOrValue(Func<T> d)
        {
            method = d;
            isValue = false;
            oldValue = method();
        }

        private T oldValue;
        public Action<T> StaticValueChanges { get; set; }

        private T evaluate()
        {
            if (isValue == true) return value;

            else if (isValue == false)
            {
                T val = method();
                if (Cast<int>(val)!= Cast<int>(oldValue))
                {
                    StaticValueChanges(val);
                }
                oldValue = val;
                return val;
            }
            return default(T);
        }

        [InlineCode("{m}")]
        private static T Cast<T>(object m)
        {
            return default(T);
        }
        public static implicit operator DelegateOrValue<T>(T d)
        {
            return new DelegateOrValue<T>(d);
        }

        public static implicit operator DelegateOrValue<T>(Func<T> d)
        {
            return new DelegateOrValue<T>(d);
        }

        public static implicit operator T(DelegateOrValue<T> d)
        {
            return d.evaluate();
        }
    }

}
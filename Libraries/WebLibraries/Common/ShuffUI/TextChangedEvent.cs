using System;
using System.Runtime.CompilerServices;
namespace WebLibraries.Common.ShuffUI
{
    [Serializable]
    public class TextChangedEvent
    {
        [IntrinsicProperty]
        public string Text { get; set; }
        [IntrinsicProperty]
        public bool Live { get; set; }

        public TextChangedEvent(string text, bool live)
        {
            Live = live;
            Text = text;
        }
    }
}
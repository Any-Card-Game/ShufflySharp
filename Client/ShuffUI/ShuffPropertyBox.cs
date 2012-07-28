using System;
using System.Html;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffPropertyBox:ShuffElement
    {
        public Func<dynamic, int, jQueryObject> ItemCreation { get; set; }
    }
}
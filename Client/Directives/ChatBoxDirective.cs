using System;
using CommonLibraries;
using jQueryApi;

namespace Client.Directives
{
    public class ChatBoxDirective
    {
        public const string Name = "chatBox";
        public Action<dynamic, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string templateUrl;
        public bool transclude;

        public ChatBoxDirective()
        {
            restrict = "EA";
            templateUrl = string.Format("{0}partials/chatBox.html", Constants.ContentAddress);
            replace = true;
            scope = new
                    {
                        contents = "=",
                    };
            link = LinkFn;
        }

        private void LinkFn(dynamic scope, jQueryObject element, dynamic attr)
        {
        }
    }
}
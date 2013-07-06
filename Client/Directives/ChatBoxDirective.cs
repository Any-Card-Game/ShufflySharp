using System;
using CommonLibraries;
using jQueryApi;
namespace Client.Directives
{


    public class ChatBoxDirective
    {
        public Action<dynamic, jQueryObject, dynamic> link;
        public string templateUrl;
        public string restrict;
        public bool replace;
        public bool transclude;
        public dynamic scope;
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

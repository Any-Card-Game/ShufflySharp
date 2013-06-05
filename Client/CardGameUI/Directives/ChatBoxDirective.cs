using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CardGameUI.Scope;
using CardGameUI.Util;
using WebLibraries.ShuffUI.ShuffUI;
using jQueryApi;
namespace CardGameUI.Directives
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
            templateUrl = "http://content.anycardgame.com/partials/chatBox.html";
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

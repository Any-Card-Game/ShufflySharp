using System;
using CommonLibraries;
using jQueryApi;
namespace Client.Directives
{


    public class FancyListDirective
    {
        public Action<dynamic, jQueryObject, dynamic> link;
        public string templateUrl;
        public string restrict;
        public bool replace;
        public bool transclude;
        public dynamic scope;
        public FancyListDirective()
        {
            restrict = "EA";
            templateUrl = string.Format("{0}partials/fancyList.html", Constants.ContentAddress);
            replace = true;
            transclude = true;
            scope = new
            {
                items = "=",
                bind = "=",
            };
            link = LinkFn;

        }

        private void LinkFn(dynamic scope, jQueryObject element, dynamic attr)
        {
            scope.itemClick = new Action<dynamic>((item) =>
            {
                scope.bind = item;
            });

            scope.currentStyle = new Func<dynamic,dynamic>((item) =>
            {
                return new { backgroundColor = (item == scope.bind) ? "blue" : "white" };
            });
            scope.parentScope = scope["$parent"]["$parent"]["$parent"];
        }
    }

}

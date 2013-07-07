using System;
using CommonLibraries;
using jQueryApi;
namespace Client.Directives
{
    public class DraggableDirective
    {
        public Action<dynamic, jQueryObject, dynamic> link;
        public DraggableDirective()
        {
            link = linkFn;

        }

        private void linkFn(dynamic scope, jQueryObject element, dynamic attrs)
        {
            element.me().draggable(new { cancel = ".floating-window-inner" });
         } 
    }
 
}

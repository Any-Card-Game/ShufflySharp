using System;
using System.Collections.Generic;
using System.Html;
using Client.Angular.controllers;
using Client.Angular.interfaces;
using global;
using jQueryApi;
using ng;
namespace Client.Angular.directives
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
            element.Me().draggable( );
         } 
    }
 
}

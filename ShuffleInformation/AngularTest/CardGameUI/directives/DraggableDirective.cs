using System;
using CardGameUI.Util;
using jQueryApi;
namespace CardGameUI.Directives
{
  
    

    public class PropertyDirective
    {
        public Action<dynamic, jQueryObject, dynamic> link;
        public PropertyDirective()
        {
            link = linkFn;

        }

        private void linkFn(dynamic scope, jQueryObject element, dynamic attrs)
        {
            var prop = (EffectProperty)scope[attrs.property];
            switch (prop.Type) {
                case EffectPropertyType.Text:
            element[0].SetAttribute("type", "text");
                    break;
                case EffectPropertyType.Number:
            element[0].SetAttribute("type", "number");
                    break;
                case EffectPropertyType.Color:
            element[0].SetAttribute("type", "color");
                    break;
            }

         } 
    }
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

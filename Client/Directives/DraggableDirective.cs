using System;
using CommonLibraries;
using Models.SiteManagerModels.Game;
using jQueryApi;
namespace Client.Directives
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
            var prop = (GameEffectPropertyModel)scope[attrs.property];
            switch (prop.Type) {
                case GameEffectPropertyType.Text:
            element[0].SetAttribute("type", "text");
                    break;
                case GameEffectPropertyType.Number:
            element[0].SetAttribute("type", "number");
                    break;
                case GameEffectPropertyType.Color:
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
            element.me().draggable(new { cancel = ".floating-window-inner" });
         } 
    }
 
}

using System;
using jQueryApi;
using Models.SiteManagerModels.Game;

namespace Client.Directives
{
    public class PropertyDirective
    {
        public const string Name = "property";
        public Action<dynamic, jQueryObject, dynamic> link;

        public PropertyDirective()
        {
            link = linkFn;
        }

        private void linkFn(dynamic scope, jQueryObject element, dynamic attrs)
        {
            var prop = (GameEffectPropertyModel) scope[attrs.property];
            switch (prop.Type)
            {
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
}
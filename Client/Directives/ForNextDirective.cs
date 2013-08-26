using System;
using jQueryApi;
using ng;

namespace Client.Directives
{
    public class ForNextDirective
    {
        public const string Name = "forNext";
        public Action<IScope, jQueryObject, object> link;

        public ForNextDirective()
        {
            link = linkFn;
        }
        private static int forCounter=0;
        private void linkFn(IScope scope, jQueryObject element, object attrs)
        {

            forCounter++;

            var next = element.Next();
            string id = next.GetAttribute("id");
            if (id == null)
            {
                id = "forLink" + forCounter;
                next.Attribute("id", id);
            }

            element.Attribute("for", id);
        }
    }
}
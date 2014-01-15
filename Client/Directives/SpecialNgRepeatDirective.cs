using System;
using System.Collections.Generic;
using Client.Scope.Directive;
using Client.Services;
using CommonLibraries;
using jQueryApi;
using ng;
using NodeLibraries.NodeJS;
using Size = Client.Scope.Directive.Size;

namespace Client.Directives
{
    public class SpecialNgRepeatDirective
    {
        private readonly CompileService compileService;
        public const string Name = "specialNgRepeat";
        public Action<FloatingWindowScope, jQueryObject, dynamic> link;
        private jQueryObject myElement;
        private dynamic myScope;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string templateUrl;
        public bool transclude;

        public SpecialNgRepeatDirective(CompileService compileService)
        {
            this.compileService = compileService;
            restrict = "EA"; 
            replace = true; 
             link = LinkFn;
            scope = true;
        }

        private void LinkFn(IScope scope, jQueryObject element, dynamic attr)
        {
            var expression = (string)attr.specialNgRepeat;
            scope.Watch(expression, (cur) =>
                                    {
                                        var items = (List<object>)cur;
                                        var cloner = jQuery.FromElement(element[0]);

                                        var p = element.Parent();
                                        foreach (var item in items)
                                        {

                                            var e = angular.Element(cloner.Clone());
                                            var _scope = scope.New<dynamic>();
                                            _scope.item = item;
                                            var elk = compileService(e.Contents())(_scope);

                                            p.Append(elk);
                                             
                                        }
                                        cloner.Remove();
                                        });
        }

    }
}
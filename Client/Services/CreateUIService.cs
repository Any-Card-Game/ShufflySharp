
using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using CommonLibraries;
using jQueryApi;
using ng;
namespace Client.Services
{
    public class CreateUIService
    {
        private readonly CompileService myCompileService;
        private readonly IRootScopeService myRootScopeService;

        public CreateUIService(CompileService compileService, IRootScopeService rootScopeService)
        {
            myCompileService = compileService;
            myRootScopeService = rootScopeService;
        }

        public CreatedUI<T> Create<T>(string ui) where T : BaseScope
        {
            return Create<T>(ui, (a, b) => { });
        }
        public CreatedUI<T> Create<T>(string ui, Action<T, jQueryObject> populateScope) where T : BaseScope
        {

            T scope = myRootScopeService.New<T>();
            var html = jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress));
            populateScope(scope, html);
            var item = myCompileService(html)(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();

            return new CreatedUI<T>(scope,item);
        }

        private JsDictionary<string, AngularElement> singltons = new JsDictionary<string, AngularElement>();


        public CreatedUI<BaseScope> CreateSingleton(string ui)
        {
            return CreateSingleton<BaseScope>(ui);
        }
        public CreatedUI<T> CreateSingleton<T>(string ui) where T : BaseScope
        {
            return CreateSingleton<T>(ui, (a, b) => { });
        }
        public CreatedUI<T> CreateSingleton<T>(string ui, Action<T, jQueryObject> populateScope) where T : BaseScope
        {
            T scope;

            if (singltons.ContainsKey(ui))
            {

                var html = singltons[ui];
                if (html.Parent().Length == 0)
                {
                    singltons.Remove(ui);
                }
            }

            if (singltons.ContainsKey(ui))
            {

                var html = singltons[ui];
                
                scope = myRootScopeService.New<T>();
                populateScope(scope, html);
                myCompileService(html)(scope);
                scope.Apply();

                return new CreatedUI<T>(scope, html);
            }
            else
            {
                scope = myRootScopeService.New<T>();
                var html = jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress));
                populateScope(scope, html);
                var item = myCompileService(html)(scope);
                item.AppendTo(Window.Document.Body);
                scope.Apply();
                singltons[ui] = item;

                return new CreatedUI<T>(scope, item);
            } 

        }


        public CreatedUI<IScope> Create(string ui)
        {

            var scope = myRootScopeService.New();
            var item = myCompileService(jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress)))(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();
             

            return new CreatedUI<IScope>(scope, item);
        }
        public CreatedUI<IScope> Create(string ui, BaseScope scope)
        {

            var item = myCompileService(jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress)))(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();

            return new CreatedUI<IScope>(scope,item);
        }
    }

    public class CreatedUI<T> where T: IScope
    {
        public T Scope { get; set; }
        public AngularElement Element { get; set; }

        public CreatedUI(T scope,AngularElement element)
        {
            Scope = scope;
            Element = element;
        }

        public void Destroy()
        {
            Scope.Destroy();
            Element.Remove();

        }
    }
}


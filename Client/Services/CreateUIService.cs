
using System;
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

        public T Create<T>(string ui) where T : BaseScope
        {

            T scope = myRootScopeService.New<T>();
            var item = myCompileService(jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.WebIP)))(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();

            return scope;
        }
        public T Create<T>(string ui,Action<T,jQueryObject> populateScope) where T : BaseScope
        {

            T scope = myRootScopeService.New<T>();
            var html = jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.WebIP));
            populateScope(scope,html);
            var item = myCompileService(html)(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();

            return scope;
        }
        public IScope Create(string ui)
        {

            var scope = myRootScopeService.New();
            var item = myCompileService(jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.WebIP)))(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();

            return scope;
        }
        public IScope Create(string ui,BaseScope scope)
        {

            var item = myCompileService(jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.WebIP)))(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();

            return scope;
        }
    }
}


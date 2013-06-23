
using System;
using System.Html;
using Client.Scope;
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

        public void Create(string ui)
        {
 
            BaseScope scope = myRootScopeService.New<BaseScope>();
           var item = myCompileService(jQuery.FromHtml("<div ng-include src=\"'http://content.anycardgame.com/partials/UIs/" + ui + ".html'\"></div>"))(scope);
            item.AppendTo(Window.Document.Body);
            scope.Apply();


        }
    }
}


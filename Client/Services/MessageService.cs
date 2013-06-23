
using System;
using System.Html;
using Client.Scope;
using jQueryApi;
using ng;
namespace Client.Services
{
    public class MessageService
    {
        private readonly CompileService myCompileService;
        private readonly IRootScopeService myRootScopeService;

        public MessageService(CompileService compileService, IRootScopeService rootScopeService)
        {
            myCompileService = compileService;
            myRootScopeService = rootScopeService;
        }

        public void PopupOkay(string title, string message, Action callback)
        {
            AngularElement item = null;

            MessageScope mess = myRootScopeService.New<MessageScope>();
            mess.Okay = () =>
            {
                mess.Destroy();
                item.Remove();

                callback();

            };
            mess.Title = title;
            mess.Message = message;
            item = myCompileService(jQuery.FromHtml("<div ng-include src=\"'http://content.anycardgame.com/partials/UIs/Message.html'\"></div>"))(mess);
            item.AppendTo(Window.Document.Body);
            mess.Apply();


        }
    }
}


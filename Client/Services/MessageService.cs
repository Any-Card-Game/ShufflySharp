using System;
using Client.Controllers;
using Client.Scope.Controller;
using ng;

namespace Client.Services
{
    public class MessageService
    {
        public const string Name = "MessageService";
        private readonly CreateUIService myCreateUIService;
        private readonly IRootScopeService myRootScopeService;

        public MessageService(CreateUIService createUIService, IRootScopeService rootScopeService)
        {
            myCreateUIService = createUIService;
            myRootScopeService = rootScopeService;
        }

        public void PopupOkay(string title, string message, Action callback)
        {
            myCreateUIService.Create<MessageScope>(MessageController.View, (mess, item) =>
                                                              {
                                                                  mess.Model = new MessageModel();

                                                                  mess.Model.Callback = () =>
                                                                                        {
                                                                                            mess.Destroy();
                                                                                            item.Remove();

                                                                                            callback();
                                                                                        };
                                                                  mess.Model.Title = title;
                                                                  mess.Model.Message = message;
                                                                  mess.Model.MessageType = MessageType.Okay;
                                                              });
        }

        public void PopupQuestion(string title, string message, Action<string> callback)
        {
            myCreateUIService.Create<MessageScope>(MessageController.View, (mess, item) =>
                                                              {
                                                                  mess.Model = new MessageModel();

                                                                  mess.Model.Callback = () =>
                                                                                        {
                                                                                            mess.Destroy();
                                                                                            item.Remove();
                                                                                            callback(mess.Model.Response);
                                                                                        };
                                                                  mess.Model.Title = title;
                                                                  mess.Model.Message = message;
                                                                  mess.Model.MessageType = MessageType.Question;
                                                              });
        }
    }
}
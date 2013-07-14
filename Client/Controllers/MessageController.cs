using Client.Scope.Controller;
using Client.Services;

namespace Client.Controllers
{
    internal class MessageController
    {
        public const string Name = "MessageController";
        public const string View = "Message";
        private readonly MessageScope myScope;
        private readonly UIManagerService myUIManager;

        public MessageController(MessageScope scope)
        {
            myScope = scope;
        }
    }
}
using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models;

namespace Client.Services
{
    public class UIManagerService
    {
        public const string Name = "UIManagerService";

        public UIManagerService()
        {
            ClientInfo = new ClientInformation();
        }

        [IntrinsicProperty]
        public ClientInformation ClientInfo { get; set; }

        [IntrinsicProperty]
        public Action<FloatingWindowScope> OnMinimize { get; set; }
    }
}
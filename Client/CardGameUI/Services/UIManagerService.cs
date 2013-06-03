using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
using Client;
namespace CardGameUI.Services
{
    internal class UIManagerService
    {
        [IntrinsicProperty]
        public Action UserLoggedIn { get; set; }
        public PageHandler PageHandler { get { return PageHandler.Handler; } }

    }
}
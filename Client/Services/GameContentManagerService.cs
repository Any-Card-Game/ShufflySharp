using System;
using System.Runtime.CompilerServices;

namespace Client.Services
{
    public class GameContentManagerService
    {
        public const string Name = "GameContentManagerService";
        public GameContentManagerService()
        {
        }

        [IntrinsicProperty]
        public Action Redraw { get; set; }
    }
}
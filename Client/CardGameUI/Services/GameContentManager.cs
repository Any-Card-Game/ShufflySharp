using System;
using System.Runtime.CompilerServices;
namespace CardGameUI.Services
{
    public class GameContentManager
    {
        public GameContentManager( )
        { 
        }

        [IntrinsicProperty]
        public Action Redraw { get; set; }
    }
}
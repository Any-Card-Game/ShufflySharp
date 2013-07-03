using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class TestGameControllerScope : BaseScope
    { 
        [IntrinsicProperty]
        public TestGameControllerScopeModel Model { get; set; }

    }
    [Serializable]
    public class TestGameControllerScopeModel  
    {
        public GameLayoutModel MainLayout { get; set; }
        public Point Scale { get; set; }
        public Action MoveCard { get; set; }
        public Action AnimateCard { get; set; }
        public CardGameCard SelectedCard { get; set; }

    }

 

}
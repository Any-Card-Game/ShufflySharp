using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;
namespace Client.Scope.Controller
{
    public class GameManagerScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameManagerModel Model { get; set; }

    }
    [Serializable]
    public class GameManagerModel
    {
        public List<GameModel> Games { get; set; }
        public GameModel SelectedGame { get; set; }
        public Action CreateGame { get; set; }
        public Action DeleteGame { get; set; }
    }
 }
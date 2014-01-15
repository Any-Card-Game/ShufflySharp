using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Scope.Controller;
using CommonLibraries;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{

    public class DebugSpaceScope : BaseScope
    {

        [IntrinsicProperty]
        public DebugGameModel GameModel { get; set; }


        [IntrinsicProperty]
        public DebugSpace Space { get; set; }


        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; }
    }
}
public class DebugSpaceCard
{
    [IntrinsicProperty]
    public CardGameCard GameCard { get; set; }

    [IntrinsicProperty]
    public bool PlaceHolder { get; set; }
    [IntrinsicProperty]
    public bool Dragging { get; set; }

    [IntrinsicProperty]
    public Rectangle Location { get; set; }

    [IntrinsicProperty]
    public int Index { get; set; }
}
public class DebugSpace
{
    [IntrinsicProperty]
    public CardGameTableSpace GameSpace { get; set; }

    [IntrinsicProperty]
    public List<DebugSpaceCard> Cards { get; set; }
    [IntrinsicProperty]
    public Rectangle Location { get; set; }
}

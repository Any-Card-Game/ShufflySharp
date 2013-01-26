using System;
using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("TableTextArea")] 
    public class GameCardGameTextArea
    {
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public string Text { get; set; }

        public GameCardGameTextArea(GameCardGameTextAreaOptions options)
        {
            Name = options.Name ?? "Text Area";
            X = options.X == 0 ? 0 : options.X;
            Y = options.Y == 0 ? 0 : options.Y;
            Text = options.Text ?? "Text";
        }
    }
}
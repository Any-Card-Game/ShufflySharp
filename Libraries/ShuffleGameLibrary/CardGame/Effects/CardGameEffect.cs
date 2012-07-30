using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effects")]
    public class CardGameEffect
    {
        public CardGameEffect()
        {
            Type = "";
            DrawTime = DrawTime.Pre;
        }

        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }

        [ScriptName("post")]
        [IntrinsicProperty]
        public DrawTime DrawTime { get; set; }
    }
    public enum DrawTime
    {
        Pre,During,Post
    }
}
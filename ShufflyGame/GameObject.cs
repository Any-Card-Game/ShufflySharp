using System.Runtime.CompilerServices;
using NodeJS;

namespace ShufflyGame
{
    public class GameObject : NodeModule
    {
        [ScriptName("shuff")]
        public Shuff Shuff;

        [ScriptName("cardGame")]
        public GameCardGame CardGame;

        [ScriptName("constructor")]
        public void Constructor()
        {
        }
        [ScriptName("runGame")]
        public void RunGame()
        {
        }
    }
}
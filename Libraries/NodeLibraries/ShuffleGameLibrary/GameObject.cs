using System.Runtime.CompilerServices;
using NodeJSLibrary;

namespace ShufflyGameLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]

    public class GameObject : NodeModule
    {

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
using System.Runtime.CompilerServices;
using NodeJSLibrary; 

namespace global
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
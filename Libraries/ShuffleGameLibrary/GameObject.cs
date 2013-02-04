using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace global
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class GameObject : NodeModule
    {
        public GameCardGame CardGame;
        public void Constructor() {}
        public void RunGame() {}
        
    }
}
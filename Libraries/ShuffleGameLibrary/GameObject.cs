using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace global
{
    [IgnoreNamespace]
    [Imported]
    public class GameObject : NodeModule
    {
        public GameCardGame CardGame;
        public void Constructor() {}
        public void RunGame() {}
        
    }
}
using System.Runtime.CompilerServices;

namespace NodeJS
{
    [GlobalMethods]
    public static class Node
    {

        public static TModule Require<TModule>(string name) where TModule : NodeModule
        {
            return null;
        }
    }
}
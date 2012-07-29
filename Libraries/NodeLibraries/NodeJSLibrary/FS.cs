using System;
using System.Runtime.CompilerServices;

namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class FS : NodeModule

    {
        [ScriptName("readFile")]
        public void ReadFile(string s, string encoding, Action<FileSystemError, string> ready)
        {
        }
    }
}
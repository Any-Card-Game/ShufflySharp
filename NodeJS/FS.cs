using System;
using System.Runtime.CompilerServices;

namespace NodeJSLibrary
{
    public class FS : NodeModule

    {
        [ScriptName("readFile")]
        public void ReadFile(string s, Action<FileSystemError, object> ready)
        { 

        }
    }
}
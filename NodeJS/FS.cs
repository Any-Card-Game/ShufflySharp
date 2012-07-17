using System;
using System.Runtime.CompilerServices;
using NodeJS;

namespace ShufflyNode.Libs
{
    public class FS : NodeModule

    {
        [ScriptName("readFile")]
        public void ReadFile(string s, Action<FileSystemError, object> ready)
        { 

        }
    }
}
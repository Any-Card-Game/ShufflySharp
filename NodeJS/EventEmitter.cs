using System;
using System.Runtime.CompilerServices;

namespace NodeJS
{
    public class EventEmitter
    {
        [ScriptName("emit")]
        public void Emit(string channel, object content)
        {
        }
        [ScriptName("emit")]
        public void On<T>(string channel, Action<T> callback)
        {
        }
    }
}
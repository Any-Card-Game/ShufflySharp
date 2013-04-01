using System;
using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.Common.Charm
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("charm")]
    
    public class Charm : EventEmitter,NodeModule
    {


        public Charm Reset()
        {
            return this;
        }

        public Charm Pipe(STDOut stdOut)
        {
            return this;
        }
        public Charm Destroy()
        {
            return this;
        }
        public Charm End()
        {
            return this;
        }
        public Charm Write(object message)
        {
            return this;
        }
        public Charm Position(int x, int y)
        {
            return this;
        }
        public Charm Position(Action<int, int> callback)
        {
            return this;
        }
        public Charm Move(int x, int y)
        {
            return this;
        }
        public Charm Up(int y)
        {
            return this;
        }
        public Charm Down(int y)
        {
            return this;
        }

        public Charm Left(int x)
        {
            return this;
        }
        public Charm Right(int x)
        {
            return this;
        }


        public Charm Push(bool withAttributes = false)
        {
            return this;
        }
        public Charm Pop(bool withAttributes = false)
        {
            return this;
        }
        public Charm Erase(EraseType type)
        {
            return this;
        }
        public Charm Display(DisplayType type)
        {
            return this;
        }
        public Charm Foreground(CharmColors color)
        {
            return this;
        }
        public Charm Foreground(string color)
        {
            return this;
        }
        public Charm Foreground(int color)
        {
            return this;
        }
        public Charm Background(CharmColors color)
        {
            return this;
        }
        public Charm Background(string color)
        {
            return this;
        }
        public Charm Background(int color)
        {
            return this;
        }
        public Charm Cursor(bool visible)
        {
            return this;
        }
  
         
    }
}
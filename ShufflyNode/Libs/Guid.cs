using System;
using NodeJS;

namespace ShufflyNode.Libs
{
    public class Guid : NodeModule
    { 
        public string NewGuid()
        {
            string guid = "";
            for (int i = 0; i < 25; i++)
            {
                guid += ((char) (Math.Random()*26 + 65));
            }
            return guid;
        }
    }
}
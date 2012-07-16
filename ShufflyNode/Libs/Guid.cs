using System;
using NodeJS;

namespace ShufflyNode.Libs
{
    public static class Guid  
    { 
        public  static string NewGuid()
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
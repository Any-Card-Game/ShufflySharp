
using System.Collections.Generic;
using CommonLibraries;

namespace Client
{
    public class Class
    {
        public List<int> fmsint { get; set; }
        public Class()
        {
            fmsint = new List<int>();

            

            foreach (var i in fmsint)
            {
                Console.Log(i);
            }

            Console.Log("-scscs-");
        }
    }
}//implicit ==null fixes
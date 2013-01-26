using System;
using CommonLibraries;
namespace SiteServer
{
    public class SiteServer
    {
        public static void Main()
        {
            try {
                new SiteServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.ToString());
            }
        }
    }
}
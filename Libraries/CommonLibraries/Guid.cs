using System;

namespace CommonLibraries
{
    public static class Guid
    {
        public static string NewGuid()
        {
            var guid = "";
            for (var i = 0; i < 12; i++)
            {
                guid += string.FromCharCode((char) int.Parse((Math.Random()*26 + 65).ToString()));
            }
            return guid;
        }
    }
}
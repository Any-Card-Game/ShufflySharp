using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class SiteLoginRequest
    {
        public string Hash { get; set; }

        [ObjectLiteral]
        public SiteLoginRequest(string hash)
        {
            Hash = hash;
        }
    }
}
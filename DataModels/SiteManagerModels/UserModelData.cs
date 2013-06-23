using System;
using NodeLibraries.MongoDB;
namespace DataModels.SiteManagerModels
{
    [Serializable]
    public class UserModelData : MongoDocument
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
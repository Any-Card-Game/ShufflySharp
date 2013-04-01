using System;
using NodeLibraries.MongoDB;
namespace CommonShuffleLibrary.Data
{
    [Serializable]
    public class UserModelData : MongoDocument
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
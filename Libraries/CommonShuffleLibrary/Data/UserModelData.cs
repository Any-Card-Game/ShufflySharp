using System;
using MongoDBLibrary;
namespace CommonShuffleLibrary.Data
{
    [Serializable]
    public class UserModelData : MongoDocument
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
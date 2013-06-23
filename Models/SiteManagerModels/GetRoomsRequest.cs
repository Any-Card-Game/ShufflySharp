using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetRoomsRequest
    {
        public string GameType { get; set; }

        [ObjectLiteral]
        public GetRoomsRequest(string gameType)
        {
            GameType = gameType;
        }
    }
    [Serializable]
    public class GetGamesByUserRequest
    {
        public string UserHash { get; set; }

        [ObjectLiteral]
        public GetGamesByUserRequest(string userHash)
        {
            UserHash = userHash;
        }
    }
    [Serializable]
    public class StartGameRequest
    { 

        [ObjectLiteral]
        public StartGameRequest()
        { 
        }
    }
    
}
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
    public class StartGameRequest
    { 

        [ObjectLiteral]
        public StartGameRequest()
        { 
        }
    }
    
}
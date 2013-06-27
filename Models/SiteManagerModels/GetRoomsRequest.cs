using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
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
    public class DeveloperCreateGameRequest
    {
        public string GameName { get; set; }

        [ObjectLiteral]
        public DeveloperCreateGameRequest(string gameName)
        {
            GameName = gameName;
        }
    }
    [Serializable]
    public class DeveloperUpdateGameRequest
    {
        public GameModel GameModel { get; set; }

        [ObjectLiteral]
        public DeveloperUpdateGameRequest(GameModel gameModel)
        {
            GameModel = gameModel;
        }
    }


    [Serializable]
    public class DeveloperCreateGameResponse
    {
        public GameModel GameModel { get; set; }

        [ObjectLiteral]
        public DeveloperCreateGameResponse(GameModel gameModel)
        {
            GameModel = gameModel;
        }
    }
    [Serializable]
    public class DeveloperUpdateGameResponse
    {
        public bool Success { get; set; }

        [ObjectLiteral]
        public DeveloperUpdateGameResponse(bool success)
        {
            Success = success;
        }
    }

    [Serializable]
    public class DoesGameExistRequest
    {
        public string GameName { get; set; }

        [ObjectLiteral]
        public DoesGameExistRequest(string gameName)
        {
            GameName = gameName;
        }
    }
    [Serializable]
    public class DoesGameExistResponse
    {
        public string GameName { get; set; }
        public bool Exists { get; set; }

        [ObjectLiteral]
        public DoesGameExistResponse(string gameName,bool exists)
        {
            GameName = gameName;
            Exists = exists;
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
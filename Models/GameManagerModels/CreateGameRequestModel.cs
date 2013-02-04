using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
{
    [Serializable]
    public class CreateGameRequestModel
    {
        public string Name { get; set; }
        public string GameName { get; set; }

        [ObjectLiteral]
        public CreateGameRequestModel(string name, string gameName)
        {
            Name = name;
            GameName = gameName;
        }

        private CreateGameRequestModel() { }
    }
    [Serializable]
    public class GameCreateRequestModel
    { 
        public string GameType { get; set; }
        public List<UserLogicModel> Players { get; set; }

        [ObjectLiteral]
        public GameCreateRequestModel(string gameType,List<UserLogicModel> players)
        { 
            GameType = gameType;
            Players = players;
        }

        private GameCreateRequestModel() { }
    }
}
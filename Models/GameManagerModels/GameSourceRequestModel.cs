using System;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
{
    [Serializable]
    public class GameSourceRequestModel
    {
        public string GameName { get; set; }
        private GameSourceRequestModel() {}

        [ObjectLiteral]
        public GameSourceRequestModel(string gameName)
        {
            GameName = gameName;
        }
    }
}
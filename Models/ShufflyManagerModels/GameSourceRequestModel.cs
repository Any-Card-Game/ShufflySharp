using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
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
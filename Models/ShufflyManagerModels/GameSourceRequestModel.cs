using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameSourceRequestModel
    {
        private GameSourceRequestModel() {}
        public string GameName { get; set; }

        [ObjectLiteral]
        public GameSourceRequestModel(string gameName)
        {
            GameName = gameName;
        }
    }
}
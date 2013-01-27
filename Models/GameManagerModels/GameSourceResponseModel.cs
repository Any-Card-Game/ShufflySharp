using System;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
{
    [Serializable]
    public class GameSourceResponseModel
    {
        public string Content { get; set; }
        private GameSourceResponseModel() {}

        [ObjectLiteral]
        public GameSourceResponseModel(string content)
        {
            Content = content;
        }
    }
}
using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
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
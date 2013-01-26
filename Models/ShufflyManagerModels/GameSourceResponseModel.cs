using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameSourceResponseModel
    {
        private GameSourceResponseModel() {}
        public string Content { get; set; }

        [ObjectLiteral]
        public GameSourceResponseModel(string content)
        {
            Content = content;
        }
    }
}
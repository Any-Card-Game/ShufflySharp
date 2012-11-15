using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class GameSourceRequestModel
    {
        [IntrinsicProperty]
        public string GameName { get; set; }

        public GameSourceRequestModel(string name)
        {
            GameName = name;
        }
    }
}
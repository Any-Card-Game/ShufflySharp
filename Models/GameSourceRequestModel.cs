using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public  class GameSourceRequestModel
    {
        public GameSourceRequestModel(string name)
        {
            GameName = name;
        }

        [IntrinsicProperty]
        public string GameName { get; set; }
    }
}
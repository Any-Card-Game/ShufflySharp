using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class GameSourceRequestModel
    {
        public GameSourceRequestModel(string name)
        {
            GameName = name;
        }

        [IntrinsicProperty]
        public string GameName { get; set; }
    }
}
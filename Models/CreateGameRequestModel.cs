using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class CreateGameRequestModel
    {
        [IntrinsicProperty]
        public string Name { get; set; }

        [IntrinsicProperty]
        public string GameName { get; set; }
    }
}
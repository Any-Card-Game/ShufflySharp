using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class CreateGameRequestModel
    {
        public string Name { get; set; }
        public string GameName { get; set; }
        [ObjectLiteral]
        public CreateGameRequestModel(string name, string gameName)
        {
            Name = name;
            GameName = gameName;
        }

        private CreateGameRequestModel() {}
    }
}
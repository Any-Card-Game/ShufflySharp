using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
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

        private CreateGameRequestModel() { }

       
    }
    [Serializable]
    public class DebugCreateGameRequestModel
    {
        public string Name { get; set; }
        public string GameName { get; set; }
        public string Source { get; set; }
        public List<int> BreakPoints { get; set; }

        [ObjectLiteral]
        public DebugCreateGameRequestModel(string name, string gameName, string source, List<int> breakPoints)
        {
            Name = name;
            GameName = gameName;
            Source = source;
            BreakPoints = breakPoints;
        }

            private DebugCreateGameRequestModel() { } 
    }
}
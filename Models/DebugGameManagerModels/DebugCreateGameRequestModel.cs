using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
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

        private DebugCreateGameRequestModel() {}
    }
}
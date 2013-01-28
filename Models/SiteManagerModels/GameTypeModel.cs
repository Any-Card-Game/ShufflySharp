using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GameTypeModel
    {
        [ObjectLiteral]

        public GameTypeModel(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
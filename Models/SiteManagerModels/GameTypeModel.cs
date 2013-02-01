using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GameTypeModel
    {
        public string Name { get; set; }

        [ObjectLiteral]
        public GameTypeModel(string name)
        {
            Name = name;
        }
    }
}
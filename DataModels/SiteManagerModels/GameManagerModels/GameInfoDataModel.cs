using System;
using NodeLibraries.MongoDB;
namespace DataModels.GameManagerModels
{
    [Serializable]
    public class GameInfoDataModel : MongoDocument
    {
        public int AnswerIndex { get; set; }
        public string GameName { get; set; }
         
    }

}
using System;
using System.Collections.Generic;
using Models.SiteManagerModels.Game;
using NodeLibraries.MongoDB;
namespace DataModels.SiteManagerModels.Game
{
    [Serializable]


    public class GameDataModel:MongoDocument
    {
        public GameDataModel()
        {
        }

        public string Name { get; set; }
        public string UserHash { get; set; }
        public string Description { get; set; }
        public int MaxNumberOfPlayers { get; set; }

        public List<object> CardImages { get; set; }

        public List<object> Assets { get; set; }

        public GameCodeModel GameCode { get; set; }

        public GameLayoutModel GameLayout { get; set; }

        public List<GameLayoutScenario> GameLayoutScenarios { get; set; }
        public List<GameEffectModel> Effects { get; set; }

        public bool Deleted { get; set; }

        public GameModel ToModel()
        {

            return new GameModel() {
                ID=ID,
                                           Name = Name,
                                           UserHash = UserHash,
                                           Description = Description,
                                           MaxNumberOfPlayers = MaxNumberOfPlayers,
                                           CardImages = CardImages,
                                           Assets = Assets,
                                           GameCode = GameCode,
                                           GameLayout = GameLayout,
                                           GameLayoutScenarios = GameLayoutScenarios,
                                           Effects = Effects,
                                           Deleted=Deleted,

                                   };
        }
    }
}
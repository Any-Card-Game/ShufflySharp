using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetGamesByUserResponse
    {
        public List<GameModel> Games { get; set; }

        [ObjectLiteral]
        public GetGamesByUserResponse(List<GameModel> games)
        {
            Games = games;
        }
    }
}
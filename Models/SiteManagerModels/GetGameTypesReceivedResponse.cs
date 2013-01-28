using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetGameTypesReceivedResponse {
        [ObjectLiteral]
        public GetGameTypesReceivedResponse(List<GameTypeModel> gameTypes)
        {
            GameTypes = gameTypes;
        }

        public List<GameTypeModel> GameTypes { get; set; }
    }
}
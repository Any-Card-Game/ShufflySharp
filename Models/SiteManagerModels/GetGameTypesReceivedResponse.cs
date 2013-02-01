using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetGameTypesReceivedResponse
    {
        public List<GameTypeModel> GameTypes { get; set; }

        [ObjectLiteral]
        public GetGameTypesReceivedResponse(List<GameTypeModel> gameTypes)
        {
            GameTypes = gameTypes;
        }
    }
}
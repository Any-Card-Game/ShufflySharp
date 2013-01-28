using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace SiteServer
{
    public class SiteManager
    {
        private DataManager dataManager;
        private SiteClientManager myServerManager;

        public SiteManager(string siteServerIndex)
        {
            myServerManager = new SiteClientManager(siteServerIndex);

            dataManager = new DataManager();

            myServerManager.OnUserLogin += OnUserLogin;
            myServerManager.OnGetGameTypes += OnGetGameTypes;
            myServerManager.OnGetRooms += OnGetRooms;
        }

        void OnGetRooms(UserModel user, GetRoomsRequest data)
        {
            ExtensionMethods.debugger("");
             

            dataManager.SiteData.Room_GetAllByGameType(data.GameType,a => {myServerManager.SendRooms(user, new GetRoomsResponse(a));});
           
        }

        private void OnGetGameTypes(UserModel user)
        {
            var types = new List<GameTypeModel>() { new GameTypeModel("Blackjack"), new GameTypeModel("Sevens") };

            myServerManager.SendGameTypes(user, new GetGameTypesReceivedResponse(types));
        }

        private void OnUserLogin(UserModel user, SiteLoginRequest data)
        {
            Console.Log(user.UserName + "  " + data.Hash + "    We did it!");

            myServerManager.SendLoginResponse(user);
        }
    }
}
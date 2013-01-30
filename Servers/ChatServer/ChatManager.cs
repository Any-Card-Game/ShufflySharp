using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace ChatServer
{
    public class ChatManager
    {
        private readonly DataManager myDataManager;
        private ChatClientManager myServerManager;

        public ChatManager(string chatServerIndex)
        {
            myDataManager = new DataManager();
            myServerManager = new ChatClientManager(chatServerIndex);

             
            myServerManager.OnGetRooms += OnGetRooms; 

            myServerManager.OnUserDisconnect += OnUserDisconnect;
        }

        private void OnUserDisconnect(UserModel user, UserDisconnectModel data)
        {
            Console.Log("Awww, dat " + user.UserName + " disconnected");
            //removeUserFromRoom(data.User, (room) => { });
        }
         
        void OnGetRooms(UserModel user, GetRoomsRequest data)
        {
            myDataManager.SiteData.Room_GetAllByGameType(data.GameType, a => { myServerManager.SendRooms(user, new GetRoomsResponse(a)); });

        } 
    }
}
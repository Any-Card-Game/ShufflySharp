using System;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace ChatServer
{
    public class ChatClientManager
    {
        #region Delegates
         
        public delegate void GetRooms(UserModel user, GetRoomsRequest data); 
        public delegate void UserDisconnect(UserModel user, UserDisconnectModel data);
        
        #endregion

        private QueueManager qManager;
        public string ChatServerIndex { get; set; }

        public ChatClientManager(string chatServerIndex)
        {
            ChatServerIndex = chatServerIndex;

            Setup();
        }
         
        public event GetRooms OnGetRooms; 
        public event UserDisconnect OnUserDisconnect;
        
         

        private void Setup()
        {
            qManager = new QueueManager(ChatServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("SiteServer", null),
                                                                              new QueueWatcher(ChatServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "ChatServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      })); 
            qManager.AddChannel("Area.Site.GetRooms", (user, data) => OnGetRooms(user, (GetRoomsRequest)data)); 
            qManager.AddChannel("Area.Site.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel)data));
            
        } 
        public void SendRooms(UserModel user, GetRoomsResponse response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetRooms.Response", response);
        } 
    }
}
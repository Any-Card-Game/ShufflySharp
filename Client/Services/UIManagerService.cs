using System;
using System.Runtime.CompilerServices;
using Client.Directives;
using Models;
using Models.SiteManagerModels;
namespace Client.Services
{
    public class UIManagerService
    {
        [IntrinsicProperty]
        public Action UserLoggedIn { get; set; }
        [IntrinsicProperty]
        public Action<string> CreateRoom { get; set; }
        [IntrinsicProperty]
        public Action OpenCreateRoomDialog { get; set; }
        [IntrinsicProperty]
        public Action<RoomModel> OnRoomJoined { get; set; }

        [IntrinsicProperty]
        public Action RoomLeft { get; set; }
         

    //    [IntrinsicProperty]
//        public GameManager GameManager { get; set; }
        [IntrinsicProperty]
        public ClientInformation ClientInfo { get; set; }
        public Action<FloatingWindowScope> OnMinimize { get; set; }

        public UIManagerService(ClientGameManagerService clientGameManagerService)
        { 

            ClientInfo = new ClientInformation();
//            this.GameManager = new GameManager(clientGameManagerService,this);

        } 

    }
}
            

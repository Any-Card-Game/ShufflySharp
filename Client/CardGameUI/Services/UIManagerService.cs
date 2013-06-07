using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
using Client;
using Client.ShufflyGame;
using Models.GameManagerModels;
using Models.SiteManagerModels;
namespace CardGameUI.Services
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
        public Action<RoomData> OnRoomJoined { get; set; }

        [IntrinsicProperty]
        public Action RoomLeft { get; set; }
         

    //    [IntrinsicProperty]
//        public GameManager GameManager { get; set; }
        [IntrinsicProperty]
        public ClientInformation ClientInfo { get; set; }
        public UIManagerService(ClientGameManagerService clientGameManagerService)
        {
  //          gameDrawer = new GameDrawer();

            ClientInfo = new ClientInformation();
//            this.GameManager = new GameManager(clientGameManagerService,this);

        }
        
        public readonly GameDrawer gameDrawer;

    }
}
            

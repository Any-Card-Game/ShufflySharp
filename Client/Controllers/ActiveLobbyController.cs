using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models;
using Models.ChatManagerModels;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class ActiveLobbyController
    {
        private readonly ActiveLobbyScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly ClientChatManagerService myClientChatManagerService;
        private readonly CreateUIService myCreateUIService;

        public ActiveLobbyController(ActiveLobbyScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService,  ClientChatManagerService clientChatManagerService,CreateUIService createUIService)
        {


            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService; 
            myClientChatManagerService = clientChatManagerService;
            myCreateUIService = createUIService;
            myScope.Model = new ActiveLobbyModel();
            myScope.Model.ChatLines = new List<ChatMessageRoomModel>();
            myScope.Visible = false;
            myScope.Model.WindowClosed += () =>
            {
                myScope.SwingAway(SwingDirection.BottomRight, false, null);
                myClientSiteManagerService.LeaveRoom(new LeaveRoomRequest(myScope.Model.Room));
                uiManager.RoomLeft();
            };

            uiManager.OnRoomJoined = (room) =>
            {
                myScope.Visible = true;
                myScope.SwingAway(SwingDirection.BottomRight, true,null);
                myScope.Model.Room = room;
                PopulateGameRoom(room);
                myScope.SwingBack(null);
                myScope.Apply();
            };

            myScope.Model.StartGame += () => {
                                           myCreateUIService.Create("GameUI");
//                                           uiManager.GameManager.StartGame();
                                            clientSiteManagerService.StartGame(new StartGameRequest());  
                                           //UIWindow.Height = 200;
                                       };
            myScope.Model.SendChatMessage += () =>
            {
                if (myScope.Model.CurrentChatMessage.Trim() == string.Empty)
                    return;

                myClientChatManagerService.SendChatMessage(new SendChatMessageModel(myScope.Model.CurrentChatMessage.Trim()));

                myScope.Model.CurrentChatMessage = "";
            };

            myClientSiteManagerService.OnGetRoomInfoReceived += GetRoomInfo;
            myClientChatManagerService.OnGetChatLines += GetChatLines;
            myClientChatManagerService.OnGetChatInfo += GetChatInfo;
        }

        private void GetChatLines(UserModel user, ChatMessagesModel o)
        {
            myScope.Model.ChatLines.AddRange(o.Messages);
            myScope.Apply();
        }

        private void GetChatInfo(UserModel user, ChatRoomInfoModel o)
        {
            PopulateChatRoom(o.Info);
        }

        private void GetRoomInfo(UserModel user, GetRoomInfoResponse o)
        {
            PopulateGameRoom(o.Room);
        }

        private void PopulateChatRoom(ChatRoomModel roomDataData)
        {
            myScope.Model.Users = roomDataData.Users;
            myScope.Model.ChatLines.AddRange(roomDataData.Messages);
            myScope.Apply();
        }

        private void PopulateGameRoom(RoomModel roomModel)
        {
            
        }

    }
}
/* http://www.youtube.com/watch?v=dsQHNmaNxDg */
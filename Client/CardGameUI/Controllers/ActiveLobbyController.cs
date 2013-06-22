using System;
using System.Collections.Generic;
using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using Client;
using Client.UIWindow;
using Models;
using Models.ChatManagerModels;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Controllers
{
    internal class ActiveLobbyController
    {
        private readonly ActiveLobbyScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly ClientChatManagerService myClientChatManagerService;

        public ActiveLobbyController(ActiveLobbyScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService,  ClientChatManagerService clientChatManagerService,CompileService compile)
        {


            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService; 
            myClientChatManagerService = clientChatManagerService;
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
                                           var theScope = myScope;
                                           compile(jQueryApi.jQuery.FromHtml("<div ng-include src=\"'http://content.anycardgame.com/partials/gameUI.html'\"></div>"))(theScope).AppendTo(Window.Document.Body);



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

        private void PopulateChatRoom(ChatRoomModel roomData)
        {
            myScope.Model.Users = roomData.Users;
            myScope.Model.ChatLines.AddRange(roomData.Messages);
            myScope.Apply();
        }

        private void PopulateGameRoom(RoomData roomData)
        {
            
        }

    }
}
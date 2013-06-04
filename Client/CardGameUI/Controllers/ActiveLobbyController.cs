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

        public ActiveLobbyController(ActiveLobbyScope scope, UIManagerService uiManager)
        {


            myScope = scope;
            myUIManager = uiManager;
            myScope.Model = new ActiveLobbyModel();
            myScope.Model.ChatLines = new List<ChatMessageRoomModel>();
            myScope.Visible = false;
            myScope.Model.WindowClosed += () =>
            {
                myScope.SwingAway(SwingDirection.BottomRight, false);
                uiManager.PageHandler.ClientSiteManager.LeaveRoom(new LeaveRoomRequest(myScope.Model.Room));
                uiManager.RoomLeft();
            };

            uiManager.OnRoomJoined = (room) =>
            {
                myScope.Visible = true;
                myScope.SwingAway(SwingDirection.BottomRight, true);
                myScope.Model.Room = room;
                PopulateGameRoom(room);
                myScope.SwingBack();
                myScope.Apply();
            };

            myScope.Model.SendChatMessage += () =>
            {
                if (myScope.Model.CurrentChatMessage.Trim() == string.Empty)
                    return;

                uiManager.PageHandler.ClientChatManager.SendChatMessage(new SendChatMessageModel(myScope.Model.CurrentChatMessage.Trim()));

                myScope.Model.CurrentChatMessage = "";
            };

            myUIManager.PageHandler.ClientSiteManager.OnGetRoomInfoReceived += GetRoomInfo;
            myUIManager.PageHandler.ClientChatManager.OnGetChatLines += GetChatLines;
            myUIManager.PageHandler.ClientChatManager.OnGetChatInfo += GetChatInfo;
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
        }

        private void PopulateGameRoom(RoomData roomData) { }

    }
}
using System.Collections.Generic;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using Models;
using Models.ChatManagerModels;
using Models.SiteManagerModels;

namespace Client.Controllers
{
    internal class ActiveLobbyController
    {
        public const string View = "ActiveLobby";
        public const string Name = "ActiveLobbyController";
        private readonly ClientChatManagerService myClientChatManagerService;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly CreateUIService myCreateUIService;
        private readonly ActiveLobbyScope myScope;

        public ActiveLobbyController(ActiveLobbyScope scope, ClientSiteManagerService clientSiteManagerService,
            ClientChatManagerService clientChatManagerService, CreateUIService createUIService)
        {
            myScope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            myClientChatManagerService = clientChatManagerService;
            myCreateUIService = createUIService;
            myScope.Model.ChatLines = new List<ChatMessageRoomModel>();
            myScope.Visible = false;
            myScope.Model.WindowClosed += () =>
                                          {
                                              myScope.SwingAway(SwingDirection.BottomRight, false, null);
                                              myClientSiteManagerService.LeaveRoom(
                                                  new LeaveRoomRequest(myScope.Model.Room));
                                              myCreateUIService.CreateSingleton(HomeController.View);
                                              myScope.DestroyWindow();
                                          };


            myScope.Model.StartGame += () =>
                                       {
                                           myCreateUIService.Create(GameController.View);
                                           clientSiteManagerService.StartGame(new StartGameRequest());
                                           //UIWindow.Height = 200;
                                       };
            myScope.Model.SendChatMessage += () =>
                                             {
                                                 if (myScope.Model.CurrentChatMessage.Trim() == string.Empty)
                                                     return;

                                                 myClientChatManagerService.SendChatMessage(
                                                     new SendChatMessageModel(myScope.Model.CurrentChatMessage.Trim()));

                                                 myScope.Model.CurrentChatMessage = "";
                                             };

            myClientSiteManagerService.OnGetRoomInfoReceived += GetRoomInfo;
            myClientChatManagerService.OnGetChatLines += GetChatLines;
            myClientChatManagerService.OnGetChatInfo += GetChatInfo;
            myScope.OnReady = () =>
                              {
                                  myScope.Visible = true;
                                  myScope.SwingAway(SwingDirection.BottomRight, true, null);
                                  PopulateGameRoom(myScope.Model.Room);
                                  myScope.SwingBack(null);
                                  myScope.Apply();
                              };
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
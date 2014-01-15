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
        private readonly CreateUIService myCreateUIService;
        private readonly ActiveLobbyScope myScope;
        private readonly ClientManagerService clientManagerService;

        public ActiveLobbyController(ActiveLobbyScope scope, ClientManagerService clientManagerService,CreateUIService createUIService)
        {
            myScope = scope;
            this.clientManagerService = clientManagerService; 
            myCreateUIService = createUIService;
            myScope.Model.ChatLines = new List<ChatMessageRoomModel>();
            myScope.Visible = false;
            myScope.Model.WindowClosed += () =>
                                          {
                                              myScope.SwingAway(SwingDirection.BottomRight, false, null);
                                              clientManagerService.ClientSiteManagerService.LeaveRoom(
                                                  new LeaveRoomRequest(myScope.Model.Room));
                                              myCreateUIService.CreateSingleton(HomeController.View);
                                              myScope.DestroyWindow();
                                          };


            myScope.Model.StartGame += () =>
                                       {
                                           clientManagerService.ClientSiteManagerService.StartGame(new StartGameRequest());
                                       };
            clientManagerService.ClientGameManagerService.OnGameStarted += (user, room) =>
            {
                myCreateUIService.Create(GameController.View);
                //UIWindow.Height = 200;
            };


            myScope.Model.SendChatMessage += () =>
                                             {
                                                 if (myScope.Model.CurrentChatMessage.Trim() == string.Empty)
                                                     return;

                                                 clientManagerService.ClientChatManagerService.SendChatMessage(
                                                     new SendChatMessageModel(myScope.Model.CurrentChatMessage.Trim()));

                                                 myScope.Model.CurrentChatMessage = "";
                                             };

            clientManagerService.ClientSiteManagerService.OnGetRoomInfoReceived += GetRoomInfo;
            clientManagerService.ClientChatManagerService.OnGetChatLines += GetChatLines;
            clientManagerService.ClientChatManagerService.OnGetChatInfo += GetChatInfo;
            myScope.OnReady = () =>
                              {
                                  myScope.SwingAway(SwingDirection.BottomRight, true, null);
                                  PopulateGameRoom(myScope.Model.Room);
                                  myScope.SwingBack(null);
                              };
        }

        private void GetChatLines(UserModel user, ChatMessagesModel o)
        {
            myScope.Model.ChatLines.AddRange(o.Messages);
            myScope.Apply();
        }

        private void  GetChatInfo(UserModel user, ChatRoomInfoModel o)
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
            if (roomDataData.Messages!=null)
                myScope.Model.ChatLines.AddRange(roomDataData.Messages);
            myScope.Apply();
        }

        private void PopulateGameRoom(RoomModel roomModel)
        {
        }
    }
}

/* http://www.youtube.com/watch?v=dsQHNmaNxDg */
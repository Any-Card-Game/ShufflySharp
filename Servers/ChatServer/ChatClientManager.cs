using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
namespace ChatServer
{
    public class ChatClientManager
    {
        #region Delegates

        public delegate void CreateChatChannel(UserLogicModel user, CreateChatRoomRequest data);
        public delegate void JoinChatChannel(UserLogicModel user, JoinChatRoomRequest data);
        public delegate void LeaveChatRoom(UserLogicModel user);
        public delegate void SendMessage(UserLogicModel user, SendChatMessageModel data);
        public delegate void UserDisconnect(UserLogicModel user, UserDisconnectModel data);

        #endregion

        private QueueManager qManager;
        public string ChatServerIndex { get; set; }

        public ChatClientManager(string chatServerIndex)
        {
            ChatServerIndex = chatServerIndex;

            Setup();
        }

        public event CreateChatChannel OnCreateChatChannel;
        public event SendMessage OnSendMessage;
        public event JoinChatChannel OnJoinChatChannel;
        public event UserDisconnect OnUserDisconnect;
        public event LeaveChatRoom OnLeaveChatRoom;

        private void Setup()
        {
            qManager = new QueueManager(ChatServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("ChatServer", null),
                                                                              new QueueWatcher(ChatServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "ChatServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));

            qManager.AddChannel("Area.Chat.CreateChatRoom", (user, data) => OnCreateChatChannel(user, (CreateChatRoomRequest) data));
            qManager.AddChannel("Area.Chat.JoinChatRoom", (user, data) => OnJoinChatChannel(user, (JoinChatRoomRequest) data));
            qManager.AddChannel("Area.Chat.SendMessage", (user, data) => OnSendMessage(user, (SendChatMessageModel) data));
            qManager.AddChannel("Area.Chat.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel) data));
            qManager.AddChannel("Area.Chat.LeaveChatRoom", (user, data) => OnLeaveChatRoom(user));
        }

        public void SendChatLines(UserLogicModel user, ChatMessagesModel response)
        {
            qManager.SendMessage(user.Gateway, "Area.Chat.ChatLines.Response", user, response);
        }

        public void SendChatInfo(UserLogicModel user, ChatRoomModel response)
        {
            qManager.SendMessage(user.Gateway, "Area.Chat.ChatInfo.Response", user, new ChatRoomInfoModel(response));
        }

        public void RegisterChatServer(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Chat.RegisterServer", user, new RegisterServerModel(ChatServerIndex));
        }

        public void UnregisterChatServer(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Chat.UnregisterServer", user, new RegisterServerModel(ChatServerIndex));
        }
    }
}
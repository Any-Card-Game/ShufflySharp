using CommonShuffleLibrary;
using Models;
using Models.ChatManagerModels;
namespace ChatServer
{
    public class ChatClientManager
    {
        #region Delegates

        public delegate void CreateChatChannel(UserModel user, CreateChatRoomRequest data);
        public delegate void JoinChatChannel(UserModel user, JoinChatRoomRequest data);
        public delegate void SendMessage(UserModel user, SendChatMessageModel data);
        public delegate void UserDisconnect(UserModel user, UserDisconnectModel data);

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
        }

        public void SendChatLines(UserModel user, ChatMessagesModel response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Chat.ChatLines.Response", response);
        }

        public void SendChatInfo(UserModel user, ChatRoomModel response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Chat.ChatInfo.Response", new ChatRoomInfoModel(response));
        }
    }
}
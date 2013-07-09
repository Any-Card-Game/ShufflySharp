using System;
using CommonLibraries;
using CommonShuffleLibrary;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using global;
namespace ServerManager.ChatServer
{
    public class ChatServer
    {
        private string chatServerIndex;

        public ChatServer()
        {
            chatServerIndex = "ChatServer" + Guid.NewGuid();
            ServerLogger.InitLogger("ChatServer", chatServerIndex);
            Logger.Start(chatServerIndex);

            new ArrayUtils();
            Global.Process.On("exit", () => ServerLogger.Log("exi ChatServer", LogLevel.Information));
            ChatManager chatManager = new ChatManager(chatServerIndex);
        }

 
    }
}
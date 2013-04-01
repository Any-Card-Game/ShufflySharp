using System;
using CommonLibraries;
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
            Logger.Start(chatServerIndex);

            new ArrayUtils();
            Global.Process.On("exit", () => Logger.Log("exi ChatServer", LogLevel.Information));
            ChatManager chatManager = new ChatManager(chatServerIndex);
        }

 
    }
}
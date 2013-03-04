using System;
using CommonLibraries;
using CommonServerLibraries;
using MongoDBLibrary;
using NodeJSLibrary;
using global;
namespace ChatServer
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

        public static void Main()
        {
            try {
                new ChatServer();
            } catch (Exception exc) {
                Logger.Log("CRITICAL FAILURE: " + exc.GoodMessage(),LogLevel.Error);
            }
        }
    }
}
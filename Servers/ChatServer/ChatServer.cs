using System;
using CommonLibraries;
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
            new ArrayUtils();
            chatServerIndex = "ChatServer" + Guid.NewGuid();
            Global.Process.On("exit", () => Console.Log("exi ChatServer"));
            ChatManager chatManager = new ChatManager(chatServerIndex);
        }

        public static void Main()
        {
            try {
                new ChatServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
        }
    }
}
using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class RegisterServerModel
    {
        public string Server { get; set; }

        [ObjectLiteral]
        public RegisterServerModel(string server)
        {
            Server = server;
        }
    }
}
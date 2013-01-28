using System;
using Models;
namespace Client
{
    [Serializable]
    public class ClientInformation
    {
        public UserModel LoggedInUser { get; set; }
    }
}
using System;
namespace Models
{
    [Serializable]
    public class ClientInformation
    {
        public UserModel LoggedInUser { get; set; }
    }
}
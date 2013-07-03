using System;
using System.Runtime.CompilerServices;

namespace Models
{
    public class UserModel
    {

        [IntrinsicProperty]
        public string Gateway { get; set; }
        [IntrinsicProperty]
        public string UserName { get; set; }
        [IntrinsicProperty]
        public string Password { get; set; }
        [IntrinsicProperty]
        public string Hash { get; set; }
        public override string ToString()
        {
            return string.Format("Gateway: {0}, UserName: {1}, Password: {2}, Hash: {3}", Gateway, UserName, Password, Hash);
        }
    }
}
using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public  class CreateGameRequestModel
    {
        [IntrinsicProperty]
        public string Name { get; set; }

        [IntrinsicProperty]
        public string GameName { get; set; }
    }
}
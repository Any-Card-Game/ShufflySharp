using System;
using System.Runtime.CompilerServices;
namespace global
{ 
    [ScriptName("User")]
    public class CardGameUser
    {
        [IntrinsicProperty]
        public string UserName { get; set; }
        [IntrinsicProperty]
        public int PlayerDealingOrder { get; set; }
        [IntrinsicProperty]
        public CardGamePile Cards { get; set; }

        public CardGameUser(string name)
        {
            UserName = name;
            Cards = new CardGamePile(name);
        }
    }
}
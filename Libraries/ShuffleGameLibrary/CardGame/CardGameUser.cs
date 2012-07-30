using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("User")]
    public class CardGameUser
    {
        public CardGameUser(string name)
        {
            UserName = name;
            Cards = new CardGamePile(name);
        }

        [ScriptName("userName")]
        [IntrinsicProperty]
        public string UserName { get; set; }

        [ScriptName("playerDealingOrder")]
        [IntrinsicProperty]
        public int PlayerDealingOrder { get; set; }

        [ScriptName("cards")]
        [IntrinsicProperty]
        public CardGamePile Cards { get; set; }
    }
}
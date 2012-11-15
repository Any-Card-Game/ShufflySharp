using System.Runtime.CompilerServices;
namespace Models
{
    public class GameAnswerRequestModel
    {
        [IntrinsicProperty]
        public int Answer { get; set; }
        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
}
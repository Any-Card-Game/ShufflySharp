using System.Runtime.CompilerServices;

namespace Models
{
    public class GameSourceResponseModel
    {
        public GameSourceResponseModel(string content)
        {
            Content = content;
        }

        [IntrinsicProperty]
        public string Content { get; set; }
    }
}
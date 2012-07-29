using System.Runtime.CompilerServices;

namespace Models
{
    public class GameSourceResponseModel
    {
        [IntrinsicProperty]
        public string Content { get; set; }

        public GameSourceResponseModel(string content)
        {
            Content = content;
        }
    }
}
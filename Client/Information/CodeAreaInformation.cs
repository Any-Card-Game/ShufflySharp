using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.ShuffUI;
namespace Client.Information
{
    public class CodeAreaInformation
    {
        [IntrinsicProperty]
        public ShuffCodeEditor codeEditor { get; set; }
        [IntrinsicProperty]
        public ShuffCodeEditor console { get; set; }
        [IntrinsicProperty]
        public List<int> breakPoints { get; set; }
    }
}
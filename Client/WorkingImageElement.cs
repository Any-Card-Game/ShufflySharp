using System.Html;
using System.Runtime.CompilerServices;

namespace Client
{
    [IgnoreNamespace]
    [ScriptName("Image")]
    [Imported(IsRealType = true)]
    public sealed class WorkingImageElement : Element
    {

        public WorkingImageElement()
        {
        }

        public WorkingImageElement(int width)
        {
        }

        public WorkingImageElement(int width, int height)
        {
        }

        [IntrinsicProperty]
        public string Alt
        {
            get
            {
                return null;
            }
            set
            {
            }
        }

        [IntrinsicProperty]
        public bool Complete
        {
            get
            {
                return false;
            }
        }

        [IntrinsicProperty]
        public string Src
        {
            get
            {
                return null;
            }
            set
            {
            }
        }

        [IntrinsicProperty]
        public int Height
        {
            get
            {
                return 0;
            }
            set
            {
            }
        }

        [IntrinsicProperty]
        public int NaturalHeight
        {
            get
            {
                return 0;
            }
            set
            {
            }
        }

        [IntrinsicProperty]
        public int NaturalWidth
        {
            get
            {
                return 0;
            }
            set
            {
            }
        }

        [IntrinsicProperty]
        public int Width
        {
            get
            {
                return 0;
            }
            set
            {
            }
        }
    }
}
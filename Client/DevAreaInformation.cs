using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client
{


    public class HomeAreaInformation
    {
        [IntrinsicProperty]
        public jQueryObject txtUserName { get; set; }
        [IntrinsicProperty]
        public jQueryObject btnStartGame { get; set; }
        [IntrinsicProperty]
        public Action<dynamic> loadRoomInfo { get; set; }
    }
    public class QuestionAreaInformation
    {
        [IntrinsicProperty]
        public Action<dynamic> load { get; set; }
    }
    public class CodeAreaInformation
    {
        [IntrinsicProperty]
        public CodeMirrorLibrary.CodeMirror codeEditor { get; set; }

        [IntrinsicProperty]
        public CodeMirrorLibrary.CodeMirror console { get; set; }

        [IntrinsicProperty]
        public List<int> breakPoints { get; set; }
    }
    public class DevAreaInformation
    {
        [IntrinsicProperty]
        public jQueryObject txtNumOfPlayers { get; set; }
        [IntrinsicProperty]
        public Action<dynamic> loadRoomInfo { get; set; }
        [IntrinsicProperty]
        public jQueryObject varText { get; set; }
        [IntrinsicProperty]
        public jQueryObject lblAnother { get; set; }
        [IntrinsicProperty]
        public jQueryObject lblHowFast { get; set; }
        [IntrinsicProperty]
        public string gameServer { get; set; }
        [IntrinsicProperty]
        public Action beginGame { get; set; }
        [IntrinsicProperty]
        public int Joined { get; set; }
        [IntrinsicProperty]
        public bool Created { get; set; }

        [IntrinsicProperty]
        public Action<dynamic> loadRoomInfos { get; set; }
         
    }
}
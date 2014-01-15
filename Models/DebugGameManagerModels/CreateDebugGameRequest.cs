using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
    [Serializable]
    public class CreateDebugGameRequest
    {
        public int NumberOfPlayers { get; set; }
        public string GameName { get; set; }
        public List<int> Breakpoints { get; set; }

        [ObjectLiteral]
        public CreateDebugGameRequest(int numberOfPlayers, string gameName, List<int> breakpoints)
        {
            NumberOfPlayers = numberOfPlayers;
            GameName = gameName;
            Breakpoints = breakpoints;
        }
    }
    [Serializable]
    public class DestroyDebugGameRequest
    {
        public string RoomID { get; set; }

        [ObjectLiteral]
        public DestroyDebugGameRequest(string roomID)
        {
            RoomID = roomID;
        }
    }
    [Serializable]
    public class DebugResponse
    {
                public string RoomID { get; set; }
        public List<int> Breakpoints { get; set; }
        public StepType Step { get; set; }
        public bool Action { get; set; }
        public string VariableLookup { get; set; }

        [ObjectLiteral]
        public DebugResponse(string roomID, List<int> breakpoints, StepType step, bool action)
        {
            RoomID = roomID;
            Breakpoints = breakpoints;
            Step = step;
            Action = action;
        }
    }

    [NamedValues]
    public enum StepType
    {
        Into, Over, Out, Continue, Lookup
    }
}
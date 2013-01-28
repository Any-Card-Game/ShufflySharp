using System;
namespace Client.Libs
{
    [Serializable]
    public class TimeTracker
    {
        public int NumOfTimes { get; set; }
        public DateTime StartTime { get; set; }
        public int TimeValue { get; set; }
        public DateTime EndTime { get; set; }

        public TimeTracker()
        {
            StartTime = DateTime.Now;
        }
    }
}
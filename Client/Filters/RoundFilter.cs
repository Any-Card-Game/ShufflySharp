namespace Client.Filters
{
    public class RoundFilter
    {
        public const string Name = "round";


        public object Filter(object input)
        {
            return int.Parse(input.ToString());
        }
    }
}
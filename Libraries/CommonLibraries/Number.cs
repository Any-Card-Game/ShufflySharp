namespace CommonLibraries
{
    public class Number
    {
        private string Value;

        private Number(string s)
        {
            Value = s;
        }

        private Number(double s)
        {
            Value = s.ToString();
        }

        public static implicit operator double(Number d)
        {
            return double.Parse(d.Value);
        }

        public static implicit operator Number(string d)
        {
            return new Number(d);
        }

        public static implicit operator Number(double d)
        {
            return new Number(d);
        }

        public static implicit operator string(Number d)
        {
            return d.Value.IndexOf("%") < 0 ? d.Value + "px" : d.Value;
        }
    }
}
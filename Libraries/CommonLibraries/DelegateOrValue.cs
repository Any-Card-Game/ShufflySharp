using System;
using System.Runtime.CompilerServices;
namespace CommonLibraries
{
    public class DelegateOrValue<T>
    {
        public bool isValue;
        private Func<T> method;
        private T oldValue;
        private T value;
        public Action<T> StaticValueChanges { get; set; }

        private DelegateOrValue(T d)
        {
            value = d;
            isValue = true;
        }

        private DelegateOrValue(Func<T> d)
        {
            method = d;
            isValue = false;
            oldValue = method();
        }

        private T evaluate()
        {
            if (isValue == true) return value;

            else if (isValue == false) {
                T val = method();
                if (Cast<int>(val) != Cast<int>(oldValue))
                    StaticValueChanges(val);
                oldValue = val;
                return val;
            }
            return default( T );
        }

        [InlineCode("{m}")]
        private static T Cast<T>(object m)
        {
            return default( T );
        }

        public static implicit operator DelegateOrValue<T>(T d)
        {
            return new DelegateOrValue<T>(d);
        }

        public static implicit operator DelegateOrValue<T>(Func<T> d)
        {
            return new DelegateOrValue<T>(d);
        }

        public static implicit operator T(DelegateOrValue<T> d)
        {
            return d.evaluate();
        }
    }
}
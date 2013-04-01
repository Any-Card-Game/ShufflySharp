using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace global
{
    [ScriptName("ArrayUtils")]
    public class ArrayUtils
    {
        static ArrayUtils()
        {
            "Array.prototype.foreach=function(does){return global.ArrayUtils.forEach(this,does);};".eval();
            "Array.prototype.sortCards=function(){return global.ArrayUtils.sortCards(this);};".eval();
            "Array.prototype.where=function(does){return global.ArrayUtils.where(this,does);};".eval();
            "Array.prototype.any=function(does){return global.ArrayUtils.any(this,does);};".eval();
            "Array.prototype.remove=function(does){ this.splice(this.indexOf(does),1); };".eval();
        }


        [IncludeGenericArguments(false)]
        public static bool ForEach<T>(T[] ts, Func<T, int, bool> does)
        {
            for (var i = 0; i < ts.Length; i++)
            {
                var df = does(ts[i], i);
                if (df)
                    return df;
            }
            return false;
        }
        [IncludeGenericArguments]
        public static T2[] Select<T, T2>(T[] ts, Func<T, T2> does)
        {
            T2[] ts2 = new T2[ts.Length];
            for (var i = 0; i < ts.Length; i++) {
                ts2[i] = does(ts[i]);
            }
            return ts2;
        }

        public static CardGameCard[] SortCards(CardGameCard[] ts)
        {
            var ijc = GroupBy(ts, a => a.Type);
            var ij = Select(ijc,
                            a => {
                                a.Items.Sort((b, c) => b.Value - c.Value);
                                return a.Items;
                            });

            CardGameCard[] items = new CardGameCard[ts.Length];
            int jf = 0;
            foreach (var cardGameCard in ij) {
                foreach (var gameCard in cardGameCard) {
                    items[jf++] = ( gameCard );
                }
            }
            setArrayData(ts, items);
            return ts;
        }
        [IncludeGenericArguments]

        private static void setArrayData<T>(T[] ts, T[] items)
        {
            for (int i = 0; i < items.Length; i++) {
                ts[i] = items[i];
            }
        }

        [IncludeGenericArguments]
        public static GroupByKey<T, T2>[] GroupBy<T, T2>(T[] ts, Func<T, T2> does)
        {
            List<GroupByKey<T, T2>> items = new List<GroupByKey<T, T2>>();

            foreach (var t in ts) {
                var t2 = does(t);
                bool good = false;
                foreach (var item in items) {
                    bool f3 = ExtensionMethods.eval("item.key==t2"); //throws wild notimplementedexcpetion if item.key and t2 are cast to dynamic
                    if (f3) {
                        item.Items.Add(t);
                        good = true;
                        break;
                    }
                }
                if (!good)
                    items.Add(new GroupByKey<T, T2>(t2, new List<T>(t)));
            }
            return items.me();
        }

        [IncludeGenericArguments(false)]
        public static T[] Where<T>(T[] ts, Func<T, int, bool> does)
        {
            var jf = new List<T>();

            for (var i = 0; i < ts.Length; i++)
            {
                if (does(ts[i], i))
                    jf.Add(ts[i]);
            }
            return Script.Reinterpret<T[]>(jf);
        }


        [IncludeGenericArguments(false)]
        public static bool Any<T>(T[] ts, Func<T, int, bool> does)
        {
            var jf = new List<T>();

            for (var i = 0; i < ts.Length; i++) {
                if (does(ts[i], i))
                    return true;
            }
            return false;
        }

        #region Nested type: GroupByKey
        [IncludeGenericArguments]

        public class GroupByKey<T, T2>
        {
            [IntrinsicProperty]
            public T2 Key { get; set; }
            [IntrinsicProperty]
            public List<T> Items { get; set; }

            public GroupByKey(T2 key, List<T> items)
            {
                Key = key;
                Items = items;
            }
        }

        #endregion

        /*
 
ar.any = Array.prototype.any = (function (does) {
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            return true;
    }
    return false;
});
         
ar.sortCards = Array.prototype.sortCards = (function () {
    var ij = this.groupBy(function (a) { return a.type; }).select(function (a) {
        a.items.sort(function (b, c) { return b.value - c.value; });
        return a.items;
    });
    var items = [];

    for (var j = 0; j < ij.length; j++) {

        for (var k = 0; k < ij[j].length; k++) {
            items.push(ij[j][k]);
        }
    }
    for (var i = 0; i < this.length; i++) {
        this[i] = items[i];
    }

    return this;
});
*/
    }
}
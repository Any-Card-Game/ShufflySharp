using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibraries;

namespace global
{

    [ScriptName("ArrayUtils")]
    public   class ArrayUtils
    {
         public ArrayUtils()
        {
            "Array.prototype.foreach=function(does){return global.ArrayUtils.forEach(this,does);};".eval();
            "Array.prototype.sortCards=function(){return global.ArrayUtils.sortCards(this);};".eval();
            "Array.prototype.where=function(does){return global.ArrayUtils.where(this,does);};".eval();
            "Array.prototype.any=function(does){return global.ArrayUtils.any(this,does);};".eval(); 
        }
         [IgnoreGenericArguments]
         public static bool ForEach<T>(T[] ts, Func<T, int, bool> does)
         {
             for (int i = 0; i < ts.Length; i++)
             {
                 bool df = does(ts[i], i);
                 if (df)
                 {
                     return df;
                 }

             }
             return false;
         }
         [IgnoreGenericArguments]
         public static T[] SortCards<T>(T[] ts)
         {
             return ts;
         }
         [IgnoreGenericArguments]
         public static T[] Where<T>(T[] ts, Func<T, int, bool> does)
         {
             List<T> jf = new List<T>();

             for (int i = 0; i < ts.Length; i++)
             {
                 if (does(ts[i], i))
                 {
                     jf.Add(ts[i]);
                 }

             }
             return (T[])jf;

         }
         [IgnoreGenericArguments]
         public static bool Any<T>(T[] ts, Func<T, int, bool> does)
         {
             List<T> jf = new List<T>();

             for (int i = 0; i < ts.Length; i++)
             {
                 if (does(ts[i], i))
                 {
                     return true;
                 }

             }
             return false;
         }

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

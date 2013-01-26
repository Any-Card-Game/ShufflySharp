using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models;
namespace Client
{
    [IgnoreNamespace]
    public static class Globals
    {
        [IntrinsicProperty]
        [ScriptAlias("window")]
        public static dynamic Window { get; set; }
    }
 
}
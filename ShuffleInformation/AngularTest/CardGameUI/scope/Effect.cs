using System;
using System.Collections.Generic;
using Client.Angular.controllers;
namespace AngularTest.scope
{
    [Serializable]
    public class Effect
    {
        public Effect() {
            Properties = new JsDictionary<string, string>();
        }
        public string Name { get; set; }
        public EffectType2 Type { get; set; }
        public JsDictionary<string, string> Properties { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Html;
using System.Text.RegularExpressions;

namespace Client
{
    public static class ClientHelpers
    {

        public static dynamic HexToRGB(string hex)
        {
            var result = new Regex(@"^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$").Exec(hex);
            return result != null
                ? new
                {
                    R = int.Parse(result[1], 16),
                    G = int.Parse(result[2], 16),
                    B = int.Parse(result[3], 16)
                }
                : null;
        }

        public static string TransformRotate(double ar)
        {
            return string.Format("rotate({0}deg)", ar);
        }

        public static double NoTransformRotate(string ar)
        {
            if (ar == "") return 0;
            return double.Parse(ar.Replace("rotate(", "").Replace("deg)", "")); //todo regex??
        }

        public static void AddCSSRule(dynamic sheet, string selector, JsDictionary<string, object> css)
        {


            var propText = Keys(css).Map((p) => { return p + ":" + css[p]; }).Join(";");
            sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);

        }
        public static dynamic CreateCSSSheet()
        {
            var document = (dynamic)Script.Eval("window.document");
            var sheet = document.head.appendChild(Document.CreateElement("style")).sheet;
            return sheet;

        }

        public static void PurgeCSS(string classToChange)
        {
            var myClass = "." + classToChange;
            string CSSRules = "";
            var document = (dynamic)Script.Eval("window.document");
            if (document.all)
                CSSRules = "rules";
            else if (document.getElementById)
                CSSRules = "cssRules";
            for (var a = 0; a < document.styleSheets.length; a++)
            {
                if (document.styleSheets[a][CSSRules] == null) continue;
                for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++)
                {
                    var sheet = document.styleSheets[a];
                    if (sheet[CSSRules][i].selectorText == myClass)
                    {
                        sheet.removeRule(i);
                        sheet.insertRule(myClass + "{}", sheet.cssRules.length);
                    }
                }
            }
        }
        public static void ChangeCSS(string classToChange, JsDictionary<string, string> values)
        {
            var myClass = "." + classToChange;
            string CSSRules = "";
            var document = (dynamic)Script.Eval("window.document");
            if (document.all)
                CSSRules = "rules";
            else if (document.getElementById)
                CSSRules = "cssRules";
            for (var a = 0; a < document.styleSheets.length; a++)
            {
                var ruleSet = document.styleSheets[a][CSSRules];
                if (ruleSet == null) continue;
                for (var i = 0; i < ruleSet.length; i++)
                {
                    var rule = ruleSet[i];
                    if (rule.selectorText == myClass)
                    {
                        foreach (var m in values)
                        {
                            rule.style[m.Key] = m.Value;
                        }
                    }
                }
            }
        }
    }
}
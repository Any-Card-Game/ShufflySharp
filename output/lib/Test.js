
String.prototype.capitaliseFirstLetter=function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.htmlEscape = function () {
    return this;
}
var content = ""
var html = function () { for (var i = 0; i < arguments.length; ++i) content += arguments[i] + " "; };
var dump=function() { console.log(content); }

var UglifyJS_Tools = {
    ast_node_info: function(type) {

        function find_prop(prop) {
            var c = ctor;
            while (c) {
                if (c.SELF_PROPS.indexOf(prop) >= 0) return c;
                c = c.BASE;
            }
        }
        function fixType(type) {
            type = type.replace('*', '[]').replace('?', '');
            switch(type) {
                case 'number':
                    type = 'float';
                    break;
            case 'integer':
                        type = 'int';
                        break;
                case 'boolean':
                    type = 'bool';
                    break;
                case 'RegExp':
                    type = 'Regex';
                    break;
                    
            }
            return type;
        }
        var ctor = UglifyJS[type];

        html("[Serializable]public class", type, "");
        if (ctor.BASE) {
            html(":", "AST_" + ctor.BASE.TYPE);
        }
        html("{");
        ctor.PROPS.forEach(function (prop) {

            if (/^\$/.test(prop)) return;
            var origin = find_prop(prop);
            if (ctor !== origin)
                return;
            html("\r\n");

            var doc = origin.propdoc[prop];
            if (doc) {
                var m = /^\[(.*?)\]\s*(.*)$/.exec(doc);
                doc = m[2];
                var info = m[1];
                var a = info.split(/\//);
                var type = a.shift();
                var hints = {};
                a.forEach(function(a) { hints[a] = true });
                html("public ", fixType(type), prop.capitaliseFirstLetter(), "{get;set;}");
            } else {
                html("public ", fixType(origin.Type), prop, "{get;set;}");
            }

        });
        html("\r\n");
        html("}");
        html("\r\n");
    }
};
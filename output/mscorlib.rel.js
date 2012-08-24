// Script# Core Runtime
// More information at http://projects.nikhilk.net/ScriptSharp
//

(function () {
  var globals = {
    version: '0.7.4.0',

    isUndefined: function (o) {
      return (o === undefined);
    },

    isNull: function (o) {
      return (o === null);
    },

    isNullOrUndefined: function (o) {
      return (o === null) || (o === undefined);
    },

    isValue: function (o) {
      return (o !== null) && (o !== undefined);
    },

    referenceEquals: function (a, b) {
      return ss.isValue(a) ? a === b : !ss.isValue(b);
    },

    mkdict: function (a) {
      a = (arguments.length != 1 ? arguments : arguments[0]);
      var r = {};
      for (var i = 0; i < a.length; i += 2) {
        r[a[i]] = a[i + 1];
      }
      return r;
    }
  };

  var started = false;
  var startCallbacks = [];

  function onStartup(cb) {
    startCallbacks ? startCallbacks.push(cb) : setTimeout(cb, 0);
  }
  function startup() {
    if (startCallbacks) {
      var callbacks = startCallbacks;
      startCallbacks = null;
      for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i]();
      }
    }
  }
  if (document.addEventListener) {
    document.readyState == 'complete' ? startup() : document.addEventListener('DOMContentLoaded', startup, false);
  }
  else if (window.attachEvent) {
    window.attachEvent('onload', function () {
      startup();
    });
  }

  var ss = window.ss;
  if (!ss) {
    window.ss = ss = {
      init: onStartup,
      ready: onStartup
    };
  }
  for (var n in globals) {
    ss[n] = globals[n];
  }
  if (window && !window.Element) {
    window.Element = function() {
    };
    window.Element.isInstanceOfType = function(instance) { return instance && typeof instance.constructor === 'undefined' && typeof instance.tagName === 'string'; };
  }
})();


window.Type = Function;

window.__Namespace = function(name) {
    this.__typeName = name;
}
__Namespace.prototype = {
    __namespace: true,
    getName: function() {
        return this.__typeName;
    }
}

Type.registerNamespace = function(name) {
    if (!window.__namespaces) {
        window.__namespaces = {};
    }
    if (!window.__rootNamespaces) {
        window.__rootNamespaces = [];
    }

    if (window.__namespaces[name]) {
        return;
    }

    var ns = window;
    var nameParts = name.split('.');

    for (var i = 0; i < nameParts.length; i++) {
        var part = nameParts[i];
        var nso = ns[part];
        if (!nso) {
            ns[part] = nso = new __Namespace(nameParts.slice(0, i + 1).join('.'));
            if (i == 0) {
                window.__rootNamespaces.add(nso);
            }
        }
        ns = nso;
    }

    window.__namespaces[name] = ns;
}

Type.__genericCache = {};
Type._makeGenericTypeName = function(genericType, typeArguments) {
	var result = genericType.__typeName;
	for (var i = 0; i < typeArguments.length; i++)
		result += (i === 0 ? '[' : ',') + typeArguments[i].__typeName;
	result += ']';
	return result;
}
Type.makeGenericType = function(genericType, typeArguments) {
	var name = Type._makeGenericTypeName(genericType, typeArguments);
	return Type.__genericCache[name] || genericType.apply(null, typeArguments);
}

Type.prototype.registerGenericClassInstance = function(instance, genericType, typeArguments, baseType, interfaceTypes) {
	var name = Type._makeGenericTypeName(genericType, typeArguments);
	Type.__genericCache[name] = instance;
	instance.__genericTypeDefinition = genericType;
	instance.__typeArguments = typeArguments;
	instance.registerClass(name, baseType(), interfaceTypes());
}

Type.prototype.registerGenericInterfaceInstance = function(instance, genericType, typeArguments, baseInterfaces) {
	var name = Type._makeGenericTypeName(genericType, typeArguments);
	Type.__genericCache[name] = instance;
	instance.__genericTypeDefinition = genericType;
	instance.__typeArguments = typeArguments;
	instance.registerInterface(name, baseInterfaces());
}

Type.prototype.get_isGenericTypeDefinition = function() {
	return this.__isGenericTypeDefinition || false;
}

Type.prototype.getGenericTypeDefinition = function() {
	return this.__genericTypeDefinition || null;
}

Type.prototype.get_genericParameterCount = function() {
	return this.__typeArgumentCount || 0;
}

Type.prototype.getGenericArguments = function() {
    return this.__typeArguments || null;
}

Type.prototype.registerClass = function(name, baseType, interfaceType) {
    this.prototype.constructor = this;
    this.__typeName = name;
    this.__class = true;
    this.__baseType = baseType || Object;
    if (baseType) {
        this.setupBase(baseType);
    }

	if (interfaceType instanceof Array) {
		this.__interfaces = interfaceType;
	}
	else if (interfaceType) {
        this.__interfaces = [];
        for (var i = 2; i < arguments.length; i++) {
            interfaceType = arguments[i];
            this.__interfaces.add(interfaceType);
        }
    }
}

Type.prototype.registerGenericClass = function(name, typeArgumentCount) {
    this.prototype.constructor = this;
    this.__typeName = name;
    this.__class = true;
	this.__typeArgumentCount = typeArgumentCount;
	this.__isGenericTypeDefinition = true;
    this.__baseType = Object;
}

Type.prototype.registerInterface = function(name, baseInterface) {
    this.__typeName = name;
    this.__interface = true;
	if (baseInterface instanceof Array) {
		this.__interfaces = baseInterface;
	}
	else if (baseInterface) {
        this.__interfaces = [];
        for (var i = 1; i < arguments.length; i++) {
            this.__interfaces.add(arguments[i]);
        }
    }
}

Type.prototype.registerGenericInterface = function(name, typeArgumentCount) {
    this.prototype.constructor = this;
    this.__typeName = name;
    this.__interface = true;;
	this.__typeArgumentCount = typeArgumentCount;
	this.__isGenericTypeDefinition = true;
}

Type.prototype.registerEnum = function(name, flags) {
    for (var field in this.prototype) {
         this[field] = this.prototype[field];
    }

    this.__typeName = name;
    this.__enum = true;
    if (flags) {
        this.__flags = true;
    }
    this.getDefaultValue = function() { return 0; };
    this.isInstanceOfType = function(instance) { return typeof(instance) == 'number'; };
}

Type.prototype.setupBase = function() {
	var baseType = this.__baseType;

	for (var memberName in baseType.prototype) {
		var memberValue = baseType.prototype[memberName];
		if (!this.prototype[memberName]) {
			this.prototype[memberName] = memberValue;
		}
	}
}

if (!Type.prototype.resolveInheritance) {
            Type.prototype.resolveInheritance = Type.prototype.setupBase;
}

Type.prototype.initializeBase = function(instance, args) {
    if (!args) {
        this.__baseType.apply(instance);
    }
    else {
        this.__baseType.apply(instance, args);
    }
}

Type.prototype.callBaseMethod = function(instance, name, args) {
    var baseMethod = this.__baseType.prototype[name];
    if (!args) {
        return baseMethod.apply(instance);
    }
    else {
        return baseMethod.apply(instance, args);
    }
}

Type.prototype.get_baseType = function() {
    return this.__baseType || null;
}

Type.prototype.get_fullName = function() {
    return this.__typeName;
}

Type.prototype.get_name = function() {
    var fullName = this.__typeName;
    var nsIndex = fullName.lastIndexOf('.');
    if (nsIndex > 0) {
        return fullName.substr(nsIndex + 1);
    }
    return fullName;
}

Type.prototype.getInterfaces = function() {
    return this.__interfaces;
}

Type.prototype.isInstanceOfType = function(instance) {
    if (ss.isNullOrUndefined(instance)) {
        return false;
    }
    if ((this == Object) || (instance instanceof this)) {
        return true;
    }

    var type = Type.getInstanceType(instance);
    return this.isAssignableFrom(type);
}

Type.isInstanceOfType = function(instance, type) {
    return instance instanceof type || (type.isInstanceOfType && type.isInstanceOfType(instance)) || false;
}

Type.prototype.isAssignableFrom = function(type) {
    if ((this == Object) || (this == type)) {
        return true;
    }
    if (this.__class) {
        var baseType = type.__baseType;
        while (baseType) {
            if (this == baseType) {
                return true;
            }
            baseType = baseType.__baseType;
        }
    }
    else if (this.__interface) {
        var interfaces = type.__interfaces;
        if (interfaces && interfaces.contains(this)) {
            return true;
        }

        var baseType = type.__baseType;
        while (baseType) {
            interfaces = baseType.__interfaces;
            if (interfaces && interfaces.contains(this)) {
                return true;
            }
            baseType = baseType.__baseType;
        }
    }
    return false;
}

Type.hasProperty = function(instance, name) {
	return typeof(instance['get_' + name]) === 'function' || typeof(instance['set_' + name]) === 'function';
}

Type.prototype.get_isClass = function() {
    return (this.__class == true);
}

Type.prototype.get_isEnum = function() {
    return (this.__enum == true);
}

Type.prototype.get_isFlags = function() {
    return ((this.__enum == true) && (this.__flags == true));
}

Type.prototype.get_isInterface = function() {
    return (this.__interface == true);
}

Type.isNamespace = function(object) {
    return (object.__namespace == true);
}

Type.canCast = function(instance, type) {
    return Type.isInstanceOfType(instance, type);
}

Type.safeCast = function(instance, type) {
    if (Type.isInstanceOfType(instance, type)) {
        return instance;
    }
    return null;
}

Type.cast = function(instance, type) {
	if (instance === null)
		return null;
    else if (Type.isInstanceOfType(instance, type)) {
        return instance;
    }
    throw 'Cannot cast object to type ' + type.__typeName;
}

Type.getInstanceType = function(instance) {
	if (instance === null) {
		throw 'Cannot get type of null'
	}
    var ctor = null;

            try {
        ctor = instance.constructor;
    }
    catch (ex) {
    }
    if (!ctor || !ctor.__typeName) {
        ctor = Object;
    }
    return ctor;
}

Type.getType = function(typeName) {
    if (!typeName) {
        return null;
    }

    if (!Type.__typeCache) {
        Type.__typeCache = {};
    }

    var type = Type.__typeCache[typeName];
    if (!type) {
        type = eval(typeName);
        Type.__typeCache[typeName] = type;
    }
    return type;
}

Type.prototype.getDefaultValue = function() {
	return null;
}

Type.parse = function(typeName) {
    return Type.getType(typeName);
}


Object.__typeName = 'Object';
Object.__baseType = null;
Object.__class = true;

Object.clearKeys = function(d) {
    for (var n in d) {
		if (d.hasOwnProperty(n))
			delete d[n];
    }
}

Object.keyExists = function(d, key) {
    return d[key] !== undefined;
}

if (!Object.keys) {
    Object.keys = function(d) {
        var keys = [];
        for (var n in d) {
			if (d.hasOwnProperty(n))
		        keys.push(n);
        }
        return keys;
    }

    Object.getKeyCount = function(d) {
        var count = 0;
        for (var n in d) {
			if (d.hasOwnProperty(n))
		        count++;
        }
        return count;
    }
}
else {
    Object.getKeyCount = function(d) {
        return Object.keys(d).length;
    }
}

Object.getObjectEnumerator = function(d) {
	return new ss.ObjectEnumerator(d);
}

Object.coalesce = function(a, b) {
	return ss.isValue(a) ? a : b;
}


Boolean.__typeName = 'Boolean';

Boolean.getDefaultValue = function() {
	return false;
}

Boolean.parse = function(s) {
    return (s.toLowerCase() == 'true');
}


Number.__typeName = 'Number';

Number.getDefaultValue = function() {
	return 0;
}

Number.parse = function(s) {
    if (!s || !s.length) {
        return 0;
    }
    if ((s.indexOf('.') >= 0) || (s.indexOf('e') >= 0) ||
        s.endsWith('f') || s.endsWith('F')) {
        return parseFloat(s);
    }
    return parseInt(s, 10);
}

Number.prototype.format = function(format) {
    if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
        return this.toString();
    }
    return this._netFormat(format, false);
}

Number.prototype.localeFormat = function(format) {
    if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
        return this.toLocaleString();
    }
    return this._netFormat(format, true);
}

Number._commaFormat = function(number, groups, decimal, comma) {
    var decimalPart = null;
    var decimalIndex = number.indexOf(decimal);
    if (decimalIndex > 0) {
        decimalPart = number.substr(decimalIndex);
        number = number.substr(0, decimalIndex);
    }

    var negative = number.startsWith('-');
    if (negative) {
        number = number.substr(1);
    }

    var groupIndex = 0;
    var groupSize = groups[groupIndex];
    if (number.length < groupSize) {
        return decimalPart ? number + decimalPart : number;
    }

    var index = number.length;
    var s = '';
    var done = false;
    while (!done) {
        var length = groupSize;
        var startIndex = index - length;
        if (startIndex < 0) {
            groupSize += startIndex;
            length += startIndex;
            startIndex = 0;
            done = true;
        }
        if (!length) {
            break;
        }
        
        var part = number.substr(startIndex, length);
        if (s.length) {
            s = part + comma + s;
        }
        else {
            s = part;
        }
        index -= length;

        if (groupIndex < groups.length - 1) {
            groupIndex++;
            groupSize = groups[groupIndex];
        }
    }

    if (negative) {
        s = '-' + s;
    }    
    return decimalPart ? s + decimalPart : s;
}

Number.prototype._netFormat = function(format, useLocale) {
    var nf = useLocale ? ss.CultureInfo.CurrentCulture.numberFormat : ss.CultureInfo.InvariantCulture.numberFormat;

    var s = '';    
    var precision = -1;
    
    if (format.length > 1) {
        precision = parseInt(format.substr(1));
    }

    var fs = format.charAt(0);
    switch (fs) {
        case 'd': case 'D':
            s = parseInt(Math.abs(this)).toString();
            if (precision != -1) {
                s = s.padLeft(precision, 0x30);
            }
            if (this < 0) {
                s = '-' + s;
            }
            break;
        case 'x': case 'X':
            s = parseInt(Math.abs(this)).toString(16);
            if (fs == 'X') {
                s = s.toUpperCase();
            }
            if (precision != -1) {
                s = s.padLeft(precision, 0x30);
            }
            break;
        case 'e': case 'E':
            if (precision == -1) {
                s = this.toExponential();
            }
            else {
                s = this.toExponential(precision);
            }
            if (fs == 'E') {
                s = s.toUpperCase();
            }
            break;
        case 'f': case 'F':
        case 'n': case 'N':
            if (precision == -1) {
                precision = nf.numberDecimalDigits;
            }
            s = this.toFixed(precision).toString();
            if (precision && (nf.numberDecimalSeparator != '.')) {
                var index = s.indexOf('.');
                s = s.substr(0, index) + nf.numberDecimalSeparator + s.substr(index + 1);
            }
            if ((fs == 'n') || (fs == 'N')) {
                s = Number._commaFormat(s, nf.numberGroupSizes, nf.numberDecimalSeparator, nf.numberGroupSeparator);
            }
            break;
        case 'c': case 'C':
            if (precision == -1) {
                precision = nf.currencyDecimalDigits;
            }
            s = Math.abs(this).toFixed(precision).toString();
            if (precision && (nf.currencyDecimalSeparator != '.')) {
                var index = s.indexOf('.');
                s = s.substr(0, index) + nf.currencyDecimalSeparator + s.substr(index + 1);
            }
            s = Number._commaFormat(s, nf.currencyGroupSizes, nf.currencyDecimalSeparator, nf.currencyGroupSeparator);
            if (this < 0) {
                s = String.format(nf.currencyNegativePattern, s);
            }
            else {
                s = String.format(nf.currencyPositivePattern, s);
            }
            break;
        case 'p': case 'P':
            if (precision == -1) {
                precision = nf.percentDecimalDigits;
            }
            s = (Math.abs(this) * 100.0).toFixed(precision).toString();
            if (precision && (nf.percentDecimalSeparator != '.')) {
                var index = s.indexOf('.');
                s = s.substr(0, index) + nf.percentDecimalSeparator + s.substr(index + 1);
            }
            s = Number._commaFormat(s, nf.percentGroupSizes, nf.percentDecimalSeparator, nf.percentGroupSeparator);
            if (this < 0) {
                s = String.format(nf.percentNegativePattern, s);
            }
            else {
                s = String.format(nf.percentPositivePattern, s);
            }
            break;
    }

    return s;
}


String.registerClass('String');

String.empty = '';

String.compare = function(s1, s2, ignoreCase) {
    if (ignoreCase) {
        if (s1) {
            s1 = s1.toUpperCase();
        }
        if (s2) {
            s2 = s2.toUpperCase();
        }
    }
    s1 = s1 || '';
    s2 = s2 || '';

    if (s1 == s2) {
        return 0;
    }
    if (s1 < s2) {
        return -1;
    }
    return 1;
}

String.prototype.compareTo = function(s, ignoreCase) {
    return String.compare(this, s, ignoreCase);
}

String.concat = function() {
    return Array.prototype.join.call(arguments, '');
}

String.prototype.endsWith = function(suffix) {
    if (!suffix.length) {
        return true;
    }
    if (suffix.length > this.length) {
        return false;
    }
    return (this.substr(this.length - suffix.length) == suffix);
}

String.equals = function(s1, s2, ignoreCase) {
    return String.compare(s1, s2, ignoreCase) == 0;
}

String._format = function(format, values, useLocale) {
    if (!String._formatRE) {
        String._formatRE = /(\{[^\}^\{]+\})/g;
    }

    return format.replace(String._formatRE,
                          function(str, m) {
                              var index = parseInt(m.substr(1));
                              var value = values[index + 1];
                              if (ss.isNullOrUndefined(value)) {
                                  return '';
                              }
                              if (value.format) {
                                  var formatSpec = null;
                                  var formatIndex = m.indexOf(':');
                                  if (formatIndex > 0) {
                                      formatSpec = m.substring(formatIndex + 1, m.length - 1);
                                  }
                                  return useLocale ? value.localeFormat(formatSpec) : value.format(formatSpec);
                              }
                              else {
                                  return useLocale ? value.toLocaleString() : value.toString();
                              }
                          });
}

String.format = function(format) {
    return String._format(format, arguments,  false);
}

String.fromChar = function(ch, count) {
    var s = ch;
    for (var i = 1; i < count; i++) {
        s += ch;
    }
    return s;
}

String.prototype.htmlDecode = function() {
    var div = document.createElement('div');
    div.innerHTML = this;
    return div.textContent || div.innerText;
}

String.prototype.htmlEncode = function() {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(this));
    return div.innerHTML.replace(/\"/g, '&quot;');
}

String.prototype.indexOfAny = function(chars, startIndex, count) {
    var length = this.length;
    if (!length) {
        return -1;
    }

	chars = String.fromCharCode.apply(null, chars);
    startIndex = startIndex || 0;
    count = count || length;

    var endIndex = startIndex + count - 1;
    if (endIndex >= length) {
        endIndex = length - 1;
    }

    for (var i = startIndex; i <= endIndex; i++) {
        if (chars.indexOf(this.charAt(i)) >= 0) {
            return i;
        }
    }
    return -1;
}

String.prototype.insert = function(index, value) {
    if (!value) {
        return this.valueOf();
    }
    if (!index) {
        return value + this;
    }
    var s1 = this.substr(0, index);
    var s2 = this.substr(index);
    return s1 + value + s2;
}

String.isNullOrEmpty = function(s) {
    return !s || !s.length;
}

String.prototype.lastIndexOfAny = function(chars, startIndex, count) {
    var length = this.length;
    if (!length) {
        return -1;
    }

	chars = String.fromCharCode.apply(null, chars);
    startIndex = startIndex || length - 1;
    count = count || length;

    var endIndex = startIndex - count + 1;
    if (endIndex < 0) {
        endIndex = 0;
    }

    for (var i = startIndex; i >= endIndex; i--) {
        if (chars.indexOf(this.charAt(i)) >= 0) {
            return i;
        }
    }
    return -1;
}

String.localeFormat = function(format) {
    return String._format(format, arguments,  true);
}

String.prototype.padLeft = function(totalWidth, ch) {
    if (this.length < totalWidth) {
        ch = String.fromCharCode(ch || 0x20);
        return String.fromChar(ch, totalWidth - this.length) + this;
    }
    return this.valueOf();
}

String.prototype.padRight = function(totalWidth, ch) {
    if (this.length < totalWidth) {
        ch = String.fromCharCode(ch || 0x20);
        return this + String.fromChar(ch, totalWidth - this.length);
    }
    return this.valueOf();
}

String.prototype.remove = function(index, count) {
    if (!count || ((index + count) > this.length)) {
        return this.substr(0, index);
    }
    return this.substr(0, index) + this.substr(index + count);
}

String.prototype.replaceAll = function(oldValue, newValue) {
    newValue = newValue || '';
    return this.split(oldValue).join(newValue);
}

String.prototype.startsWith = function(prefix) {
    if (!prefix.length) {
        return true;
    }
    if (prefix.length > this.length) {
        return false;
    }
    return (this.substr(0, prefix.length) == prefix);
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.trimEnd().trimStart();
    }
}

String.prototype.trimEnd = function() {
    return this.replace(/\s*$/, '');
}

String.prototype.trimStart = function() {
    return this.replace(/^\s*/, '');
}


Array.__typeName = 'Array';
Array.__interfaces = [ ss.IEnumerable, ss.ICollection, ss.IList ];

Array.prototype.get_item = function(index) {
	return this[index];
}

Array.prototype.set_item = function(index, value) {
	this[index] = value;
}

Array.prototype.get_count = function() {
	return this.length;
}

Array.prototype.add = function(item) {
    this[this.length] = item;
}

Array.prototype.addRange = function(items) {
	if (items instanceof Array) {
		this.push.apply(this, items);
	}
	else {
		var e = items.getEnumerator();
		try {
			while (e.moveNext()) {
				this.add(e.get_current());
			}
		}
		finally {
			if (ss.IDisposable.isInstanceOfType(e)) {
				Type.cast(e, ss.IDisposable).dispose();
			}
		}
	}
}

Array.prototype.aggregate = function(seed, callback, instance) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
        if (i in this) {
            seed = callback.call(instance, seed, this[i], i, this);
        }
    }
    return seed;
}

Array.prototype.clear = function() {
    this.length = 0;
}

Array.prototype.clone = function() {
    if (this.length === 1) {
        return [this[0]];
    }
    else {
        return Array.apply(null, this);
    }
}

Array.prototype.contains = function(item) {
    var index = this.indexOf(item);
    return (index >= 0);
}

Array.prototype.dequeue = function() {
    return this.shift();
}

Array.prototype.enqueue = function(item) {
            this._queue = true;
    this.push(item);
}

Array.prototype.peek = function() {
    if (this.length) {
        var index = this._queue ? 0 : this.length - 1;
        return this[index];
    }
    return null;
}

if (!Array.prototype.every) {
    Array.prototype.every = function(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (i in this && !callback.call(instance, this[i], i, this)) {
                return false;
            }
        }
        return true;
    }
}

Array.prototype.extract = function(index, count) {
    if (!count) {
        return this.slice(index);
    }
    return this.slice(index, index + count);
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback, instance) {
        var length = this.length;    
        var filtered = [];
        for (var i = 0; i < length; i++) {
            if (i in this) {
                var val = this[i];
                if (callback.call(instance, val, i, this)) {
                    filtered.push(val);
                }
            }
        }
        return filtered;
    }
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (i in this) {
                callback.call(instance, this[i], i, this);
            }
        }
    }
}

Array.prototype.getEnumerator = function() {
    return new ss.ArrayEnumerator(this);
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(item, startIndex) {
        startIndex = startIndex || 0;
        var length = this.length;
        if (length) {
            for (var index = startIndex; index < length; index++) {
                if (this[index] === item) {
                    return index;
                }
            }
        }
        return -1;
    }
}

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
}

Array.prototype.insertRange = function(index, items) {
	if (items instanceof Array) {
		if (index === 0) {
			this.unshift.apply(this, items);
		}
		else {
			for (var i = 0; i < items.length; i++) {
				this.splice(index + i, 0, items[i]);
			}
		}
	}
	else {
		var e = items.getEnumerator();
		try {
			while (e.moveNext()) {
				this.insert(index, e.get_current());
				index++;
			}
		}
		finally {
			if (ss.IDisposable.isInstanceOfType(e)) {
				Type.cast(e, ss.IDisposable).dispose();
			}
		}
	}
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callback, instance) {
        var length = this.length;
        var mapped = new Array(length);
        for (var i = 0; i < length; i++) {
            if (i in this) {
                mapped[i] = callback.call(instance, this[i], i, this);
            }
        }
        return mapped;
    }
}

Array.parse = function(s) {
    return eval('(' + s + ')');
}

Array.prototype.remove = function(item) {
    var index = this.indexOf(item);
    if (index >= 0) {
        this.splice(index, 1);
        return true;
    }
    return false;
}

Array.prototype.removeAt = function(index) {
    this.splice(index, 1);
}

Array.prototype.removeRange = function(index, count) {
    this.splice(index, count);
}

if (!Array.prototype.some) {
    Array.prototype.some = function(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (i in this && callback.call(instance, this[i], i, this)) {
                return true;
            }
        }
        return false;
    }
}

Array.toArray = function(obj) {
    return Array.prototype.slice.call(obj);
}


RegExp.__typeName = 'RegExp';

RegExp.parse = function(s) {
    if (s.startsWith('/')) {
        var endSlashIndex = s.lastIndexOf('/');
        if (endSlashIndex > 1) {
            var expression = s.substring(1, endSlashIndex);
            var flags = s.substr(endSlashIndex + 1);
            return new RegExp(expression, flags);
        }
    }

    return null;    
}


Date.__typeName = 'Date';

Date.getDefaultValue = function() {
	return new Date(0);
}

Date.get_now = function() {
    return new Date();
}

Date.get_today = function() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

Date.areEqual = function(a, b) {
    if (!ss.isValue(a))
        return !ss.isValue(b);
    else if (!ss.isValue(b))
        return false;
    else
        return a.valueOf() === b.valueOf();
}

Date.areNotEqual = function(a, b) {
    return !Date.areEqual(a, b);
}

Date.prototype.format = function(format) {
    if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
        return this.toString();
    }
    if (format == 'id') {
        return this.toDateString();
    }
    if (format == 'it') {
        return this.toTimeString();
    }

    return this._netFormat(format, false);
}

Date.prototype.localeFormat = function(format) {
    if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
        return this.toLocaleString();
    }
    if (format == 'id') {
        return this.toLocaleDateString();
    }
    if (format == 'it') {
        return this.toLocaleTimeString();
    }

    return this._netFormat(format, true);
}

Date.prototype._netFormat = function(format, useLocale) {
    var dt = this;
    var dtf = useLocale ? ss.CultureInfo.CurrentCulture.dateFormat : ss.CultureInfo.InvariantCulture.dateFormat;

    if (format.length == 1) {
        switch (format) {
            case 'f': format = dtf.longDatePattern + ' ' + dtf.shortTimePattern; break;
            case 'F': format = dtf.dateTimePattern; break;

            case 'd': format = dtf.shortDatePattern; break;
            case 'D': format = dtf.longDatePattern; break;

            case 't': format = dtf.shortTimePattern; break;
            case 'T': format = dtf.longTimePattern; break;

            case 'g': format = dtf.shortDatePattern + ' ' + dtf.shortTimePattern; break;
            case 'G': format = dtf.shortDatePattern + ' ' + dtf.longTimePattern; break;

            case 'R': case 'r':
                dtf = ss.CultureInfo.InvariantCulture.dateFormat;
                format = dtf.gmtDateTimePattern;
                break;
            case 'u': format = dtf.universalDateTimePattern; break;
            case 'U':
                format = dtf.dateTimePattern;
                dt = new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(),
                              dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
                break;

            case 's': format = dtf.sortableDateTimePattern; break;
        }
    }

    if (format.charAt(0) == '%') {
        format = format.substr(1);
    }

    if (!Date._formatRE) {
        Date._formatRE = /'.*?[^\\]'|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;
    }

    var re = Date._formatRE;
    var sb = new ss.StringBuilder();

    re.lastIndex = 0;
    while (true) {
        var index = re.lastIndex;
        var match = re.exec(format);

        sb.append(format.slice(index, match ? match.index : format.length));
        if (!match) {
            break;
        }

        var fs = match[0];
        var part = fs;
        switch (fs) {
            case 'dddd':
                part = dtf.dayNames[dt.getDay()];
                break;
            case 'ddd':
                part = dtf.shortDayNames[dt.getDay()];
                break;
            case 'dd':
                part = dt.getDate().toString().padLeft(2, 0x30);
                break;
            case 'd':
                part = dt.getDate();
                break;
            case 'MMMM':
                part = dtf.monthNames[dt.getMonth()];
                break;
            case 'MMM':
                part = dtf.shortMonthNames[dt.getMonth()];
                break;
            case 'MM':
                part = (dt.getMonth() + 1).toString().padLeft(2, 0x30);
                break;
            case 'M':
                part = (dt.getMonth() + 1);
                break;
            case 'yyyy':
                part = dt.getFullYear();
                break;
            case 'yy':
                part = (dt.getFullYear() % 100).toString().padLeft(2, 0x30);
                break;
            case 'y':
                part = (dt.getFullYear() % 100);
                break;
            case 'h': case 'hh':
                part = dt.getHours() % 12;
                if (!part) {
                    part = '12';
                }
                else if (fs == 'hh') {
                    part = part.toString().padLeft(2, 0x30);
                }
                break;
            case 'HH':
                part = dt.getHours().toString().padLeft(2, 0x30);
                break;
            case 'H':
                part = dt.getHours();
                break;
            case 'mm':
                part = dt.getMinutes().toString().padLeft(2, 0x30);
                break;
            case 'm':
                part = dt.getMinutes();
                break;
            case 'ss':
                part = dt.getSeconds().toString().padLeft(2, 0x30);
                break;
            case 's':
                part = dt.getSeconds();
                break;
            case 't': case 'tt':
                part = (dt.getHours() < 12) ? dtf.amDesignator : dtf.pmDesignator;
                if (fs == 't') {
                    part = part.charAt(0);
                }
                break;
            case 'fff':
                part = dt.getMilliseconds().toString().padLeft(3, 0x30);
                break;
            case 'ff':
                part = dt.getMilliseconds().toString().padLeft(3).substr(0, 2);
                break;
            case 'f':
                part = dt.getMilliseconds().toString().padLeft(3).charAt(0);
                break;
            case 'z':
                part = dt.getTimezoneOffset() / 60;
                part = ((part >= 0) ? '-' : '+') + Math.floor(Math.abs(part));
                break;
            case 'zz': case 'zzz':
                part = dt.getTimezoneOffset() / 60;
                part = ((part >= 0) ? '-' : '+') + Math.floor(Math.abs(part)).toString().padLeft(2, 0x30);
                if (fs == 'zzz') {
                    part += dtf.timeSeparator + Math.abs(dt.getTimezoneOffset() % 60).toString().padLeft(2, 0x30);
                }
                break;
            default:
                if (part.charAt(0) == '\'') {
                    part = part.substr(1, part.length - 2).replace(/\\'/g, '\'');
                }
                break;
        }
        sb.append(part);
    }

    return sb.toString();
}

Date.parseDate = function(s) {
            return new Date(Date.parse(s));
}

Date._parseExact = function(val, format, culture, utc) {
    culture = culture || ss.CultureInfo.CurrentCulture;
	var AM = culture.amDesignator, PM = culture.pmDesignator;

	var _isInteger = function(val) {
		var digits="1234567890";
		for (var i=0; i < val.length; i++) {
			if (digits.indexOf(val.charAt(i))==-1) {
				return false;
			}
		}
		return true;
	};

	var _getInt = function(str,i,minlength,maxlength) {
		for (var x=maxlength; x>=minlength; x--) {
			var token=str.substring(i,i+x);
			if (token.length < minlength) {
				return null;
			}
			if (_isInteger(token)) {
				return token;
			}
		}
		return null;
	};

	val = val + "";
	format = format + "";
	var i_val = 0;
	var i_format = 0;
	var c = "";
	var token = "";

	var year = 0, month = 1, date = 1, hh = 0, mm = 0, _ss = 0, ampm = "";
		
	while (i_format < format.length) {
				c = format.charAt(i_format);
		token = "";
		while ((format.charAt(i_format) == c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
				if (token=="yyyy" || token=="yy" || token=="y") {
			if (token == "yyyy")
				year = _getInt(val, i_val, 4, 4);
			if (token == "yy")
				year = _getInt(val, i_val, 2, 2);
			if (token == "y")
				year = _getInt(val, i_val, 2, 4);

			if (year == null)
				return null;

			i_val += year.length;
			if (year.length == 2) {
				if (year > 30) {
					year = 1900 + (year-0);
				}
				else {
					year = 2000 + (year-0);
				}
			}
		}
		else if (token == "MM" || token == "M") {
			month = _getInt(val, i_val, token.length, 2);
			if (month == null || (month < 1) || (month > 12))
				return null;
			i_val += month.length;
		}
		else if (token=="dd"||token=="d") {
			date = _getInt(val, i_val, token.length, 2);
			if (date == null || (date < 1) || (date > 31))
				return null;
			i_val += date.length;
		}
		else if (token=="hh"||token=="h") {
			hh = _getInt(val, i_val, token.length, 2);
			if (hh == null || (hh < 1) || (hh > 12))
				return null;
			i_val += hh.length;
		}
		else if (token=="HH"||token=="H") {
			hh = _getInt(val, i_val, token.length, 2);
			if (hh == null || (hh < 0) || (hh > 23))
				return null;
			i_val += hh.length;
		}
		else if (token == "mm" || token == "m") {
			mm = _getInt(val, i_val, token.length, 2);
			if (mm == null || (mm < 0) || (mm > 59))
				return null;
			i_val += mm.length;
		}
		else if (token == "ss" || token == "s") {
			_ss = _getInt(val, i_val, token.length, 2);
			if (_ss == null || (_ss < 0) || (_ss > 59))
				return null;
			i_val += _ss.length;
		}
		else if (token == "t") {
			if (val.substring(i_val, i_val + 1).toLowerCase() == AM.charAt(0).toLowerCase())
				ampm = AM;
			else if (val.substring(i_val, i_val + 1).toLowerCase() == PM.charAt(0).toLowerCase())
				ampm = PM;
			else
				return null;
			i_val += 1;
		}
		else if (token == "tt") {
			if (val.substring(i_val, i_val + 2).toLowerCase() == AM.toLowerCase())
				ampm = AM;
			else if (val.substring(i_val,i_val+2).toLowerCase() == PM.toLowerCase())
				ampm = PM;
			else
				return null;
			i_val += 2;
		}
		else {
			if (val.substring(i_val, i_val + token.length) != token)
				return null;
			else
				i_val += token.length;
		}
	}
		if (i_val != val.length)
		return null;

		if (month == 2) {
				if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { 			if (date > 29)
				return null;
		}
		else if (date > 28)
			return null;
	}
	if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
		if (date > 30) {
			return null;
		}
	}
		if (hh < 12 && ampm == PM) {
		hh = hh - 0 + 12;
	}
	else if (hh > 11 && ampm == AM) {
		hh -= 12;
	}

    if (utc)
	    return new Date(Date.UTC(year, month - 1, date, hh, mm, _ss));
    else
        return new Date(year, month - 1, date, hh, mm, _ss);
};

Date.parseExact = function(val, format, culture) {
    return Date._parseExact(val, format, culture, false);
}

Date.parseExactUTC = function(val, format, culture) {
    return Date._parseExact(val, format, culture, true);
}


Error.__typeName = 'Error';

Error.prototype.popStackFrame = function Error$popStackFrame() {
    if (ss.isNullOrUndefined(this.stack) ||
        ss.isNullOrUndefined(this.fileName) ||
        ss.isNullOrUndefined(this.lineNumber)) {
        return;
    }

    var stackFrames = this.stack.split('\n');
    var currentFrame = stackFrames[0];
    var pattern = this.fileName + ':' + this.lineNumber;
    while (!ss.isNullOrUndefined(currentFrame) &&
           currentFrame.indexOf(pattern) === -1) {
        stackFrames.shift();
        currentFrame = stackFrames[0];
    }

    var nextFrame = stackFrames[1];
    if (isNullOrUndefined(nextFrame)) {
        return;
    }

    var nextFrameParts = nextFrame.match(/@(.*):(\d+)$/);
    if (ss.isNullOrUndefined(nextFrameParts)) {
        return;
    }

    stackFrames.shift();
    this.stack = stackFrames.join("\n");
    this.fileName = nextFrameParts[1];
    this.lineNumber = parseInt(nextFrameParts[2]);
}

Error.createError = function(message, errorInfo, innerException) {
    var e = new Error(message);
    if (errorInfo) {
        for (var v in errorInfo) {
            e[v] = errorInfo[v];
        }
    }
    if (innerException) {
        e.innerException = innerException;
    }

    e.popStackFrame();
    return e;
}


Function.__typeName = 'Function';

Function.empty = function () { };

Function._contains = function(targets, object, method) {
    for (var i = 0; i < targets.length; i += 2) {
        if (targets[i] === object && targets[i + 1] === method) {
            return true;
        }
    }
    return false;
}

Function._mkdel = function(targets) {
    var delegate = function() {
        if (targets.length == 2) {
            return targets[1].apply(targets[0], arguments);
        }
        else {
            var clone = targets.clone();
            for (var i = 0; i < clone.length; i += 2) {
                if (Function._contains(targets, clone[i], clone[i + 1])) {
                    clone[i + 1].apply(clone[i], arguments);
                }
            }
            return null;
        }
    };
    delegate._targets = targets;

    return delegate;
}

Function.mkdel = function(object, method) {
    if (!object) {
        return method;
    }
    return Function._mkdel([object, method]);
}

Function.combine = function(delegate1, delegate2) {
    if (!delegate1) {
        if (!delegate2._targets) {
            return Function.mkdel(null, delegate2);
        }
        return delegate2;
    }
    if (!delegate2) {
        if (!delegate1._targets) {
            return Function.mkdel(null, delegate1);
        }
        return delegate1;
    }

    var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1];
    var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2];

    return Function._mkdel(targets1.concat(targets2));
}

Function.remove = function(delegate1, delegate2) {
    if (!delegate1 || (delegate1 === delegate2)) {
        return null;
    }
    if (!delegate2) {
        return delegate1;
    }

    var targets = delegate1._targets;
    var object = null;
    var method;
    if (delegate2._targets) {
        object = delegate2._targets[0];
        method = delegate2._targets[1];
    }
    else {
        method = delegate2;
    }

    for (var i = 0; i < targets.length; i += 2) {
        if ((targets[i] === object) && (targets[i + 1] === method)) {
            if (targets.length == 2) {
                return null;
            }
            targets.splice(i, 2);
            return Function._mkdel(targets);
        }
    }

    return delegate1;
}

Function.clone = function(source) {
	return source._targets ? Function._mkdel(source._targets) : function() { return source.apply(this, arguments); };
}

Function.thisFix = function(source) {
    return function() {
        var x = [this];
        for(var i = 0; i < arguments.length; i++)
            x.push(arguments[i]);
        return source.apply(source, x);
    };
}


ss.Debug = window.Debug || function() {};
ss.Debug.__typeName = 'Debug';

if (!ss.Debug.writeln) {
    ss.Debug.writeln = function(text) {
        if (window.console) {
            if (window.console.debug) {
                window.console.debug(text);
                return;
            }
            else if (window.console.log) {
                window.console.log(text);
                return;
            }
        }
        else if (window.opera &&
            window.opera.postError) {
            window.opera.postError(text);
            return;
        }
    }
}

ss.Debug._fail = function(message) {
    ss.Debug.writeln(message);
    eval('debugger;');
}

ss.Debug.assert = function(condition, message) {
    if (!condition) {
        message = 'Assert failed: ' + message;
        if (confirm(message + '\r\n\r\nBreak into debugger?')) {
            ss.Debug._fail(message);
        }
    }
}

ss.Debug.fail = function(message) {
    ss.Debug._fail(message);
}


ss.Enum = function() {
};
ss.Enum.registerClass('ss.Enum');

ss.Enum.parse = function (enumType, s) {
	var values = enumType.prototype;
	if (!enumType.__flags) {
		for (var f in values) {
			if (f === s) {
				return values[f];
			}
		}
	}
	else {
		var parts = s.split('|');
		var value = 0;
		var parsed = true;

		for (var i = parts.length - 1; i >= 0; i--) {
			var part = parts[i].trim();
			var found = false;

			for (var f in values) {
				if (f === part) {
					value |= values[f];
					found = true;
					break;
				}
			}
			if (!found) {
				parsed = false;
				break;
			}
		}

		if (parsed) {
			return value;
		}
	}
	throw 'Invalid Enumeration Value';
};

ss.Enum.toString = function (enumType, value) {
	var values = enumType.prototype;
	if (!enumType.__flags || (value === 0)) {
		for (var i in values) {
			if (values[i] === value) {
				return i;
			}
		}
		throw 'Invalid Enumeration Value';
	}
	else {
		var parts = [];
		for (var i in values) {
			if (values[i] & value) {
				parts.add(i);
			}
		}
		if (!parts.length) {
			throw 'Invalid Enumeration Value';
		}
		return parts.join(' | ');
	}
};


ss.CultureInfo = function(name, numberFormat, dateFormat) {
    this.name = name;
    this.numberFormat = numberFormat;
    this.dateFormat = dateFormat;
}
ss.CultureInfo.registerClass('ss.CultureInfo');

ss.CultureInfo.InvariantCulture = new ss.CultureInfo('en-US',
    {
        naNSymbol: 'NaN',
        negativeSign: '-',
        positiveSign: '+',
        negativeInfinityText: '-Infinity',
        positiveInfinityText: 'Infinity',
        
        percentSymbol: '%',
        percentGroupSizes: [3],
        percentDecimalDigits: 2,
        percentDecimalSeparator: '.',
        percentGroupSeparator: ',',
        percentPositivePattern: '{0} %',
        percentNegativePattern: '-{0} %',

        currencySymbol:'$',
        currencyGroupSizes: [3],
        currencyDecimalDigits: 2,
        currencyDecimalSeparator: '.',
        currencyGroupSeparator: ',',
        currencyNegativePattern: '(${0})',
        currencyPositivePattern: '${0}',

        numberGroupSizes: [3],
        numberDecimalDigits: 2,
        numberDecimalSeparator: '.',
        numberGroupSeparator: ','
    },
    {
        amDesignator: 'AM',
        pmDesignator: 'PM',

        dateSeparator: '/',
        timeSeparator: ':',

        gmtDateTimePattern: 'ddd, dd MMM yyyy HH:mm:ss \'GMT\'',
        universalDateTimePattern: 'yyyy-MM-dd HH:mm:ssZ',
        sortableDateTimePattern: 'yyyy-MM-ddTHH:mm:ss',
        dateTimePattern: 'dddd, MMMM dd, yyyy h:mm:ss tt',

        longDatePattern: 'dddd, MMMM dd, yyyy',
        shortDatePattern: 'M/d/yyyy',

        longTimePattern: 'h:mm:ss tt',
        shortTimePattern: 'h:mm tt',

        firstDayOfWeek: 0,
        dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        shortDayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        minimizedDayNames: ['Su','Mo','Tu','We','Th','Fr','Sa'],

        monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December',''],
        shortMonthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','']
    });
ss.CultureInfo.CurrentCulture = ss.CultureInfo.InvariantCulture;


ss.IEnumerator = function() { };

ss.IEnumerator.registerInterface('ss.IEnumerator', ss.IDisposable);


ss.IEnumerable = function() { };

ss.IEnumerable.isAssignableFrom = function(type) {
	if (type == Array)
		return true;
	else
		return Type.prototype.isAssignableFrom.call(this, type);
};

ss.IEnumerable.registerInterface('ss.IEnumerable');


ss.ICollection = function() { };

ss.ICollection.isAssignableFrom = function(type) {
	if (type == Array)
		return true;
	else
		return Type.prototype.isAssignableFrom.call(this, type);
};

ss.ICollection.registerInterface('ss.ICollection', ss.IEnumerable);


ss.Nullable = function() {
};

ss.Nullable.registerClass('ss.Nullable');

ss.Nullable.unbox = function(instance) {
	if (!ss.isValue(instance))
		throw 'Instance is null';
	return instance;
};

ss.Nullable.eq = function(a, b) {
	return !ss.isValue(a) ? !ss.isValue(b) : (a === b);
};

ss.Nullable.ne = function(a, b) {
	return !ss.isValue(a) ? ss.isValue(b) : (a !== b);
};

ss.Nullable.le = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) && a <= b;
};

ss.Nullable.ge = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) && a >= b;
};

ss.Nullable.lt = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) && a < b;
};

ss.Nullable.gt = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) && a > b;
};

ss.Nullable.sub = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a - b : null;
};

ss.Nullable.add = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a + b : null;
};

ss.Nullable.mod = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a % b : null;
};

ss.Nullable.div = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a / b : null;
};

ss.Nullable.mul = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a * b : null;
};

ss.Nullable.band = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a & b : null;
};

ss.Nullable.bor = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a | b : null;
};

ss.Nullable.xor = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a ^ b : null;
};

ss.Nullable.shl = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a << b : null;
};

ss.Nullable.srs = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a >> b : null;
};

ss.Nullable.sru = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? a >>> b : null;
};

ss.Nullable.and = function(a, b) {
	if (a === true && b === true)
		return true;
	else if (a === false || b === false)
		return false;
	else
		return null;
};

ss.Nullable.or = function(a, b) {
	if (a === true || b === true)
		return true;
	else if (a === false && b === false)
		return false;
	else
		return null;
};

ss.Nullable.not = function(a) {
	return ss.isValue(a) ? !a : null;
};

ss.Nullable.neg = function(a) {
	return ss.isValue(a) ? -a : null;
};

ss.Nullable.pos = function(a) {
	return ss.isValue(a) ? +a : null;
};

ss.Nullable.cpl = function(a) {
	return ss.isValue(a) ? ~a : null;
};


ss.IList = function() { };

ss.IList.isAssignableFrom = function(type) {
	if (type == Array)
		return true;
	else
		return Type.prototype.isAssignableFrom.call(this, type);
};

ss.IList.registerInterface('ss.IList', ss.ICollection, ss.IEnumerable);


ss.IDictionary = function() { };

ss.IDictionary.registerInterface('ss.IDictionary', [ss.IEnumerable]);


ss.Int32 = function() { };

ss.Int32.registerClass('ss.Int32');
ss.Int32.__class = false;

ss.Int32.isInstanceOfType = function(instance) {
	return typeof(instance) === 'number' && isFinite(instance) && Math.round(instance, 0) == instance;
}

ss.Int32.getDefaultValue = function() {
	return 0;
}

ss.Int32.div = function(a, b) {
	return ss.isValue(a) && ss.isValue(b) ? (a / b) | 0 : null;
}

ss.Int32.trunc = function(n) {
	return ss.isValue(n) ? n | 0 : null;
}


ss.JsDate = function() { };

ss.JsDate.registerClass('ss.JsDate');

ss.JsDate.isInstanceOfType = function(instance) {
	return instance instanceof Date;
}


ss.ArrayEnumerator = function(array) {
    this._array = array;
    this._index = -1;
}
ss.ArrayEnumerator.prototype = {
    moveNext: function() {
        this._index++;
        return (this._index < this._array.length);
    },
    reset: function() {
        this._index = -1;
    },
	get_current: function() {
		if (this._index < 0 || this._index >= this._array.length)
			throw 'Invalid operation';
		return this._array[this._index];
	},
    dispose: function() {
    }
}

ss.ArrayEnumerator.registerClass('ss.ArrayEnumerator', null, [ss.IEnumerator, ss.IDisposable]);


ss.ObjectEnumerator = function(o) {
    this._keys = Object.keys(o);
    this._index = -1;
	this._object = o;
};
ss.ObjectEnumerator.prototype = {
    moveNext: function() {
        this._index++;
        return (this._index < this._keys.length);
    },
    reset: function() {
        this._index = -1;
    },
	get_current: function() {
		if (this._index < 0 || this._index >= this._keys.length)
			throw 'Invalid operation';
		var k = this._keys[this._index];
		return { key: k, value: this._object[k] };
	},
    dispose: function() {
    }
};

ss.ObjectEnumerator.registerClass('ss.ObjectEnumerator', null, [ss.IEnumerator, ss.IDisposable]);

ss.Dictionary$2 = function(TKey, TValue) {
	var $type = function(o) {
		this._o = {};
		if (ss.IDictionary.isInstanceOfType(o)) {
			var e = Type.cast(o, ss.IDictionary).getEnumerator();
			try {
				while (e.moveNext()) {
					var c = e.get_current();
					this._o[c.key] = c.value;
				}
			}
			finally {
				if (ss.IDisposable.isInstanceOfType(e)) {
					Type.cast(e, ss.IDisposable).dispose();
				}
			}
		}
		else if (o) {
			var keys = Object.keys(o);
			for (var i = 0; i < keys.length; i++) {
				this._o[keys[i]] = o[keys[i]];
			}
		}
	};
	$type.prototype = {
		get_count: function() {
			return Object.getKeyCount(this._o);
		},
		get_keys: function() {
			return Object.keys(this._o);
		},
		get_values: function() {
			var result = [];
			var keys = Object.keys(this._o);
			for (var i = 0; i < keys.length; i++)
				result.push(this._o[keys[i]]);
			return result;
		},
		get_item: function(key) {
			if (!Object.keys(this._o, key))
				throw 'Key ' + key + ' does not exist.';
			return this._o[key];
		},
		set_item: function(key, value) {
			this._o[key] = value;
		},
		add: function(key, value) {
			if (Object.keyExists(this._o, key))
				throw 'Key ' + key + ' already exists.';
			this._o[key] = value;
		},
		getEnumerator: function() {
			return new ss.ObjectEnumerator(this._o);
		},
		remove: function(key, value) {
			delete this._o[key];
		},
		containsKey: function(key) {
			return Object.keyExists(this._o, key);
		},
		tryGetValue: function(key, value) {
			if (Object.keyExists(this._o, key)) {
				value.$ = this._o[key];
				return true;
			}
			else {
				value.$ = TValue.getDefaultValue();
				return false;
			}
		},
		clear: function() {
			Object.clearKeys(this._o);
		}
	};
	$type.registerGenericClassInstance($type, ss.Dictionary$2, [TKey, TValue], function() { return null }, function() { return [ ss.IDictionary, ss.IEnumerable ] });
	return $type;
};
ss.Dictionary$2.registerGenericClass('ss.Dictionary$2', 2);


ss.IDisposable = function() { };
ss.IDisposable.registerInterface('ss.IDisposable');


ss.StringBuilder = function(s) {
    this._parts = ss.isNullOrUndefined(s) || s === '' ? [] : [s];
    this.isEmpty = this._parts.length == 0;
}
ss.StringBuilder.prototype = {
    append: function(s) {
        if (!ss.isNullOrUndefined(s) && s !== '') {
            this._parts.add(s);
            this.isEmpty = false;
        }
        return this;
    },

	appendChar: function(c) {
		return this.append(String.fromCharCode(c));
	},

    appendLine: function(s) {
        this.append(s);
        this.append('\r\n');
        this.isEmpty = false;
        return this;
    },

	appendLineChar: function(c) {
		return this.appendLine(String.fromCharCode(c));
	},

    clear: function() {
        this._parts = [];
        this.isEmpty = true;
    },

    toString: function(s) {
        return this._parts.join(s || '');
    }
};

ss.StringBuilder.registerClass('ss.StringBuilder');


ss.EventArgs = function() {
}
ss.EventArgs.registerClass('ss.EventArgs');

ss.EventArgs.Empty = new ss.EventArgs();


ss.Exception = function(message, innerException) {
	this._message = message || null;
	this._innerException = innerException || null;
}
ss.Exception.registerClass('ss.Exception');

ss.Exception.prototype = {
	get_message: function() {
		return this._message;
	},
	get_innerException: function() {
		return this._innerException;
	}
};

ss.Exception.wrap = function(o) {
	if (ss.Exception.isInstanceOfType(o)) {
		return o;
	}
	else {
		return new ss.Exception(o);
	}
};


ss.NotSupportedException = function(message, innerException) {
	ss.Exception.call(this, message, innerException);
};
ss.NotSupportedException.registerClass('ss.NotSupportedException', ss.Exception);


ss.IteratorBlockEnumerable = function(getEnumerator, $this) {
    this._getEnumerator = getEnumerator;
    this._this = $this;
};

ss.IteratorBlockEnumerable.prototype = {
    getEnumerator: function() {
        return this._getEnumerator.call(this._this);
    }
};

ss.IteratorBlockEnumerable.registerClass('ss.IteratorBlockEnumerable', null, ss.IEnumerable);


ss.IteratorBlockEnumerator = function(moveNext, getCurrent, dispose, $this) {
    this._moveNext = moveNext;
    this._getCurrent = getCurrent;
    this._dispose = dispose;
    this._this = $this;
};

ss.IteratorBlockEnumerator.prototype = {
	moveNext: function() {
        try {
		    return this._moveNext.call(this._this);
        }
        catch (ex) {
            if (this._dispose)
                this._dispose.call(this._this);
            throw ex;
        }
	},
	get_current: function() {
		return this._getCurrent.call(this._this);
	},
	reset: function() {
		throw new ss.NotSupportedException('Reset is not supported.');
	},
	dispose: function() {
		if (this._dispose)
            this._dispose.call(this._this);
	}
};

ss.IteratorBlockEnumerator.registerClass('ss.IteratorBlockEnumerator', null, [ss.IEnumerator, ss.IDisposable]);


if (!window.XMLHttpRequest) {
  window.XMLHttpRequest = function() {
    var progIDs = [ 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ];

    for (var i = 0; i < progIDs.length; i++) {
      try {
        var xmlHttp = new ActiveXObject(progIDs[i]);
        return xmlHttp;
      }
      catch (ex) {
      }
    }

    return null;
  }
}

ss.parseXml = function(markup) {
  try {
    if (DOMParser) {
      var domParser = new DOMParser();
      return domParser.parseFromString(markup, 'text/xml');
    }
    else {
      var progIDs = [ 'Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument' ];
        
      for (var i = 0; i < progIDs.length; i++) {
        var xmlDOM = new ActiveXObject(progIDs[i]);
        xmlDOM.async = false;
        xmlDOM.loadXML(markup);
        xmlDOM.setProperty('SelectionLanguage', 'XPath');
                
        return xmlDOM;
      }
    }
  }
  catch (ex) {
  }

  return null;
}


ss.CancelEventArgs = function() {
    ss.CancelEventArgs.initializeBase(this);
    this.cancel = false;
}
ss.CancelEventArgs.registerClass('ss.CancelEventArgs', ss.EventArgs);


ss.Observable = function(v) {
    this._v = v;
    this._observers = null;
}
ss.Observable.prototype = {

  getValue: function () {
    this._observers = ss.Observable._captureObservers(this._observers);
    return this._v;
  },
  setValue: function (v) {
    if (this._v !== v) {
      this._v = v;

      var observers = this._observers;
      if (observers) {
        this._observers = null;
        ss.Observable._invalidateObservers(observers);
      }
    }
  }
};

ss.Observable._observerStack = [];
ss.Observable._observerRegistration = {
  dispose: function () {
    ss.Observable._observerStack.pop();
  }
}
ss.Observable.registerObserver = function (o) {
  ss.Observable._observerStack.push(o);
  return ss.Observable._observerRegistration;
}
ss.Observable._captureObservers = function (observers) {
  var registeredObservers = ss.Observable._observerStack;
  var observerCount = registeredObservers.length;

  if (observerCount) {
    observers = observers || [];
    for (var i = 0; i < observerCount; i++) {
      var observer = registeredObservers[i];
      if (!observers.contains(observer)) {
        observers.push(observer);
      }
    }
    return observers;
  }
  return null;
}
ss.Observable._invalidateObservers = function (observers) {
  for (var i = 0, len = observers.length; i < len; i++) {
    observers[i].invalidateObserver();
  }
}

ss.Observable.registerClass('ss.Observable');

ss.ObservableCollection = function (items) {
  this._items = items || [];
  this._observers = null;
}
ss.ObservableCollection.prototype = {

  get_item: function (index) {
    this._observers = ss.Observable._captureObservers(this._observers);
    return this._items[index];
  },
  set_item: function (index, item) {
    this._items[index] = item;
    this._updated();
  },
  get_length: function () {
    this._observers = ss.Observable._captureObservers(this._observers);
    return this._items.length;
  },
  add: function (item) {
    this._items.push(item);
    this._updated();
  },
  clear: function () {
    this._items.clear();
    this._updated();
  },
  contains: function (item) {
    return this._items.contains(item);
  },
  getEnumerator: function () {
    this._observers = ss.Observable._captureObservers(this._observers);
    return this._items.getEnumerator();
  },
  indexOf: function (item) {
    return this._items.indexOf(item);
  },
  insert: function (index, item) {
    this._items.insert(index, item);
    this._updated();
  },
  remove: function (item) {
    if (this._items.remove(item)) {
      this._updated();
      return true;
    }
    return false;
  },
  removeAt: function (index) {
    this._items.removeAt(index);
    this._updated();
  },
  toArray: function () {
    return this._items;
  },
  _updated: function() {
    var observers = this._observers;
    if (observers) {
      this._observers = null;
      ss.Observable._invalidateObservers(observers);
    }
  }
}
ss.ObservableCollection.registerClass('ss.ObservableCollection', null, ss.IEnumerable);


ss.IApplication = function() { };
ss.IApplication.registerInterface('ss.IApplication');

ss.IContainer = function () { };
ss.IContainer.registerInterface('ss.IContainer');

ss.IObjectFactory = function () { };
ss.IObjectFactory.registerInterface('ss.IObjectFactory');

ss.IEventManager = function () { };
ss.IEventManager.registerInterface('ss.IEventManager');

ss.IInitializable = function () { };
ss.IInitializable.registerInterface('ss.IInitializable');

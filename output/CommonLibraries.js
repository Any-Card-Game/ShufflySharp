Type.registerNamespace('CommonLibraries');
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.ExtensionMethods
CommonLibraries.ExtensionMethods = function() {
};
CommonLibraries.ExtensionMethods.cleanUp = function(T) {
	return function(o) {
		return JSON.parse(JSON.stringify(o, CommonLibraries.Help.sanitize));
	};
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.GameAnswer
CommonLibraries.GameAnswer = function() {
	this.lineNumber = 0;
	this.value = 0;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Guid
CommonLibraries.Guid = function() {
};
CommonLibraries.Guid.newGuid = function() {
	var guid = '';
	for (var i = 0; i < 12; i++) {
		guid += String.fromCharCode((parseInt((Math.random() * 26 + 65).toString())));
	}
	return guid;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Help
CommonLibraries.Help = function() {
};
CommonLibraries.Help.cleanUp = function(T) {
	return function(o) {
		return JSON.parse(JSON.stringify(o, CommonLibraries.Help.sanitize));
	};
};
CommonLibraries.Help.sanitize = function(name, value) {
	if (typeof value == 'function') {
		return null;
	}
	if ((name.indexOf(String.fromCharCode(95))) !== 0 && name.toLowerCase() !== 'socket' && name.toLowerCase() !== 'fiber' && name.toLowerCase() !== 'debuggingsocket') {
		return value;
	}
	return null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Point
CommonLibraries.Point = function(x, y) {
	this.x = 0;
	this.y = 0;
	this.x = x;
	this.y = y;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Size
CommonLibraries.Size = function() {
	this.height = 0;
	this.width = 0;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.TypeOrFunction$1
CommonLibraries.TypeOrFunction$1 = function(T) {
	var $type = function(type) {
		this.$1$FuncSetField = null;
		this.$1$FuncGetField = null;
		this.$1$TypeValueField = T.getDefaultValue();
		this.set_typeValue(type);
	};
	$type.prototype = {
		get_funcSet: function() {
			return this.$1$FuncSetField;
		},
		set_funcSet: function(value) {
			this.$1$FuncSetField = value;
		},
		get_funcGet: function() {
			return this.$1$FuncGetField;
		},
		set_funcGet: function(value) {
			this.$1$FuncGetField = value;
		},
		get_typeValue: function() {
			return this.$1$TypeValueField;
		},
		set_typeValue: function(value) {
			this.$1$TypeValueField = value;
		},
		getValue: function() {
			if (ss.isNullOrUndefined(this.get_typeValue()) && (ss.isNullOrUndefined(this.get_funcGet()) && ss.isNullOrUndefined(this.get_funcSet()))) {
				return T.getDefaultValue();
			}
			if (ss.isNullOrUndefined(this.get_typeValue()) && ss.isValue(this.get_funcGet())) {
				return this.get_funcGet()();
			}
			return this.get_typeValue();
		}
	};
	$type.$ctor1 = function(_get, _set) {
		this.$1$FuncSetField = null;
		this.$1$FuncGetField = null;
		this.$1$TypeValueField = T.getDefaultValue();
		this.set_funcGet(_get);
		this.set_funcSet(_set);
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.registerGenericClassInstance($type, CommonLibraries.TypeOrFunction$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
CommonLibraries.TypeOrFunction$1.registerGenericClass('CommonLibraries.TypeOrFunction$1', 1);
CommonLibraries.ExtensionMethods.registerClass('CommonLibraries.ExtensionMethods', Object);
CommonLibraries.GameAnswer.registerClass('CommonLibraries.GameAnswer', Object);
CommonLibraries.Guid.registerClass('CommonLibraries.Guid', Object);
CommonLibraries.Help.registerClass('CommonLibraries.Help', Object);
CommonLibraries.Point.registerClass('CommonLibraries.Point', Object);
CommonLibraries.Size.registerClass('CommonLibraries.Size', Object);

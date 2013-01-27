
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.ExtensionMethods
var $CommonLibraries_ExtensionMethods = function() {
};
$CommonLibraries_ExtensionMethods.goodMessage = function(ex) {
	return ex.get_message() + '  ' + ex.get_innerException();
};
$CommonLibraries_ExtensionMethods.cleanUp = function(T) {
	return function(o) {
		return JSON.parse(JSON.stringify(o, $CommonLibraries_Help.sanitize));
	};
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Guid
var $CommonLibraries_Guid = function() {
};
$CommonLibraries_Guid.newGuid = function() {
	var guid = '';
	for (var i = 0; i < 12; i++) {
		guid += String.fromCharCode(parseInt((Math.random() * 26 + 65).toString()));
	}
	return guid;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Help
var $CommonLibraries_Help = function() {
};
$CommonLibraries_Help.cleanUp = function(T) {
	return function(o) {
		return JSON.parse(JSON.stringify(o, $CommonLibraries_Help.sanitize));
	};
};
$CommonLibraries_Help.sanitize = function(name, value) {
	if (typeof(value) == 'function') {
		return null;
	}
	if (name.indexOf(String.fromCharCode(95)) !== 0 && name.toLowerCase() !== 'socket' && name.toLowerCase() !== 'fiber' && name.toLowerCase() !== 'debuggingsocket') {
		return value;
	}
	return null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Point
var $CommonLibraries_Point = function(x, y) {
	this.x = 0;
	this.y = 0;
	this.x = x;
	this.y = y;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Size
var $CommonLibraries_Size = function() {
};
$CommonLibraries_Size.createInstance = function() {
	return $CommonLibraries_Size.$ctor();
};
$CommonLibraries_Size.$ctor1 = function(width, height) {
	var $this = {};
	$this.width = 0;
	$this.height = 0;
	$this.width = width;
	$this.height = height;
	return $this;
};
$CommonLibraries_Size.$ctor = function() {
	var $this = {};
	$this.width = 0;
	$this.height = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.TypeOrFunction
var $CommonLibraries_TypeOrFunction$1 = function(T) {
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
	Type.registerGenericClassInstance($type, $CommonLibraries_TypeOrFunction$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonLibraries.TypeOrFunction$1', $CommonLibraries_TypeOrFunction$1, 1);
Type.registerClass(global, 'CommonLibraries.ExtensionMethods', $CommonLibraries_ExtensionMethods, Object);
Type.registerClass(global, 'CommonLibraries.Guid', $CommonLibraries_Guid, Object);
Type.registerClass(global, 'CommonLibraries.Help', $CommonLibraries_Help, Object);
Type.registerClass(global, 'CommonLibraries.Point', $CommonLibraries_Point, Object);
Type.registerClass(global, 'CommonLibraries.Size', $CommonLibraries_Size, Object);

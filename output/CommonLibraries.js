
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Constants
	var $CommonLibraries_Constants = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.DelegateOrValue
	var $CommonLibraries_DelegateOrValue$1 = function(T) {
		var $type = function(d) {
			this.isValue = false;
			this.$method = null;
			this.$oldValue = ss.getDefaultValue(T);
			this.$value = ss.getDefaultValue(T);
			this.$1$StaticValueChangesField = null;
			this.$method = d;
			this.isValue = false;
			this.$oldValue = this.$method();
		};
		$type.prototype = {
			get_staticValueChanges: function() {
				return this.$1$StaticValueChangesField;
			},
			set_staticValueChanges: function(value) {
				this.$1$StaticValueChangesField = value;
			},
			$evaluate: function() {
				if (this.isValue === true) {
					return this.$value;
				}
				else if (this.isValue === false) {
					var val = this.$method();
					if (val !== this.$oldValue) {
						this.get_staticValueChanges()(val);
					}
					this.$oldValue = val;
					return val;
				}
				return ss.getDefaultValue(T);
			}
		};
		$type.$ctor1 = function(d) {
			this.isValue = false;
			this.$method = null;
			this.$oldValue = ss.getDefaultValue(T);
			this.$value = ss.getDefaultValue(T);
			this.$1$StaticValueChangesField = null;
			this.$value = d;
			this.isValue = true;
		};
		$type.$ctor1.prototype = $type.prototype;
		$type.op_Implicit$2 = function(d) {
			return new $type.$ctor1(d);
		};
		$type.op_Implicit$1 = function(d) {
			return new $type(d);
		};
		$type.op_Implicit = function(d) {
			return d.$evaluate();
		};
		ss.registerGenericClassInstance($type, $CommonLibraries_DelegateOrValue$1, [T], function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'CommonLibraries.DelegateOrValue$1', $CommonLibraries_DelegateOrValue$1, 1);
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
		if ((name.indexOf(String.fromCharCode(95)) !== 0 || name === '_id') && name.toLowerCase() !== 'socket' && name.toLowerCase() !== 'fiber' && name.toLowerCase() !== 'debuggingsocket') {
			return value;
		}
		return null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.IntPoint
	var $CommonLibraries_IntPoint = function(x, y) {
		this.x = 0;
		this.y = 0;
		this.x = x;
		this.y = y;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Number
	var $CommonLibraries_Number = function(s) {
		this.$value = null;
		this.$value = s.toString();
	};
	$CommonLibraries_Number.$ctor1 = function(s) {
		this.$value = null;
		this.$value = s;
	};
	$CommonLibraries_Number.$ctor1.prototype = $CommonLibraries_Number.prototype;
	$CommonLibraries_Number.op_Implicit = function(d) {
		return parseFloat(d.$value);
	};
	$CommonLibraries_Number.op_Implicit$3 = function(d) {
		return new $CommonLibraries_Number.$ctor1(d);
	};
	$CommonLibraries_Number.op_Implicit$2 = function(d) {
		return new $CommonLibraries_Number(d);
	};
	$CommonLibraries_Number.op_Implicit$1 = function(d) {
		return ((d.$value.indexOf('%') < 0) ? (d.$value + 'px') : d.$value);
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
			this.$1$TypeValueField = ss.getDefaultValue(T);
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
				if (ss.isNullOrUndefined(this.get_typeValue()) && (ss.staticEquals(this.get_funcGet(), null) && ss.staticEquals(this.get_funcSet(), null))) {
					return ss.getDefaultValue(T);
				}
				if (ss.isNullOrUndefined(this.get_typeValue()) && !ss.staticEquals(this.get_funcGet(), null)) {
					return this.get_funcGet()();
				}
				return this.get_typeValue();
			}
		};
		$type.$ctor1 = function(_get, _set) {
			this.$1$FuncSetField = null;
			this.$1$FuncGetField = null;
			this.$1$TypeValueField = ss.getDefaultValue(T);
			this.set_funcGet(_get);
			this.set_funcSet(_set);
		};
		$type.$ctor1.prototype = $type.prototype;
		ss.registerGenericClassInstance($type, $CommonLibraries_TypeOrFunction$1, [T], function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'CommonLibraries.TypeOrFunction$1', $CommonLibraries_TypeOrFunction$1, 1);
	ss.registerClass(global, 'CommonLibraries.Constants', $CommonLibraries_Constants);
	ss.registerClass(global, 'CommonLibraries.ExtensionMethods', $CommonLibraries_ExtensionMethods);
	ss.registerClass(global, 'CommonLibraries.Guid', $CommonLibraries_Guid);
	ss.registerClass(global, 'CommonLibraries.Help', $CommonLibraries_Help);
	ss.registerClass(global, 'CommonLibraries.IntPoint', $CommonLibraries_IntPoint);
	ss.registerClass(global, 'CommonLibraries.Number', $CommonLibraries_Number);
	ss.registerClass(global, 'CommonLibraries.Point', $CommonLibraries_Point);
	ss.registerClass(global, 'CommonLibraries.Size', $CommonLibraries_Size);
	$CommonLibraries_Constants.local = false;
	$CommonLibraries_Constants.webIP = 'http://content.anycardgame.com/';
	$CommonLibraries_Constants.redisIP = '198.211.107.101';
	$CommonLibraries_Constants.mongoIP = '198.211.107.101';
	$CommonLibraries_Constants.HARDLOCATION = '/usr/local/src/new/';
	$CommonLibraries_Help.verbose = true;
})();

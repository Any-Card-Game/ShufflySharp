
(function() {
	'use strict';
	global.CommonLibraries = global.CommonLibraries || {};
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Constants
	var $CommonLibraries_Constants = function() {
	};
	$CommonLibraries_Constants.__typeName = 'CommonLibraries.Constants';
	global.CommonLibraries.Constants = $CommonLibraries_Constants;
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
		$type.$ctor1 = function(d) {
			this.isValue = false;
			this.$method = null;
			this.$oldValue = ss.getDefaultValue(T);
			this.$value = ss.getDefaultValue(T);
			this.$1$StaticValueChangesField = null;
			this.$value = d;
			this.isValue = true;
		};
		$type.op_Implicit$2 = function(d) {
			return new $type.$ctor1(d);
		};
		$type.op_Implicit$1 = function(d) {
			return new $type(d);
		};
		$type.op_Implicit = function(d) {
			return d.$evaluate();
		};
		ss.registerGenericClassInstance($type, $CommonLibraries_DelegateOrValue$1, [T], {
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
		}, function() {
			return null;
		}, function() {
			return [];
		});
		$type.$ctor1.prototype = $type.prototype;
		return $type;
	};
	$CommonLibraries_DelegateOrValue$1.__typeName = 'CommonLibraries.DelegateOrValue$1';
	ss.initGenericClass($CommonLibraries_DelegateOrValue$1, 1);
	global.CommonLibraries.DelegateOrValue$1 = $CommonLibraries_DelegateOrValue$1;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.EnumerableExtensions
	var $CommonLibraries_EnumerableExtensions = function() {
	};
	$CommonLibraries_EnumerableExtensions.__typeName = 'CommonLibraries.EnumerableExtensions';
	$CommonLibraries_EnumerableExtensions.count = function(T) {
		return function(enumerable, counter) {
			var count = 0;
			for (var $t1 = 0; $t1 < enumerable.length; $t1++) {
				var v = enumerable[$t1];
				if (counter(v)) {
					count++;
				}
			}
			return count;
		};
	};
	$CommonLibraries_EnumerableExtensions.where = function(T) {
		return function(enumerable, counter) {
			var ts = [];
			for (var $t1 = 0; $t1 < enumerable.length; $t1++) {
				var v = enumerable[$t1];
				if (counter(v)) {
					ss.add(ts, v);
				}
			}
			return ts;
		};
	};
	global.CommonLibraries.EnumerableExtensions = $CommonLibraries_EnumerableExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.ExtensionMethods
	var $CommonLibraries_ExtensionMethods = function() {
	};
	$CommonLibraries_ExtensionMethods.__typeName = 'CommonLibraries.ExtensionMethods';
	$CommonLibraries_ExtensionMethods.goodMessage = function(ex) {
		return ex.get_message() + '  ' + ex.get_innerException();
	};
	$CommonLibraries_ExtensionMethods.toPx = function(num) {
		return num + 'px';
	};
	$CommonLibraries_ExtensionMethods.toPx$1 = function(num) {
		return num + 'px';
	};
	$CommonLibraries_ExtensionMethods.cleanUp = function(T) {
		return function(o) {
			return JSON.parse(JSON.stringify(o, $CommonLibraries_Help.sanitize));
		};
	};
	$CommonLibraries_ExtensionMethods.sameAs = function(T, T2) {
		return function(left, right) {
			var $t1 = new ss.ObjectEnumerator(left);
			try {
				while ($t1.moveNext()) {
					var v = $t1.current();
					if (!ss.staticEquals(right[v.key], v.value)) {
						return false;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = new ss.ObjectEnumerator(right);
			try {
				while ($t2.moveNext()) {
					var v1 = $t2.current();
					if (!ss.staticEquals(left[v1.key], v1.value)) {
						return false;
					}
				}
			}
			finally {
				$t2.dispose();
			}
			return true;
		};
	};
	global.CommonLibraries.ExtensionMethods = $CommonLibraries_ExtensionMethods;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Help
	var $CommonLibraries_Help = function() {
	};
	$CommonLibraries_Help.__typeName = 'CommonLibraries.Help';
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
	global.CommonLibraries.Help = $CommonLibraries_Help;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.IntPoint
	var $CommonLibraries_IntPoint = function(x, y) {
		this.x = 0;
		this.y = 0;
		this.x = x;
		this.y = y;
	};
	$CommonLibraries_IntPoint.__typeName = 'CommonLibraries.IntPoint';
	global.CommonLibraries.IntPoint = $CommonLibraries_IntPoint;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Number
	var $CommonLibraries_Number = function(s) {
		this.$value = null;
		this.$value = s.toString();
	};
	$CommonLibraries_Number.__typeName = 'CommonLibraries.Number';
	$CommonLibraries_Number.$ctor1 = function(s) {
		this.$value = null;
		this.$value = s;
	};
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
	global.CommonLibraries.Number = $CommonLibraries_Number;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Point
	var $CommonLibraries_Point = function(x, y) {
		this.x = 0;
		this.y = 0;
		this.x = x;
		this.y = y;
	};
	$CommonLibraries_Point.__typeName = 'CommonLibraries.Point';
	global.CommonLibraries.Point = $CommonLibraries_Point;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.Size
	var $CommonLibraries_Size = function() {
	};
	$CommonLibraries_Size.__typeName = 'CommonLibraries.Size';
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
	global.CommonLibraries.Size = $CommonLibraries_Size;
	////////////////////////////////////////////////////////////////////////////////
	// CommonLibraries.TypeOrFunction
	var $CommonLibraries_TypeOrFunction$1 = function(T) {
		var $type = function(type) {
			this.$1$FuncSetField = null;
			this.$1$FuncGetField = null;
			this.$1$TypeValueField = ss.getDefaultValue(T);
			this.set_typeValue(type);
		};
		$type.$ctor1 = function(_get, _set) {
			this.$1$FuncSetField = null;
			this.$1$FuncGetField = null;
			this.$1$TypeValueField = ss.getDefaultValue(T);
			this.set_funcGet(_get);
			this.set_funcSet(_set);
		};
		ss.registerGenericClassInstance($type, $CommonLibraries_TypeOrFunction$1, [T], {
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
		}, function() {
			return null;
		}, function() {
			return [];
		});
		$type.$ctor1.prototype = $type.prototype;
		return $type;
	};
	$CommonLibraries_TypeOrFunction$1.__typeName = 'CommonLibraries.TypeOrFunction$1';
	ss.initGenericClass($CommonLibraries_TypeOrFunction$1, 1);
	global.CommonLibraries.TypeOrFunction$1 = $CommonLibraries_TypeOrFunction$1;
	ss.initClass($CommonLibraries_Constants, {});
	ss.initClass($CommonLibraries_EnumerableExtensions, {});
	ss.initClass($CommonLibraries_ExtensionMethods, {});
	ss.initClass($CommonLibraries_Help, {});
	ss.initClass($CommonLibraries_IntPoint, {});
	ss.initClass($CommonLibraries_Number, {});
	$CommonLibraries_Number.$ctor1.prototype = $CommonLibraries_Number.prototype;
	ss.initClass($CommonLibraries_Point, {});
	ss.initClass($CommonLibraries_Size, {});
	$CommonLibraries_Constants.local = false;
	$CommonLibraries_Constants.rootAddress = 'http://198.211.107.235';
	$CommonLibraries_Constants.homeAddress = 'http://198.211.107.235';
	$CommonLibraries_Constants.contentAddress = 'http://content.anycardgame.com/';
	$CommonLibraries_Constants.redisIP = '198.211.107.101';
	$CommonLibraries_Constants.mongoIP = '198.211.107.101';
	$CommonLibraries_Constants.HARDLOCATION = '/usr/local/src/new/';
})();

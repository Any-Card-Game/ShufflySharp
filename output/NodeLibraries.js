require('./mscorlib.js');EventEmitter= require('events').EventEmitter;
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Charm.CharmColors
	var $NodeLibraries_Common_Charm_CharmColors = function() {
	};
	$NodeLibraries_Common_Charm_CharmColors.prototype = { red: 'red', cyan: 'cyan', yellow: 'yellow', green: 'green', blue: 'blue', magenta: 'magenta', black: 'black', white: 'white' };
	ss.registerEnum(global, 'NodeLibraries.Common.Charm.CharmColors', $NodeLibraries_Common_Charm_CharmColors, false);
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Charm.Charmer
	var $NodeLibraries_Common_Charm_Charmer = function() {
	};
	$NodeLibraries_Common_Charm_Charmer.setup = function() {
		var ch = require('charm');
		var charm = ch();
		charm.cursor(false);
		charm.pipe(process.stdout);
		charm.reset();
		charm.on('^C', function() {
			charm.foreground('white');
			charm.background('black');
			charm.position(0, 100);
			process.exit();
		});
		return charm;
	};
	$NodeLibraries_Common_Charm_Charmer.testSpinner = function() {
		var charm = $NodeLibraries_Common_Charm_Charmer.setup();
		var radius = 10;
		var theta = 0;
		var points = [];
		var iv = setInterval(function() {
			var x = 2 + (radius + Math.cos(theta) * radius) * 2;
			var y = 2 + radius + Math.sin(theta) * radius;
			ss.insert(points, 0, new CommonLibraries.Point(x, y));
			var colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
			for (var i = 0; i < points.length; i++) {
				var p = points[i];
				charm.position(ss.Int32.trunc(p.x), ss.Int32.trunc(p.y));
				var c = colors[ss.Int32.trunc(Math.floor(i / 12))];
				charm.background(c).write(' ');
			}
			points = ss.arrayClone(points.slice(0, 12 * colors.length - 1));
			theta += Math.PI / 40;
		}, 50);
	};
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Charm.DisplayType
	var $NodeLibraries_Common_Charm_DisplayType = function() {
	};
	$NodeLibraries_Common_Charm_DisplayType.prototype = { reset: 'reset', bright: 'bright', dim: 'dim', underscore: 'underscore', blink: 'blink', reverse: 'reverse', hidden: 'hidden' };
	ss.registerEnum(global, 'NodeLibraries.Common.Charm.DisplayType', $NodeLibraries_Common_Charm_DisplayType, false);
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Charm.EraseType
	var $NodeLibraries_Common_Charm_EraseType = function() {
	};
	$NodeLibraries_Common_Charm_EraseType.prototype = { end: 'end', start: 'start', line: 'line', down: 'down', Up: 'Up', screen: 'screen' };
	ss.registerEnum(global, 'NodeLibraries.Common.Charm.EraseType', $NodeLibraries_Common_Charm_EraseType, false);
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Logging.Logger
	var $NodeLibraries_Common_Logging_Logger = function() {
	};
	$NodeLibraries_Common_Logging_Logger.start = function(key) {
		console.log(key + ' - ' + (new Date()).toDateString() + '  ' + (new Date()).toTimeString());
		$NodeLibraries_Common_Logging_Logger.$key = key + ' - ' + (new Date()).toDateString() + '  ' + (new Date()).toTimeString() + '.txt';
	};
	$NodeLibraries_Common_Logging_Logger.log = function(item, level) {
		switch (level) {
			case 0: {
				console.log(item);
				break;
			}
			case 1: {
				console.log(item);
				break;
			}
			case 2: {
				break;
			}
		}
		$NodeLibraries_Common_Logging_Logger.$fs.appendFile('logs/' + $NodeLibraries_Common_Logging_Logger.$key, item + '\n', null, null);
	};
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Logging.LogLevel
	var $NodeLibraries_Common_Logging_LogLevel = function() {
	};
	$NodeLibraries_Common_Logging_LogLevel.prototype = { error: 0, debugInformation: 1, information: 2 };
	ss.registerEnum(global, 'NodeLibraries.Common.Logging.LogLevel', $NodeLibraries_Common_Logging_LogLevel, false);
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Logging.ProgressBar
	var $NodeLibraries_Common_Logging_ProgressBar = function(charm, minValue, maxValue) {
		this.$myCharm = null;
		this.$myCurValue = 0;
		this.$1$MinValueField = 0;
		this.$1$MaxValueField = 0;
		this.$1$XField = 0;
		this.$1$YField = 0;
		this.$1$WidthField = 0;
		this.set_minValue(minValue);
		this.set_maxValue(maxValue);
		this.$myCharm = charm;
	};
	$NodeLibraries_Common_Logging_ProgressBar.prototype = {
		get_minValue: function() {
			return this.$1$MinValueField;
		},
		set_minValue: function(value) {
			this.$1$MinValueField = value;
		},
		get_maxValue: function() {
			return this.$1$MaxValueField;
		},
		set_maxValue: function(value) {
			this.$1$MaxValueField = value;
		},
		get_curValue: function() {
			return this.$myCurValue;
		},
		set_curValue: function(value) {
			this.$myCurValue = value;
			this.$redraw();
		},
		$redraw: function() {
			this.$myCharm.background('cyan');
			this.$myCharm.position(this.get_x() - 1, this.get_y() - 1);
			for (var i = 0; i <= this.get_width() + 2; i++) {
				this.$myCharm.write(' ');
			}
			this.$myCharm.position(this.get_x() - 1, this.get_y() + 1);
			for (var i1 = 0; i1 <= this.get_width() + 2; i1++) {
				this.$myCharm.write(' ');
			}
			this.$myCharm.position(this.get_x() + this.get_width() + 1, this.get_y());
			this.$myCharm.write(' ');
			this.$myCharm.position(this.get_x() - 1, this.get_y());
			this.$myCharm.write(' ');
			this.$myCharm.background('red');
			var w = ss.Int32.trunc(this.get_curValue() / (this.get_maxValue() - this.get_minValue()) * this.get_width());
			for (var i2 = 0; i2 < w; i2++) {
				this.$myCharm.write(' ');
			}
			this.$myCharm.background('black');
		},
		get_x: function() {
			return this.$1$XField;
		},
		set_x: function(value) {
			this.$1$XField = value;
		},
		get_y: function() {
			return this.$1$YField;
		},
		set_y: function(value) {
			this.$1$YField = value;
		},
		get_width: function() {
			return this.$1$WidthField;
		},
		set_width: function(value) {
			this.$1$WidthField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Common.Logging.ServerHelper
	var $NodeLibraries_Common_Logging_ServerHelper = function() {
	};
	$NodeLibraries_Common_Logging_ServerHelper.getNetworkIPs = function() {
		var os = require('os');
		var interfaces = os.networkInterfaces();
		var addresses = [];
		var $t1 = new ss.ObjectEnumerator(interfaces);
		try {
			while ($t1.moveNext()) {
				var k = $t1.current();
				var $t2 = new ss.ObjectEnumerator(k.value);
				try {
					while ($t2.moveNext()) {
						var k2 = $t2.current();
						var address = k2.value;
						if (!!(address.family === 'IPv4' && !address.internal)) {
							ss.add(addresses, ss.cast(address.address, String));
						}
					}
				}
				finally {
					$t2.dispose();
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return addresses;
	};
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.MongoDB.MongoDocument
	var $NodeLibraries_MongoDB_MongoDocument = function() {
	};
	$NodeLibraries_MongoDB_MongoDocument.createInstance = function() {
		return $NodeLibraries_MongoDB_MongoDocument.$ctor();
	};
	$NodeLibraries_MongoDB_MongoDocument.get_objectID = function() {
		return $NodeLibraries_MongoDB_MongoDocument.$1$ObjectIDField;
	};
	$NodeLibraries_MongoDB_MongoDocument.set_objectID = function(value) {
		$NodeLibraries_MongoDB_MongoDocument.$1$ObjectIDField = value;
	};
	$NodeLibraries_MongoDB_MongoDocument.getID = function(id) {
		if (ss.isNullOrUndefined(id)) {
			return null;
		}
		if (ss.referenceEquals(ss.getInstanceType(id), String)) {
			return $NodeLibraries_MongoDB_MongoDocument.get_objectID()(id);
		}
		return id;
	};
	$NodeLibraries_MongoDB_MongoDocument.$ctor = function() {
		var $this = {};
		$this._id = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// NodeLibraries.Redis.RedisClient
	var $NodeLibraries_Redis_RedisClient = function() {
		EventEmitter.call(this);
	};
	$NodeLibraries_Redis_RedisClient.prototype = {
		publish: function(channel, content) {
		},
		subscribe: function(channel) {
		},
		rpush: function(channel, value) {
		},
		monitor: function(action) {
		},
		blpop: function(objectsAndTimeout, action) {
		}
	};
	ss.registerClass(global, 'NodeLibraries.Common.Charm.Charmer', $NodeLibraries_Common_Charm_Charmer);
	ss.registerClass(global, 'NodeLibraries.Common.Logging.Logger', $NodeLibraries_Common_Logging_Logger);
	ss.registerClass(global, 'NodeLibraries.Common.Logging.ProgressBar', $NodeLibraries_Common_Logging_ProgressBar);
	ss.registerClass(global, 'NodeLibraries.Common.Logging.ServerHelper', $NodeLibraries_Common_Logging_ServerHelper);
	ss.registerClass(global, 'NodeLibraries.MongoDB.MongoDocument', $NodeLibraries_MongoDB_MongoDocument);
	ss.registerClass(global, 'NodeLibraries.Redis.RedisClient', $NodeLibraries_Redis_RedisClient, EventEmitter);
	$NodeLibraries_Common_Logging_Logger.$fs = null;
	$NodeLibraries_Common_Logging_Logger.$key = null;
	$NodeLibraries_Common_Logging_Logger.$fs = require('fs');
	$NodeLibraries_MongoDB_MongoDocument.$1$ObjectIDField = null;
	$NodeLibraries_MongoDB_MongoDocument.set_objectID(require('bson').ObjectID);
})();

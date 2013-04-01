require('./mscorlib.js');EventEmitter= require('events.js').EventEmitter;
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
	ss.registerClass(global, 'NodeLibraries.MongoDB.MongoDocument', $NodeLibraries_MongoDB_MongoDocument);
	ss.registerClass(global, 'NodeLibraries.Redis.RedisClient', $NodeLibraries_Redis_RedisClient, EventEmitter);
	$NodeLibraries_MongoDB_MongoDocument.$1$ObjectIDField = null;
	$NodeLibraries_MongoDB_MongoDocument.set_objectID(require('bson').ObjectID);
})();

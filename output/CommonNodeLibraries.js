

(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CommonNodeLibraries.CharmColors
	var $CommonNodeLibraries_CharmColors = function() {
	};
	$CommonNodeLibraries_CharmColors.prototype = { red: 'red', cyan: 'cyan', yellow: 'yellow', green: 'green', blue: 'blue', magenta: 'magenta', black: 'black', white: 'white' };
	ss.registerEnum(global, 'CommonNodeLibraries.CharmColors', $CommonNodeLibraries_CharmColors, false);
	////////////////////////////////////////////////////////////////////////////////
	// CommonNodeLibraries.Charmer
	var $CommonNodeLibraries_Charmer = function() {
	};
	$CommonNodeLibraries_Charmer.setup = function() {
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
	$CommonNodeLibraries_Charmer.testSpinner = function() {
		var charm = $CommonNodeLibraries_Charmer.setup();
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
	// CommonNodeLibraries.DisplayType
	var $CommonNodeLibraries_DisplayType = function() {
	};
	$CommonNodeLibraries_DisplayType.prototype = { reset: 'reset', bright: 'bright', dim: 'dim', underscore: 'underscore', blink: 'blink', reverse: 'reverse', hidden: 'hidden' };
	ss.registerEnum(global, 'CommonNodeLibraries.DisplayType', $CommonNodeLibraries_DisplayType, false);
	////////////////////////////////////////////////////////////////////////////////
	// CommonNodeLibraries.EraseType
	var $CommonNodeLibraries_EraseType = function() {
	};
	$CommonNodeLibraries_EraseType.prototype = { end: 'end', start: 'start', line: 'line', down: 'down', Up: 'Up', screen: 'screen' };
	ss.registerEnum(global, 'CommonNodeLibraries.EraseType', $CommonNodeLibraries_EraseType, false);
	ss.registerClass(global, 'CommonNodeLibraries.Charmer', $CommonNodeLibraries_Charmer);
})();

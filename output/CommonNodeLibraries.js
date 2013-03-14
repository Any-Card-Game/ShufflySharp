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
		charm.pipe(process.stdout);
		charm.reset();
		charm.on('^C', ss.mkdel(process, process.exit));
		return charm;
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

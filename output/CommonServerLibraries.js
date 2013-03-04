
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CommonServerLibraries.Logger
	var $CommonServerLibraries_Logger = function() {
	};
	$CommonServerLibraries_Logger.start = function(key) {
		$CommonServerLibraries_Logger.$key = key + ' - ' + (new Date()).toDateString() + '  ' + (new Date()).toTimeString() + '.txt';
	};
	$CommonServerLibraries_Logger.log = function(item, level) {
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
		$CommonServerLibraries_Logger.$fs.appendFile('logs/' + $CommonServerLibraries_Logger.$key, item + '\n', null, null);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonServerLibraries.LogLevel
	var $CommonServerLibraries_LogLevel = function() {
	};
	$CommonServerLibraries_LogLevel.prototype = { error: 0, debugInformation: 1, information: 2 };
	ss.registerEnum(global, 'CommonServerLibraries.LogLevel', $CommonServerLibraries_LogLevel, false);
	ss.registerClass(global, 'CommonServerLibraries.Logger', $CommonServerLibraries_Logger);
	$CommonServerLibraries_Logger.$fs = null;
	$CommonServerLibraries_Logger.$key = null;
	$CommonServerLibraries_Logger.$fs = require('fs');
})();

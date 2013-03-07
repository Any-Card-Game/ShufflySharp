
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
	////////////////////////////////////////////////////////////////////////////////
	// CommonServerLibraries.ServerHelper
	var $CommonServerLibraries_ServerHelper = function() {
	};
	$CommonServerLibraries_ServerHelper.getNetworkIPs = function() {
		var os = require('os');
		var interfaces = ss.cast(os.networkInterfaces(), Array);
		var addresses = [];
		for (var $t1 = 0; $t1 < interfaces.length; $t1++) {
			var k = interfaces[$t1];
			for (var $t2 = 0; $t2 < k.length; $t2++) {
				var k2 = k[$t2];
				var address = k2;
				if (!!(address.family === 'IPv4' && !address.internal)) {
					ss.add(addresses, ss.cast(address.address, String));
				}
			}
		}
		return addresses;
	};
	ss.registerClass(global, 'CommonServerLibraries.Logger', $CommonServerLibraries_Logger);
	ss.registerClass(global, 'CommonServerLibraries.ServerHelper', $CommonServerLibraries_ServerHelper);
	$CommonServerLibraries_Logger.$fs = null;
	$CommonServerLibraries_Logger.$key = null;
	$CommonServerLibraries_Logger.$fs = require('fs');
})();

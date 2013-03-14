
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CommonServerLibraries.Logger
	var $CommonServerLibraries_Logger = function() {
	};
	$CommonServerLibraries_Logger.start = function(key) {
		console.log(key + ' - ' + (new Date()).toDateString() + '  ' + (new Date()).toTimeString());
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
	ss.registerClass(global, 'CommonServerLibraries.Logger', $CommonServerLibraries_Logger);
	ss.registerClass(global, 'CommonServerLibraries.ServerHelper', $CommonServerLibraries_ServerHelper);
	$CommonServerLibraries_Logger.$fs = null;
	$CommonServerLibraries_Logger.$key = null;
	$CommonServerLibraries_Logger.$fs = require('fs');
})();

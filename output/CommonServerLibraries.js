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
	// CommonServerLibraries.ProgressBar
	var $CommonServerLibraries_ProgressBar = function(charm, minValue, maxValue) {
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
	$CommonServerLibraries_ProgressBar.prototype = {
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
	ss.registerClass(global, 'CommonServerLibraries.ProgressBar', $CommonServerLibraries_ProgressBar);
	ss.registerClass(global, 'CommonServerLibraries.ServerHelper', $CommonServerLibraries_ServerHelper);
	$CommonServerLibraries_Logger.$fs = null;
	$CommonServerLibraries_Logger.$key = null;
	$CommonServerLibraries_Logger.$fs = require('fs');
})();

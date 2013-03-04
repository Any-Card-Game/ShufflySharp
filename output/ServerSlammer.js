require('./mscorlib.js');require('./ClientLibs.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// ServerSlammer.Program
	var $ServerSlammer_$Program = function() {
	};
	$ServerSlammer_$Program.$main = function() {
		var http = require('http');
		http.get('http://50.116.22.241:8844', function(r) {
			console.log(r.toString());
		});
	};
	ss.registerClass(null, 'ServerSlammer.$Program', $ServerSlammer_$Program);
	$ServerSlammer_$Program.$main();
})();

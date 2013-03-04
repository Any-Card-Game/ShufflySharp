require('./mscorlib.js');require('./MongoDBLibrary.js');require('./CommonServerLibraries.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// DebugServer.DebugServer
	var $DebugServer_DebugServer = function() {
		CommonServerLibraries.Logger.start('Debug1');
		var fs = require('fs');
		var queueManager = new CommonShuffleLibrary.QueueManager('Debug1', new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('DebugServer', null)], ['GatewayServer', 'Gateway*']));
		queueManager.addChannel('Area.Debug2.GetGameSource.Request', function(sender, data) {
			var sourceRequest = data;
			fs.readFile('/usr/local/src/new/Games/' + sourceRequest.gameName + '/app.js', 'ascii', function(err, data2) {
				queueManager.sendMessage(sender.gateway, 'Area.Debug.GetGameSource.Response', sender, { content: data2 });
			});
		});
	};
	$DebugServer_DebugServer.main = function() {
		try {
			new $DebugServer_DebugServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			CommonServerLibraries.Logger.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc), 0);
		}
	};
	ss.registerClass(global, 'DebugServer.DebugServer', $DebugServer_DebugServer);
	$DebugServer_DebugServer.main();
})();

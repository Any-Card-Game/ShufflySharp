require('./mscorlib.node.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');
Type.registerNamespace('DebugServer');
////////////////////////////////////////////////////////////////////////////////
// DebugServer.DebugServer
DebugServer.DebugServer = function() {
	var fs = require('fs');
	var queueManager = new CommonShuffleLibraries.QueueManager('Debug1', new CommonShuffleLibraries.QueueManagerOptions([new CommonShuffleLibraries.QueueWatcher('DebugServer', null)], ['GatewayServer', 'Gateway*']));
	queueManager.addChannel('Area.Debug2.GetGameSource.Request', function(sender, d) {
		var data = d;
		var m = function(err, data2) {
			queueManager.sendMessage(sender, sender.gateway, 'Area.Debug.GetGameSource.Response', data2.toString());
		};
		fs.readFile(Type.cast('/usr/local/src/games/' + data.gameName + '/app.js', String), m);
	});
};
DebugServer.DebugServer.registerClass('DebugServer.DebugServer', Object);
new DebugServer.DebugServer();

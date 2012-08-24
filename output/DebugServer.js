require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
Type.registerNamespace('DebugServer');
////////////////////////////////////////////////////////////////////////////////
// DebugServer.DebugServer
DebugServer.DebugServer = function() {
	var fs = require('fs');
	var queueManager = new CommonShuffleLibrary.QueueManager('Debug1', new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('DebugServer', null)], ['GatewayServer', 'Gateway*']));
	queueManager.addChannel('Area.Debug2.GetGameSource.Request', function(sender, data) {
		fs.readFile('/usr/local/src/new/Games/' + data.gameName + '/app.js', 'ascii', function(err, data2) {
			queueManager.sendMessage(Models.GameSourceResponseModel).call(queueManager, sender, sender.gateway, 'Area.Debug.GetGameSource.Response', new Models.GameSourceResponseModel(data2));
		});
	});
};
DebugServer.DebugServer.registerClass('DebugServer.DebugServer', Object);
new DebugServer.DebugServer();

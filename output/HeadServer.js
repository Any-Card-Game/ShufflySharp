require('./mscorlib.js');require('./MongoDBLibrary.js');require('./CommonServerLibraries.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// HeadServer.HeadServer
	var $HeadServer_HeadServer = function() {
		this.$__dirname = CommonLibraries.ExtensionMethods.HARDLOCATION;
		this.$fs = require('fs');
		this.$gateways = [];
		this.$indexForSites = [];
		this.$indexPageData = null;
		this.$oldGateways = [];
		this.$oldIndex = [];
		this.$pubsub = null;
		this.$qManager = null;
		this.$siteIndex = 0;
		var name = 'Head1';
		CommonServerLibraries.Logger.start(name);
		this.$qManager = new CommonShuffleLibrary.QueueManager(name, new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('HeadServer', null), new CommonShuffleLibrary.QueueWatcher(name, null)], ['GatewayServer']));
		this.$fs.readFile(this.$__dirname + '/index.html', 'ascii', ss.mkdel(this, this.ready));
		this.$pubsub = new CommonShuffleLibrary.PubSub(ss.mkdel(this, function() {
			this.$pubsub.subscribe(String).call(this.$pubsub, 'PUBSUB.GatewayServers', ss.mkdel(this, function(message) {
				ss.add(this.$indexForSites, ss.replaceAllString(this.$indexPageData, '{{gateway}}', message));
				ss.add(this.$gateways, message);
			}));
		}));
		require('http').createServer(ss.mkdel(this, this.$handlerWS)).listen(8844);
		setInterval(ss.mkdel(this, this.$pollGateways), 5000);
		this.$pollGateways();
	};
	$HeadServer_HeadServer.prototype = {
		$pollGateways: function() {
			this.$pubsub.publish('PUBSUB.GatewayServers.Ping', '');
			if (this.$indexForSites.length > 0) {
				this.$oldIndex = this.$indexForSites;
			}
			if (this.$gateways.length > 0) {
				this.$oldGateways = this.$gateways;
			}
			this.$indexForSites = [];
			this.$gateways = [];
			this.$siteIndex = 0;
		},
		$handlerWS: function(request, response) {
			if (this.$oldGateways.length > 0) {
				var inj = this.$siteIndex++ % this.$oldIndex.length;
				response.end(this.$oldGateways[inj]);
				return;
			}
			response.end();
		},
		$handler: function(request, response) {
			var dict = {};
			dict['Content-Type'] = 'text/html';
			if (this.$oldIndex.length > 0) {
				response.writeHead(200, dict);
				var inj = this.$siteIndex++ % this.$oldIndex.length;
				response.end(this.$oldIndex[inj]);
			}
			else {
				response.writeHead(200, dict);
				response.end();
			}
		},
		ready: function(error, content) {
			this.$indexPageData = content.toString();
			this.$indexPageData = content.toString();
			require('http').createServer(ss.mkdel(this, this.$handler)).listen(80);
		}
	};
	$HeadServer_HeadServer.main = function() {
		try {
			new $HeadServer_HeadServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			CommonServerLibraries.Logger.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc), 0);
		}
	};
	ss.registerClass(global, 'HeadServer.HeadServer', $HeadServer_HeadServer);
	$HeadServer_HeadServer.main();
})();

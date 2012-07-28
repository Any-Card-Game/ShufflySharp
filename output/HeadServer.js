require('./mscorlib.node.debug.js');require('./CommonShuffleLibrary.js');
Type.registerNamespace('HeadServer');
////////////////////////////////////////////////////////////////////////////////
// HeadServer.HeadServer
HeadServer.HeadServer = function() {
	this.$fs = (require('fs'));
	this.$__dirname = '/usr/local/src/new';
	this.$indexPageData = null;
	this.$qManager = null;
	this.$pubsub = null;
	this.$indexForSites = new Array();
	this.$gateways = new Array();
	this.$oldGateways = new Array();
	this.$oldIndex = new Array();
	this.$siteIndex = 0;
	this.$qManager = new CommonShuffleLibraries.QueueManager('Head1', new CommonShuffleLibraries.QueueManagerOptions([new CommonShuffleLibraries.QueueWatcher('HeadServer', null), new CommonShuffleLibraries.QueueWatcher('Head1', null)], ['GatewayServer']));
	this.$fs.readFile(this.$__dirname + '/index.html', Function.mkdel(this, this.ready));
	this.$pubsub = new CommonShuffleLibraries.PubSub(Function.mkdel(this, function() {
		this.$pubsub.subscribe('PUBSUB.GatewayServers', Function.mkdel(this, function(message) {
			this.$indexForSites.add(this.$indexPageData.replaceAll('{{gateway}}', message.toString()));
			this.$gateways.add(message.toString());
		}));
	}));
	(require('http')).createServer(Function.mkdel(this, this.$handlerWS)).listen(8844);
	this.$qManager.addChannel('Head.GatewayUpdate', Function.mkdel(this, function(user, data) {
		this.$indexForSites.add(this.$indexPageData.replaceAll('{{gateway}}', data.toString()));
		this.$gateways.add(data.toString());
	}));
	setInterval(Function.mkdel(this, this.$pollGateways), 5000);
	this.$pollGateways();
};
HeadServer.HeadServer.prototype = {
	$pollGateways: function() {
		this.$pubsub.publish('PUBSUB.GatewayServers.Ping', '');
		if (this.$indexForSites.length > 0) {
			this.$oldIndex = this.$indexForSites;
		}
		if (this.$gateways.length > 0) {
			this.$oldGateways = this.$gateways;
		}
		this.$indexForSites = new Array();
		this.$gateways = new Array();
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
		(require('http')).createServer(Function.mkdel(this, this.$handler)).listen(80);
	}
};
HeadServer.HeadServer.registerClass('HeadServer.HeadServer', Object);
new HeadServer.HeadServer();

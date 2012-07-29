require('./mscorlib.node.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
Type.registerNamespace('AdminServer');
////////////////////////////////////////////////////////////////////////////////
// AdminServer.AdminServer
AdminServer.AdminServer = function() {
	this.$debug = false;
	this.$sites = null;
	this.$games = null;
	this.$debugs = null;
	this.$gateways = null;
	this.$head = null;
	this.$nodeInspector = null;
	this.$__dirname = null;
	this.$nonDebuggable = null;
	this.$numOfGameServers = 1;
	this.$numOfGateways = 1;
	this.$indexPageData = 0;
	this.$util = null;
	this.$exec = null;
	var fs = require('fs');
	console.log('Shuffly Admin V0.41');
	this.$util = (require('util'));
	this.$exec = (require('child_process')).exec;
	this.$__dirname = '/usr/local/src/new/';
	this.$nonDebuggable = ['node-inspector', 'pkill'];
	this.$debug = false;
	setInterval(function() {
		console.log('keep alive ' + (new Date()).toString().substring(17, 24));
	}, 10000);
	this.$nodeInspector = this.$runProcess('node-inspector', [], 0, null);
	console.log('node-inspector Started');
	(process).on('exit', Function.mkdel(this, function() {
		console.log('Exiting ');
		this.$onAsk('k', false);
		this.$runProcess('pkill', ['node'], 0, null);
	}));
	if (this.$debug) {
		this.$onAsk('d', true);
	}
	this.$onAsk('d', true);
	this.$onAsk('s', false);
};
AdminServer.AdminServer.prototype = {
	$loop: function() {
		this.$ask('?: ', '', Function.mkdel(this, function(a) {
			this.$onAsk(a, false);
		}));
	},
	$onAsk: function(data, ignore) {
		var rest = data.substring(0, 2);
		switch (data.charAt(0)) {
			case 'd': {
				this.$debug = !this.$debug;
				console.log('Debug ' + (this.$debug ? 'Enabled' : 'Disabled'));
				break;
			}
			case 's': {
				this.$sites = new Array();
				this.$games = new Array();
				this.$debugs = new Array();
				this.$gateways = new Array();
				this.$head = this.$runProcess('node', [this.$__dirname + 'HeadServer.js'], 4000, null);
				console.log('Head Server Started');
				console.log(this.$sites.length + ' Site Servers Started');
				for (var j = 0; j < this.$numOfGateways; j++) {
					this.$gateways.add(this.$runProcess('node', [this.$__dirname + 'GatewayServer.js'], 4400 + j, null));
				}
				console.log(this.$gateways.length + ' Gateway Servers Started');
				for (var j1 = 0; j1 < this.$numOfGameServers; j1++) {
					this.$games.add(this.$runProcess('node', [this.$__dirname + 'GameServer.js'], 4200 + j1, null));
				}
				console.log(this.$games.length + ' Game Servers Started');
				this.$debugs.add(this.$runProcess('node', [this.$__dirname + 'DebugServer.js'], 4300, null));
				console.log(this.$debugs.length + ' Debug Servers Started');
				break;
			}
			case 'q': {
				(process).exit();
				break;
			}
		}
		if (!ignore) {
			this.$loop();
		}
	},
	$ask: function(question, format, callback) {
		var stdin = (process).stdin;
		var stdout = (process).stdout;
		stdin.resume();
		stdout.write(question);
		stdin.once('data', function(data) {
			data = data.toString().trim();
			callback(data);
		});
	},
	$runProcess: function(process, args, debugPort, appArgs) {
		var al;
		var name = '';
		if (args.length > 0) {
			name = ((al = (args[0]).split('/'))[al.length - 1]).split('.')[0];
		}
		if (this.$nonDebuggable.indexOf(process) === -1 && this.$debug) {
			var jf = ' --debug=';
			if (name === 'gatewayApp') {
				jf = ' --debug-brk';
			}
			args[0] = jf + debugPort + ' ' + args[0];
		}
		var dummy = this.$exec(process + ' ' + args.join() + ' ' + Object.coalesce(appArgs, ''));
		if (this.$nonDebuggable.indexOf(process) === -1) {
			dummy.stdout.on('data', Function.mkdel(this, function(data) {
				if (data.indexOf('debug: ') === -1) {
					this.$util.print('--' + name + '   ' + (new Date()).toString().substring(17, 24) + '   ' + data);
					this.$util.print('?: ');
				}
			}));
			dummy.stderr.on('data', Function.mkdel(this, function(data1) {
				this.$util.print('--' + name + '   ' + (new Date()).toString().substring(17, 24) + '   ' + data1);
				this.$util.print('?: ');
			}));
		}
		return dummy;
	}
};
AdminServer.AdminServer.registerClass('AdminServer.AdminServer', Object);
new AdminServer.AdminServer();

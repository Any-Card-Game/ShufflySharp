require('./mscorlib.node.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
Type.registerNamespace('AdminServer');
////////////////////////////////////////////////////////////////////////////////
// AdminServer.AdminServer
AdminServer.AdminServer = function() {
	this.$__dirname = null;
	this.$debug = false;
	this.$fs = (require('fs'));
	this.$debugs = null;
	this.$chats = null;
	this.$exec = null;
	this.$games = null;
	this.$sites = null;
	this.$gateways = null;
	this.$head = null;
	this.$indexPageData = 0;
	this.$nodeInspector = null;
	this.$nonDebuggable = null;
	this.$numOfChatServers = 1;
	this.$numOfGameServers = 1;
	this.$numOfSiteServers = 1;
	this.$numOfGateways = 1;
	this.$util = null;
	var fs = require('fs');
	console.log('Shuffly Admin V0.44');
	this.$util = (require('util'));
	this.$exec = (require('child_process')).exec;
	this.$__dirname = '/usr/local/src/new/';
	this.$nonDebuggable = ['node-inspector', 'pkill'];
	(require('http')).createServer(Function.mkdel(this, this.$handler)).listen(8090);
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
	$handler: function(request, response) {
		this.$fs.readFile(this.$__dirname + '/blank.html', 'ascii', Function.mkdel(this, function(err, content) {
			var fieldSets = '';
			fieldSets += String.format('<span>Main Site: {0}</span>', '<a href=\'#' + (parseInt((Math.random() * 20000).toString())) + '\' onclick=\'goHere("http://50.116.22.241","MainSite");\'>Launch</a>');
			fieldSets += this.$buildFieldset(this.$sites, 'Site Servers');
			fieldSets += this.$buildFieldset(this.$gateways, 'Gateway Servers');
			fieldSets += this.$buildFieldset(this.$games, 'Game Servers');
			fieldSets += this.$buildFieldset(this.$debugs, 'Debug Servers');
			fieldSets += this.$buildFieldset(this.$chats, 'Chat Servers');
			var dict = {};
			dict['Content-Type'] = 'text/html';
			response.writeHead(200, dict);
			response.end(content.replaceAll('{0}', fieldSets));
		}));
	},
	$buildFieldset: function(items, name) {
		var str = '<fieldset>';
		str += '<ul style=\'list-style-type:none;\'>';
		str += String.format('<li >{0}</li>', name);
		str += String.format('<li ></li>');
		var $t1 = items.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var process = $t1.get_current();
				str += '<li>';
				str += String.format('<span>{0} ({1}): {2}</span>', process.name, process.index + 1, (this.$debug ? String.format('<a href=\'#' + (parseInt((Math.random() * 20000).toString())) + '\' onclick=\'goHere("http://50.116.22.241:8080/debug?port={0}","' + name + '(' + (process.index + 1) + ')' + '");\'>Debug</a>', process.debugPort + '&foo=' + (parseInt((Math.random() * 5000000).toString()))) : 'Debug'));
				str += '</li>';
				//document.frames["test"].location.reload();
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		str += '</ul>';
		str += '</fieldset>';
		return str;
	},
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
				this.$chats = new Array();
				this.$debugs = new Array();
				this.$gateways = new Array();
				this.$head = new AdminServer.ProcessInformation(this.$runProcess('node', [this.$__dirname + 'HeadServer.js'], 4000, null), 'Head Server', 0, 4000);
				console.log('Head Server Started');
				for (var j = 0; j < this.$numOfSiteServers; j++) {
					this.$sites.add(new AdminServer.ProcessInformation(this.$runProcess('node', [this.$__dirname + 'SiteServer.js'], 4100 + j, null), 'Site Server', j, 4100 + j));
				}
				console.log(this.$sites.length + ' Site Servers Started');
				for (var j1 = 0; j1 < this.$numOfGateways; j1++) {
					this.$gateways.add(new AdminServer.ProcessInformation(this.$runProcess('node', [this.$__dirname + 'GatewayServer.js'], 4400 + j1, null), 'Gateway Server', j1, 4400 + j1));
				}
				console.log(this.$gateways.length + ' Gateway Servers Started');
				for (var j2 = 0; j2 < this.$numOfGameServers; j2++) {
					this.$games.add(new AdminServer.ProcessInformation(this.$runProcess('node', [this.$__dirname + 'GameServer.js'], 4200 + j2, null), 'Game Server', j2, 4200 + j2));
				}
				console.log(this.$games.length + ' Game Servers Started');
				for (var j3 = 0; j3 < this.$numOfChatServers; j3++) {
					this.$chats.add(new AdminServer.ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ChatServer.js'], 4500 + j3, null), 'Chat Server', j3, 4500 + j3));
				}
				console.log(this.$chats.length + ' Chat Servers Started');
				this.$debugs.add(new AdminServer.ProcessInformation(this.$runProcess('node', [this.$__dirname + 'DebugServer.js'], 4300, null), 'Debug Server', 0, 4300));
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
			if (name.indexOf('Gatewa-') > -1) {
				jf = ' --debug-brk=';
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
////////////////////////////////////////////////////////////////////////////////
// AdminServer.ProcessInformation
AdminServer.ProcessInformation = function(process, name, index, debugPort) {
	this.process = null;
	this.name = null;
	this.index = 0;
	this.debugPort = 0;
	this.process = process;
	this.name = name;
	this.index = index;
	this.debugPort = debugPort;
};
AdminServer.AdminServer.registerClass('AdminServer.AdminServer', Object);
AdminServer.ProcessInformation.registerClass('AdminServer.ProcessInformation', Object);
new AdminServer.AdminServer();

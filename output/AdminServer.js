require('./mscorlib.js');EventEmitter= require('events.js').EventEmitter;require('./NodeLibraries.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// AdminServer.AdminServer
	var $AdminServer_AdminServer = function() {
		this.$__dirname = null;
		this.$chats = null;
		this.$debug = false;
		this.$debugs = null;
		this.$exec = null;
		this.$fs = require('fs');
		this.$games = null;
		this.$gateways = null;
		this.$head = null;
		this.$indexPageData = 0;
		this.$nodeInspector = null;
		this.$nonDebuggable = null;
		this.$numOfChatServers = 1;
		this.$numOfGameServers = 0;
		this.$numOfGateways = 1;
		this.$numOfSiteServers = 1;
		this.$sites = null;
		this.$util = null;
		var fs = require('fs');
		CommonServerLibraries.Logger.start('Admin');
		CommonServerLibraries.Logger.log('Shuffly Admin V0.49', 1);
		CommonServerLibraries.Logger.log('Shuffly Admin V0.49', 2);
		var redis = require('redis');
		var client = redis.createClient(6379, CommonShuffleLibrary.IPs.redisIP);
		// client.On<string,object>("monitor",(time, args) => {
		// Logger.Log("Monitor: "+time+" "+Json.Stringify(args),LogLevel.DebugInformation);
		// });
		this.$util = require('util');
		this.$exec = require('child_process').exec;
		this.$__dirname = CommonLibraries.ExtensionMethods.HARDLOCATION;
		this.$nonDebuggable = ['node-inspector', 'pkill'];
		require('http').createServer(ss.mkdel(this, this.$handler)).listen(8090);
		this.$debug = true;
		setInterval(function() {
			console.log('keep alive ' + (new Date()).toString().substr(17, 24));
		}, 10000);
		process.on('exit', ss.mkdel(this, function() {
			CommonServerLibraries.Logger.log('Exiting ', 1);
			this.$onAsk('k', false);
			this.$runProcess('pkill', ['node'], 0, null);
		}));
		if (this.$debug) {
			this.$onAsk('d', true);
		}
		this.$onAsk('d', true);
		if (this.$debug) {
			this.$nodeInspector = this.$runProcess('node-inspector', [], 0, null);
			CommonServerLibraries.Logger.log('node-inspector Started', 1);
		}
		this.$onAsk('s', false);
	};
	$AdminServer_AdminServer.prototype = {
		$handler: function(request, response) {
			this.$fs.readFile(this.$__dirname + '/blank.html', 'ascii', ss.mkdel(this, function(err, content) {
				var fieldSets = '';
				fieldSets += ss.formatString('<span>Main Site: {0}</span>', '<a href=\'#' + parseInt((Math.random() * 20000).toString()) + '\' onclick=\'goHere("http://198.211.107.101","MainSite");\'>Launch</a>');
				fieldSets += this.$buildFieldset(this.$sites, 'Site Servers');
				fieldSets += this.$buildFieldset(this.$gateways, 'Gateway Servers');
				fieldSets += this.$buildFieldset(this.$games, 'Game Servers');
				fieldSets += this.$buildFieldset(this.$debugs, 'Debug Servers');
				fieldSets += this.$buildFieldset(this.$chats, 'Chat Servers');
				var dict = {};
				dict['Content-Type'] = 'text/html';
				response.writeHead(200, dict);
				response.end(ss.replaceAllString(content, '{0}', fieldSets));
			}));
		},
		$buildFieldset: function(items, name) {
			var str = '<fieldset>';
			str += '<ul style=\'list-style-type:none;\'>';
			str += ss.formatString('<li >{0}</li>', name);
			str += ss.formatString('<li ></li>');
			for (var $t1 = 0; $t1 < items.length; $t1++) {
				var process = items[$t1];
				str += '<li>';
				str += ss.formatString('<span>{0} ({1}): {2}</span>', process.name, process.index + 1, (this.$debug ? ss.formatString('<a href=\'#' + parseInt((Math.random() * 20000).toString()) + '\' onclick=\'goHere("http://198.211.107.101:8080/debug?port={0}","' + name + '(' + (process.index + 1) + ')' + '");\'>Debug</a>', process.debugPort + '&foo=' + parseInt((Math.random() * 5000000).toString())) : 'Debug'));
				str += '</li>';
				//document.frames["test"].location.reload();
			}
			str += '</ul>';
			str += '</fieldset>';
			return str;
		},
		$loop: function() {
			this.$ask('?: ', '', ss.mkdel(this, function(a) {
				this.$onAsk(a, false);
			}));
		},
		$onAsk: function(data, ignore) {
			var rest = data.substr(0, 2);
			switch (data.charAt(0)) {
				case 'd': {
					this.$debug = !this.$debug;
					CommonServerLibraries.Logger.log('Debug ' + (this.$debug ? 'Enabled' : 'Disabled'), 1);
					break;
				}
				case 's': {
					this.$sites = [];
					this.$games = [];
					this.$chats = [];
					this.$debugs = [];
					this.$gateways = [];
					this.$head = new $AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'HeadServer.js'], 4000, null), 'Head Server', 0, 4000);
					CommonServerLibraries.Logger.log('Head Server Started', 1);
					for (var j = 0; j < this.$numOfSiteServers; j++) {
						ss.add(this.$sites, new $AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'SiteServer.js'], 4100 + j, null), 'Site Server', j, 4100 + j));
					}
					CommonServerLibraries.Logger.log(this.$sites.length + ' Site Servers Started', 1);
					for (var j1 = 0; j1 < this.$numOfGateways; j1++) {
						ss.add(this.$gateways, new $AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'GatewayServer.js'], 4400 + j1, null), 'Gateway Server', j1, 4400 + j1));
					}
					CommonServerLibraries.Logger.log(this.$gateways.length + ' Gateway Servers Started', 1);
					for (var j2 = 0; j2 < this.$numOfGameServers; j2++) {
						ss.add(this.$games, new $AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'GameServer.js'], 4200 + j2, null), 'Game Server', j2, 4200 + j2));
					}
					CommonServerLibraries.Logger.log(this.$games.length + ' Game Servers Started', 1);
					for (var j3 = 0; j3 < this.$numOfChatServers; j3++) {
						ss.add(this.$chats, new $AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ChatServer.js'], 4500 + j3, null), 'Chat Server', j3, 4500 + j3));
					}
					CommonServerLibraries.Logger.log(this.$chats.length + ' Chat Servers Started', 1);
					ss.add(this.$debugs, new $AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'DebugServer.js'], 4300, null), 'Debug Server', 0, 4300));
					CommonServerLibraries.Logger.log(this.$debugs.length + ' Debug Servers Started', 1);
					break;
				}
				case 'q': {
					process.exit();
					break;
				}
			}
			if (!ignore) {
				this.$loop();
			}
		},
		$ask: function(question, format, callback) {
			var stdin = process.stdin;
			var stdout = process.stdout;
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
				name = (al = args[0].split('/'))[al.length - 1].split('.')[0];
			}
			if (ss.indexOf(this.$nonDebuggable, process) === -1 && this.$debug) {
				var jf = ' --debug=';
				if (name.indexOf('Gatewa-') > -1) {
					jf = ' --debug-brk=';
				}
				args[0] = jf + debugPort + ' ' + args[0];
			}
			var dummy = this.$exec(process + ' ' + args.join() + ' ' + ss.coalesce(appArgs, ''));
			if (ss.indexOf(this.$nonDebuggable, process) === -1) {
				dummy.stdout.on('data', ss.mkdel(this, function(data) {
					if (data.indexOf('debug: ') === -1) {
						this.$util.print(ss.formatString('--{0}: {1}   {2}   {3}', name, debugPort, (new Date()).toString().substr(17, 24), data));
						this.$util.print('?: ');
					}
				}));
				dummy.stderr.on('data', ss.mkdel(this, function(data1) {
					this.$util.print(ss.formatString('--{0}: {1}   {2}   {3}', name, debugPort, (new Date()).toString().substr(17, 24), data1));
					this.$util.print('?: ');
				}));
			}
			return dummy;
		}
	};
	$AdminServer_AdminServer.main = function() {
		new $AdminServer_AdminServer();
	};
	////////////////////////////////////////////////////////////////////////////////
	// AdminServer.ProcessInformation
	var $AdminServer_ProcessInformation = function(process, name, index, debugPort) {
		this.process = null;
		this.name = null;
		this.index = 0;
		this.debugPort = 0;
		this.process = process;
		this.name = name;
		this.index = index;
		this.debugPort = debugPort;
	};
	ss.registerClass(global, 'AdminServer.AdminServer', $AdminServer_AdminServer);
	ss.registerClass(global, 'AdminServer.ProcessInformation', $AdminServer_ProcessInformation);
	$AdminServer_AdminServer.main();
})();

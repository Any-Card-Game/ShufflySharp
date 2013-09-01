require('./mscorlib.js');EventEmitter= require('events').EventEmitter;require('./NodeLibraries.js');require('./Models.js');require('./ClientLibs.js');
(function() {
	'use strict';
	global.ServerSlammer = global.ServerSlammer || {};
	////////////////////////////////////////////////////////////////////////////////
	// ServerSlammer.Program
	var $ServerSlammer_$Program = function() {
		this.$count = 0;
		this.$myHttp = null;
		this.$userName = null;
		setInterval(function() {
			//                Console.Log("timer " + Common.CurrentDate());
		}, 2000);
		this.$myHttp = require('http');
		this.$runGame();
	};
	$ServerSlammer_$Program.__typeName = 'ServerSlammer.$Program';
	$ServerSlammer_$Program.$main = function() {
		new $ServerSlammer_$Program();
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerSlammer.Program2
	var $ServerSlammer_Program2 = function() {
		this.$exec = null;
		this.$util = null;
		this.$fs = null;
		this.$ind = 0;
		this.$fs = require('fs');
		this.$util = require('util');
		this.$exec = require('child_process').exec;
		for (var i = 0; i < 100; i++) {
			setTimeout(ss.mkdel(this, function() {
				this.$runProcess('node ServerSlammer.js');
			}), i * 1000);
		}
	};
	$ServerSlammer_Program2.__typeName = 'ServerSlammer.Program2';
	global.ServerSlammer.Program2 = $ServerSlammer_Program2;
	ss.initClass($ServerSlammer_$Program, {
		$runGame: function() {
			var gameName = this.$randomString(20);
			this.$grabIP(ss.mkdel(this, function(data) {
				this.$start(data, gameName, true);
			}));
			for (var i = 0; i < 5; i++) {
				this.$grabIP(ss.mkdel(this, function(data1) {
					this.$start(data1, gameName, false);
				}));
			}
		},
		$grabIP: function(ip) {
			this.$myHttp.get('http://198.211.107.235:8844', function(r) {
				r.setEncoding('utf8');
				r.on('data', ip);
			});
		},
		$start: function(gatewayAddress, gameName, create) {
			var myCount = this.$count++;
			var gateway = new ClientLibs.Gateway(gatewayAddress, true);
			var clientManager = new ClientLibs.Managers.ClientSiteManager(gateway);
			var gameManager = new ClientLibs.Managers.ClientGameManager(gateway);
			var chatManager = new ClientLibs.Managers.ClientChatManager(gateway);
			var debugManager = new ClientLibs.Managers.ClientDebugManager(gateway);
			clientManager.login(this.$userName = this.$randomString(10), '');
			clientManager.add_onLogin(function(user, response) {
				console.log('Success: ' + response.successful + '    ' + user.userName + myCount);
				if (create) {
					clientManager.createRoom({ gameType: 'Sevens', roomName: gameName });
				}
				else {
					setTimeout(function() {
						clientManager.joinRoom({ gameType: 'Sevens', roomName: gameName });
					}, 3000);
				}
			});
			clientManager.add_onGetRoomsReceived(function(user1, response1) {
				//     foreach (var room in response.Rooms) {
				//     if (room.Players.Count < 6) {
				//     clientManager.JoinRoom(new RoomJoinRequest("Sevens", room.RoomName));
				//     return;
				//     }
				//     }
			});
			clientManager.add_onRoomJoined(function(user2, response2) {
				console.log('joined ' + response2.room.players.length + ' Players');
				if (response2.room.players.length === 6) {
					clientManager.startGame({});
				}
			});
			clientManager.add_onGetRoomInfoReceived(function(user3, response3) {
			});
			gameManager.add_onGameStarted(ss.mkdel(this, function(user4, model) {
				console.log('Game Started: ' + model.roomID + '  ' + this.$userName);
			}));
			gameManager.add_onGameOver(ss.mkdel(this, function(user5, model1) {
				gateway.close();
				if (create) {
					this.$runGame();
				}
			}));
			gameManager.add_onAskQuestion(function(user6, model2) {
				console.log('Question Asked: ' + user6.userName + '   Num Of Answers: ' + model2.answers.length);
				gameManager.answerQuestion({ answer: 1 });
			});
			gameManager.add_onUpdateState(function(user7, s) {
				//Console.Log("state updated ");
			});
		},
		$randomString: function(i) {
			var sb = '';
			for (var j = 0; j < i; j++) {
				sb += String.fromCharCode(ss.Int32.trunc(Math.random() * 26 + 65));
			}
			return sb;
		}
	});
	ss.initClass($ServerSlammer_Program2, {
		$runProcess: function(process) {
			var al;
			var name = '';
			var dummy = this.$exec(process);
			var file = 'abcdefg' + this.$ind++;
			var pollGateways = ss.mkdel(this, function() {
				this.$fs.appendFile('C:\\bbbbbb' + file + '.txt', 'BAD BAD BAD BAD BAD BAD BAD', null, null);
				process.exit();
			});
			var cl = setTimeout(pollGateways, 10000);
			dummy.stdout.on('data', ss.mkdel(this, function(data) {
				this.$fs.appendFile('C:\\bbbbbb' + file + '.txt', data + '\n', null, null);
				clearTimeout(cl);
				cl = setTimeout(pollGateways, 10000);
				if (data.indexOf('debug: ') === -1) {
					this.$util.print(ss.formatString('--{0}: {1}   {2}', name, NodeLibraries.Common.Logging.Common.shortDate(), data));
					this.$util.print('?: ');
				}
			}));
			dummy.stderr.on('data', ss.mkdel(this, function(data1) {
				this.$fs.appendFile('C:\\bbbbbb' + file + '.txt', data1 + '\n', null, null);
				this.$util.print(ss.formatString('--{0}: {1}   {2}', name, NodeLibraries.Common.Logging.Common.shortDate(), data1));
				this.$util.print('?: ');
			}));
			return dummy;
		}
	});
	$ServerSlammer_$Program.$main();
})();

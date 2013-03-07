require('./mscorlib.js');require('./MongoDBLibrary.js');require('./Models.js');require('./ClientLibs.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// ServerSlammer.Program
	var $ServerSlammer_$Program = function() {
		this.$userName = null;
		setInterval(function() {
			//Console.Log("timer " + DateTime.Now);
		}, 2000);
		var http = require('http');
		http.get('http://198.211.107.101:8844', ss.mkdel(this, function(r) {
			r.setEncoding('utf8');
			r.on('data', ss.mkdel(this, function(data) {
				var gameName = this.$randomString(20);
				this.$start(data, gameName, true);
				this.$start(data, gameName, false);
				this.$start(data, gameName, false);
				this.$start(data, gameName, false);
				this.$start(data, gameName, false);
				this.$start(data, gameName, false);
			}));
		}));
	};
	$ServerSlammer_$Program.prototype = {
		$start: function(gatewayAddress, gameName, create) {
			var gateway = new ClientLibs.Gateway(gatewayAddress, true);
			var clientManager = new ClientLibs.Managers.ClientSiteManager(gateway);
			var gameManager = new ClientLibs.Managers.ClientGameManager(gateway);
			var chatManager = new ClientLibs.Managers.ClientChatManager(gateway);
			var debugManager = new ClientLibs.Managers.ClientDebugManager(gateway);
			clientManager.login(this.$userName = this.$randomString(10), '');
			clientManager.add_onLogin(function(user, response) {
				console.log('Success: ' + response.successful + '    ' + user.userName);
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
			var created = false;
			var joined = false;
			clientManager.add_onRoomJoined(function(user2, response2) {
				console.log('jj ' + response2.room.players.length);
				if (!joined) {
					console.log('joined ' + response2.room.players.length);
					joined = true;
					if (response2.room.players.length === 6) {
						clientManager.startGame({});
					}
				}
			});
			clientManager.add_onGetRoomInfoReceived(function(user3, response3) {
				console.log('cc ' + response3.room.players.length);
				if (!created) {
					console.log('ccccc ' + response3.room.players.length);
					clientManager.joinRoom({ gameType: 'Sevens', roomName: response3.room.roomName });
					created = true;
				}
			});
			gameManager.add_onGameStarted(ss.mkdel(this, function(user4, model) {
				console.log('Game Started: ' + model.roomID + '  ' + this.$userName);
			}));
			gameManager.add_onGameOver(ss.mkdel(this, function(user5, model1) {
				created = false;
				joined = false;
				clientManager.createRoom({ gameType: 'Sevens', roomName: this.$randomString(10) });
			}));
			gameManager.add_onAskQuestion(function(user6, model2) {
				console.log(model2.answers.join(', '));
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
	};
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
	$ServerSlammer_Program2.prototype = {
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
					this.$util.print(ss.formatString('--{0}: {1}   {2}', name, (new Date()).toString().substr(17, 24), data));
					this.$util.print('?: ');
				}
			}));
			dummy.stderr.on('data', ss.mkdel(this, function(data1) {
				this.$fs.appendFile('C:\\bbbbbb' + file + '.txt', data1 + '\n', null, null);
				this.$util.print(ss.formatString('--{0}: {1}   {2}', name, (new Date()).toString().substr(17, 24), data1));
				this.$util.print('?: ');
			}));
			return dummy;
		}
	};
	ss.registerClass(null, 'ServerSlammer.$Program', $ServerSlammer_$Program);
	ss.registerClass(global, 'ServerSlammer.Program2', $ServerSlammer_Program2);
	$ServerSlammer_$Program.$main();
})();

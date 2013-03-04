require('./mscorlib.js');require('./MongoDBLibrary.js');require('./Models.js');require('./ClientLibs.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// ServerSlammer.Program
	var $ServerSlammer_$Program = function() {
		setInterval(function() {
			console.log('timer ' + new Date());
		}, 2000);
		var http = require('http');
		http.get('http://50.116.22.241:8844', ss.mkdel(this, function(r) {
			r.setEncoding('utf8');
			r.on('data', ss.mkdel(this, function(data) {
				this.$start(data);
			}));
		}));
	};
	$ServerSlammer_$Program.prototype = {
		$start: function(gatewayAddress) {
			var gateway = new ClientLibs.Gateway(gatewayAddress, true);
			var clientManager = new ClientLibs.Managers.ClientSiteManager(gateway);
			var gameManager = new ClientLibs.Managers.ClientGameManager(gateway);
			var chatManager = new ClientLibs.Managers.ClientChatManager(gateway);
			var debugManager = new ClientLibs.Managers.ClientDebugManager(gateway);
			clientManager.login(this.$randomString(10), '');
			clientManager.add_onLogin(function(user, response) {
				console.log('Success: ' + response.successful);
				clientManager.getRooms({ gameType: 'Sevens' });
			});
			clientManager.add_onGetRoomsReceived(function(user1, response1) {
				//     foreach (var room in response.Rooms) {
				//     if (room.Players.Count < 6) {
				//     clientManager.JoinRoom(new RoomJoinRequest("Sevens", room.RoomName));
				//     return;
				//     }
				//     }
			});
			clientManager.createRoom({ gameType: 'Sevens', roomName: this.$randomString(10) });
			var created = false;
			var joined = false;
			clientManager.add_onRoomJoined(function(user2, response2) {
				if (!joined) {
					joined = true;
					clientManager.startGame({});
				}
			});
			clientManager.add_onGetRoomInfoReceived(function(user3, response3) {
				if (!created) {
					clientManager.joinRoom({ gameType: 'Sevens', roomName: response3.room.roomName });
					created = true;
				}
			});
			gameManager.add_onGameStarted(function(user4, model) {
				console.log('Game Started: ' + model.roomID);
			});
			gameManager.add_onGameOver(ss.mkdel(this, function(user5, model1) {
				setTimeout(ss.mkdel(this, function() {
					created = false;
					joined = false;
					clientManager.createRoom({ gameType: 'Sevens', roomName: this.$randomString(10) });
				}), 2000);
			}));
			gameManager.add_onAskQuestion(function(user6, model2) {
				console.log(model2.question);
				console.log(model2.answers.join(','));
				gameManager.answerQuestion({ answer: 1 });
			});
			gameManager.add_onUpdateState(function(user7, s) {
				// Console.Log("state updated "+s);
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
	ss.registerClass(null, 'ServerSlammer.$Program', $ServerSlammer_$Program);
	$ServerSlammer_$Program.$main();
})();

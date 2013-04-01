require('./mscorlib.js');EventEmitter= require('events.js').EventEmitter;require('./NodeLibraries.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./RawDeflate.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.GameClientManager
	var $GameServer_GameClientManager = function(gameServerIndex) {
		this.$qManager = null;
		this.$1$GameServerIndexField = null;
		this.$1$OnGameCreateField = null;
		this.$1$OnUserAnswerQuestionField = null;
		this.$1$OnUserDisconnectField = null;
		this.$1$OnUserLeaveField = null;
		this.set_gameServerIndex(gameServerIndex);
		this.$setup();
	};
	$GameServer_GameClientManager.prototype = {
		get_gameServerIndex: function() {
			return this.$1$GameServerIndexField;
		},
		set_gameServerIndex: function(value) {
			this.$1$GameServerIndexField = value;
		},
		add_onGameCreate: function(value) {
			this.$1$OnGameCreateField = ss.delegateCombine(this.$1$OnGameCreateField, value);
		},
		remove_onGameCreate: function(value) {
			this.$1$OnGameCreateField = ss.delegateRemove(this.$1$OnGameCreateField, value);
		},
		add_onUserAnswerQuestion: function(value) {
			this.$1$OnUserAnswerQuestionField = ss.delegateCombine(this.$1$OnUserAnswerQuestionField, value);
		},
		remove_onUserAnswerQuestion: function(value) {
			this.$1$OnUserAnswerQuestionField = ss.delegateRemove(this.$1$OnUserAnswerQuestionField, value);
		},
		add_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateCombine(this.$1$OnUserDisconnectField, value);
		},
		remove_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateRemove(this.$1$OnUserDisconnectField, value);
		},
		add_onUserLeave: function(value) {
			this.$1$OnUserLeaveField = ss.delegateCombine(this.$1$OnUserLeaveField, value);
		},
		remove_onUserLeave: function(value) {
			this.$1$OnUserLeaveField = ss.delegateRemove(this.$1$OnUserLeaveField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_gameServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('GameServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_gameServerIndex(), null)], ['GameServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Game.Create', ss.mkdel(this, function(user, data) {
				this.$1$OnGameCreateField(data);
			}));
			this.$qManager.addChannel('Area.Game.AnswerQuestion', ss.mkdel(this, function(user1, data1) {
				this.$1$OnUserAnswerQuestionField(user1, data1);
			}));
			this.$qManager.addChannel('Area.Game.UserDisconnect', ss.mkdel(this, function(user2, data2) {
				this.$1$OnUserDisconnectField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Game.LeaveGameRoom', ss.mkdel(this, function(user3, data3) {
				this.$1$OnUserLeaveField(user3, data3);
			}));
		},
		$sendMessageToAll: function(room, message, val) {
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var player = room.players[$t1];
				this.$qManager.sendMessage(player.gateway, message, player, val);
			}
		},
		sendGameStarted: function(room) {
			var $t1 = Models.GameManagerModels.GameRoomModel.$ctor();
			$t1.roomID = room.roomID;
			this.$sendMessageToAll(room, 'Area.Game.Started', $t1);
		},
		sendGameOver: function(room) {
			this.$sendMessageToAll(room, 'Area.Game.GameOver', 'a');
			if (ss.isValue(room.debuggingSender)) {
				this.$qManager.sendMessage(room.debuggingSender.gateway, 'Area.Debug.GameOver', room.debuggingSender, new Object());
			}
		},
		sendUpdateState: function(room) {
			this.$sendMessageToAll(room, 'Area.Game.UpdateState', (new Compressor()).CompressText(JSON.stringify(CommonLibraries.Help.cleanUp(global.CardGame).call(null, room.game.cardGame))));
		},
		sendDebugLog: function(room, ganswer) {
			this.$qManager.sendMessage(room.debuggingSender.gateway, 'Area.Debug.Log', room.debuggingSender, ganswer);
		},
		sendDebugBreak: function(room, ganswer) {
			this.$qManager.sendMessage(room.debuggingSender.gateway, 'Area.Debug.Break', room.debuggingSender, ganswer);
		},
		sendAskQuestion: function(user, gameAnswer) {
			this.$qManager.sendMessage(user.gateway, 'Area.Game.AskQuestion', user, CommonLibraries.Help.cleanUp(Models.GameManagerModels.GameSendAnswerModel).call(null, gameAnswer));
		},
		registerGameServer: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Game.RegisterServer', user, { server: this.get_gameServerIndex() });
		},
		unregisterGameServer: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Game.UnregisterServer', user, { server: this.get_gameServerIndex() });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.GameData
	var $GameServer_GameData = function() {
		this.finishedGames = 0;
		this.totalGames = 0;
		this.totalPlayers = 0;
		this.totalQuestionsAnswered = 0;
	};
	$GameServer_GameData.prototype = {
		toString: function() {
			return 'Total: ' + this.totalGames + '\n Running: ' + this.$runningGames() + '\n Total Players: ' + this.totalPlayers + '\n Answered: ' + this.totalQuestionsAnswered;
		},
		$runningGames: function() {
			return this.totalGames - this.finishedGames;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.GameManager
	var $GameServer_GameManager = function(gameServerIndex) {
		this.$QUEUEPERTICK = 1;
		this.$answerQueue = [];
		this.$cachedGames = null;
		this.$dataManager = null;
		this.$gameData = null;
		this.$myServerManager = null;
		this.$rooms = null;
		this.$skipped__ = 0;
		this.$startTime = new Date();
		this.$total__ = 0;
		this.$verbose = false;
		this.$myServerManager = new $GameServer_GameClientManager(gameServerIndex);
		this.$myServerManager.add_onGameCreate(ss.mkdel(this, this.createGame));
		this.$myServerManager.add_onUserAnswerQuestion(ss.mkdel(this, this.userAnswerQuestion));
		this.$myServerManager.add_onUserDisconnect(ss.mkdel(this, this.$userDisconnect));
		this.$myServerManager.add_onUserLeave(ss.mkdel(this, this.$userLeave));
		this.$rooms = [];
		this.$cachedGames = {};
		this.$gameData = new $GameServer_GameData();
		this.$dataManager = new CommonShuffleLibrary.DataManager();
		setInterval(ss.mkdel(this, this.$flushQueue), 50);
	};
	$GameServer_GameManager.prototype = {
		$userDisconnect: function(user, data) {
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				for (var $t2 = 0; $t2 < gameRoom.players.length; $t2++) {
					var player = gameRoom.players[$t2];
					if (ss.referenceEquals(player.userName, user.userName)) {
						console.log('22User Left: ' + player.userName);
						gameRoom.playerLeave(player);
						break;
					}
				}
			}
		},
		$userLeave: function(user, data) {
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				for (var $t2 = 0; $t2 < gameRoom.players.length; $t2++) {
					var player = gameRoom.players[$t2];
					if (ss.referenceEquals(player.userName, user.userName)) {
						console.log('11User Left: ' + player.userName);
						gameRoom.playerLeave(player);
						break;
					}
				}
			}
		},
		createGame: function(data) {
			CommonServerLibraries.Logger.log('--game created ', 1);
			var room;
			ss.add(this.$rooms, room = $GameServer_Models_GameRoom.$ctor());
			room.maxUsers = data.players.length;
			//todo idk
			room.gameType = data.gameType;
			room.started = false;
			ss.arrayAddRange(room.players, data.players);
			var gameObject;
			if (ss.keyExists(this.$cachedGames, room.gameType)) {
				gameObject = this.$cachedGames[room.gameType];
			}
			else {
				gameObject = this.$cachedGames[room.gameType] = require(ss.formatString('./Games/{0}/app.js', room.gameType));
			}
			room.fiber = this.$createFiber(room, gameObject, true);
			room.unwind = ss.mkdel(this, function(players) {
				this.$gameData.finishedGames++;
				CommonServerLibraries.Logger.log('--game closed', 1);
			});
			room.playerLeave = ss.delegateCombine(room.playerLeave, function(player) {
				//todo laeve player api in the game
				ss.remove(room.players, player);
				ss.add(room.playersLeft, player);
			});
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var userLogicModel = room.players[$t1];
				this.$myServerManager.registerGameServer(userLogicModel);
			}
			this.$startGame(room);
		},
		$startGame: function(room) {
			this.$myServerManager.sendGameStarted(room);
			room.started = true;
			var answer = room.fiber.run(room.players);
			this.$processGameResponse(room, answer);
		},
		userAnswerQuestion: function(user, data) {
			ss.add(this.$answerQueue, { item1: user, item2: data });
		},
		$flushQueue: function() {
			var ind = 0;
			for (ind = 0; this.$answerQueue.length > 0 && ind < this.$QUEUEPERTICK; ind++) {
				CommonServerLibraries.Logger.log('-- w pop', 2);
				var arg2 = this.$answerQueue[0];
				ss.removeAt(this.$answerQueue, 0);
				var data = arg2;
				var room = this.$getRoomByPlayer(arg2.item1.userName);
				if (ss.isNullOrUndefined(room)) {
					CommonServerLibraries.Logger.log('Room not found for user: ' + arg2.item1.userName, 0);
					continue;
					throw new ss.Exception('idk');
				}
				var dict = global.CardGameAnswer.$ctor();
				dict.value = data.item2.answer;
				ss.add(room.answers, dict);
				var answ = room.fiber.run(dict);
				//dataManager.GameData.Insert(new GameInfoModel() {GameName = room.Name, AnswerIndex = answ.Contents});
				this.$processGameResponse(room, answ);
			}
			if (ind === 0) {
				this.$skipped__++;
			}
			else {
				this.$total__ += ind;
				if ((this.$total__ + this.$skipped__) % 20 === 0) {
					var dt = new Date();
					CommonServerLibraries.Logger.log(ss.formatString('{0} =  tot: __{1}__ + shift: {2} + T: {3} + QSize: {4} + T Rooms: {5} + Per SecondL {6}', this.$myServerManager.get_gameServerIndex().substr(0, 19), this.$total__ + this.$skipped__, ind, this.$total__, this.$answerQueue.length, this.$rooms.length, this.$gameData.totalQuestionsAnswered / ((dt.getTime() - this.$startTime.getTime()) / 1000)), 1);
				}
			}
		},
		$createFiber: function(room, gameObject, emulating) {
			return new Fiber(ss.mkdel(this, function(players) {
				if (ss.isNullOrUndefined(players) || players.length === 0) {
					return true;
				}
				room.players = players;
				CommonServerLibraries.Logger.log('game started', 2);
				var sev = null;
				eval('sev = new gameObject();');
				room.playersLeft = [];
				sev.cardGame.emulating = emulating;
				room.game = sev;
				sev.cardGame.setAnswers(room.answers);
				sev.cardGame.setPlayers(players);
				this.$gameData.totalGames++;
				this.$gameData.totalPlayers += players.length;
				sev.cardGame.answerIndex = 0;
				sev.constructor();
				sev.runGame();
				CommonServerLibraries.Logger.log('Doneski', 1);
				room.unwind(players);
				return true;
			}));
		},
		$processGameResponse: function(room, response) {
			if (ss.isNullOrUndefined(response)) {
				CommonServerLibraries.Logger.log('game request over', 1);
				this.$myServerManager.sendGameOver(room);
				room.fiber.run();
				ss.remove(this.$rooms, room);
				room.unwind(room.players);
				return;
			}
			switch (response.type) {
				case 0: {
					this.$askPlayerQuestion(room, response);
					break;
				}
				case 5: {
					this.$didPlayersLeave(room, response);
					break;
				}
				case 2: {
					this.$gameOver(room);
					break;
				}
				case 1: {
					this.$logGameConsoleLine(room, response);
					break;
				}
				case 3: {
					this.$breakGameExecution(room, response);
					break;
				}
			}
		},
		$didPlayersLeave: function(room, response) {
			room.fiber.run(room.playersLeft);
			ss.clear(room.playersLeft);
		},
		$breakGameExecution: function(room, response) {
			if (!room.debuggable) {
				var answ3 = room.fiber.run();
				this.$processGameResponse(room, answ3);
				return;
			}
			if (!room.game.cardGame.emulating) {
				var ganswer = { lineNumber: response.lineNumber + 2, value: 0 };
				this.$myServerManager.sendDebugBreak(room, ganswer);
			}
		},
		$logGameConsoleLine: function(room, answer) {
			var answ2 = room.fiber.run();
			this.$processGameResponse(room, answ2);
			if (!room.game.cardGame.emulating && room.debuggable) {
				//Logger.Log(gameData.toString());
				var ganswer = { lineNumber: 0, value: answer.contents };
				this.$myServerManager.sendDebugLog(room, ganswer);
			}
		},
		$gameOver: function(room) {
			CommonServerLibraries.Logger.log('game real over', 1);
			this.$myServerManager.sendUpdateState(room);
			this.$myServerManager.sendGameOver(room);
			room.fiber.reset();
			ss.remove(this.$rooms, room);
		},
		$askPlayerQuestion: function(room, answer) {
			this.$gameData.totalQuestionsAnswered++;
			var answ = answer.question;
			if (ss.isNullOrUndefined(answ)) {
				CommonServerLibraries.Logger.log('game question over', 1);
				this.$myServerManager.sendGameOver(room);
				room.fiber.run();
				//     profiler.takeSnapshot('game over ' + room.roomID);
				return;
			}
			this.$askQuestion(answ, room);
			//Logger.Log(gameData.toString());
			var dt = new Date();
			var then = dt.getMilliseconds();
			//Logger.Log(then - now + " Milliseconds");
			//  Logger.Log(gameData.TotalQuestionsAnswered / ((dt.GetTime() - startTime.GetTime()) / 1000d) + " Answers per seconds", LogLevel.DebugInformation);
		},
		$askQuestion: function(answ, room) {
			var user = this.$getPlayerByUsername(room, answ.user.userName);
			this.$myServerManager.sendAskQuestion(user, { question: answ.question, answers: answ.answers });
			this.$myServerManager.sendUpdateState(room);
			if (this.$verbose) {
				CommonServerLibraries.Logger.log(answ.user.userName + ': ' + answ.question + '   ', 2);
				var ind = 0;
				for (var $t1 = 0; $t1 < answ.answers.length; $t1++) {
					var answer = answ.answers[$t1];
					CommonServerLibraries.Logger.log('     ' + ind++ + ': ' + answer, 2);
				}
			}
		},
		$getPlayerByUsername: function(room, userName) {
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var player = room.players[$t1];
				if (ss.referenceEquals(player.userName, userName)) {
					return player;
				}
			}
			return null;
		},
		$getRoomByPlayer: function(userName) {
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				for (var $t2 = 0; $t2 < gameRoom.players.length; $t2++) {
					var userLogicModel = gameRoom.players[$t2];
					if (ss.referenceEquals(userLogicModel.userName, userName)) {
						return gameRoom;
					}
				}
			}
			return null;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.GameServer
	var $GameServer_GameServer = function() {
		this.$childProcess = null;
		this.$gameServerIndex = null;
		this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
		CommonServerLibraries.Logger.start(this.$gameServerIndex);
		new global.ArrayUtils();
		this.$childProcess = require('child_process');
		global.Fiber = require('fibers');
		process.on('exit', function() {
			CommonServerLibraries.Logger.log('exi', 2);
		});
		var gameManager = new $GameServer_GameManager(this.$gameServerIndex);
	};
	$GameServer_GameServer.main = function() {
		try {
			new $GameServer_GameServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			CommonServerLibraries.Logger.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc), 0);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.Models.FiberYieldResponse
	var $GameServer_Models_FiberYieldResponse = function() {
	};
	$GameServer_Models_FiberYieldResponse.createInstance = function() {
		return $GameServer_Models_FiberYieldResponse.$ctor();
	};
	$GameServer_Models_FiberYieldResponse.$ctor = function() {
		var $this = {};
		$this.contents = 0;
		$this.lineNumber = 0;
		$this.type = 0;
		$this.question = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.Models.GameQuestionAnswerModel
	var $GameServer_Models_GameQuestionAnswerModel = function() {
	};
	$GameServer_Models_GameQuestionAnswerModel.createInstance = function() {
		return $GameServer_Models_GameQuestionAnswerModel.$ctor();
	};
	$GameServer_Models_GameQuestionAnswerModel.$ctor = function() {
		var $this = {};
		$this.answers = null;
		$this.cardGame = null;
		$this.question = null;
		$this.user = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.Models.GameRoom
	var $GameServer_Models_GameRoom = function() {
	};
	$GameServer_Models_GameRoom.createInstance = function() {
		return $GameServer_Models_GameRoom.$ctor();
	};
	$GameServer_Models_GameRoom.$ctor = function() {
		var $this = {};
		$this.answers = null;
		$this.debuggable = false;
		$this.debuggingSender = null;
		$this.fiber = null;
		$this.game = null;
		$this.gameType = null;
		$this.maxUsers = 0;
		$this.players = null;
		$this.roomID = null;
		$this.started = false;
		$this.unwind = null;
		$this.playerLeave = null;
		$this.playersLeft = null;
		$this.players = [];
		$this.roomID = CommonLibraries.Guid.newGuid();
		$this.answers = [];
		return $this;
	};
	ss.registerClass(global, 'GameServer.GameClientManager', $GameServer_GameClientManager);
	ss.registerClass(global, 'GameServer.GameData', $GameServer_GameData);
	ss.registerClass(global, 'GameServer.GameManager', $GameServer_GameManager);
	ss.registerClass(global, 'GameServer.GameServer', $GameServer_GameServer);
	ss.registerClass(global, 'GameServer.Models.FiberYieldResponse', $GameServer_Models_FiberYieldResponse);
	ss.registerClass(global, 'GameServer.Models.GameQuestionAnswerModel', $GameServer_Models_GameQuestionAnswerModel);
	ss.registerClass(global, 'GameServer.Models.GameRoom', $GameServer_Models_GameRoom);
	$GameServer_GameServer.main();
})();

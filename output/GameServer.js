require('./mscorlib.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./RawDeflate.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.GameClientManager
	var $GameServer_GameClientManager = function(gameServerIndex) {
		this.$qManager = null;
		this.$1$GameServerIndexField = null;
		this.$1$OnUserJoinGameField = null;
		this.$1$OnDebuggerJoinGameField = null;
		this.$1$OnGameCreateField = null;
		this.$1$OnDebugGameCreateField = null;
		this.$1$OnStartGameField = null;
		this.$1$OnUserAnswerQuestionField = null;
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
		add_onUserJoinGame: function(value) {
			this.$1$OnUserJoinGameField = Function.combine(this.$1$OnUserJoinGameField, value);
		},
		remove_onUserJoinGame: function(value) {
			this.$1$OnUserJoinGameField = Function.remove(this.$1$OnUserJoinGameField, value);
		},
		add_onDebuggerJoinGame: function(value) {
			this.$1$OnDebuggerJoinGameField = Function.combine(this.$1$OnDebuggerJoinGameField, value);
		},
		remove_onDebuggerJoinGame: function(value) {
			this.$1$OnDebuggerJoinGameField = Function.remove(this.$1$OnDebuggerJoinGameField, value);
		},
		add_onGameCreate: function(value) {
			this.$1$OnGameCreateField = Function.combine(this.$1$OnGameCreateField, value);
		},
		remove_onGameCreate: function(value) {
			this.$1$OnGameCreateField = Function.remove(this.$1$OnGameCreateField, value);
		},
		add_onDebugGameCreate: function(value) {
			this.$1$OnDebugGameCreateField = Function.combine(this.$1$OnDebugGameCreateField, value);
		},
		remove_onDebugGameCreate: function(value) {
			this.$1$OnDebugGameCreateField = Function.remove(this.$1$OnDebugGameCreateField, value);
		},
		add_onStartGame: function(value) {
			this.$1$OnStartGameField = Function.combine(this.$1$OnStartGameField, value);
		},
		remove_onStartGame: function(value) {
			this.$1$OnStartGameField = Function.remove(this.$1$OnStartGameField, value);
		},
		add_onUserAnswerQuestion: function(value) {
			this.$1$OnUserAnswerQuestionField = Function.combine(this.$1$OnUserAnswerQuestionField, value);
		},
		remove_onUserAnswerQuestion: function(value) {
			this.$1$OnUserAnswerQuestionField = Function.remove(this.$1$OnUserAnswerQuestionField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_gameServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('GameServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_gameServerIndex(), null)], ['GameServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Debug.Create', Function.mkdel(this, function(user, data) {
				this.$1$OnDebugGameCreateField(user, data);
			}));
			this.$qManager.addChannel('Area.Game.Create', Function.mkdel(this, function(user1, data1) {
				this.$1$OnGameCreateField(user1, data1);
			}));
			this.$qManager.addChannel('Area.Game.Join', Function.mkdel(this, function(user2, data2) {
				this.$1$OnUserJoinGameField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Game.DebuggerJoin', Function.mkdel(this, function(user3, data3) {
				this.$1$OnDebuggerJoinGameField(user3, data3);
			}));
			this.$qManager.addChannel('Area.Game.Start', Function.mkdel(this, function(user4, data4) {
				this.$1$OnStartGameField(data4);
			}));
			this.$qManager.addChannel('Area.Game.AnswerQuestion', Function.mkdel(this, function(user5, data5) {
				this.$1$OnUserAnswerQuestionField(user5, data5);
			}));
		},
		$sendMessageToAll: function(room, message, val) {
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var player = room.players[$t1];
				this.$qManager.sendMessage(player, player.gateway, message, val);
			}
		},
		sendRoomInfo: function(room) {
			var $t1 = Models.GameManagerModels.GameRoomModel.$ctor();
			$t1.gameServer = room.gameServer;
			$t1.roomID = room.roomID;
			this.$sendMessageToAll(room, 'Area.Game.RoomInfo', $t1);
		},
		sendGameStarted: function(room) {
			var $t1 = Models.GameManagerModels.GameRoomModel.$ctor();
			$t1.gameServer = room.gameServer;
			$t1.roomID = room.roomID;
			this.$sendMessageToAll(room, 'Area.Game.Started', $t1);
		},
		sendGameOver: function(room) {
			this.$sendMessageToAll(room, 'Area.Game.GameOver', 'a');
			if (ss.isValue(room.debuggingSender)) {
				this.$qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.GameOver', new Object());
			}
		},
		sendUpdateState: function(room) {
			this.$sendMessageToAll(room, 'Area.Game.UpdateState', (new Compressor()).CompressText(JSON.stringify(CommonLibraries.Help.cleanUp(global.CardGame).call(null, room.game.cardGame))));
		},
		sendDebugLog: function(room, ganswer) {
			this.$qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Log', ganswer);
		},
		sendDebugBreak: function(room, ganswer) {
			this.$qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Break', ganswer);
		},
		sendAskQuestion: function(user, gameAnswer) {
			this.$qManager.sendMessage(user, user.gateway, 'Area.Game.AskQuestion', CommonLibraries.Help.cleanUp(Models.GameManagerModels.GameSendAnswerModel).call(null, gameAnswer));
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
		this.$myServerManager.add_onUserJoinGame(Function.mkdel(this, this.userJoinGame));
		this.$myServerManager.add_onDebuggerJoinGame(Function.mkdel(this, this.debuggerJoinGame));
		this.$myServerManager.add_onGameCreate(Function.mkdel(this, this.gameCreate));
		this.$myServerManager.add_onDebugGameCreate(Function.mkdel(this, this.debugGameCreate));
		this.$myServerManager.add_onStartGame(Function.mkdel(this, this.startGame));
		this.$myServerManager.add_onUserAnswerQuestion(Function.mkdel(this, this.userAnswerQuestion));
		this.$rooms = [];
		this.$cachedGames = {};
		this.$gameData = new $GameServer_GameData();
		this.$dataManager = new CommonShuffleLibrary.DataManager();
		setInterval(Function.mkdel(this, this.$flushQueue), 50);
	};
	$GameServer_GameManager.prototype = {
		userJoinGame: function(user, data) {
			var room = null;
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				if (ss.referenceEquals(gameRoom.roomID, data.roomID)) {
					room = gameRoom;
					break;
				}
			}
			if (ss.isNullOrUndefined(room)) {
				return;
			}
			room.players.add(user);
			this.$myServerManager.sendRoomInfo(room);
		},
		debugGameCreate: function(user, data) {
			this.gameCreate(user, { name: data.name, gameName: data.gameName });
		},
		gameCreate: function(user, data) {
			var room;
			this.$rooms.add(room = $GameServer_Models_GameRoom.$ctor());
			room.name = data.name;
			room.maxUsers = 6;
			room.debuggable = true;
			room.gameName = data.gameName;
			room.started = false;
			room.gameServer = this.$myServerManager.get_gameServerIndex();
			room.players.add(user);
			var gameObject;
			if (Object.keyExists(this.$cachedGames, data.gameName)) {
				gameObject = this.$cachedGames[data.gameName];
			}
			else {
				gameObject = this.$cachedGames[data.gameName] = require('./Games/' + data.gameName + '/app.js');
			}
			room.fiber = this.$createFiber(room, gameObject, true);
			room.unwind = Function.mkdel(this, function(players) {
				this.$gameData.finishedGames++;
				console.log('--game closed');
			});
			this.$myServerManager.sendRoomInfo(room);
		},
		startGame: function(data) {
			var room = null;
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				if (ss.referenceEquals(gameRoom.roomID, data.roomID)) {
					room = gameRoom;
					break;
				}
			}
			if (ss.isNullOrUndefined(room)) {
				return;
			}
			this.$myServerManager.sendGameStarted(room);
			room.started = true;
			console.log('started');
			var answer = room.fiber.run(room.players);
			console.log('doign');
			this.$handleYield(room, answer);
			console.log('doign2');
		},
		userAnswerQuestion: function(user, data) {
			this.$answerQueue.add(data);
		},
		debuggerJoinGame: function(user, data) {
			var room = null;
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				if (ss.referenceEquals(gameRoom.roomID, data.roomID)) {
					room = gameRoom;
					break;
				}
			}
			if (ss.isNullOrUndefined(room)) {
				return;
			}
			room.debuggingSender = user;
			console.log('debuggable');
		},
		$flushQueue: function() {
			var ind = 0;
			for (ind = 0; ind < this.$QUEUEPERTICK; ind++) {
				if (this.$answerQueue.length === 0) {
					break;
				}
				var arg2 = this.$answerQueue[0];
				this.$answerQueue.removeAt(0);
				var data = arg2;
				var room = null;
				for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
					var gameRoom = this.$rooms[$t1];
					if (ss.referenceEquals(gameRoom.roomID, data.roomID)) {
						room = gameRoom;
						break;
					}
				}
				if (ss.isNullOrUndefined(room)) {
					return;
				}
				var dict = global.CardGameAnswer.$ctor();
				dict.value = data.answer;
				room.answers.add(dict);
				var answ = room.fiber.run(dict);
				if (ss.isNullOrUndefined(answ)) {
					this.$myServerManager.sendGameOver(room);
					room.fiber.run();
					this.$rooms.remove(room);
					room.unwind(room.players);
					continue;
				}
				this.$gameData.totalQuestionsAnswered++;
				var $t3 = this.$dataManager.gameData;
				var $t2 = CommonShuffleLibrary.Data.GameInfoModel.$ctor();
				$t2.gameName = room.name;
				$t2.answerIndex = answ.contents;
				$t3.insert($t2);
				this.$handleYield(room, answ);
			}
			if (ind === 0) {
				this.$skipped__++;
			}
			else {
				this.$total__ += ind;
				if ((this.$total__ + this.$skipped__) % 20 === 0) {
					console.log(String.format('{0} =  tot: __{1}__ + shift: {2} + T: {3} + skip: {4} + QSize: {5} + T Rooms: {6}', this.$myServerManager.get_gameServerIndex().substring(0, 19), this.$total__ + this.$skipped__, ind, this.$total__, this.$skipped__, this.$answerQueue.length, this.$rooms.length));
				}
			}
		},
		$handleYield: function(room, answer) {
			switch (answer.type) {
				case 0: {
					var answ = answer.question;
					if (ss.isNullOrUndefined(answ)) {
						this.$myServerManager.sendGameOver(room);
						room.fiber.run();
						//     profiler.takeSnapshot('game over ' + room.roomID);
						return;
					}
					this.$askQuestion(answ, room);
					var dt = new Date();
					var then = dt.getMilliseconds();
					console.log(ss.Int32.div(this.$gameData.totalQuestionsAnswered, ss.Int32.div(dt.getTime() - this.$startTime.getTime(), 1000)) + ' Answers per seconds');
					break;
				}
				case 2: {
					this.$myServerManager.sendUpdateState(room);
					this.$myServerManager.sendGameOver(room);
					break;
				}
				case 1: {
					var answ2 = room.fiber.run();
					this.$handleYield(room, answ2);
					if (!room.game.cardGame.emulating && room.debuggable) {
						//console.log(gameData.toString());
						var ganswer = { lineNumber: 0, value: answer.contents };
						this.$myServerManager.sendDebugLog(room, ganswer);
					}
					break;
				}
				case 3: {
					if (!room.debuggable) {
						var answ3 = room.fiber.run();
						this.$handleYield(room, answ3);
						return;
					}
					if (!room.game.cardGame.emulating) {
						var ganswer1 = { lineNumber: answer.lineNumber + 2, value: 0 };
						this.$myServerManager.sendDebugBreak(room, ganswer1);
					}
					break;
				}
			}
		},
		$askQuestion: function(answ, room) {
			var user = this.$getPlayerByUsername(room, answ.user.userName);
			this.$myServerManager.sendAskQuestion(user, { question: answ.question, answers: answ.answers });
			//Console.Log(Json.Stringify(mjf).Length); 
			this.$myServerManager.sendUpdateState(room);
			if (this.$verbose) {
				console.log(answ.user.userName + ': ' + answ.question + '   ');
				var ind = 0;
				for (var $t1 = 0; $t1 < answ.answers.length; $t1++) {
					var answer = answ.answers[$t1];
					console.log('     ' + ind++ + ': ' + answer);
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
		$createFiber: function(room, gameObject, emulating) {
			return new Fiber(Function.mkdel(this, function(players) {
				if (ss.isNullOrUndefined(players) || players.length === 0) {
					return true;
				}
				room.players = players;
				console.log('game started');
				var sev = null;
				eval('sev= new gameObject();');
				sev.cardGame.emulating = emulating;
				room.game = sev;
				sev.cardGame.setAnswers(room.answers);
				sev.cardGame.setPlayers(players);
				this.$gameData.totalGames++;
				this.$gameData.totalPlayers += players.length;
				sev.cardGame.answerIndex = 0;
				sev.constructor();
				sev.runGame();
				room.unwind(players);
				return true;
			}));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameServer.GameServer
	var $GameServer_GameServer = function() {
		this.$childProcess = null;
		this.$gameServerIndex = null;
		new global.ArrayUtils();
		this.$childProcess = require('child_process');
		this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
		require('fibers');
		process.on('exit', function() {
			console.log('exi');
		});
		var gameManager = new $GameServer_GameManager(this.$gameServerIndex);
	};
	$GameServer_GameServer.main = function() {
		try {
			new $GameServer_GameServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			console.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc));
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
		$this.gameName = null;
		$this.gameServer = null;
		$this.maxUsers = 0;
		$this.name = null;
		$this.players = null;
		$this.roomID = null;
		$this.started = false;
		$this.unwind = null;
		$this.players = [];
		$this.roomID = CommonLibraries.Guid.newGuid();
		$this.answers = [];
		return $this;
	};
	Type.registerClass(global, 'GameServer.GameClientManager', $GameServer_GameClientManager, Object);
	Type.registerClass(global, 'GameServer.GameData', $GameServer_GameData, Object);
	Type.registerClass(global, 'GameServer.GameManager', $GameServer_GameManager, Object);
	Type.registerClass(global, 'GameServer.GameServer', $GameServer_GameServer, Object);
	Type.registerClass(global, 'GameServer.Models.FiberYieldResponse', $GameServer_Models_FiberYieldResponse, Object);
	Type.registerClass(global, 'GameServer.Models.GameQuestionAnswerModel', $GameServer_Models_GameQuestionAnswerModel, Object);
	Type.registerClass(global, 'GameServer.Models.GameRoom', $GameServer_Models_GameRoom, Object);
	$GameServer_GameServer.main();
})();

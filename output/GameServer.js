require('./mscorlib.node.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');
Type.registerNamespace('GameServer');
////////////////////////////////////////////////////////////////////////////////
// GameServer.CreateGameRequest
GameServer.CreateGameRequest = function() {
	this.name = null;
	this.gameName = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.DataManager
GameServer.DataManager = function() {
	this.gameData = null;
	this.client = null;
	this.$server = null;
	this.$connection = null;
	this.gameData = new GameServer.DataManagerGameData(this);
	var mongo = require('mongodb');
	var Db = mongo.Db;
	this.$connection = mongo.Connection;
	var server = this.$server = mongo.Server;
	this.client = (new Db('test', new server('50.116.28.16', 27017, {})));
	this.client.open(function(arg1, arg2) {
		//client.Collection("test_insert", "test");
	});
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.DataManagerGameData
GameServer.DataManagerGameData = function(manager) {
	this.$manager = null;
	this.$manager = manager;
};
GameServer.DataManagerGameData.prototype = {
	insert: function(gameName, answerIndex) {
		this.$manager.client.collection('gameInfo', function(err, collection) {
			var gmo = new GameServer.GameInfoObject();
			gmo.gameName = gameName;
			gmo.answer = answerIndex;
			collection.insert(gmo);
		});
	}
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.FiberYieldResponse
GameServer.FiberYieldResponse = function() {
	this.type = null;
	this.question = null;
	this.contents = 0;
	this.lineNumber = 0;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameAnswerRequest
GameServer.GameAnswerRequest = function() {
	this.answer = 0;
	this.roomID = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameData
GameServer.GameData = function() {
	this.totalGames = 0;
	this.totalQuestionsAnswered = 0;
	this.totalPlayers = 0;
	this.finishedGames = 0;
};
GameServer.GameData.prototype = {
	toString: function() {
		return 'Total: ' + this.totalGames + '\n Running: ' + this.$runningGames() + '\n Total Players: ' + this.totalPlayers + '\n Answered: ' + this.totalQuestionsAnswered;
	},
	$runningGames: function() {
		return this.totalGames - this.finishedGames;
	}
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameInfoObject
GameServer.GameInfoObject = function() {
	this.gameName = null;
	this.answer = 0;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameQuestionAnswer
GameServer.GameQuestionAnswer = function() {
	this.user = null;
	this.question = null;
	this.answers = null;
	this.cardGame = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameRoom
GameServer.GameRoom = function() {
	this.name = null;
	this.gameName = null;
	this.debuggable = false;
	this.maxUsers = 0;
	this.players = null;
	this.answers = null;
	this.roomID = null;
	this.gameServer = null;
	this.started = false;
	this.fiber = null;
	this.unwind = null;
	this.game = null;
	this.debuggingSender = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameSendAnswer
GameServer.GameSendAnswer = function() {
	this.question = null;
	this.answers = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameServer
GameServer.GameServer = function() {
	this.$qManager = null;
	this.$verbose = false;
	this.$gameData = null;
	this.$rooms = null;
	this.$startTime = new Date();
	this.$cachedGames = null;
	this.$QUEUEPERTICK = 1;
	this.$total__ = 0;
	this.$skipped__ = 0;
	this.$dataManager = null;
	this.$fs = null;
	this.$childProcess = null;
	this.$queueue = new Array();
	this.$gameServerIndex = null;
	new global.ArrayUtils();
	this.$fs = (require('fs'));
	this.$childProcess = (require('child_process'));
	this.$dataManager = new GameServer.DataManager();
	this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
	this.$cachedGames = ({});
	//Global.Require("./gameFramework/GameAPI.js");
	this.$qManager = new CommonShuffleLibraries.QueueManager(this.$gameServerIndex, new CommonShuffleLibraries.QueueManagerOptions([new CommonShuffleLibraries.QueueWatcher('GameServer', null), new CommonShuffleLibraries.QueueWatcher(this.$gameServerIndex, null)], ['GameServer', 'GatewayServer', 'Gateway*']));
	require('fibers');
	this.$rooms = new Array();
	this.$gameData = new GameServer.GameData();
	//Global.Process.On("exit", delegate { Console.Log("exi"); });
	this.$qManager.addChannel('Area.Game.Create', Function.mkdel(this, function() {
		var room;
		this.$rooms.add(room = new GameServer.GameRoom());
	}));
	this.$qManager.addChannel('Area.Debug.Create', Function.mkdel(this, function(user, arg2) {
		var data = arg2;
		data.gameName = 'Sevens';
		var room1;
		this.$rooms.add(room1 = new GameServer.GameRoom());
		room1.name = data.name;
		room1.maxUsers = 6;
		room1.debuggable = true;
		room1.gameName = data.gameName;
		room1.roomID = CommonLibraries.Guid.newGuid();
		room1.answers = new Array();
		room1.players = new Array();
		room1.started = false;
		room1.gameServer = this.$gameServerIndex;
		room1.players.add(user);
		var gameObject;
		if (Object.keyExists(this.$cachedGames, data.gameName)) {
			gameObject = this.$cachedGames[data.gameName];
		}
		else {
			gameObject = this.$cachedGames[data.gameName] = (require('./games/' + data.gameName + '/app.js'));
		}
		room1.fiber = this.$createFiber(room1, gameObject, true);
		room1.unwind = Function.mkdel(this, function(players) {
			this.$gameData.finishedGames++;
			console.log('--game closed');
		});
		this.$emitAll(room1, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room1, CommonShuffleLibraries.Help.sanitize)));
	}));
	this.$qManager.addChannel('Area.Game.Join', Function.mkdel(this, function(user1, arg21) {
		var data1 = arg21;
		var room2 = null;
		var $t1 = this.$rooms.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var gameRoom = $t1.get_current();
				if (ss.referenceEquals(gameRoom.roomID, data1.roomID)) {
					room2 = gameRoom;
					break;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		if (ss.isNullOrUndefined(room2)) {
			return;
		}
		room2.players.add(user1);
		room2.players.add(user1);
		this.$emitAll(room2, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room2, CommonShuffleLibraries.Help.sanitize)));
	}));
	this.$qManager.addChannel('Area.Game.GetGames', Function.mkdel(this, function(sender, data2) {
		this.$qManager.sendMessage(sender, sender.gateway, 'Area.Game.RoomInfos', JSON.parse(JSON.stringify(this.$rooms, CommonShuffleLibraries.Help.sanitize)));
	}));
	this.$qManager.addChannel('Area.Game.DebuggerJoin', Function.mkdel(this, function(sender1, arg22) {
		var data3 = arg22;
		var room3 = null;
		var $t2 = this.$rooms.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var gameRoom1 = $t2.get_current();
				if (ss.referenceEquals(gameRoom1.roomID, data3.roomID)) {
					room3 = gameRoom1;
					break;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t2, ss.IDisposable)) {
				Type.cast($t2, ss.IDisposable).dispose();
			}
		}
		if (ss.isNullOrUndefined(room3)) {
			return;
		}
		room3.debuggingSender = sender1;
		console.log('debuggable');
	}));
	this.$qManager.addChannel('Area.Game.Start', Function.mkdel(this, function(sender2, arg23) {
		var data4 = arg23;
		var room4 = null;
		var $t3 = this.$rooms.getEnumerator();
		try {
			while ($t3.moveNext()) {
				var gameRoom2 = $t3.get_current();
				if (ss.referenceEquals(gameRoom2.roomID, data4.roomID)) {
					room4 = gameRoom2;
					break;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t3, ss.IDisposable)) {
				Type.cast($t3, ss.IDisposable).dispose();
			}
		}
		if (ss.isNullOrUndefined(room4)) {
			return;
		}
		this.$emitAll(room4, 'Area.Game.Started', JSON.parse(JSON.stringify(room4, CommonShuffleLibraries.Help.sanitize)));
		room4.started = true;
		console.log('started');
		var answer = room4.fiber.run(room4.players);
		console.log('doign');
		this.$handleYield(room4, answer);
		console.log('doign2');
	}));
	this.$qManager.addChannel('Area.Game.AnswerQuestion', Function.mkdel(this, function(sender3, data5) {
		this.$queueue.add(data5);
	}));
	setInterval(Function.mkdel(this, this.$flushQueue), 50);
};
GameServer.GameServer.prototype = {
	$flushQueue: function() {
		var ind = 0;
		for (ind = 0; ind < this.$QUEUEPERTICK; ind++) {
			if (this.$queueue.length === 0) {
				break;
			}
			var arg2 = this.$queueue[0];
			this.$queueue.removeAt(0);
			var data = arg2;
			var room = null;
			var $t1 = this.$rooms.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var gameRoom = $t1.get_current();
					if (ss.referenceEquals(gameRoom.roomID, data.roomID)) {
						room = gameRoom;
						break;
					}
				}
			}
			finally {
				if (Type.isInstanceOfType($t1, ss.IDisposable)) {
					Type.cast($t1, ss.IDisposable).dispose();
				}
			}
			if (ss.isNullOrUndefined(room)) {
				return;
			}
			var dict = new global.CardGameAnswer();
			dict.value = data.answer;
			room.answers.add(dict);
			var answ = room.fiber.run(dict);
			if (ss.isNullOrUndefined(answ)) {
				this.$emitAll(room, 'Area.Game.GameOver', 'a');
				room.fiber.run();
				this.$rooms.remove(room);
				room.unwind(room.players);
				continue;
			}
			this.$gameData.totalQuestionsAnswered++;
			this.$dataManager.gameData.insert(room.name, answ.contents);
			this.$handleYield(room, answ);
		}
		if (ind === 0) {
			this.$skipped__++;
		}
		else {
			this.$total__ += ind;
			if ((this.$total__ + this.$skipped__) % 20 === 0) {
				console.log(this.$gameServerIndex.substring(0, 19) + '=  tot: __' + (this.$total__ + this.$skipped__) + '__ + shift: ' + ind + ' + T: ' + this.$total__ + ' + skip: ' + this.$skipped__ + ' + QSize: ' + this.$queueue.length + ' + T Rooms: ' + this.$rooms.length);
			}
		}
	},
	$handleYield: function(room, answer) {
		switch (answer.type) {
			case 'askQuestion': {
				var answ = answer.question;
				if (ss.isNullOrUndefined(answ)) {
					this.$emitAll(room, 'Area.Game.GameOver', '');
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
			case 'gameOver': {
				this.$emitAll(room, 'Area.Game.GameOver', '');
				if (ss.isValue(room.debuggingSender)) {
					this.$qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.GameOver', new Object());
				}
				break;
			}
			case 'log': {
				var answ2 = room.fiber.run();
				this.$handleYield(room, answ2);
				if (!room.game.cardGame.emulating && room.debuggable) {
					//console.log(gameData.toString());
					var ganswer = new CommonLibraries.GameAnswer();
					ganswer.value = answer.contents;
					this.$qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Log', ganswer);
				}
				break;
			}
			case 'break': {
				if (!room.debuggable) {
					var answ3 = room.fiber.run();
					this.$handleYield(room, answ3);
					return;
				}
				if (!room.game.cardGame.emulating) {
					var ganswer1 = new CommonLibraries.GameAnswer();
					ganswer1.lineNumber = answer.lineNumber + 2;
					this.$qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Break', ganswer1);
				}
				break;
			}
		}
	},
	$askQuestion: function(answ, room) {
		var user = this.$getPlayerByUsername(room, answ.user.userName);
		var gameAnswer = new GameServer.GameSendAnswer();
		gameAnswer.answers = answ.answers;
		gameAnswer.question = answ.question;
		this.$qManager.sendMessage(user, user.gateway, 'Area.Game.AskQuestion', JSON.parse(JSON.stringify(gameAnswer, CommonShuffleLibraries.Help.sanitize)));
		this.$emitAll(room, 'Area.Game.UpdateState', JSON.parse(JSON.stringify(answ.cardGame, CommonShuffleLibraries.Help.sanitize)));
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
		var $t1 = room.players.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var player = $t1.get_current();
				if (ss.referenceEquals(player.userName, userName)) {
					return player;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		return null;
	},
	$emitAll: function(room, message, val) {
		var $t1 = room.players.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var player = $t1.get_current();
				this.$qManager.sendMessage(player, player.gateway, message, val);
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
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
// GameServer.JoinGameRequest
GameServer.JoinGameRequest = function() {
	this.roomID = null;
};
GameServer.CreateGameRequest.registerClass('GameServer.CreateGameRequest', Object);
GameServer.DataManager.registerClass('GameServer.DataManager', Object);
GameServer.DataManagerGameData.registerClass('GameServer.DataManagerGameData', Object);
GameServer.FiberYieldResponse.registerClass('GameServer.FiberYieldResponse', Object);
GameServer.GameAnswerRequest.registerClass('GameServer.GameAnswerRequest', Object);
GameServer.GameData.registerClass('GameServer.GameData', Object);
GameServer.GameInfoObject.registerClass('GameServer.GameInfoObject', Object);
GameServer.GameQuestionAnswer.registerClass('GameServer.GameQuestionAnswer', Object);
GameServer.GameRoom.registerClass('GameServer.GameRoom', Object);
GameServer.GameSendAnswer.registerClass('GameServer.GameSendAnswer', Object);
GameServer.GameServer.registerClass('GameServer.GameServer', Object);
GameServer.JoinGameRequest.registerClass('GameServer.JoinGameRequest', Object);
new GameServer.GameServer();

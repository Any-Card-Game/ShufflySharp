require('./mscorlib.node.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');
Type.registerNamespace('GameServer');
////////////////////////////////////////////////////////////////////////////////
// GameServer.DataManager
GameServer.DataManager = function() {
	this.$connection = null;
	this.gameData = null;
	this.$server = null;
	this.client = null;
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
	this.contents = 0;
	this.lineNumber = 0;
	this.type = 0;
	this.question = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameData
GameServer.GameData = function() {
	this.finishedGames = 0;
	this.totalGames = 0;
	this.totalPlayers = 0;
	this.totalQuestionsAnswered = 0;
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
	this.answer = 0;
	this.gameName = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameQuestionAnswerModel
GameServer.GameQuestionAnswerModel = function() {
	this.answers = null;
	this.cardGame = null;
	this.question = null;
	this.user = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameRoom
GameServer.GameRoom = function() {
	this.answers = null;
	this.debuggable = false;
	this.debuggingSender = null;
	this.fiber = null;
	this.game = null;
	this.gameName = null;
	this.gameServer = null;
	this.maxUsers = 0;
	this.name = null;
	this.players = null;
	this.roomID = null;
	this.started = false;
	this.unwind = null;
	this.players = new Array();
	this.roomID = CommonLibraries.Guid.newGuid();
	this.answers = new Array();
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameServer
GameServer.GameServer = function() {
	this.$QUEUEPERTICK = 1;
	this.$cachedGames = null;
	this.$childProcess = null;
	this.$dataManager = null;
	this.$fs = null;
	this.$gameData = null;
	this.$gameServerIndex = null;
	this.$qManager = null;
	this.$queueue = new Array();
	this.$rooms = null;
	this.$skipped__ = 0;
	this.$startTime = new Date();
	this.$total__ = 0;
	this.$verbose = false;
	new global.ArrayUtils();
	this.$fs = (require('fs'));
	this.$childProcess = (require('child_process'));
	this.$dataManager = new GameServer.DataManager();
	this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
	this.$cachedGames = ({});
	require('fibers');
	this.$rooms = new Array();
	this.$gameData = new GameServer.GameData();
	(process).on('exit', function() {
		console.log('exi');
	});
	//qManager.AddChannel("Area.Game.Create", (arg1, arg2) =>
	//{
	//GameRoom room;
	//rooms.Add(room = new GameRoom());
	//});
	this.$qManager = new CommonShuffleLibrary.QueueManager(this.$gameServerIndex, new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('GameServer', null), new CommonShuffleLibrary.QueueWatcher(this.$gameServerIndex, null)], ['GameServer', 'GatewayServer', 'Gateway*']));
	this.$qManager.addChannel('Area.Debug.Create', Function.mkdel(this, function(user, data) {
		data.gameName = 'Sevens';
		var room;
		this.$rooms.add(room = new GameServer.GameRoom());
		room.name = data.name;
		room.maxUsers = 6;
		room.debuggable = true;
		room.gameName = data.gameName;
		room.started = false;
		room.gameServer = this.$gameServerIndex;
		room.players.add(user);
		var gameObject;
		if (Object.keyExists(this.$cachedGames, data.gameName)) {
			gameObject = this.$cachedGames[data.gameName];
		}
		else {
			gameObject = this.$cachedGames[data.gameName] = (require('./Games/' + data.gameName + '/app.js'));
		}
		room.fiber = this.$createFiber(room, gameObject, true);
		room.unwind = Function.mkdel(this, function(players) {
			this.$gameData.finishedGames++;
			console.log('--game closed');
		});
		this.$emitAll(room, 'Area.Game.RoomInfo', CommonLibraries.Help.cleanUp(GameServer.GameRoom).call(null, room));
	}));
	this.$qManager.addChannel('Area.Game.Join', Function.mkdel(this, function(user1, data1) {
		var room1 = null;
		var $t1 = this.$rooms.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var gameRoom = $t1.get_current();
				if (ss.referenceEquals(gameRoom.roomID, data1.roomID)) {
					room1 = gameRoom;
					break;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		if (ss.isNullOrUndefined(room1)) {
			return;
		}
		room1.players.add(user1);
		this.$emitAll(room1, 'Area.Game.RoomInfo', CommonLibraries.Help.cleanUp(GameServer.GameRoom).call(null, room1));
	}));
	//qManager.AddChannel ("Area.Game.GetGames", (sender, data) =>
	//{
	//qManager.SendMessage(sender, sender.Gateway, "Area.Game.RoomInfos", Json.Parse(Json.Stringify(rooms, Help.Sanitize)));
	//});
	this.$qManager.addChannel('Area.Game.DebuggerJoin', Function.mkdel(this, function(sender, data2) {
		var room2 = null;
		var $t2 = this.$rooms.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var gameRoom1 = $t2.get_current();
				if (ss.referenceEquals(gameRoom1.roomID, data2.roomID)) {
					room2 = gameRoom1;
					break;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t2, ss.IDisposable)) {
				Type.cast($t2, ss.IDisposable).dispose();
			}
		}
		if (ss.isNullOrUndefined(room2)) {
			return;
		}
		room2.debuggingSender = sender;
		console.log('debuggable');
	}));
	this.$qManager.addChannel('Area.Game.Start', Function.mkdel(this, function(sender1, data3) {
		var room3 = null;
		var $t3 = this.$rooms.getEnumerator();
		try {
			while ($t3.moveNext()) {
				var gameRoom2 = $t3.get_current();
				if (ss.referenceEquals(gameRoom2.roomID, data3.roomID)) {
					room3 = gameRoom2;
					break;
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t3, ss.IDisposable)) {
				Type.cast($t3, ss.IDisposable).dispose();
			}
		}
		if (ss.isNullOrUndefined(room3)) {
			return;
		}
		this.$emitAll(room3, 'Area.Game.Started', JSON.parse(JSON.stringify(room3, CommonLibraries.Help.sanitize)));
		room3.started = true;
		console.log('started');
		var answer = room3.fiber.run(room3.players);
		console.log('doign');
		this.$handleYield(room3, answer);
		console.log('doign2');
	}));
	//
	//             
	//
	//qManager.addChannel('Area.Game.GetRooms', function (sender, data) {
	//
	//             
	//
	//socket.emit('Area.Game.GetRoomsResponse', JSON.parse(JSON.stringify(rooms, sanitize)));
	//
	//             
	//
	//});
	//
	//             
	//
	//
	//
	//             
	//
	//qManager.addChannel('Area.Debug.Continue', function (sender, data) {
	//
	//             
	//
	//var room = socket.room;
	//
	//             
	//
	//var answ = room.fiber.run(null);
	//
	//             
	//
	//handleYield(room, answ);
	//
	//             
	//
	//});
	//
	//             
	//
	//
	//
	//             
	//
	//
	//
	//             
	//
	//qManager.addChannel('Area.Debug.PushNewSource', function (sender, data) {
	//
	//             
	//
	//var room = socket.room;
	//
	//             
	//
	//
	//
	//             
	//
	//var module = {};
	//
	//             
	//
	//eval(applyBreakpoints(data.source, data.breakPoints));
	//
	//             
	//
	//var sevens = module.exports;
	//
	//             
	//
	//
	//
	//             
	//
	//room.fiber = createFiber(room, sevens, true);
	//
	//             
	//
	//var answ = room.fiber.run(room.players);
	//
	//             
	//
	//handleYield(room, answ);
	//
	//             
	//
	//
	//
	//             
	//
	//});
	//
	//             
	//
	//qManager.addChannel('Area.Debug.VariableLookup.Request', function (sender, data) {
	//
	//             
	//
	//var room = socket.room;
	//
	//             
	//
	//var answ = room.fiber.run({ variableLookup: data.variableName });
	//
	//             
	//
	//if (!answ.type == 'variableLookup')
	this.$qManager.addChannel('Area.Game.AnswerQuestion', Function.mkdel(this, function(sender2, data4) {
		this.$queueue.add(data4);
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
			case 0: {
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
			case 2: {
				this.$emitAll(room, 'Area.Game.UpdateState', CommonLibraries.Help.cleanUp(global.CardGame).call(null, room.game.cardGame));
				this.$emitAll(room, 'Area.Game.GameOver', '');
				if (ss.isValue(room.debuggingSender)) {
					this.$qManager.sendMessage(Object).call(this.$qManager, room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.GameOver', new Object());
				}
				break;
			}
			case 1: {
				var answ2 = room.fiber.run();
				this.$handleYield(room, answ2);
				if (!room.game.cardGame.emulating && room.debuggable) {
					//console.log(gameData.toString());
					var ganswer = new CommonLibraries.GameAnswer();
					ganswer.value = answer.contents;
					this.$qManager.sendMessage(CommonLibraries.GameAnswer).call(this.$qManager, room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Log', ganswer);
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
					var ganswer1 = new CommonLibraries.GameAnswer();
					ganswer1.lineNumber = answer.lineNumber + 2;
					this.$qManager.sendMessage(CommonLibraries.GameAnswer).call(this.$qManager, room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Break', ganswer1);
				}
				break;
			}
		}
	},
	$askQuestion: function(answ, room) {
		var user = this.$getPlayerByUsername(room, answ.user.userName);
		var gameAnswer = Models.GameSendAnswerModel.$ctor();
		gameAnswer.answers = answ.answers;
		gameAnswer.question = answ.question;
		this.$qManager.sendMessage(Models.GameSendAnswerModel).call(this.$qManager, user, user.gateway, 'Area.Game.AskQuestion', CommonLibraries.Help.cleanUp(Models.GameSendAnswerModel).call(null, gameAnswer));
		this.$emitAll(room, 'Area.Game.UpdateState', CommonLibraries.Help.cleanUp(global.CardGame).call(null, answ.cardGame));
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
				this.$qManager.sendMessage(Object).call(this.$qManager, player, player.gateway, message, val);
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
GameServer.DataManager.registerClass('GameServer.DataManager', Object);
GameServer.DataManagerGameData.registerClass('GameServer.DataManagerGameData', Object);
GameServer.FiberYieldResponse.registerClass('GameServer.FiberYieldResponse', Object);
GameServer.GameData.registerClass('GameServer.GameData', Object);
GameServer.GameInfoObject.registerClass('GameServer.GameInfoObject', Object);
GameServer.GameQuestionAnswerModel.registerClass('GameServer.GameQuestionAnswerModel', Object);
GameServer.GameRoom.registerClass('GameServer.GameRoom', Object);
GameServer.GameServer.registerClass('GameServer.GameServer', Object);
new GameServer.GameServer();

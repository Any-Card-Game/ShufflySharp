(function() {
 require("./CommonLibraries.debug.js");
 require("./CommonShuffleLibraries.debug.js");


Type.registerNamespace('GameServer');

////////////////////////////////////////////////////////////////////////////////
// GameServer.CreateGameRequest

GameServer.CreateGameRequest = function GameServer_CreateGameRequest() {
    /// <field name="name" type="String">
    /// </field>
    /// <field name="gameName" type="String">
    /// </field>
}
GameServer.CreateGameRequest.prototype = {
    name: null,
    gameName: null
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.DataManager

GameServer.DataManager = function GameServer_DataManager() {
    /// <field name="gameData" type="GameServer.DataManagerGameData">
    /// </field>
    /// <field name="client" type="MongoDB">
    /// </field>
    /// <field name="_server" type="MongoServer">
    /// </field>
    /// <field name="_connection" type="MongoConnection">
    /// </field>
    this.gameData = new GameServer.DataManagerGameData(this);
    var mongo = require('mongodb');
    var Db = mongo.Db;
    this._connection = mongo.Connection;
    var server = this._server = mongo.Server;
    this.client = eval("new Db('test', new server('50.116.28.16', 27017, {}))");
    this.client.open(function() {
    });
}
GameServer.DataManager.prototype = {
    gameData: null,
    client: null,
    _server: null,
    _connection: null
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.DataManagerGameData

GameServer.DataManagerGameData = function GameServer_DataManagerGameData(manager) {
    /// <param name="manager" type="GameServer.DataManager">
    /// </param>
    /// <field name="_manager" type="GameServer.DataManager">
    /// </field>
    this._manager = manager;
}
GameServer.DataManagerGameData.prototype = {
    _manager: null,
    
    insert: function GameServer_DataManagerGameData$insert(gameName, answerIndex) {
        /// <param name="gameName" type="String">
        /// </param>
        /// <param name="answerIndex" type="Number" integer="true">
        /// </param>
        this._manager.client.collection('gameInfo', function(err, collection) {
            var gmo = new GameServer.GameInfoObject();
            gmo.gameName = gameName;
            gmo.answerIndex = answerIndex;
            collection.insert(gmo);
        });
    }
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameInfoObject

GameServer.GameInfoObject = function GameServer_GameInfoObject() {
    /// <field name="gameName" type="String">
    /// </field>
    /// <field name="answerIndex" type="Number" integer="true">
    /// </field>
}
GameServer.GameInfoObject.prototype = {
    gameName: null,
    answerIndex: 0
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.FiberYieldResponse

GameServer.FiberYieldResponse = function GameServer_FiberYieldResponse() {
    /// <field name="type" type="String">
    /// </field>
    /// <field name="question" type="GameServer.GameQuestionAnswer">
    /// </field>
    /// <field name="contents" type="Number" integer="true">
    /// </field>
    /// <field name="lineNumber" type="Number" integer="true">
    /// </field>
}
GameServer.FiberYieldResponse.prototype = {
    type: null,
    question: null,
    contents: 0,
    lineNumber: 0
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameAnswerRequest

GameServer.GameAnswerRequest = function GameServer_GameAnswerRequest() {
    /// <field name="answerIndex" type="Number" integer="true">
    /// </field>
    /// <field name="roomID" type="String">
    /// </field>
}
GameServer.GameAnswerRequest.prototype = {
    answerIndex: 0,
    roomID: null
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameData

GameServer.GameData = function GameServer_GameData() {
    /// <field name="totalGames" type="Number" integer="true">
    /// </field>
    /// <field name="totalQuestionsAnswered" type="Number" integer="true">
    /// </field>
    /// <field name="totalPlayers" type="Number" integer="true">
    /// </field>
    /// <field name="finishedGames" type="Number" integer="true">
    /// </field>
}
GameServer.GameData.prototype = {
    totalGames: 0,
    totalQuestionsAnswered: 0,
    totalPlayers: 0,
    finishedGames: 0,
    
    toString: function GameServer_GameData$toString() {
        /// <returns type="String"></returns>
        return 'Total: ' + this.totalGames + '\n Running: ' + this._runningGames() + '\n Total Players: ' + this.totalPlayers + '\n Answered: ' + this.totalQuestionsAnswered;
    },
    
    _runningGames: function GameServer_GameData$_runningGames() {
        /// <returns type="Number" integer="true"></returns>
        return this.totalGames - this.finishedGames;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameQuestionAnswer

GameServer.GameQuestionAnswer = function GameServer_GameQuestionAnswer() {
    /// <field name="user" type="CommonShuffleLibraries.User">
    /// </field>
    /// <field name="question" type="String">
    /// </field>
    /// <field name="answers" type="Array" elementType="String">
    /// </field>
    /// <field name="cardGame" type="ShufflyGameLibrary.GameCardGame">
    /// </field>
}
GameServer.GameQuestionAnswer.prototype = {
    user: null,
    question: null,
    answers: null,
    cardGame: null
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameRoom

GameServer.GameRoom = function GameServer_GameRoom() {
    /// <field name="name" type="String">
    /// </field>
    /// <field name="gameName" type="String">
    /// </field>
    /// <field name="debuggable" type="Boolean">
    /// </field>
    /// <field name="maxUsers" type="Number" integer="true">
    /// </field>
    /// <field name="players" type="Array">
    /// </field>
    /// <field name="answers" type="Array">
    /// </field>
    /// <field name="roomID" type="String">
    /// </field>
    /// <field name="gameServer" type="String">
    /// </field>
    /// <field name="started" type="Boolean">
    /// </field>
    /// <field name="fiber" type="Fiber">
    /// </field>
    /// <field name="unwind" type="System.Action`1">
    /// </field>
    /// <field name="game" type="ShufflyGameLibrary.GameObject">
    /// </field>
    /// <field name="debuggingSender" type="CommonShuffleLibraries.User">
    /// </field>
}
GameServer.GameRoom.prototype = {
    name: null,
    gameName: null,
    debuggable: false,
    maxUsers: 0,
    players: null,
    answers: null,
    roomID: null,
    gameServer: null,
    started: false,
    fiber: null,
    unwind: null,
    game: null,
    debuggingSender: null
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameSendAnswer

GameServer.GameSendAnswer = function GameServer_GameSendAnswer() {
    /// <field name="question" type="String">
    /// </field>
    /// <field name="answers" type="Array" elementType="String">
    /// </field>
}
GameServer.GameSendAnswer.prototype = {
    question: null,
    answers: null
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.GameServer

GameServer.GameServer = function GameServer_GameServer() {
    /// <field name="_qManager" type="CommonShuffleLibraries.QueueManager">
    /// </field>
    /// <field name="_verbose" type="Boolean">
    /// </field>
    /// <field name="_gameData" type="GameServer.GameData">
    /// </field>
    /// <field name="_rooms" type="Array">
    /// </field>
    /// <field name="_startTime" type="Date">
    /// </field>
    /// <field name="_cachedGames" type="Object">
    /// </field>
    /// <field name="_requiredShuff" type="ShufflyGameLibrary.Shuff">
    /// </field>
    /// <field name="_QUEUEPERTICK" type="Number" integer="true">
    /// </field>
    /// <field name="_total__" type="Number" integer="true">
    /// </field>
    /// <field name="_skipped__" type="Number" integer="true">
    /// </field>
    /// <field name="_dataManager" type="GameServer.DataManager">
    /// </field>
    /// <field name="_fs" type="NodeJSLibrary.FS">
    /// </field>
    /// <field name="_childProcess" type="NodeJSLibrary.ChildProcess">
    /// </field>
    /// <field name="_queueue" type="Array">
    /// </field>
    /// <field name="_gameServerIndex" type="String">
    /// </field>
    this._startTime = new Date();
    this._queueue = [];
    this._fs = require('fs');
    this._childProcess = require('child_process');
    this._dataManager = new GameServer.DataManager();
    this._gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
    this._cachedGames = {};
    this._requiredShuff = require('./gameFramework/shuff.js');
    this._qManager = new CommonShuffleLibraries.QueueManager(this._gameServerIndex, new CommonShuffleLibraries.QueueManagerOptions([ new CommonShuffleLibraries.QueueWatcher('GameServer', null), new CommonShuffleLibraries.QueueWatcher(this._gameServerIndex, null) ], [ 'GameServer', 'GatewayServer', 'Gateway*' ]));
    require('fibers');
    this._rooms = [];
    this._gameData = new GameServer.GameData();
    global.process.on('exit', function() {
        global.console.log('exi');
    });
    this._qManager.addChannel('Area.Game.Create', ss.Delegate.create(this, function() {
        var room;
        this._rooms.add(room = new GameServer.GameRoom());
    }));
    this._qManager.addChannel('Area.Debug.Create', ss.Delegate.create(this, function(user, arg2) {
        var data = arg2;
        data.gameName = 'Sevens';
        var room;
        this._rooms.add(room = new GameServer.GameRoom());
        room.name = data.name;
        room.maxUsers = 6;
        room.debuggable = true;
        room.gameName = data.gameName;
        room.roomID = CommonLibraries.Guid.newGuid();
        room.answers = [];
        room.players = [];
        room.started = false;
        room.gameServer = this._gameServerIndex;
        room.players.add(user);
        var gameObject;
        if (Object.keyExists(this._cachedGames, data.gameName)) {
            gameObject = this._cachedGames[data.gameName];
        }
        else {
            gameObject = this._cachedGames[data.gameName] = require('./games/' + data.gameName + '/app.js');
        }
        room.fiber = this._createFiber(room, gameObject, true);
        room.unwind = ss.Delegate.create(this, function(players) {
            this._gameData.finishedGames++;
            global.console.log('--game closed');
        });
        this._emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, CommonShuffleLibraries.Help.sanitize)));
    }));
    this._qManager.addChannel('Area.Game.Join', ss.Delegate.create(this, function(user, arg2) {
        var data = (arg2);
        var room = null;
        var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
        while ($enum1.moveNext()) {
            var gameRoom = $enum1.current;
            if (gameRoom.roomID === data.roomID) {
                room = gameRoom;
                break;
            }
        }
        if (room == null) {
            return;
        }
        room.players.add(user);
        room.players.add(user);
        this._emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, CommonShuffleLibraries.Help.sanitize)));
    }));
    this._qManager.addChannel('Area.Game.GetGames', ss.Delegate.create(this, function(sender, data) {
        this._qManager.sendMessage(sender, sender.gateway, 'Area.Game.RoomInfos', JSON.parse(JSON.stringify(this._rooms, CommonShuffleLibraries.Help.sanitize)));
    }));
    this._qManager.addChannel('Area.Game.DebuggerJoin', ss.Delegate.create(this, function(sender, arg2) {
        var data = (arg2);
        var room = null;
        var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
        while ($enum1.moveNext()) {
            var gameRoom = $enum1.current;
            if (gameRoom.roomID === data.roomID) {
                room = gameRoom;
                break;
            }
        }
        if (room == null) {
            return;
        }
        room.debuggingSender = sender;
        global.console.log('debuggable');
    }));
    this._qManager.addChannel('Area.Game.Start', ss.Delegate.create(this, function(sender, arg2) {
        var data = (arg2);
        var room = null;
        var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
        while ($enum1.moveNext()) {
            var gameRoom = $enum1.current;
            if (gameRoom.roomID === data.roomID) {
                room = gameRoom;
                break;
            }
        }
        if (room == null) {
            return;
        }
        this._emitAll(room, 'Area.Game.Started', JSON.parse(JSON.stringify(room, CommonShuffleLibraries.Help.sanitize)));
        room.started = true;
        global.console.log('started');
        var answer = room.fiber.run(room.players);
        global.console.log('doign');
        this._handleYield(room, answer);
        global.console.log('doign2');
    }));
    this._qManager.addChannel('Area.Game.AnswerQuestion', ss.Delegate.create(this, function(sender, data) {
        this._queueue.add(data);
    }));
    setInterval(ss.Delegate.create(this, this._flushQueue), 50);
}
GameServer.GameServer.prototype = {
    _qManager: null,
    _verbose: false,
    _gameData: null,
    _rooms: null,
    _cachedGames: null,
    _requiredShuff: null,
    _QUEUEPERTICK: 1,
    _total__: 0,
    _skipped__: 0,
    _dataManager: null,
    _fs: null,
    _childProcess: null,
    _gameServerIndex: null,
    
    _flushQueue: function GameServer_GameServer$_flushQueue() {
        var ind = 0;
        for (ind = 0; ind < this._QUEUEPERTICK; ind++) {
            if (!this._queueue.length) {
                break;
            }
            var arg2 = this._queueue[0];
            this._queueue.removeAt(0);
            var data = (arg2);
            var room = null;
            var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
            while ($enum1.moveNext()) {
                var gameRoom = $enum1.current;
                if (gameRoom.roomID === data.roomID) {
                    room = gameRoom;
                    break;
                }
            }
            if (room == null) {
                return;
            }
            var dict = new CommonLibraries.GameAnswer();
            dict.value = data.answerIndex;
            room.answers.add(dict);
            var answ = room.fiber.run(dict);
            if (answ == null) {
                this._emitAll(room, 'Area.Game.GameOver', 'a');
                room.fiber.run();
                this._rooms.remove(room);
                room.unwind(room.players);
                continue;
            }
            this._gameData.totalQuestionsAnswered++;
            this._dataManager.gameData.insert(room.name, answ.contents);
            this._handleYield(room, answ);
        }
        if (!ind) {
            this._skipped__++;
        }
        else {
            this._total__ += ind;
            if (!((this._total__ + this._skipped__) % 20)) {
                global.console.log(this._gameServerIndex.substring(0, 19) + '=  tot: __' + (this._total__ + this._skipped__) + '__ + shift: ' + ind + ' + T: ' + this._total__ + ' + skip: ' + this._skipped__ + ' + QSize: ' + this._queueue.length + ' + T Rooms: ' + this._rooms.length);
            }
        }
    },
    
    _handleYield: function GameServer_GameServer$_handleYield(room, answer) {
        /// <param name="room" type="GameServer.GameRoom">
        /// </param>
        /// <param name="answer" type="GameServer.FiberYieldResponse">
        /// </param>
        switch (answer.type) {
            case 'askQuestion':
                var answ = answer.question;
                if (answ == null) {
                    this._emitAll(room, 'Area.Game.GameOver', '');
                    room.fiber.run();
                    return;
                }
                this._askQuestion(answ, room);
                var dt = new Date();
                var then = dt.getMilliseconds();
                global.console.log(this._gameData.totalQuestionsAnswered / ((dt.getTime() - this._startTime.getTime()) / 1000) + ' Answers per seconds');
                break;
            case 'gameOver':
                this._emitAll(room, 'Area.Game.GameOver', '');
                if (room.debuggingSender != null) {
                    this._qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.GameOver', {});
                }
                break;
            case 'log':
                var answ2 = room.fiber.run();
                this._handleYield(room, answ2);
                if (!room.game.cardGame.emulating && room.debuggable) {
                    var ganswer = new CommonLibraries.GameAnswer();
                    ganswer.value = answer.contents;
                    this._qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Log', ganswer);
                }
                break;
            case 'break':
                if (!room.debuggable) {
                    var answ3 = room.fiber.run();
                    this._handleYield(room, answ3);
                    return;
                }
                if (!room.game.cardGame.emulating) {
                    var ganswer = new CommonLibraries.GameAnswer();
                    ganswer.lineNumber = answer.lineNumber + 2;
                    this._qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Break', ganswer);
                }
                break;
        }
    },
    
    _askQuestion: function GameServer_GameServer$_askQuestion(answ, room) {
        /// <param name="answ" type="GameServer.GameQuestionAnswer">
        /// </param>
        /// <param name="room" type="GameServer.GameRoom">
        /// </param>
        var user = this._getPlayerByUsername(room, answ.user.userName);
        var gameAnswer = new GameServer.GameSendAnswer();
        gameAnswer.answers = answ.answers;
        gameAnswer.question = answ.question;
        this._qManager.sendMessage(user, user.gateway, 'Area.Game.AskQuestion', JSON.parse(JSON.stringify(gameAnswer, CommonShuffleLibraries.Help.sanitize)));
        this._emitAll(room, 'Area.Game.UpdateState', JSON.parse(JSON.stringify(answ.cardGame, CommonShuffleLibraries.Help.sanitize)));
        if (this._verbose) {
            global.console.log(answ.user.userName + ': ' + answ.question + '   ');
            var ind = 0;
            var $enum1 = ss.IEnumerator.getEnumerator(answ.answers);
            while ($enum1.moveNext()) {
                var answer = $enum1.current;
                global.console.log('     ' + ind++ + ': ' + answer);
            }
        }
    },
    
    _getPlayerByUsername: function GameServer_GameServer$_getPlayerByUsername(room, userName) {
        /// <param name="room" type="GameServer.GameRoom">
        /// </param>
        /// <param name="userName" type="String">
        /// </param>
        /// <returns type="CommonShuffleLibraries.User"></returns>
        var $enum1 = ss.IEnumerator.getEnumerator(room.players);
        while ($enum1.moveNext()) {
            var player = $enum1.current;
            if (player.userName === userName) {
                return player;
            }
        }
        return null;
    },
    
    _emitAll: function GameServer_GameServer$_emitAll(room, message, val) {
        /// <param name="room" type="GameServer.GameRoom">
        /// </param>
        /// <param name="message" type="String">
        /// </param>
        /// <param name="val" type="Object">
        /// </param>
        var $enum1 = ss.IEnumerator.getEnumerator(room.players);
        while ($enum1.moveNext()) {
            var player = $enum1.current;
            this._qManager.sendMessage(player, player.gateway, message, val);
        }
    },
    
    _createFiber: function GameServer_GameServer$_createFiber(room, gameObject, emulating) {
        /// <param name="room" type="GameServer.GameRoom">
        /// </param>
        /// <param name="gameObject" type="ShufflyGameLibrary.GameObject">
        /// </param>
        /// <param name="emulating" type="Boolean">
        /// </param>
        /// <returns type="Fiber"></returns>
        return new Fiber(ss.Delegate.create(this, function(players) {
            if (players == null || !players.length) {
                return true;
            }
            room.players = players;
            global.console.log('game started');
            var sev = null;
            eval('sev= new gameObject();');
            sev.cardGame.emulating = emulating;
            room.game = sev;
            sev.shuff = this._requiredShuff;
            sev.cardGame.setAnswers(room.answers);
            sev.cardGame.setPlayers(players);
            this._gameData.totalGames++;
            this._gameData.totalPlayers += players.length;
            sev.cardGame.answerIndex = 0;
            sev.constructor();
            sev.runGame();
            room.unwind(players);
            return true;
        }));
    }
}


////////////////////////////////////////////////////////////////////////////////
// GameServer.JoinGameRequest

GameServer.JoinGameRequest = function GameServer_JoinGameRequest() {
    /// <field name="roomID" type="String">
    /// </field>
}
GameServer.JoinGameRequest.prototype = {
    roomID: null
}


GameServer.CreateGameRequest.registerClass('GameServer.CreateGameRequest');
GameServer.DataManager.registerClass('GameServer.DataManager');
GameServer.DataManagerGameData.registerClass('GameServer.DataManagerGameData');
GameServer.GameInfoObject.registerClass('GameServer.GameInfoObject');
GameServer.FiberYieldResponse.registerClass('GameServer.FiberYieldResponse');
GameServer.GameAnswerRequest.registerClass('GameServer.GameAnswerRequest');
GameServer.GameData.registerClass('GameServer.GameData');
GameServer.GameQuestionAnswer.registerClass('GameServer.GameQuestionAnswer');
GameServer.GameRoom.registerClass('GameServer.GameRoom');
GameServer.GameSendAnswer.registerClass('GameServer.GameSendAnswer');
GameServer.GameServer.registerClass('GameServer.GameServer');
GameServer.JoinGameRequest.registerClass('GameServer.JoinGameRequest');

new GameServer.GameServer();
})();

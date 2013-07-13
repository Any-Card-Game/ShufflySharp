require('./NodeLibraries.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Consumer
	var $CommonShuffleLibrary_Consumer = function(obj) {
		var tf = this;
		var $t1 = ss.getEnumerator(Object.keys(obj));
		try {
			while ($t1.moveNext()) {
				var v = $t1.current();
				tf[v] = obj[v];
			}
		}
		finally {
			$t1.dispose();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.DataManager
	var $CommonShuffleLibrary_DataManager = function() {
		this.$connection = null;
		this.$server = null;
		this.client = null;
		this.chatData = null;
		this.gameData = null;
		this.siteData = null;
		var mongo = require('mongodb');
		var Db = mongo.Db;
		this.$connection = mongo.Connection;
		var server = this.$server = mongo.Server;
		this.client = new Db('test', new server('198.211.107.101', 27017), { safe: false });
		this.client.open(function(arg1, arg2) {
			//client.Collection("test_insert", "test");
		});
		this.$initData();
	};
	$CommonShuffleLibrary_DataManager.prototype = {
		$initData: function() {
			this.gameData = new $CommonShuffleLibrary_Data_DataManagerGameData(this);
			this.chatData = new $CommonShuffleLibrary_Data_DataManagerChatData(this);
			this.siteData = new $CommonShuffleLibrary_Data_DataManagerSiteData(this);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.PubSub
	var $CommonShuffleLibrary_PubSub = function(ready) {
		this.$pready = false;
		this.$pubClient = null;
		this.$sready = false;
		this.$subClient = null;
		this.$subbed = null;
		this.$subbed = {};
		var redis = require('redis');
		redis.debug_mode = false;
		this.$subClient = redis.createClient(6379, CommonLibraries.Constants.redisIP);
		this.$pubClient = redis.createClient(6379, CommonLibraries.Constants.redisIP);
		this.$subClient.on('subscribe', function(channel, count) {
			NodeLibraries.Common.Logging.Logger.log('subscribed: ' + channel + ' ' + count, 'information');
		});
		this.$subClient.on('unsubscribe', function(channel1, count1) {
			NodeLibraries.Common.Logging.Logger.log('unsubscribed: ' + channel1 + ' ' + count1, 'information');
		});
		this.$subClient.on('message', ss.mkdel(this, function(channel2, message) {
			if (!ss.staticEquals(this.$subbed[channel2], null)) {
				this.$subbed[channel2](message);
			}
		}));
		this.$subClient.on('ready', ss.mkdel(this, function() {
			this.$sready = true;
			if (this.$sready && this.$pready) {
				ready(this);
			}
		}));
		this.$pubClient.on('ready', ss.mkdel(this, function() {
			this.$pready = true;
			if (this.$sready && this.$pready) {
				ready(this);
			}
		}));
	};
	$CommonShuffleLibrary_PubSub.prototype = {
		publish: function(channel, content) {
			this.$pubClient.publish(channel, content);
		},
		subscribe: function(channel, callback) {
			this.$subClient.subscribe(channel);
			this.$subbed[channel] = callback;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueueItem
	var $CommonShuffleLibrary_QueueItem = function() {
		this.channel = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueueItemCollection
	var $CommonShuffleLibrary_QueueItemCollection = function(queueItems) {
		this.$queueItems = null;
		this.$queueItems = queueItems;
	};
	$CommonShuffleLibrary_QueueItemCollection.prototype = {
		getByChannel: function(channel) {
			var $t1 = ss.getEnumerator(this.$queueItems);
			try {
				while ($t1.moveNext()) {
					var queueWatcher = $t1.current();
					if (ss.referenceEquals(queueWatcher.channel, channel) || channel.indexOf(ss.replaceAllString(queueWatcher.channel, '*', '')) === 0) {
						return queueWatcher;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return null;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueueManager
	var $CommonShuffleLibrary_QueueManager = function(name, options) {
		this.name = null;
		this.channels = null;
		this.qp = null;
		this.$qpCollection = null;
		this.qw = null;
		this.$qwCollection = null;
		this.name = name;
		this.channels = new (ss.makeGenericType(ss.Dictionary$2, [String, Function]))();
		this.qw = [];
		this.qp = [];
		for (var $t1 = 0; $t1 < options.watchers.length; $t1++) {
			var queueWatcher = options.watchers[$t1];
			if (ss.staticEquals(queueWatcher.get_callback(), null)) {
				queueWatcher.set_callback(ss.mkdel(this, this.$messageReceived));
			}
			ss.add(this.qw, queueWatcher);
		}
		ss.arrayAddRange(this.qw, options.watchers);
		for (var $t2 = 0; $t2 < options.pushers.length; $t2++) {
			var pusher = options.pushers[$t2];
			ss.add(this.qp, new $CommonShuffleLibrary_QueuePusher(pusher));
		}
		this.$qwCollection = new $CommonShuffleLibrary_QueueItemCollection(this.qw);
		this.$qpCollection = new $CommonShuffleLibrary_QueueItemCollection(this.qp);
	};
	$CommonShuffleLibrary_QueueManager.prototype = {
		addChannel: function(channel, callback) {
			this.channels.set_item(channel, callback);
		},
		$messageReceived: function(name, user, eventChannel, content) {
			//todo?        user.Gateway = name;
			try {
				if (!ss.staticEquals(this.channels.get_item(eventChannel), null)) {
					this.channels.get_item(eventChannel)(user, content);
				}
			}
			catch ($t1) {
				var ex = ss.Exception.wrap($t1);
				console.error(ex);
			}
		},
		sendMessage: function(channel, eventChannel, user, content) {
			if (ss.isNullOrUndefined(this.$qpCollection.getByChannel(channel))) {
				$CommonShuffleLibrary_ServerLogger.logError(ss.formatString('Cannot send message:{0} - {1} No Existy', channel, eventChannel), content);
				return;
			}
			var pusher = ss.cast(this.$qpCollection.getByChannel(channel), $CommonShuffleLibrary_QueuePusher);
			$CommonShuffleLibrary_ServerLogger.logTransport('Channel: ' + eventChannel, content);
			pusher.message(channel, this.name, user, eventChannel, content);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueueManagerOptions
	var $CommonShuffleLibrary_QueueManagerOptions = function(watchers, pushers) {
		this.pushers = null;
		this.watchers = null;
		this.pushers = pushers;
		this.watchers = watchers;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueueMessage
	var $CommonShuffleLibrary_QueueMessage = function(name, user, eventChannel, content) {
		this.content = null;
		this.eventChannel = null;
		this.name = null;
		this.user = null;
		this.name = name;
		this.user = user;
		this.eventChannel = eventChannel;
		this.content = content;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueuePusher
	var $CommonShuffleLibrary_QueuePusher = function(pusher) {
		this.$client1 = null;
		$CommonShuffleLibrary_QueueItem.call(this);
		var redis = require('redis');
		this.channel = pusher;
		this.$client1 = redis.createClient(6379, CommonLibraries.Constants.redisIP);
	};
	$CommonShuffleLibrary_QueuePusher.prototype = {
		message: function(channel, name, user, eventChannel, content) {
			var message = new $CommonShuffleLibrary_QueueMessage(name, user, eventChannel, content);
			var value = JSON.stringify(message, CommonLibraries.Help.sanitize);
			this.$client1.rpush(channel, value);
			//todo:maybe sanitize
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueueWatcher
	var $CommonShuffleLibrary_QueueWatcher = function(queue, callback) {
		this.$client1 = null;
		this.$2$CallbackField = null;
		$CommonShuffleLibrary_QueueItem.call(this);
		this.channel = queue;
		this.set_callback(callback);
		var redis = require('redis');
		this.$client1 = redis.createClient(6379, CommonLibraries.Constants.redisIP);
		this.cycle(queue);
	};
	$CommonShuffleLibrary_QueueWatcher.prototype = {
		get_callback: function() {
			return this.$2$CallbackField;
		},
		set_callback: function(value) {
			this.$2$CallbackField = value;
		},
		cycle: function(channel) {
			this.$client1.blpop([channel, 10], ss.mkdel(this, function(caller, dtj) {
				var data = ss.cast(dtj, Array);
				if (ss.isValue(dtj)) {
					var dt = JSON.parse(data[1]);
					$CommonShuffleLibrary_ServerLogger.logTransport('Channel: ' + dt.eventChannel, dt.content);
					this.get_callback()(dt.name, dt.user, dt.eventChannel, dt.content);
				}
				this.cycle(channel);
			}));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.ServerLogger
	var $CommonShuffleLibrary_ServerLogger = function() {
	};
	$CommonShuffleLibrary_ServerLogger.initLogger = function(serverType, serverName) {
		$CommonShuffleLibrary_ServerLogger.$serverName = serverName;
		$CommonShuffleLibrary_ServerLogger.$serverType = serverType;
		$CommonShuffleLibrary_ServerLogger.$pubsub = new $CommonShuffleLibrary_PubSub(function(ps) {
		});
	};
	$CommonShuffleLibrary_ServerLogger.logInformation = function(item, jsonContent) {
		NodeLibraries.Common.Logging.Logger.log(item, 'information');
		$CommonShuffleLibrary_ServerLogger.$pubsub.publish(ss.formatString('PUBSUB.ServerLogger.{0}', $CommonShuffleLibrary_ServerLogger.$serverType), JSON.stringify({ serverType: $CommonShuffleLibrary_ServerLogger.$serverType, serverName: $CommonShuffleLibrary_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'information' }, CommonLibraries.Help.sanitize));
	};
	$CommonShuffleLibrary_ServerLogger.logDebug = function(item, jsonContent) {
		NodeLibraries.Common.Logging.Logger.log(item, 'debugInformation');
		$CommonShuffleLibrary_ServerLogger.$pubsub.publish(ss.formatString('PUBSUB.ServerLogger.{0}', $CommonShuffleLibrary_ServerLogger.$serverType), JSON.stringify({ serverType: $CommonShuffleLibrary_ServerLogger.$serverType, serverName: $CommonShuffleLibrary_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'debugInformation' }, CommonLibraries.Help.sanitize));
	};
	$CommonShuffleLibrary_ServerLogger.logError = function(item, jsonContent) {
		NodeLibraries.Common.Logging.Logger.log(item, 'error');
		$CommonShuffleLibrary_ServerLogger.$pubsub.publish(ss.formatString('PUBSUB.ServerLogger.{0}', $CommonShuffleLibrary_ServerLogger.$serverType), JSON.stringify({ serverType: $CommonShuffleLibrary_ServerLogger.$serverType, serverName: $CommonShuffleLibrary_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'error' }, CommonLibraries.Help.sanitize));
	};
	$CommonShuffleLibrary_ServerLogger.logTransport = function(item, jsonContent) {
		NodeLibraries.Common.Logging.Logger.log(item, 'transportInfo');
		$CommonShuffleLibrary_ServerLogger.$pubsub.publish(ss.formatString('PUBSUB.ServerLogger.{0}', $CommonShuffleLibrary_ServerLogger.$serverType), JSON.stringify({ serverType: $CommonShuffleLibrary_ServerLogger.$serverType, serverName: $CommonShuffleLibrary_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'transportInfo' }, CommonLibraries.Help.sanitize));
	};
	$CommonShuffleLibrary_ServerLogger.logData = function(item, jsonContent) {
		NodeLibraries.Common.Logging.Logger.log(item, 'dataInfo');
		$CommonShuffleLibrary_ServerLogger.$pubsub.publish(ss.formatString('PUBSUB.ServerLogger.{0}', $CommonShuffleLibrary_ServerLogger.$serverType), JSON.stringify({ serverType: $CommonShuffleLibrary_ServerLogger.$serverType, serverName: $CommonShuffleLibrary_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'dataInfo' }, CommonLibraries.Help.sanitize));
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.ServerLogListener
	var $CommonShuffleLibrary_ServerLogListener = function(serverType, callback) {
		this.$pubsub = null;
		this.$serverType = null;
		this.$serverType = serverType;
		this.$pubsub = new $CommonShuffleLibrary_PubSub(ss.mkdel(this, function(ps) {
			ps.subscribe(ss.formatString('PUBSUB.ServerLogger.{0}', this.$serverType), function(content) {
				callback(JSON.parse(content));
			});
		}));
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.ServerLogMessage
	var $CommonShuffleLibrary_ServerLogMessage = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.DataManagerChatData
	var $CommonShuffleLibrary_Data_DataManagerChatData = function(manager) {
		this.$manager = null;
		this.$manager = manager;
	};
	$CommonShuffleLibrary_Data_DataManagerChatData.prototype = {
		createChatChannel: function(roomName, user, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var $t1 = [];
				ss.add($t1, user);
				var chatRoomDataModel = { roomName: roomName, users: $t1, messages: [] };
				collection.insert(chatRoomDataModel);
				complete(chatRoomDataModel);
			});
		},
		addChatLine: function(user, roomData, message, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var messageModel = { user: user, content: message, time: new Date() };
				var query = {};
				query['$push'] = { messages: messageModel };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(roomData._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						$CommonShuffleLibrary_ServerLogger.logError('Data Error: ' + err2, message);
					}
					ss.add(roomData.messages, messageModel);
					complete(messageModel);
				});
			});
		},
		addUser: function(roomData, user, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var query = {};
				query['$push'] = { users: user };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(roomData._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						$CommonShuffleLibrary_ServerLogger.logError('Data Error: ' + err2, user);
					}
					ss.add(roomData.users, user);
					complete(roomData);
				});
			});
		},
		removeUser: function(roomData, user, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var query = {};
				query['$pop'] = { users: user };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(roomData._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						$CommonShuffleLibrary_ServerLogger.logError('Data Error: ' + err2, user);
					}
					ss.remove(roomData.users, user);
					complete(roomData);
				});
			});
		},
		removeRoom: function(roomData, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				collection.remove({ _id: NodeLibraries.MongoDB.MongoDocument.getID(roomData._id) });
				complete();
			});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.DataManagerGameData
	var $CommonShuffleLibrary_Data_DataManagerGameData = function(manager) {
		this.$manager = null;
		this.$manager = manager;
	};
	$CommonShuffleLibrary_Data_DataManagerGameData.prototype = {
		insert: function(gmo) {
			this.$manager.client.collection('gameInfo', function(err, collection) {
				collection.insert(gmo);
			});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.DataManagerSiteData
	var $CommonShuffleLibrary_Data_DataManagerSiteData = function(manager) {
		this.$manager = null;
		this.$manager = manager;
	};
	$CommonShuffleLibrary_Data_DataManagerSiteData.prototype = {
		user_Insert: function(data, result) {
			this.$manager.client.collection('User', function(err, collection) {
				collection.insert(data);
				result();
			});
		},
		user_GetFirstByUsernamePassword: function(username, password, results) {
			this.$manager.client.collection('User', function(err, collection) {
				var j = { username: username, password: password };
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.UserModelData).call(null, collection, j, function(a, b) {
					results(b);
				});
			});
		},
		user_CheckUsernameExists: function(username, results) {
			this.$manager.client.collection('User', function(err, collection) {
				var j = { username: username };
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.UserModelData).call(null, collection, j, function(a, b) {
					results(b.length > 0);
				});
			});
		},
		room_GetRoomByUser: function(user, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var j = {};
				j['players.userName'] = user.userName;
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.RoomDataModel).call(null, collection, j, function(a, b) {
					results(((b.length > 0) ? b[0] : null));
				});
			});
		},
		room_GetAllByGameType: function(gameType, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var j = { gameType: gameType };
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.RoomDataModel).call(null, collection, j, function(a, b) {
					results(b);
				});
			});
		},
		room_CreateRoom: function(gameType, roomName, user, onRoomCreated) {
			//ExtensionMethods.debugger();
			var $t1 = [];
			ss.add($t1, user);
			var rd = { gameType: gameType, roomName: roomName, chatChannel: roomName + 'RoomName', gameChannel: roomName + 'GameRoom', players: $t1, chatServer: null, gameServer: null };
			this.$manager.client.collection('Room', function(err, collection) {
				collection.insert(rd);
				onRoomCreated(rd);
			});
		},
		room_JoinRoom: function(gameType, roomName, user, onRoomJoined) {
			this.$manager.client.collection('Room', ss.mkdel(this, function(err, collection) {
				var j = { gameType: gameType, roomName: roomName };
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.RoomDataModel).call(null, collection, j, ss.mkdel(this, function(a, b) {
					if (b.length === 0) {
						onRoomJoined(null);
					}
					else {
						var roomData = b[0];
						this.room_AddPlayer(roomData, user, function(ro) {
							onRoomJoined(roomData);
						});
					}
				}));
			}));
		},
		room_GetByRoomName: function(gameType, roomName, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var j = { gameType: gameType, roomName: roomName };
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.RoomDataModel).call(null, collection, j, function(a, b) {
					results(((b.length > 0) ? b[0] : null));
				});
			});
		},
		room_AddPlayer: function(room, user, complete) {
			this.$manager.client.collection('Room', function(err, collection) {
				var query = {};
				query['$push'] = { players: user };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						$CommonShuffleLibrary_ServerLogger.logError('Data Error: ' + err2, user);
					}
					ss.add(room.players, user);
					complete(room);
				});
			});
		},
		room_RemovePlayer: function(room, user, complete) {
			this.$manager.client.collection('Room', function(err, collection) {
				var query = {};
				query['$pop'] = { players: user };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						$CommonShuffleLibrary_ServerLogger.logError('Data Error: ' + err2, user);
					}
					for (var $t1 = 0; $t1 < room.players.length; $t1++) {
						var userLogicModel = room.players[$t1];
						if (ss.referenceEquals(userLogicModel.userName, user.userName)) {
							ss.remove(room.players, userLogicModel);
							break;
						}
					}
					complete(room);
				});
			});
		},
		room_DeleteRoom: function(room) {
			this.$manager.client.collection('Room', function(err, collection) {
				collection.remove({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) });
			});
		},
		room_SetChatServer: function(room, chatServerIndex, complete) {
			this.$manager.client.collection('Room', function(err, collection) {
				var query = {};
				query['$set'] = { chatServer: chatServerIndex };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room.id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						$CommonShuffleLibrary_ServerLogger.logError('Data Error: ' + err2, chatServerIndex);
					}
					room.chatServer = chatServerIndex;
					complete(room);
				});
			});
		},
		game_GetGamesByUser: function(userHash, action) {
			this.$manager.client.collection('Games', function(err, collection) {
				var j = { userHash: userHash };
				$CommonShuffleLibrary_Data_MongoHelper.where(DataModels.SiteManagerModels.Game.GameDataModel).call(null, collection, j, function(a, b) {
					action(b);
				});
			});
		},
		game_CreateGame: function(userHash, gameName, result) {
			this.$manager.client.collection('Games', function(err, collection) {
				var $t1 = DataModels.SiteManagerModels.Game.GameDataModel.$ctor();
				$t1.assets = [];
				$t1.cardImages = [];
				$t1.effects = [];
				var $t2 = Models.SiteManagerModels.Game.GameCodeModel.$ctor();
				$t2.code = '';
				$t2.cursorPosition = new CommonLibraries.IntPoint(0, 0);
				$t1.gameCode = $t2;
				var $t3 = Models.SiteManagerModels.Game.GameLayoutModel.$ctor();
				$t3.areas = [];
				$t3.spaces = [];
				$t3.texts = [];
				$t3.width = 16;
				$t3.height = 16;
				$t1.gameLayout = $t3;
				var $t4 = [];
				var $t5 = Models.SiteManagerModels.Game.GameLayoutScenario.$ctor();
				$t5.spaces = [];
				$t5.effects = [];
				$t5.name = 'Default';
				$t5.numberOfPlayers = 6;
				$t5.screenSize = new CommonLibraries.IntPoint(1024, 768);
				ss.add($t4, $t5);
				$t1.gameLayoutScenarios = $t4;
				$t1.userHash = userHash;
				$t1.name = gameName;
				$t1.description = '';
				$t1.maxNumberOfPlayers = 6;
				$t1.deleted = false;
				var gameDataModel = $t1;
				collection.insert(gameDataModel);
				result(gameDataModel);
			});
		},
		game_GameNameExists: function(gameName, result) {
			this.$manager.client.collection('Games', function(err, collection) {
				var j = { name: gameName };
				$CommonShuffleLibrary_Data_MongoHelper.any(DataModels.SiteManagerModels.Game.GameDataModel).call(null, collection, j, function(a, b) {
					result(b);
				});
			});
		},
		game_UpdateGame: function(model, result) {
			this.$manager.client.collection('Games', function(err, collection) {
				var $t1 = DataModels.SiteManagerModels.Game.GameDataModel.$ctor();
				$t1._id = NodeLibraries.MongoDB.MongoDocument.objectID(model._id);
				$t1.name = model.name;
				$t1.userHash = model.userHash;
				$t1.description = model.description;
				$t1.maxNumberOfPlayers = model.maxNumberOfPlayers;
				$t1.cardImages = model.cardImages;
				$t1.assets = model.assets;
				$t1.gameCode = model.gameCode;
				$t1.gameLayout = model.gameLayout;
				$t1.gameLayoutScenarios = model.gameLayoutScenarios;
				$t1.effects = model.effects;
				$t1.deleted = model.deleted;
				collection.save($t1);
				result(true);
			});
		},
		game_GetGamesByName: function(gameName, action) {
			this.$manager.client.collection('Games', function(err, collection) {
				var j = { name: gameName };
				$CommonShuffleLibrary_Data_MongoHelper.firstOrDefault(DataModels.SiteManagerModels.Game.GameDataModel).call(null, collection, j, function(a, b) {
					action(b);
				});
			});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.MongoHelper
	var $CommonShuffleLibrary_Data_MongoHelper = function() {
	};
	$CommonShuffleLibrary_Data_MongoHelper.where = function(T) {
		return function(collection, query, result) {
			collection.find(query, function(a, b) {
				b.toArray(function(c, d) {
					result(a, d);
				});
			});
		};
	};
	$CommonShuffleLibrary_Data_MongoHelper.firstOrDefault = function(T) {
		return function(collection, query, result) {
			collection.find(query, function(a, b) {
				b.toArray(function(c, d) {
					result(a, d[0]);
				});
			});
		};
	};
	$CommonShuffleLibrary_Data_MongoHelper.any = function(T) {
		return function(collection, query, result) {
			collection.find(query, function(a, b) {
				b.toArray(function(c, d) {
					result(a, d.length > 0);
				});
			});
		};
	};
	ss.registerClass(global, 'CommonShuffleLibrary.Consumer', $CommonShuffleLibrary_Consumer);
	ss.registerClass(global, 'CommonShuffleLibrary.DataManager', $CommonShuffleLibrary_DataManager);
	ss.registerClass(global, 'CommonShuffleLibrary.PubSub', $CommonShuffleLibrary_PubSub);
	ss.registerClass(global, 'CommonShuffleLibrary.QueueItem', $CommonShuffleLibrary_QueueItem);
	ss.registerClass(global, 'CommonShuffleLibrary.QueueItemCollection', $CommonShuffleLibrary_QueueItemCollection);
	ss.registerClass(global, 'CommonShuffleLibrary.QueueManager', $CommonShuffleLibrary_QueueManager);
	ss.registerClass(global, 'CommonShuffleLibrary.QueueManagerOptions', $CommonShuffleLibrary_QueueManagerOptions);
	ss.registerClass(global, 'CommonShuffleLibrary.QueueMessage', $CommonShuffleLibrary_QueueMessage);
	ss.registerClass(global, 'CommonShuffleLibrary.QueuePusher', $CommonShuffleLibrary_QueuePusher, $CommonShuffleLibrary_QueueItem);
	ss.registerClass(global, 'CommonShuffleLibrary.QueueWatcher', $CommonShuffleLibrary_QueueWatcher, $CommonShuffleLibrary_QueueItem);
	ss.registerClass(global, 'CommonShuffleLibrary.ServerLogger', $CommonShuffleLibrary_ServerLogger);
	ss.registerClass(global, 'CommonShuffleLibrary.ServerLogListener', $CommonShuffleLibrary_ServerLogListener);
	ss.registerClass(global, 'CommonShuffleLibrary.ServerLogMessage', $CommonShuffleLibrary_ServerLogMessage);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerChatData', $CommonShuffleLibrary_Data_DataManagerChatData);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerGameData', $CommonShuffleLibrary_Data_DataManagerGameData);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerSiteData', $CommonShuffleLibrary_Data_DataManagerSiteData);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.MongoHelper', $CommonShuffleLibrary_Data_MongoHelper);
	$CommonShuffleLibrary_ServerLogger.$pubsub = null;
	$CommonShuffleLibrary_ServerLogger.$serverType = null;
	$CommonShuffleLibrary_ServerLogger.$serverName = null;
	$CommonShuffleLibrary_DataManager.$connectionAddress = CommonLibraries.Constants.mongoIP;
	$CommonShuffleLibrary_DataManager.$connectionPort = '27017';
})();

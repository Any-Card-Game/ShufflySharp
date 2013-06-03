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
		this.$subbed = new Object();
		var someSubbed = this.$subbed;
		var redis = require('redis');
		redis.debug_mode = false;
		this.$subClient = redis.createClient(6379, CommonLibraries.IPs.redisIP);
		this.$pubClient = redis.createClient(6379, CommonLibraries.IPs.redisIP);
		this.$subClient.on('subscribe', function(channel, count) {
			NodeLibraries.Common.Logging.Logger.log('subscribed: ' + channel + ' ' + count, 2);
		});
		this.$subClient.on('unsubscribe', function(channel1, count1) {
			NodeLibraries.Common.Logging.Logger.log('unsubscribed: ' + channel1 + ' ' + count1, 2);
		});
		this.$subClient.on('message', function(channel2, message) {
			if (!!ss.isValue(someSubbed[channel2])) {
				someSubbed[channel2](message);
			}
		});
		this.$subClient.on('ready', ss.mkdel(this, function() {
			this.$sready = true;
			if (this.$sready && this.$pready) {
				ready();
			}
		}));
		this.$pubClient.on('ready', ss.mkdel(this, function() {
			this.$pready = true;
			if (this.$sready && this.$pready) {
				ready();
			}
		}));
	};
	$CommonShuffleLibrary_PubSub.prototype = {
		publish: function(channel, content) {
			this.$pubClient.publish(channel, content);
		},
		subscribe: function(T) {
			return function(channel, callback) {
				this.$subClient.subscribe(channel);
				this.$subbed[channel] = callback;
			};
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
				NodeLibraries.Common.Logging.Logger.log('Cannot send message:' + channel + ' No Existy', 0);
				NodeLibraries.Common.Logging.Logger.log('       ' + eventChannel + ' ' + JSON.stringify(content), 0);
				return;
			}
			var pusher = ss.cast(this.$qpCollection.getByChannel(channel), $CommonShuffleLibrary_QueuePusher);
			// Logger.Log(string.Format("- Channel: {0}  Name: {1}  User: {2}  EventChannel: {3}  Content: {4}", channel, Name, user , eventChannel, content));
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
		this.$client1 = redis.createClient(6379, CommonLibraries.IPs.redisIP);
	};
	$CommonShuffleLibrary_QueuePusher.prototype = {
		message: function(channel, name, user, eventChannel, content) {
			var message = new $CommonShuffleLibrary_QueueMessage(name, user, eventChannel, content);
			var value = JSON.stringify(message, CommonLibraries.Help.sanitize);
			if (CommonLibraries.Help.verbose) {
				NodeLibraries.Common.Logging.Logger.log(channel + '  \n ' + value, 2);
			}
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
		this.$client1 = redis.createClient(6379, CommonLibraries.IPs.redisIP);
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
			this.$client1.blpop([channel, 0], ss.mkdel(this, function(caller, dtj) {
				var data = ss.cast(dtj, Array);
				if (ss.isValue(dtj)) {
					if (CommonLibraries.Help.verbose) {
						NodeLibraries.Common.Logging.Logger.log(data[1], 2);
					}
					var dt = JSON.parse(data[1]);
					this.get_callback()(dt.name, dt.user, dt.eventChannel, dt.content);
				}
				this.cycle(channel);
			}));
		}
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
				var chatRoomModel = { roomName: roomName, users: $t1, messages: [] };
				collection.insert(chatRoomModel);
				complete(chatRoomModel);
			});
		},
		addChatLine: function(user, room, message, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var messageModel = { user: user, content: message, time: new Date() };
				var query = {};
				query['$push'] = { messages: messageModel };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						NodeLibraries.Common.Logging.Logger.log('Data Error: ' + err2, 0);
					}
					ss.add(room.messages, messageModel);
					complete(messageModel);
				});
			});
		},
		addUser: function(room, user, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var query = {};
				query['$push'] = { users: user };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						NodeLibraries.Common.Logging.Logger.log('Data Error: ' + err2, 0);
					}
					ss.add(room.users, user);
					complete(room);
				});
			});
		},
		removeUser: function(room, user, complete) {
			this.$manager.client.collection('ChatRoom', function(err, collection) {
				var query = {};
				query['$pop'] = { users: user };
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						NodeLibraries.Common.Logging.Logger.log('Data Error: ' + err2, 0);
					}
					ss.remove(room.users, user);
					complete(room);
				});
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
		user_Insert: function(data) {
			this.$manager.client.collection('User', function(err, collection) {
				collection.insert(data);
			});
		},
		user_GetFirstByUsernamePassword: function(username, password, results) {
			this.$manager.client.collection('User', function(err, collection) {
				var j = { username: username, password: password };
				$CommonShuffleLibrary_Data_MongoHelper.find($CommonShuffleLibrary_Data_UserModelData).call(null, collection, j, function(a, b) {
					results(b);
				});
			});
		},
		room_GetRoomByUser: function(user, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var j = {};
				j['players.userName'] = user.userName;
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, j, function(a, b) {
					results(((b.length > 0) ? b[0] : null));
				});
			});
		},
		room_GetAllByGameType: function(gameType, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var j = { gameType: gameType };
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, j, function(a, b) {
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
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, j, ss.mkdel(this, function(a, b) {
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
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, j, function(a, b) {
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
						NodeLibraries.Common.Logging.Logger.log('Data Error: ' + err2, 0);
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
						NodeLibraries.Common.Logging.Logger.log('Data Error: ' + err2, 0);
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
				collection.update({ _id: NodeLibraries.MongoDB.MongoDocument.getID(room._id) }, query, function(err2) {
					if (ss.isValue(err2)) {
						NodeLibraries.Common.Logging.Logger.log('Data Error: ' + err2, 0);
					}
					room.chatServer = chatServerIndex;
					complete(room);
				});
			});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.GameInfoModel
	var $CommonShuffleLibrary_Data_GameInfoModel = function() {
	};
	$CommonShuffleLibrary_Data_GameInfoModel.createInstance = function() {
		return $CommonShuffleLibrary_Data_GameInfoModel.$ctor();
	};
	$CommonShuffleLibrary_Data_GameInfoModel.$ctor = function() {
		var $this = {};
		$this.answerIndex = 0;
		$this.gameName = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.MongoHelper
	var $CommonShuffleLibrary_Data_MongoHelper = function() {
	};
	$CommonShuffleLibrary_Data_MongoHelper.find = function(T) {
		return function(collection, query, result) {
			collection.find(query, function(a, b) {
				b.toArray(function(c, d) {
					result(a, d);
				});
			});
		};
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Data.UserModelData
	var $CommonShuffleLibrary_Data_UserModelData = function() {
	};
	$CommonShuffleLibrary_Data_UserModelData.createInstance = function() {
		return $CommonShuffleLibrary_Data_UserModelData.$ctor();
	};
	$CommonShuffleLibrary_Data_UserModelData.$ctor = function() {
		var $this = NodeLibraries.MongoDB.MongoDocument.$ctor();
		$this.username = null;
		$this.password = null;
		return $this;
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
	ss.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerChatData', $CommonShuffleLibrary_Data_DataManagerChatData);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerGameData', $CommonShuffleLibrary_Data_DataManagerGameData);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerSiteData', $CommonShuffleLibrary_Data_DataManagerSiteData);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.GameInfoModel', $CommonShuffleLibrary_Data_GameInfoModel);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.MongoHelper', $CommonShuffleLibrary_Data_MongoHelper);
	ss.registerClass(global, 'CommonShuffleLibrary.Data.UserModelData', $CommonShuffleLibrary_Data_UserModelData, NodeLibraries.MongoDB.MongoDocument);
	$CommonShuffleLibrary_DataManager.$connectionAddress = CommonLibraries.IPs.mongoIP;
	$CommonShuffleLibrary_DataManager.$connectionPort = '27017';
})();

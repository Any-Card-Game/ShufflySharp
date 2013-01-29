
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.Consumer
	var $CommonShuffleLibrary_Consumer = function(obj) {
		var tf = this;
		var $t1 = Object.keys(obj).getEnumerator();
		try {
			while ($t1.moveNext()) {
				var v = $t1.get_current();
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
		this.gameData = null;
		this.siteData = null;
		var mongo = require('mongodb');
		var Db = mongo.Db;
		this.$connection = mongo.Connection;
		var server = this.$server = mongo.Server;
		this.client = new Db('test', new server('50.116.28.16', 27017, {}));
		this.client.open(function(arg1, arg2) {
			//client.Collection("test_insert", "test");
		});
		this.$initData();
	};
	$CommonShuffleLibrary_DataManager.prototype = {
		$initData: function() {
			this.gameData = new $CommonShuffleLibrary_Data_DataManagerGameData(this);
			this.siteData = new $CommonShuffleLibrary_Data_DataManagerSiteData(this);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.IPs
	var $CommonShuffleLibrary_IPs = function() {
	};
	$CommonShuffleLibrary_IPs.get_gatewayIP = function() {
		return '50.116.22.241';
	};
	$CommonShuffleLibrary_IPs.get_redisIP = function() {
		return '50.116.28.16';
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
		this.$subClient = redis.createClient(6379, $CommonShuffleLibrary_IPs.get_redisIP());
		this.$pubClient = redis.createClient(6379, $CommonShuffleLibrary_IPs.get_redisIP());
		this.$subClient.on('subscribe', function(channel, count) {
			console.log('subscribed: ' + channel + ' ' + count);
		});
		this.$subClient.on('unsubscribe', function(channel1, count1) {
			console.log('unsubscribed: ' + channel1 + ' ' + count1);
		});
		this.$subClient.on('message', function(channel2, message) {
			if (!!ss.isValue(someSubbed[channel2])) {
				someSubbed[channel2](message);
			}
		});
		this.$subClient.on('ready', Function.mkdel(this, function() {
			this.$sready = true;
			if (this.$sready && this.$pready) {
				ready();
			}
		}));
		this.$pubClient.on('ready', Function.mkdel(this, function() {
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
			var $t1 = this.$queueItems.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var queueWatcher = $t1.get_current();
					if (ss.referenceEquals(queueWatcher.channel, channel) || channel.indexOf(queueWatcher.channel.replaceAll('*', '')) === 0) {
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
		this.channels = new (Type.makeGenericType(ss.Dictionary$2, [String, Function]))();
		this.qw = [];
		this.qp = [];
		for (var $t1 = 0; $t1 < options.watchers.length; $t1++) {
			var queueWatcher = options.watchers[$t1];
			if (ss.isNullOrUndefined(queueWatcher.get_callback())) {
				queueWatcher.set_callback(Function.mkdel(this, this.$messageReceived));
			}
			this.qw.add(queueWatcher);
		}
		this.qw.addRange(options.watchers);
		for (var $t2 = 0; $t2 < options.pushers.length; $t2++) {
			var pusher = options.pushers[$t2];
			this.qp.add(new $CommonShuffleLibrary_QueuePusher(pusher));
		}
		this.$qwCollection = new $CommonShuffleLibrary_QueueItemCollection(this.qw);
		this.$qpCollection = new $CommonShuffleLibrary_QueueItemCollection(this.qp);
	};
	$CommonShuffleLibrary_QueueManager.prototype = {
		addChannel: function(channel, callback) {
			this.channels.set_item(channel, callback);
		},
		$messageReceived: function(name, user, eventChannel, content) {
			user.gateway = name;
			if (ss.isValue(this.channels.get_item(eventChannel))) {
				this.channels.get_item(eventChannel)(user, content);
			}
		},
		sendMessage: function(user, channel, eventChannel, content) {
			if (ss.isNullOrUndefined(this.$qpCollection.getByChannel(channel))) {
				console.log(channel + ' No Existy');
				return;
			}
			var pusher = Type.cast(this.$qpCollection.getByChannel(channel), $CommonShuffleLibrary_QueuePusher);
			// Console.Log(string.Format("- Channel: {0}  Name: {1}  User: {2}  EventChannel: {3}  Content: {4}", channel, Name, user , eventChannel, content));
			pusher.message(Object).call(pusher, channel, this.name, user, eventChannel, content);
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
	var $CommonShuffleLibrary_QueueMessage$1 = function(T) {
		var $type = function(name, user, eventChannel, content) {
			this.content = T.getDefaultValue();
			this.eventChannel = null;
			this.name = null;
			this.user = null;
			this.name = name;
			this.user = user;
			this.eventChannel = eventChannel;
			this.content = content;
		};
		Type.registerGenericClassInstance($type, $CommonShuffleLibrary_QueueMessage$1, [T], function() {
			return Object;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'CommonShuffleLibrary.QueueMessage$1', $CommonShuffleLibrary_QueueMessage$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// CommonShuffleLibrary.QueuePusher
	var $CommonShuffleLibrary_QueuePusher = function(pusher) {
		this.$client1 = null;
		$CommonShuffleLibrary_QueueItem.call(this);
		var redis = require('redis');
		this.channel = pusher;
		this.$client1 = redis.createClient(6379, $CommonShuffleLibrary_IPs.get_redisIP());
	};
	$CommonShuffleLibrary_QueuePusher.prototype = {
		message: function(T) {
			return function(channel, name, user, eventChannel, content) {
				var message = new (Type.makeGenericType($CommonShuffleLibrary_QueueMessage$1, [T]))(name, user, eventChannel, content);
				var value = JSON.stringify(message, CommonLibraries.Help.sanitize);
				this.$client1.rpush(channel, value);
				//todo:maybe sanitize
			};
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
		redis['foo'] = 2;
		this.$client1 = redis.createClient(6379, $CommonShuffleLibrary_IPs.get_redisIP());
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
			this.$client1.blpop([channel, 0], Function.mkdel(this, function(caller, dtj) {
				var data = Type.cast(dtj, Array);
				if (ss.isValue(dtj)) {
					var dt = JSON.parse(data[1]);
					this.get_callback()(dt.name, dt.user, dt.eventChannel, dt.content);
				}
				this.cycle(channel);
			}));
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
				var js = {};
				js['username'] = username;
				js['password'] = password;
				$CommonShuffleLibrary_Data_MongoHelper.find($CommonShuffleLibrary_Data_UserModelData).call(null, collection, js, function(a, b) {
					results(b);
				});
			});
		},
		room_GetAllByGameType: function(gameType, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var js = {};
				js['gameType'] = gameType;
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, js, function(a, b) {
					results(b);
				});
			});
		},
		room_CreateRoom: function(gameType, roomName, user, onRoomCreated) {
			var $t1 = [];
			$t1.add(user);
			var rd = { gameType: gameType, roomName: roomName, players: $t1 };
			this.$manager.client.collection('Room', function(err, collection) {
				collection.insert(rd);
				onRoomCreated(rd);
			});
		},
		room_JoinRoom: function(gameType, roomName, user, onRoomJoined) {
			this.$manager.client.collection('Room', function(err, collection) {
				var js = {};
				js['gameType'] = gameType;
				js['roomName'] = roomName;
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, js, function(a, b) {
					if (b.length === 0) {
						onRoomJoined(null);
					}
					else {
						var roomData = b[0];
						roomData.players.add(user);
						collection.save(roomData);
						onRoomJoined(roomData);
					}
				});
			});
		},
		room_GetByRoomName: function(gameType, roomName, results) {
			this.$manager.client.collection('Room', function(err, collection) {
				var js = {};
				js['gameType'] = gameType;
				js['roomName'] = roomName;
				$CommonShuffleLibrary_Data_MongoHelper.find(Models.SiteManagerModels.RoomData).call(null, collection, js, function(a, b) {
					results(((b.length > 0) ? b[0] : null));
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
		var $this = {};
		$this.username = null;
		$this.password = null;
		return $this;
	};
	Type.registerClass(global, 'CommonShuffleLibrary.Consumer', $CommonShuffleLibrary_Consumer, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.DataManager', $CommonShuffleLibrary_DataManager, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.IPs', $CommonShuffleLibrary_IPs, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.PubSub', $CommonShuffleLibrary_PubSub, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.QueueItem', $CommonShuffleLibrary_QueueItem, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.QueueItemCollection', $CommonShuffleLibrary_QueueItemCollection, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.QueueManager', $CommonShuffleLibrary_QueueManager, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.QueueManagerOptions', $CommonShuffleLibrary_QueueManagerOptions, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.QueuePusher', $CommonShuffleLibrary_QueuePusher, $CommonShuffleLibrary_QueueItem);
	Type.registerClass(global, 'CommonShuffleLibrary.QueueWatcher', $CommonShuffleLibrary_QueueWatcher, $CommonShuffleLibrary_QueueItem);
	Type.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerGameData', $CommonShuffleLibrary_Data_DataManagerGameData, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.Data.DataManagerSiteData', $CommonShuffleLibrary_Data_DataManagerSiteData, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.Data.GameInfoModel', $CommonShuffleLibrary_Data_GameInfoModel, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.Data.MongoHelper', $CommonShuffleLibrary_Data_MongoHelper, Object);
	Type.registerClass(global, 'CommonShuffleLibrary.Data.UserModelData', $CommonShuffleLibrary_Data_UserModelData, Object);
	$CommonShuffleLibrary_DataManager.$connectionAddress = '50.116.28.16';
	$CommonShuffleLibrary_DataManager.$connectionPort = '27017';
})();

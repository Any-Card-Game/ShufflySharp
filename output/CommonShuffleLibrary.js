Type.registerNamespace('CommonShuffleLibrary');
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.Consumer
CommonShuffleLibrary.Consumer = function(obj) {
	var tf = this;
	var $t1 = (Object.keys(obj)).getEnumerator();
	try {
		while ($t1.moveNext()) {
			var v = $t1.get_current();
			tf[v] = obj[v];
		}
	}
	finally {
		if (Type.isInstanceOfType($t1, ss.IDisposable)) {
			Type.cast($t1, ss.IDisposable).dispose();
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.IPs
CommonShuffleLibrary.IPs = function() {
};
CommonShuffleLibrary.IPs.get_gatewayIP = function() {
	return '50.116.22.241';
};
CommonShuffleLibrary.IPs.get_redisIP = function() {
	return '50.116.28.16';
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.PubSub
CommonShuffleLibrary.PubSub = function(ready) {
	this.$pready = false;
	this.$pubClient = null;
	this.$sready = false;
	this.$subClient = null;
	this.$subbed = null;
	this.$subbed = new Object();
	var someSubbed = this.$subbed;
	var redis = require('redis');
	redis.debug_mode = false;
	this.$subClient = redis.createClient(6379, CommonShuffleLibrary.IPs.get_redisIP());
	this.$pubClient = redis.createClient(6379, CommonShuffleLibrary.IPs.get_redisIP());
	this.$subClient.on('subscribe', function(channel, count) {
		console.log('subscribed: ' + channel + ' ' + count);
	});
	this.$subClient.on('unsubscribe', function(channel1, count1) {
		console.log('unsubscribed: ' + channel1 + ' ' + count1);
	});
	this.$subClient.on('message', function(channel2, message) {
		if (ss.Nullable.unbox(Type.cast(ss.isValue(someSubbed[channel2]), Boolean))) {
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
CommonShuffleLibrary.PubSub.prototype = {
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
CommonShuffleLibrary.QueueItem = function() {
	this.channel = null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.QueueItemCollection
CommonShuffleLibrary.QueueItemCollection = function(queueItems) {
	this.$queueItems = null;
	this.$queueItems = queueItems;
};
CommonShuffleLibrary.QueueItemCollection.prototype = {
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
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		return null;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.QueueManager
CommonShuffleLibrary.QueueManager = function(name, options) {
	this.name = null;
	this.channels = null;
	this.qp = null;
	this.$qpCollection = null;
	this.qw = null;
	this.$qwCollection = null;
	this.name = name;
	this.channels = new Object();
	this.qw = new Array();
	this.qp = new Array();
	for (var $t1 = 0; $t1 < options.watchers.length; $t1++) {
		var queueWatcher = options.watchers[$t1];
		if (ss.isNullOrUndefined(queueWatcher.get_callback())) {
			queueWatcher.set_callback(Function.mkdel(this, this.$messageReceived(Object)));
		}
		this.qw.add(queueWatcher);
	}
	this.qw.addRange(options.watchers);
	for (var $t2 = 0; $t2 < options.pushers.length; $t2++) {
		var pusher = options.pushers[$t2];
		this.qp.add(new CommonShuffleLibrary.QueuePusher(pusher));
	}
	this.$qwCollection = new CommonShuffleLibrary.QueueItemCollection(this.qw);
	this.$qpCollection = new CommonShuffleLibrary.QueueItemCollection(this.qp);
};
CommonShuffleLibrary.QueueManager.prototype = {
	addChannel: function(channel, callback) {
		this.channels[channel] = callback;
	},
	$messageReceived: function(T) {
		return function(name, user, eventChannel, content) {
			user.gateway = name;
			if (ss.Nullable.unbox(Type.cast(ss.isValue(this.channels[eventChannel]), Boolean))) {
				this.channels[eventChannel](user, content);
			}
		};
	},
	sendMessage: function(T) {
		return function(user, channel, eventChannel, content) {
			if (ss.isNullOrUndefined(this.$qpCollection.getByChannel(channel))) {
				console.log(channel + ' No Existy');
				return;
			}
			var pusher = Type.cast(this.$qpCollection.getByChannel(channel), CommonShuffleLibrary.QueuePusher);
			pusher.message(T).call(pusher, channel, this.name, user, eventChannel, content);
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.QueueManagerOptions
CommonShuffleLibrary.QueueManagerOptions = function(watchers, pushers) {
	this.pushers = null;
	this.watchers = null;
	this.pushers = pushers;
	this.watchers = watchers;
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.QueueMessage$1
CommonShuffleLibrary.QueueMessage$1 = function(T) {
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
	$type.registerGenericClassInstance($type, CommonShuffleLibrary.QueueMessage$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
CommonShuffleLibrary.QueueMessage$1.registerGenericClass('CommonShuffleLibrary.QueueMessage$1', 1);
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.QueuePusher
CommonShuffleLibrary.QueuePusher = function(pusher) {
	this.$client1 = null;
	CommonShuffleLibrary.QueueItem.call(this);
	var redis = require('redis');
	this.channel = pusher;
	this.$client1 = redis.createClient(6379, CommonShuffleLibrary.IPs.get_redisIP());
};
CommonShuffleLibrary.QueuePusher.prototype = {
	message: function(T) {
		return function(channel, name, user, eventChannel, content) {
			var message = new (Type.makeGenericType(CommonShuffleLibrary.QueueMessage$1, [T]))(name, user, eventChannel, content);
			var value = JSON.stringify(message, CommonLibraries.Help.sanitize);
			this.$client1.rpush(channel, value);
			//todo:maybe sanitize
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.QueueWatcher
CommonShuffleLibrary.QueueWatcher = function(queue, callback) {
	this.$client1 = null;
	this.$2$CallbackField = null;
	CommonShuffleLibrary.QueueItem.call(this);
	this.channel = queue;
	this.set_callback(callback);
	var redis = require('redis');
	redis['foo'] = 2;
	this.$client1 = redis.createClient(6379, CommonShuffleLibrary.IPs.get_redisIP());
	this.cycle(queue);
};
CommonShuffleLibrary.QueueWatcher.prototype = {
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
CommonShuffleLibrary.Consumer.registerClass('CommonShuffleLibrary.Consumer', Object);
CommonShuffleLibrary.IPs.registerClass('CommonShuffleLibrary.IPs', Object);
CommonShuffleLibrary.PubSub.registerClass('CommonShuffleLibrary.PubSub', Object);
CommonShuffleLibrary.QueueItem.registerClass('CommonShuffleLibrary.QueueItem', Object);
CommonShuffleLibrary.QueueItemCollection.registerClass('CommonShuffleLibrary.QueueItemCollection', Object);
CommonShuffleLibrary.QueueManager.registerClass('CommonShuffleLibrary.QueueManager', Object);
CommonShuffleLibrary.QueueManagerOptions.registerClass('CommonShuffleLibrary.QueueManagerOptions', Object);
CommonShuffleLibrary.QueuePusher.registerClass('CommonShuffleLibrary.QueuePusher', CommonShuffleLibrary.QueueItem);
CommonShuffleLibrary.QueueWatcher.registerClass('CommonShuffleLibrary.QueueWatcher', CommonShuffleLibrary.QueueItem);

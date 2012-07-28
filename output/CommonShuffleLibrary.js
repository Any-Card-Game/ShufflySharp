Type.registerNamespace('CommonShuffleLibraries');
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.$QueueItemCollection
CommonShuffleLibraries.$QueueItemCollection = function(queueItems) {
	this.$queueItems = null;
	this.$queueItems = queueItems;
};
CommonShuffleLibraries.$QueueItemCollection.prototype = {
	$getByChannel: function(channel) {
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
// CommonShuffleLibraries.Consumer
CommonShuffleLibraries.Consumer = function(obj) {
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
// CommonShuffleLibraries.Help
CommonShuffleLibraries.Help = function() {
};
CommonShuffleLibraries.Help.sanitize = function(name, value) {
	if (typeof value == 'function') {
		return null;
	}
	if ((name.indexOf(String.fromCharCode(95))) !== 0 && name.toLowerCase() !== 'socket' && name.toLowerCase() !== 'fiber' && name.toLowerCase() !== 'debuggingsocket') {
		return value;
	}
	return null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.IPs
CommonShuffleLibraries.IPs = function() {
};
CommonShuffleLibraries.IPs.get_gatewayIP = function() {
	return '50.116.22.241';
};
CommonShuffleLibraries.IPs.get_redisIP = function() {
	return '50.116.28.16';
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.PubSub
CommonShuffleLibraries.PubSub = function(ready) {
	this.$subbed = ({});
	this.$sready = false;
	this.$pready = false;
	this.$subClient = null;
	this.$pubClient = null;
	var redis = require('redis');
	redis.debug_mode = false;
	this.$subClient = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
	this.$pubClient = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
	this.$subClient.on('subscribe', function(channel, count) {
		console.log('subscribed: ' + channel + ' ' + count);
	});
	this.$subClient.on('unsubscribe', function(channel1, count1) {
		console.log('unsubscribed: ' + channel1 + ' ' + count1);
	});
	this.$subClient.on('message', Function.mkdel(this, function(channel2, message) {
		if (Object.keyExists(this.$subbed, channel2)) {
			this.$subbed[channel2](message);
		}
	}));
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
CommonShuffleLibraries.PubSub.prototype = {
	publish: function(channel, content) {
		this.$pubClient.publish(channel, content);
	},
	subscribe: function(channel, callback) {
		this.$subClient.subscribe(channel);
		this.$subbed[channel] = callback;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueItem
CommonShuffleLibraries.QueueItem = function() {
	this.channel = null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueManager
CommonShuffleLibraries.QueueManager = function(name, options) {
	this.name = null;
	this.channels = null;
	this.qw = null;
	this.qp = null;
	this.$qwCollection = null;
	this.$qpCollection = null;
	this.name = name;
	this.channels = ({});
	this.qw = new Array();
	this.qp = new Array();
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
		this.qp.add(new CommonShuffleLibraries.QueuePusher(pusher));
	}
	this.$qwCollection = new CommonShuffleLibraries.$QueueItemCollection(this.qw);
	this.$qpCollection = new CommonShuffleLibraries.$QueueItemCollection(this.qp);
};
CommonShuffleLibraries.QueueManager.prototype = {
	addChannel: function(channel, callback) {
		this.channels[channel] = callback;
	},
	$messageReceived: function(name, user, eventChannel, content) {
		user.gateway = name;
		if (Object.keyExists(this.channels, eventChannel)) {
			this.channels[eventChannel](user, content);
		}
	},
	sendMessage: function(user, channel, eventChannel, content) {
		if (ss.isNullOrUndefined(this.$qpCollection.$getByChannel(channel))) {
			console.log(channel + ' No Existy');
			return;
		}
		var pusher = Type.cast(this.$qpCollection.$getByChannel(channel), CommonShuffleLibraries.QueuePusher);
		pusher.message(channel, this.name, user, eventChannel, content);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueManagerOptions
CommonShuffleLibraries.QueueManagerOptions = function(watchers, pushers) {
	this.pushers = null;
	this.watchers = null;
	this.pushers = pushers;
	this.watchers = watchers;
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueMessage
CommonShuffleLibraries.QueueMessage = function(name, user, eventChannel, content) {
	this.name = null;
	this.user = null;
	this.eventChannel = null;
	this.content = null;
	this.name = name;
	this.user = user;
	this.eventChannel = eventChannel;
	this.content = content;
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueuePusher
CommonShuffleLibraries.QueuePusher = function(pusher) {
	this.$client1 = null;
	CommonShuffleLibraries.QueueItem.call(this);
	var redis = require('redis');
	this.channel = pusher;
	this.$client1 = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
};
CommonShuffleLibraries.QueuePusher.prototype = {
	message: function(channel, name, user, eventChannel, content) {
		var message = new CommonShuffleLibraries.QueueMessage(name, user, eventChannel, content);
		var value = JSON.stringify(message, CommonShuffleLibraries.Help.sanitize);
		this.$client1.rpush(channel, value);
		//todo:maybe sanitize
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueWatcher
CommonShuffleLibraries.QueueWatcher = function(queue, callback) {
	this.$client1 = null;
	this.$2$CallbackField = null;
	CommonShuffleLibraries.QueueItem.call(this);
	this.channel = queue;
	this.set_callback(callback);
	var redis = require('redis');
	redis['foo'] = 2;
	this.$client1 = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
	this.cycle(queue);
};
CommonShuffleLibraries.QueueWatcher.prototype = {
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
// CommonShuffleLibraries.User
CommonShuffleLibraries.User = function() {
	this.socket = null;
	this.gateway = null;
	this.userName = null;
};
CommonShuffleLibraries.$QueueItemCollection.registerClass('CommonShuffleLibraries.$QueueItemCollection', Object);
CommonShuffleLibraries.Consumer.registerClass('CommonShuffleLibraries.Consumer', Object);
CommonShuffleLibraries.Help.registerClass('CommonShuffleLibraries.Help', Object);
CommonShuffleLibraries.IPs.registerClass('CommonShuffleLibraries.IPs', Object);
CommonShuffleLibraries.PubSub.registerClass('CommonShuffleLibraries.PubSub', Object);
CommonShuffleLibraries.QueueItem.registerClass('CommonShuffleLibraries.QueueItem', Object);
CommonShuffleLibraries.QueueManager.registerClass('CommonShuffleLibraries.QueueManager', Object);
CommonShuffleLibraries.QueueManagerOptions.registerClass('CommonShuffleLibraries.QueueManagerOptions', Object);
CommonShuffleLibraries.QueueMessage.registerClass('CommonShuffleLibraries.QueueMessage', Object);
CommonShuffleLibraries.QueuePusher.registerClass('CommonShuffleLibraries.QueuePusher', CommonShuffleLibraries.QueueItem);
CommonShuffleLibraries.QueueWatcher.registerClass('CommonShuffleLibraries.QueueWatcher', CommonShuffleLibraries.QueueItem);
CommonShuffleLibraries.User.registerClass('CommonShuffleLibraries.User', Object);

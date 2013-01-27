require('./mscorlib.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./RawDeflate.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// SiteServer.SiteClientManager
	var $SiteServer_SiteClientManager = function(siteServerIndex) {
		this.$qManager = null;
		this.$1$SiteServerIndexField = null;
		this.$1$OnUserLoginField = null;
		this.set_siteServerIndex(siteServerIndex);
		this.$setup();
	};
	$SiteServer_SiteClientManager.prototype = {
		get_siteServerIndex: function() {
			return this.$1$SiteServerIndexField;
		},
		set_siteServerIndex: function(value) {
			this.$1$SiteServerIndexField = value;
		},
		add_onUserLogin: function(value) {
			this.$1$OnUserLoginField = Function.combine(this.$1$OnUserLoginField, value);
		},
		remove_onUserLogin: function(value) {
			this.$1$OnUserLoginField = Function.remove(this.$1$OnUserLoginField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_siteServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('SiteServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_siteServerIndex(), null)], ['SiteServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Site.Login', Function.mkdel(this, function(user, data) {
				this.$1$OnUserLoginField(user, data);
			}));
		},
		sendLoginResponse: function(user) {
			this.$qManager.sendMessage(user, user.gateway, 'Area.Site.Login.Response', {});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// SiteServer.SiteManager
	var $SiteServer_SiteManager = function(siteServerIndex) {
		this.$dataManager = null;
		this.$myServerManager = null;
		this.$myServerManager = new $SiteServer_SiteClientManager(siteServerIndex);
		this.$dataManager = new CommonShuffleLibrary.DataManager();
		this.$myServerManager.add_onUserLogin(Function.mkdel(this, this.$onUserLogin));
	};
	$SiteServer_SiteManager.prototype = {
		$onUserLogin: function(user, data) {
			console.log(user.userName + '  ' + data.hash + '    We did it!');
			this.$myServerManager.sendLoginResponse(user);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// SiteServer.SiteServer
	var $SiteServer_SiteServer = function() {
		this.$siteServerIndex = null;
		new global.ArrayUtils();
		this.$siteServerIndex = 'SiteServer' + CommonLibraries.Guid.newGuid();
		process.on('exit', function() {
			console.log('exi SiteServer');
		});
		var siteManager = new $SiteServer_SiteManager(this.$siteServerIndex);
	};
	$SiteServer_SiteServer.main = function() {
		try {
			new $SiteServer_SiteServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			console.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc));
		}
	};
	Type.registerClass(global, 'SiteServer.SiteClientManager', $SiteServer_SiteClientManager, Object);
	Type.registerClass(global, 'SiteServer.SiteManager', $SiteServer_SiteManager, Object);
	Type.registerClass(global, 'SiteServer.SiteServer', $SiteServer_SiteServer, Object);
	$SiteServer_SiteServer.main();
})();

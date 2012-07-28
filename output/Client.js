require('./mscorlib.debug.js');
Type.registerNamespace('Client');
////////////////////////////////////////////////////////////////////////////////
// Client.BuildSite
Client.BuildSite = function(gatewayServerAddress) {
	this.$gatewayServerAddress = null;
	this.$scriptLoader = new Client.ScriptLoader();
	this.$home = null;
	this.$devArea = null;
	this.$genericArea = null;
	this.$gatewayServerAddress = gatewayServerAddress;
	var url = 'http://50.116.22.241:8881/';
	//       window .topLevel = url;
	this.loadCss(url + 'client/lib/jquery-ui-1.8.20.custom.css');
	this.loadCss(url + 'client/lib/codemirror/codemirror.css');
	this.loadCss(url + 'client/lib/site.css');
	this.loadCss(url + 'client/lib/codemirror/theme/night.css');
	this.loadCss(url + 'client/lib/jqwidgets/styles/jqx.base.css');
	this.$scriptLoader.loadSync([url + 'client/lib/jquery-1.7.2.min.js', url + 'client/lib/jquery-ui-1.8.20.custom.min.js', url + 'client/lib/jqwidgets/scripts/gettheme.js', url + 'client/lib/jqwidgets/jqxcore.js'], Function.mkdel(this, function() {
		this.$scriptLoader.load([url + 'client/lib/jqwidgets/jqxbuttons.js', url + 'client/lib/jqwidgets/jqxscrollbar.js', url + 'client/lib/linq.js', url + 'client/lib/tween.js', url + 'client/lib/socket.io.js', url + 'client/lib/codemirror/codemirror.js', url + 'client/lib/jqwidgets/jqxlistbox.js'], Function.mkdel(this, function() {
			this.$scriptLoader.load([url + 'client/ClientHelp.js', url + 'common/Help.js', url + 'client/lib/codemirror/mode/javascript/javascript.js', url + 'client/lib/WorkerConsole.js', url + 'client/Gateway.js', url + 'client/lib/FunctionWorker.js', url + 'client/lib/Stats.js', url + 'client/lib/keyboardjs.js', url + 'client/UIManager.js', url + 'client/UIArea.js', url + 'client/PageHandler.js', url + 'client/uis/genericArea.js', url + 'client/ShuffUIManager.js', url + 'client/lib/Dialog.js'], Function.mkdel(this, this.$ready));
		}));
	}));
};
Client.BuildSite.prototype = {
	$ready: function() {
		var elem = document.getElementById('loading');
		elem.parentNode.removeChild(elem);
		var stats = new xStats();
		document.body.appendChild(stats.element);
		var pageHandler = new Client.PageHandler(this.$gatewayServerAddress);
		var shuffUIManager = new Client.ShuffUI.ShuffUIManager();
		(window).shuffUIManager = shuffUIManager;
		(window).shuffUIManager.genericArea = this.$genericArea;
		var $t1 = new Client.ShuffUI.ShuffWindow();
		$t1.title = 'CardGame';
		$t1.x = ($('body')).innerWidth() - 500;
		$t1.y = 100;
		$t1.width = 420;
		$t1.height = 450;
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.visible = false;
		this.$home = shuffUIManager.createWindow($t1);
		var $t3 = this.$home;
		var $t2 = new Client.ShuffUI.ShuffButton();
		$t2.set_x(280);
		$t2.set_y(54);
		$t2.set_width(150);
		$t2.set_height(25);
		$t2.set_text('Update Game List');
		$t2.set_click(function(e) {
			(window).PageHandler.gateway.emit('Area.Game.GetGames', this.$devArea.instance.gameServer);
			//NO EMIT'ING OUTSIDE OF PageHandler
		});
		$t3.addButton($t2);
		var $t5 = this.$home;
		var $t4 = new Client.ShuffUI.ShuffButton();
		$t4.set_x(280);
		$t4.set_y(84);
		$t4.set_width(150);
		$t4.set_height(25);
		$t4.set_text('Create Game');
		$t4.set_click(function(e1) {
			(window).PageHandler.gateway.emit('Area.Game.Create', { User: { UserName: (this.$genericArea.instance.txtUserName[0]).value } }, this.$devArea.instance.GameServer);
			//NO EMIT'ING OUTSIDE OF PageHandler
		});
		$t5.addButton($t4);
	},
	loadCss: function(filename) {
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
		(document.getElementsByTagName('head')[0]).appendChild(fileref);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ClientHelp
Client.ClientHelp = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.Gateway
Client.Gateway = function(gatewayServer) {
	this.$channels = null;
	this.$1$GatewaySocketField = null;
	this.$channels = ({});
	this.set_gatewaySocket(io.connect(gatewayServer));
	this.get_gatewaySocket().on('Client.Message', Function.mkdel(this, function(data) {
		this.$channels[Type.cast(data.channel, String)](data.content);
	}));
};
Client.Gateway.prototype = {
	get_gatewaySocket: function() {
		return this.$1$GatewaySocketField;
	},
	set_gatewaySocket: function(value) {
		this.$1$GatewaySocketField = value;
	},
	emit: function(channel, content, gameServer) {
		this.get_gatewaySocket().emit('Gateway.Message', { Channel: channel, Content: content, GameServer: gameServer });
	},
	on: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	login: function(userName) {
		this.get_gatewaySocket().emit('Gateway.Login', { Username: userName });
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageHandler
Client.PageHandler = function(gatewayServerAddress) {
};
////////////////////////////////////////////////////////////////////////////////
// Client.ScriptLoader
Client.ScriptLoader = function() {
};
Client.ScriptLoader.prototype = {
	$loadScript: function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		// +"?" + (Math.floor(Math.random() * 10000)); //caching
		if (ss.isValue(callback)) {
			script.addEventListener('onreadystatechange', function(a) {
				var b = script;
				if (ss.Nullable.unbox(Type.cast(b.readyState === 'loaded', Boolean))) {
					callback();
				}
			}, true);
			script.addEventListener('onload', function(a1) {
				callback();
			}, true);
		}
		head.appendChild(script);
	},
	load: function(items, done) {
		var counter = 0;
		for (var i = 0; i < items.length; i++) {
			this.$loadScript(items[i], function() {
				counter++;
				if (counter >= items.length) {
					done();
				}
			});
		}
	},
	loadSync: function(items, done) {
		var counter = 0;
		var nextOne = null;
		nextOne = Function.mkdel(this, function() {
			counter++;
			if (counter >= items.length) {
				done();
			}
			else {
				this.$loadScript(items[counter], nextOne);
			}
		});
		this.$loadScript(items[0], nextOne);
	}
};
Type.registerNamespace('Client.ShuffUI');
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
Client.ShuffUI.ShuffButton = function() {
	this.$2$XField = 0;
	this.$2$YField = 0;
	this.$2$WidthField = 0;
	this.$2$HeightField = 0;
	this.$2$TextField = null;
	this.$2$ClickField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffButton.prototype = {
	get_x: function() {
		return this.$2$XField;
	},
	set_x: function(value) {
		this.$2$XField = value;
	},
	get_y: function() {
		return this.$2$YField;
	},
	set_y: function(value) {
		this.$2$YField = value;
	},
	get_width: function() {
		return this.$2$WidthField;
	},
	set_width: function(value) {
		this.$2$WidthField = value;
	},
	get_height: function() {
		return this.$2$HeightField;
	},
	set_height: function(value) {
		this.$2$HeightField = value;
	},
	get_text: function() {
		return this.$2$TextField;
	},
	set_text: function(value) {
		this.$2$TextField = value;
	},
	get_click: function() {
		return this.$2$ClickField;
	},
	set_click: function(value) {
		this.$2$ClickField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffClickEvent
Client.ShuffUI.ShuffClickEvent = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffElement
Client.ShuffUI.ShuffElement = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffUIManager
Client.ShuffUI.ShuffUIManager = function() {
};
Client.ShuffUI.ShuffUIManager.prototype = {
	createWindow: function(ui) {
		return null;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffWindow
Client.ShuffUI.ShuffWindow = function() {
	this.instance = null;
	this.elements = null;
	this.title = null;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.allowClose = false;
	this.height = 0;
	this.allowMinimize = false;
	this.visible = false;
	Client.ShuffUI.ShuffElement.call(this);
	this.elements = new Array();
};
Client.ShuffUI.ShuffWindow.prototype = {
	addButton: function(element) {
		this.elements.add(element);
	}
};
Type.registerNamespace('');
////////////////////////////////////////////////////////////////////////////////
// Globals
Globals = function() {
};
Client.BuildSite.registerClass('Client.BuildSite', Object);
Client.ClientHelp.registerClass('Client.ClientHelp', Object);
Client.Gateway.registerClass('Client.Gateway', Object);
Client.PageHandler.registerClass('Client.PageHandler', Object);
Client.ScriptLoader.registerClass('Client.ScriptLoader', Object);
Client.ShuffUI.ShuffClickEvent.registerClass('Client.ShuffUI.ShuffClickEvent', Object);
Client.ShuffUI.ShuffElement.registerClass('Client.ShuffUI.ShuffElement', Object);
Client.ShuffUI.ShuffUIManager.registerClass('Client.ShuffUI.ShuffUIManager', Object);
Client.ShuffUI.ShuffWindow.registerClass('Client.ShuffUI.ShuffWindow', Client.ShuffUI.ShuffElement);
Globals.registerClass('Globals', Object);
Client.ShuffUI.ShuffButton.registerClass('Client.ShuffUI.ShuffButton', Client.ShuffUI.ShuffElement);


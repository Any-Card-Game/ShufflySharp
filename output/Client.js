require('./mscorlib.debug.js');
Type.registerNamespace('Client');
////////////////////////////////////////////////////////////////////////////////
// Client.BuildSite
Client.BuildSite = function(gatewayServerAddress) {
	this.$scriptLoader = new Client.ScriptLoader();
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
Client.BuildSite.registerClass('Client.BuildSite', Object);
Client.ScriptLoader.registerClass('Client.ScriptLoader', Object);


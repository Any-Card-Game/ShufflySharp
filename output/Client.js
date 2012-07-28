
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
	this.$loadCss(url + 'lib/jquery-ui-1.8.20.custom.css');
	this.$loadCss(url + 'lib/codemirror/codemirror.css');
	this.$loadCss(url + 'lib/site.css');
	this.$loadCss(url + 'lib/codemirror/theme/night.css');
	this.$loadCss(url + 'lib/jqwidgets/styles/jqx.base.css');
	this.$scriptLoader.loadSync([url + 'lib/jquery-1.7.2.min.js', url + 'lib/jquery-ui-1.8.20.custom.min.js', url + 'lib/jqwidgets/scripts/gettheme.js', url + 'lib/jqwidgets/jqxcore.js'], Function.mkdel(this, function() {
		this.$scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], Function.mkdel(this, function() {
			this.$scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], Function.mkdel(this, this.$ready));
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
		$t1.set_visible(true);
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
	$loadCss: function(filename) {
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
			(script).onreadystatechange = function(a) {
				var b = script;
				if (ss.Nullable.unbox(Type.cast(b.readyState === 'loaded', Boolean))) {
					callback();
				}
			};
			(script).onload = function(a1) {
				callback();
			};
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
	this.$2$TextField = null;
	this.$2$ClickField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffButton.prototype = {
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
// Client.ShuffUI.ShuffCodeEditor
Client.ShuffUI.ShuffCodeEditor = function() {
	Client.ShuffUI.ShuffElement.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffElement
Client.ShuffUI.ShuffElement = function() {
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$WidthField = 0;
	this.$1$HeightField = 0;
	this.$1$ElementField = null;
	this.$visible = false;
	this.$visible = true;
};
Client.ShuffUI.ShuffElement.prototype = {
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	get_width: function() {
		return this.$1$WidthField;
	},
	set_width: function(value) {
		this.$1$WidthField = value;
	},
	get_height: function() {
		return this.$1$HeightField;
	},
	set_height: function(value) {
		this.$1$HeightField = value;
	},
	get_element: function() {
		return this.$1$ElementField;
	},
	set_element: function(value) {
		this.$1$ElementField = value;
	},
	get_visible: function() {
		return this.$visible;
	},
	set_visible: function(value) {
		if (ss.isValue(this.get_element())) {
			this.get_element().css('display', (this.$visible ? 'block' : 'none'));
		}
		this.$visible = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel
Client.ShuffUI.ShuffLabel = function() {
	this.$2$TextField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffLabel.prototype = {
	get_text: function() {
		return this.$2$TextField;
	},
	set_text: function(value) {
		this.$2$TextField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextBox
Client.ShuffUI.ShuffTextBox = function() {
	this.$2$LabelStyleField = null;
	this.$2$LabelField = null;
	this.$2$TextField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffTextBox.prototype = {
	get_labelStyle: function() {
		return this.$2$LabelStyleField;
	},
	set_labelStyle: function(value) {
		this.$2$LabelStyleField = value;
	},
	get_label: function() {
		return this.$2$LabelField;
	},
	set_label: function(value) {
		this.$2$LabelField = value;
	},
	get_text: function() {
		return this.$2$TextField;
	},
	set_text: function(value) {
		this.$2$TextField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffUIManager
Client.ShuffUI.ShuffUIManager = function() {
	this.$uiAreas = new Array();
};
Client.ShuffUI.ShuffUIManager.prototype = {
	createWindow: function(ui) {
		var windowID = ui.title;
		var outer = $('<div class=\'window-outer\' style=\'background-color: #87B6D9;\'></div>');
		($('body')).append(outer);
		ui.outer = outer;
		outer.css('position', 'absolute');
		outer.css('padding', '2em 0.8em 0.8em 1.3em');
		outer.css('left', ui.x + 'px');
		outer.css('top', ui.y + 'px');
		outer.css('width', ui.width + 'px');
		outer.css('height', ui.height + 'px');
		outer.css('di', ui.height + 'px');
		outer.css('display', ((ui.get_visible() === false) ? 'none' : 'block'));
		var top = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;  \'></div>');
		outer.append(top);
		var title = $('<div class=\'rounded\' style=\'margin:auto; background-color:white; width:40%; text-align:center;opacity:0.4;\'>' + ui.title + '</div>');
		top.append(title);
		var rightSideBar = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;\'></div>');
		top.append(rightSideBar);
		var x = $('<div class=\'rounded window-header-button window-close\' style=\'height:30px; vertical-align:top;background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>X</div> ');
		rightSideBar.append(x);
		var max = $('<div class=\'rounded window-header-button window-maximize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>[]</div>  ');
		rightSideBar.append(max);
		var min = $('<div class=\'rounded window-header-button window-minimize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>_</div>  ');
		rightSideBar.append(min);
		var inner = $('<div class=\'window-inner\' id=\'window' + windowID + '\' style=\'background-color: #FDFEFE;width:100%; height:100%; \'> </div> ');
		outer.append(inner);
		ui.set_$window(($('#window' + windowID)));
		this.$uiAreas.add({ Element: outer, Inner: inner });
		x.click(function(evt) {
			outer.css('display', 'none');
		});
		var toggleSize = false;
		max.click(function(evt1) {
			toggleSize = !toggleSize;
			if (toggleSize) {
				outer.css('width', '100%');
				outer.css('height', '100%');
				outer.css('left', '0px');
				outer.css('top', '0px');
			}
			else {
				outer.css('width', '100%');
				outer.css('height', '100%');
			}
		});
		($('.window-minimize')).click(function(evt2) {
			window.alert('3');
		});
		outer.mousedown(Function.mkdel(this, function(evt3) {
			for (var i = 0; i < this.$uiAreas.length; i++) {
				(this.$uiAreas[i]).element.CSS('z-index', 1800);
			}
			outer.css('z-index', 1900);
		}));
		($('.window-header-button')).button();
		if (!ui.static) {
			outer.draggable({
				cancel: '.window-inner, .CodeMirror, .CodeMirror-fullscreen, .CodeMirror-wrap, .CodeMirror-focused',
				containment: ('window'),
				start: function(evt4, o) {
				}
			});
			outer.resizable({
				handles: ('n, e, s, w, ne, se, sw, nw'),
				resize: function(evt5, o1) {
				}
			});
		}
		return ui;
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
	this.outer = null;
	this.static = false;
	Client.ShuffUI.ShuffElement.call(this);
	this.elements = new Array();
};
Client.ShuffUI.ShuffWindow.prototype = {
	get_$window: function() {
		return this.get_element();
	},
	set_$window: function(value) {
		this.set_element(value);
	},
	get_$outer: function() {
		return this.outer;
	},
	set_$outer: function(value) {
		this.outer = value;
		this.outer.resizable({ handles: ('n, e, s, w, ne, se, sw, nw') });
	},
	addButton: function(element) {
		this.elements.add(element);
		var but = $('<div></div>');
		element.set_element(but);
		this.get_$window().append(but);
		but.text(element.get_text());
		but.css('position', 'absolute');
		but.css('left', element.get_x() + 'px');
		but.css('top', element.get_y() + 'px');
		but.css('width', element.get_width() + 'px');
		but.css('height', element.get_height() + 'px');
		but.button();
		but.click(element.get_click());
		(but).disableSelection();
		but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
		return but;
	},
	addLabel: function(element) {
		this.elements.add(element);
		var but = $('<span></span>');
		element.set_element(but);
		this.get_$window().append(but);
		but.text(element.get_text());
		but.css('position', 'absolute');
		but.css('left', element.get_x() + 'px');
		but.css('top', element.get_y() + 'px');
		(but).disableSelection();
		but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
		return but;
	},
	addTextbox: function(element) {
		this.elements.add(element);
		var but = $('<input value=\'' + Object.coalesce(element.get_text(), '') + '\' />');
		element.set_element(but);
		this.get_$window().append(but);
		but.text(element.get_text());
		but.css('position', 'absolute');
		but.css('left', element.get_x() + 'px');
		but.css('top', element.get_y() + 'px');
		but.css('width', element.get_width() + 'px');
		but.css('height', element.get_height() + 'px');
		(but).disableSelection();
		if (ss.isValue(element.get_label())) {
			var lbl = $('<span style=\'' + element.get_labelStyle() + '\'></span>');
			lbl.text(element.get_label());
			this.get_$window().append(lbl);
			lbl.css('position', 'absolute');
			lbl.css('left', element.get_x() - lbl.width());
			lbl.css('top', element.get_y() + 2);
			(lbl).disableSelection();
		}
		but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
		return but;
	},
	addCodeEditor: function(element) {
		this.elements.add(element);
		//
		//             options = objMerge({ width: '100%', height: '100%' }, options);
		//
		//             var divs = $('<div style="width:' + options.width + '; height:' + options.height + ';"> </div>');
		//
		//             self.element.append(divs);
		//
		//             
		//
		//             divs.append('<textarea id="code" name="code" class="CodeMirror-fullscreen " style=""></textarea>');
		//
		//             
		//
		//             
		//
		//             var codeMirror = document.getElementById("code");
		//
		//             codeMirror.value = '';
		//
		//             var editor = CodeMirror.fromTextArea(codeMirror, {
		//
		//             lineNumbers: options.lineNumbers,
		//
		//             lineWrapping: true,
		//
		//             matchBrackets: true,
		//
		//             onGutterClick: function (cm, n) {
		//
		//             var info = cm.lineInfo(n);
		//
		//             if (info.markerText) {
		//
		//             window.shuffUIManager.codeArea.breakPoints.splice(window.shuffUIManager.codeArea.breakPoints.indexOf(n-1), 0);
		//
		//             cm.clearMarker(n);
		//
		//             } else {
		//
		//             window.shuffUIManager.codeArea.breakPoints.push(n-1);
		//
		//             cm.setMarker(n, "<span style=\"color: #900\">●</span> %N%");
		//
		//             }
		//
		//             },
		//
		//             extraKeys: {
		//
		//             "Ctrl-Space": function (cm) {
		//
		//             CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);
		//
		//             },
		//
		//             "Ctrl-I": function (cm) {
		//
		//             var pos = cm.getCursor();
		//
		//             cm.setValue(window.fjs.format(cm.getValue()));
		//
		//             cm.setCursor(pos);
		//
		//             
		//
		//             }
		//
		//             },
		//
		//             
		//
		//             onCursorActivity: function () {
		//
		//             editor.setLineClass(hlLine, null);
		//
		//             hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
		//
		//             },
		//
		//             onFocus: function (editor) {
		//
		//             
		//
		//             },
		//
		//             onBlur: function (editor) {
		//
		//             }
		//
		//             });
		//
		//             
		//
		//             var hlLine = editor.setLineClass(0, "activeline");
		//
		//             
		//
		//             var scroller = editor.getScrollerElement();
		//
		//             scroller.style.height = divs[0].offsetHeight + "px";
		//
		//             scroller.style.width = divs[0].offsetWidth + "px";
		//
		//             editor.refresh();
		//
		//             editor.setOption("theme", "night");
		//
		//             /*(function (outer, scroller) {
		//
		//             
		//
		//             outer.resizable({
		//
		//             handles: "n, e, s, w, ne, se, sw, nw",
		//
		//             resize: function () {
		//
		//             scroller.style.height = divs[0].offsetHeight + "px";
		//
		//             scroller.style.width = divs[0].offsetWidth + "px";
		//
		//             
		//
		//             }
		//
		//             });
		//
		//             })(self.outer,scroller);* /
		//
		//             
		//
		//             editor.codeElement = codeMirror;
		//
		//             return editor;
		return null;
	},
	addListBox: function(element) {
		this.elements.add(element);
		var but = $('<div></div>');
		element.set_element(but);
		this.get_$window().append(but);
		but.text(element.get_text());
		but.css('position', 'absolute');
		but.css('left', element.get_x() + 'px');
		but.css('top', element.get_y() + 'px');
		var theme = 'getTheme()';
		return but;
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
Client.ShuffUI.ShuffElement.registerClass('Client.ShuffUI.ShuffElement', Object);
Client.ShuffUI.ShuffLabel.registerClass('Client.ShuffUI.ShuffLabel', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffTextBox.registerClass('Client.ShuffUI.ShuffTextBox', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffUIManager.registerClass('Client.ShuffUI.ShuffUIManager', Object);
Client.ShuffUI.ShuffWindow.registerClass('Client.ShuffUI.ShuffWindow', Client.ShuffUI.ShuffElement);
Globals.registerClass('Globals', Object);
Client.ShuffUI.ShuffButton.registerClass('Client.ShuffUI.ShuffButton', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffCodeEditor.registerClass('Client.ShuffUI.ShuffCodeEditor', Client.ShuffUI.ShuffElement);


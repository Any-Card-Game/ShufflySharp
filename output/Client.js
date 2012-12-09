
////////////////////////////////////////////////////////////////////////////////
// Client.Globals
var $Globals = function() {
};
////////////////////////////////////////////////////////////////////////////////
// LoginUI
var $LoginUI = function(shuffUIManager) {
	var $t1 = new (Type.makeGenericType($Client_ShuffUI_ShuffWindow$1, [Object]))();
	$t1.title = 'Login';
	$t1.set_x($('body').innerWidth() - 500);
	$t1.set_y(100);
	$t1.set_width($Client_ShuffUI_Number.op_Implicit$2(400));
	$t1.set_height($Client_ShuffUI_Number.op_Implicit$2(400));
	$t1.allowClose = true;
	$t1.allowMinimize = true;
	$t1.set_visible(true);
	var loginScreen = shuffUIManager.createWindow(Object).call(shuffUIManager, $t1);
	var loginName;
	var password;
	loginScreen.addElement(loginName = new $Client_ShuffUI_ShuffTextbox(140, 40, $Client_ShuffUI_Number.op_Implicit$2(150), $Client_ShuffUI_Number.op_Implicit$2(30), '', 'Username', null));
	loginScreen.addElement(password = new $Client_ShuffUI_ShuffTextbox(140, 75, $Client_ShuffUI_Number.op_Implicit$2(150), $Client_ShuffUI_Number.op_Implicit$2(30), '', 'Password', null));
	loginScreen.addElement(new $Client_ShuffUI_ShuffButton(40, 150, $Client_ShuffUI_Number.op_Implicit$2(250), $Client_ShuffUI_Number.op_Implicit$2(30), Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit$2('Login'), function(e) {
		window.alert(loginName.get_text() + '  ' + password.get_text());
	}));
};
////////////////////////////////////////////////////////////////////////////////
// Client.BuildSite
var $Client_BuildSite = function(gatewayServerAddress) {
	this.$gatewayServerAddress = null;
	this.codeArea = null;
	this.devArea = null;
	this.home = null;
	this.questionArea = null;
	this.$shuffUIManager = null;
	this.selectedGame = 'Sevens';
	$Client_BuildSite.instance = this;
	this.$gatewayServerAddress = gatewayServerAddress;
	var url = 'http://50.116.22.241:8881/';
	window.topLevel = url;
	$Client_BuildSite.$loadJunk(url, Function.mkdel(this, this.$ready));
};
$Client_BuildSite.prototype = {
	$ready: function() {
		var elem = document.getElementById('loading');
		elem.parentNode.removeChild(elem);
		var stats = new xStats();
		document.body.appendChild(stats.element);
		window.setTimeout(function() {
			$('.xstats').css('right', '0px');
			$('.xstats').css('position', 'absolute');
			$('.xstats').css('z-index', '9998!important');
			$('.xstats').children().css('z-index', '9998!important');
		}, 1000);
		var pageHandler = new $Client_PageHandler(this.$gatewayServerAddress, this);
		var shuffUIManager = new $Client_ShuffUI_ShuffUIManager();
		this.$shuffUIManager = shuffUIManager;
		new $LoginUI(shuffUIManager);
	}
};
$Client_BuildSite.$loadJunk = function(url, ready) {
	var scriptLoader = new $Client_ScriptLoader();
	$Client_ScriptLoader.loadCss(url + 'lib/jquery-ui-1.8.20.custom.css');
	$Client_ScriptLoader.loadCss(url + 'lib/codemirror/codemirror.css');
	$Client_ScriptLoader.loadCss(url + 'lib/site.css');
	$Client_ScriptLoader.loadCss(url + 'lib/codemirror/theme/night.css');
	$Client_ScriptLoader.loadCss(url + 'lib/jqwidgets/styles/jqx.base.css');
	scriptLoader.loadSync([url + 'lib/jquery-1.7.2.min.js', url + 'lib/jquery-ui-1.8.20.custom.min.js', url + 'lib/jqwidgets/scripts/gettheme.js', url + 'lib/jqwidgets/jqxcore.js'], function() {
		scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], false, function() {
			scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], false, function() {
				scriptLoader.load([url + 'CommonLibraries.js', url + 'ShuffleGameLibrary.js', url + 'Models.js'], true, function() {
					scriptLoader.load([url + 'lib/RawDeflate.js'], true, ready);
				});
			});
		});
	});
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameCanvasInformation
var $Client_GameCanvasInformation = function() {
	this.canvas = null;
	this.domCanvas = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameInfo
var $Client_GameInfo = function() {
	this.roomID = '-1';
};
////////////////////////////////////////////////////////////////////////////////
// Client.Gateway
var $Client_Gateway = function(gatewayServer) {
	this.$channels = null;
	this.gatewaySocket = null;
	this.$channels = new Object();
	var someChannels = this.$channels;
	this.gatewaySocket = io.connect(gatewayServer);
	this.gatewaySocket.on('Client.Message', function(data) {
		someChannels[data.channel](data.content);
	});
};
$Client_Gateway.prototype = {
	emit: function(channel, content, gameServer) {
		this.gatewaySocket.emit('Gateway.Message', Models.GatewayMessageModel.$ctor(channel, content, gameServer));
	},
	on: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	login: function(userName) {
		var $t2 = this.gatewaySocket;
		var $t1 = new Models.UserModel();
		$t1.userName = userName;
		$t2.emit('Gateway.Login', $t1);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageGameContext
var $Client_PageGameContext = function(context, canvasInfo) {
	this.context = null;
	this.canvasInfo = null;
	this.context = context;
	this.canvasInfo = canvasInfo;
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageHandler
var $Client_PageHandler = function(gatewayServerAddress, buildSite) {
	this.$buildSite = null;
	this.$cardImages = null;
	this.cards = {};
	this.$endTime = 0;
	this.gameStuff = null;
	this.gateway = null;
	this.$numOfTimes = 0;
	this.$resetStyles = ['border-radius', '-moz-border-radius', 'left', 'top', '-webkit-border-radius', 'box-shadow', '-moz-box-shadow', 'transform', '-webkit-transform', 'padding', 'background-color', 'border'];
	this.spaces = {};
	this.$startTime = 0;
	this.$timeValue = 0;
	this.$buildSite = buildSite;
	this.gameStuff = new $Client_GameInfo();
	this.$startTime = Date.get_now();
	//            Window.SetTimeout(() => { buildSite.devArea.Data.beginGame(); }, 2000);
	this.gateway = new $Client_Gateway(gatewayServerAddress);
	this.gateway.on('Area.Main.Login.Response', function(data) {
		window.alert(JSON.stringify(data));
	});
	this.gateway.on('Area.Lobby.ListCardGames.Response', function(data1) {
	});
	this.gateway.on('Area.Lobby.ListRooms.Response', function(data2) {
		console.log(data2);
	});
	var randomName = '';
	var ra = Math.random() * 10;
	for (var i = 0; i < ra; i++) {
		randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
	}
	this.gateway.login(randomName);
	this.gateway.on('Area.Debug.GetGameSource.Response', Function.mkdel(this, function(data3) {
		var endTime = new Date();
		var time = endTime - this.$startTime;
		this.$numOfTimes++;
		this.$timeValue += time;
		buildSite.devArea.data.lblHowFast.set_text('Time Taken: ' + ss.Int32.div(this.$timeValue, this.$numOfTimes));
		buildSite.codeArea.data.codeEditor.information.editor.setValue(data3.content);
		buildSite.codeArea.data.codeEditor.information.editor.setMarker(0, '<span style="color: #900">&nbsp;&nbsp;</span> %N%');
		buildSite.codeArea.data.codeEditor.information.editor.refresh();
	}));
	this.$cardImages = {};
	for (var i1 = 101; i1 < 153; i1++) {
		var img = new Image();
		var domain = window.topLevel + 'assets';
		var src = domain + '/cards/' + i1;
		var jm;
		img.src = jm = Type.cast(src + '.gif', String);
		this.$cardImages[jm] = img;
	}
	var dvGame;
	$('body').append(dvGame = document.createElement('div'));
	dvGame.id = 'dvGame';
	dvGame.style.left = '50%';
	dvGame.style.position = 'absolute';
	dvGame.style.top = '0';
	dvGame.style.right = '0';
	dvGame.style.bottom = '0';
	document.body.addEventListener('contextmenu', function(e) {
		//e.PreventDefault();
		//todo: Special right click menu;
	}, false);
	//ie8
	//   {
	//   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;
	//   
	//   var m = (Action<string, ElementEventHandler>)d2;
	//   m("contextmenu", () =>
	//   {
	//   
	//   });
	//   }
};
$Client_PageHandler.prototype = {
	startGameServer: function() {
		this.gateway.on('Area.Game.RoomInfo', Function.mkdel(this, function(data) {
			this.gameStuff.roomID = data.roomID;
			this.$buildSite.home.data.loadRoomInfo(data);
			this.$buildSite.devArea.data.loadRoomInfo(data);
		}));
		//
		//                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
		//
		//                        {
		//
		//                        buildSite.home.Data.loadRoomInfos(data);
		//
		//                        
		//
		//                        });
		this.gateway.on('Area.Debug.Log', Function.mkdel(this, function(data1) {
			this.$buildSite.home.data.loadRoomInfos(data1);
			var lines = this.$buildSite.codeArea.data.console.information.editor.getValue().split('\n');
			lines = lines.extract(lines.length - 40, 40);
			this.$buildSite.codeArea.data.console.information.editor.setValue(lines.join('\n') + '\n' + data1.value);
			this.$buildSite.codeArea.data.console.information.editor.setCursor(this.$buildSite.codeArea.data.console.information.editor.lineCount(), 0);
		}));
		this.gateway.on('Area.Debug.Break', Function.mkdel(this, function(data2) {
			this.$buildSite.home.data.loadRoomInfos(data2);
			var cm = this.$buildSite.codeArea.data.codeEditor;
			cm.information.editor.clearMarker(data2.lineNumber);
			cm.information.editor.setMarker(data2.lineNumber, '<span style="color: #059">●</span> %N%');
			cm.information.editor.setCursor(data2.lineNumber + 15, 0);
			cm.information.editor.setCursor(data2.lineNumber - 15, 0);
			cm.information.editor.setCursor(data2.lineNumber, 0);
		}));
		//
		//                        gateway.On("Area.Debug.VariableLookup.Response", data =>
		//
		//                        {
		//
		//                        Window.Alert(Json.Stringify(data));
		//
		//                        });
		this.gateway.on('Area.Game.AskQuestion', Function.mkdel(this, function(data3) {
			this.$buildSite.questionArea.data.load(data3);
			//alert(JSON.stringify(data));
			this.$endTime = new Date();
			var time = this.$endTime - this.$startTime;
			this.$buildSite.devArea.data.lblHowFast.set_text('how long: ' + time);
			window.setTimeout(Function.mkdel(this, function() {
				this.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(this.gameStuff.roomID, 1), this.$buildSite.devArea.data.gameServer);
				this.$buildSite.questionArea.set_visible(false);
				this.$startTime = new Date();
			}), 200);
		}));
		this.gateway.on('Area.Game.UpdateState', Function.mkdel(this, function(data21) {
			var data4 = JSON.parse((new Compressor()).DecompressText(data21));
			//  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
			for (var $t1 = 0; $t1 < data4.spaces.length; $t1++) {
				var space = data4.spaces[$t1];
				space.appearance = this.$fixAppearance(space.appearance);
				for (var $t2 = 0; $t2 < space.pile.cards.length; $t2++) {
					var card = space.pile.cards[$t2];
					card.appearance = this.$fixAppearance(card.appearance);
				}
			}
			this.drawArea(data4);
		}));
		this.gateway.on('Area.Game.Started', function(data5) {
			//alert(JSON.stringify(data));
		});
		this.gateway.on('Area.Game.GameOver', function(data6) {
		});
		this.gateway.on('Area.Debug.GameOver', function(data7) {
		});
	},
	$fixAppearance: function(appearance) {
		return global.Appearance.fromJson(appearance);
	},
	drawArea: function(mainArea) {
		this.$newDrawArea(mainArea);
		for (var $t1 = 0; $t1 < mainArea.textAreas.length; $t1++) {
			var ta = mainArea.textAreas[$t1];
			//  gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
			//  gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
		}
	},
	$findSpace: function(space) {
		var id = 'dv_space_' + space.name;
		if (ss.isValue(this.spaces[id])) {
			return this.spaces[id];
		}
		else {
			var sp = document.createElement('div');
			sp.id = id;
			sp.style.position = 'absolute';
			$('#dvGame').append(sp);
			return this.spaces[id] = new global.SpaceDrawing(sp);
		}
	},
	$findCard: function(wantedSpace, card) {
		var id = 'dv_card_' + card.type + '_' + card.value;
		var space = this.$findSpace(wantedSpace);
		var doc;
		if (ss.isValue(this.cards[id])) {
			var m = document.getElementById(id);
			if (!ss.referenceEquals(m.parentNode, space.outerElement)) {
				m.parentNode.removeChild(m);
				space.outerElement.appendChild(m);
			}
			doc = this.cards[id];
		}
		else {
			var sp = document.createElement('div');
			sp.id = id;
			$(space.outerElement).append(sp);
			var cardImage = this.$cloneImage(this.$cardImages[this.drawCard(card)]);
			sp.appendChild(cardImage);
			sp.style.position = 'absolute';
			doc = this.cards[id] = new global.CardDrawing(sp);
		}
		return doc;
	},
	$newDrawArea: function(mainArea) {
		//jQuery.Select("#dvGame").Children().Remove();
		var scale = new CommonLibraries.Point(ss.Int32.div(ss.Int32.div(document.documentElement.clientWidth, 2), mainArea.size.width), ss.Int32.div(document.documentElement.clientHeight - 100, mainArea.size.height));
		//ExtensionMethods.debugger(null);
		var sl = mainArea.spaces.length;
		//
		//            for (int spaceIndex = 0; spaceIndex < sl; spaceIndex++)
		//
		//            {
		//
		//            var space = mainArea.Spaces[spaceIndex];
		//
		//            var jf = findSpace(space).OuterElement;
		//
		//            
		//
		//            for (int i = 0; i < resetStyles.Length; i++)
		//
		//            {
		//
		//            jf.Style[resetStyles[i]] = null;
		//
		//            }
		//
		//            
		//
		//            l = space.Pile.Cards.Count;
		//
		//            for (int index = 0; index < l; index++)
		//
		//            {
		//
		//            var card = space.Pile.Cards[index];
		//
		//            var m = findCard(space, card);
		//
		//            
		//
		//            for (int i = 0; i < resetStyles.Length; i++)
		//
		//            {
		//
		//            m.OuterElement.Style[resetStyles[i]] = null;
		//
		//            m.Image.Style[resetStyles[i]] = null;
		//
		//            }
		//
		//            }
		//
		//            }
		for (var index = 0; index < sl; index++) {
			var space = mainArea.spaces[index];
			var vertical = space.vertical;
			var spaceDiv = this.$findSpace(space);
			// var spaceDivJ = jQuery.FromElement(spaceDiv);
			//ExtensionMethods.debugger();
			var cl = space.appearance.effects.length;
			for (var i = 0; i < cl; i++) {
				var effect = space.appearance.effects[i];
				effect.build$1(spaceDiv);
			}
			spaceDiv.outerElementStyle.set_width(global.domUtils.px(space.width * scale.x));
			spaceDiv.outerElementStyle.set_height(global.domUtils.px(space.height * scale.y));
			//   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);
			var spaceScale = new CommonLibraries.Point(space.width / space.pile.cards.length, space.height / space.pile.cards.length);
			var j = 0;
			var numOfCards = space.pile.cards.length;
			for (var i1 = 0; i1 < numOfCards; i1++) {
				var card = space.pile.cards[i1];
				var xx = 0;
				var yy = 0;
				switch (space.resizeType) {
					case 1: {
						if (vertical) {
							yy = card.value * scale.y / 2;
						}
						else {
							xx = card.value * scale.x / 2;
						}
						break;
					}
					case 0: {
						xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
						break;
					}
				}
				var cardDiv = this.$findCard(space, card);
				xx -= global.domUtils.nopx(cardDiv.outerElementStyle.get_width()) / 2;
				yy -= global.domUtils.nopx(cardDiv.outerElementStyle.get_height()) / 2;
				cardDiv.outerElementStyle.set_borderRadius('5px');
				cardDiv.outerElementStyle.set_boxShadow('3px 3px 2px #2c2c2c');
				this.$styleAppearanceFromSpace(cardDiv, j, space);
				this.$styleAppearance(cardDiv, card.appearance);
				spaceDiv.outerElementStyle.set_left(global.domUtils.px(space.x * scale.x));
				spaceDiv.outerElementStyle.set_top(global.domUtils.px(space.y * scale.y));
				//cardDiv.OuterElement.Style["transform"] = 0.0.TransformRotate();
				cardDiv.outerElementStyle.set_left(global.domUtils.px(xx + (vertical ? (space.width * scale.x / 2) : 0)));
				cardDiv.outerElementStyle.set_top(global.domUtils.px(yy + (!vertical ? (space.height * scale.y / 2) : 0)));
				cardDiv.outerElementStyle.set_transform(global.domUtils.transformRotate(space.appearance.innerStyle.rotate));
				cardDiv.outerElementStyle.setStyle(cardDiv.outerElement);
				this.fixBrowserPrefixes(cardDiv.outerElement.style);
				//                    spaceDiv.AppendChild(cardDiv);
				j++;
				//effects
			}
			var el = space.appearance.effects.length;
			for (var i2 = 0; i2 < el; i2++) {
				var effect1 = space.appearance.effects[i2];
				effect1.tearDown$1(spaceDiv);
			}
		}
		for (var $t1 = 0; $t1 < mainArea.spaces.length; $t1++) {
			var space1 = mainArea.spaces[$t1];
			this.$findSpace(space1).outerElementStyle.setStyle(this.$findSpace(space1).outerElement);
			for (var $t2 = 0; $t2 < space1.pile.cards.length; $t2++) {
				var card1 = space1.pile.cards[$t2];
				//                    var m = findCard(space, card);
				this.$findSpace(space1).outerElementStyle.setStyle(this.$findSpace(space1).outerElement);
				//
				//                    m.ImageStyle = new MyStyle();
				//
				//                    m.OuterElementStyle = new MyStyle();
			}
		}
		//
		//
		//            foreach (var ta in mainArea.TextAreas)
		//
		//
		//            {
		//
		//
		//            gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
		//
		//
		//            gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
		//
		//
		//            }
	},
	$styleAppearanceFromSpace: function(element, cardIndex, space) {
		var appearance = space.appearance;
		for (var $t1 = 0; $t1 < appearance.effects.length; $t1++) {
			var cardGameAppearanceEffect = appearance.effects[$t1];
			//   cardGameAppearanceEffect.Build(element.Item1);
			switch (cardGameAppearanceEffect.type) {
				case 2: {
					var bEffect = Type.cast(cardGameAppearanceEffect, global.Effect$Bend);
					var trans = element.outerElementStyle.get_transform();
					if (ss.coalesce(trans, '').startsWith('rotate(')) {
						element.outerElementStyle.set_transform(global.domUtils.transformRotate(-bEffect.degrees / 2 + bEffect.degrees / (space.pile.cards.length - 1) * cardIndex + global.domUtils.noTransformRotate(trans)));
					}
					else {
						element.outerElementStyle.set_transform(global.domUtils.transformRotate(appearance.innerStyle.rotate));
					}
					break;
				}
			}
		}
		element.outerElementStyle.set_backgroundColor(appearance.innerStyle.backColor);
	},
	$styleAppearance: function(element, appearance) {
		for (var $t1 = 0; $t1 < appearance.effects.length; $t1++) {
			var cardGameAppearanceEffect = appearance.effects[$t1];
			cardGameAppearanceEffect.build(element);
			//new object().debugger();
			cardGameAppearanceEffect.tearDown(element);
		}
		//rotate
		var trans = element.outerElementStyle.get_transform();
		if (ss.coalesce(trans, '').startsWith('rotate(')) {
			element.outerElementStyle.set_transform(String.format('rotate({0}deg)', appearance.innerStyle.rotate + parseInt(trans.replaceAll('rotate(', '').replaceAll('deg)', ''))));
		}
		else {
			element.outerElementStyle.set_transform(String.format('rotate({0}deg)', appearance.innerStyle.rotate));
		}
		element.outerElementStyle.set_backgroundColor(appearance.innerStyle.backColor);
	},
	fixBrowserPrefixes: function(cardImage) {
		if (ss.isValue(cardImage['transform'])) {
			cardImage['-webkit-transform'] = cardImage['transform'];
		}
		if (ss.isValue(cardImage['box-shadow'])) {
			cardImage['-moz-box-shadow'] = cardImage['box-shadow'];
			cardImage['-webkit-box-shadow'] = cardImage['box-shadow'];
		}
		if (ss.isValue(cardImage['border-radius'])) {
			cardImage['-moz-border-radius'] = cardImage['box-shadow'];
			cardImage['-webkit-border-radius'] = cardImage['box-shadow'];
		}
	},
	$cloneImage: function(cardImage) {
		var img = new Image();
		img.src = cardImage.src;
		return img;
	},
	drawCard: function(card) {
		var src = '';
		var domain = window.topLevel + 'assets';
		src = Type.cast(domain + '/cards/' + (100 + (card.value + 1) + card.type * 13), String);
		return src + '.gif';
	},
	canvasOnClick: function(e) {
		e.preventDefault();
	},
	canvasMouseMove: function(e) {
		e.preventDefault();
		document.body.style.cursor = 'default';
	},
	canvasMouseUp: function(e) {
		e.preventDefault();
	},
	handleScroll: function(e) {
		e.preventDefault();
	},
	clearCache: function() {
		this.cards = {};
		this.spaces = {};
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ScriptLoader
var $Client_ScriptLoader = function() {
};
$Client_ScriptLoader.prototype = {
	$loadScript: function(url, cache, callback) {
		cache = false;
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url + (cache ? ('?' + Math.floor(Math.random() * 10000)) : '');
		//caching
		if (ss.isValue(callback)) {
			script.onreadystatechange = function(a) {
				if (!!(script.readyState === 'loaded' || script.readyState === 'complete')) {
					callback();
				}
			};
			script.onload = function(a1) {
				callback();
			};
		}
		head.appendChild(script);
	},
	load: function(items, cache, done) {
		var counter = 0;
		for (var i = 0; i < items.length; i++) {
			this.$loadScript(items[i], cache, function() {
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
				this.$loadScript(items[counter], false, nextOne);
			}
		});
		this.$loadScript(items[0], false, nextOne);
	}
};
$Client_ScriptLoader.loadCss = function(filename) {
	var fileref = document.createElement('link');
	fileref.setAttribute('rel', 'stylesheet');
	fileref.setAttribute('type', 'text/css');
	fileref.setAttribute('href', filename);
	document.getElementsByTagName('head')[0].appendChild(fileref);
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.CodeAreaInformation
var $Client_Information_CodeAreaInformation = function() {
	this.codeEditor = null;
	this.console = null;
	this.breakPoints = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.DevAreaInformation
var $Client_Information_DevAreaInformation = function() {
	this.txtNumOfPlayers = null;
	this.loadRoomInfo = null;
	this.varText = null;
	this.lblAnother = null;
	this.lblHowFast = null;
	this.gameServer = null;
	this.beginGame = null;
	this.joined = 0;
	this.created = false;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.HomeAreaInformation
var $Client_Information_HomeAreaInformation = function() {
	this.loadRoomInfos = null;
	this.userList = null;
	this.gameList = null;
	this.txtUserName = null;
	this.btnStartGame = null;
	this.loadRoomInfo = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.QuestionAreaInformation
var $Client_Information_QuestionAreaInformation = function() {
	this.question = null;
	this.answerBox = null;
	this.load = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ButtonClickedEvent
var $Client_ShuffUI_ButtonClickedEvent = function() {
};
$Client_ShuffUI_ButtonClickedEvent.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.CodeMirrorInformation
var $Client_ShuffUI_CodeMirrorInformation = function() {
	this.codeElement = null;
	this.editor = null;
	this.element = null;
	this.data = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.CodeMirrorInformationData
var $Client_ShuffUI_CodeMirrorInformationData = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.DelegateOrValue
var $Client_ShuffUI_DelegateOrValue$1 = function(T) {
	var $type = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$oldValue = T.getDefaultValue();
		this.$1$StaticValueChangesField = null;
		this.$method = d;
		this.isValue = false;
		this.$oldValue = this.$method();
	};
	$type.prototype = {
		get_staticValueChanges: function() {
			return this.$1$StaticValueChangesField;
		},
		set_staticValueChanges: function(value) {
			this.$1$StaticValueChangesField = value;
		},
		$evaluate: function() {
			if (this.isValue === true) {
				return this.$value;
			}
			else if (this.isValue === false) {
				var val = this.$method();
				if (val !== this.$oldValue) {
					this.get_staticValueChanges()(val);
				}
				this.$oldValue = val;
				return val;
			}
			return T.getDefaultValue();
		}
	};
	$type.$ctor1 = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$oldValue = T.getDefaultValue();
		this.$1$StaticValueChangesField = null;
		this.$value = d;
		this.isValue = true;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.op_Implicit$2 = function(d) {
		return new (Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [T]).$ctor1)(d);
	};
	$type.op_Implicit$1 = function(d) {
		return new (Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [T]))(d);
	};
	$type.op_Implicit = function(d) {
		return d.$evaluate();
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_DelegateOrValue$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.DelegateOrValue$1', $Client_ShuffUI_DelegateOrValue$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ItemClickedEvent
var $Client_ShuffUI_ItemClickedEvent = function() {
};
$Client_ShuffUI_ItemClickedEvent.$ctor = function(item) {
	var $this = {};
	$this.item = null;
	$this.item = item;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.Number
var $Client_ShuffUI_Number = function(s) {
	this.$value = null;
	this.$value = s.toString();
};
$Client_ShuffUI_Number.$ctor1 = function(s) {
	this.$value = null;
	this.$value = s;
};
$Client_ShuffUI_Number.$ctor1.prototype = $Client_ShuffUI_Number.prototype;
$Client_ShuffUI_Number.op_Implicit = function(d) {
	return parseFloat(d.$value);
};
$Client_ShuffUI_Number.op_Implicit$3 = function(d) {
	return new $Client_ShuffUI_Number.$ctor1(d);
};
$Client_ShuffUI_Number.op_Implicit$2 = function(d) {
	return new $Client_ShuffUI_Number(d);
};
$Client_ShuffUI_Number.op_Implicit$1 = function(d) {
	return ((d.$value.indexOf('%') < 0) ? (d.$value + 'px') : d.$value);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ParentChangedEvent
var $Client_ShuffUI_ParentChangedEvent = function() {
};
$Client_ShuffUI_ParentChangedEvent.$ctor = function(parent) {
	var $this = {};
	$this.parent = null;
	$this.parent = parent;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.PositionChangedEvent
var $Client_ShuffUI_PositionChangedEvent = function() {
};
$Client_ShuffUI_PositionChangedEvent.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
var $Client_ShuffUI_ShuffButton = function(x, y, width, height, text, click) {
	this.$myText = null;
	this.text = null;
	$Client_ShuffUI_ShuffElement.call(this);
	this.element = $('<div></div>');
	this.element.css('position', 'absolute');
	this.text = text;
	this.text.set_staticValueChanges(Function.combine(this.text.get_staticValueChanges(), Function.mkdel(this, function(value) {
		this.element.text(value);
	})));
	this.element.text(Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit(this.text));
	this.set_x(x);
	this.set_y(y);
	this.set_width(width);
	this.set_height(height);
	this.set_visible(true);
	this.element.button();
	this.element.click(function(a) {
		click($Client_ShuffUI_ButtonClickedEvent.$ctor(a.clientX, a.clientY));
	});
	this.element.disableSelection();
};
$Client_ShuffUI_ShuffButton.prototype = {
	bindCustomEvents: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
var $Client_ShuffUI_ShuffButton$1 = function(T) {
	var $type = function(data, x, y, width, height, text, click) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffButton.call(this, x, y, width, height, text, click);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffButton$1, [T], function() {
		return $Client_ShuffUI_ShuffButton;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffButton$1', $Client_ShuffUI_ShuffButton$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditor
var $Client_ShuffUI_ShuffCodeEditor = function() {
	this.information = null;
	this.$codeMirror = null;
	this.$2$TextChangedField = null;
	this.text = null;
	this.lineNumbers = false;
	$Client_ShuffUI_ShuffElement.call(this);
	this.set_width($Client_ShuffUI_Number.op_Implicit$3('100%'));
	this.set_height($Client_ShuffUI_Number.op_Implicit$3('100%'));
};
$Client_ShuffUI_ShuffCodeEditor.prototype = {
	get_textChanged: function() {
		return this.$2$TextChangedField;
	},
	set_textChanged: function(value) {
		this.$2$TextChangedField = value;
	},
	bindCustomEvents: function() {
		this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
			this.element.text(e.text);
		})));
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(ev) {
			if (ss.isValue(ev.parent)) {
				var hlLine = null;
				this.$codeMirror.editor = CodeMirror.fromTextArea(this.$codeMirror.element, {
					lineNumbers: this.lineNumbers,
					lineWrapping: true,
					matchBrackets: true,
					onGutterClick: function(cm, n, e1) {
						var info = cm.lineInfo(n);
						if (info.markerText) {
							$Client_BuildSite.instance.codeArea.data.breakPoints.extract($Client_BuildSite.instance.codeArea.data.breakPoints.indexOf(n - 1), 0);
							cm.clearMarker(n);
						}
						else {
							$Client_BuildSite.instance.codeArea.data.breakPoints.add(n - 1);
							cm.setMarker(n, '<span style="color= #900">●</span> %N%');
						}
					},
					onCursorActivity: Function.mkdel(this, function(e2) {
						this.$codeMirror.editor.setLineClass(hlLine, null);
						hlLine = this.$codeMirror.editor.setLineClass(this.$codeMirror.editor.getCursor().line, 'activeline');
					}),
					onFocus: function(e3) {
					},
					onBlur: function(e4) {
					}
				});
				hlLine = this.$codeMirror.editor.setLineClass(0, 'activeline');
				var scroller = this.$codeMirror.editor.getScrollerElement();
				scroller.style.height = this.element[0].offsetHeight + 'px';
				scroller.style.width = this.element[0].offsetWidth + 'px';
				this.$codeMirror.editor.refresh();
				this.$codeMirror.editor.setOption('theme', 'night');
				this.information = this.$codeMirror;
			}
			else {
			}
		}));
	}
};
$Client_ShuffUI_ShuffCodeEditor.$ctor1 = function(x, y, width, height, text) {
	this.information = null;
	this.$codeMirror = null;
	this.$2$TextChangedField = null;
	this.text = null;
	this.lineNumbers = false;
	$Client_ShuffUI_ShuffElement.call(this);
	var fmw = width;
	var fmh = height;
	if (!!!fmw) {
		width = $Client_ShuffUI_Number.op_Implicit$3('100%');
	}
	if (!!!fmh) {
		height = $Client_ShuffUI_Number.op_Implicit$3('100%');
	}
	var divs = $('<div style=\'width:' + $Client_ShuffUI_Number.op_Implicit$1(width) + '; height:' + $Client_ShuffUI_Number.op_Implicit$1(height) + '\'> </div>');
	var fm = $('<textarea id=\'code\' name=\'code\' class=\'CodeMirror-fullscreen \' style=\'\'></textarea>');
	divs.append(fm);
	this.element = divs;
	var $t1 = new $Client_ShuffUI_CodeMirrorInformation();
	$t1.element = fm.get(0);
	this.$codeMirror = $t1;
	this.$codeMirror.element.value = this.text = text;
	this.lineNumbers = true;
	this.set_x(x);
	this.set_y(y);
	this.set_width(width);
	this.set_height(height);
	this.set_visible(true);
	this.sizeChanged = Function.combine(this.sizeChanged, Function.mkdel(this, function(e) {
		$(this.$codeMirror.element).width($Client_ShuffUI_Number.op_Implicit$1(e.width));
		$(this.$codeMirror.element).height($Client_ShuffUI_Number.op_Implicit$1(e.height));
	}));
};
$Client_ShuffUI_ShuffCodeEditor.$ctor1.prototype = $Client_ShuffUI_ShuffCodeEditor.prototype;
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditor
var $Client_ShuffUI_ShuffCodeEditor$1 = function(T) {
	var $type = function(data, x, y, width, height, text) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffCodeEditor.$ctor1.call(this, x, y, width, height, text);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffCodeEditor$1, [T], function() {
		return $Client_ShuffUI_ShuffCodeEditor;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffCodeEditor$1', $Client_ShuffUI_ShuffCodeEditor$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffElement
var $Client_ShuffUI_ShuffElement = function() {
	this.parentChanged = null;
	this.positionChanged = null;
	this.sizeChanged = null;
	this.visibleChanged = null;
	this.$myHeight = null;
	this.$myVisible = false;
	this.$myWidth = null;
	this.$myX = 0;
	this.$myY = 0;
	this.$1$ParentField = null;
	this.element = null;
	this.$myWidth = $Client_ShuffUI_Number.op_Implicit$2(0);
	this.$myHeight = $Client_ShuffUI_Number.op_Implicit$2(0);
	this.$bindEvents();
};
$Client_ShuffUI_ShuffElement.prototype = {
	get_x: function() {
		return this.$myX;
	},
	set_x: function(value) {
		this.$myX = value;
		this.positionChanged($Client_ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
	},
	get_parent: function() {
		return this.$1$ParentField;
	},
	set_parent: function(value) {
		this.$1$ParentField = value;
	},
	get_y: function() {
		return this.$myY;
	},
	set_y: function(value) {
		this.$myY = value;
		this.positionChanged($Client_ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
	},
	get_width: function() {
		return this.$myWidth;
	},
	set_width: function(value) {
		this.$myWidth = value;
		this.sizeChanged($Client_ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
	},
	get_height: function() {
		return this.$myHeight;
	},
	set_height: function(value) {
		this.$myHeight = value;
		this.sizeChanged($Client_ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
	},
	get_visible: function() {
		return this.$myVisible;
	},
	set_visible: function(value) {
		this.$myVisible = value;
		this.visibleChanged($Client_ShuffUI_VisibleChangedEvent.$ctor(this.$myVisible));
	},
	$bindEvents: function() {
		this.sizeChanged = Function.combine(this.sizeChanged, Function.mkdel(this, function(e) {
			if (!!e.width) {
				this.element.css('width', $Client_ShuffUI_Number.op_Implicit$1(e.width));
			}
			if (!!e.height) {
				this.element.css('height', $Client_ShuffUI_Number.op_Implicit$1(e.height));
			}
		}));
		this.positionChanged = Function.combine(this.positionChanged, Function.mkdel(this, function(e1) {
			this.element.css('left', e1.x + 'px');
			this.element.css('top', e1.y + 'px');
		}));
		this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e2) {
			this.element.css('display', (e2.visible ? 'block' : 'none'));
		}));
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e3) {
			this.set_parent(e3.parent);
			if (ss.isNullOrUndefined(this.get_parent())) {
				this.element.remove();
			}
			else {
				this.get_parent().element.append(this.element);
			}
		}));
		this.bindCustomEvents();
	},
	bindCustomEvents: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel
var $Client_ShuffUI_ShuffLabel = function(x, y, text) {
	this.$myText = null;
	this.$2$TextChangedField = null;
	$Client_ShuffUI_ShuffElement.call(this);
	var but = $('<span></span>');
	this.element = but;
	but.css('position', 'absolute');
	this.set_text(Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit(text));
	this.set_x(x);
	this.set_y(y);
	this.set_visible(true);
	but.disableSelection();
};
$Client_ShuffUI_ShuffLabel.prototype = {
	get_text: function() {
		return this.$myText;
	},
	set_text: function(value) {
		this.$myText = value;
		this.get_textChanged()($Client_ShuffUI_TextChangedEvent.$ctor(this.$myText, false));
	},
	get_textChanged: function() {
		return this.$2$TextChangedField;
	},
	set_textChanged: function(value) {
		this.$2$TextChangedField = value;
	},
	bindCustomEvents: function() {
		this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
			this.element.text(e.text);
		})));
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel
var $Client_ShuffUI_ShuffLabel$1 = function(T) {
	var $type = function(data, x, y, text) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffLabel.call(this, x, y, text);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffLabel$1, [T], function() {
		return $Client_ShuffUI_ShuffLabel;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffLabel$1', $Client_ShuffUI_ShuffLabel$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox
var $Client_ShuffUI_ShuffListBox = function(x, y, width, height) {
	this.itemCreation = null;
	this.onClick = null;
	this.items = null;
	$Client_ShuffUI_ShuffElement.call(this);
	var but = $('<div style=\'position:absolute;\'></div>');
	this.element = but;
	this.set_x(x);
	this.set_y(y);
	this.set_width(width);
	this.set_height(height);
	this.set_visible(true);
	this.items = [];
	var theme = eval('getTheme()');
	but.jqxListBox({ source: this.items, width: $Client_ShuffUI_Number.op_Implicit(width), height: $Client_ShuffUI_Number.op_Implicit(height), theme: theme });
	window.setTimeout(Function.mkdel(this, function() {
		but.get(0).style.left = this.get_x() + 'px';
		but.get(0).style.top = this.get_y() + 'px';
	}), 2000);
	but.bind('select', Function.mkdel(this, function(e) {
		var item = e.args.item;
		if (ss.isValue(this.onClick)) {
			this.onClick(item);
		}
	}));
};
$Client_ShuffUI_ShuffListBox.prototype = {
	bindCustomEvents: function() {
	},
	addItem: function(p0) {
		this.items.add(p0);
		this.$update();
	},
	$update: function() {
		var theme = 'getTheme()';
		this.element.jqxListBox({ source: this.items, width: $Client_ShuffUI_Number.op_Implicit(this.get_width()), height: $Client_ShuffUI_Number.op_Implicit(this.get_height()), theme: theme });
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox
var $Client_ShuffUI_ShuffListBox$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffListBox.call(this, x, y, width, height);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffListBox$1, [T], function() {
		return $Client_ShuffUI_ShuffListBox;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffListBox$1', $Client_ShuffUI_ShuffListBox$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListItem
var $Client_ShuffUI_ShuffListItem = function(label, value) {
	this.label = null;
	this.value = 0;
	this.label = label;
	this.value = value;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffPanel
var $Client_ShuffUI_ShuffPanel = function() {
	this.elements = null;
	$Client_ShuffUI_ShuffElement.call(this);
	this.elements = [];
	var but = $('<div />');
	this.element = but;
	but.css('position', 'absolute');
	but.css('width', '100%');
	but.css('height', '100%');
	but.css('top', '0');
	but.css('left', '0');
	this.set_visible(true);
};
$Client_ShuffUI_ShuffPanel.prototype = {
	addElement: function(element) {
		this.element.append(element.element);
		this.elements.add(element);
		element.parentChanged($Client_ShuffUI_ParentChangedEvent.$ctor(this));
		return element;
	},
	removeElement: function(element) {
		element.element.remove();
		this.elements.remove(element);
		element.parentChanged($Client_ShuffUI_ParentChangedEvent.$ctor(null));
		return element;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextbox
var $Client_ShuffUI_ShuffTextbox = function(x, y, width, height, text, label, labelStyle) {
	this.$2$TextChangedField = null;
	this.$2$LabelElementField = null;
	$Client_ShuffUI_ShuffElement.call(this);
	var but = $('<input value=\'' + ss.coalesce(text, '') + '\' />');
	this.element = but;
	but.css('position', 'absolute');
	this.set_text(text);
	this.set_x(x);
	this.set_y(y);
	this.set_width(width);
	this.set_height(height);
	this.set_visible(true);
	but.keydown(function(a) {
	});
	if (ss.isValue(label)) {
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e) {
			if (ss.isNullOrUndefined(e.parent)) {
				this.get_labelElement().remove();
				this.set_labelElement(null);
			}
			else {
				//to LabeledElement
				var lbl = $('<span style=\'' + labelStyle + '\'></span>');
				this.set_labelElement(lbl);
				lbl.text(label);
				this.get_parent().element.append(lbl);
				lbl.css('position', 'absolute');
				lbl.css('left', this.get_x() - lbl.width() - 15);
				lbl.css('top', this.get_y() + 2);
				lbl.disableSelection();
			}
		}));
	}
};
$Client_ShuffUI_ShuffTextbox.prototype = {
	get_text: function() {
		return this.element.val();
	},
	set_text: function(value) {
		this.get_textChanged()($Client_ShuffUI_TextChangedEvent.$ctor(value, false));
	},
	get_textChanged: function() {
		return this.$2$TextChangedField;
	},
	set_textChanged: function(value) {
		this.$2$TextChangedField = value;
	},
	get_labelElement: function() {
		return this.$2$LabelElementField;
	},
	set_labelElement: function(value) {
		this.$2$LabelElementField = value;
	},
	bindCustomEvents: function() {
		this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
			if (!e.live) {
				this.element.val(e.text);
			}
		})));
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextbox
var $Client_ShuffUI_ShuffTextbox$1 = function(T) {
	var $type = function(data, x, y, width, height, text, label, labelStyle) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffTextbox.call(this, x, y, width, height, text, label, labelStyle);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffTextbox$1, [T], function() {
		return $Client_ShuffUI_ShuffTextbox;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffTextbox$1', $Client_ShuffUI_ShuffTextbox$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffUIManager
var $Client_ShuffUI_ShuffUIManager = function() {
	this.$uiAreas = [];
};
$Client_ShuffUI_ShuffUIManager.prototype = {
	createWindow: function(T) {
		return function(ui) {
			var windowID = ui.title;
			var outer = $('<div class=\'window-outer\' style=\'background-color: #87B6D9;\'></div>');
			$('body').append(outer);
			ui.outer = outer;
			var tp = outer[0].style;
			tp['box-shadow'] = '4px 4px 2px #333';
			if (ss.isValue(tp['box-shadow'])) {
				tp['-moz-box-shadow'] = tp['box-shadow'];
				tp['-webkit-box-shadow'] = tp['box-shadow'];
			}
			outer.css('position', 'absolute');
			outer.css('padding', '2em 0.8em 0.8em 1.3em');
			outer.css('left', ui.get_x() + 'px');
			outer.css('top', ui.get_y() + 'px');
			outer.css('width', $Client_ShuffUI_Number.op_Implicit$1(ui.get_width()));
			outer.css('height', $Client_ShuffUI_Number.op_Implicit$1(ui.get_height()));
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
			ui.set_$window($('#window' + windowID));
			var info;
			this.$uiAreas.add(info = new $Client_ShuffUI_UIAreaInformation(outer, inner));
			ui.information = info;
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
			$('.window-minimize').click(function(evt2) {
				window.alert('3');
			});
			outer.mousedown(Function.mkdel(this, function(evt3) {
				this.focus(info);
			}));
			$('.window-header-button').button();
			if (!ui.staticPositioning) {
				outer.draggable({
					cancel: '.window-inner, .CodeMirror, .CodeMirror-fullscreen, .CodeMirror-wrap, .CodeMirror-focused',
					containment: 'window',
					start: function(evt4, o) {
					}
				});
				outer.resizable({
					handles: 'n, e, s, w, ne, se, sw, nw',
					resize: function(evt5, o1) {
						ui.onResize(evt5, o1);
					}
				});
			}
			ui.element = inner;
			//inner.Append(ui.Element);
			return ui;
		};
	},
	focus: function(info) {
		for (var i = 0; i < this.$uiAreas.length; i++) {
			this.$uiAreas[i].get_element().css('z-index', 1800);
		}
		info.get_element().css('z-index', 1900);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffWindow
var $Client_ShuffUI_ShuffWindow$1 = function(T) {
	var $type = function() {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.$3$WindowField = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		$Client_ShuffUI_ShuffPanel.call(this);
	};
	$type.prototype = {
		get_$window: function() {
			return this.$3$WindowField;
		},
		set_$window: function(value) {
			this.$3$WindowField = value;
		},
		get_$outer: function() {
			return this.outer;
		},
		set_$outer: function(value) {
			this.outer = value;
			this.outer.resizable({ handles: 'n, e, s, w, ne, se, sw, nw', resize: Function.mkdel(this, this.onResize) });
		},
		onResize: function(e, uievent) {
			this.set_width($Client_ShuffUI_Number.op_Implicit$3(uievent.size.width + 'px'));
			this.set_height($Client_ShuffUI_Number.op_Implicit$3(uievent.size.height + 'px'));
		},
		bindCustomEvents: function() {
			$Client_ShuffUI_ShuffElement.prototype.bindCustomEvents.call(this);
			this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e) {
				if (ss.isValue(this.get_$outer())) {
					this.get_$outer().css('display', (e.visible ? 'block' : 'none'));
				}
			}));
		}
	};
	$type.$ctor1 = function(data) {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.$3$WindowField = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		$Client_ShuffUI_ShuffPanel.call(this);
		this.data = data;
	};
	$type.$ctor1.prototype = $type.prototype;
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffWindow$1, [T], function() {
		return $Client_ShuffUI_ShuffPanel;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffWindow$1', $Client_ShuffUI_ShuffWindow$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.SizeChangedEvent
var $Client_ShuffUI_SizeChangedEvent = function() {
};
$Client_ShuffUI_SizeChangedEvent.$ctor = function(w, h) {
	var $this = {};
	$this.width = null;
	$this.height = null;
	$this.width = w;
	$this.height = h;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.TextChangedEvent
var $Client_ShuffUI_TextChangedEvent = function() {
};
$Client_ShuffUI_TextChangedEvent.$ctor = function(text, live) {
	var $this = {};
	$this.text = null;
	$this.live = false;
	$this.live = live;
	$this.text = text;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.UIAreaInformation
var $Client_ShuffUI_UIAreaInformation = function(element, inner) {
	this.$1$ElementField = null;
	this.$1$InnerField = null;
	this.set_element(element);
	this.set_inner(inner);
};
$Client_ShuffUI_UIAreaInformation.prototype = {
	get_element: function() {
		return this.$1$ElementField;
	},
	set_element: function(value) {
		this.$1$ElementField = value;
	},
	get_inner: function() {
		return this.$1$InnerField;
	},
	set_inner: function(value) {
		this.$1$InnerField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.VisibleChangedEvent
var $Client_ShuffUI_VisibleChangedEvent = function() {
};
$Client_ShuffUI_VisibleChangedEvent.$ctor = function(visible) {
	var $this = {};
	$this.visible = false;
	$this.visible = visible;
	return $this;
};
Type.registerClass(global, 'Globals', $Globals, Object);
Type.registerClass(global, 'LoginUI', $LoginUI, Object);
Type.registerClass(global, 'Client.BuildSite', $Client_BuildSite, Object);
Type.registerClass(global, 'Client.GameCanvasInformation', $Client_GameCanvasInformation, Object);
Type.registerClass(global, 'Client.GameInfo', $Client_GameInfo, Object);
Type.registerClass(global, 'Client.Gateway', $Client_Gateway, Object);
Type.registerClass(global, 'Client.PageGameContext', $Client_PageGameContext, Object);
Type.registerClass(global, 'Client.PageHandler', $Client_PageHandler, Object);
Type.registerClass(global, 'Client.ScriptLoader', $Client_ScriptLoader, Object);
Type.registerClass(global, 'Client.Information.CodeAreaInformation', $Client_Information_CodeAreaInformation, Object);
Type.registerClass(global, 'Client.Information.DevAreaInformation', $Client_Information_DevAreaInformation, Object);
Type.registerClass(global, 'Client.Information.HomeAreaInformation', $Client_Information_HomeAreaInformation, Object);
Type.registerClass(global, 'Client.Information.QuestionAreaInformation', $Client_Information_QuestionAreaInformation, Object);
Type.registerClass(global, 'Client.ShuffUI.ButtonClickedEvent', $Client_ShuffUI_ButtonClickedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.CodeMirrorInformation', $Client_ShuffUI_CodeMirrorInformation, Object);
Type.registerClass(global, 'Client.ShuffUI.CodeMirrorInformationData', $Client_ShuffUI_CodeMirrorInformationData, Object);
Type.registerClass(global, 'Client.ShuffUI.ItemClickedEvent', $Client_ShuffUI_ItemClickedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.Number', $Client_ShuffUI_Number, Object);
Type.registerClass(global, 'Client.ShuffUI.ParentChangedEvent', $Client_ShuffUI_ParentChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.PositionChangedEvent', $Client_ShuffUI_PositionChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffElement', $Client_ShuffUI_ShuffElement, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffLabel', $Client_ShuffUI_ShuffLabel, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffListBox', $Client_ShuffUI_ShuffListBox, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffListItem', $Client_ShuffUI_ShuffListItem, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffPanel', $Client_ShuffUI_ShuffPanel, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffTextbox', $Client_ShuffUI_ShuffTextbox, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffUIManager', $Client_ShuffUI_ShuffUIManager, Object);
Type.registerClass(global, 'Client.ShuffUI.SizeChangedEvent', $Client_ShuffUI_SizeChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.TextChangedEvent', $Client_ShuffUI_TextChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.UIAreaInformation', $Client_ShuffUI_UIAreaInformation, Object);
Type.registerClass(global, 'Client.ShuffUI.VisibleChangedEvent', $Client_ShuffUI_VisibleChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffButton', $Client_ShuffUI_ShuffButton, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffCodeEditor', $Client_ShuffUI_ShuffCodeEditor, $Client_ShuffUI_ShuffElement);
$Client_BuildSite.instance = null;

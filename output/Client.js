
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// Client.BuildSite
	var $Client_BuildSite = function(gatewayServerAddress) {
		this.$gatewayServerAddress = null;
		this.shuffUIManager = null;
		$Client_BuildSite.instance = this;
		this.$gatewayServerAddress = gatewayServerAddress;
		$Client_BuildSite.$loadJunk($Client_BuildSite.topLevelURL, Function.mkdel(this, this.$ready));
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
			var dvGame = document.createElement('div');
			$('body').append(dvGame);
			dvGame.id = 'dvGame';
			dvGame.style.left = '0%';
			dvGame.style.position = 'absolute';
			dvGame.style.top = '0';
			dvGame.style.right = '0';
			dvGame.style.bottom = '0';
			dvGame.style['-webkit-transform'] = 'scale(1.2)';
			document.body.style['overflow'] = 'hidden';
			document.body.addEventListener('contextmenu', function(e) {
				e.preventDefault();
				//todo: Special right click menu;
			}, false);
			var pageHandler = new $Client_PageHandler(this.$gatewayServerAddress);
			//
			//
			//
			//
			//
			//        var chatArea = shuffUIManager.createWindow({
			//
			//
			//
			//
			//
			//        title: "Chat",
			//
			//
			//
			//
			//
			//        x: 600,
			//
			//
			//
			//
			//
			//        y: 100,
			//
			//
			//
			//
			//
			//        width: 300,
			//
			//
			//
			//
			//
			//        height: 275,
			//
			//
			//
			//
			//
			//        allowClose: true,
			//
			//
			//
			//
			//
			//        allowMinimize: true,
			//
			//
			//
			//
			//
			//        visible: false
			//
			//
			//
			//
			//
			//        
			//
			//
			//
			//
			//
			//        });
		}
	};
	$Client_BuildSite.$loadJunk = function(url, ready) {
		var scriptLoader = new $Client_Libs_ScriptLoader();
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/jquery-ui-1.8.20.custom.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/codemirror/lib/codemirror.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/codemirror/theme/night.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/jqwidgets/styles/jqx.base.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/site.css');
		var stepFour = function() {
			scriptLoader.load([url + 'lib/RawDeflate.js'], true, ready);
		};
		var stepThree = function() {
			scriptLoader.load([url + 'CommonLibraries.js', url + 'ShuffleGameLibrary.js', url + 'Models.js'], true, stepFour);
		};
		var stepTwo = function() {
			scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], false, stepThree);
		};
		var stepOne = function() {
			scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/lib/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], false, stepTwo);
		};
		scriptLoader.loadSync([url + 'lib/jquery-1.7.2.min.js', url + 'lib/jquery-ui-1.8.20.custom.min.js', url + 'lib/jqwidgets/scripts/gettheme.js', url + 'lib/jqwidgets/jqxcore.js'], stepOne);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.ClientInformation
	var $Client_ClientInformation = function() {
	};
	$Client_ClientInformation.createInstance = function() {
		return $Client_ClientInformation.$ctor();
	};
	$Client_ClientInformation.$ctor = function() {
		var $this = {};
		$this.loggedInUser = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.PageHandler
	var $Client_PageHandler = function(gatewayServerAddress) {
		this.gameDrawer = null;
		this.$shuffUIManager = null;
		this.clientGameManager = null;
		this.clientDebugManager = null;
		this.clientSiteManager = null;
		this.clientChatManager = null;
		this.timeTracker = null;
		this.codeEditorUI = null;
		this.questionUI = null;
		this.debugUI = null;
		this.homeUI = null;
		this.loginUI = null;
		this.clientInfo = null;
		this.$1$GameManagerField = null;
		this.$shuffUIManager = new ShuffUI.ShuffUIManager();
		this.gameDrawer = new $Client_ShufflyGame_GameDrawer();
		this.timeTracker = $Client_Libs_TimeTracker.$ctor();
		var gateway = new $Client_Libs_Gateway(gatewayServerAddress);
		this.clientGameManager = new $Client_Managers_ClientGameManager(gateway);
		this.clientSiteManager = new $Client_Managers_ClientSiteManager(gateway);
		this.clientDebugManager = new $Client_Managers_ClientDebugManager(gateway);
		this.clientChatManager = new $Client_Managers_ClientChatManager(gateway);
		this.clientInfo = $Client_ClientInformation.$ctor();
		this.set_gameManager(new $Client_ShufflyGame_GameManager(this));
		this.loginUI = new $Client_UIWindow_LoginUI(this.$shuffUIManager, this);
		this.homeUI = new $Client_UIWindow_HomeUI(this.$shuffUIManager, this);
		this.debugUI = new $Client_UIWindow_DebugUI(this.$shuffUIManager, this);
		this.questionUI = new $Client_UIWindow_QuestionUI(this.$shuffUIManager, this);
		this.codeEditorUI = new $Client_UIWindow_CodeEditorUI(this.$shuffUIManager, this);
		//gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
		//gateway.On("Area.Lobby.ListRooms.Response", (data) => { Console.Log(data); });
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
		get_gameManager: function() {
			return this.$1$GameManagerField;
		},
		set_gameManager: function(value) {
			this.$1$GameManagerField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Libs.Gateway
	var $Client_Libs_Gateway = function(gatewayServer) {
		this.$channels = null;
		this.gatewaySocket = null;
		this.$channels = new (Type.makeGenericType(ss.Dictionary$2, [String, Function]))();
		this.gatewaySocket = io.connect(gatewayServer);
		this.gatewaySocket.on('Client.Message', Function.mkdel(this, function(data) {
			this.$channels.get_item(data.channel)(data.user, data.content);
		}));
	};
	$Client_Libs_Gateway.prototype = {
		emit: function(channel, content) {
			this.gatewaySocket.emit('Gateway.Message', Models.GatewayMessageModel.$ctor(channel, content));
		},
		on: function(channel, callback) {
			this.$channels.set_item(channel, callback);
		},
		login: function(userName, password) {
			var $t2 = this.gatewaySocket;
			var $t1 = Models.UserModel.$ctor();
			$t1.userName = userName;
			$t1.password = password;
			$t2.emit('Gateway.Login', $t1);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Libs.ScriptLoader
	var $Client_Libs_ScriptLoader = function() {
	};
	$Client_Libs_ScriptLoader.prototype = {
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
	$Client_Libs_ScriptLoader.loadCss = function(filename) {
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
		document.getElementsByTagName('head')[0].appendChild(fileref);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Libs.TimeTracker
	var $Client_Libs_TimeTracker = function() {
	};
	$Client_Libs_TimeTracker.createInstance = function() {
		return $Client_Libs_TimeTracker.$ctor();
	};
	$Client_Libs_TimeTracker.$ctor = function() {
		var $this = {};
		$this.numOfTimes = 0;
		$this.startTime = 0;
		$this.timeValue = 0;
		$this.endTime = 0;
		$this.startTime = Date.get_now();
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Managers.ClientChatManager
	var $Client_Managers_ClientChatManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnGetChatLinesField = null;
		this.$1$OnGetChatInfoField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$Client_Managers_ClientChatManager.prototype = {
		add_onGetChatLines: function(value) {
			this.$1$OnGetChatLinesField = Function.combine(this.$1$OnGetChatLinesField, value);
		},
		remove_onGetChatLines: function(value) {
			this.$1$OnGetChatLinesField = Function.remove(this.$1$OnGetChatLinesField, value);
		},
		add_onGetChatInfo: function(value) {
			this.$1$OnGetChatInfoField = Function.combine(this.$1$OnGetChatInfoField, value);
		},
		remove_onGetChatInfo: function(value) {
			this.$1$OnGetChatInfoField = Function.remove(this.$1$OnGetChatInfoField, value);
		},
		$setup: function() {
			this.$myGateway.on('Area.Chat.ChatLines.Response', Function.mkdel(this, function(user, data) {
				this.$1$OnGetChatLinesField(user, data);
			}));
			this.$myGateway.on('Area.Chat.ChatInfo.Response', Function.mkdel(this, function(user1, data1) {
				this.$1$OnGetChatInfoField(user1, data1);
			}));
		},
		sendChatMessage: function(sendChatMessageModel) {
			this.$myGateway.emit('Area.Chat.SendMessage', sendChatMessageModel);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Managers.ClientDebugManager
	var $Client_Managers_ClientDebugManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnGetGameSourceField = null;
		this.$1$OnGetDebugLogField = null;
		this.$1$OnGetDebugBreakField = null;
		this.$1$OnDebugGameOverField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$Client_Managers_ClientDebugManager.prototype = {
		add_onGetGameSource: function(value) {
			this.$1$OnGetGameSourceField = Function.combine(this.$1$OnGetGameSourceField, value);
		},
		remove_onGetGameSource: function(value) {
			this.$1$OnGetGameSourceField = Function.remove(this.$1$OnGetGameSourceField, value);
		},
		add_onGetDebugLog: function(value) {
			this.$1$OnGetDebugLogField = Function.combine(this.$1$OnGetDebugLogField, value);
		},
		remove_onGetDebugLog: function(value) {
			this.$1$OnGetDebugLogField = Function.remove(this.$1$OnGetDebugLogField, value);
		},
		add_onGetDebugBreak: function(value) {
			this.$1$OnGetDebugBreakField = Function.combine(this.$1$OnGetDebugBreakField, value);
		},
		remove_onGetDebugBreak: function(value) {
			this.$1$OnGetDebugBreakField = Function.remove(this.$1$OnGetDebugBreakField, value);
		},
		add_onDebugGameOver: function(value) {
			this.$1$OnDebugGameOverField = Function.combine(this.$1$OnDebugGameOverField, value);
		},
		remove_onDebugGameOver: function(value) {
			this.$1$OnDebugGameOverField = Function.remove(this.$1$OnDebugGameOverField, value);
		},
		$setup: function() {
			this.$myGateway.on('Area.Debug.GetGameSource.Response', Function.mkdel(this, function(user, data) {
				this.$1$OnGetGameSourceField(user, data);
			}));
			this.$myGateway.on('Area.Debug.Log', Function.mkdel(this, function(user1, data1) {
				this.$1$OnGetDebugLogField(user1, data1);
			}));
			this.$myGateway.on('Area.Debug.Break', Function.mkdel(this, function(user2, data2) {
				this.$1$OnGetDebugBreakField(user2, data2);
			}));
			this.$myGateway.on('Area.Debug.GameOver', Function.mkdel(this, function(user3, data3) {
				this.$1$OnDebugGameOverField(user3, Type.cast(data3, String));
			}));
		},
		requestGameSource: function(gameSourceRequestModel) {
			this.$myGateway.emit('Area.Debug2.GetGameSource.Request', gameSourceRequestModel);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Managers.ClientGameManager
	var $Client_Managers_ClientGameManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnAskQuestionField = null;
		this.$1$OnUpdateStateField = null;
		this.$1$OnGameStartedField = null;
		this.$1$OnGameOverField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$Client_Managers_ClientGameManager.prototype = {
		add_onAskQuestion: function(value) {
			this.$1$OnAskQuestionField = Function.combine(this.$1$OnAskQuestionField, value);
		},
		remove_onAskQuestion: function(value) {
			this.$1$OnAskQuestionField = Function.remove(this.$1$OnAskQuestionField, value);
		},
		add_onUpdateState: function(value) {
			this.$1$OnUpdateStateField = Function.combine(this.$1$OnUpdateStateField, value);
		},
		remove_onUpdateState: function(value) {
			this.$1$OnUpdateStateField = Function.remove(this.$1$OnUpdateStateField, value);
		},
		add_onGameStarted: function(value) {
			this.$1$OnGameStartedField = Function.combine(this.$1$OnGameStartedField, value);
		},
		remove_onGameStarted: function(value) {
			this.$1$OnGameStartedField = Function.remove(this.$1$OnGameStartedField, value);
		},
		add_onGameOver: function(value) {
			this.$1$OnGameOverField = Function.combine(this.$1$OnGameOverField, value);
		},
		remove_onGameOver: function(value) {
			this.$1$OnGameOverField = Function.remove(this.$1$OnGameOverField, value);
		},
		$setup: function() {
			this.$myGateway.on('Area.Game.AskQuestion', Function.mkdel(this, function(user, data) {
				this.$1$OnAskQuestionField(user, data);
			}));
			this.$myGateway.on('Area.Game.UpdateState', Function.mkdel(this, function(user1, data1) {
				this.$1$OnUpdateStateField(user1, Type.cast(data1, String));
			}));
			this.$myGateway.on('Area.Game.Started', Function.mkdel(this, function(user2, data2) {
				this.$1$OnGameStartedField(user2, data2);
			}));
			this.$myGateway.on('Area.Game.GameOver', Function.mkdel(this, function(user3, data3) {
				this.$1$OnGameOverField(user3, Type.cast(data3, String));
			}));
		},
		answerQuestion: function(gameAnswerQuestionModel) {
			this.$myGateway.emit('Area.Game.AnswerQuestion', gameAnswerQuestionModel);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Managers.ClientSiteManager
	var $Client_Managers_ClientSiteManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnGetGameTypesReceivedField = null;
		this.$1$OnLoginField = null;
		this.$1$OnGetRoomsReceivedField = null;
		this.$1$OnRoomJoinedField = null;
		this.$1$OnGetRoomInfoReceivedField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$Client_Managers_ClientSiteManager.prototype = {
		add_onGetGameTypesReceived: function(value) {
			this.$1$OnGetGameTypesReceivedField = Function.combine(this.$1$OnGetGameTypesReceivedField, value);
		},
		remove_onGetGameTypesReceived: function(value) {
			this.$1$OnGetGameTypesReceivedField = Function.remove(this.$1$OnGetGameTypesReceivedField, value);
		},
		add_onLogin: function(value) {
			this.$1$OnLoginField = Function.combine(this.$1$OnLoginField, value);
		},
		remove_onLogin: function(value) {
			this.$1$OnLoginField = Function.remove(this.$1$OnLoginField, value);
		},
		add_onGetRoomsReceived: function(value) {
			this.$1$OnGetRoomsReceivedField = Function.combine(this.$1$OnGetRoomsReceivedField, value);
		},
		remove_onGetRoomsReceived: function(value) {
			this.$1$OnGetRoomsReceivedField = Function.remove(this.$1$OnGetRoomsReceivedField, value);
		},
		add_onRoomJoined: function(value) {
			this.$1$OnRoomJoinedField = Function.combine(this.$1$OnRoomJoinedField, value);
		},
		remove_onRoomJoined: function(value) {
			this.$1$OnRoomJoinedField = Function.remove(this.$1$OnRoomJoinedField, value);
		},
		add_onGetRoomInfoReceived: function(value) {
			this.$1$OnGetRoomInfoReceivedField = Function.combine(this.$1$OnGetRoomInfoReceivedField, value);
		},
		remove_onGetRoomInfoReceived: function(value) {
			this.$1$OnGetRoomInfoReceivedField = Function.remove(this.$1$OnGetRoomInfoReceivedField, value);
		},
		$setup: function() {
			this.$myGateway.on('Area.Site.Login.Response', Function.mkdel(this, function(user, data) {
				this.$1$OnLoginField(user, data);
			}));
			this.$myGateway.on('Area.Site.GetGameTypes.Response', Function.mkdel(this, function(user1, data1) {
				this.$1$OnGetGameTypesReceivedField(user1, data1);
			}));
			this.$myGateway.on('Area.Site.GetRooms.Response', Function.mkdel(this, function(user2, data2) {
				this.$1$OnGetRoomsReceivedField(user2, data2);
			}));
			this.$myGateway.on('Area.Site.GetRoomInfo.Response', Function.mkdel(this, function(user3, data3) {
				this.$1$OnGetRoomInfoReceivedField(user3, data3);
			}));
			this.$myGateway.on('Area.Site.JoinRoom.Response', Function.mkdel(this, function(user4, data4) {
				this.$1$OnRoomJoinedField(user4, data4);
			}));
		},
		login: function(userName, password) {
			this.$myGateway.login(userName, password);
		},
		getGameTypes: function() {
			this.$myGateway.emit('Area.Site.GetGameTypes', null);
		},
		getRooms: function(getRoomsRequest) {
			this.$myGateway.emit('Area.Site.GetRooms', getRoomsRequest);
		},
		createRoom: function(createRoom) {
			this.$myGateway.emit('Area.Site.CreateRoom', createRoom);
		},
		getRoomInfo: function(roomInfo) {
			this.$myGateway.emit('Area.Site.GetRoomInfo', roomInfo);
		},
		joinRoom: function(joinRoom) {
			this.$myGateway.emit('Area.Site.JoinRoom', joinRoom);
		},
		leaveRoom: function(leaveRoom) {
			this.$myGateway.emit('Area.Site.LeaveRoom', leaveRoom);
		},
		startGame: function(startGameRequest) {
			this.$myGateway.emit('Area.Site.StartGame', startGameRequest);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.ShufflyGame.GameDrawer
	var $Client_ShufflyGame_GameDrawer = function() {
		this.$cardImages = null;
		this.cards = {};
		this.$resetStyles = ['border-radius', '-moz-border-radius', 'left', 'top', '-webkit-border-radius', 'box-shadow', '-moz-box-shadow', 'transform', '-webkit-transform', 'padding', 'background-color', 'border'];
		this.spaces = {};
		this.$cardImages = {};
		for (var i = 101; i < 153; i++) {
			var img = new Image();
			var domain = $Client_BuildSite.topLevelURL + 'assets';
			var src = domain + '/cards/' + i;
			var jm;
			img.src = jm = src + '.gif';
			this.$cardImages[jm] = img;
		}
	};
	$Client_ShufflyGame_GameDrawer.prototype = {
		draw: function(data) {
			for (var $t1 = 0; $t1 < data.spaces.length; $t1++) {
				var space = data.spaces[$t1];
				space.appearance = this.$fixAppearance(space.appearance);
				for (var $t2 = 0; $t2 < space.pile.cards.length; $t2++) {
					var card = space.pile.cards[$t2];
					card.appearance = this.$fixAppearance(card.appearance);
				}
			}
			this.drawArea(data);
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
			var scale = new CommonLibraries.Point(ss.Int32.div(document.documentElement.clientWidth, mainArea.size.width) * 0.9, ss.Int32.div(document.documentElement.clientHeight - 250, mainArea.size.height) * 0.9);
			//ExtensionMethods.debugger(null);
			var sl = mainArea.spaces.length;
			//
			//                        for (int spaceIndex = 0; spaceIndex < sl; spaceIndex++)
			//
			//                        {
			//
			//                        var space = mainArea.Spaces[spaceIndex];
			//
			//                        var jf = findSpace(space).OuterElement;
			//
			//                        
			//
			//                        for (int i = 0; i < resetStyles.Length; i++)
			//
			//                        {
			//
			//                        jf.Style[resetStyles[i]] = null;
			//
			//                        }
			//
			//                        
			//
			//                        l = space.Pile.Cards.Count;
			//
			//                        for (int index = 0; index < l; index++)
			//
			//                        {
			//
			//                        var card = space.Pile.Cards[index];
			//
			//                        var m = findCard(space, card);
			//
			//                        
			//
			//                        for (int i = 0; i < resetStyles.Length; i++)
			//
			//                        {
			//
			//                        m.OuterElement.Style[resetStyles[i]] = null;
			//
			//                        m.Image.Style[resetStyles[i]] = null;
			//
			//                        }
			//
			//                        }
			//
			//                        }
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
					//                                        m.ImageStyle = new MyStyle();
					//
					//                                        m.OuterElementStyle = new MyStyle();
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
			var domain = $Client_BuildSite.topLevelURL + 'assets';
			src = domain + '/cards/' + (100 + (card.value + 1) + card.type * 13);
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
		},
		init: function() {
			this.clearCache();
			$('#dvGame').width('100%');
			$('#dvGame').height('100%');
			$('#dvGame').empty();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.ShufflyGame.GameManager
	var $Client_ShufflyGame_GameManager = function(pageHandler) {
		this.$1$PageHandlerField = null;
		this.clientGameManager = null;
		this.set_pageHandler(pageHandler);
		this.clientGameManager = pageHandler.clientGameManager;
		this.$init();
	};
	$Client_ShufflyGame_GameManager.prototype = {
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$init: function() {
			this.clientGameManager.add_onAskQuestion(Function.mkdel(this, function(user, gameSendAnswerModel) {
				this.get_pageHandler().questionUI.load(gameSendAnswerModel);
				//alert(JSON.stringify(data));
				this.get_pageHandler().timeTracker.endTime = new Date();
				var time = this.get_pageHandler().timeTracker.endTime - this.get_pageHandler().timeTracker.startTime;
				this.get_pageHandler().debugUI.lblHowFast.set_text('how long: ' + time);
			}));
			this.clientGameManager.add_onUpdateState(Function.mkdel(this, function(user1, update) {
				var data = JSON.parse((new Compressor()).DecompressText(update));
				//  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
				this.get_pageHandler().gameDrawer.draw(data);
			}));
			this.clientGameManager.add_onGameStarted(function(user2, room) {
				//alert(JSON.stringify(data));
			});
			this.clientGameManager.add_onGameOver(function(user3, room1) {
				//alert(JSON.stringify(data));
			});
		},
		startGame: function() {
			this.get_pageHandler().gameDrawer.init();
			this.get_pageHandler().clientSiteManager.startGame({});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.ActiveLobbyUI
	var $Client_UIWindow_ActiveLobbyUI = function(shuffUIManager, pageHandler, room) {
		this.$myPageHandler = null;
		this.$myRoom = null;
		this.$myShuffUIManager = null;
		this.$myChatBox = null;
		this.$myChatText = null;
		this.$myRoomPlayers = null;
		this.uiWindow = null;
		pageHandler.clientSiteManager.add_onGetRoomInfoReceived(Function.mkdel(this, this.$getRoomInfo));
		pageHandler.clientChatManager.add_onGetChatLines(Function.mkdel(this, this.$getChatLines));
		pageHandler.clientChatManager.add_onGetChatInfo(Function.mkdel(this, this.$getChatInfo));
		this.$myShuffUIManager = shuffUIManager;
		this.$myPageHandler = pageHandler;
		this.$myRoom = room;
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = String.format('{0} Lobby', this.$myRoom.roomName);
		$t1.set_x(250);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(800));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(600));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.onClose = Function.combine(this.uiWindow.onClose, Function.mkdel(this, function() {
			this.uiWindow.set_visible(true);
			this.uiWindow.swingAway(4, false);
			pageHandler.clientSiteManager.leaveRoom({ room: room });
			pageHandler.homeUI.uiWindow.swingBack();
		}));
		this.uiWindow.swingAway(4, true);
		var $t3 = this.uiWindow;
		var $t2 = new ShuffUI.ShuffListBox(600, 200, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(300), null);
		$t2.set_visible(true);
		this.$myRoomPlayers = $t3.addElement(ShuffUI.ShuffListBox).call($t3, $t2);
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(600, 510, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(23), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Start Game!'), Function.mkdel(this, function(a) {
			pageHandler.get_gameManager().startGame();
			this.uiWindow.set_height(CommonLibraries.Number.op_Implicit$2(200));
		})));
		var $t5 = this.uiWindow;
		var $t4 = new $Client_UIWindow_Controls_ChatBox(50, 50, 550, 500);
		$t4.set_visible(true);
		this.$myChatBox = $t5.addElement($Client_UIWindow_Controls_ChatBox).call($t5, $t4);
		var $t7 = this.uiWindow;
		var $t6 = new ShuffUI.ShuffTextbox(50, 560, CommonLibraries.Number.op_Implicit$2(500), CommonLibraries.Number.op_Implicit$2(30), '', '', null);
		$t6.set_onEnter(Function.mkdel(this, function() {
			if (ss.referenceEquals(this.$myChatText.get_text().trim(), String.empty)) {
				return;
			}
			pageHandler.clientChatManager.sendChatMessage({ message: this.$myChatText.get_text() });
			this.$myChatText.set_text('');
		}));
		this.$myChatText = $t7.addElement(ShuffUI.ShuffTextbox).call($t7, $t6);
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(560, 560, CommonLibraries.Number.op_Implicit$2(50), CommonLibraries.Number.op_Implicit$2(30), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send'), Function.mkdel(this, function(e) {
			if (ss.referenceEquals(this.$myChatText.get_text().trim(), String.empty)) {
				return;
			}
			pageHandler.clientChatManager.sendChatMessage({ message: this.$myChatText.get_text() });
			this.$myChatText.set_text('');
		})));
		this.uiWindow.swingBack();
		this.$populateGameRoom(room);
	};
	$Client_UIWindow_ActiveLobbyUI.prototype = {
		$getChatLines: function(user, o) {
			this.$myChatBox.addChatMessages(o.messages);
		},
		$getChatInfo: function(user, o) {
			this.$populateChatRoom(o.info);
		},
		$getRoomInfo: function(user, o) {
			this.$populateGameRoom(o.room);
		},
		$populateChatRoom: function(roomData) {
			this.$myRoomPlayers.clearItems();
			for (var $t1 = 0; $t1 < roomData.users.length; $t1++) {
				var userModel = roomData.users[$t1];
				this.$myRoomPlayers.addItem(new ShuffUI.ShuffListItem(userModel.userName, userModel.userName));
			}
			if (ss.isValue(roomData.messages)) {
				this.$myChatBox.addChatMessages(roomData.messages);
			}
		},
		$populateGameRoom: function(roomData) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.CodeEditorUI
	var $Client_UIWindow_CodeEditorUI = function(shuffUIManager, pageHandler) {
		this.$1$ShuffUIManagerField = null;
		this.$1$PageHandlerField = null;
		this.codeEditor = null;
		this.console = null;
		this.breakPoints = null;
		this.uiWindow = null;
		this.set_shuffUIManager(shuffUIManager);
		this.set_pageHandler(pageHandler);
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = 'Code';
		$t1.set_x(0);
		$t1.set_y(0);
		$t1.staticPositioning = false;
		$t1.set_width(CommonLibraries.Number.op_Implicit$2($(window).width() * 0.5));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2($(window).height() * 0.9));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.breakPoints = [];
		var $t3 = this.uiWindow;
		var $t2 = new ShuffUI.ShuffCodeEditor.$ctor1(0, 0, CommonLibraries.Number.op_Implicit$3('100%'), CommonLibraries.Number.op_Implicit$3('80%'), '');
		$t2.set_dock(2);
		this.codeEditor = $t3.addElement(ShuffUI.ShuffCodeEditor).call($t3, $t2);
		var $t5 = this.uiWindow;
		var $t4 = new ShuffUI.ShuffCodeEditor.$ctor1(0, 0, CommonLibraries.Number.op_Implicit$3('100%'), CommonLibraries.Number.op_Implicit$3('20%'), '');
		$t4.lineNumbers = false;
		$t4.set_dock(2);
		this.console = $t5.addElement(ShuffUI.ShuffCodeEditor).call($t5, $t4);
		pageHandler.clientDebugManager.add_onGetGameSource(Function.mkdel(this, this.$populateGameSource));
	};
	$Client_UIWindow_CodeEditorUI.prototype = {
		get_shuffUIManager: function() {
			return this.$1$ShuffUIManagerField;
		},
		set_shuffUIManager: function(value) {
			this.$1$ShuffUIManagerField = value;
		},
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$populateGameSource: function(user, gameSource) {
			var endTime = new Date();
			var timeTracker = this.get_pageHandler().timeTracker;
			var time = endTime - timeTracker.startTime;
			timeTracker.numOfTimes++;
			timeTracker.timeValue += time;
			this.get_pageHandler().debugUI.lblHowFast.set_text('Time Taken: ' + ss.Int32.div(timeTracker.timeValue, timeTracker.numOfTimes));
			this.get_pageHandler().codeEditorUI.codeEditor.information.editor.setValue(gameSource.content);
			//
			//                                                 buildSite.CodeEditorUI.codeEditor.Information.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
			this.get_pageHandler().codeEditorUI.codeEditor.information.editor.refresh();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.CreateRoomUI
	var $Client_UIWindow_CreateRoomUI = function(shuffUIManager, pageHandler, gameType) {
		this.uiWindow = null;
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = 'Create Room';
		$t1.set_x(ss.Int32.div($('body').innerWidth(), 2) - 140);
		$t1.set_y(ss.Int32.div($('body').innerHeight(), 2) - 62);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(280));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(125));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.swingAway(6, true);
		this.uiWindow.swingBack();
		var roomName = null;
		var $t3 = this.uiWindow;
		var $t2 = new ShuffUI.ShuffTextbox(115, 40, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Room Name', null);
		$t2.set_onEnter(Function.mkdel(this, function() {
			this.$createRoom(pageHandler, gameType, roomName);
		}));
		$t3.addElement(ShuffUI.ShuffTextbox).call($t3, roomName = $t2);
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(55, 100, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create'), Function.mkdel(this, function(e) {
			this.$createRoom(pageHandler, gameType, roomName);
		})));
		roomName.focus();
	};
	$Client_UIWindow_CreateRoomUI.prototype = {
		$createRoom: function(pageHandler, gameType, roomName) {
			pageHandler.clientSiteManager.createRoom({ gameType: gameType, roomName: roomName.get_text() });
			this.uiWindow.swingAway(2, false);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.DebugUI
	var $Client_UIWindow_DebugUI = function(shuffUIManager, pageHandler) {
		this.selectedGame = 'Sevens';
		this.uiWindow = null;
		this.txtNumOfPlayers = null;
		this.varText = null;
		this.lblAnother = null;
		this.lblHowFast = null;
		this.beginGame = null;
		this.joined = 0;
		this.created = false;
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = 'Developer';
		$t1.set_x(500);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(420));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.beginGame = function() {
		};
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(280, 54, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Begin Game'), Function.mkdel(this, function(e) {
			this.beginGame();
		})));
		var but = null;
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, but = new ShuffUI.ShuffButton(280, 84, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel(this, function() {
			return 'Game: ' + this.selectedGame;
		})), Function.mkdel(this, function(e1) {
			if (this.selectedGame === 'Sevens') {
				this.selectedGame = 'BlackJack';
			}
			else {
				this.selectedGame = 'Sevens';
			}
			pageHandler.clientDebugManager.requestGameSource({ gameName: this.selectedGame });
			var m = Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(but.text);
		})));
		this.lblHowFast = this.uiWindow.addElement(ShuffUI.ShuffLabel).call(this.uiWindow, new ShuffUI.ShuffLabel(80, 80, 'Time Taken:'));
		this.lblAnother = this.uiWindow.addElement(ShuffUI.ShuffLabel).call(this.uiWindow, new ShuffUI.ShuffLabel(80, 100, 'Another: '));
		// devArea.AddButton(new ShuffButton()
		// {
		// X = 280,
		// Y = 94,
		// Width = "150",
		// Height = "25",
		// Text = "Continue",
		// Click = (evt) =>
		// {
		// pageHandler.gateway.Emit("Area.Debug.Continue", new { }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		// }
		// });
		var pop;
		this.uiWindow.addElement(ShuffUI.ShuffListBox).call(this.uiWindow, pop = new ShuffUI.ShuffListBox(25, 200, CommonLibraries.Number.op_Implicit$2(250), CommonLibraries.Number.op_Implicit$2(250), null));
		pop.addItem(new ShuffUI.ShuffListItem('foos', 99));
		this.varText = this.uiWindow.addElement(ShuffUI.ShuffTextbox).call(this.uiWindow, new ShuffUI.ShuffTextbox(150, 134, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(25), 'Var Lookup', null, null));
		//  devArea.AddButton(new ShuffButton()
		//  {
		//  X = 280,
		//  Y = 134,
		//  Width = "150",
		//  Height = "25",
		//  Text = "Lookup",
		//  Click = (evt) =>
		//  {
		//  pageHandler.gateway.Emit("Area.Debug.VariableLookup.Request", new { variableName = devArea.Data.varText.GetValue() }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//  }
		//  });
		//   devArea.AddButton(new ShuffButton()
		//   {
		//   X = 280,
		//   Y = 164,
		//   Width = "150",
		//   Height = "25",
		//   Text = "Push New Source",
		//   Click = (evt) =>
		//   {
		//   pageHandler.gateway.Emit("Area.Debug.PushNewSource", new { source = codeArea.Data.codeEditor.editor.GetValue(), breakPoints = codeArea.Data.breakPoints },
		//   devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//   }
		//   });
		this.txtNumOfPlayers = this.uiWindow.addElement(ShuffUI.ShuffTextbox).call(this.uiWindow, new ShuffUI.ShuffTextbox(130, 43, CommonLibraries.Number.op_Implicit$2(130), CommonLibraries.Number.op_Implicit$2(20), '6', 'Number of players=', 'font-size:13px'));
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.HomeUI
	var $Client_UIWindow_HomeUI = function(shuffUIManager, pageHandler) {
		this.$myPageHandler = null;
		this.$myShuffUIManager = null;
		this.$lblHeader = null;
		this.$myCreateGameType = null;
		this.$myCreateRoom = null;
		this.$myGameTypeList = null;
		this.$myJoinRoom = null;
		this.$myLoadedRooms = null;
		this.$myRefreshRoom = null;
		this.$myRoomGameType = null;
		this.$myRoomName = null;
		this.$myRoomPlayers = null;
		this.$myRoomsList = null;
		this.$mySpectateRoom = null;
		this.uiWindow = null;
		this.$myShuffUIManager = shuffUIManager;
		this.$myPageHandler = pageHandler;
		pageHandler.clientSiteManager.add_onGetGameTypesReceived(Function.mkdel(this, this.$populateGames));
		pageHandler.clientSiteManager.add_onGetRoomsReceived(Function.mkdel(this, this.$populateRooms));
		pageHandler.clientSiteManager.add_onRoomJoined(Function.mkdel(this, this.$roomJoined));
		pageHandler.clientSiteManager.add_onGetRoomInfoReceived(Function.mkdel(this, this.$getRoomInfo));
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = 'CardGame';
		$t1.set_x(400);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(600));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.$lblHeader = this.uiWindow.addElement(ShuffUI.ShuffLabel).call(this.uiWindow, new ShuffUI.ShuffLabel(40, 44, 'Please Login!'));
		this.uiWindow.addElement(ShuffUI.ShuffLabel).call(this.uiWindow, new ShuffUI.ShuffLabel(30, 80, 'Game Types'));
		var $t3 = this.uiWindow;
		var $t2 = new ShuffUI.ShuffListBox(25, 100, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(300), null);
		$t2.onClick = Function.mkdel(this, function(item) {
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: Type.cast(item.value, String) });
		});
		this.$myGameTypeList = $t3.addElement(ShuffUI.ShuffListBox).call($t3, $t2);
		this.$myCreateGameType = this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(45, 410, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(40), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create New Game!'), function(c) {
			window.alert('Insert Developer UI Here');
		}));
		this.uiWindow.addElement(ShuffUI.ShuffLabel).call(this.uiWindow, new ShuffUI.ShuffLabel(210, 80, 'Rooms'));
		this.$myCreateRoom = this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(260, 70, CommonLibraries.Number.op_Implicit$2(70), CommonLibraries.Number.op_Implicit$2(25), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Refresh!'), Function.mkdel(this, function(c1) {
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: Type.cast(this.$myGameTypeList.selectedItem.value, String) });
		})));
		var $t5 = this.uiWindow;
		var $t4 = new ShuffUI.ShuffListBox(200, 100, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(300), null);
		$t4.onClick = Function.mkdel(this, function(item1) {
			var room = Enumerable.from(this.$myLoadedRooms).first(function(a) {
				return ss.referenceEquals(a.roomName, Type.cast(item1.value, String));
			});
			this.$populateRoom(room);
		});
		this.$myRoomsList = $t5.addElement(ShuffUI.ShuffListBox).call($t5, $t4);
		this.$myCreateRoom = this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(225, 410, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(40), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create New Room!'), Function.mkdel(this, function(c2) {
			var create = new $Client_UIWindow_CreateRoomUI(shuffUIManager, pageHandler, Type.cast(this.$myGameTypeList.selectedItem.value, String));
			shuffUIManager.focus(create.uiWindow);
		})));
		var $t7 = this.uiWindow;
		var $t6 = new ShuffUI.ShuffListBox(400, 200, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(200), null);
		$t6.set_visible(false);
		this.$myRoomPlayers = $t7.addElement(ShuffUI.ShuffListBox).call($t7, $t6);
		var $t9 = this.uiWindow;
		var $t8 = new ShuffUI.ShuffLabel(400, 100, '');
		$t8.set_visible(false);
		this.$myRoomGameType = $t9.addElement(ShuffUI.ShuffLabel).call($t9, $t8);
		var $t11 = this.uiWindow;
		var $t10 = new ShuffUI.ShuffLabel(400, 130, '');
		$t10.set_visible(false);
		this.$myRoomName = $t11.addElement(ShuffUI.ShuffLabel).call($t11, $t10);
		var $t13 = this.uiWindow;
		var $t12 = new ShuffUI.ShuffButton(410, 160, CommonLibraries.Number.op_Implicit$2(75), CommonLibraries.Number.op_Implicit$2(25), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Join!'), Function.mkdel(this, function(c3) {
			pageHandler.clientSiteManager.joinRoom({ gameType: Type.cast(this.$myGameTypeList.selectedItem.value, String), roomName: Type.cast(this.$myRoomsList.selectedItem.value, String) });
		}));
		$t12.set_visible(false);
		this.$myJoinRoom = $t13.addElement(ShuffUI.ShuffButton).call($t13, $t12);
		var $t15 = this.uiWindow;
		var $t14 = new ShuffUI.ShuffButton(490, 160, CommonLibraries.Number.op_Implicit$2(75), CommonLibraries.Number.op_Implicit$2(25), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Spectate!'), function(c4) {
		});
		$t14.set_visible(false);
		this.$mySpectateRoom = $t15.addElement(ShuffUI.ShuffButton).call($t15, $t14);
		var $t17 = this.uiWindow;
		var $t16 = new ShuffUI.ShuffButton(420, 410, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Refresh!'), Function.mkdel(this, function(c5) {
			pageHandler.clientSiteManager.getRoomInfo({ gameType: Type.cast(this.$myGameTypeList.selectedItem.value, String), roomName: Type.cast(this.$myRoomsList.selectedItem.value, String) });
		}));
		$t16.set_visible(false);
		this.$myRefreshRoom = $t17.addElement(ShuffUI.ShuffButton).call($t17, $t16);
		//UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.ClientSiteManager.GetGameList(); }));
	};
	$Client_UIWindow_HomeUI.prototype = {
		$getRoomInfo: function(user, o) {
			for (var i = 0; i < this.$myLoadedRooms.length; i++) {
				if (ss.referenceEquals(this.$myLoadedRooms[i]._id, o.room._id)) {
					this.$myLoadedRooms.removeAt(i);
					this.$myLoadedRooms.insert(i, o.room);
					break;
				}
			}
			this.$populateRoom(o.room);
		},
		$roomJoined: function(user, o) {
			this.$populateRoom(o.room);
			this.uiWindow.swingAway(0, false);
			new $Client_UIWindow_ActiveLobbyUI(this.$myShuffUIManager, this.$myPageHandler, o.room);
		},
		userLoggedIn: function() {
			this.$lblHeader.set_text(String.format('Welcome: {0}!', this.$myPageHandler.clientInfo.loggedInUser.userName));
			this.$myPageHandler.clientSiteManager.getGameTypes();
			this.uiWindow.set_visible(true);
			this.uiWindow.swingAway(6, true);
			this.uiWindow.swingBack();
		},
		$populateGames: function(user, o) {
			this.$myGameTypeList.clearItems();
			for (var $t1 = 0; $t1 < o.gameTypes.length; $t1++) {
				var gameType = o.gameTypes[$t1];
				this.$myGameTypeList.addItem(new ShuffUI.ShuffListItem(gameType.name, gameType.name));
			}
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: o.gameTypes[0].name });
		},
		$populateRooms: function(user, o) {
			this.$myRoomsList.clearItems();
			this.$myLoadedRooms = o.rooms;
			if (o.rooms.length === 0) {
				return;
			}
			for (var $t1 = 0; $t1 < o.rooms.length; $t1++) {
				var room = o.rooms[$t1];
				this.$myRoomsList.addItem(new ShuffUI.ShuffListItem(room.roomName, room.roomName));
			}
			this.$populateRoom(o.rooms[0]);
		},
		$populateRoom: function(roomData) {
			this.$myRoomPlayers.set_visible(true);
			this.$myRoomName.set_visible(true);
			this.$myRoomGameType.set_visible(true);
			this.$myJoinRoom.set_visible(true);
			this.$mySpectateRoom.set_visible(true);
			this.$myRefreshRoom.set_visible(true);
			this.$myRoomPlayers.clearItems();
			for (var $t1 = 0; $t1 < roomData.players.length; $t1++) {
				var userModel = roomData.players[$t1];
				this.$myRoomPlayers.addItem(new ShuffUI.ShuffListItem(userModel.userName, userModel.userName));
			}
			this.$myRoomName.set_text(String.format('Room: {0}', roomData.roomName));
			this.$myRoomGameType.set_text(String.format('Game Type: {0}', roomData.gameType));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.LoginUI
	var $Client_UIWindow_LoginUI = function(shuffUIManager, pageHandler) {
		this.uiWindow = null;
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = 'Login';
		$t1.set_x($('body').innerWidth() - 500);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(280));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(165));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		var loginName;
		var password;
		this.uiWindow.addElement(ShuffUI.ShuffTextbox).call(this.uiWindow, loginName = new ShuffUI.ShuffTextbox(115, 40, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Username', null));
		this.uiWindow.addElement(ShuffUI.ShuffTextbox).call(this.uiWindow, password = new ShuffUI.ShuffTextbox(115, 75, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Password', null));
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(55, 150, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create'), function(e) {
			pageHandler.clientSiteManager.login(loginName.get_text(), password.get_text());
		}));
		this.uiWindow.addElement(ShuffUI.ShuffButton).call(this.uiWindow, new ShuffUI.ShuffButton(155, 150, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Login'), function(e1) {
			pageHandler.clientSiteManager.login(loginName.get_text(), password.get_text());
		}));
		pageHandler.clientSiteManager.add_onLogin(Function.mkdel(this, function(user, data) {
			pageHandler.clientInfo.loggedInUser = user;
			pageHandler.homeUI.userLoggedIn();
			this.uiWindow.swingAway(7, false);
		}));
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.QuestionUI
	var $Client_UIWindow_QuestionUI = function(shuffUIManager, pageHandler) {
		this.$1$PageHandlerField = null;
		this.question = null;
		this.answerBox = null;
		this.load = null;
		this.uiWindow = null;
		this.set_pageHandler(pageHandler);
		var $t1 = new ShuffUI.ShuffWindow();
		$t1.title = 'Question';
		$t1.set_x(600);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(300));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(275));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.swingAway(0, true);
		this.question = this.uiWindow.addElement(ShuffUI.ShuffLabel).call(this.uiWindow, new ShuffUI.ShuffLabel(20, 40, ''));
		this.load = Function.mkdel(this, function(question) {
			this.uiWindow.swingBack();
			this.question.set_text(question.question);
			this.answerBox.clearItems();
			for (var i = 0; i < question.answers.length; i++) {
				this.answerBox.addItem(new ShuffUI.ShuffListItem(question.answers[i], i));
			}
		});
		debugger;
		var $t3 = this.uiWindow;
		var $t2 = new ShuffUI.ShuffListBox(30, 65, CommonLibraries.Number.op_Implicit$2(215), CommonLibraries.Number.op_Implicit$2(125), null);
		$t2.onClick = Function.mkdel(this, function(e) {
			this.$selectAnswer(e);
		});
		this.answerBox = $t3.addElement(ShuffUI.ShuffListBox).call($t3, $t2);
	};
	$Client_UIWindow_QuestionUI.prototype = {
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$selectAnswer: function(e) {
			this.get_pageHandler().clientGameManager.answerQuestion({ answer: ss.Nullable.unbox(Type.cast(e.value, ss.Int32)) });
			this.uiWindow.swingAway(0, false);
			this.get_pageHandler().timeTracker.startTime = new Date();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.Controls.ChatBox
	var $Client_UIWindow_Controls_ChatBox = function(x, y, width, height) {
		ShuffUI.ShuffElement.call(this);
		this.element = $('<div></div>');
		this.element.css('position', 'absolute');
		this.element.css('background-color', 'grey');
		this.element.css('overflow-y', 'scroll');
		this.set_x(x);
		this.set_y(y);
		this.set_width(CommonLibraries.Number.op_Implicit$2(width));
		this.set_height(CommonLibraries.Number.op_Implicit$2(height));
		this.set_visible(true);
	};
	$Client_UIWindow_Controls_ChatBox.prototype = {
		addChatMessage: function(message) {
			var msgElement = $('<div></div>');
			msgElement.css('background-color', '#DDDDDD');
			msgElement.append($('<span>' + message.user.userName + '</span>'));
			msgElement.append($('<span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>'));
			msgElement.append($('<span>' + message.content + '</span>'));
			this.element.append(msgElement);
			this.element.scrollTop(this.element.height());
		},
		addChatMessages: function(messages) {
			for (var $t1 = 0; $t1 < messages.length; $t1++) {
				var chatMessageRoomModel = messages[$t1];
				this.addChatMessage(chatMessageRoomModel);
			}
		}
	};
	Type.registerClass(global, 'Client.BuildSite', $Client_BuildSite, Object);
	Type.registerClass(global, 'Client.ClientInformation', $Client_ClientInformation, Object);
	Type.registerClass(global, 'Client.PageHandler', $Client_PageHandler, Object);
	Type.registerClass(global, 'Client.Libs.Gateway', $Client_Libs_Gateway, Object);
	Type.registerClass(global, 'Client.Libs.ScriptLoader', $Client_Libs_ScriptLoader, Object);
	Type.registerClass(global, 'Client.Libs.TimeTracker', $Client_Libs_TimeTracker, Object);
	Type.registerClass(global, 'Client.Managers.ClientChatManager', $Client_Managers_ClientChatManager, Object);
	Type.registerClass(global, 'Client.Managers.ClientDebugManager', $Client_Managers_ClientDebugManager, Object);
	Type.registerClass(global, 'Client.Managers.ClientGameManager', $Client_Managers_ClientGameManager, Object);
	Type.registerClass(global, 'Client.Managers.ClientSiteManager', $Client_Managers_ClientSiteManager, Object);
	Type.registerClass(global, 'Client.ShufflyGame.GameDrawer', $Client_ShufflyGame_GameDrawer, Object);
	Type.registerClass(global, 'Client.ShufflyGame.GameManager', $Client_ShufflyGame_GameManager, Object);
	Type.registerClass(global, 'Client.UIWindow.ActiveLobbyUI', $Client_UIWindow_ActiveLobbyUI, Object);
	Type.registerClass(global, 'Client.UIWindow.CodeEditorUI', $Client_UIWindow_CodeEditorUI, Object);
	Type.registerClass(global, 'Client.UIWindow.CreateRoomUI', $Client_UIWindow_CreateRoomUI, Object);
	Type.registerClass(global, 'Client.UIWindow.DebugUI', $Client_UIWindow_DebugUI, Object);
	Type.registerClass(global, 'Client.UIWindow.HomeUI', $Client_UIWindow_HomeUI, Object);
	Type.registerClass(global, 'Client.UIWindow.LoginUI', $Client_UIWindow_LoginUI, Object);
	Type.registerClass(global, 'Client.UIWindow.QuestionUI', $Client_UIWindow_QuestionUI, Object);
	Type.registerClass(global, 'Client.UIWindow.Controls.ChatBox', $Client_UIWindow_Controls_ChatBox, ShuffUI.ShuffElement);
	$Client_BuildSite.topLevelURL = 'http://50.116.22.241:8881/';
	$Client_BuildSite.instance = null;
})();

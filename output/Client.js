
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// Client.BuildAngular
	var $Client_BuildAngular = function() {
	};
	$Client_BuildAngular.setup = function(gatewayServer) {
		angular.module('acg', ['ui.utils', 'ui.codemirror']).config(['$routeProvider', $Client_BuildAngular.$buildRouteProvider]).config(['$httpProvider', $Client_BuildAngular.$buildHttpProvider]).value('gatewayServerURL', gatewayServer).controller('MinimizeController', ['$scope', 'UIManager', function(scope, uiManager) {
			return new $Client_Controllers_$MinimizeController(scope, uiManager);
		}]).controller('GameController', ['$scope', 'clientGameManager', 'gameContentManager', function(scope1, clientGameManagerService, gameContentManager) {
			return new $Client_Controllers_GameController(scope1, clientGameManagerService, gameContentManager);
		}]).controller('TestGameController', ['$scope', function(scope2) {
			return new $Client_Controllers_TestGameController(scope2);
		}]).controller('GameEffectsEditorController', ['$scope', 'createUIService', function(scope3, createUIService) {
			return new $Client_Controllers_$GameEffectsEditorController(scope3, createUIService);
		}]).controller('LoginController', ['$scope', 'UIManager', 'clientSiteManager', 'messageService', 'createUIService', function(scope4, uiManager1, clientSiteManagerService, messageService, createUIService1) {
			return new $Client_Controllers_$LoginController(scope4, uiManager1, clientSiteManagerService, messageService, createUIService1);
		}]).controller('QuestionController', ['$scope', 'UIManager', 'clientGameManager', function(scope5, uiManager2, clientGameManagerService1) {
			return new $Client_Controllers_$QuestionController(scope5, uiManager2, clientGameManagerService1);
		}]).controller('HomeController', ['$scope', 'UIManager', 'clientSiteManager', 'createUIService', function(scope6, uiManager3, clientSiteManagerService1, createUIService2) {
			return new $Client_Controllers_$HomeController(scope6, uiManager3, clientSiteManagerService1, createUIService2);
		}]).controller('ActiveLobbyController', ['$scope', 'UIManager', 'clientSiteManager', 'clientChatManager', 'createUIService', function(scope7, uiManager4, clientSiteManagerService2, clientChatManagerService, createUIService3) {
			return new $Client_Controllers_$ActiveLobbyController(scope7, uiManager4, clientSiteManagerService2, clientChatManagerService, createUIService3);
		}]).controller('CreateRoomController', ['$scope', 'UIManager', function(scope8, uiManager5) {
			return new $Client_Controllers_$CreateRoomController(scope8, uiManager5);
		}]).controller('GameManagerController', ['$scope', 'UIManager', 'clientSiteManager', 'messageService', function(scope9, uiManagerService, clientSiteManagerService3, messageService1) {
			return new $Client_Controllers_$GameManagerController(scope9, uiManagerService, clientSiteManagerService3, messageService1);
		}]).controller('GameEditorController', ['$scope', 'UIManager', 'clientSiteManager', 'messageService', 'createUIService', function(scope10, uiManagerService1, clientSiteManagerService4, messageService2, createUIService4) {
			return new $Client_Controllers_$GameEditorController(scope10, uiManagerService1, clientSiteManagerService4, messageService2, createUIService4);
		}]).controller('GameLayoutEditorController', ['$scope', 'UIManager', 'clientSiteManager', 'messageService', 'createUIService', function(scope11, uiManagerService2, clientSiteManagerService5, messageService3, createUIService5) {
			return new $Client_Controllers_$GameLayoutEditorController(scope11, uiManagerService2, clientSiteManagerService5, messageService3, createUIService5);
		}]).controller('GameScenarioEditorController', ['$scope', 'UIManager', 'clientSiteManager', 'messageService', 'createUIService', function(scope12, uiManagerService3, clientSiteManagerService6, messageService4, createUIService6) {
			return new $Client_Controllers_$GameScenarioEditorController(scope12, uiManagerService3, clientSiteManagerService6, messageService4, createUIService6);
		}]).controller('GameCodeController', ['$scope', 'UIManager', 'clientSiteManager', 'messageService', function(scope13, uiManager6, clientSiteManagerService7, messageService5) {
			return new $Client_Controllers_$GameCodeController(scope13, uiManager6, clientSiteManagerService7, messageService5);
		}]).controller('MessageController', ['$scope', function(scope14) {
			return new $Client_Controllers_$MessageController(scope14);
		}]).controller('EffectTesterController', ['$scope', function(scope15) {
			return new $Client_Controllers_EffectTesterController(scope15);
		}]).service('UIManager', ['clientGameManager', function(clientGameManagerService2) {
			return new $Client_Services_UIManagerService(clientGameManagerService2);
		}]).service('clientChatManager', ['gateway', function(gatewayService) {
			return new $Client_Services_ClientChatManagerService(gatewayService);
		}]).service('clientGameManager', ['gateway', function(gatewayService1) {
			return new $Client_Services_ClientGameManagerService(gatewayService1);
		}]).service('clientDebugManager', ['gateway', function(gatewayService2) {
			return new $Client_Services_ClientDebugManagerService(gatewayService2);
		}]).service('clientSiteManager', ['gateway', function(gatewayService3) {
			return new $Client_Services_ClientSiteManagerService(gatewayService3);
		}]).service('gateway', ['gatewayServerURL', function(serverUrl) {
			return new $Client_Services_GatewayService(serverUrl);
		}]).service('gameContentManager', [function() {
			return new $Client_Services_GameContentManager();
		}]).service('messageService', ['createUIService', '$rootScope', function(createUIService7, rootScopeService) {
			return new $Client_Services_MessageService(createUIService7, rootScopeService);
		}]).service('createUIService', ['$compile', '$rootScope', function(compileService, rootScopeService1) {
			return new $Client_Services_CreateUIService(compileService, rootScopeService1);
		}]).directive('grid', [function() {
			return new $Client_Directives_GridDirective();
		}]).directive('draggable', [function() {
			return new $Client_Directives_DraggableDirective();
		}]).directive('floatingWindow', ['UIManager', function(uiManagerService4) {
			return new $Client_Directives_FloatingWindowDirective(uiManagerService4);
		}]).directive('fancyList', [function() {
			return new $Client_Directives_FancyListDirective();
		}]).directive('chatBox', [function() {
			return new $Client_Directives_ChatBoxDirective();
		}]).directive('property', [function() {
			return new $Client_Directives_PropertyDirective();
		}]).directive('acgDrawCard', [function() {
			return new $Client_Directives_AcgDrawCardDirective();
		}]).directive('acgDrawSpace', [function() {
			return new $Client_Directives_AcgDrawSpaceDirective();
		}]).directive('acgTestDrawCard', [function() {
			return new $Client_Directives_AcgTestDrawCardDirective();
		}]).directive('acgTestDrawSpace', [function() {
			return new $Client_Directives_AcgTestDrawSpaceDirective();
		}]).directive('acgEffectTestDrawArea', [function() {
			return new $Client_Directives_AcgEffectTestDrawAreaDirective();
		}]).directive('acgEffectTestDrawText', [function() {
			return new $Client_Directives_AcgEffectTestDrawTextDirective();
		}]).directive('acgEffectTestDrawCard', [function() {
			return new $Client_Directives_AcgEffectTestDrawCardDirective();
		}]).directive('acgEffectTestDrawSpace', [function() {
			return new $Client_Directives_AcgEffectTestDrawSpaceDirective();
		}]).directive('acgTestDrawArea', [function() {
			return new $Client_Directives_AcgTestDrawAreaDirective();
		}]).directive('acgTestDrawText', [function() {
			return new $Client_Directives_AcgTestDrawTextDirective();
		}]).directive('acgSpaces', ['$compile', 'gameContentManager', function(compile, gameContentManager1) {
			return new $Client_Directives_AcgSpacesDirective(compile, gameContentManager1);
		}]);
	};
	$Client_BuildAngular.$buildRouteProvider = function(provider) {
	};
	$Client_BuildAngular.$buildHttpProvider = function(httpProvider) {
		httpProvider.defaults.useXDomain = true;
		delete httpProvider.defaults.headers.common['X-Requested-With'];
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.BuildSite
	var $Client_BuildSite = function(gatewayServerAddress) {
		this.$gatewayServerAddress = null;
		$Client_BuildSite.instance = this;
		this.$gatewayServerAddress = gatewayServerAddress;
		$Client_BuildSite.$loadJunk(CommonLibraries.Constants.webIP, ss.mkdel(this, this.$ready));
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
			window.addEventListener('scroll', function(e) {
				window.scrollTo(0, 0);
				e.stopImmediatePropagation();
			});
			document.body.style['overflow'] = 'hidden';
			document.body.addEventListener('contextmenu', function(e1) {
				//  e.PreventDefault();
				//todo: Special right click menu;
			}, false);
			$Client_BuildAngular.setup(this.$gatewayServerAddress);
			angular.bootstrap(window.document, ['acg']);
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
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/jquery-ui.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/codemirror/lib/codemirror.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/codemirror/theme/night.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/site.css');
		var stepThree = function() {
			scriptLoader.load([url + 'lib/RawDeflate.js'], true, ready);
		};
		var stepTwo = function() {
			scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js'], false, stepThree);
		};
		scriptLoader.load([url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/lib/codemirror.js'], false, stepTwo);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.ActiveLobbyController
	var $Client_Controllers_$ActiveLobbyController = function(scope, uiManager, clientSiteManagerService, clientChatManagerService, createUIService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myClientChatManagerService = null;
		this.$myCreateUIService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myClientChatManagerService = clientChatManagerService;
		this.$myCreateUIService = createUIService;
		this.$myScope.model = $Client_Scope_Controller_ActiveLobbyModel.$ctor();
		this.$myScope.model.chatLines = [];
		this.$myScope.visible = false;
		this.$myScope.model.windowClosed = ss.delegateCombine(this.$myScope.model.windowClosed, ss.mkdel(this, function() {
			this.$myScope.swingAway(4, false, null);
			this.$myClientSiteManagerService.leaveRoom({ room: this.$myScope.model.room });
			uiManager.roomLeft();
		}));
		uiManager.onRoomJoined = ss.mkdel(this, function(room) {
			this.$myScope.visible = true;
			this.$myScope.swingAway(4, true, null);
			this.$myScope.model.room = room;
			this.$populateGameRoom(room);
			this.$myScope.swingBack(null);
			this.$myScope.$apply();
		});
		this.$myScope.model.startGame = ss.delegateCombine(this.$myScope.model.startGame, ss.mkdel(this, function() {
			this.$myCreateUIService.create$1('GameUI');
			//                                           uiManager.GameManager.StartGame();
			clientSiteManagerService.startGame({});
			//UIWindow.Height = 200;
		}));
		this.$myScope.model.sendChatMessage = ss.delegateCombine(this.$myScope.model.sendChatMessage, ss.mkdel(this, function() {
			if (this.$myScope.model.currentChatMessage.trim() === '') {
				return;
			}
			this.$myClientChatManagerService.sendChatMessage({ message: this.$myScope.model.currentChatMessage.trim() });
			this.$myScope.model.currentChatMessage = '';
		}));
		this.$myClientSiteManagerService.add_onGetRoomInfoReceived(ss.mkdel(this, this.$getRoomInfo));
		this.$myClientChatManagerService.add_onGetChatLines(ss.mkdel(this, this.$getChatLines));
		this.$myClientChatManagerService.add_onGetChatInfo(ss.mkdel(this, this.$getChatInfo));
	};
	$Client_Controllers_$ActiveLobbyController.prototype = {
		$getChatLines: function(user, o) {
			ss.arrayAddRange(this.$myScope.model.chatLines, o.messages);
			this.$myScope.$apply();
		},
		$getChatInfo: function(user, o) {
			this.$populateChatRoom(o.info);
		},
		$getRoomInfo: function(user, o) {
			this.$populateGameRoom(o.room);
		},
		$populateChatRoom: function(roomDataData) {
			this.$myScope.model.users = roomDataData.users;
			ss.arrayAddRange(this.$myScope.model.chatLines, roomDataData.messages);
			this.$myScope.$apply();
		},
		$populateGameRoom: function(roomModel) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.CreateRoomController
	var $Client_Controllers_$CreateRoomController = function(scope, uiManager) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myScope = scope;
		this.$myScope.visible = false;
		this.$myUIManager = uiManager;
		this.$myScope.model = $Client_Scope_Controller_CreateRoomModel.$ctor();
		this.$myScope.model.windowClosed = ss.mkdel(this, function() {
			this.$myScope.swingAway(2, false, null);
			this.$myScope.visible = false;
		});
		this.$myScope.model.createRoom = ss.mkdel(this, this.$createRoomFn);
		uiManager.openCreateRoomDialog = ss.delegateCombine(uiManager.openCreateRoomDialog, ss.mkdel(this, function() {
			this.$myScope.visible = true;
			this.$myScope.swingAway(6, true, null);
			this.$myScope.swingBack(null);
		}));
	};
	$Client_Controllers_$CreateRoomController.prototype = {
		$createRoomFn: function() {
			this.$myScope.swingAway(2, false, null);
			this.$myUIManager.createRoom(this.$myScope.model.roomName);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameCodeController
	var $Client_Controllers_$GameCodeController = function(scope, uiManager, clientSiteManagerService, messageService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myMessageService = null;
		//scope.Model.
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myMessageService = messageService;
		scope.visible = true;
		scope.$watch('model.code', function() {
		});
		eval('window.ACGIntellisense= $Client_Controllers_$GameCodeController.$build');
	};
	$Client_Controllers_$GameCodeController.$build = function(editor, options) {
		var val = editor.getValue();
		var cur = editor.getCursor();
		var token = editor.getTokenAt(cur);
		switch (token.string) {
			case '.':
			case '=':
			case '+': {
				cur.ch++;
				token = editor.getTokenAt(cur);
				break;
			}
		}
		var oldVal = val;
		if (token.string.trim() === '') {
			val = $Client_Controllers_$GameCodeController.$splice(val, editor.indexFromPos(cur), 0, '$$$');
			cur.ch++;
		}
		var top;
		try {
			top = UglifyJS.parse(val);
		}
		catch ($t1) {
			top = UglifyJS.parse(oldVal);
		}
		top.figure_out_scope();
		//
		//            foreach (var astStatement in top.Body)
		//
		//            {
		//
		//            switch (astStatement.Type)
		//
		//            {
		//
		//            case NodeType.SimpleStatement:
		//
		//            var m = (AST_SimpleStatement)astStatement;
		//
		//            var j = m.Body.Type;
		//
		//            Console.Log(j);
		//
		//            break;
		//
		//            }
		//
		//            }
		var goodNode = null;
		var alrightNode = null;
		top.walk(new UglifyJS.TreeWalker(function(node, descend) {
			if (ss.isValue(goodNode)) {
				return true;
			}
			if ($Client_Controllers_$GameCodeController.$nodeContains(cur, node)) {
				goodNode = node;
				return true;
			}
			if ($Client_Controllers_$GameCodeController.$nodeAfter(cur, node)) {
				alrightNode = node;
			}
			return false;
		}));
		if (ss.isNullOrUndefined(goodNode)) {
			goodNode = alrightNode;
		}
		console.log(goodNode);
		var $t2 = [];
		ss.add($t2, 'aa');
		ss.add($t2, 'bb');
		ss.add($t2, 'cc');
		return { list: $t2, to: CodeMirror.Pos(cur.line, token.start), from: CodeMirror.Pos(cur.line, token.end) };
	};
	$Client_Controllers_$GameCodeController.$splice = function(str, start, leave, piece) {
		return str.substr(0, start) + piece + str.substring(start + Math.abs(leave));
	};
	$Client_Controllers_$GameCodeController.$nodeContains = function(cur, node) {
		if (node.start.line === cur.line + 1 && node.end.line === cur.line + 1) {
			return node.start.col <= cur.ch && node.end.col + node.end.value.length > cur.ch;
		}
		return false;
	};
	$Client_Controllers_$GameCodeController.$nodeAfter = function(cur, node) {
		if (node.start.line >= cur.line + 1 && node.start.col >= cur.ch) {
			return true;
		}
		return node.start.line >= cur.line + 1;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameEditorController
	var $Client_Controllers_$GameEditorController = function(scope, uiManager, clientSiteManagerService, messageService, createUIService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myMessageService = null;
		this.$myCreateUIService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myMessageService = messageService;
		this.$myCreateUIService = createUIService;
		this.$myScope.model = $Client_Scope_Controller_GameEditorModel.$ctor();
		this.$myScope.model.openCode = ss.mkdel(this, this.$openCodeFn);
		this.$myScope.model.openEffects = ss.mkdel(this, this.$openEffectsFn);
		this.$myScope.model.openLayout = ss.mkdel(this, this.$openLayoutFn);
		this.$myScope.model.openTest = ss.mkdel(this, this.$openTestFn);
		var $t2 = this.$myScope.model;
		var $t1 = $Client_Scope_Controller_GameEditorSelectionScopeModel.$ctor();
		$t1.showGrid = true;
		$t2.selection = $t1;
		this.$myScope.visible = false;
		uiManager.openGameEditor = ss.delegateCombine(uiManager.openGameEditor, ss.mkdel(this, function(game) {
			this.$myScope.visible = true;
			this.$myScope.swingAway(2, true, null);
			this.$myScope.swingBack(null);
			this.$myScope.model.game = game;
		}));
		this.$myScope.onClose = ss.delegateCombine(this.$myScope.onClose, function() {
			//todo destroy spawned
		});
		this.$myScope.$watch('model.game', ss.mkdel(this, function() {
			this.$myScope.model.updateStatus = 'dirty';
		}), true);
		this.$myClientSiteManagerService.add_onDeveloperUpdateGameReceived(ss.mkdel(this, this.$onDeveloperUpdateGameReceivedFn));
		this.$myScope.model.updateStatus = 'synced';
		this.$myScope.model.updateGame = ss.mkdel(this, this.$updateGameFn);
	};
	$Client_Controllers_$GameEditorController.prototype = {
		$openTestFn: function() {
		},
		$openLayoutFn: function() {
			this.$myCreateUIService.createSingleton$2($Client_Scope_Controller_GameLayoutEditorScope).call(this.$myCreateUIService, 'GameLayoutEditor', ss.mkdel(this, function(scope, elem) {
				scope.model = $Client_Scope_Controller_GameLayoutEditorScopeModel.$ctor();
				scope.model.game = this.$myScope.model.game;
				scope.model.selection = this.$myScope.model.selection;
			}));
		},
		$openEffectsFn: function() {
			this.$myCreateUIService.createSingleton$2($Client_Scope_Controller_GameEffectsEditorScope).call(this.$myCreateUIService, 'GameEffectsEditor', ss.mkdel(this, function(scope, elem) {
				scope.model = $Client_Scope_Controller_GameEffectsEditorScopeModel.$ctor();
				scope.model.game = this.$myScope.model.game;
				scope.model.selection = this.$myScope.model.selection;
			}));
		},
		$openCodeFn: function() {
			this.$myCreateUIService.createSingleton$2($Client_Scope_Controller_GameCodeScope).call(this.$myCreateUIService, 'GameCodeEditor', ss.mkdel(this, function(scope, elem) {
				scope.model = $Client_Scope_Controller_GameCodeScopeModel.$ctor();
				scope.model.code = this.$myScope.model.game.gameCode;
			}));
		},
		$onDeveloperUpdateGameReceivedFn: function(user, o) {
			this.$myScope.model.updateStatus = 'synced';
			this.$myScope.$apply();
		},
		$updateGameFn: function() {
			this.$myScope.model.updateStatus = 'syncing';
			this.$myClientSiteManagerService.developerUpdateGame(this.$myScope.model.game);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameEffectsEditorController
	var $Client_Controllers_$GameEffectsEditorController = function(scope, createUIService) {
		this.$myScope = null;
		this.$createUIService = null;
		this.$myScope = scope;
		this.$createUIService = createUIService;
		var effectTypes = [];
		ss.add(effectTypes, 'bend');
		ss.add(effectTypes, 'highlight');
		ss.add(effectTypes, 'rotate');
		ss.add(effectTypes, 'styleProperty');
		scope.visible = true;
		this.$myScope.model.effectTypes = effectTypes;
		this.$myScope.model.newEffectType = 'bend';
		this.$myScope.model.newEffectName = '';
		this.$myScope.model.addEffect = ss.mkdel(this, this.$addEffectFn);
		this.$myScope.model.removeEffect = ss.mkdel(this, this.$removeEffectFn);
		this.$myScope.$watch('model.selection.selectedEffect', ss.mkdel(this, function() {
			if (ss.isValue(this.$myScope.model.selection.selectedEffect)) {
			}
		}));
		createUIService.createSingleton$2($Client_Scope_Controller_EffectTesterControllerScope).call(createUIService, 'EffectTester', ss.mkdel(this, function(_scope, elem) {
			_scope.model = $Client_Scope_Controller_EffectTesterControllerScopeModel.$ctor();
			_scope.model.game = this.$myScope.model.game;
			_scope.model.selection = this.$myScope.model.selection;
		}));
	};
	$Client_Controllers_$GameEffectsEditorController.prototype = {
		$addEffectFn: function() {
			var effect;
			ss.add(this.$myScope.model.game.effects, effect = $Client_Controllers_$GameEffectsEditorController.$makeEffect(this.$myScope.model.newEffectName, this.$myScope.model.newEffectType));
			this.$myScope.model.newEffectType = 'bend';
			this.$myScope.model.newEffectName = '';
			this.$myScope.model.selection.selectedEffect = effect;
		},
		$removeEffectFn: function(effect) {
			ss.remove(this.$myScope.model.game.effects, effect);
			this.$myScope.model.selection.selectedEffect = null;
		}
	};
	$Client_Controllers_$GameEffectsEditorController.$makeEffect = function(effectName, type) {
		var $t1 = new Models.SiteManagerModels.Game.GameEffectModel();
		$t1.name = effectName;
		var effect = $t1;
		effect.type = type;
		switch (effect.type) {
			case 'highlight': {
				var $t3 = effect.properties;
				var $t2 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t2.name = 'Radius';
				$t2.value = 5;
				$t2.type = 'number';
				ss.add($t3, $t2);
				var $t5 = effect.properties;
				var $t4 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t4.name = 'Color';
				$t4.value = '#242444';
				$t4.type = 'color';
				ss.add($t5, $t4);
				var $t7 = effect.properties;
				var $t6 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t6.name = 'Opacity';
				$t6.value = 0.5;
				$t6.type = 'number';
				ss.add($t7, $t6);
				var $t9 = effect.properties;
				var $t8 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t8.name = 'Rotate';
				$t8.value = 0;
				$t8.type = 'number';
				ss.add($t9, $t8);
				var $t11 = effect.properties;
				var $t10 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t10.name = 'OffsetX';
				$t10.value = 0;
				$t10.type = 'number';
				ss.add($t11, $t10);
				var $t13 = effect.properties;
				var $t12 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t12.name = 'OffsetY';
				$t12.value = 0;
				$t12.type = 'number';
				ss.add($t13, $t12);
				break;
			}
			case 'rotate': {
				var $t15 = effect.properties;
				var $t14 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t14.name = 'Degrees';
				$t14.value = 90;
				$t14.type = 'number';
				ss.add($t15, $t14);
				break;
			}
			case 'bend': {
				var $t17 = effect.properties;
				var $t16 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t16.name = 'Degrees';
				$t16.value = 15;
				$t16.type = 'number';
				ss.add($t17, $t16);
				break;
			}
			case 'styleProperty': {
				var $t19 = effect.properties;
				var $t18 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t18.name = 'Property Name';
				$t18.value = 'background-color';
				$t18.type = 'text';
				ss.add($t19, $t18);
				var $t21 = effect.properties;
				var $t20 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t20.name = 'Property Value';
				$t20.value = 'red';
				$t20.type = 'text';
				ss.add($t21, $t20);
				break;
			}
			case 'animated': {
				var $t23 = effect.properties;
				var $t22 = Models.SiteManagerModels.Game.GameEffectPropertyModel.$ctor();
				$t22.name = 'idk';
				$t22.value = 'rite?';
				$t22.type = 'text';
				ss.add($t23, $t22);
				break;
			}
		}
		return effect;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameLayoutEditorController
	var $Client_Controllers_$GameLayoutEditorController = function(scope, uiManager, clientSiteManagerService, messageService, createUIService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myMessageService = null;
		this.$myCreateUIService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myMessageService = messageService;
		this.$myCreateUIService = createUIService;
		this.$myScope.visible = true;
		this.$myScope.model.toggleGrid = ss.mkdel(this, this.$toggleGridFn);
		this.$myScope.model.selection.selectedLayoutPiece = 'none';
		this.$myScope.$watch('model.selection.selectedSpace', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selection.selectedSpace)) {
				return;
			}
			this.$myScope.model.selection.selectedText = null;
			this.$myScope.model.selection.selectedArea = null;
			this.$myScope.model.selection.selectedLayoutPiece = 'space';
			for (var $t1 = 0; $t1 < this.$myScope.model.selection.selectedScenario.spaces.length; $t1++) {
				var gameLayoutScenarioSpace = this.$myScope.model.selection.selectedScenario.spaces[$t1];
				if (ss.referenceEquals(gameLayoutScenarioSpace.spaceGuid, this.$myScope.model.selection.selectedSpace.guid)) {
					this.$myScope.model.selection.selectedScenarioSpace = gameLayoutScenarioSpace;
					break;
				}
			}
		}));
		this.$myScope.$watch('model.selection.selectedText', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selection.selectedText)) {
				return;
			}
			this.$myScope.model.selection.selectedSpace = null;
			this.$myScope.model.selection.selectedArea = null;
			this.$myScope.model.selection.selectedLayoutPiece = 'text';
		}));
		this.$myScope.$watch('model.selection.selectedArea', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selection.selectedArea)) {
				return;
			}
			this.$myScope.model.selection.selectedText = null;
			this.$myScope.model.selection.selectedSpace = null;
			this.$myScope.model.selection.selectedLayoutPiece = 'area';
		}));
		this.$myScope.model.addText = ss.mkdel(this, this.$addTextFn);
		this.$myScope.model.addArea = ss.mkdel(this, this.$addAreaFn);
		this.$myScope.model.addSpace = ss.mkdel(this, this.$addSpaceFn);
		this.$myScope.model.removeArea = ss.mkdel(this, this.$removeAreaFn);
		this.$myScope.model.removeSpace = ss.mkdel(this, this.$removeSpaceFn);
		this.$myScope.model.removeText = ss.mkdel(this, this.$removeTextFn);
		this.$myScope.model.openScenarios = ss.mkdel(this, this.$openScenariosFn);
		this.$myScope.$watch('model.game', ss.mkdel(this, function() {
			this.$myScope.model.updateStatus = 'dirty';
		}), true);
		this.$myClientSiteManagerService.add_onDeveloperUpdateGameReceived(ss.mkdel(this, this.$onDeveloperUpdateGameReceivedFn));
		this.$myScope.model.updateStatus = 'synced';
		this.$myScope.model.updateGame = ss.mkdel(this, this.$updateGameFn);
		this.$myCreateUIService.createSingleton$2($Client_Scope_Controller_TestGameControllerScope).call(this.$myCreateUIService, 'TestGameUI', ss.mkdel(this, function(_scope, elem) {
			_scope.model = $Client_Scope_Controller_TestGameControllerScopeModel.$ctor();
			_scope.model.game = this.$myScope.model.game;
			_scope.model.selection = this.$myScope.model.selection;
		}));
	};
	$Client_Controllers_$GameLayoutEditorController.prototype = {
		$toggleGridFn: function() {
			this.$myScope.model.selection.showGrid = !this.$myScope.model.selection.showGrid;
		},
		$openScenariosFn: function() {
			this.$myCreateUIService.createSingleton$2($Client_Scope_Controller_GameScenarioEditorScope).call(this.$myCreateUIService, 'GameScenarioEditor', ss.mkdel(this, function(_scope, elem) {
				_scope.model = $Client_Scope_Controller_GameScenarioEditorScopeModel.$ctor();
				_scope.model.game = this.$myScope.model.game;
				_scope.model.selection = this.$myScope.model.selection;
			}));
		},
		$removeSpaceFn: function(arg) {
			ss.remove(this.$myScope.model.game.gameLayout.spaces, arg);
			this.$myScope.model.selection.selectedSpace = null;
			this.$myScope.model.selection.selectedLayoutPiece = 'none';
		},
		$removeAreaFn: function(arg) {
			ss.remove(this.$myScope.model.game.gameLayout.areas, arg);
			this.$myScope.model.selection.selectedArea = null;
			this.$myScope.model.selection.selectedLayoutPiece = 'none';
		},
		$removeTextFn: function(arg) {
			ss.remove(this.$myScope.model.game.gameLayout.texts, arg);
			this.$myScope.model.selection.selectedText = null;
			this.$myScope.model.selection.selectedLayoutPiece = 'none';
		},
		$addSpaceFn: function() {
			var spaces = this.$myScope.model.game.gameLayout.spaces;
			var $t1 = Models.SiteManagerModels.Game.GameSpaceModel.$ctor();
			$t1.name = 'Space' + (spaces.length + 1);
			$t1.layoutType = 'grow';
			$t1.guid = CommonLibraries.Guid.newGuid();
			$t1.left = 0;
			$t1.top = 0;
			$t1.height = 1;
			$t1.width = 1;
			ss.add(spaces, $t1);
		},
		$addAreaFn: function() {
			var areas = this.$myScope.model.game.gameLayout.areas;
			var $t1 = Models.SiteManagerModels.Game.GameAreaModel.$ctor();
			$t1.name = 'Area' + (areas.length + 1);
			$t1.left = 0;
			$t1.top = 0;
			ss.add(areas, $t1);
		},
		$addTextFn: function() {
			var texts = this.$myScope.model.game.gameLayout.texts;
			var $t1 = Models.SiteManagerModels.Game.GameTextModel.$ctor();
			$t1.name = 'Text' + (texts.length + 1);
			$t1.left = 0;
			$t1.top = 0;
			ss.add(texts, $t1);
		},
		$onDeveloperUpdateGameReceivedFn: function(user, o) {
			this.$myScope.model.updateStatus = 'synced';
			this.$myScope.$apply();
		},
		$updateGameFn: function() {
			this.$myScope.model.updateStatus = 'syncing';
			this.$myClientSiteManagerService.developerUpdateGame(this.$myScope.model.game);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameManagerController
	var $Client_Controllers_$GameManagerController = function(scope, uiManager, clientSiteManagerService, messageService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myMessageService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myMessageService = messageService;
		this.$myScope.model = $Client_Scope_Controller_GameManagerModel.$ctor();
		this.$myScope.visible = true;
		this.$myClientSiteManagerService.getGamesByUser(this.$myUIManager.clientInfo.loggedInUser.hash);
		this.$myClientSiteManagerService.add_onGetGamesByUserReceived(ss.mkdel(this, this.$onOnGetGamesByUserReceivedFn));
		this.$myClientSiteManagerService.add_onDeveloperCreateGameReceived(ss.mkdel(this, this.$onDeveloperCreateGameReceivedFn));
		this.$myClientSiteManagerService.add_onDoesGameNameExistReceived(ss.mkdel(this, this.$onDoesGameNameExistReceivedFn));
		this.$myScope.model.createGame = ss.delegateCombine(this.$myScope.model.createGame, ss.mkdel(this, this.$createGameFn));
		this.$myScope.model.deleteGame = ss.delegateCombine(this.$myScope.model.deleteGame, ss.mkdel(this, this.$deleteGameFn));
		this.$myScope.$watch('model.selectedGame', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selectedGame)) {
				return;
			}
			uiManager.openGameEditor(this.$myScope.model.selectedGame);
			if (!scope.minimized) {
				scope.minimize();
			}
		}));
	};
	$Client_Controllers_$GameManagerController.prototype = {
		$deleteGameFn: function() {
			ss.remove(this.$myScope.model.games, this.$myScope.model.selectedGame);
			this.$myScope.model.selectedGame.deleted = true;
			this.$myClientSiteManagerService.developerUpdateGame(this.$myScope.model.selectedGame);
		},
		$onDoesGameNameExistReceivedFn: function(user, o) {
		},
		$onDeveloperCreateGameReceivedFn: function(user, o) {
		},
		$createGameFn: function() {
			this.$myMessageService.popupQuestion('Youre creating a game!', 'Game Name:', ss.mkdel(this, function(name) {
				this.$myClientSiteManagerService.developerCreateGame(name);
				this.$myClientSiteManagerService.getGamesByUser(this.$myUIManager.clientInfo.loggedInUser.hash);
			}));
		},
		$onOnGetGamesByUserReceivedFn: function(user, response) {
			this.$myScope.model.games = response.games;
			this.$myScope.model.selectedGame = this.$myScope.model.games[0];
			this.$myScope.$apply();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameScenarioEditorController
	var $Client_Controllers_$GameScenarioEditorController = function(scope, uiManager, clientSiteManagerService, messageService, createUIService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myMessageService = null;
		this.$myCreateUIService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myMessageService = messageService;
		this.$myCreateUIService = createUIService;
		this.$myScope.visible = true;
		this.$myScope.$watch('model.game', ss.mkdel(this, function() {
			this.$myScope.model.updateStatus = 'dirty';
		}), true);
		this.$myScope.$watch('model.selection.selectedScenario', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selection.selectedScenario)) {
				return;
			}
			this.$myScope.model.selection.selectedScenarioEffect = null;
			this.$myScope.model.selection.selectedScenarioSpace = null;
			for (var $t1 = 0; $t1 < this.$myScope.model.selection.selectedScenario.spaces.length; $t1++) {
				var gameLayoutScenarioSpace = this.$myScope.model.selection.selectedScenario.spaces[$t1];
				if (ss.referenceEquals(gameLayoutScenarioSpace.spaceGuid, this.$myScope.model.selection.selectedSpace.guid)) {
					this.$myScope.model.selection.selectedScenarioSpace = gameLayoutScenarioSpace;
					break;
				}
			}
		}));
		this.$myScope.$watch('model.selection.selectedScenarioSpace', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selection.selectedScenarioSpace)) {
				return;
			}
			this.$myScope.model.selection.selectedScenarioEffect = null;
			this.$myScope.model.selection.selectedScenarioPiece = 'space';
		}));
		this.$myScope.$watch('model.selection.selectedScenarioEffect', ss.mkdel(this, function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selection.selectedScenarioEffect)) {
				return;
			}
			this.$myScope.model.selection.selectedScenarioSpace = null;
			this.$myScope.model.selection.selectedScenarioPiece = 'effect';
		}));
		this.$myScope.model.getSpaceByScenarioSpace = ss.mkdel(this, this.$getSpaceByScenarioSpaceFn);
		this.$myScope.model.addCard = ss.mkdel(this, this.$addCardFn);
		this.$myScope.model.removeCard = ss.mkdel(this, this.$removeCardFn);
		this.$myScope.model.addNewScenario = ss.mkdel(this, this.$addNewScenarioFn);
		this.$myScope.model.cloneNewScenario = ss.mkdel(this, this.$cloneNewScenarioFn);
		this.$myClientSiteManagerService.add_onDeveloperUpdateGameReceived(ss.mkdel(this, this.$onDeveloperUpdateGameReceivedFn));
		this.$myScope.model.updateStatus = 'synced';
		this.$myScope.model.updateGame = ss.mkdel(this, this.$updateGameFn);
	};
	$Client_Controllers_$GameScenarioEditorController.prototype = {
		$addNewScenarioFn: function() {
			var $t2 = this.$myScope.model.game.gameLayoutScenarios;
			var $t1 = Models.SiteManagerModels.Game.GameLayoutScenario.$ctor();
			$t1.spaces = [];
			$t1.effects = [];
			$t1.name = 'Scenario' + this.$myScope.model.game.gameLayoutScenarios.length;
			$t1.numberOfPlayers = 6;
			$t1.screenSize = new CommonLibraries.IntPoint(1024, 768);
			ss.add($t2, $t1);
		},
		$cloneNewScenarioFn: function() {
			var $t4 = this.$myScope.model.game.gameLayoutScenarios;
			var $t1 = Models.SiteManagerModels.Game.GameLayoutScenario.$ctor();
			$t1.spaces = this.$myScope.model.selection.selectedScenario.spaces.map(function(e) {
				var $t2 = Models.SiteManagerModels.Game.GameLayoutScenarioSpace.$ctor();
				$t2.spaceGuid = e.spaceGuid;
				$t2.cards = e.cards.map(function(c) {
					var $t3 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
					$t3.state = c.state;
					$t3.value = c.value;
					$t3.type = c.type;
					return $t3;
				});
				return $t2;
			});
			$t1.effects = this.$myScope.model.selection.selectedScenario.effects.map(function(e1) {
				return Models.SiteManagerModels.Game.GameLayoutScenarioEffect.$ctor();
			});
			$t1.name = 'Clone Of ' + this.$myScope.model.selection.selectedScenario.name;
			$t1.numberOfPlayers = this.$myScope.model.selection.selectedScenario.numberOfPlayers;
			$t1.screenSize = this.$myScope.model.selection.selectedScenario.screenSize;
			ss.add($t4, $t1);
		},
		$removeCardFn: function(arg) {
			ss.remove(this.$myScope.model.selection.selectedScenarioSpace.cards, arg);
		},
		$addCardFn: function() {
			var $t2 = this.$myScope.model.selection.selectedScenarioSpace.cards;
			var $t1 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t1.state = 'faceUp';
			$t1.type = 3;
			$t1.value = 11;
			ss.add($t2, $t1);
		},
		$getSpaceByScenarioSpaceFn: function(space) {
			for (var $t1 = 0; $t1 < this.$myScope.model.game.gameLayout.spaces.length; $t1++) {
				var gameSpaceModel = this.$myScope.model.game.gameLayout.spaces[$t1];
				if (ss.referenceEquals(gameSpaceModel.guid, space.spaceGuid)) {
					return gameSpaceModel;
				}
			}
			return null;
		},
		$onDeveloperUpdateGameReceivedFn: function(user, o) {
			this.$myScope.model.updateStatus = 'synced';
			this.$myScope.$apply();
		},
		$updateGameFn: function() {
			this.$myScope.model.updateStatus = 'syncing';
			this.$myClientSiteManagerService.developerUpdateGame(this.$myScope.model.game);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.HomeController
	var $Client_Controllers_$HomeController = function(scope, uiManager, clientSiteManagerService, createUIService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myCreateUIService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myCreateUIService = createUIService;
		this.$myScope.model = $Client_Scope_Controller_HomeModel.$ctor();
		this.$myUIManager.userLoggedIn = ss.delegateCombine(this.$myUIManager.userLoggedIn, ss.mkdel(this, this.$myUIManager_UserLoggedIn));
		this.$myScope.visible = false;
		scope.model.gameTypeSelected = ss.delegateCombine(scope.model.gameTypeSelected, ss.mkdel(this, this.$gameTypeSelectedFn));
		scope.model.roomSelected = ss.delegateCombine(scope.model.roomSelected, ss.mkdel(this, this.$roomSelectedFn));
		scope.model.createRoom = ss.delegateCombine(scope.model.createRoom, ss.mkdel(this, this.$createRoomFn));
		scope.model.createGame = ss.delegateCombine(scope.model.createGame, ss.mkdel(this, this.$createGameFn));
		scope.model.joinRoom = ss.delegateCombine(scope.model.joinRoom, ss.mkdel(this, this.$joinRoomFn));
		scope.$watch(ss.mkdel(this, function(_scope) {
			return this.$myScope.model.selectedGameType;
		}), function() {
			scope.model.gameTypeSelected();
		});
		//  scope.watch<HomeScope>((_scope) => { return myScope.Model.SelectedRoom; },
		//  () =>
		//  {
		//  scope.Model.RoomSelected();
		//  });
		this.$myUIManager.roomLeft = ss.delegateCombine(this.$myUIManager.roomLeft, ss.mkdel(this, function() {
			this.$myScope.swingBack(null);
		}));
		this.$myClientSiteManagerService.add_onGetGameTypesReceived(ss.mkdel(this, this.$populateGames));
		this.$myClientSiteManagerService.add_onGetRoomsReceived(ss.mkdel(this, this.$populateRooms));
		this.$myClientSiteManagerService.add_onRoomJoined(ss.mkdel(this, this.$roomJoined));
		this.$myClientSiteManagerService.add_onGetRoomInfoReceived(ss.mkdel(this, this.$getRoomInfoReceived));
	};
	$Client_Controllers_$HomeController.prototype = {
		$createGameFn: function() {
			this.$myCreateUIService.create$1('GameManager');
			this.$myScope.minimize();
		},
		$joinRoomFn: function() {
			this.$myClientSiteManagerService.joinRoom({ gameType: this.$myScope.model.selectedGameType.name, roomName: this.$myScope.model.selectedRoom.roomName });
		},
		$createRoomFn: function() {
			var action = null;
			action = ss.mkdel(this, function(roomName) {
				this.$myClientSiteManagerService.createRoom({ gameType: this.$myScope.model.selectedGameType.name, roomName: roomName });
				this.$myUIManager.createRoom = ss.delegateRemove(this.$myUIManager.createRoom, action);
			});
			this.$myUIManager.createRoom = ss.delegateCombine(this.$myUIManager.createRoom, action);
			this.$myUIManager.openCreateRoomDialog();
		},
		$roomSelectedFn: function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selectedGameType) || ss.isNullOrUndefined(this.$myScope.model.selectedRoom)) {
				return;
			}
			this.$myClientSiteManagerService.getRoomInfo({ gameType: this.$myScope.model.selectedGameType.name, roomName: this.$myScope.model.selectedRoom.roomName });
		},
		$gameTypeSelectedFn: function() {
			if (ss.isNullOrUndefined(this.$myScope.model.selectedGameType)) {
				return;
			}
			this.$myClientSiteManagerService.getRooms({ gameType: this.$myScope.model.selectedGameType.name });
			this.$myScope.model.selectedRoom = null;
		},
		$getRoomInfoReceived: function(user, o) {
			for (var i = 0; i < this.$myScope.model.rooms.length; i++) {
				if (ss.referenceEquals(this.$myScope.model.rooms[i].id, o.room.id)) {
					ss.removeAt(this.$myScope.model.rooms, i);
					ss.insert(this.$myScope.model.rooms, i, o.room);
					break;
				}
			}
			this.$populateRoom(o.room);
		},
		$roomJoined: function(user, o) {
			this.$populateRoom(o.room);
			this.$myScope.swingAway(0, false, null);
			this.$myUIManager.onRoomJoined(o.room);
		},
		$populateGames: function(user, o) {
			this.$myScope.model.gameTypes = o.gameTypes;
			this.$myScope.model.selectedGameType = this.$myScope.model.gameTypes[0];
			this.$myScope.$apply();
			this.$myClientSiteManagerService.getRooms({ gameType: o.gameTypes[0].name });
		},
		$populateRooms: function(user, o) {
			this.$myScope.model.rooms = o.rooms;
			this.$myScope.model.selectedRoom = null;
			this.$myScope.$apply();
			if (this.$myScope.model.rooms.length === 0) {
				return;
			}
			this.$populateRoom(this.$myScope.model.rooms[0]);
		},
		$populateRoom: function(roomModel) {
			this.$myScope.model.selectedRoom = roomModel;
			this.$myScope.$apply();
		},
		$myUIManager_UserLoggedIn: function() {
			this.$myScope.visible = true;
			this.$myScope.swingAway(6, true, null);
			this.$myScope.swingBack(null);
			this.$myScope.$apply();
			this.$myScope.model.user = this.$myUIManager.clientInfo.loggedInUser;
			this.$myClientSiteManagerService.getGameTypes();
			this.$myCreateUIService.create$1('GameManager');
			this.$myScope.minimize();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.LoginController
	var $Client_Controllers_$LoginController = function(scope, uiManager, clientSiteManagerService, messageService, createUIService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myclientSiteManagerService = null;
		this.$myMessageService = null;
		this.$myCreateUIService = null;
		this.$myScope = scope;
		this.$myScope.visible = true;
		this.$myUIManager = uiManager;
		this.$myclientSiteManagerService = clientSiteManagerService;
		this.$myMessageService = messageService;
		this.$myCreateUIService = createUIService;
		this.$myScope.model = $Client_Scope_Controller_LoginScopeModel.$ctor();
		this.$myScope.model.windowClosed = function() {
			window.alert('woooo');
		};
		this.$myScope.model.loginAccount = ss.mkdel(this, this.$loginAccountFn);
		this.$myScope.model.createAccount = ss.mkdel(this, this.$createAccountFn);
		this.$myclientSiteManagerService.add_onLogin(ss.mkdel(this, this.$onLoginFn));
		this.$myclientSiteManagerService.add_onUserCreate(ss.mkdel(this, this.$onUserCreateFn));
		this.$myScope.model.username = 'dested1';
		this.$myScope.model.password = 'd';
		window.setTimeout(ss.mkdel(this, this.$loginAccountFn), 1000);
	};
	$Client_Controllers_$LoginController.prototype = {
		$onLoginFn: function(user, data) {
			if (data.successful) {
				this.$myUIManager.clientInfo.loggedInUser = user;
				this.$myUIManager.userLoggedIn();
				this.$myScope.swingAway(7, false, null);
			}
			else {
				this.$myMessageService.popupOkay('Bad!', 'You no login!', function() {
				});
			}
		},
		$onUserCreateFn: function(user, o) {
			if (o.successful) {
				this.$myUIManager.clientInfo.loggedInUser = user;
				this.$myUIManager.userLoggedIn();
				this.$myScope.swingAway(7, false, null);
			}
			else {
				this.$myMessageService.popupOkay('Bad!', 'You no create! It exist! What up!!?', function() {
				});
			}
		},
		$createAccountFn: function() {
			this.$myclientSiteManagerService.createUser(this.$myScope.model.username, this.$myScope.model.password);
		},
		$loginAccountFn: function() {
			this.$myclientSiteManagerService.login(this.$myScope.model.username, this.$myScope.model.password);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.MessageController
	var $Client_Controllers_$MessageController = function(scope) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myScope = scope;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.MinimizeController
	var $Client_Controllers_$MinimizeController = function(scope, uiManager) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		scope.items = [];
		uiManager.onMinimize = function(floatingWindowBaseScope) {
			ss.add(scope.items, floatingWindowBaseScope);
		};
		scope.open = ss.mkdel(this, this.$openFn);
		scope.remove = ss.mkdel(this, this.$removeFn);
	};
	$Client_Controllers_$MinimizeController.prototype = {
		$removeFn: function(arg) {
			arg.close();
			ss.remove(this.$myScope.items, arg);
		},
		$openFn: function(arg) {
			arg.restore();
			ss.remove(this.$myScope.items, arg);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.QuestionController
	var $Client_Controllers_$QuestionController = function(scope, uiManager, clientGameManagerService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientGameManagerService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientGameManagerService = clientGameManagerService;
		this.$myScope.model = $Client_Scope_Controller_QuestionScopeModel.$ctor();
		this.$myScope.model.windowClosed = function() {
			window.alert('woooo');
		};
		this.$myScope.model.answerQuestion = ss.mkdel(this, this.$answerQuestionFn);
		this.$myScope.visible = false;
		this.$myClientGameManagerService.add_onAskQuestion(ss.mkdel(this, function(user, gameSendAnswerModel) {
			window.setTimeout(ss.mkdel(this, function() {
				this.$myScope.visible = true;
				this.$myScope.swingAway(0, true, null);
				this.$myScope.swingBack(null);
				this.$onQuestionAskedFn(gameSendAnswerModel);
			}), 500);
		}));
	};
	$Client_Controllers_$QuestionController.prototype = {
		$onQuestionAskedFn: function(arg) {
			this.$myScope.model.question = arg.question;
			this.$myScope.model.answers = arg.answers;
			this.$myScope.model.selectedAnswer = arg.answers[0];
			this.$myScope.$apply();
		},
		$answerQuestionFn: function() {
			this.$myScope.swingAway(4, false, ss.mkdel(this, function() {
				this.$myClientGameManagerService.answerQuestion({ answer: ss.indexOf(this.$myScope.model.answers, this.$myScope.model.selectedAnswer) });
			}));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.EffectTesterController
	var $Client_Controllers_EffectTesterController = function(scope) {
		this.$scope = null;
		this.$scope = scope;
		scope.model.spaceTest = $Client_Scope_Controller_EffectTesterSpaceModel.$ctor();
		var $t2 = scope.model.spaceTest;
		var $t1 = Models.SiteManagerModels.Game.GameSpaceModel.$ctor();
		$t1.left = 3;
		$t1.top = 3;
		$t1.height = 2;
		$t1.width = 7;
		$t1.layoutType = 'grow';
		$t1.name = 'SpaceTest';
		$t1.vertical = false;
		$t2.space = $t1;
		var $t10 = scope.model.spaceTest;
		var $t3 = [];
		var $t4 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t4.state = 'faceDown';
		$t4.type = 1;
		$t4.value = 5;
		ss.add($t3, $t4);
		var $t5 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t5.state = 'faceDown';
		$t5.type = 1;
		$t5.value = 6;
		ss.add($t3, $t5);
		var $t6 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t6.state = 'faceDown';
		$t6.type = 1;
		$t6.value = 7;
		ss.add($t3, $t6);
		var $t7 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t7.state = 'faceDown';
		$t7.type = 1;
		$t7.value = 8;
		ss.add($t3, $t7);
		var $t8 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t8.state = 'faceDown';
		$t8.type = 1;
		$t8.value = 9;
		ss.add($t3, $t8);
		var $t9 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t9.state = 'faceDown';
		$t9.type = 1;
		$t9.value = 10;
		ss.add($t3, $t9);
		$t10.cards = $t3;
		scope.model.cardTest = $Client_Scope_Controller_EffectTesterCardModel.$ctor();
		var $t12 = scope.model.cardTest;
		var $t11 = Models.SiteManagerModels.Game.GameSpaceModel.$ctor();
		$t11.left = 3;
		$t11.top = 8;
		$t11.height = 2;
		$t11.width = 7;
		$t11.layoutType = 'grow';
		$t11.name = 'CardTest';
		$t11.vertical = false;
		$t12.space = $t11;
		var $t14 = scope.model.cardTest;
		var $t13 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
		$t13.state = 'faceDown';
		$t13.type = 2;
		$t13.value = 0;
		$t14.card = $t13;
		scope.model.areaTest = $Client_Scope_Controller_EffectTesterAreaModel.$ctor();
		var $t16 = scope.model.areaTest;
		var $t15 = Models.SiteManagerModels.Game.GameAreaModel.$ctor();
		$t15.left = 3;
		$t15.top = 6;
		$t15.height = 2;
		$t15.width = 2;
		$t15.name = 'AreaTest';
		$t16.area = $t15;
		scope.model.textTest = $Client_Scope_Controller_EffectTesterTextModel.$ctor();
		var $t18 = scope.model.textTest;
		var $t17 = Models.SiteManagerModels.Game.GameTextModel.$ctor();
		$t17.left = 7;
		$t17.top = 6;
		$t17.text = 'This is some text!';
		$t17.name = 'TextTest';
		$t18.text = $t17;
		scope.model.scale = new CommonLibraries.Point($(window).width() / scope.model.game.gameLayout.width * 0.9, $(window).height() / scope.model.game.gameLayout.height * 0.9);
		var addRule = (function(style) {
			var document = eval('window.document');
			var sheet = document.head.appendChild(style).sheet;
			return function(selector, css) {
				var propText = Object.keys(css).map(function(p) {
					return p + ':' + css[p];
				}).join(';');
				sheet.insertRule(selector + '{' + propText + '}', sheet.cssRules.length);
			};
		})(document.createElement('style'));
		var space = scope.model.spaceTest.space;
		addRule('.space' + space.name, {});
		addRule('.space' + space.name + '::before', {});
		addRule('.space' + space.name + '::after', {});
		var area = scope.model.areaTest.area;
		addRule('.area' + area.name, {});
		addRule('.area' + area.name + '::before', {});
		addRule('.area' + area.name + '::after', {});
		var text = scope.model.textTest.text;
		addRule('.text' + text.name, {});
		addRule('.text' + text.name + '::before', {});
		addRule('.text' + text.name + '::after', {});
		for (var t = 0; t < 4; t++) {
			for (var c = 0; c < 13; c++) {
				addRule('.card' + t + '-' + c + '', {});
				addRule('.card' + t + '-' + c + '::before', {});
				addRule('.card' + t + '-' + c + '::after', {});
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.GameController
	var $Client_Controllers_GameController = function(scope, clientGameManagerService, gameContentManager) {
		this.$scope = null;
		this.$myClientGameManagerService = null;
		this.$myGameContentManager = null;
		this.$scope = scope;
		this.$myClientGameManagerService = clientGameManagerService;
		this.$myGameContentManager = gameContentManager;
		// effectManager.Effects =new List<GameEffectModel>();
		// effectManager.Effects.Add(GameEffectsEditorController.makeEffect("bend", EffectType.Bend));
		//     myClientGameManagerService.OnAskQuestion += (user, gameSendAnswerModel) => {
		//     PageHandler.QuestionUI.Load(gameSendAnswerModel);
		//     //alert(JSON.stringify(data));
		//     PageHandler.TimeTracker.EndTime = new DateTime();
		//     var time = PageHandler.TimeTracker.EndTime - PageHandler.TimeTracker.StartTime;
		//     PageHandler.  DebugUI.lblHowFast.Text = ( "how long: " + time );
		//     };
		var addRule = (function(style) {
			var document = eval('window.document');
			var sheet = document.head.appendChild(style).sheet;
			return function(selector, css) {
				var propText = Object.keys(css).map(function(p) {
					return p + ':' + css[p];
				}).join(';');
				sheet.insertRule(selector + '{' + propText + '}', sheet.cssRules.length);
			};
		})(document.createElement('style'));
		this.$myClientGameManagerService.add_onUpdateState(ss.mkdel(this, function(user, update) {
			var data = JSON.parse((new Compressor()).DecompressText(update));
			var create = ss.isNullOrUndefined(scope.mainArea);
			scope.mainArea = data;
			if (create) {
				scope.scale = new CommonLibraries.Point(ss.Int32.div($(window).width(), scope.mainArea.size.width) * 0.9, ss.Int32.div($(window).height() - 250, scope.mainArea.size.height) * 0.9);
				for (var $t1 = 0; $t1 < scope.mainArea.spaces.length; $t1++) {
					var space = scope.mainArea.spaces[$t1];
					addRule('.space' + space.name, {});
					addRule('.space' + space.name + '::before', {});
					addRule('.space' + space.name + '::after', {});
					for (var $t2 = 0; $t2 < space.pile.cards.length; $t2++) {
						var card = space.pile.cards[$t2];
						card.appearance.effectNames = [];
						if (ss.startsWithString(space.name, 'User')) {
							ss.add(card.appearance.effectNames, 'bend');
						}
						addRule('.card' + card.type + '-' + card.value + '', {});
						addRule('.card' + card.type + '-' + card.value + '::before', {});
						addRule('.card' + card.type + '-' + card.value + '::after', {});
					}
				}
			}
			scope.$apply();
			this.$myGameContentManager.redraw();
		}));
		$(window).bind('resize', function(a) {
			scope.scale = new CommonLibraries.Point($(window).width() / scope.mainArea.size.width * 0.9, ($(window).height() - 250) / scope.mainArea.size.height * 0.9);
			scope.$apply();
		});
		this.$myClientGameManagerService.add_onGameStarted(function(user1, room) {
			//alert(JSON.stringify(data));
		});
		this.$myClientGameManagerService.add_onGameOver(function(user2, room1) {
			//alert(JSON.stringify(data));
		});
		scope.mainArea = null;
		//new Action<string,JsDictionary<string,object>>()
		// scope.MoveCard = () =>
		// {
		// 
		// for (var i = 0; i < 1; i++)
		// {
		// CardGameCard card = null;
		// while (card == null)
		// {
		// var pile = scope.MainArea.Spaces.RandomElement().Pile;
		// card = pile.Cards.RandomElement();
		// var _pile = scope.MainArea.Spaces.RandomElement();
		// 
		// if (card != null && _pile != null)
		// {
		// card.Appearance.EffectNames.Remove("bend");
		// if (_pile.Name.StartsWith("User"))
		// {
		// 
		// card.Appearance.EffectNames.Add("bend");
		// 
		// }
		// 
		// 
		// pile.Cards.Remove(card);
		// _pile.Pile.Cards.Add(card);
		// }
		// }
		// }
		// };
		// 
		// scope.AnimateCard = () =>
		// {
		// 
		// for (var i = 0; i < 1; i++)
		// {
		// CardGameCard card = null;
		// while (card == null)
		// {
		// var pile = scope.MainArea.Spaces.RandomElement().Pile;
		// card = pile.Cards.RandomElement();
		// var _pile = scope.MainArea.Spaces.RandomElement();
		// 
		// if (card != null && _pile != null)
		// {
		// 
		// var css = string.Format(".card{0}-{1}", card.Type, card.Value);
		// var clone = jQueryApi.jQuery.Select(css).FuckingClone();
		// 
		// 
		// var space = jQuery.Select(string.Format(".space{0}", _pile.Name));
		// var off = space.GetOffset();
		// 
		// clone.CSS("z-index", 1000);
		// 
		// JsDictionary ops = new JsDictionary();
		// ops["left"] = off.Left + space.GetWidth() / 2 - 71 / 2;
		// ops["top"] = off.Top + space.GetHeight() / 2 - 96 / 2;
		// ops["rotate"] = "0deg";
		// 
		// 
		// pile.Cards.Remove(card);
		// clone.Animate(ops, 700, (EffectEasing)(dynamic)("easeInOutQuart"), () =>
		// {
		// card.Appearance.EffectNames.Remove("bend");
		// if (_pile.Name.StartsWith("User"))
		// {
		// 
		// card.Appearance.EffectNames.Add("bend");
		// 
		// }
		// 
		// clone.Remove();
		// _pile.Pile.Cards.Add(card);
		// scope.Apply();
		// 
		// });
		// 
		// 
		// 
		// }
		// }
		// }
		// };
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.IntellisenseReturn
	var $Client_Controllers_IntellisenseReturn = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Controllers.TestGameController
	var $Client_Controllers_TestGameController = function(scope) {
		this.$scope = null;
		this.$scope = scope;
		//
		//                        effectManager.Effects = new List<GameEffectModel>();
		//
		//                        effectManager.Effects.Add(GameEffectsEditorController.makeEffect("bend", EffectType.Bend));
		scope.model.getCardsFromScenario = ss.mkdel(this, this.$getCardsFromScenarioFn);
		var scenario = this.$scope.model.selection.selectedScenario;
		if (ss.isNullOrUndefined(scenario)) {
			this.$scope.model.selection.selectedScenario = this.$scope.model.game.gameLayoutScenarios.filter(function(scen) {
				return scen.name === 'Default';
			})[0];
		}
		var addRule = (function(style) {
			var document = eval('window.document');
			var sheet = document.head.appendChild(style).sheet;
			return function(selector, css) {
				var propText = Object.keys(css).map(function(p) {
					return p + ':' + css[p];
				}).join(';');
				sheet.insertRule(selector + '{' + propText + '}', sheet.cssRules.length);
			};
		})(document.createElement('style'));
		//
		//                        effectWatcher.ApplyEffect += (effect) =>
		//
		//                        {
		//
		//                        if (scope.Model.Selection.SelectedCard == null)
		//
		//                        return;
		//
		//                        
		//
		//                        //todo scope.Model.Selection.SelectedCard.Appearance.EffectNames.Add(effect.Name);
		//
		//                        };
		scope.$watch('model.game.gameLayout.width + model.game.gameLayout.height', function() {
			scope.model.scale = new CommonLibraries.Point(scope.model.selection.selectedScenario.screenSize.x / scope.model.game.gameLayout.width * 0.9, scope.model.selection.selectedScenario.screenSize.y / scope.model.game.gameLayout.height * 0.9);
		});
		scope.$watch('model.selection.selectedScenario.screenSize.x + model.selection.selectedScenario.screenSize.y', function() {
			scope.model.scale = new CommonLibraries.Point(scope.model.selection.selectedScenario.screenSize.x / scope.model.game.gameLayout.width * 0.9, scope.model.selection.selectedScenario.screenSize.y / scope.model.game.gameLayout.height * 0.9);
		});
		scope.model.scale = new CommonLibraries.Point(scope.model.selection.selectedScenario.screenSize.x / scope.model.game.gameLayout.width * 0.9, scope.model.selection.selectedScenario.screenSize.y / scope.model.game.gameLayout.height * 0.9);
		//            scope.Model.Scale = new Point(jQuery.Window.GetWidth() / (double)scope.Model.Game.GameLayout.Width * .9, ((jQuery.Window.GetHeight() - 250) / (double)scope.Model.Game.GameLayout.Height) * .9);
		for (var $t1 = 0; $t1 < scope.model.game.gameLayout.spaces.length; $t1++) {
			var space = scope.model.game.gameLayout.spaces[$t1];
			addRule('.space' + space.name, {});
			addRule('.space' + space.name + '::before', {});
			addRule('.space' + space.name + '::after', {});
		}
		for (var t = 0; t < 4; t++) {
			for (var c = 0; c < 13; c++) {
				addRule('.card' + t + '-' + c + '', {});
				addRule('.card' + t + '-' + c + '::before', {});
				addRule('.card' + t + '-' + c + '::after', {});
			}
		}
		//  myGameContentManager.Redraw();
	};
	$Client_Controllers_TestGameController.prototype = {
		$getCardsFromScenarioFn: function(arg) {
			var scenario = this.$scope.model.selection.selectedScenario;
			var $t1 = [];
			var $t2 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t2.type = 1;
			$t2.value = 5;
			$t2.state = 'faceDown';
			ss.add($t1, $t2);
			var $t3 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t3.type = 1;
			$t3.value = 5;
			$t3.state = 'faceUp';
			ss.add($t1, $t3);
			var $t4 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t4.type = 1;
			$t4.value = 5;
			$t4.state = 'faceDown';
			ss.add($t1, $t4);
			var $t5 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t5.type = 1;
			$t5.value = 5;
			$t5.state = 'faceUp';
			ss.add($t1, $t5);
			var $t6 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t6.type = 1;
			$t6.value = 5;
			$t6.state = 'faceDown';
			ss.add($t1, $t6);
			var $t7 = Models.SiteManagerModels.Game.GameLayoutScenarioCard.$ctor();
			$t7.type = 1;
			$t7.value = 5;
			$t7.state = 'faceUp';
			ss.add($t1, $t7);
			var defaultCards = $t1;
			var spaces = scenario.spaces.filter(function(s) {
				return ss.referenceEquals(s.spaceGuid, arg.guid);
			});
			var space;
			if (spaces.length === 0) {
				var $t9 = scenario.spaces;
				var $t8 = Models.SiteManagerModels.Game.GameLayoutScenarioSpace.$ctor();
				$t8.spaceGuid = arg.guid;
				$t8.cards = defaultCards;
				ss.add($t9, space = $t8);
			}
			else {
				space = spaces[0];
			}
			return space.cards;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgDrawCardDirective
	var $Client_Directives_AcgDrawCardDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgDrawCardDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('style', 'width:71px; height:96px;');
			element.attr('class', 'card ' + ss.formatString('card{0}-{1}', scope.card.type, scope.card.value));
			var redrawCard = function() {
				var scale = scope.$parent.$parent['$parent'].scale;
				var spaceScale = { width: scope.space.width / (scope.space.pile.cards.length - 1), height: scope.space.height / (scope.space.pile.cards.length - 1) };
				var vertical = scope.space.vertical;
				var cardIndex = ss.indexOf(scope.space.pile.cards, scope.card);
				scope.cardStyle = {};
				var xx = 0;
				var yy = 0;
				switch (scope.space.resizeType) {
					case 1: {
						if (vertical) {
							yy = (scope.card.value + 1) / 13 * scope.space.height * scale.y;
						}
						else {
							xx = (scope.card.value + 1) / 13 * scope.space.width * scale.x;
						}
						break;
					}
					case 0: {
						xx = (!vertical ? (cardIndex * spaceScale.width * scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.height * scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (cardIndex * spaceScale.width * scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.height * scale.y) : 0);
						break;
					}
				}
				xx -= 35;
				yy -= 48;
				scope.cardStyle.position = 'absolute';
				scope.cardStyle.zIndex = cardIndex;
				scope.cardStyle.borderRadius = '5px';
				scope.cardStyle.left = xx + (vertical ? (scope.space.width * scale.x / 2) : 0);
				scope.cardStyle.top = yy + (!vertical ? (scope.space.height * scale.y / 2) : 0);
				//                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";
				element.rotate(scope.$parent.space.appearance.innerStyle.rotate);
				scope.cardStyle.content = '""';
				if (ss.startsWithString(scope.space.name, 'User')) {
					if (scope.card.appearance.effectNames.length === 0) {
						ss.add(scope.card.appearance.effectNames, 'bend'.toString());
					}
				}
				else {
					for (var index = scope.card.appearance.effectNames.length - 1; index >= 0; index--) {
						var cardGameAppearanceEffect = scope.card.appearance.effectNames[index];
						if (ss.referenceEquals(cardGameAppearanceEffect, 'bend'.toString())) {
							ss.remove(scope.card.appearance.effectNames, cardGameAppearanceEffect);
						}
					}
				}
				//
				//                foreach (var effect in scope.Card.Appearance.EffectNames)
				//
				//                {
				//
				//                GameEffectModel grabbedEffect = myEffectManager.GetEffectByName(effect);
				//
				//                if (grabbedEffect == null)
				//
				//                {
				//
				//                continue;
				//
				//                }
				//
				//                switch (grabbedEffect.Type)
				//
				//                {
				//
				//                case EffectType.Highlight:
				//
				//                
				//
				//                var _effect = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions()
				//
				//                {
				//
				//                Color = grabbedEffect.GetPropertyByName<string>("color"),
				//
				//                Radius = grabbedEffect.GetPropertyByName<double>("radius"),
				//
				//                Rotate = grabbedEffect.GetPropertyByName<double>("rotate"),
				//
				//                OffsetX = grabbedEffect.GetPropertyByName<double>("offsetx"),
				//
				//                OffsetY = grabbedEffect.GetPropertyByName<double>("offsety"),
				//
				//                Opacity = grabbedEffect.GetPropertyByName<double>("opacity"),
				//
				//                });
				//
				//                
				//
				//                JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
				//
				//                beforeStyle["display"] = "block";
				//
				//                beforeStyle["position"] = "relative";
				//
				//                beforeStyle["z-index"] = "-1";
				//
				//                beforeStyle["width"] = "100%";
				//
				//                beforeStyle["height"] = "100%";
				//
				//                beforeStyle["left"] = (-_effect.Radius + _effect.OffsetX) + "px";
				//
				//                beforeStyle["top"] = (-_effect.Radius + _effect.OffsetY) + "px";
				//
				//                beforeStyle["padding"] = (_effect.Radius) + "px";
				//
				//                beforeStyle["border-radius"] = "5px";
				//
				//                beforeStyle["box-shadow"] = "rgb(44, 44, 44) 3px 3px 2px";
				//
				//                var color = hextorgb(_effect.Color);
				//
				//                
				//
				//                beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", color.R, color.G, color.B, _effect.Opacity);
				//
				//                beforeStyle["border"] = "2px solid black";
				//
				//                
				//
				//                ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", beforeStyle);
				//
				//                
				//
				//                
				//
				//                
				//
				//                
				//
				//                break;
				//
				//                case EffectType.Rotate:
				//
				//                break;
				//
				//                case EffectType.Bend:
				//
				//                
				//
				//                
				//
				//                
				//
				//                
				//
				//                var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
				//
				//                {
				//
				//                Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
				//
				//                }));
				//
				//                
				//
				//                
				//
				//                var rotate = element.GetCSS("transform").Replace(" scale(1, 1)", "");
				//
				//                
				//
				//                element.me().rotate((((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(rotate))) );
				//
				//                
				//
				//                break;
				//
				//                case EffectType.StyleProperty:
				//
				//                break;
				//
				//                case EffectType.Animated:
				//
				//                break;
				//
				//                }
				//
				//                }
			};
			var keys = {};
			keys['content'] = ss.formatString('url(\'{1}assets/cards/{0}.gif\')', 100 + (scope.card.value + 1) + scope.card.type * 13, CommonLibraries.Constants.webIP);
			$Client_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
			scope.$on('redrawCard', redrawCard);
			//   redrawCard();
			//
			//                          
			// 
			//            scope.watch("$parent.space", () =>
			//
			//                          
			// 
			//            {
			//
			//                          
			// 
			//            Console.Log("ac");
			//
			//                          
			// 
			//            redrawCard();
			//
			//                          
			// 
			//            }, true);
			//
			//                          
			// 
			//            scope.watch("card.appearance.effectNames.join()", () =>
			//
			//                          
			// 
			//            {
			//
			//                          
			// 
			//            Console.Log("b");
			//
			//                          
			// 
			//            redrawCard();
			//
			//                          
			// 
			//            }, true);
			//scope.watch<CardScope>((_scope) =>
			//{
			//
			//List<Effect> effects = new List<Effect>();
			//
			//foreach (var ef in _scope.Card.Appearance.EffectNames)
			//{
			//var _ef = myEffectManager.GetEffectByName(ef);
			//effects.Add(_ef);
			//}
			//return effects;
			//}, () => {
			//Console.Log("c");
			//redrawCard();
			//}, true);
			redrawCard();
		}
	};
	$Client_Directives_AcgDrawCardDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$Client_Directives_AcgDrawCardDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgDrawCardDirective.noTransformRotate = function(ar) {
		if (ar === '') {
			return 0;
		}
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	$Client_Directives_AcgDrawCardDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgDrawSpaceDirective
	var $Client_Directives_AcgDrawSpaceDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgDrawSpaceDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var scale = scope.$parent['$parent'].scale;
			element.attr('class', 'space ' + ss.formatString('space{0}', scope.space.name));
			//  element.Resizable(new ResizableOptions()
			//  {
			//  Grid = new[] { scale.X, scale.Y },
			//  MinHeight = -1,
			//  MinWidth = -1,
			//  Handles = "n, e, s, w,nw,sw,ne,se",
			//  OnResize = (ev, ele) =>
			//  {
			//  scope.Space.Width = ele.Size.Width / scale.X;
			//  scope.Space.Height = ele.Size.Height / scale.Y;
			//  scope.Apply();
			//  
			//  }
			//  });
			//  element.Draggable(new DraggableOptions()
			//  {
			//  Cursor = "crosshair",
			//  Grid = new[] { scale.X, scale.Y },
			//  OnDrag = (ev, ele) =>
			//  {
			//  scope.Space.X = ele.Position.Left / scale.X;
			//  scope.Space.Y = ele.Position.Top/ scale.Y;
			//  scope.Apply();
			//  
			//  }
			//  });
			scope.$watch('space', function() {
				var beforeStyle = {};
				beforeStyle['display'] = 'block';
				beforeStyle['position'] = 'relative';
				beforeStyle['z-index'] = '-1';
				beforeStyle['width'] = '100%';
				beforeStyle['height'] = '100%';
				beforeStyle['left'] = '-50px';
				beforeStyle['top'] = '-50px';
				beforeStyle['padding'] = '50px';
				beforeStyle['border-radius'] = '15px';
				beforeStyle['box-shadow'] = 'rgb(51, 51, 51) 4px 4px 2px';
				beforeStyle['content'] = '""';
				beforeStyle['background'] = 'rgba(112, 12, 58, 0.231373)';
				$Client_Directives_AcgDrawSpaceDirective.$changeCSS('space' + scope.space.name + '::before', beforeStyle);
				scope.spaceStyle = {};
				scope.spaceStyle.position = 'absolute';
				scope.spaceStyle.left = scope.space.x * scale.x;
				scope.spaceStyle.top = scope.space.y * scale.y;
				scope.spaceStyle.width = scope.space.width * scale.x;
				scope.spaceStyle.height = scope.space.height * scale.y;
				scope.spaceStyle.backgroundColor = 'red';
				for (var $t1 = 0; $t1 < scope.space.appearance.effects.length; $t1++) {
					var effect = scope.space.appearance.effects[$t1];
					switch (effect.type) {
						case 0: {
							var hEffect = effect;
							scope.spaceStyle.padding = ss.formatString('{0} {0} {0} {0}', hEffect.radius);
							scope.spaceStyle.backgroundColor = hEffect.color;
							scope.spaceStyle.border = 'solid 2px black';
							scope.spaceStyle.borderRadius = 15;
							scope.spaceStyle.boxShadow = '4px 4px 2px #333';
							break;
						}
						case 1: {
							window.alert(effect.type.toString());
							break;
						}
						case 2: {
							var bEffect = effect;
							//rotate
							break;
						}
						case 3: {
							window.alert(effect.type.toString());
							break;
						}
						case 4: {
							window.alert(effect.type.toString());
							break;
						}
						default: {
							break;
						}
					}
				}
				scope.$broadcast('redrawCard');
			}, true);
		}
	};
	$Client_Directives_AcgDrawSpaceDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgDrawSpaceDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgEffectTestDrawAreaDirective
	var $Client_Directives_AcgEffectTestDrawAreaDirective = function() {
		this.link = null;
		this.scope = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgEffectTestDrawAreaDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var area = null;
			area = scope.model.areaTest.area;
			element.attr('class', 'area ' + ss.formatString('area{0}', area.name));
			var scale = scope.model.scale;
			var reApplyAreaBind = function() {
				//   JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
				//   if (false)
				//   {
				//   beforeStyle["display"] = "block";
				//   beforeStyle["position"] = "relative";
				//   beforeStyle["z-index"] = "-1";
				//   beforeStyle["width"] = "100%";
				//   beforeStyle["height"] = "100%";
				//   beforeStyle["left"] = "-50px";
				//   beforeStyle["top"] = "-50px";
				//   beforeStyle["padding"] = "50px";
				//   beforeStyle["border-radius"] = "15px";
				//   beforeStyle["box-shadow"] = "rgb(51, 51, 51) 4px 4px 2px";
				//   beforeStyle["content"] = "\"\"";
				//   beforeStyle["background"] = "rgba(112, 12, 58, 0.231373)";
				//   }
				//   ChangeCSS("area" + area.Name + "::before", beforeStyle);
				scope.areaStyle = {};
				var l = area.left;
				var t = area.top;
				var w = area.width;
				var h = area.height;
				var sl = scale.x;
				var st = scale.y;
				scope.areaStyle.position = 'absolute';
				scope.areaStyle.left = l * sl;
				scope.areaStyle.top = t * st;
				scope.areaStyle.boxShadow = 'rgb(51, 51, 51) 4px 4px 2px';
				scope.areaStyle.borderRadius = '15px';
				scope.areaStyle.width = w * sl;
				scope.areaStyle.height = h * st;
				scope.areaStyle.backgroundColor = 'blue';
			};
			scope.$watch('model.selection.selectedEffect', function() {
				$Client_Directives_AcgEffectTestDrawAreaDirective.$purgeCSS('area' + area.name + '::before');
				var effect = scope.model.selection.selectedEffect;
				if (ss.isNullOrUndefined(effect)) {
					return;
				}
				switch (effect.type) {
					case 'highlight': {
						var color = Models.SiteManagerModels.Game.EffectHelper.getString(effect, 'color');
						var radius = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'radius');
						var rotate = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'rotate');
						var offsetX = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsetx');
						var offsetY = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsety');
						var opacity = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'opacity');
						var beforeStyle = {};
						beforeStyle['display'] = 'block';
						beforeStyle['position'] = 'relative';
						beforeStyle['z-index'] = '-1';
						beforeStyle['width'] = '100%';
						beforeStyle['height'] = '100%';
						beforeStyle['left'] = -radius + offsetX + 'px';
						beforeStyle['top'] = -radius + offsetY + 'px';
						beforeStyle['padding'] = radius + 'px';
						beforeStyle['border-radius'] = '5px';
						beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
						var hexcolor = $Client_Directives_AcgEffectTestDrawAreaDirective.hextorgb(color);
						beforeStyle['content'] = '""';
						beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', hexcolor.R, hexcolor.G, hexcolor.B, opacity);
						beforeStyle['border'] = '2px solid black';
						$Client_Directives_AcgEffectTestDrawAreaDirective.$changeCSS('area' + area.name + '::before', beforeStyle);
						break;
					}
					case 'rotate': {
						break;
					}
					case 'bend': {
						break;
					}
					case 'styleProperty': {
						break;
					}
					case 'animated': {
						break;
					}
				}
			}, true);
			scope.$watch('area', reApplyAreaBind, true);
		}
	};
	$Client_Directives_AcgEffectTestDrawAreaDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgEffectTestDrawAreaDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$Client_Directives_AcgEffectTestDrawAreaDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	$Client_Directives_AcgEffectTestDrawAreaDirective.$purgeCSS = function(myClass) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					document.styleSheets[a].removeRule(i);
					document.styleSheets[a].insertRule(myClass + '{}');
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgEffectTestDrawCardDirective
	var $Client_Directives_AcgEffectTestDrawCardDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgEffectTestDrawCardDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('style', 'width:71px; height:96px;');
			element.attr('class', 'card ' + ss.formatString('card{0}-{1}', scope.card.type, scope.card.value));
			var test = scope.test;
			var space = null;
			switch (test) {
				case 'card': {
					space = scope.model.cardTest.space;
					break;
				}
				case 'space': {
					space = scope.model.spaceTest.space;
					break;
				}
			}
			var redrawCard = function() {
				var scale;
				var cardIndex;
				var spaceScale;
				if (test === 'card') {
					scale = scope.model.scale;
					var cardCount = 1;
					spaceScale = new CommonLibraries.Point(space.width, space.height);
					cardIndex = cardCount;
				}
				else {
					scale = scope.model.scale;
					var cards = scope.model.spaceTest.cards;
					spaceScale = new CommonLibraries.Point(space.width / (cards.length - 1), space.height / (cards.length - 1));
					cardIndex = ss.indexOf(cards, scope.card);
				}
				var vertical = space.vertical;
				scope.cardStyle = {};
				var xx = 0;
				var yy = 0;
				switch (space.layoutType) {
					case 'static': {
						if (vertical) {
							yy = (scope.card.value + 1) / 13 * space.height * scale.y;
						}
						else {
							xx = (scope.card.value + 1) / 13 * space.width * scale.x;
						}
						break;
					}
					case 'grow': {
						xx = (!vertical ? (cardIndex * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.y * scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (cardIndex * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.y * scale.y) : 0);
						break;
					}
				}
				xx -= 35;
				yy -= 48;
				scope.cardStyle.position = 'absolute';
				scope.cardStyle.zIndex = cardIndex;
				scope.cardStyle.borderRadius = '5px';
				scope.cardStyle.left = xx + (vertical ? (space.width * scale.x / 2) : 0);
				scope.cardStyle.top = yy + (!vertical ? (space.height * scale.y / 2) : 0);
				if (test === 'card') {
					scope.cardStyle.left += space.left * scale.x;
					scope.cardStyle.top += space.top * scale.y;
				}
				//                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";
				//                element.me().rotate(space.Appearance.InnerStyle.Rotate);
				scope.cardStyle.content = '""';
			};
			var keys;
			scope.$watch('model.selection.selectedEffect', function() {
				if (test !== 'card') {
					return;
				}
				$Client_Directives_AcgEffectTestDrawCardDirective.$purgeCSS(ss.formatString('card{0}-{1}::before', scope.card.type, scope.card.value));
				keys = {};
				keys['content'] = ss.formatString('url(\'{1}assets/cards/{0}.gif\')', 100 + (scope.card.value + 1) + scope.card.type * 13, CommonLibraries.Constants.webIP);
				$Client_Directives_AcgEffectTestDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
				var effect = scope.model.selection.selectedEffect;
				if (ss.isNullOrUndefined(effect)) {
					return;
				}
				switch (effect.type) {
					case 'highlight': {
						var color = Models.SiteManagerModels.Game.EffectHelper.getString(effect, 'color');
						var radius = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'radius');
						var rotate = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'rotate');
						var offsetX = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsetx');
						var offsetY = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsety');
						var opacity = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'opacity');
						var beforeStyle = {};
						beforeStyle['display'] = 'block';
						beforeStyle['position'] = 'relative';
						beforeStyle['z-index'] = '-1';
						beforeStyle['width'] = '100%';
						beforeStyle['height'] = '100%';
						beforeStyle['left'] = -radius + offsetX + 'px';
						beforeStyle['top'] = -radius + offsetY + 'px';
						beforeStyle['padding'] = radius + 'px';
						beforeStyle['border-radius'] = '5px';
						beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
						var hexcolor = $Client_Directives_AcgEffectTestDrawCardDirective.hextorgb(color);
						beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', hexcolor.R, hexcolor.G, hexcolor.B, opacity);
						beforeStyle['border'] = '2px solid black';
						$Client_Directives_AcgEffectTestDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', beforeStyle);
						break;
					}
					case 'rotate': {
						break;
					}
					case 'bend': {
						//
						//
						//                                                                                          var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
						//
						//
						//                                                                                          {
						//
						//
						//                                                                                          Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
						//
						//
						//                                                                                          }));
						//
						//
						//                                                                                          
						//
						//
						//                                                                                          
						//
						//
						//                                                                                          var rotate = element.GetCSS("transform").Replace(" scale(1, 1)", "");
						//
						//
						//                                                                                          
						//
						//
						//                                                                                          element.me().rotate((((-bEffect.Degrees / 2 + bEffect.Degrees / (space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(rotate))));
						break;
					}
					case 'styleProperty': {
						break;
					}
					case 'animated': {
						break;
					}
				}
			}, true);
			keys = {};
			keys['content'] = ss.formatString('url(\'{1}assets/cards/{0}.gif\')', 100 + (scope.card.value + 1) + scope.card.type * 13, CommonLibraries.Constants.webIP);
			$Client_Directives_AcgEffectTestDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
			scope.$watch('space', redrawCard, true);
			scope.$watch('model.selection.selectedScenario', redrawCard, true);
			//            scope.On("redrawCard", redrawCard);
			//   redrawCard();
			//
			//                          
			// 
			//            scope.watch("$parent.space", () =>
			//
			//                          
			// 
			//            {
			//
			//                          
			// 
			//            Console.Log("ac");
			//
			//                          
			// 
			//            redrawCard();
			//
			//                          
			// 
			//            }, true);
			//
			//                          
			// 
			//            scope.watch("card.appearance.effectNames.join()", () =>
			//
			//                          
			// 
			//            {
			//
			//                          
			// 
			//            Console.Log("b");
			//
			//                          
			// 
			//            redrawCard();
			//
			//                          
			// 
			//            }, true);
			//scope.watch<CardScope>((_scope) =>
			//{
			//
			//List<Effect> effects = new List<Effect>();
			//
			//foreach (var ef in _scope.Card.Appearance.EffectNames)
			//{
			//var _ef = myEffectManager.GetEffectByName(ef);
			//effects.Add(_ef);
			//}
			//return effects;
			//}, () => {
			//Console.Log("c");
			//redrawCard();
			//}, true);
			redrawCard();
		}
	};
	$Client_Directives_AcgEffectTestDrawCardDirective.$purgeCSS = function(myClass) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					document.styleSheets[a].removeRule(i);
					document.styleSheets[a].insertRule(myClass + '{}');
				}
			}
		}
	};
	$Client_Directives_AcgEffectTestDrawCardDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$Client_Directives_AcgEffectTestDrawCardDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgEffectTestDrawCardDirective.noTransformRotate = function(ar) {
		if (ar === '') {
			return 0;
		}
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	$Client_Directives_AcgEffectTestDrawCardDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgEffectTestDrawSpaceDirective
	var $Client_Directives_AcgEffectTestDrawSpaceDirective = function() {
		this.link = null;
		this.scope = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgEffectTestDrawSpaceDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var space = null;
			space = scope.model.spaceTest.space;
			element.attr('class', 'space ' + ss.formatString('space{0}', space.name));
			var scale = scope.model.scale;
			var reApplySpaceBind = function() {
				//   JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
				//   if (false)
				//   {
				//   beforeStyle["display"] = "block";
				//   beforeStyle["position"] = "relative";
				//   beforeStyle["z-index"] = "-1";
				//   beforeStyle["width"] = "100%";
				//   beforeStyle["height"] = "100%";
				//   beforeStyle["left"] = "-50px";
				//   beforeStyle["top"] = "-50px";
				//   beforeStyle["padding"] = "50px";
				//   beforeStyle["border-radius"] = "15px";
				//   beforeStyle["box-shadow"] = "rgb(51, 51, 51) 4px 4px 2px";
				//   beforeStyle["content"] = "\"\"";
				//   beforeStyle["background"] = "rgba(112, 12, 58, 0.231373)";
				//   }
				//   ChangeCSS("space" + space.Name + "::before", beforeStyle);
				scope.spaceStyle = {};
				var l = space.left;
				var t = space.top;
				var w = space.width;
				var h = space.height;
				var sl = scale.x;
				var st = scale.y;
				scope.spaceStyle.position = 'absolute';
				scope.spaceStyle.left = l * sl;
				scope.spaceStyle.top = t * st;
				scope.spaceStyle.boxShadow = 'rgb(51, 51, 51) 4px 4px 2px';
				scope.spaceStyle.borderRadius = '15px';
				scope.spaceStyle.width = w * sl;
				scope.spaceStyle.height = h * st;
				scope.spaceStyle.backgroundColor = 'red';
			};
			scope.$watch('model.selection.selectedEffect', function() {
				$Client_Directives_AcgEffectTestDrawSpaceDirective.$purgeCSS('space' + space.name + '::before');
				var effect = scope.model.selection.selectedEffect;
				if (ss.isNullOrUndefined(effect)) {
					return;
				}
				switch (effect.type) {
					case 'highlight': {
						var color = Models.SiteManagerModels.Game.EffectHelper.getString(effect, 'color');
						var radius = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'radius');
						var rotate = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'rotate');
						var offsetX = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsetx');
						var offsetY = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsety');
						var opacity = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'opacity');
						var beforeStyle = {};
						beforeStyle['display'] = 'block';
						beforeStyle['position'] = 'relative';
						beforeStyle['z-index'] = '-1';
						beforeStyle['width'] = '100%';
						beforeStyle['height'] = '100%';
						beforeStyle['left'] = -radius + offsetX + 'px';
						beforeStyle['top'] = -radius + offsetY + 'px';
						beforeStyle['padding'] = radius + 'px';
						beforeStyle['border-radius'] = '5px';
						beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
						var hexcolor = $Client_Directives_AcgEffectTestDrawSpaceDirective.hextorgb(color);
						beforeStyle['content'] = '""';
						beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', hexcolor.R, hexcolor.G, hexcolor.B, opacity);
						beforeStyle['border'] = '2px solid black';
						$Client_Directives_AcgEffectTestDrawSpaceDirective.$changeCSS('space' + space.name + '::before', beforeStyle);
						break;
					}
					case 'rotate': {
						break;
					}
					case 'bend': {
						break;
					}
					case 'styleProperty': {
						break;
					}
					case 'animated': {
						break;
					}
				}
			}, true);
			scope.$watch('space', reApplySpaceBind, true);
		}
	};
	$Client_Directives_AcgEffectTestDrawSpaceDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgEffectTestDrawSpaceDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$Client_Directives_AcgEffectTestDrawSpaceDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	$Client_Directives_AcgEffectTestDrawSpaceDirective.$purgeCSS = function(myClass) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					document.styleSheets[a].removeRule(i);
					document.styleSheets[a].insertRule(myClass + '{}');
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgEffectTestDrawTextDirective
	var $Client_Directives_AcgEffectTestDrawTextDirective = function() {
		this.link = null;
		this.scope = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgEffectTestDrawTextDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var text = null;
			text = scope.model.textTest.text;
			element.attr('class', 'text ' + ss.formatString('text{0}', text.name));
			var scale = scope.model.scale;
			var reApplyTextBind = function() {
				//   JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
				//   if (false)
				//   {
				//   beforeStyle["display"] = "block";
				//   beforeStyle["position"] = "relative";
				//   beforeStyle["z-index"] = "-1";
				//   beforeStyle["width"] = "100%";
				//   beforeStyle["height"] = "100%";
				//   beforeStyle["left"] = "-50px";
				//   beforeStyle["top"] = "-50px";
				//   beforeStyle["padding"] = "50px";
				//   beforeStyle["border-radius"] = "15px";
				//   beforeStyle["box-shadow"] = "rgb(51, 51, 51) 4px 4px 2px";
				//   beforeStyle["content"] = "\"\"";
				//   beforeStyle["background"] = "rgba(112, 12, 58, 0.231373)";
				//   }
				//   ChangeCSS("text" + text.Name + "::before", beforeStyle);
				scope.textStyle = {};
				var l = text.left;
				var t = text.top;
				var sl = scale.x;
				var st = scale.y;
				scope.textStyle.position = 'absolute';
				scope.textStyle.left = l * sl;
				scope.textStyle.top = t * st;
				scope.textStyle.boxShadow = 'rgb(51, 51, 51) 4px 4px 2px';
				scope.textStyle.borderRadius = '15px';
				element.text(scope.text.text);
			};
			scope.$watch('model.selection.selectedEffect', function() {
				$Client_Directives_AcgEffectTestDrawTextDirective.$purgeCSS('text' + text.name + '::before');
				var effect = scope.model.selection.selectedEffect;
				if (ss.isNullOrUndefined(effect)) {
					return;
				}
				switch (effect.type) {
					case 'highlight': {
						var color = Models.SiteManagerModels.Game.EffectHelper.getString(effect, 'color');
						var radius = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'radius');
						var rotate = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'rotate');
						var offsetX = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsetx');
						var offsetY = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'offsety');
						var opacity = Models.SiteManagerModels.Game.EffectHelper.getNumber(effect, 'opacity');
						var beforeStyle = {};
						beforeStyle['display'] = 'block';
						beforeStyle['position'] = 'relative';
						beforeStyle['z-index'] = '-1';
						beforeStyle['width'] = '100%';
						beforeStyle['height'] = '100%';
						beforeStyle['left'] = -radius + offsetX + 'px';
						beforeStyle['top'] = -radius + offsetY + 'px';
						beforeStyle['padding'] = radius + 'px';
						beforeStyle['border-radius'] = '5px';
						beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
						var hexcolor = $Client_Directives_AcgEffectTestDrawTextDirective.hextorgb(color);
						beforeStyle['content'] = '""';
						beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', hexcolor.R, hexcolor.G, hexcolor.B, opacity);
						beforeStyle['border'] = '2px solid black';
						$Client_Directives_AcgEffectTestDrawTextDirective.$changeCSS('text' + text.name + '::before', beforeStyle);
						break;
					}
					case 'rotate': {
						break;
					}
					case 'bend': {
						break;
					}
					case 'styleProperty': {
						break;
					}
					case 'animated': {
						break;
					}
				}
			}, true);
			scope.$watch('text', reApplyTextBind, true);
		}
	};
	$Client_Directives_AcgEffectTestDrawTextDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgEffectTestDrawTextDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$Client_Directives_AcgEffectTestDrawTextDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	$Client_Directives_AcgEffectTestDrawTextDirective.$purgeCSS = function(myClass) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					document.styleSheets[a].removeRule(i);
					document.styleSheets[a].insertRule(myClass + '{}');
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgSpacesDirective
	var $Client_Directives_AcgSpacesDirective = function(compile, gameContentManager) {
		this.$myCompile = null;
		this.$myGameContentManager = null;
		this.link = null;
		this.template = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.$myCompile = compile;
		this.$myGameContentManager = gameContentManager;
		this.restrict = 'EA';
		this.template = '<div></div>';
		this.replace = true;
		this.transclude = false;
		this.scope = { spaces: '=acgSpaces' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgSpacesDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var updater = ss.mkdel(this, function() {
				element.children().each(function(ind, e) {
					angular.element(e).scope().$destroy();
				});
				element.empty();
				var content = '<div>\r\n    <div acg-draw-space ng-style=\'spaceStyle\'>\r\n        <div ng-repeat=\'card in space.pile.cards\' acg-draw-card ng-style=\'cardStyle\'>\r\n        </div>\r\n    </div> \r\n</div>';
				angular.forEach(scope.spaces, ss.mkdel(this, function(space) {
					var e1 = angular.element(content);
					var _scope = scope.$new();
					_scope.space = space;
					var elk = this.$myCompile(e1.contents())(_scope);
					element.append(elk);
				}));
			});
			//scope["$watch"]("spaces",updater);
			this.$myGameContentManager.redraw = ss.delegateCombine(this.$myGameContentManager.redraw, function() {
				console.log('updating board');
				updater();
				scope.$apply();
			});
			updater();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgTestDrawAreaDirective
	var $Client_Directives_AcgTestDrawAreaDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgTestDrawAreaDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.mousedown(function(e) {
				scope.model.selection.selectedArea = scope.area;
				scope.$apply();
			});
			var scale = scope.model.scale;
			var reApplyAreaBind = function() {
				var beforeStyle = {};
				if (false) {
					beforeStyle['display'] = 'block';
					beforeStyle['position'] = 'relative';
					beforeStyle['z-index'] = '-1';
					beforeStyle['width'] = '100%';
					beforeStyle['height'] = '100%';
					beforeStyle['left'] = '-50px';
					beforeStyle['top'] = '-50px';
					beforeStyle['padding'] = '50px';
					beforeStyle['border-radius'] = '15px';
					beforeStyle['box-shadow'] = 'rgb(51, 51, 51) 4px 4px 2px';
					beforeStyle['content'] = '""';
					beforeStyle['background'] = 'rgba(112, 12, 58, 0.231373)';
				}
				$Client_Directives_AcgTestDrawAreaDirective.$changeCSS('area' + scope.area.name + '::before', beforeStyle);
				scope.areaStyle = {};
				scope.areaStyle.position = 'absolute';
				scope.areaStyle.boxShadow = 'rgb(51, 51, 51) 4px 4px 2px';
				scope.areaStyle.borderRadius = '15px';
				scope.areaStyle.left = scope.area.left * scale.x;
				scope.areaStyle.top = scope.area.top * scale.y;
				scope.areaStyle.width = scope.area.width * scale.x;
				scope.areaStyle.height = scope.area.height * scale.y;
				scope.areaStyle.backgroundColor = 'blue';
				//
				//                                                     foreach (var effect in scope.Space.Appearance.Effects)
				//
				//                                                     {
				//
				//                                                     switch (effect.Type)
				//
				//                                                     {
				//
				//                                                     case EffectType.Highlight:
				//
				//                                                     var hEffect = ((CardGameAppearanceEffectHighlight) effect);
				//
				//                                                     scope.SpaceStyle.padding = string.Format("{0} {0} {0} {0}",
				//
				//                                                     hEffect.Radius);
				//
				//                                                     scope.SpaceStyle.backgroundColor = hEffect.Color;
				//
				//                                                     scope.SpaceStyle.border = "solid 2px black";
				//
				//                                                     scope.SpaceStyle.borderRadius = 15.0;
				//
				//                                                     scope.SpaceStyle.boxShadow = "4px 4px 2px #333";
				//
				//                                                     break;
				//
				//                                                     case EffectType.Rotate:
				//
				//                                                     Window.Alert(effect.Type.ToString());
				//
				//                                                     break;
				//
				//                                                     case EffectType.Bend:
				//
				//                                                     var bEffect = (CardGameAppearanceEffectBend) effect;
				//
				//                                                     
				//
				//                                                     //rotate
				//
				//                                                     
				//
				//                                                     
				//
				//                                                     break;
				//
				//                                                     case EffectType.StyleProperty:
				//
				//                                                     Window.Alert(effect.Type.ToString());
				//
				//                                                     break;
				//
				//                                                     case EffectType.Animated:
				//
				//                                                     Window.Alert(effect.Type.ToString());
				//
				//                                                     break;
				//
				//                                                     default:
				//
				//                                                     
				//
				//                                                     break;
				//
				//                                                     }
				//
				//                                                     }
			};
			scope.$watch('model.scale', function() {
				scale = scope.model.scale;
				element.attr('class', 'space ' + ss.formatString('space{0}', scope.area.name));
				element.resizable({
					grid: [scale.x, scale.y],
					minHeight: -1,
					minWidth: -1,
					handles: 'n, e, s, w,nw,sw,ne,se',
					resize: function(ev, ele) {
						scope.area.left = ss.Int32.trunc(ele.position.left / scale.x);
						scope.area.top = ss.Int32.trunc(ele.position.top / scale.y);
						scope.area.width = ss.Int32.trunc(ele.size.width / scale.x);
						scope.area.height = ss.Int32.trunc(ele.size.height / scale.y);
						scope.$apply();
					}
				});
				element.draggable({
					cursor: 'crosshair',
					grid: [scale.x, scale.y],
					drag: function(ev1, ele1) {
						scope.area.left = ss.Int32.trunc(ele1.position.left / scale.x);
						scope.area.top = ss.Int32.trunc(ele1.position.top / scale.y);
						scope.$apply();
					}
				});
				reApplyAreaBind();
			});
			scope.$watch('area', reApplyAreaBind, true);
		}
	};
	$Client_Directives_AcgTestDrawAreaDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgTestDrawAreaDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgTestDrawCardDirective
	var $Client_Directives_AcgTestDrawCardDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgTestDrawCardDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('style', 'width:71px; height:96px;');
			element.attr('class', 'card ' + ss.formatString('card{0}-{1}', scope.card.type, scope.card.value));
			scope.$watch('model.selection.selectedCard', function(old, new1) {
				if (ss.referenceEquals(old, new1)) {
					return;
				}
				if (ss.isNullOrUndefined(scope.model.selection.selectedCard) || !ss.referenceEquals(scope.model.selection.selectedCard, scope.card)) {
					scope.cardStyle.border = undefined;
					scope.cardStyle.margin = undefined;
				}
				else {
					scope.cardStyle.border = 'solid 4px green';
					scope.cardStyle.margin = '-4px';
				}
			});
			scope.cardClick = function() {
				if (ss.referenceEquals(scope.model.selection.selectedCard, scope.card)) {
					scope.model.selection.selectedCard = null;
				}
				else {
					scope.model.selection.selectedCard = scope.card;
				}
			};
			var redrawCard = function() {
				var scale = scope.model.scale;
				var cards = scope.model.getCardsFromScenario(scope.space);
				var spaceScale = { width: scope.space.width / (cards.length - 1), height: scope.space.height / (cards.length - 1) };
				var vertical = scope.space.vertical;
				var cardIndex = ss.indexOf(cards, scope.card);
				scope.cardStyle = {};
				var xx = 0;
				var yy = 0;
				switch (scope.space.layoutType) {
					case 'static': {
						if (vertical) {
							yy = (scope.card.value + 1) / 13 * scope.space.height * scale.y;
						}
						else {
							xx = (scope.card.value + 1) / 13 * scope.space.width * scale.x;
						}
						break;
					}
					case 'grow': {
						xx = (!vertical ? (cardIndex * spaceScale.width * scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.height * scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (cardIndex * spaceScale.width * scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.height * scale.y) : 0);
						break;
					}
				}
				xx -= 35;
				yy -= 48;
				scope.cardStyle.position = 'absolute';
				scope.cardStyle.zIndex = cardIndex;
				scope.cardStyle.borderRadius = '5px';
				scope.cardStyle.left = xx + (vertical ? (scope.space.width * scale.x / 2) : 0);
				scope.cardStyle.top = yy + (!vertical ? (scope.space.height * scale.y / 2) : 0);
				//                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";
				//                element.me().rotate(scope.Space.Appearance.InnerStyle.Rotate);
				scope.cardStyle.content = '""';
				//
				//                foreach (var effect in scope.Card.Appearance.EffectNames)
				//
				//                {
				//
				//                GameEffectModel grabbedEffect = myEffectManager.GetEffectByName(effect);
				//
				//                if (grabbedEffect == null)
				//
				//                {
				//
				//                continue;
				//
				//                }
				//
				//                switch (grabbedEffect.Type)
				//
				//                {
				//
				//                case EffectType.Highlight:
				//
				//                
				//
				//                var _effect = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions()
				//
				//                {
				//
				//                Color = grabbedEffect.GetPropertyByName<string>("color"),
				//
				//                Radius = grabbedEffect.GetPropertyByName<double>("radius"),
				//
				//                Rotate = grabbedEffect.GetPropertyByName<double>("rotate"),
				//
				//                OffsetX = grabbedEffect.GetPropertyByName<double>("offsetx"),
				//
				//                OffsetY = grabbedEffect.GetPropertyByName<double>("offsety"),
				//
				//                Opacity = grabbedEffect.GetPropertyByName<double>("opacity"),
				//
				//                });
				//
				//                
				//
				//                JsDictionary<string, string> beforeStyle = new JsDictionary<string, string>();
				//
				//                beforeStyle["display"] = "block";
				//
				//                beforeStyle["position"] = "relative";
				//
				//                beforeStyle["z-index"] = "-1";
				//
				//                beforeStyle["width"] = "100%";
				//
				//                beforeStyle["height"] = "100%";
				//
				//                beforeStyle["left"] = (-_effect.Radius + _effect.OffsetX) + "px";
				//
				//                beforeStyle["top"] = (-_effect.Radius + _effect.OffsetY) + "px";
				//
				//                beforeStyle["padding"] = (_effect.Radius) + "px";
				//
				//                beforeStyle["border-radius"] = "5px";
				//
				//                beforeStyle["box-shadow"] = "rgb(44, 44, 44) 3px 3px 2px";
				//
				//                var color = hextorgb(_effect.Color);
				//
				//                
				//
				//                beforeStyle["background-color"] = string.Format("rgba({0}, {1}, {2}, {3})", color.R, color.G, color.B, _effect.Opacity);
				//
				//                beforeStyle["border"] = "2px solid black";
				//
				//                
				//
				//                ChangeCSS("card" + scope.Card.Type + "-" + scope.Card.Value + "::before", beforeStyle);
				//
				//                
				//
				//                
				//
				//                
				//
				//                
				//
				//                break;
				//
				//                case EffectType.Rotate:
				//
				//                break;
				//
				//                case EffectType.Bend:
				//
				//                
				//
				//                
				//
				//                
				//
				//                
				//
				//                var bEffect = (new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
				//
				//                {
				//
				//                Degrees = grabbedEffect.GetPropertyByName<double>("degrees"),
				//
				//                }));
				//
				//                
				//
				//                
				//
				//                var rotate = element.GetCSS("transform").Replace(" scale(1, 1)", "");
				//
				//                
				//
				//                element.me().rotate((((-bEffect.Degrees / 2 + bEffect.Degrees / (scope.Space.Pile.Cards.Count - 1) * cardIndex) + NoTransformRotate(rotate))));
				//
				//                
				//
				//                break;
				//
				//                case EffectType.StyleProperty:
				//
				//                break;
				//
				//                case EffectType.Animated:
				//
				//                break;
				//
				//                }
				//
				//                }
			};
			var keys = {};
			keys['content'] = ss.formatString('url(\'{1}assets/cards/{0}.gif\')', 100 + (scope.card.value + 1) + scope.card.type * 13, CommonLibraries.Constants.webIP);
			$Client_Directives_AcgTestDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
			scope.$watch('space', redrawCard, true);
			scope.$watch('model.selection.selectedScenario', redrawCard, true);
			//            scope.On("redrawCard", redrawCard);
			//   redrawCard();
			//
			//                          
			// 
			//            scope.watch("$parent.space", () =>
			//
			//                          
			// 
			//            {
			//
			//                          
			// 
			//            Console.Log("ac");
			//
			//                          
			// 
			//            redrawCard();
			//
			//                          
			// 
			//            }, true);
			//
			//                          
			// 
			//            scope.watch("card.appearance.effectNames.join()", () =>
			//
			//                          
			// 
			//            {
			//
			//                          
			// 
			//            Console.Log("b");
			//
			//                          
			// 
			//            redrawCard();
			//
			//                          
			// 
			//            }, true);
			//scope.watch<CardScope>((_scope) =>
			//{
			//
			//List<Effect> effects = new List<Effect>();
			//
			//foreach (var ef in _scope.Card.Appearance.EffectNames)
			//{
			//var _ef = myEffectManager.GetEffectByName(ef);
			//effects.Add(_ef);
			//}
			//return effects;
			//}, () => {
			//Console.Log("c");
			//redrawCard();
			//}, true);
			redrawCard();
		}
	};
	$Client_Directives_AcgTestDrawCardDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$Client_Directives_AcgTestDrawCardDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgTestDrawCardDirective.noTransformRotate = function(ar) {
		if (ar === '') {
			return 0;
		}
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	$Client_Directives_AcgTestDrawCardDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgTestDrawSpaceDirective
	var $Client_Directives_AcgTestDrawSpaceDirective = function() {
		this.link = null;
		this.scope = null;
		this.link = ss.mkdel(this, this.$linkFn);
		//scope=new
		//{
		//space = "=acgTestDrawSpace"
		//};
	};
	$Client_Directives_AcgTestDrawSpaceDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('class', 'space ' + ss.formatString('space{0}', scope.space.name));
			element.mousedown(function(e) {
				scope.model.selection.selectedSpace = scope.space;
				scope.$apply();
			});
			var scale = scope.model.scale;
			var reApplySpaceBind = function() {
				var beforeStyle = {};
				if (false) {
					beforeStyle['display'] = 'block';
					beforeStyle['position'] = 'relative';
					beforeStyle['z-index'] = '-1';
					beforeStyle['width'] = '100%';
					beforeStyle['height'] = '100%';
					beforeStyle['left'] = '-50px';
					beforeStyle['top'] = '-50px';
					beforeStyle['padding'] = '50px';
					beforeStyle['border-radius'] = '15px';
					beforeStyle['box-shadow'] = 'rgb(51, 51, 51) 4px 4px 2px';
					beforeStyle['content'] = '""';
					beforeStyle['background'] = 'rgba(112, 12, 58, 0.231373)';
				}
				$Client_Directives_AcgTestDrawSpaceDirective.$changeCSS('space' + scope.space.name + '::before', beforeStyle);
				scope.spaceStyle = {};
				var l = scope.space.left;
				var t = scope.space.top;
				var w = scope.space.width;
				var h = scope.space.height;
				var sl = scale.x;
				var st = scale.y;
				scope.spaceStyle.position = 'absolute';
				scope.spaceStyle.left = l * sl;
				scope.spaceStyle.top = t * st;
				scope.spaceStyle.boxShadow = 'rgb(51, 51, 51) 4px 4px 2px';
				scope.spaceStyle.borderRadius = '15px';
				scope.spaceStyle.width = w * sl;
				scope.spaceStyle.height = h * st;
				scope.spaceStyle.backgroundColor = 'red';
				//
				//                                                     foreach (var effect in scope.Space.Appearance.Effects)
				//
				//                                                     {
				//
				//                                                     switch (effect.Type)
				//
				//                                                     {
				//
				//                                                     case EffectType.Highlight:
				//
				//                                                     var hEffect = ((CardGameAppearanceEffectHighlight) effect);
				//
				//                                                     scope.SpaceStyle.padding = string.Format("{0} {0} {0} {0}",
				//
				//                                                     hEffect.Radius);
				//
				//                                                     scope.SpaceStyle.backgroundColor = hEffect.Color;
				//
				//                                                     scope.SpaceStyle.border = "solid 2px black";
				//
				//                                                     scope.SpaceStyle.borderRadius = 15.0;
				//
				//                                                     scope.SpaceStyle.boxShadow = "4px 4px 2px #333";
				//
				//                                                     break;
				//
				//                                                     case EffectType.Rotate:
				//
				//                                                     Window.Alert(effect.Type.ToString());
				//
				//                                                     break;
				//
				//                                                     case EffectType.Bend:
				//
				//                                                     var bEffect = (CardGameAppearanceEffectBend) effect;
				//
				//                                                     
				//
				//                                                     //rotate
				//
				//                                                     
				//
				//                                                     
				//
				//                                                     break;
				//
				//                                                     case EffectType.StyleProperty:
				//
				//                                                     Window.Alert(effect.Type.ToString());
				//
				//                                                     break;
				//
				//                                                     case EffectType.Animated:
				//
				//                                                     Window.Alert(effect.Type.ToString());
				//
				//                                                     break;
				//
				//                                                     default:
				//
				//                                                     
				//
				//                                                     break;
				//
				//                                                     }
				//
				//                                                     }
			};
			scope.$watch('model.scale', function() {
				scale = scope.model.scale;
				element.resizable({
					grid: [scale.x, scale.y],
					minHeight: -1,
					minWidth: -1,
					handles: 'n, e, s, w,nw,sw,ne,se',
					resize: function(ev, ele) {
						scope.space.left = ele.position.left / scale.x;
						scope.space.top = ele.position.top / scale.y;
						scope.space.width = ele.size.width / scale.x;
						scope.space.height = ele.size.height / scale.y;
						scope.$apply();
					}
				});
				element.draggable({
					cursor: 'crosshair',
					grid: [scale.x, scale.y],
					drag: function(ev1, ele1) {
						scope.space.left = ele1.position.left / scale.x;
						scope.space.top = ele1.position.top / scale.y;
						scope.$apply();
					}
				});
				reApplySpaceBind();
			});
			scope.$watch('space', reApplySpaceBind, true);
		}
	};
	$Client_Directives_AcgTestDrawSpaceDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgTestDrawSpaceDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.AcgTestDrawTextDirective
	var $Client_Directives_AcgTestDrawTextDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_AcgTestDrawTextDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('class', 'text ' + ss.formatString('text{0}', scope.text.name));
			element.mousedown(function(e) {
				scope.model.selection.selectedText = scope.text;
				scope.$apply();
			});
			var scale = scope.model.scale;
			var reApplyTextBind = function() {
				var beforeStyle = {};
				if (false) {
					beforeStyle['display'] = 'block';
					beforeStyle['position'] = 'relative';
					beforeStyle['z-index'] = '-1';
					beforeStyle['width'] = '100%';
					beforeStyle['height'] = '100%';
					beforeStyle['left'] = '-50px';
					beforeStyle['top'] = '-50px';
					beforeStyle['padding'] = '50px';
					beforeStyle['border-radius'] = '15px';
					beforeStyle['box-shadow'] = 'rgb(51, 51, 51) 4px 4px 2px';
					beforeStyle['content'] = '""';
					beforeStyle['background'] = 'rgba(112, 12, 58, 0.231373)';
				}
				$Client_Directives_AcgTestDrawTextDirective.$changeCSS('text' + scope.text.name + '::before', beforeStyle);
				scope.textStyle = {};
				scope.textStyle.position = 'absolute';
				scope.textStyle.left = scope.text.left * scale.x;
				scope.textStyle.top = scope.text.top * scale.y;
				scope.textStyle.boxShadow = 'rgb(51, 51, 51) 4px 4px 2px';
				scope.textStyle.borderRadius = '15px';
				element.text(scope.text.text);
			};
			scope.$watch('model.scale', function() {
				scale = scope.model.scale;
				element.draggable({
					cursor: 'crosshair',
					grid: [scale.x, scale.y],
					drag: function(ev, ele) {
						scope.text.left = ele.position.left / scale.x;
						scope.text.top = ele.position.top / scale.y;
						scope.$apply();
					}
				});
				reApplyTextBind();
			});
			scope.$watch('text', reApplyTextBind, true);
		}
	};
	$Client_Directives_AcgTestDrawTextDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Directives_AcgTestDrawTextDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.ChatBoxDirective
	var $Client_Directives_ChatBoxDirective = function() {
		this.link = null;
		this.templateUrl = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/chatBox.html', CommonLibraries.Constants.webIP);
		this.replace = true;
		this.scope = { contents: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_ChatBoxDirective.prototype = {
		$linkFn: function(scope, element, attr) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.DraggableDirective
	var $Client_Directives_DraggableDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_DraggableDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.draggable({ cancel: '.floating-window-inner' });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.FancyListDirective
	var $Client_Directives_FancyListDirective = function() {
		this.link = null;
		this.templateUrl = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/fancyList.html', CommonLibraries.Constants.webIP);
		this.replace = true;
		this.transclude = true;
		this.scope = { items: '=', bind: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_FancyListDirective.prototype = {
		$linkFn: function(scope, element, attr) {
			scope.itemClick = function(item) {
				scope.bind = item;
			};
			scope.currentStyle = function(item1) {
				return { backgroundColor: (ss.referenceEquals(item1, scope.bind) ? 'blue' : 'white') };
			};
			scope.parentScope = scope['$parent']['$parent']['$parent'];
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.FloatingWindowDirective
	var $Client_Directives_FloatingWindowDirective = function(uiManagerService) {
		this.$myUIManagerService = null;
		this.link = null;
		this.templateUrl = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.$myElement = null;
		this.$myScope = null;
		this.$myUIManagerService = uiManagerService;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/floatingWindow.html', CommonLibraries.Constants.webIP);
		this.replace = true;
		this.transclude = true;
		this.scope = { width: '=', height: '=', left: '=', top: '=', title: '=', visible: '=', onclose: '&' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_FloatingWindowDirective.prototype = {
		$linkFn: function(scope, element, attr) {
			$Client_Directives_FloatingWindowDirective.$items.add(element, scope);
			element.click(ss.thisFix(ss.mkdel(this, function(elem, event) {
				this.$focus();
			})));
			scope.$parent.swingAway = ss.mkdel(this, function(a, b, c) {
				this.swingAway(a, b, element, c);
			});
			scope.$parent.swingBack = ss.mkdel(this, function(c1) {
				this.swingBack(scope, element, c1);
			});
			scope.$parent.minimize = function() {
				scope.$parent.minimized = true;
				scope.minimize();
			};
			var $t1 = $Client_Scope_Directive_FloatingWindowPosition.$ctor();
			$t1.left = scope.left;
			$t1.top = scope.top;
			$t1.display = 'block';
			scope.positionStyles = $t1;
			scope.positionStyles.zIndex = 10000;
			if (scope.left.indexOf('%') !== -1) {
				scope.positionStyles.marginLeft = -ss.Int32.div(parseInt(ss.replaceAllString(scope.width, 'px', '')), 2) + 'px';
			}
			if (scope.top.indexOf('%') !== -1) {
				scope.positionStyles.marginTop = -ss.Int32.div(parseInt(ss.replaceAllString(scope.height, 'px', '')), 2) + 'px';
			}
			var $t2 = $Client_Scope_Directive_Size.$ctor();
			$t2.width = scope.width;
			$t2.height = scope.height;
			scope.sizeStyle = $t2;
			scope.maximize = function() {
				if (!scope.isMaximized) {
					scope.lastPositionStyles = scope.positionStyles;
					scope.lastSizeStyle = scope.sizeStyle;
					var $t3 = $Client_Scope_Directive_FloatingWindowPosition.$ctor();
					$t3.left = '0';
					$t3.top = '0';
					$t3.display = 'block';
					scope.positionStyles = $t3;
					var $t4 = $Client_Scope_Directive_Size.$ctor();
					$t4.width = '100%';
					$t4.height = '100%';
					scope.sizeStyle = $t4;
				}
				else {
					scope.positionStyles = scope.lastPositionStyles;
					scope.sizeStyle = scope.lastSizeStyle;
					scope.lastPositionStyles = null;
					scope.lastSizeStyle = null;
				}
				scope.isMaximized = !scope.isMaximized;
			};
			scope.close = function() {
				if (!ss.staticEquals(scope.onclose, null)) {
					scope.onclose();
				}
				if (!ss.staticEquals(scope.$parent.onClose, null)) {
					scope.$parent.onClose();
				}
				//todo destroy
				scope.positionStyles.display = 'none';
			};
			scope.minimize = ss.mkdel(this, function() {
				this.$myUIManagerService.onMinimize(scope);
				scope.$parent.swingAway(5, false, function() {
					scope.positionStyles.display = 'none';
				});
			});
			scope.restore = function() {
				scope.$parent.swingBack(null);
				scope.positionStyles.display = 'block';
			};
			this.$focus();
		},
		$focus: function() {
			var $t1 = $Client_Directives_FloatingWindowDirective.$items.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var floatingWindowScope = $t1.current();
					floatingWindowScope.value.positionStyles.zIndex = 10000;
				}
			}
			finally {
				$t1.dispose();
			}
			if ($Client_Directives_FloatingWindowDirective.$items.containsKey(this.$myElement)) {
				$Client_Directives_FloatingWindowDirective.$items.get_item(this.$myElement).positionStyles.zIndex = 10001;
				this.$myScope.$apply();
			}
		},
		swingBack: function(scope, element, callback) {
			var js = {};
			js['left'] = scope.left;
			js['top'] = scope.top;
			element.animate(js, 'fast', 'swing', callback);
		},
		swingAway: function(direction, simulate, element, callback) {
			var js = {};
			var distance = '3000';
			switch (direction) {
				case 0: {
					js['left'] = '-' + distance + 'px';
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 1: {
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 2: {
					js['left'] = distance + 'px';
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 3: {
					js['left'] = distance + 'px';
					break;
				}
				case 4: {
					js['left'] = distance + 'px';
					js['top'] = distance + 'px';
					break;
				}
				case 5: {
					js['top'] = distance + 'px';
					break;
				}
				case 6: {
					js['left'] = '-' + distance + 'px';
					js['top'] = distance + 'px';
					break;
				}
				case 7: {
					js['left'] = distance + 'px';
					break;
				}
			}
			if (simulate) {
				element.css(js);
			}
			else {
				element.animate(js, 'slow', 'swing', callback);
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.GridDirective
	var $Client_Directives_GridDirective = function() {
		this.link = null;
		this.replace = false;
		this.scope = null;
		this.link = ss.mkdel(this, this.$linkFn);
		this.replace = true;
		this.scope = { scale: '=grid', showGrid: '=' };
	};
	$Client_Directives_GridDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			scope['$watch']('showGrid', function() {
				if (scope.showGrid) {
					element.show('fast');
				}
				else {
					element.hide('fast');
				}
			});
			scope['$watch']('scale', function() {
				element.empty();
				var scale = scope.scale;
				var n = document.createElement('canvas');
				var w = scale.x;
				var h = scale.y;
				n.width = ss.Int32.trunc(w) + 1;
				n.height = ss.Int32.trunc(h) + 1;
				var context = n.getContext('2d');
				context.lineWidth = 1;
				context.moveTo(w, 0);
				context.lineTo(w, h);
				context.stroke();
				context.moveTo(0, h);
				context.lineTo(w, h);
				context.stroke();
				var url = n.toDataURL('image/png');
				element.css('background-image', ss.formatString('url({0})', url));
				element.css('background-repeat', 'repeat-x repeat-y');
				element.css('width', '100%');
				element.css('height', '100%');
				element.css('margin-left', 'auto');
				element.css('margin-right', 'auto');
				element.css('margin-bottom', 'auto');
				element.css('margin-top', 'auto');
				element.zIndex(-10000);
			}, true);
			//
			//            scope["$watch"]("scale", new Action(() =>
			//
			//            {
			//
			//            element.Empty();
			//
			//            var scale = (Point) scope.scale;
			//
			//            var w = jQueryApi.jQuery.Window.GetWidth();
			//
			//            var h = jQueryApi.jQuery.Window.GetHeight();
			//
			//            
			//
			//            for (int i = 0; i < (w/scale.X) + 2; i++)
			//
			//            {
			//
			//            for (int j = 0; j < (h/scale.Y) + 2; j++)
			//
			//            {
			//
			//            element.Append(
			//
			//            string.Format(
			//
			//            "<div style='border:solid 1px black;position:absolute;left:{0}px;top:{1}px;width:{2}px;height:{3}px;'></div>",
			//
			//            i*scale.X, j*scale.Y, scale.X, scale.Y));
			//
			//            }
			//
			//            }
			//
			//            }), true);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Directives.PropertyDirective
	var $Client_Directives_PropertyDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Directives_PropertyDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var prop = scope[attrs.property];
			switch (prop.type) {
				case 'text': {
					element[0].setAttribute('type', 'text');
					break;
				}
				case 'number': {
					element[0].setAttribute('type', 'number');
					break;
				}
				case 'color': {
					element[0].setAttribute('type', 'color');
					break;
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Libs.Extensions
	var $Client_Libs_Extensions = function() {
	};
	$Client_Libs_Extensions.randomElement = function(T) {
		return function(arr) {
			return arr[ss.Int32.trunc(Math.floor(Math.random() * arr.length))];
		};
	};
	$Client_Libs_Extensions.fuckingClone = function(elem) {
		var pos = elem.offset();
		var m = elem.clone();
		m.css('left', -999999);
		m.css('top', -999999);
		$('body').append(m);
		var curTransformX = m.position().left;
		var curTransformY = m.position().top;
		var oldRot = m.css('-webkit-transform');
		m.css('-webkit-transform', '');
		curTransformX = m.position().left - curTransformX;
		curTransformY = m.position().top - curTransformY;
		m.css('-webkit-transform', oldRot);
		m.css('left', pos.left + curTransformX);
		m.css('top', pos.top + curTransformY);
		return m;
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
			if (!ss.staticEquals(callback, null)) {
				script.onreadystatechange = function(a) {
					if (script.readyState === 'loaded' || script.readyState === 'complete') {
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
			nextOne = ss.mkdel(this, function() {
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
		$this.startTime = new Date(0);
		$this.timeValue = 0;
		$this.endTime = new Date(0);
		$this.startTime = new Date();
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope._KeepBaseScopeAlive
	var $Client_Scope__KeepBaseScopeAlive = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.ActiveLobbyModel
	var $Client_Scope_Controller_ActiveLobbyModel = function() {
	};
	$Client_Scope_Controller_ActiveLobbyModel.createInstance = function() {
		return $Client_Scope_Controller_ActiveLobbyModel.$ctor();
	};
	$Client_Scope_Controller_ActiveLobbyModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.room = null;
		$this.chatLines = null;
		$this.users = null;
		$this.sendChatMessage = null;
		$this.currentChatMessage = null;
		$this.startGame = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.ActiveLobbyScope
	var $Client_Scope_Controller_ActiveLobbyScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.CreateRoomModel
	var $Client_Scope_Controller_CreateRoomModel = function() {
	};
	$Client_Scope_Controller_CreateRoomModel.createInstance = function() {
		return $Client_Scope_Controller_CreateRoomModel.$ctor();
	};
	$Client_Scope_Controller_CreateRoomModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.roomName = null;
		$this.createRoom = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.CreateRoomScope
	var $Client_Scope_Controller_CreateRoomScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.EffectTesterAreaModel
	var $Client_Scope_Controller_EffectTesterAreaModel = function() {
	};
	$Client_Scope_Controller_EffectTesterAreaModel.createInstance = function() {
		return $Client_Scope_Controller_EffectTesterAreaModel.$ctor();
	};
	$Client_Scope_Controller_EffectTesterAreaModel.$ctor = function() {
		var $this = {};
		$this.area = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.EffectTesterCardModel
	var $Client_Scope_Controller_EffectTesterCardModel = function() {
	};
	$Client_Scope_Controller_EffectTesterCardModel.createInstance = function() {
		return $Client_Scope_Controller_EffectTesterCardModel.$ctor();
	};
	$Client_Scope_Controller_EffectTesterCardModel.$ctor = function() {
		var $this = {};
		$this.space = null;
		$this.card = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.EffectTesterControllerScope
	var $Client_Scope_Controller_EffectTesterControllerScope = function() {
		this.model = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.EffectTesterControllerScopeModel
	var $Client_Scope_Controller_EffectTesterControllerScopeModel = function() {
	};
	$Client_Scope_Controller_EffectTesterControllerScopeModel.createInstance = function() {
		return $Client_Scope_Controller_EffectTesterControllerScopeModel.$ctor();
	};
	$Client_Scope_Controller_EffectTesterControllerScopeModel.$ctor = function() {
		var $this = {};
		$this.game = null;
		$this.selection = null;
		$this.scale = null;
		$this.spaceTest = null;
		$this.areaTest = null;
		$this.textTest = null;
		$this.cardTest = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.EffectTesterSpaceModel
	var $Client_Scope_Controller_EffectTesterSpaceModel = function() {
	};
	$Client_Scope_Controller_EffectTesterSpaceModel.createInstance = function() {
		return $Client_Scope_Controller_EffectTesterSpaceModel.$ctor();
	};
	$Client_Scope_Controller_EffectTesterSpaceModel.$ctor = function() {
		var $this = {};
		$this.space = null;
		$this.cards = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.EffectTesterTextModel
	var $Client_Scope_Controller_EffectTesterTextModel = function() {
	};
	$Client_Scope_Controller_EffectTesterTextModel.createInstance = function() {
		return $Client_Scope_Controller_EffectTesterTextModel.$ctor();
	};
	$Client_Scope_Controller_EffectTesterTextModel.$ctor = function() {
		var $this = {};
		$this.text = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameCodeScope
	var $Client_Scope_Controller_GameCodeScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameCodeScopeModel
	var $Client_Scope_Controller_GameCodeScopeModel = function() {
	};
	$Client_Scope_Controller_GameCodeScopeModel.createInstance = function() {
		return $Client_Scope_Controller_GameCodeScopeModel.$ctor();
	};
	$Client_Scope_Controller_GameCodeScopeModel.$ctor = function() {
		var $this = {};
		$this.code = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameControllerScope
	var $Client_Scope_Controller_GameControllerScope = function() {
		this.mainArea = null;
		this.scale = null;
		this.moveCard = null;
		this.animateCard = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameEditorModel
	var $Client_Scope_Controller_GameEditorModel = function() {
	};
	$Client_Scope_Controller_GameEditorModel.createInstance = function() {
		return $Client_Scope_Controller_GameEditorModel.$ctor();
	};
	$Client_Scope_Controller_GameEditorModel.$ctor = function() {
		var $this = $Client_Scope_Controller_GameUpdater.$ctor();
		$this.game = null;
		$this.openCode = null;
		$this.openLayout = null;
		$this.openEffects = null;
		$this.openTest = null;
		$this.selection = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameEditorScope
	var $Client_Scope_Controller_GameEditorScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameEditorSelectionScopeModel
	var $Client_Scope_Controller_GameEditorSelectionScopeModel = function() {
	};
	$Client_Scope_Controller_GameEditorSelectionScopeModel.createInstance = function() {
		return $Client_Scope_Controller_GameEditorSelectionScopeModel.$ctor();
	};
	$Client_Scope_Controller_GameEditorSelectionScopeModel.$ctor = function() {
		var $this = $Client_Scope_Controller_GameUpdater.$ctor();
		$this.selectedEffect = null;
		$this.selectedScenarioCard = null;
		$this.selectedScenarioSpace = null;
		$this.selectedScenarioEffect = null;
		$this.selectedSpace = null;
		$this.selectedText = null;
		$this.selectedArea = null;
		$this.selectedCard = null;
		$this.selectedLayoutPiece = 0;
		$this.selectedScenarioPiece = 0;
		$this.selectedScenario = null;
		$this.showGrid = false;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameEffectsEditorScope
	var $Client_Scope_Controller_GameEffectsEditorScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameEffectsEditorScopeModel
	var $Client_Scope_Controller_GameEffectsEditorScopeModel = function() {
	};
	$Client_Scope_Controller_GameEffectsEditorScopeModel.createInstance = function() {
		return $Client_Scope_Controller_GameEffectsEditorScopeModel.$ctor();
	};
	$Client_Scope_Controller_GameEffectsEditorScopeModel.$ctor = function() {
		var $this = $Client_Scope_Controller_GameUpdater.$ctor();
		$this.game = null;
		$this.selection = null;
		$this.newEffectName = null;
		$this.newEffectType = 0;
		$this.effectTypes = null;
		$this.addEffect = null;
		$this.removeEffect = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameLayoutEditorScope
	var $Client_Scope_Controller_GameLayoutEditorScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameLayoutEditorScopeModel
	var $Client_Scope_Controller_GameLayoutEditorScopeModel = function() {
	};
	$Client_Scope_Controller_GameLayoutEditorScopeModel.createInstance = function() {
		return $Client_Scope_Controller_GameLayoutEditorScopeModel.$ctor();
	};
	$Client_Scope_Controller_GameLayoutEditorScopeModel.$ctor = function() {
		var $this = $Client_Scope_Controller_GameUpdater.$ctor();
		$this.selection = null;
		$this.game = null;
		$this.addText = null;
		$this.addArea = null;
		$this.addSpace = null;
		$this.removeSpace = null;
		$this.removeArea = null;
		$this.removeText = null;
		$this.openScenarios = null;
		$this.toggleGrid = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameManagerModel
	var $Client_Scope_Controller_GameManagerModel = function() {
	};
	$Client_Scope_Controller_GameManagerModel.createInstance = function() {
		return $Client_Scope_Controller_GameManagerModel.$ctor();
	};
	$Client_Scope_Controller_GameManagerModel.$ctor = function() {
		var $this = {};
		$this.games = null;
		$this.selectedGame = null;
		$this.createGame = null;
		$this.deleteGame = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameManagerScope
	var $Client_Scope_Controller_GameManagerScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameScenarioEditorScope
	var $Client_Scope_Controller_GameScenarioEditorScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameScenarioEditorScopeModel
	var $Client_Scope_Controller_GameScenarioEditorScopeModel = function() {
	};
	$Client_Scope_Controller_GameScenarioEditorScopeModel.createInstance = function() {
		return $Client_Scope_Controller_GameScenarioEditorScopeModel.$ctor();
	};
	$Client_Scope_Controller_GameScenarioEditorScopeModel.$ctor = function() {
		var $this = $Client_Scope_Controller_GameUpdater.$ctor();
		$this.selection = null;
		$this.game = null;
		$this.getSpaceByScenarioSpace = null;
		$this.addCard = null;
		$this.removeCard = null;
		$this.addNewScenario = null;
		$this.cloneNewScenario = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.GameUpdater
	var $Client_Scope_Controller_GameUpdater = function() {
	};
	$Client_Scope_Controller_GameUpdater.createInstance = function() {
		return $Client_Scope_Controller_GameUpdater.$ctor();
	};
	$Client_Scope_Controller_GameUpdater.$ctor = function() {
		var $this = {};
		$this.updateGame = null;
		$this.updateStatus = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.HomeModel
	var $Client_Scope_Controller_HomeModel = function() {
	};
	$Client_Scope_Controller_HomeModel.createInstance = function() {
		return $Client_Scope_Controller_HomeModel.$ctor();
	};
	$Client_Scope_Controller_HomeModel.$ctor = function() {
		var $this = {};
		$this.gameTypes = null;
		$this.selectedGameType = null;
		$this.rooms = null;
		$this.selectedRoom = null;
		$this.gameTypeSelected = null;
		$this.roomSelected = null;
		$this.createRoom = null;
		$this.joinRoom = null;
		$this.user = null;
		$this.createGame = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.HomeScope
	var $Client_Scope_Controller_HomeScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.LoginScope
	var $Client_Scope_Controller_LoginScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.LoginScopeModel
	var $Client_Scope_Controller_LoginScopeModel = function() {
	};
	$Client_Scope_Controller_LoginScopeModel.createInstance = function() {
		return $Client_Scope_Controller_LoginScopeModel.$ctor();
	};
	$Client_Scope_Controller_LoginScopeModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.username = null;
		$this.password = null;
		$this.createAccount = null;
		$this.loginAccount = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.MessageModel
	var $Client_Scope_Controller_MessageModel = function() {
	};
	$Client_Scope_Controller_MessageModel.createInstance = function() {
		return $Client_Scope_Controller_MessageModel.$ctor();
	};
	$Client_Scope_Controller_MessageModel.$ctor = function() {
		var $this = {};
		$this.title = null;
		$this.message = null;
		$this.callback = null;
		$this.messageType = 0;
		$this.response = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.MessageScope
	var $Client_Scope_Controller_MessageScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.MessageType
	var $Client_Scope_Controller_MessageType = function() {
	};
	$Client_Scope_Controller_MessageType.prototype = { okay: 'okay', question: 'question' };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.MinimizeScope
	var $Client_Scope_Controller_MinimizeScope = function() {
		this.items = null;
		this.open = null;
		this.remove = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.QuestionScope
	var $Client_Scope_Controller_QuestionScope = function() {
		this.model = null;
		$Client_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.QuestionScopeModel
	var $Client_Scope_Controller_QuestionScopeModel = function() {
	};
	$Client_Scope_Controller_QuestionScopeModel.createInstance = function() {
		return $Client_Scope_Controller_QuestionScopeModel.$ctor();
	};
	$Client_Scope_Controller_QuestionScopeModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.question = null;
		$this.answers = null;
		$this.selectedAnswer = null;
		$this.answerQuestion = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.SelectedGameLayoutPiece
	var $Client_Scope_Controller_SelectedGameLayoutPiece = function() {
	};
	$Client_Scope_Controller_SelectedGameLayoutPiece.prototype = { none: 'none', space: 'space', text: 'text', area: 'area' };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.SelectedGameScenarioPiece
	var $Client_Scope_Controller_SelectedGameScenarioPiece = function() {
	};
	$Client_Scope_Controller_SelectedGameScenarioPiece.prototype = { none: 'none', space: 'space', effect: 'effect' };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.TestGameControllerScope
	var $Client_Scope_Controller_TestGameControllerScope = function() {
		this.model = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.TestGameControllerScopeModel
	var $Client_Scope_Controller_TestGameControllerScopeModel = function() {
	};
	$Client_Scope_Controller_TestGameControllerScopeModel.createInstance = function() {
		return $Client_Scope_Controller_TestGameControllerScopeModel.$ctor();
	};
	$Client_Scope_Controller_TestGameControllerScopeModel.$ctor = function() {
		var $this = {};
		$this.game = null;
		$this.scale = null;
		$this.moveCard = null;
		$this.animateCard = null;
		$this.selection = null;
		$this.getCardsFromScenario = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Controller.UpdateStatusType
	var $Client_Scope_Controller_UpdateStatusType = function() {
	};
	$Client_Scope_Controller_UpdateStatusType.prototype = { dirty: 'dirty', syncing: 'syncing', synced: 'synced' };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.AcgSpacesScope
	var $Client_Scope_Directive_AcgSpacesScope = function() {
		this.spaces = null;
		this.space = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.CardScope
	var $Client_Scope_Directive_CardScope = function() {
		this.card = null;
		this.cardStyle = null;
		this.space = null;
		this.$parent = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.EffectTestAreaScope
	var $Client_Scope_Directive_EffectTestAreaScope = function() {
		this.area = null;
		this.areaStyle = null;
		$Client_Scope_Controller_EffectTesterControllerScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.EffectTestCardScope
	var $Client_Scope_Directive_EffectTestCardScope = function() {
		this.card = null;
		this.cardStyle = null;
		this.test = 0;
		$Client_Scope_Directive_EffectTestSpaceScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.EffectTestSpaceScope
	var $Client_Scope_Directive_EffectTestSpaceScope = function() {
		this.space = null;
		this.spaceStyle = null;
		$Client_Scope_Controller_EffectTesterControllerScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.EffectTestTextScope
	var $Client_Scope_Directive_EffectTestTextScope = function() {
		this.text = null;
		this.textStyle = null;
		$Client_Scope_Controller_EffectTesterControllerScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.EffectTestType
	var $Client_Scope_Directive_EffectTestType = function() {
	};
	$Client_Scope_Directive_EffectTestType.prototype = { card: 'card', space: 'space', area: 'area', text: 'text' };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.FloatingWindowBaseScope
	var $Client_Scope_Directive_FloatingWindowBaseScope = function() {
		this.swingAway = null;
		this.swingBack = null;
		this.minimize = null;
		this.visible = false;
		this.minimized = false;
		this.onClose = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.FloatingWindowPosition
	var $Client_Scope_Directive_FloatingWindowPosition = function() {
	};
	$Client_Scope_Directive_FloatingWindowPosition.createInstance = function() {
		return $Client_Scope_Directive_FloatingWindowPosition.$ctor();
	};
	$Client_Scope_Directive_FloatingWindowPosition.$ctor = function() {
		var $this = {};
		$this.display = null;
		$this.left = null;
		$this.top = null;
		$this.marginLeft = null;
		$this.marginTop = null;
		$this.zIndex = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.FloatingWindowScope
	var $Client_Scope_Directive_FloatingWindowScope = function() {
		this.$parent = null;
		this.visible = false;
		this.width = null;
		this.height = null;
		this.left = null;
		this.top = null;
		this.sizeStyle = null;
		this.lastSizeStyle = null;
		this.positionStyles = null;
		this.lastPositionStyles = null;
		this.title = null;
		this.onclose = null;
		this.close = null;
		this.minimize = null;
		this.maximize = null;
		this.restore = null;
		this.isMaximized = false;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.Size
	var $Client_Scope_Directive_Size = function() {
	};
	$Client_Scope_Directive_Size.createInstance = function() {
		return $Client_Scope_Directive_Size.$ctor();
	};
	$Client_Scope_Directive_Size.$ctor = function() {
		var $this = {};
		$this.width = null;
		$this.height = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.SpaceScope
	var $Client_Scope_Directive_SpaceScope = function() {
		this.space = null;
		this.$parent = null;
		this.spaceStyle = null;
		Client.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.SwingDirection
	var $Client_Scope_Directive_SwingDirection = function() {
	};
	$Client_Scope_Directive_SwingDirection.prototype = { topLeft: 0, top: 1, topRight: 2, right: 3, bottomRight: 4, bottom: 5, bottomLeft: 6, left: 7 };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.TestAreaScope
	var $Client_Scope_Directive_TestAreaScope = function() {
		this.area = null;
		this.areaStyle = null;
		$Client_Scope_Controller_TestGameControllerScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.TestCardScope
	var $Client_Scope_Directive_TestCardScope = function() {
		this.card = null;
		this.cardStyle = null;
		this.cardClick = null;
		$Client_Scope_Directive_TestSpaceScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.TestSpaceScope
	var $Client_Scope_Directive_TestSpaceScope = function() {
		this.space = null;
		this.spaceStyle = null;
		$Client_Scope_Controller_TestGameControllerScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Scope.Directive.TestTextScope
	var $Client_Scope_Directive_TestTextScope = function() {
		this.text = null;
		this.textStyle = null;
		$Client_Scope_Controller_TestGameControllerScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.ClientChatManagerService
	var $Client_Services_ClientChatManagerService = function(gateway) {
		this.$1$OnGetChatLinesField = null;
		this.$1$OnGetChatInfoField = null;
		this.$clientChatManager = null;
		this.$clientChatManager = new ClientLibs.Managers.ClientChatManager(gateway.get_gateway());
		this.$clientChatManager.add_onGetChatInfo(ss.mkdel(this, function(user, model) {
			if (!ss.staticEquals(this.$1$OnGetChatInfoField, null)) {
				this.$1$OnGetChatInfoField(user, model);
			}
		}));
		this.$clientChatManager.add_onGetChatLines(ss.mkdel(this, function(user1, model1) {
			if (!ss.staticEquals(this.$1$OnGetChatLinesField, null)) {
				this.$1$OnGetChatLinesField(user1, model1);
			}
		}));
	};
	$Client_Services_ClientChatManagerService.prototype = {
		add_onGetChatLines: function(value) {
			this.$1$OnGetChatLinesField = ss.delegateCombine(this.$1$OnGetChatLinesField, value);
		},
		remove_onGetChatLines: function(value) {
			this.$1$OnGetChatLinesField = ss.delegateRemove(this.$1$OnGetChatLinesField, value);
		},
		add_onGetChatInfo: function(value) {
			this.$1$OnGetChatInfoField = ss.delegateCombine(this.$1$OnGetChatInfoField, value);
		},
		remove_onGetChatInfo: function(value) {
			this.$1$OnGetChatInfoField = ss.delegateRemove(this.$1$OnGetChatInfoField, value);
		},
		sendChatMessage: function(sendChatMessageModel) {
			this.$clientChatManager.sendChatMessage(sendChatMessageModel);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.ClientDebugManagerService
	var $Client_Services_ClientDebugManagerService = function(gateway) {
		this.$clientDebugManager = null;
		this.$1$OnGetGameSourceField = null;
		this.$1$OnGetDebugLogField = null;
		this.$1$OnGetDebugBreakField = null;
		this.$1$OnDebugGameOverField = null;
		this.$clientDebugManager = new ClientLibs.Managers.ClientDebugManager(gateway.get_gateway());
		this.$clientDebugManager.add_onDebugGameOver(ss.mkdel(this, function(user, model) {
			if (!ss.staticEquals(this.$1$OnDebugGameOverField, null)) {
				this.$1$OnDebugGameOverField(user, model);
			}
		}));
		this.$clientDebugManager.add_onGetDebugBreak(ss.mkdel(this, function(user1, model1) {
			if (!ss.staticEquals(this.$1$OnGetDebugBreakField, null)) {
				this.$1$OnGetDebugBreakField(user1, model1);
			}
		}));
		this.$clientDebugManager.add_onGetDebugLog(ss.mkdel(this, function(user2, model2) {
			if (!ss.staticEquals(this.$1$OnGetDebugLogField, null)) {
				this.$1$OnGetDebugLogField(user2, model2);
			}
		}));
		this.$clientDebugManager.add_onGetGameSource(ss.mkdel(this, function(user3, model3) {
			if (!ss.staticEquals(this.$1$OnGetGameSourceField, null)) {
				this.$1$OnGetGameSourceField(user3, model3);
			}
		}));
	};
	$Client_Services_ClientDebugManagerService.prototype = {
		add_onGetGameSource: function(value) {
			this.$1$OnGetGameSourceField = ss.delegateCombine(this.$1$OnGetGameSourceField, value);
		},
		remove_onGetGameSource: function(value) {
			this.$1$OnGetGameSourceField = ss.delegateRemove(this.$1$OnGetGameSourceField, value);
		},
		add_onGetDebugLog: function(value) {
			this.$1$OnGetDebugLogField = ss.delegateCombine(this.$1$OnGetDebugLogField, value);
		},
		remove_onGetDebugLog: function(value) {
			this.$1$OnGetDebugLogField = ss.delegateRemove(this.$1$OnGetDebugLogField, value);
		},
		add_onGetDebugBreak: function(value) {
			this.$1$OnGetDebugBreakField = ss.delegateCombine(this.$1$OnGetDebugBreakField, value);
		},
		remove_onGetDebugBreak: function(value) {
			this.$1$OnGetDebugBreakField = ss.delegateRemove(this.$1$OnGetDebugBreakField, value);
		},
		add_onDebugGameOver: function(value) {
			this.$1$OnDebugGameOverField = ss.delegateCombine(this.$1$OnDebugGameOverField, value);
		},
		remove_onDebugGameOver: function(value) {
			this.$1$OnDebugGameOverField = ss.delegateRemove(this.$1$OnDebugGameOverField, value);
		},
		requestGameSource: function(gameSourceRequestModel) {
			this.$clientDebugManager.requestGameSource(gameSourceRequestModel);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.ClientGameManagerService
	var $Client_Services_ClientGameManagerService = function(gateway) {
		this.$clientGameManager = null;
		this.$1$OnAskQuestionField = null;
		this.$1$OnUpdateStateField = null;
		this.$1$OnGameStartedField = null;
		this.$1$OnGameOverField = null;
		this.$clientGameManager = new ClientLibs.Managers.ClientGameManager(gateway.get_gateway());
		this.$clientGameManager.add_onAskQuestion(ss.mkdel(this, function(user, model) {
			if (!ss.staticEquals(this.$1$OnAskQuestionField, null)) {
				this.$1$OnAskQuestionField(user, model);
			}
		}));
		this.$clientGameManager.add_onGameOver(ss.mkdel(this, function(user1, model1) {
			if (!ss.staticEquals(this.$1$OnGameOverField, null)) {
				this.$1$OnGameOverField(user1, model1);
			}
		}));
		this.$clientGameManager.add_onGameStarted(ss.mkdel(this, function(user2, model2) {
			if (!ss.staticEquals(this.$1$OnGameStartedField, null)) {
				this.$1$OnGameStartedField(user2, model2);
			}
		}));
		this.$clientGameManager.add_onUpdateState(ss.mkdel(this, function(user3, model3) {
			if (!ss.staticEquals(this.$1$OnUpdateStateField, null)) {
				this.$1$OnUpdateStateField(user3, model3);
			}
		}));
	};
	$Client_Services_ClientGameManagerService.prototype = {
		add_onAskQuestion: function(value) {
			this.$1$OnAskQuestionField = ss.delegateCombine(this.$1$OnAskQuestionField, value);
		},
		remove_onAskQuestion: function(value) {
			this.$1$OnAskQuestionField = ss.delegateRemove(this.$1$OnAskQuestionField, value);
		},
		add_onUpdateState: function(value) {
			this.$1$OnUpdateStateField = ss.delegateCombine(this.$1$OnUpdateStateField, value);
		},
		remove_onUpdateState: function(value) {
			this.$1$OnUpdateStateField = ss.delegateRemove(this.$1$OnUpdateStateField, value);
		},
		add_onGameStarted: function(value) {
			this.$1$OnGameStartedField = ss.delegateCombine(this.$1$OnGameStartedField, value);
		},
		remove_onGameStarted: function(value) {
			this.$1$OnGameStartedField = ss.delegateRemove(this.$1$OnGameStartedField, value);
		},
		add_onGameOver: function(value) {
			this.$1$OnGameOverField = ss.delegateCombine(this.$1$OnGameOverField, value);
		},
		remove_onGameOver: function(value) {
			this.$1$OnGameOverField = ss.delegateRemove(this.$1$OnGameOverField, value);
		},
		answerQuestion: function(gameAnswerQuestionModel) {
			this.$clientGameManager.answerQuestion(gameAnswerQuestionModel);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.ClientSiteManagerService
	var $Client_Services_ClientSiteManagerService = function(gateway) {
		this.$1$OnGetGameTypesReceivedField = null;
		this.$1$OnUserCreateField = null;
		this.$1$OnLoginField = null;
		this.$1$OnGetRoomsReceivedField = null;
		this.$1$OnRoomJoinedField = null;
		this.$1$OnGetRoomInfoReceivedField = null;
		this.$1$OnGetGamesByUserReceivedField = null;
		this.$1$OnDoesGameNameExistReceivedField = null;
		this.$1$OnDeveloperCreateGameReceivedField = null;
		this.$1$OnDeveloperUpdateGameReceivedField = null;
		this.$clientSiteManager = null;
		this.$clientSiteManager = new ClientLibs.Managers.ClientSiteManager(gateway.get_gateway());
		this.$clientSiteManager.add_onGetGameTypesReceived(ss.mkdel(this, function(user, model) {
			if (!ss.staticEquals(this.$1$OnGetGameTypesReceivedField, null)) {
				this.$1$OnGetGameTypesReceivedField(user, model);
			}
		}));
		this.$clientSiteManager.add_onLogin(ss.mkdel(this, function(user1, model1) {
			if (!ss.staticEquals(this.$1$OnLoginField, null)) {
				this.$1$OnLoginField(user1, model1);
			}
		}));
		this.$clientSiteManager.add_onUserCreate(ss.mkdel(this, function(user2, model2) {
			if (!ss.staticEquals(this.$1$OnUserCreateField, null)) {
				this.$1$OnUserCreateField(user2, model2);
			}
		}));
		this.$clientSiteManager.add_onGetRoomsReceived(ss.mkdel(this, function(user3, model3) {
			if (!ss.staticEquals(this.$1$OnGetRoomsReceivedField, null)) {
				this.$1$OnGetRoomsReceivedField(user3, model3);
			}
		}));
		this.$clientSiteManager.add_onRoomJoined(ss.mkdel(this, function(user4, model4) {
			if (!ss.staticEquals(this.$1$OnRoomJoinedField, null)) {
				this.$1$OnRoomJoinedField(user4, model4);
			}
		}));
		this.$clientSiteManager.add_onGetRoomInfoReceived(ss.mkdel(this, function(user5, model5) {
			if (!ss.staticEquals(this.$1$OnGetRoomInfoReceivedField, null)) {
				this.$1$OnGetRoomInfoReceivedField(user5, model5);
			}
		}));
		this.$clientSiteManager.add_onGetGamesByUserReceived(ss.mkdel(this, function(user6, model6) {
			if (!ss.staticEquals(this.$1$OnGetGamesByUserReceivedField, null)) {
				this.$1$OnGetGamesByUserReceivedField(user6, model6);
			}
		}));
		this.$clientSiteManager.add_onDoesGameNameExistReceived(ss.mkdel(this, function(user7, model7) {
			if (!ss.staticEquals(this.$1$OnDoesGameNameExistReceivedField, null)) {
				this.$1$OnDoesGameNameExistReceivedField(user7, model7);
			}
		}));
		this.$clientSiteManager.add_onDeveloperCreateGameReceived(ss.mkdel(this, function(user8, model8) {
			if (!ss.staticEquals(this.$1$OnDeveloperCreateGameReceivedField, null)) {
				this.$1$OnDeveloperCreateGameReceivedField(user8, model8);
			}
		}));
		this.$clientSiteManager.add_onDeveloperUpdateGameReceived(ss.mkdel(this, function(user9, model9) {
			if (!ss.staticEquals(this.$1$OnDeveloperUpdateGameReceivedField, null)) {
				this.$1$OnDeveloperUpdateGameReceivedField(user9, model9);
			}
		}));
	};
	$Client_Services_ClientSiteManagerService.prototype = {
		add_onGetGameTypesReceived: function(value) {
			this.$1$OnGetGameTypesReceivedField = ss.delegateCombine(this.$1$OnGetGameTypesReceivedField, value);
		},
		remove_onGetGameTypesReceived: function(value) {
			this.$1$OnGetGameTypesReceivedField = ss.delegateRemove(this.$1$OnGetGameTypesReceivedField, value);
		},
		add_onUserCreate: function(value) {
			this.$1$OnUserCreateField = ss.delegateCombine(this.$1$OnUserCreateField, value);
		},
		remove_onUserCreate: function(value) {
			this.$1$OnUserCreateField = ss.delegateRemove(this.$1$OnUserCreateField, value);
		},
		add_onLogin: function(value) {
			this.$1$OnLoginField = ss.delegateCombine(this.$1$OnLoginField, value);
		},
		remove_onLogin: function(value) {
			this.$1$OnLoginField = ss.delegateRemove(this.$1$OnLoginField, value);
		},
		add_onGetRoomsReceived: function(value) {
			this.$1$OnGetRoomsReceivedField = ss.delegateCombine(this.$1$OnGetRoomsReceivedField, value);
		},
		remove_onGetRoomsReceived: function(value) {
			this.$1$OnGetRoomsReceivedField = ss.delegateRemove(this.$1$OnGetRoomsReceivedField, value);
		},
		add_onRoomJoined: function(value) {
			this.$1$OnRoomJoinedField = ss.delegateCombine(this.$1$OnRoomJoinedField, value);
		},
		remove_onRoomJoined: function(value) {
			this.$1$OnRoomJoinedField = ss.delegateRemove(this.$1$OnRoomJoinedField, value);
		},
		add_onGetRoomInfoReceived: function(value) {
			this.$1$OnGetRoomInfoReceivedField = ss.delegateCombine(this.$1$OnGetRoomInfoReceivedField, value);
		},
		remove_onGetRoomInfoReceived: function(value) {
			this.$1$OnGetRoomInfoReceivedField = ss.delegateRemove(this.$1$OnGetRoomInfoReceivedField, value);
		},
		add_onGetGamesByUserReceived: function(value) {
			this.$1$OnGetGamesByUserReceivedField = ss.delegateCombine(this.$1$OnGetGamesByUserReceivedField, value);
		},
		remove_onGetGamesByUserReceived: function(value) {
			this.$1$OnGetGamesByUserReceivedField = ss.delegateRemove(this.$1$OnGetGamesByUserReceivedField, value);
		},
		add_onDoesGameNameExistReceived: function(value) {
			this.$1$OnDoesGameNameExistReceivedField = ss.delegateCombine(this.$1$OnDoesGameNameExistReceivedField, value);
		},
		remove_onDoesGameNameExistReceived: function(value) {
			this.$1$OnDoesGameNameExistReceivedField = ss.delegateRemove(this.$1$OnDoesGameNameExistReceivedField, value);
		},
		add_onDeveloperCreateGameReceived: function(value) {
			this.$1$OnDeveloperCreateGameReceivedField = ss.delegateCombine(this.$1$OnDeveloperCreateGameReceivedField, value);
		},
		remove_onDeveloperCreateGameReceived: function(value) {
			this.$1$OnDeveloperCreateGameReceivedField = ss.delegateRemove(this.$1$OnDeveloperCreateGameReceivedField, value);
		},
		add_onDeveloperUpdateGameReceived: function(value) {
			this.$1$OnDeveloperUpdateGameReceivedField = ss.delegateCombine(this.$1$OnDeveloperUpdateGameReceivedField, value);
		},
		remove_onDeveloperUpdateGameReceived: function(value) {
			this.$1$OnDeveloperUpdateGameReceivedField = ss.delegateRemove(this.$1$OnDeveloperUpdateGameReceivedField, value);
		},
		login: function(userName, password) {
			this.$clientSiteManager.login(userName, password);
		},
		createUser: function(userName, password) {
			this.$clientSiteManager.createUser({ userName: userName, password: password });
		},
		getGameTypes: function() {
			this.$clientSiteManager.getGameTypes();
		},
		getRooms: function(getRoomsRequest) {
			this.$clientSiteManager.getRooms(getRoomsRequest);
		},
		createRoom: function(createRoom) {
			this.$clientSiteManager.createRoom(createRoom);
		},
		getRoomInfo: function(roomInfo) {
			this.$clientSiteManager.getRoomInfo(roomInfo);
		},
		joinRoom: function(joinRoom) {
			this.$clientSiteManager.joinRoom(joinRoom);
		},
		leaveRoom: function(leaveRoom) {
			this.$clientSiteManager.leaveRoom(leaveRoom);
		},
		startGame: function(startGameRequest) {
			this.$clientSiteManager.startGame(startGameRequest);
		},
		getGamesByUser: function(hash) {
			this.$clientSiteManager.getGamesByUser({ userHash: hash });
		},
		developerCreateGame: function(gameName) {
			this.$clientSiteManager.developerCreateGame({ gameName: gameName });
		},
		developerUpdateGame: function(gameModel) {
			this.$clientSiteManager.developerUpdateGame({ gameModel: gameModel });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.CreateUIService
	var $Client_Services_CreateUIService = function(compileService, rootScopeService) {
		this.$myCompileService = null;
		this.$myRootScopeService = null;
		this.$singltons = {};
		this.$myCompileService = compileService;
		this.$myRootScopeService = rootScopeService;
	};
	$Client_Services_CreateUIService.prototype = {
		create: function(T) {
			return function(ui) {
				return this.create$3(T).call(this, ui, function(a, b) {
				});
			};
		},
		create$3: function(T) {
			return function(ui, populateScope) {
				var scope = this.$myRootScopeService.$new();
				var html = $(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, CommonLibraries.Constants.webIP));
				populateScope(scope, html);
				var item = this.$myCompileService(html)(scope);
				item.appendTo(window.document.body);
				scope.$apply();
				return scope;
			};
		},
		createSingleton: function(ui) {
			return this.createSingleton$1(Object).call(this, ui);
		},
		createSingleton$1: function(T) {
			return function(ui) {
				return this.createSingleton$2(T).call(this, ui, function(a, b) {
				});
			};
		},
		createSingleton$2: function(T) {
			return function(ui, populateScope) {
				var scope;
				if (ss.keyExists(this.$singltons, ui)) {
					var html = this.$singltons[ui];
					scope = this.$myRootScopeService.$new();
					populateScope(scope, html);
					this.$myCompileService(html)(scope);
					scope.$apply();
				}
				else {
					scope = this.$myRootScopeService.$new();
					var html1 = $(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, CommonLibraries.Constants.webIP));
					populateScope(scope, html1);
					var item = this.$myCompileService(html1)(scope);
					item.appendTo(window.document.body);
					scope.$apply();
					this.$singltons[ui] = html1;
				}
				return scope;
			};
		},
		create$1: function(ui) {
			var scope = this.$myRootScopeService.$new();
			var item = this.$myCompileService($(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, CommonLibraries.Constants.webIP)))(scope);
			item.appendTo(window.document.body);
			scope.$apply();
			return scope;
		},
		create$2: function(ui, scope) {
			var item = this.$myCompileService($(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, CommonLibraries.Constants.webIP)))(scope);
			item.appendTo(window.document.body);
			scope.$apply();
			return scope;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.GameContentManager
	var $Client_Services_GameContentManager = function() {
		this.redraw = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.GatewayService
	var $Client_Services_GatewayService = function(serverUrl) {
		this.$1$GatewayField = null;
		this.set_gateway(new ClientLibs.Gateway(serverUrl, false));
	};
	$Client_Services_GatewayService.prototype = {
		get_gateway: function() {
			return this.$1$GatewayField;
		},
		set_gateway: function(value) {
			this.$1$GatewayField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.MessageService
	var $Client_Services_MessageService = function(createUIService, rootScopeService) {
		this.$myCreateUIService = null;
		this.$myRootScopeService = null;
		this.$myCreateUIService = createUIService;
		this.$myRootScopeService = rootScopeService;
	};
	$Client_Services_MessageService.prototype = {
		popupOkay: function(title, message, callback) {
			this.$myCreateUIService.create$3($Client_Scope_Controller_MessageScope).call(this.$myCreateUIService, 'Message', function(mess, item) {
				mess.model = $Client_Scope_Controller_MessageModel.$ctor();
				mess.model.callback = function() {
					mess.$destroy();
					item.remove();
					callback();
				};
				mess.model.title = title;
				mess.model.message = message;
				mess.model.messageType = 'okay';
			});
		},
		popupQuestion: function(title, message, callback) {
			this.$myCreateUIService.create$3($Client_Scope_Controller_MessageScope).call(this.$myCreateUIService, 'Message', function(mess, item) {
				mess.model = $Client_Scope_Controller_MessageModel.$ctor();
				mess.model.callback = function() {
					mess.$destroy();
					item.remove();
					callback(mess.model.response);
				};
				mess.model.title = title;
				mess.model.message = message;
				mess.model.messageType = 'question';
			});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Services.UIManagerService
	var $Client_Services_UIManagerService = function(clientGameManagerService) {
		this.userLoggedIn = null;
		this.createRoom = null;
		this.openCreateRoomDialog = null;
		this.onRoomJoined = null;
		this.roomLeft = null;
		this.clientInfo = null;
		this.onMinimize = null;
		this.openGameEditor = null;
		this.clientInfo = Models.ClientInformation.$ctor();
		//            this.GameManager = new GameManager(clientGameManagerService,this);
	};
	ss.registerClass(global, 'Client.BuildAngular', $Client_BuildAngular);
	ss.registerClass(global, 'Client.BuildSite', $Client_BuildSite);
	ss.registerClass(null, 'Client.Controllers.$ActiveLobbyController', $Client_Controllers_$ActiveLobbyController);
	ss.registerClass(null, 'Client.Controllers.$CreateRoomController', $Client_Controllers_$CreateRoomController);
	ss.registerClass(null, 'Client.Controllers.$GameCodeController', $Client_Controllers_$GameCodeController);
	ss.registerClass(null, 'Client.Controllers.$GameEditorController', $Client_Controllers_$GameEditorController);
	ss.registerClass(null, 'Client.Controllers.$GameEffectsEditorController', $Client_Controllers_$GameEffectsEditorController);
	ss.registerClass(null, 'Client.Controllers.$GameLayoutEditorController', $Client_Controllers_$GameLayoutEditorController);
	ss.registerClass(null, 'Client.Controllers.$GameManagerController', $Client_Controllers_$GameManagerController);
	ss.registerClass(null, 'Client.Controllers.$GameScenarioEditorController', $Client_Controllers_$GameScenarioEditorController);
	ss.registerClass(null, 'Client.Controllers.$HomeController', $Client_Controllers_$HomeController);
	ss.registerClass(null, 'Client.Controllers.$LoginController', $Client_Controllers_$LoginController);
	ss.registerClass(null, 'Client.Controllers.$MessageController', $Client_Controllers_$MessageController);
	ss.registerClass(null, 'Client.Controllers.$MinimizeController', $Client_Controllers_$MinimizeController);
	ss.registerClass(null, 'Client.Controllers.$QuestionController', $Client_Controllers_$QuestionController);
	ss.registerClass(global, 'Client.Controllers.EffectTesterController', $Client_Controllers_EffectTesterController);
	ss.registerClass(global, 'Client.Controllers.GameController', $Client_Controllers_GameController);
	ss.registerClass(global, 'Client.Controllers.IntellisenseReturn', $Client_Controllers_IntellisenseReturn);
	ss.registerClass(global, 'Client.Controllers.TestGameController', $Client_Controllers_TestGameController);
	ss.registerClass(global, 'Client.Directives.AcgDrawCardDirective', $Client_Directives_AcgDrawCardDirective);
	ss.registerClass(global, 'Client.Directives.AcgDrawSpaceDirective', $Client_Directives_AcgDrawSpaceDirective);
	ss.registerClass(global, 'Client.Directives.AcgEffectTestDrawAreaDirective', $Client_Directives_AcgEffectTestDrawAreaDirective);
	ss.registerClass(global, 'Client.Directives.AcgEffectTestDrawCardDirective', $Client_Directives_AcgEffectTestDrawCardDirective);
	ss.registerClass(global, 'Client.Directives.AcgEffectTestDrawSpaceDirective', $Client_Directives_AcgEffectTestDrawSpaceDirective);
	ss.registerClass(global, 'Client.Directives.AcgEffectTestDrawTextDirective', $Client_Directives_AcgEffectTestDrawTextDirective);
	ss.registerClass(global, 'Client.Directives.AcgSpacesDirective', $Client_Directives_AcgSpacesDirective);
	ss.registerClass(global, 'Client.Directives.AcgTestDrawAreaDirective', $Client_Directives_AcgTestDrawAreaDirective);
	ss.registerClass(global, 'Client.Directives.AcgTestDrawCardDirective', $Client_Directives_AcgTestDrawCardDirective);
	ss.registerClass(global, 'Client.Directives.AcgTestDrawSpaceDirective', $Client_Directives_AcgTestDrawSpaceDirective);
	ss.registerClass(global, 'Client.Directives.AcgTestDrawTextDirective', $Client_Directives_AcgTestDrawTextDirective);
	ss.registerClass(global, 'Client.Directives.ChatBoxDirective', $Client_Directives_ChatBoxDirective);
	ss.registerClass(global, 'Client.Directives.DraggableDirective', $Client_Directives_DraggableDirective);
	ss.registerClass(global, 'Client.Directives.FancyListDirective', $Client_Directives_FancyListDirective);
	ss.registerClass(global, 'Client.Directives.FloatingWindowDirective', $Client_Directives_FloatingWindowDirective);
	ss.registerClass(global, 'Client.Directives.GridDirective', $Client_Directives_GridDirective);
	ss.registerClass(global, 'Client.Directives.PropertyDirective', $Client_Directives_PropertyDirective);
	ss.registerClass(global, 'Client.Libs.Extensions', $Client_Libs_Extensions);
	ss.registerClass(global, 'Client.Libs.ScriptLoader', $Client_Libs_ScriptLoader);
	ss.registerClass(global, 'Client.Libs.TimeTracker', $Client_Libs_TimeTracker);
	ss.registerClass(global, 'Client.Scope._KeepBaseScopeAlive', $Client_Scope__KeepBaseScopeAlive);
	ss.registerClass(global, 'Client.Scope.Controller.ActiveLobbyModel', $Client_Scope_Controller_ActiveLobbyModel);
	ss.registerClass(global, 'Client.Scope.Directive.FloatingWindowBaseScope', $Client_Scope_Directive_FloatingWindowBaseScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.ActiveLobbyScope', $Client_Scope_Controller_ActiveLobbyScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.CreateRoomModel', $Client_Scope_Controller_CreateRoomModel);
	ss.registerClass(global, 'Client.Scope.Controller.CreateRoomScope', $Client_Scope_Controller_CreateRoomScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.EffectTesterAreaModel', $Client_Scope_Controller_EffectTesterAreaModel);
	ss.registerClass(global, 'Client.Scope.Controller.EffectTesterCardModel', $Client_Scope_Controller_EffectTesterCardModel);
	ss.registerClass(global, 'Client.Scope.Controller.EffectTesterControllerScope', $Client_Scope_Controller_EffectTesterControllerScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.EffectTesterControllerScopeModel', $Client_Scope_Controller_EffectTesterControllerScopeModel);
	ss.registerClass(global, 'Client.Scope.Controller.EffectTesterSpaceModel', $Client_Scope_Controller_EffectTesterSpaceModel);
	ss.registerClass(global, 'Client.Scope.Controller.EffectTesterTextModel', $Client_Scope_Controller_EffectTesterTextModel);
	ss.registerClass(global, 'Client.Scope.Controller.GameCodeScope', $Client_Scope_Controller_GameCodeScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameCodeScopeModel', $Client_Scope_Controller_GameCodeScopeModel);
	ss.registerClass(global, 'Client.Scope.Controller.GameControllerScope', $Client_Scope_Controller_GameControllerScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameUpdater', $Client_Scope_Controller_GameUpdater);
	ss.registerClass(global, 'Client.Scope.Controller.GameEditorModel', $Client_Scope_Controller_GameEditorModel, $Client_Scope_Controller_GameUpdater);
	ss.registerClass(global, 'Client.Scope.Controller.GameEditorScope', $Client_Scope_Controller_GameEditorScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameEditorSelectionScopeModel', $Client_Scope_Controller_GameEditorSelectionScopeModel, $Client_Scope_Controller_GameUpdater);
	ss.registerClass(global, 'Client.Scope.Controller.GameEffectsEditorScope', $Client_Scope_Controller_GameEffectsEditorScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameEffectsEditorScopeModel', $Client_Scope_Controller_GameEffectsEditorScopeModel, $Client_Scope_Controller_GameUpdater);
	ss.registerClass(global, 'Client.Scope.Controller.GameLayoutEditorScope', $Client_Scope_Controller_GameLayoutEditorScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameLayoutEditorScopeModel', $Client_Scope_Controller_GameLayoutEditorScopeModel, $Client_Scope_Controller_GameUpdater);
	ss.registerClass(global, 'Client.Scope.Controller.GameManagerModel', $Client_Scope_Controller_GameManagerModel);
	ss.registerClass(global, 'Client.Scope.Controller.GameManagerScope', $Client_Scope_Controller_GameManagerScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameScenarioEditorScope', $Client_Scope_Controller_GameScenarioEditorScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.GameScenarioEditorScopeModel', $Client_Scope_Controller_GameScenarioEditorScopeModel, $Client_Scope_Controller_GameUpdater);
	ss.registerClass(global, 'Client.Scope.Controller.HomeModel', $Client_Scope_Controller_HomeModel);
	ss.registerClass(global, 'Client.Scope.Controller.HomeScope', $Client_Scope_Controller_HomeScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.LoginScope', $Client_Scope_Controller_LoginScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.LoginScopeModel', $Client_Scope_Controller_LoginScopeModel);
	ss.registerClass(global, 'Client.Scope.Controller.MessageModel', $Client_Scope_Controller_MessageModel);
	ss.registerClass(global, 'Client.Scope.Controller.MessageScope', $Client_Scope_Controller_MessageScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerEnum(global, 'Client.Scope.Controller.MessageType', $Client_Scope_Controller_MessageType);
	ss.registerClass(global, 'Client.Scope.Controller.MinimizeScope', $Client_Scope_Controller_MinimizeScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.QuestionScope', $Client_Scope_Controller_QuestionScope, $Client_Scope_Directive_FloatingWindowBaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.QuestionScopeModel', $Client_Scope_Controller_QuestionScopeModel);
	ss.registerEnum(global, 'Client.Scope.Controller.SelectedGameLayoutPiece', $Client_Scope_Controller_SelectedGameLayoutPiece);
	ss.registerEnum(global, 'Client.Scope.Controller.SelectedGameScenarioPiece', $Client_Scope_Controller_SelectedGameScenarioPiece);
	ss.registerClass(global, 'Client.Scope.Controller.TestGameControllerScope', $Client_Scope_Controller_TestGameControllerScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Controller.TestGameControllerScopeModel', $Client_Scope_Controller_TestGameControllerScopeModel);
	ss.registerEnum(global, 'Client.Scope.Controller.UpdateStatusType', $Client_Scope_Controller_UpdateStatusType);
	ss.registerClass(global, 'Client.Scope.Directive.AcgSpacesScope', $Client_Scope_Directive_AcgSpacesScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Directive.CardScope', $Client_Scope_Directive_CardScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Directive.EffectTestAreaScope', $Client_Scope_Directive_EffectTestAreaScope, $Client_Scope_Controller_EffectTesterControllerScope);
	ss.registerClass(global, 'Client.Scope.Directive.EffectTestSpaceScope', $Client_Scope_Directive_EffectTestSpaceScope, $Client_Scope_Controller_EffectTesterControllerScope);
	ss.registerClass(global, 'Client.Scope.Directive.EffectTestCardScope', $Client_Scope_Directive_EffectTestCardScope, $Client_Scope_Directive_EffectTestSpaceScope);
	ss.registerClass(global, 'Client.Scope.Directive.EffectTestTextScope', $Client_Scope_Directive_EffectTestTextScope, $Client_Scope_Controller_EffectTesterControllerScope);
	ss.registerEnum(global, 'Client.Scope.Directive.EffectTestType', $Client_Scope_Directive_EffectTestType);
	ss.registerClass(global, 'Client.Scope.Directive.FloatingWindowPosition', $Client_Scope_Directive_FloatingWindowPosition);
	ss.registerClass(global, 'Client.Scope.Directive.FloatingWindowScope', $Client_Scope_Directive_FloatingWindowScope, Client.Scope.BaseScope);
	ss.registerClass(global, 'Client.Scope.Directive.Size', $Client_Scope_Directive_Size);
	ss.registerClass(global, 'Client.Scope.Directive.SpaceScope', $Client_Scope_Directive_SpaceScope, Client.Scope.BaseScope);
	ss.registerEnum(global, 'Client.Scope.Directive.SwingDirection', $Client_Scope_Directive_SwingDirection);
	ss.registerClass(global, 'Client.Scope.Directive.TestAreaScope', $Client_Scope_Directive_TestAreaScope, $Client_Scope_Controller_TestGameControllerScope);
	ss.registerClass(global, 'Client.Scope.Directive.TestSpaceScope', $Client_Scope_Directive_TestSpaceScope, $Client_Scope_Controller_TestGameControllerScope);
	ss.registerClass(global, 'Client.Scope.Directive.TestCardScope', $Client_Scope_Directive_TestCardScope, $Client_Scope_Directive_TestSpaceScope);
	ss.registerClass(global, 'Client.Scope.Directive.TestTextScope', $Client_Scope_Directive_TestTextScope, $Client_Scope_Controller_TestGameControllerScope);
	ss.registerClass(global, 'Client.Services.ClientChatManagerService', $Client_Services_ClientChatManagerService);
	ss.registerClass(global, 'Client.Services.ClientDebugManagerService', $Client_Services_ClientDebugManagerService);
	ss.registerClass(global, 'Client.Services.ClientGameManagerService', $Client_Services_ClientGameManagerService);
	ss.registerClass(global, 'Client.Services.ClientSiteManagerService', $Client_Services_ClientSiteManagerService);
	ss.registerClass(global, 'Client.Services.CreateUIService', $Client_Services_CreateUIService);
	ss.registerClass(global, 'Client.Services.GameContentManager', $Client_Services_GameContentManager);
	ss.registerClass(global, 'Client.Services.GatewayService', $Client_Services_GatewayService);
	ss.registerClass(global, 'Client.Services.MessageService', $Client_Services_MessageService);
	ss.registerClass(global, 'Client.Services.UIManagerService', $Client_Services_UIManagerService);
	$Client_Directives_FloatingWindowDirective.$items = new (ss.makeGenericType(ss.Dictionary$2, [Object, $Client_Scope_Directive_FloatingWindowScope]))();
	$Client_BuildSite.instance = null;
})();

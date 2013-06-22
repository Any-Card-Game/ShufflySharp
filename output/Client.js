
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.ActiveLobbyController
	var $CardGameUI_Controllers_$ActiveLobbyController = function(scope, uiManager, clientSiteManagerService, clientChatManagerService, compile) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myClientChatManagerService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myClientChatManagerService = clientChatManagerService;
		this.$myScope.model = $CardGameUI_Scope_ActiveLobbyModel.$ctor();
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
			var theScope = this.$myScope;
			compile($('<div ng-include src="\'http://content.anycardgame.com/partials/gameUI.html\'"></div>'))(theScope).appendTo(window.document.body);
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
	$CardGameUI_Controllers_$ActiveLobbyController.prototype = {
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
		$populateChatRoom: function(roomData) {
			this.$myScope.model.users = roomData.users;
			ss.arrayAddRange(this.$myScope.model.chatLines, roomData.messages);
			this.$myScope.$apply();
		},
		$populateGameRoom: function(roomData) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.CreateRoomController
	var $CardGameUI_Controllers_$CreateRoomController = function(scope, uiManager) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myScope = scope;
		this.$myScope.visible = false;
		this.$myUIManager = uiManager;
		this.$myScope.model = $CardGameUI_Scope_CreateRoomModel.$ctor();
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
	$CardGameUI_Controllers_$CreateRoomController.prototype = {
		$createRoomFn: function() {
			this.$myScope.swingAway(2, false, null);
			this.$myUIManager.createRoom(this.$myScope.model.roomName);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.EffectEditorController
	var $CardGameUI_Controllers_$EffectEditorController = function(scope, editEffects) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		editEffects.popOpenEffect = ss.delegateCombine(editEffects.popOpenEffect, ss.mkdel(this, this.$popOpenEffectFn));
	};
	$CardGameUI_Controllers_$EffectEditorController.prototype = {
		$popOpenEffectFn: function(effect) {
			this.$myScope.effect = effect;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.HomeController
	var $CardGameUI_Controllers_$HomeController = function(scope, uiManager, clientSiteManagerService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientSiteManagerService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientSiteManagerService = clientSiteManagerService;
		this.$myScope.model = $CardGameUI_Scope_HomeModel.$ctor();
		this.$myUIManager.userLoggedIn = ss.delegateCombine(this.$myUIManager.userLoggedIn, ss.mkdel(this, this.$myUIManager_UserLoggedIn));
		this.$myScope.visible = false;
		scope.model.gameTypeSelected = ss.delegateCombine(scope.model.gameTypeSelected, ss.mkdel(this, this.$gameTypeSelectedFn));
		scope.model.roomSelected = ss.delegateCombine(scope.model.roomSelected, ss.mkdel(this, this.$roomSelectedFn));
		scope.model.createRoom = ss.delegateCombine(scope.model.createRoom, ss.mkdel(this, this.$createRoomFn));
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
	$CardGameUI_Controllers_$HomeController.prototype = {
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
				if (ss.referenceEquals(this.$myScope.model.rooms[i]._id, o.room._id)) {
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
		$populateRoom: function(roomData) {
			this.$myScope.model.selectedRoom = roomData;
			this.$myScope.$apply();
		},
		$myUIManager_UserLoggedIn: function() {
			this.$myScope.visible = true;
			this.$myScope.swingAway(6, true, null);
			this.$myScope.swingBack(null);
			this.$myScope.$apply();
			this.$myScope.model.user = this.$myUIManager.clientInfo.loggedInUser;
			this.$myClientSiteManagerService.getGameTypes();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.ListEffectsController
	var $CardGameUI_Controllers_$ListEffectsController = function(scope, editEffects, effectWatcher, effectManager) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myEffectWatcher = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		this.$myEffectWatcher = effectWatcher;
		scope.effects = effectManager.effects = [];
		var effectTypes = [];
		ss.add(effectTypes, 'bend');
		ss.add(effectTypes, 'highlight');
		ss.add(effectTypes, 'rotate');
		ss.add(effectTypes, 'styleProperty');
		scope.effectTypes = effectTypes;
		scope.selectedEffectType = 'bend';
		scope.newEffect = '';
		scope.addEffect = ss.mkdel(this, this.$addEffectFn);
		scope.effectClick = ss.mkdel(this, this.$effectClickFn);
		scope.enableEffect = ss.mkdel(this, this.$enableEffectFn);
		ss.add(this.$myScope.effects, $CardGameUI_Controllers_$ListEffectsController.$makeEffect('bend', 'bend'));
	};
	$CardGameUI_Controllers_$ListEffectsController.prototype = {
		$enableEffectFn: function(effect) {
			this.$myEffectWatcher.applyEffect(effect);
		},
		$addEffectFn: function() {
			ss.add(this.$myScope.effects, $CardGameUI_Controllers_$ListEffectsController.$makeEffect(this.$myScope.newEffect, this.$myScope.selectedEffectType));
			this.$myScope.selectedEffectType = 'bend';
			this.$myScope.newEffect = '';
		},
		$effectClickFn: function(effect) {
			this.$myEditEffects.popOpenEffect(effect);
		}
	};
	$CardGameUI_Controllers_$ListEffectsController.$makeEffect = function(effectName, type) {
		var $t1 = new $CardGameUI_Util_Effect();
		$t1.name = effectName;
		var effect = $t1;
		effect.type = type;
		switch (effect.type) {
			case 'highlight': {
				var $t3 = effect.properties;
				var $t2 = $CardGameUI_Util_EffectProperty.$ctor();
				$t2.name = 'Radius';
				$t2.value = 5;
				$t2.type = 'number';
				ss.add($t3, $t2);
				var $t5 = effect.properties;
				var $t4 = $CardGameUI_Util_EffectProperty.$ctor();
				$t4.name = 'Color';
				$t4.value = '#242444';
				$t4.type = 'color';
				ss.add($t5, $t4);
				var $t7 = effect.properties;
				var $t6 = $CardGameUI_Util_EffectProperty.$ctor();
				$t6.name = 'Opacity';
				$t6.value = 0.5;
				$t6.type = 'number';
				ss.add($t7, $t6);
				var $t9 = effect.properties;
				var $t8 = $CardGameUI_Util_EffectProperty.$ctor();
				$t8.name = 'Rotate';
				$t8.value = 0;
				$t8.type = 'number';
				ss.add($t9, $t8);
				var $t11 = effect.properties;
				var $t10 = $CardGameUI_Util_EffectProperty.$ctor();
				$t10.name = 'OffsetX';
				$t10.value = 0;
				$t10.type = 'number';
				ss.add($t11, $t10);
				var $t13 = effect.properties;
				var $t12 = $CardGameUI_Util_EffectProperty.$ctor();
				$t12.name = 'OffsetY';
				$t12.value = 0;
				$t12.type = 'number';
				ss.add($t13, $t12);
				break;
			}
			case 'rotate': {
				var $t15 = effect.properties;
				var $t14 = $CardGameUI_Util_EffectProperty.$ctor();
				$t14.name = 'Degrees';
				$t14.value = 90;
				$t14.type = 'number';
				ss.add($t15, $t14);
				break;
			}
			case 'bend': {
				var $t17 = effect.properties;
				var $t16 = $CardGameUI_Util_EffectProperty.$ctor();
				$t16.name = 'Degrees';
				$t16.value = 15;
				$t16.type = 'number';
				ss.add($t17, $t16);
				break;
			}
			case 'styleProperty': {
				var $t19 = effect.properties;
				var $t18 = $CardGameUI_Util_EffectProperty.$ctor();
				$t18.name = 'Property Name';
				$t18.value = 'background-color';
				$t18.type = 'text';
				ss.add($t19, $t18);
				var $t21 = effect.properties;
				var $t20 = $CardGameUI_Util_EffectProperty.$ctor();
				$t20.name = 'Property Value';
				$t20.value = 'red';
				$t20.type = 'text';
				ss.add($t21, $t20);
				break;
			}
			case 'animated': {
				var $t23 = effect.properties;
				var $t22 = $CardGameUI_Util_EffectProperty.$ctor();
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
	// CardGameUI.Controllers.LoginController
	var $CardGameUI_Controllers_$LoginController = function(scope, uiManager, clientSiteManagerService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myclientSiteManagerService = null;
		this.$myScope = scope;
		this.$myScope.visible = true;
		this.$myUIManager = uiManager;
		this.$myclientSiteManagerService = clientSiteManagerService;
		this.$myScope.model = $CardGameUI_Scope_LoginModel.$ctor();
		this.$myScope.model.windowClosed = function() {
			window.alert('woooo');
		};
		this.$myScope.model.loginAccount = ss.mkdel(this, this.$loginAccountFn);
		this.$myScope.model.createAccount = ss.mkdel(this, this.$createAccountFn);
		this.$myclientSiteManagerService.add_onLogin(ss.mkdel(this, function(user, data) {
			uiManager.clientInfo.loggedInUser = user;
			this.$myUIManager.userLoggedIn();
			scope.swingAway(7, false, null);
		}));
	};
	$CardGameUI_Controllers_$LoginController.prototype = {
		$createAccountFn: function() {
			window.alert('Created! hahahJK');
		},
		$loginAccountFn: function() {
			this.$myclientSiteManagerService.login(this.$myScope.model.username, this.$myScope.model.password);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.MinimizeController
	var $CardGameUI_Controllers_$MinimizeController = function(scope, uiManager) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		scope.items = [];
		uiManager.set_onMinimize(function(floatingWindowBaseScope) {
			ss.add(scope.items, floatingWindowBaseScope);
		});
		scope.open = ss.mkdel(this, this.$openFn);
		scope.remove = ss.mkdel(this, this.$removeFn);
	};
	$CardGameUI_Controllers_$MinimizeController.prototype = {
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
	// CardGameUI.Controllers.QuestionController
	var $CardGameUI_Controllers_$QuestionController = function(scope, uiManager, clientGameManagerService) {
		this.$myScope = null;
		this.$myUIManager = null;
		this.$myClientGameManagerService = null;
		this.$myScope = scope;
		this.$myUIManager = uiManager;
		this.$myClientGameManagerService = clientGameManagerService;
		this.$myScope.model = $CardGameUI_Scope_QuestionModel.$ctor();
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
	$CardGameUI_Controllers_$QuestionController.prototype = {
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
	// CardGameUI.Controllers.GameController
	var $CardGameUI_Controllers_GameController = function(scope, effectWatcher, clientGameManagerService, gameContentManager, effectManager) {
		this.$scope = null;
		this.$myEffectWatcher = null;
		this.$myClientGameManagerService = null;
		this.$myGameContentManager = null;
		this.$myEffectManager = null;
		this.$scope = scope;
		this.$myEffectWatcher = effectWatcher;
		this.$myClientGameManagerService = clientGameManagerService;
		this.$myGameContentManager = gameContentManager;
		this.$myEffectManager = effectManager;
		effectManager.effects = [];
		ss.add(effectManager.effects, $CardGameUI_Controllers_$ListEffectsController.$makeEffect('bend', 'bend'));
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
			var create = false;
			if (ss.isNullOrUndefined(scope.mainArea)) {
				create = true;
			}
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
		this.$myClientGameManagerService.add_onGameStarted(function(user1, room) {
			//alert(JSON.stringify(data));
		});
		this.$myClientGameManagerService.add_onGameOver(function(user2, room1) {
			//alert(JSON.stringify(data));
		});
		scope.mainArea = null;
		scope.selectedCard = null;
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
		effectWatcher.applyEffect = ss.delegateCombine(effectWatcher.applyEffect, function(effect) {
			if (ss.isNullOrUndefined(scope.selectedCard)) {
				return;
			}
			ss.add(scope.selectedCard.appearance.effectNames, effect.name);
		});
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.AcgDrawCardDirective
	var $CardGameUI_Directives_AcgDrawCardDirective = function(effectManager) {
		this.$myEffectManager = null;
		this.link = null;
		this.$myEffectManager = effectManager;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('style', 'width:71px; height:96px;');
			element.attr('class', 'card ' + ss.formatString('card{0}-{1}', scope.card.type, scope.card.value));
			scope.$watch('$parent.$parent.selectedCard', function() {
				if (ss.isNullOrUndefined(scope.$parent.$parent.selectedCard) || !ss.referenceEquals(scope.$parent.$parent.selectedCard, scope.card)) {
					scope.cardStyle.border = undefined;
				}
				else {
					scope.cardStyle.border = 'solid 4px green';
				}
			});
			scope.cardClick = function() {
				if (ss.referenceEquals(scope.$parent.$parent.selectedCard, scope.card)) {
					scope.$parent.$parent.selectedCard = null;
				}
				else {
					scope.$parent.$parent.selectedCard = scope.card;
				}
			};
			var redrawCard = ss.mkdel(this, function() {
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
				for (var $t1 = 0; $t1 < scope.card.appearance.effectNames.length; $t1++) {
					var effect = scope.card.appearance.effectNames[$t1];
					var grabbedEffect = this.$myEffectManager.getEffectByName(effect);
					if (ss.isNullOrUndefined(grabbedEffect)) {
						continue;
					}
					switch (grabbedEffect.type) {
						case 'highlight': {
							var $t2 = global.CardGameEffectHighlightOptions.$ctor();
							$t2.color = grabbedEffect.getPropertyByName(String).call(grabbedEffect, 'color');
							$t2.radius = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'radius');
							$t2.rotate = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'rotate');
							$t2.offsetX = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'offsetx');
							$t2.offsetY = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'offsety');
							$t2.opacity = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'opacity');
							var _effect = new global.Effect$Highlight($t2);
							var beforeStyle = {};
							beforeStyle['display'] = 'block';
							beforeStyle['position'] = 'relative';
							beforeStyle['z-index'] = '-1';
							beforeStyle['width'] = '100%';
							beforeStyle['height'] = '100%';
							beforeStyle['left'] = -_effect.radius + _effect.offsetX + 'px';
							beforeStyle['top'] = -_effect.radius + _effect.offsetY + 'px';
							beforeStyle['padding'] = _effect.radius + 'px';
							beforeStyle['border-radius'] = '5px';
							beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
							var color = $CardGameUI_Directives_AcgDrawCardDirective.hextorgb(_effect.color);
							beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', color.R, color.G, color.B, _effect.opacity);
							beforeStyle['border'] = '2px solid black';
							$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', beforeStyle);
							break;
						}
						case 'rotate': {
							break;
						}
						case 'bend': {
							var $t3 = global.CardGameEffectBendOptions.$ctor();
							$t3.degrees = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'degrees');
							var bEffect = new global.Effect$Bend($t3);
							var rotate = ss.replaceAllString(element.css('transform'), ' scale(1, 1)', '');
							element.rotate(-bEffect.degrees / 2 + bEffect.degrees / (scope.space.pile.cards.length - 1) * cardIndex + $CardGameUI_Directives_AcgDrawCardDirective.noTransformRotate(rotate));
							break;
						}
						case 'styleProperty': {
							break;
						}
						case 'animated': {
							break;
						}
					}
				}
			});
			var keys = {};
			keys['content'] = 'url(\'http://content.anycardgame.com/assets/cards/' + (100 + (scope.card.value + 1) + scope.card.type * 13) + '.gif\')';
			$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
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
	$CardGameUI_Directives_AcgDrawCardDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.noTransformRotate = function(ar) {
		if (ar === '') {
			return 0;
		}
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS = function(myClass, values) {
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
	// CardGameUI.Directives.AcgDrawSpaceDirective
	var $CardGameUI_Directives_AcgDrawSpaceDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_AcgDrawSpaceDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var scale = scope.$parent['$parent'].scale;
			element.attr('class', 'space ' + ss.formatString('space{0}', scope.space.name));
			element.resizable({
				grid: [scale.x, scale.y],
				minHeight: -1,
				minWidth: -1,
				handles: 'n, e, s, w,nw,sw,ne,se',
				resize: function(ev, ele) {
					scope.space.width = ele.size.width / scale.x;
					scope.space.height = ele.size.height / scale.y;
					scope.$apply();
				}
			});
			element.draggable({
				cursor: 'crosshair',
				grid: [scale.x, scale.y],
				drag: function(ev1, ele1) {
					scope.space.x = ele1.position.left / scale.x;
					scope.space.y = ele1.position.top / scale.y;
					scope.$apply();
				}
			});
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
			$CardGameUI_Directives_AcgDrawSpaceDirective.$changeCSS('space' + scope.space.name + '::before', beforeStyle);
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
		}
	};
	$CardGameUI_Directives_AcgDrawSpaceDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$CardGameUI_Directives_AcgDrawSpaceDirective.$changeCSS = function(myClass, values) {
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
	// CardGameUI.Directives.AcgSpacesDirective
	var $CardGameUI_Directives_AcgSpacesDirective = function(compile, gameContentManager) {
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
		this.template = '\r\n    <div  >\r\n        \r\n    </div>';
		this.replace = true;
		this.transclude = false;
		this.scope = { spaces: '=acgSpaces' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_AcgSpacesDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var updater = ss.mkdel(this, function() {
				element.children().each(function(ind, e) {
					angular.element(e).scope().$destroy();
				});
				element.empty();
				var content = '<div>\r\n    <div acg-draw-space ng-style=\'spaceStyle\'>\r\n        <div ng-repeat=\'card in space.pile.cards\' acg-draw-card ng-style=\'cardStyle\' ng-click=\'cardClick()\'>\r\n        </div>\r\n    </div> \r\n</';
				angular.forEach(scope.spaces, ss.mkdel(this, function(space) {
					var e1 = angular.element(content);
					var _scope = scope['$new']();
					_scope.space = space;
					var elk = this.$myCompile(e1.contents())(_scope);
					element.append(elk);
				}));
			});
			//scope["$watch"]("spaces",updater);
			this.$myGameContentManager.redraw = ss.delegateCombine(this.$myGameContentManager.redraw, function() {
				console.log('updatinggagaga');
				updater();
				scope['$apply']();
			});
			updater();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.ChatBoxDirective
	var $CardGameUI_Directives_ChatBoxDirective = function() {
		this.link = null;
		this.templateUrl = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.restrict = 'EA';
		this.templateUrl = 'http://content.anycardgame.com/partials/chatBox.html';
		this.replace = true;
		this.scope = { contents: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_ChatBoxDirective.prototype = {
		$linkFn: function(scope, element, attr) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.DraggableDirective
	var $CardGameUI_Directives_DraggableDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_DraggableDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.draggable({ cancel: '.floating-window-inner' });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.FancyListDirective
	var $CardGameUI_Directives_FancyListDirective = function() {
		this.link = null;
		this.templateUrl = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.restrict = 'EA';
		this.templateUrl = 'http://content.anycardgame.com/partials/fancyList.html';
		this.replace = true;
		this.transclude = true;
		this.scope = { items: '=', bind: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_FancyListDirective.prototype = {
		$linkFn: function(scope, element, attr) {
			scope.itemClick = function(item) {
				scope.bind = item;
			};
			scope.currentStyle = function(item1) {
				return { backgroundColor: (ss.referenceEquals(item1, scope.bind) ? 'blue' : 'white') };
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.FloatingWindowDirective
	var $CardGameUI_Directives_FloatingWindowDirective = function(uiManagerService) {
		this.$myUIManagerService = null;
		this.link = null;
		this.templateUrl = null;
		this.restrict = null;
		this.replace = false;
		this.transclude = false;
		this.scope = null;
		this.$myUIManagerService = uiManagerService;
		this.restrict = 'EA';
		this.templateUrl = 'http://content.anycardgame.com/partials/floatingWindow.html';
		this.replace = true;
		this.transclude = true;
		this.scope = { width: '=', height: '=', left: '=', top: '=', title: '=', visible: '=', onclose: '&' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_FloatingWindowDirective.prototype = {
		swingBack: function(scope, element, callback) {
			var js = {};
			js['left'] = scope.left;
			js['top'] = scope.top;
			element.animate(js, 'fast', 'swing', callback);
		},
		swingAway: function(direction, simulate, element, callback) {
			var js = {};
			var distance = '2000';
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
		},
		$linkFn: function(scope, element, attr) {
			scope.$parent.swingAway = ss.mkdel(this, function(a, b, c) {
				this.swingAway(a, b, element, c);
			});
			scope.$parent.swingBack = ss.mkdel(this, function(c1) {
				this.swingBack(scope, element, c1);
			});
			var $t1 = $CardGameUI_Directives_FloatingWindowPosition.$ctor();
			$t1.left = scope.left;
			$t1.top = scope.top;
			$t1.display = 'block';
			scope.positionStyles = $t1;
			var $t2 = $CardGameUI_Directives_Size.$ctor();
			$t2.width = scope.width;
			$t2.height = scope.height;
			scope.sizeStyle = $t2;
			scope.maximize = function() {
				if (!scope.isMaximized) {
					scope.lastPositionStyles = scope.positionStyles;
					scope.lastSizeStyle = scope.sizeStyle;
					var $t3 = $CardGameUI_Directives_FloatingWindowPosition.$ctor();
					$t3.left = 0;
					$t3.top = 0;
					$t3.display = 'block';
					scope.positionStyles = $t3;
					var $t4 = $CardGameUI_Directives_Size.$ctor();
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
				scope.positionStyles.display = 'none';
			};
			scope.minimize = ss.mkdel(this, function() {
				this.$myUIManagerService.get_onMinimize()(scope);
				scope.positionStyles.display = 'none';
			});
			scope.restore = function() {
				scope.positionStyles.display = 'block';
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.FloatingWindowPosition
	var $CardGameUI_Directives_FloatingWindowPosition = function() {
	};
	$CardGameUI_Directives_FloatingWindowPosition.createInstance = function() {
		return $CardGameUI_Directives_FloatingWindowPosition.$ctor();
	};
	$CardGameUI_Directives_FloatingWindowPosition.$ctor = function() {
		var $this = $CardGameUI_Directives_Position.$ctor();
		$this.display = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.FloatingWindowScope
	var $CardGameUI_Directives_FloatingWindowScope = function() {
	};
	$CardGameUI_Directives_FloatingWindowScope.createInstance = function() {
		return $CardGameUI_Directives_FloatingWindowScope.$ctor();
	};
	$CardGameUI_Directives_FloatingWindowScope.$ctor = function() {
		var $this = {};
		$this.$parent = null;
		$this.visible = false;
		$this.width = null;
		$this.height = null;
		$this.left = null;
		$this.top = null;
		$this.sizeStyle = null;
		$this.lastSizeStyle = null;
		$this.positionStyles = null;
		$this.lastPositionStyles = null;
		$this.title = null;
		$this.onclose = null;
		$this.close = null;
		$this.minimize = null;
		$this.maximize = null;
		$this.restore = null;
		$this.isMaximized = false;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.Position
	var $CardGameUI_Directives_Position = function() {
	};
	$CardGameUI_Directives_Position.createInstance = function() {
		return $CardGameUI_Directives_Position.$ctor();
	};
	$CardGameUI_Directives_Position.$ctor = function() {
		var $this = {};
		$this.left = null;
		$this.top = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.PropertyDirective
	var $CardGameUI_Directives_PropertyDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_PropertyDirective.prototype = {
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
	// CardGameUI.Directives.Size
	var $CardGameUI_Directives_Size = function() {
	};
	$CardGameUI_Directives_Size.createInstance = function() {
		return $CardGameUI_Directives_Size.$ctor();
	};
	$CardGameUI_Directives_Size.$ctor = function() {
		var $this = {};
		$this.width = null;
		$this.height = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope._KeepBaseScopeAlive
	var $CardGameUI_Scope__KeepBaseScopeAlive = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.ActiveLobbyModel
	var $CardGameUI_Scope_ActiveLobbyModel = function() {
	};
	$CardGameUI_Scope_ActiveLobbyModel.createInstance = function() {
		return $CardGameUI_Scope_ActiveLobbyModel.$ctor();
	};
	$CardGameUI_Scope_ActiveLobbyModel.$ctor = function() {
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
	// CardGameUI.Scope.ActiveLobbyScope
	var $CardGameUI_Scope_ActiveLobbyScope = function() {
		this.model = null;
		$CardGameUI_Scope_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.CardScope
	var $CardGameUI_Scope_CardScope = function() {
		this.card = null;
		this.cardStyle = null;
		this.cardClick = null;
		this.space = null;
		this.$parent = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.CreateRoomModel
	var $CardGameUI_Scope_CreateRoomModel = function() {
	};
	$CardGameUI_Scope_CreateRoomModel.createInstance = function() {
		return $CardGameUI_Scope_CreateRoomModel.$ctor();
	};
	$CardGameUI_Scope_CreateRoomModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.roomName = null;
		$this.createRoom = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.CreateRoomScope
	var $CardGameUI_Scope_CreateRoomScope = function() {
		this.model = null;
		$CardGameUI_Scope_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.EffectEditorScope
	var $CardGameUI_Scope_EffectEditorScope = function() {
		this.effect = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.FloatingWindowBaseScope
	var $CardGameUI_Scope_FloatingWindowBaseScope = function() {
		this.swingAway = null;
		this.swingBack = null;
		this.visible = false;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.GameCtrlScope
	var $CardGameUI_Scope_GameCtrlScope = function() {
		this.mainArea = null;
		this.scale = null;
		this.moveCard = null;
		this.animateCard = null;
		this.selectedCard = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.HomeModel
	var $CardGameUI_Scope_HomeModel = function() {
	};
	$CardGameUI_Scope_HomeModel.createInstance = function() {
		return $CardGameUI_Scope_HomeModel.$ctor();
	};
	$CardGameUI_Scope_HomeModel.$ctor = function() {
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
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.HomeScope
	var $CardGameUI_Scope_HomeScope = function() {
		this.model = null;
		$CardGameUI_Scope_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.ListEffectsScope
	var $CardGameUI_Scope_ListEffectsScope = function() {
		this.newEffect = null;
		this.addEffect = null;
		this.effects = null;
		this.effectTypes = null;
		this.selectedEffectType = 0;
		this.effectClick = null;
		this.enableEffect = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.LoginModel
	var $CardGameUI_Scope_LoginModel = function() {
	};
	$CardGameUI_Scope_LoginModel.createInstance = function() {
		return $CardGameUI_Scope_LoginModel.$ctor();
	};
	$CardGameUI_Scope_LoginModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.username = null;
		$this.password = null;
		$this.createAccount = null;
		$this.loginAccount = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.LoginScope
	var $CardGameUI_Scope_LoginScope = function() {
		this.model = null;
		$CardGameUI_Scope_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.MinimizeScope
	var $CardGameUI_Scope_MinimizeScope = function() {
		this.items = null;
		this.open = null;
		this.remove = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.QuestionModel
	var $CardGameUI_Scope_QuestionModel = function() {
	};
	$CardGameUI_Scope_QuestionModel.createInstance = function() {
		return $CardGameUI_Scope_QuestionModel.$ctor();
	};
	$CardGameUI_Scope_QuestionModel.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.question = null;
		$this.answers = null;
		$this.selectedAnswer = null;
		$this.answerQuestion = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.QuestionScope
	var $CardGameUI_Scope_QuestionScope = function() {
		this.model = null;
		$CardGameUI_Scope_FloatingWindowBaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.SpaceScope
	var $CardGameUI_Scope_SpaceScope = function() {
		this.space = null;
		this.$parent = null;
		this.spaceStyle = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.EditEffectService
	var $CardGameUI_Services_$EditEffectService = function() {
		this.popOpenEffect = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.ClientChatManagerService
	var $CardGameUI_Services_ClientChatManagerService = function(gateway) {
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
	$CardGameUI_Services_ClientChatManagerService.prototype = {
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
	// CardGameUI.Services.ClientDebugManagerService
	var $CardGameUI_Services_ClientDebugManagerService = function(gateway) {
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
	$CardGameUI_Services_ClientDebugManagerService.prototype = {
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
	// CardGameUI.Services.ClientGameManagerService
	var $CardGameUI_Services_ClientGameManagerService = function(gateway) {
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
	$CardGameUI_Services_ClientGameManagerService.prototype = {
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
	// CardGameUI.Services.ClientSiteManagerService
	var $CardGameUI_Services_ClientSiteManagerService = function(gateway) {
		this.$1$OnGetGameTypesReceivedField = null;
		this.$1$OnLoginField = null;
		this.$1$OnGetRoomsReceivedField = null;
		this.$1$OnRoomJoinedField = null;
		this.$1$OnGetRoomInfoReceivedField = null;
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
		this.$clientSiteManager.add_onGetRoomsReceived(ss.mkdel(this, function(user2, model2) {
			if (!ss.staticEquals(this.$1$OnGetRoomsReceivedField, null)) {
				this.$1$OnGetRoomsReceivedField(user2, model2);
			}
		}));
		this.$clientSiteManager.add_onRoomJoined(ss.mkdel(this, function(user3, model3) {
			if (!ss.staticEquals(this.$1$OnRoomJoinedField, null)) {
				this.$1$OnRoomJoinedField(user3, model3);
			}
		}));
		this.$clientSiteManager.add_onGetRoomInfoReceived(ss.mkdel(this, function(user4, model4) {
			if (!ss.staticEquals(this.$1$OnGetRoomInfoReceivedField, null)) {
				this.$1$OnGetRoomInfoReceivedField(user4, model4);
			}
		}));
	};
	$CardGameUI_Services_ClientSiteManagerService.prototype = {
		add_onGetGameTypesReceived: function(value) {
			this.$1$OnGetGameTypesReceivedField = ss.delegateCombine(this.$1$OnGetGameTypesReceivedField, value);
		},
		remove_onGetGameTypesReceived: function(value) {
			this.$1$OnGetGameTypesReceivedField = ss.delegateRemove(this.$1$OnGetGameTypesReceivedField, value);
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
		login: function(userName, password) {
			this.$clientSiteManager.login(userName, password);
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
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.EffectManagerService
	var $CardGameUI_Services_EffectManagerService = function() {
		this.effects = null;
		this.effects = [];
	};
	$CardGameUI_Services_EffectManagerService.prototype = {
		getEffectByName: function(effect) {
			for (var $t1 = 0; $t1 < this.effects.length; $t1++) {
				var eff = this.effects[$t1];
				if (ss.referenceEquals(eff.name.toLowerCase(), effect.toLowerCase())) {
					return eff;
				}
			}
			return null;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.EffectWatcherService
	var $CardGameUI_Services_EffectWatcherService = function() {
		this.applyEffect = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.GameContentManager
	var $CardGameUI_Services_GameContentManager = function() {
		this.redraw = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.GatewayService
	var $CardGameUI_Services_GatewayService = function(serverUrl) {
		this.$1$GatewayField = null;
		this.set_gateway(new ClientLibs.Gateway(serverUrl, false));
	};
	$CardGameUI_Services_GatewayService.prototype = {
		get_gateway: function() {
			return this.$1$GatewayField;
		},
		set_gateway: function(value) {
			this.$1$GatewayField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.UIManagerService
	var $CardGameUI_Services_UIManagerService = function(clientGameManagerService) {
		this.userLoggedIn = null;
		this.createRoom = null;
		this.openCreateRoomDialog = null;
		this.onRoomJoined = null;
		this.roomLeft = null;
		this.clientInfo = null;
		this.$1$OnMinimizeField = null;
		this.clientInfo = $Client_ClientInformation.$ctor();
		//            this.GameManager = new GameManager(clientGameManagerService,this);
	};
	$CardGameUI_Services_UIManagerService.prototype = {
		get_onMinimize: function() {
			return this.$1$OnMinimizeField;
		},
		set_onMinimize: function(value) {
			this.$1$OnMinimizeField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.Effect
	var $CardGameUI_Util_Effect = function() {
		this.name = null;
		this.type = 0;
		this.properties = null;
		this.properties = [];
	};
	$CardGameUI_Util_Effect.prototype = {
		getPropertyByName: function(T) {
			return function(name) {
				for (var $t1 = 0; $t1 < this.properties.length; $t1++) {
					var effectProperty = this.properties[$t1];
					if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
						return effectProperty.value;
					}
				}
				return ss.getDefaultValue(T);
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectProperty
	var $CardGameUI_Util_EffectProperty = function() {
	};
	$CardGameUI_Util_EffectProperty.createInstance = function() {
		return $CardGameUI_Util_EffectProperty.$ctor();
	};
	$CardGameUI_Util_EffectProperty.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.value = null;
		$this.type = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectPropertyType
	var $CardGameUI_Util_EffectPropertyType = function() {
	};
	$CardGameUI_Util_EffectPropertyType.prototype = { text: 'text', number: 'number', color: 'color' };
	ss.registerEnum(global, 'CardGameUI.Util.EffectPropertyType', $CardGameUI_Util_EffectPropertyType, false);
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectType2
	var $CardGameUI_Util_EffectType2 = function() {
	};
	$CardGameUI_Util_EffectType2.prototype = { highlight: 'highlight', rotate: 'rotate', bend: 'bend', styleProperty: 'styleProperty', animated: 'animated' };
	ss.registerEnum(global, 'CardGameUI.Util.EffectType2', $CardGameUI_Util_EffectType2, false);
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.Extensions
	var $CardGameUI_Util_Extensions = function() {
	};
	$CardGameUI_Util_Extensions.randomElement = function(T) {
		return function(arr) {
			return arr[ss.Int32.trunc(Math.floor(Math.random() * arr.length))];
		};
	};
	$CardGameUI_Util_Extensions.fuckingClone = function(elem) {
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
	// Client.BuildAngular
	var $Client_BuildAngular = function() {
	};
	$Client_BuildAngular.setup = function(gatewayServer) {
		angular.module('acg', ['ui.utils']).config(['$routeProvider', $Client_BuildAngular.$buildRouteProvider]).config(['$httpProvider', $Client_BuildAngular.$buildHttpProvider]).value('gatewayServerURL', gatewayServer).controller('MinimizeController', ['$scope', 'UIManager', function(scope, uiManager) {
			return new $CardGameUI_Controllers_$MinimizeController(scope, uiManager);
		}]).controller('GameController', ['$scope', 'effectWatcher', 'clientGameManager', 'gameContentManager', 'effectManager', function(scope1, effectWatcher, clientGameManagerService, gameContentManager, effectManager) {
			return new $CardGameUI_Controllers_GameController(scope1, effectWatcher, clientGameManagerService, gameContentManager, effectManager);
		}]).controller('ListEffectsController', ['$scope', 'editEffects', 'effectWatcher', 'effectManager', function(scope2, editEffects, effectWatcher1, effectmanager) {
			return new $CardGameUI_Controllers_$ListEffectsController(scope2, editEffects, effectWatcher1, effectmanager);
		}]).controller('EffectEditorController', ['$scope', 'editEffects', function(scope3, editEffects1) {
			return new $CardGameUI_Controllers_$EffectEditorController(scope3, editEffects1);
		}]).controller('LoginController', ['$scope', 'UIManager', 'clientSiteManager', function(scope4, uiManager1, clientSiteManagerService) {
			return new $CardGameUI_Controllers_$LoginController(scope4, uiManager1, clientSiteManagerService);
		}]).controller('QuestionController', ['$scope', 'UIManager', 'clientGameManager', function(scope5, uiManager2, clientGameManagerService1) {
			return new $CardGameUI_Controllers_$QuestionController(scope5, uiManager2, clientGameManagerService1);
		}]).controller('HomeController', ['$scope', 'UIManager', 'clientSiteManager', function(scope6, uiManager3, clientSiteManagerService1) {
			return new $CardGameUI_Controllers_$HomeController(scope6, uiManager3, clientSiteManagerService1);
		}]).controller('ActiveLobbyController', ['$scope', 'UIManager', 'clientSiteManager', 'clientChatManager', '$compile', function(scope7, uiManager4, clientSiteManagerService2, clientChatManagerService, compile) {
			return new $CardGameUI_Controllers_$ActiveLobbyController(scope7, uiManager4, clientSiteManagerService2, clientChatManagerService, compile);
		}]).controller('CreateRoomController', ['$scope', 'UIManager', function(scope8, uiManager5) {
			return new $CardGameUI_Controllers_$CreateRoomController(scope8, uiManager5);
		}]).service('UIManager', ['clientGameManager', function(clientGameManagerService2) {
			return new $CardGameUI_Services_UIManagerService(clientGameManagerService2);
		}]).service('editEffects', [function() {
			return new $CardGameUI_Services_$EditEffectService();
		}]).service('effectWatcher', [function() {
			return new $CardGameUI_Services_EffectWatcherService();
		}]).service('effectManager', [function() {
			return new $CardGameUI_Services_EffectManagerService();
		}]).service('clientChatManager', ['gateway', function(gatewayService) {
			return new $CardGameUI_Services_ClientChatManagerService(gatewayService);
		}]).service('clientGameManager', ['gateway', function(gatewayService1) {
			return new $CardGameUI_Services_ClientGameManagerService(gatewayService1);
		}]).service('clientDebugManager', ['gateway', function(gatewayService2) {
			return new $CardGameUI_Services_ClientDebugManagerService(gatewayService2);
		}]).service('clientSiteManager', ['gateway', function(gatewayService3) {
			return new $CardGameUI_Services_ClientSiteManagerService(gatewayService3);
		}]).service('gateway', ['gatewayServerURL', function(serverUrl) {
			return new $CardGameUI_Services_GatewayService(serverUrl);
		}]).service('gameContentManager', [function() {
			return new $CardGameUI_Services_GameContentManager();
		}]).directive('draggable', [function() {
			return new $CardGameUI_Directives_DraggableDirective();
		}]).directive('floatingWindow', ['UIManager', function(uiManagerService) {
			return new $CardGameUI_Directives_FloatingWindowDirective(uiManagerService);
		}]).directive('fancyList', [function() {
			return new $CardGameUI_Directives_FancyListDirective();
		}]).directive('chatBox', [function() {
			return new $CardGameUI_Directives_ChatBoxDirective();
		}]).directive('property', [function() {
			return new $CardGameUI_Directives_PropertyDirective();
		}]).directive('acgDrawCard', ['effectManager', function(effectManager1) {
			return new $CardGameUI_Directives_AcgDrawCardDirective(effectManager1);
		}]).directive('acgDrawSpace', [function() {
			return new $CardGameUI_Directives_AcgDrawSpaceDirective();
		}]).directive('acgSpaces', ['$compile', 'gameContentManager', function(compile1, gameContentManager1) {
			return new $CardGameUI_Directives_AcgSpacesDirective(compile1, gameContentManager1);
		}]);
	};
	$Client_BuildAngular.$buildRouteProvider = function(provider) {
		// provider.When("/gameUI", new Route() {Controller = "GameController", TemplateURL = "http://content.anycardgame.com/partials/gameUI.html"}).Otherwise(new OtherwiseRoute() {RedirectTo = "/gameUI"});
	};
	$Client_BuildAngular.$buildHttpProvider = function(httpProvider) {
		httpProvider.defaults.useXDomain = true;
		delete httpProvider.defaults.headers.common['X-Requested-With'];
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.BuildSite
	var $Client_BuildSite = function(gatewayServerAddress) {
		this.$gatewayServerAddress = null;
		this.shuffUIManager = null;
		$Client_BuildSite.instance = this;
		this.$gatewayServerAddress = gatewayServerAddress;
		$Client_BuildSite.$loadJunk(CommonLibraries.IPs.webIP, ss.mkdel(this, this.$ready));
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
			scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], false, stepThree);
		};
		scriptLoader.load([url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/lib/codemirror.js'], false, stepTwo);
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
		this.gameManager = null;
		this.clientInfo = null;
		this.$shuffUIManager = new WebLibraries.ShuffUI.ShuffUI.ShuffUIManager();
		this.timeTracker = $Client_Libs_TimeTracker.$ctor();
		var gateway = new ClientLibs.Gateway(gatewayServerAddress, false);
		this.clientGameManager = new ClientLibs.Managers.ClientGameManager(gateway);
		this.clientSiteManager = new ClientLibs.Managers.ClientSiteManager(gateway);
		this.clientDebugManager = new ClientLibs.Managers.ClientDebugManager(gateway);
		this.clientChatManager = new ClientLibs.Managers.ClientChatManager(gateway);
		this.clientInfo = $Client_ClientInformation.$ctor();
		//            LoginUI = new LoginUI(shuffUIManager, this);
		//            HomeUI = new HomeUI(shuffUIManager, this); 
		//            QuestionUI = new QuestionUI(shuffUIManager, this);
		//gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
		//gateway.On("Area.Lobby.ListRooms.Response", (data) => { Logger.Log });
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
	// Client.ShufflyGame.GameManager
	var $Client_ShufflyGame_GameManager = function(clientGameManagerService, uiManagerService) {
		this.$myClientGameManagerService = null;
		this.$myUIManagerService = null;
		this.$myClientGameManagerService = clientGameManagerService;
		this.$myUIManagerService = uiManagerService;
		this.$init();
	};
	$Client_ShufflyGame_GameManager.prototype = {
		$init: function() {
			//
			//            /*     myClientGameManagerService.OnAskQuestion += (user, gameSendAnswerModel) => {
			//
			//            PageHandler.QuestionUI.Load(gameSendAnswerModel);
			//
			//            //alert(JSON.stringify(data));
			//
			//            PageHandler.TimeTracker.EndTime = new DateTime();
			//
			//            var time = PageHandler.TimeTracker.EndTime - PageHandler.TimeTracker.StartTime;
			//
			//            PageHandler.  DebugUI.lblHowFast.Text = ( "how long: " + time );
			//
			//            }; #1#
			//
			//            
			//
			//            myClientGameManagerService.OnUpdateState += (user, update) =>
			//
			//            {
			//
			//            var data = Json.Parse<GameCardGame>(new Compressor().DecompressText(update));
			//
			//            //  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
			//
			//            
			//
			//            myUIManagerService.gameDrawer.Draw(data);
			//
			//            };
			//
			//            
			//
			//            myClientGameManagerService.OnGameStarted += (user, room) =>
			//
			//            {
			//
			//            //alert(JSON.stringify(data));
			//
			//            };
			//
			//            
			//
			//            myClientGameManagerService.OnGameOver += (user, room) =>
			//
			//            {
			//
			//            //alert(JSON.stringify(data));
			//
			//            };
		},
		startGame: function() {
			//            myUIManagerService.gameDrawer.Init();
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
		pageHandler.clientSiteManager.add_onGetRoomInfoReceived(ss.mkdel(this, this.$getRoomInfo));
		pageHandler.clientChatManager.add_onGetChatLines(ss.mkdel(this, this.$getChatLines));
		pageHandler.clientChatManager.add_onGetChatInfo(ss.mkdel(this, this.$getChatInfo));
		this.$myShuffUIManager = shuffUIManager;
		this.$myPageHandler = pageHandler;
		this.$myRoom = room;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = ss.formatString('{0} Lobby', this.$myRoom.roomName);
		$t1.set_x(250);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(800));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(600));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.onClose = ss.delegateCombine(this.uiWindow.onClose, ss.mkdel(this, function() {
			this.uiWindow.set_visible(true);
			this.uiWindow.swingAway(4, false);
			pageHandler.clientSiteManager.leaveRoom({ room: room });
			pageHandler.homeUI.uiWindow.swingBack();
		}));
		this.uiWindow.swingAway(4, true);
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(600, 200, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(300), null);
		$t2.set_visible(true);
		this.$myRoomPlayers = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t3, $t2);
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(600, 510, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(23), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Start Game!'), ss.mkdel(this, function(a) {
			pageHandler.gameManager.startGame();
			this.uiWindow.set_height(CommonLibraries.Number.op_Implicit$2(200));
		})));
		var $t5 = this.uiWindow;
		var $t4 = new $Client_UIWindow_Controls_ChatBox(50, 50, 550, 500);
		$t4.set_visible(true);
		this.$myChatBox = $t5.addElement($Client_UIWindow_Controls_ChatBox).call($t5, $t4);
		var $t7 = this.uiWindow;
		var $t6 = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(50, 560, CommonLibraries.Number.op_Implicit$2(500), CommonLibraries.Number.op_Implicit$2(30), '', '', null);
		$t6.set_onEnter(ss.mkdel(this, function() {
			if (this.$myChatText.get_text().trim() === '') {
				return;
			}
			pageHandler.clientChatManager.sendChatMessage({ message: this.$myChatText.get_text() });
			this.$myChatText.set_text('');
		}));
		this.$myChatText = $t7.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call($t7, $t6);
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(560, 560, CommonLibraries.Number.op_Implicit$2(50), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send'), ss.mkdel(this, function(e) {
			if (this.$myChatText.get_text().trim() === '') {
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
				this.$myRoomPlayers.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(userModel.userName, userModel.userName));
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
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Code';
		$t1.set_x(0);
		$t1.set_y(0);
		$t1.staticPositioning = false;
		$t1.set_width(CommonLibraries.Number.op_Implicit$2($(window).width() * 0.5));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2($(window).height() * 0.9));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.breakPoints = [];
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor.$ctor1(0, 0, CommonLibraries.Number.op_Implicit$3('100%'), CommonLibraries.Number.op_Implicit$3('80%'), '');
		$t2.set_dock(2);
		this.codeEditor = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor).call($t3, $t2);
		var $t5 = this.uiWindow;
		var $t4 = new WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor.$ctor1(0, 0, CommonLibraries.Number.op_Implicit$3('100%'), CommonLibraries.Number.op_Implicit$3('20%'), '');
		$t4.lineNumbers = false;
		$t4.set_dock(2);
		this.console = $t5.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor).call($t5, $t4);
		pageHandler.clientDebugManager.add_onGetGameSource(ss.mkdel(this, this.$populateGameSource));
		pageHandler.clientDebugManager.requestGameSource({ gameName: 'Sevens' });
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
			//  PageHandler.DebugUI.lblHowFast.Text = ( "Time Taken: " + ( timeTracker.TimeValue / timeTracker.NumOfTimes ) );
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
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
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
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(115, 40, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Room Name', null);
		$t2.set_onEnter(ss.mkdel(this, function() {
			this.$createRoom(pageHandler, gameType, roomName);
		}));
		$t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call($t3, roomName = $t2);
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(55, 100, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create'), ss.mkdel(this, function(e) {
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
		this.joined = 0;
		this.created = false;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Developer';
		$t1.set_x(500);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(420));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		var but = null;
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, but = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(280, 84, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel(this, function() {
			return 'Game: ' + this.selectedGame;
		})), ss.mkdel(this, function(e) {
			if (this.selectedGame === 'Sevens') {
				this.selectedGame = 'BlackJack';
			}
			else {
				this.selectedGame = 'Sevens';
			}
			pageHandler.clientDebugManager.requestGameSource({ gameName: this.selectedGame });
			var m = ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(but.text);
		})));
		this.lblHowFast = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(80, 80, 'Time Taken:'));
		this.lblAnother = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(80, 100, 'Another: '));
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
		this.varText = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(150, 134, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(25), 'Var Lookup', null, null));
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
		this.txtNumOfPlayers = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(130, 43, CommonLibraries.Number.op_Implicit$2(130), CommonLibraries.Number.op_Implicit$2(20), '6', 'Number of players=', 'font-size:13px'));
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
		pageHandler.clientSiteManager.add_onGetGameTypesReceived(ss.mkdel(this, this.$populateGames));
		pageHandler.clientSiteManager.add_onGetRoomsReceived(ss.mkdel(this, this.$populateRooms));
		pageHandler.clientSiteManager.add_onRoomJoined(ss.mkdel(this, this.$roomJoined));
		pageHandler.clientSiteManager.add_onGetRoomInfoReceived(ss.mkdel(this, this.$getRoomInfo));
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'CardGame';
		$t1.set_x(400);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(600));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.$lblHeader = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(40, 44, 'Please Login!'));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(30, 80, 'Game Types'));
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(25, 100, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(300), null);
		$t2.onClick = ss.mkdel(this, function(item) {
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: item.value });
		});
		this.$myGameTypeList = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t3, $t2);
		this.$myCreateGameType = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(45, 410, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(40), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create New Game!'), function(c) {
			var ui = new $Client_UIWindow_CodeEditorUI(shuffUIManager, pageHandler);
		}));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(210, 80, 'Rooms'));
		this.$myCreateRoom = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(260, 70, CommonLibraries.Number.op_Implicit$2(70), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Refresh!'), ss.mkdel(this, function(c1) {
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: this.$myGameTypeList.selectedItem.value });
		})));
		var $t5 = this.uiWindow;
		var $t4 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(200, 100, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(300), null);
		$t4.onClick = ss.mkdel(this, function(item1) {
			var room = Enumerable.from(this.$myLoadedRooms).first(function(a) {
				return ss.referenceEquals(a.roomName, item1.value);
			});
			this.$populateRoom(room);
		});
		this.$myRoomsList = $t5.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t5, $t4);
		this.$myCreateRoom = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(225, 410, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(40), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create New Room!'), ss.mkdel(this, function(c2) {
			var create = new $Client_UIWindow_CreateRoomUI(shuffUIManager, pageHandler, this.$myGameTypeList.selectedItem.value);
			shuffUIManager.focus(create.uiWindow);
		})));
		var $t7 = this.uiWindow;
		var $t6 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(400, 200, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(200), null);
		$t6.set_visible(false);
		this.$myRoomPlayers = $t7.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t7, $t6);
		var $t9 = this.uiWindow;
		var $t8 = new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(400, 100, '');
		$t8.set_visible(false);
		this.$myRoomGameType = $t9.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call($t9, $t8);
		var $t11 = this.uiWindow;
		var $t10 = new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(400, 130, '');
		$t10.set_visible(false);
		this.$myRoomName = $t11.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call($t11, $t10);
		var $t13 = this.uiWindow;
		var $t12 = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(410, 160, CommonLibraries.Number.op_Implicit$2(75), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Join!'), ss.mkdel(this, function(c3) {
			pageHandler.clientSiteManager.joinRoom({ gameType: this.$myGameTypeList.selectedItem.value, roomName: this.$myRoomsList.selectedItem.value });
		}));
		$t12.set_visible(false);
		this.$myJoinRoom = $t13.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call($t13, $t12);
		var $t15 = this.uiWindow;
		var $t14 = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(490, 160, CommonLibraries.Number.op_Implicit$2(75), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Spectate!'), function(c4) {
		});
		$t14.set_visible(false);
		this.$mySpectateRoom = $t15.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call($t15, $t14);
		var $t17 = this.uiWindow;
		var $t16 = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(420, 410, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Refresh!'), ss.mkdel(this, function(c5) {
			pageHandler.clientSiteManager.getRoomInfo({ gameType: this.$myGameTypeList.selectedItem.value, roomName: this.$myRoomsList.selectedItem.value });
		}));
		$t16.set_visible(false);
		this.$myRefreshRoom = $t17.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call($t17, $t16);
		//UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.ClientSiteManager.GetGameList(); }));
	};
	$Client_UIWindow_HomeUI.prototype = {
		$getRoomInfo: function(user, o) {
			for (var i = 0; i < this.$myLoadedRooms.length; i++) {
				if (ss.referenceEquals(this.$myLoadedRooms[i]._id, o.room._id)) {
					ss.removeAt(this.$myLoadedRooms, i);
					ss.insert(this.$myLoadedRooms, i, o.room);
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
			this.$lblHeader.set_text(ss.formatString('Welcome: {0}!', this.$myPageHandler.clientInfo.loggedInUser.userName));
			this.$myPageHandler.clientSiteManager.getGameTypes();
			this.uiWindow.set_visible(true);
			this.uiWindow.swingAway(6, true);
			this.uiWindow.swingBack();
		},
		$populateGames: function(user, o) {
			this.$myGameTypeList.clearItems();
			for (var $t1 = 0; $t1 < o.gameTypes.length; $t1++) {
				var gameType = o.gameTypes[$t1];
				this.$myGameTypeList.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(gameType.name, gameType.name));
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
				this.$myRoomsList.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(room.roomName, room.roomName));
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
				this.$myRoomPlayers.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(userModel.userName, userModel.userName));
			}
			this.$myRoomName.set_text(ss.formatString('Room: {0}', roomData.roomName));
			this.$myRoomGameType.set_text(ss.formatString('Game Type: {0}', roomData.gameType));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.LoginUI
	var $Client_UIWindow_LoginUI = function(shuffUIManager, pageHandler) {
		this.uiWindow = null;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Login';
		$t1.set_x($('body').innerWidth() - 500);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(280));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(165));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		var loginName;
		var password;
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, loginName = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(115, 40, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Username', null));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, password = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(115, 75, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Password', null));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(55, 150, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create'), function(e) {
			pageHandler.clientSiteManager.login(loginName.get_text(), password.get_text());
		}));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(155, 150, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Login'), function(e1) {
			pageHandler.clientSiteManager.login(loginName.get_text(), password.get_text());
		}));
		pageHandler.clientSiteManager.add_onLogin(ss.mkdel(this, function(user, data) {
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
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
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
		this.question = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(20, 40, ''));
		this.load = ss.mkdel(this, function(question) {
			this.uiWindow.swingBack();
			this.question.set_text(question.question);
			this.answerBox.clearItems();
			for (var i = 0; i < question.answers.length; i++) {
				this.answerBox.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(question.answers[i], i));
			}
		});
		//ExtensionMethods.debugger();
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(30, 65, CommonLibraries.Number.op_Implicit$2(215), CommonLibraries.Number.op_Implicit$2(125), null);
		$t2.onClick = ss.mkdel(this, function(e) {
			this.$selectAnswer(e);
		});
		this.answerBox = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t3, $t2);
	};
	$Client_UIWindow_QuestionUI.prototype = {
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$selectAnswer: function(e) {
			this.get_pageHandler().clientGameManager.answerQuestion({ answer: e.value });
			this.uiWindow.swingAway(0, false);
			this.get_pageHandler().timeTracker.startTime = new Date();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.Controls.ChatBox
	var $Client_UIWindow_Controls_ChatBox = function(x, y, width, height) {
		WebLibraries.ShuffUI.ShuffUI.ShuffElement.call(this);
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
	ss.registerClass(null, 'CardGameUI.Controllers.$ActiveLobbyController', $CardGameUI_Controllers_$ActiveLobbyController);
	ss.registerClass(null, 'CardGameUI.Controllers.$CreateRoomController', $CardGameUI_Controllers_$CreateRoomController);
	ss.registerClass(null, 'CardGameUI.Controllers.$EffectEditorController', $CardGameUI_Controllers_$EffectEditorController);
	ss.registerClass(null, 'CardGameUI.Controllers.$HomeController', $CardGameUI_Controllers_$HomeController);
	ss.registerClass(null, 'CardGameUI.Controllers.$ListEffectsController', $CardGameUI_Controllers_$ListEffectsController);
	ss.registerClass(null, 'CardGameUI.Controllers.$LoginController', $CardGameUI_Controllers_$LoginController);
	ss.registerClass(null, 'CardGameUI.Controllers.$MinimizeController', $CardGameUI_Controllers_$MinimizeController);
	ss.registerClass(null, 'CardGameUI.Controllers.$QuestionController', $CardGameUI_Controllers_$QuestionController);
	ss.registerClass(global, 'CardGameUI.Controllers.GameController', $CardGameUI_Controllers_GameController);
	ss.registerClass(global, 'CardGameUI.Directives.AcgDrawCardDirective', $CardGameUI_Directives_AcgDrawCardDirective);
	ss.registerClass(global, 'CardGameUI.Directives.AcgDrawSpaceDirective', $CardGameUI_Directives_AcgDrawSpaceDirective);
	ss.registerClass(global, 'CardGameUI.Directives.AcgSpacesDirective', $CardGameUI_Directives_AcgSpacesDirective);
	ss.registerClass(global, 'CardGameUI.Directives.ChatBoxDirective', $CardGameUI_Directives_ChatBoxDirective);
	ss.registerClass(global, 'CardGameUI.Directives.DraggableDirective', $CardGameUI_Directives_DraggableDirective);
	ss.registerClass(global, 'CardGameUI.Directives.FancyListDirective', $CardGameUI_Directives_FancyListDirective);
	ss.registerClass(global, 'CardGameUI.Directives.FloatingWindowDirective', $CardGameUI_Directives_FloatingWindowDirective);
	ss.registerClass(global, 'CardGameUI.Directives.Position', $CardGameUI_Directives_Position);
	ss.registerClass(global, 'CardGameUI.Directives.FloatingWindowPosition', $CardGameUI_Directives_FloatingWindowPosition, $CardGameUI_Directives_Position);
	ss.registerClass(global, 'CardGameUI.Directives.FloatingWindowScope', $CardGameUI_Directives_FloatingWindowScope);
	ss.registerClass(global, 'CardGameUI.Directives.PropertyDirective', $CardGameUI_Directives_PropertyDirective);
	ss.registerClass(global, 'CardGameUI.Directives.Size', $CardGameUI_Directives_Size);
	ss.registerClass(global, 'CardGameUI.Scope._KeepBaseScopeAlive', $CardGameUI_Scope__KeepBaseScopeAlive);
	ss.registerClass(global, 'CardGameUI.Scope.ActiveLobbyModel', $CardGameUI_Scope_ActiveLobbyModel);
	ss.registerClass(global, 'CardGameUI.Scope.FloatingWindowBaseScope', $CardGameUI_Scope_FloatingWindowBaseScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.ActiveLobbyScope', $CardGameUI_Scope_ActiveLobbyScope, $CardGameUI_Scope_FloatingWindowBaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.CardScope', $CardGameUI_Scope_CardScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.CreateRoomModel', $CardGameUI_Scope_CreateRoomModel);
	ss.registerClass(global, 'CardGameUI.Scope.CreateRoomScope', $CardGameUI_Scope_CreateRoomScope, $CardGameUI_Scope_FloatingWindowBaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.EffectEditorScope', $CardGameUI_Scope_EffectEditorScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.GameCtrlScope', $CardGameUI_Scope_GameCtrlScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.HomeModel', $CardGameUI_Scope_HomeModel);
	ss.registerClass(global, 'CardGameUI.Scope.HomeScope', $CardGameUI_Scope_HomeScope, $CardGameUI_Scope_FloatingWindowBaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.ListEffectsScope', $CardGameUI_Scope_ListEffectsScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.LoginModel', $CardGameUI_Scope_LoginModel);
	ss.registerClass(global, 'CardGameUI.Scope.LoginScope', $CardGameUI_Scope_LoginScope, $CardGameUI_Scope_FloatingWindowBaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.MinimizeScope', $CardGameUI_Scope_MinimizeScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.QuestionModel', $CardGameUI_Scope_QuestionModel);
	ss.registerClass(global, 'CardGameUI.Scope.QuestionScope', $CardGameUI_Scope_QuestionScope, $CardGameUI_Scope_FloatingWindowBaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.SpaceScope', $CardGameUI_Scope_SpaceScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(null, 'CardGameUI.Services.$EditEffectService', $CardGameUI_Services_$EditEffectService);
	ss.registerClass(global, 'CardGameUI.Services.ClientChatManagerService', $CardGameUI_Services_ClientChatManagerService);
	ss.registerClass(global, 'CardGameUI.Services.ClientDebugManagerService', $CardGameUI_Services_ClientDebugManagerService);
	ss.registerClass(global, 'CardGameUI.Services.ClientGameManagerService', $CardGameUI_Services_ClientGameManagerService);
	ss.registerClass(global, 'CardGameUI.Services.ClientSiteManagerService', $CardGameUI_Services_ClientSiteManagerService);
	ss.registerClass(global, 'CardGameUI.Services.EffectManagerService', $CardGameUI_Services_EffectManagerService);
	ss.registerClass(global, 'CardGameUI.Services.EffectWatcherService', $CardGameUI_Services_EffectWatcherService);
	ss.registerClass(global, 'CardGameUI.Services.GameContentManager', $CardGameUI_Services_GameContentManager);
	ss.registerClass(global, 'CardGameUI.Services.GatewayService', $CardGameUI_Services_GatewayService);
	ss.registerClass(global, 'CardGameUI.Services.UIManagerService', $CardGameUI_Services_UIManagerService);
	ss.registerClass(global, 'CardGameUI.Util.Effect', $CardGameUI_Util_Effect);
	ss.registerClass(global, 'CardGameUI.Util.EffectProperty', $CardGameUI_Util_EffectProperty);
	ss.registerClass(global, 'CardGameUI.Util.Extensions', $CardGameUI_Util_Extensions);
	ss.registerClass(global, 'Client.BuildAngular', $Client_BuildAngular);
	ss.registerClass(global, 'Client.BuildSite', $Client_BuildSite);
	ss.registerClass(global, 'Client.ClientInformation', $Client_ClientInformation);
	ss.registerClass(global, 'Client.PageHandler', $Client_PageHandler);
	ss.registerClass(global, 'Client.Libs.ScriptLoader', $Client_Libs_ScriptLoader);
	ss.registerClass(global, 'Client.Libs.TimeTracker', $Client_Libs_TimeTracker);
	ss.registerClass(global, 'Client.ShufflyGame.GameManager', $Client_ShufflyGame_GameManager);
	ss.registerClass(global, 'Client.UIWindow.ActiveLobbyUI', $Client_UIWindow_ActiveLobbyUI);
	ss.registerClass(global, 'Client.UIWindow.CodeEditorUI', $Client_UIWindow_CodeEditorUI);
	ss.registerClass(global, 'Client.UIWindow.CreateRoomUI', $Client_UIWindow_CreateRoomUI);
	ss.registerClass(global, 'Client.UIWindow.DebugUI', $Client_UIWindow_DebugUI);
	ss.registerClass(global, 'Client.UIWindow.HomeUI', $Client_UIWindow_HomeUI);
	ss.registerClass(global, 'Client.UIWindow.LoginUI', $Client_UIWindow_LoginUI);
	ss.registerClass(global, 'Client.UIWindow.QuestionUI', $Client_UIWindow_QuestionUI);
	ss.registerClass(global, 'Client.UIWindow.Controls.ChatBox', $Client_UIWindow_Controls_ChatBox, WebLibraries.ShuffUI.ShuffUI.ShuffElement);
	$Client_BuildSite.instance = null;
})();

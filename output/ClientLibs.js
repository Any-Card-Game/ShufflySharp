
(function() {
	'use strict';
	global.ClientLibs = global.ClientLibs || {};
	global.ClientLibs.Managers = global.ClientLibs.Managers || {};
	////////////////////////////////////////////////////////////////////////////////
	// ClientLibs.Gateway
	var $ClientLibs_Gateway = function(gatewayServer, server) {
		this.$channels = null;
		this.gatewaySocket = null;
		console.log('did ' + gatewayServer);
		this.$channels = new (ss.makeGenericType(ss.Dictionary$2, [String, Function]))();
		if (server) {
			var jv = {};
			jv['force new connection'] = true;
			this.gatewaySocket = require('socket.io-client').connect(gatewayServer, jv);
		}
		else {
			this.gatewaySocket = io.connect(gatewayServer);
		}
		this.gatewaySocket.on('Client.Message', ss.mkdel(this, function(data) {
			this.$channels.get_item(data.channel)(data.user, data.content);
		}));
		this.gatewaySocket.on('disconnect', function(data1) {
			console.log('Disconnected ' + new Date());
			null;
		});
	};
	$ClientLibs_Gateway.__typeName = 'ClientLibs.Gateway';
	global.ClientLibs.Gateway = $ClientLibs_Gateway;
	////////////////////////////////////////////////////////////////////////////////
	// ClientLibs.Managers.ClientChatManager
	var $ClientLibs_Managers_ClientChatManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnGetChatLinesField = null;
		this.$1$OnGetChatInfoField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$ClientLibs_Managers_ClientChatManager.__typeName = 'ClientLibs.Managers.ClientChatManager';
	global.ClientLibs.Managers.ClientChatManager = $ClientLibs_Managers_ClientChatManager;
	////////////////////////////////////////////////////////////////////////////////
	// ClientLibs.Managers.ClientDebugManager
	var $ClientLibs_Managers_ClientDebugManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnAskQuestionField = null;
		this.$1$OnUpdateStateField = null;
		this.$1$OnGameStartedField = null;
		this.$1$OnGameOverField = null;
		this.$1$OnGetDebugLogField = null;
		this.$1$OnGetDebugBreakField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$ClientLibs_Managers_ClientDebugManager.__typeName = 'ClientLibs.Managers.ClientDebugManager';
	global.ClientLibs.Managers.ClientDebugManager = $ClientLibs_Managers_ClientDebugManager;
	////////////////////////////////////////////////////////////////////////////////
	// ClientLibs.Managers.ClientGameManager
	var $ClientLibs_Managers_ClientGameManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnAskQuestionField = null;
		this.$1$OnUpdateStateField = null;
		this.$1$OnGameStartedField = null;
		this.$1$OnGameOverField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$ClientLibs_Managers_ClientGameManager.__typeName = 'ClientLibs.Managers.ClientGameManager';
	global.ClientLibs.Managers.ClientGameManager = $ClientLibs_Managers_ClientGameManager;
	////////////////////////////////////////////////////////////////////////////////
	// ClientLibs.Managers.ClientSiteManager
	var $ClientLibs_Managers_ClientSiteManager = function(gateway) {
		this.$myGateway = null;
		this.$1$OnGetGameTypesReceivedField = null;
		this.$1$OnLoginField = null;
		this.$1$OnUserCreateField = null;
		this.$1$OnGetRoomsReceivedField = null;
		this.$1$OnRoomJoinedField = null;
		this.$1$OnGetRoomInfoReceivedField = null;
		this.$1$OnGetGamesByUserReceivedField = null;
		this.$1$OnDoesGameNameExistReceivedField = null;
		this.$1$OnDeveloperCreateGameReceivedField = null;
		this.$1$OnDeveloperUpdateGameReceivedField = null;
		this.$myGateway = gateway;
		this.$setup();
	};
	$ClientLibs_Managers_ClientSiteManager.__typeName = 'ClientLibs.Managers.ClientSiteManager';
	global.ClientLibs.Managers.ClientSiteManager = $ClientLibs_Managers_ClientSiteManager;
	ss.initClass($ClientLibs_Gateway, {
		emit: function(channel, content) {
			this.gatewaySocket.emit('Gateway.Message', Models.GatewayMessageModel.$ctor(channel, content));
		},
		close: function() {
			this.gatewaySocket.disconnect(true);
		},
		on: function(channel, callback) {
			this.$channels.set_item(channel, callback);
		},
		login: function(userName, password) {
			var $t2 = this.gatewaySocket;
			var $t1 = new Models.UserModel();
			$t1.userName = userName;
			$t1.password = password;
			$t2.emit('Gateway.Login', $t1);
		}
	});
	ss.initClass($ClientLibs_Managers_ClientChatManager, {
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
		$setup: function() {
			this.$myGateway.on('Area.Chat.ChatLines.Response', ss.mkdel(this, function(user, data) {
				if (!ss.staticEquals(this.$1$OnGetChatLinesField, null)) {
					this.$1$OnGetChatLinesField(user, data);
				}
			}));
			this.$myGateway.on('Area.Chat.ChatInfo.Response', ss.mkdel(this, function(user1, data1) {
				if (!ss.staticEquals(this.$1$OnGetChatInfoField, null)) {
					this.$1$OnGetChatInfoField(user1, data1);
				}
			}));
		},
		sendChatMessage: function(sendChatMessageModel) {
			this.$myGateway.emit('Area.Chat.SendMessage', sendChatMessageModel);
		}
	});
	ss.initClass($ClientLibs_Managers_ClientDebugManager, {
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
		$setup: function() {
			this.$myGateway.on('Area.Debug.AskQuestion', ss.mkdel(this, function(user, data) {
				if (!ss.staticEquals(this.$1$OnAskQuestionField, null)) {
					this.$1$OnAskQuestionField(user, data);
				}
			}));
			this.$myGateway.on('Area.Debug.UpdateState', ss.mkdel(this, function(user1, data1) {
				if (!ss.staticEquals(this.$1$OnUpdateStateField, null)) {
					this.$1$OnUpdateStateField(user1, ss.cast(data1, String));
				}
			}));
			this.$myGateway.on('Area.Debug.Started', ss.mkdel(this, function(user2, data2) {
				if (!ss.staticEquals(this.$1$OnGameStartedField, null)) {
					this.$1$OnGameStartedField(user2, data2);
				}
			}));
			this.$myGateway.on('Area.Debug.GameOver', ss.mkdel(this, function(user3, data3) {
				if (!ss.staticEquals(this.$1$OnGameOverField, null)) {
					this.$1$OnGameOverField(user3, ss.cast(data3, String));
				}
			}));
			this.$myGateway.on('Area.Debug.Log', ss.mkdel(this, function(user4, data4) {
				if (!ss.staticEquals(this.$1$OnGetDebugLogField, null)) {
					this.$1$OnGetDebugLogField(user4, data4);
				}
			}));
			this.$myGateway.on('Area.Debug.Break', ss.mkdel(this, function(user5, data5) {
				if (!ss.staticEquals(this.$1$OnGetDebugBreakField, null)) {
					this.$1$OnGetDebugBreakField(user5, data5);
				}
			}));
		},
		answerQuestion: function(gameAnswerQuestionModel) {
			this.$myGateway.emit('Area.Debug.AnswerQuestion', gameAnswerQuestionModel);
		},
		createGame: function(createDebugGameRequest) {
			this.$myGateway.emit('Area.Debug.Create', createDebugGameRequest);
		},
		destroyGame: function(destroyDebugGameRequest) {
			this.$myGateway.emit('Area.Debug.Destory', destroyDebugGameRequest);
		}
	});
	ss.initClass($ClientLibs_Managers_ClientGameManager, {
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
		$setup: function() {
			this.$myGateway.on('Area.Game.AskQuestion', ss.mkdel(this, function(user, data) {
				if (!ss.staticEquals(this.$1$OnAskQuestionField, null)) {
					this.$1$OnAskQuestionField(user, data);
				}
			}));
			this.$myGateway.on('Area.Game.UpdateState', ss.mkdel(this, function(user1, data1) {
				if (!ss.staticEquals(this.$1$OnUpdateStateField, null)) {
					this.$1$OnUpdateStateField(user1, ss.cast(data1, String));
				}
			}));
			this.$myGateway.on('Area.Game.Started', ss.mkdel(this, function(user2, data2) {
				if (!ss.staticEquals(this.$1$OnGameStartedField, null)) {
					this.$1$OnGameStartedField(user2, data2);
				}
			}));
			this.$myGateway.on('Area.Game.GameOver', ss.mkdel(this, function(user3, data3) {
				if (!ss.staticEquals(this.$1$OnGameOverField, null)) {
					this.$1$OnGameOverField(user3, ss.cast(data3, String));
				}
			}));
		},
		answerQuestion: function(gameAnswerQuestionModel) {
			this.$myGateway.emit('Area.Game.AnswerQuestion', gameAnswerQuestionModel);
		}
	});
	ss.initClass($ClientLibs_Managers_ClientSiteManager, {
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
		add_onUserCreate: function(value) {
			this.$1$OnUserCreateField = ss.delegateCombine(this.$1$OnUserCreateField, value);
		},
		remove_onUserCreate: function(value) {
			this.$1$OnUserCreateField = ss.delegateRemove(this.$1$OnUserCreateField, value);
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
		$setup: function() {
			this.$myGateway.on('Area.Site.Login.Response', ss.mkdel(this, function(user, data) {
				if (!ss.staticEquals(this.$1$OnLoginField, null)) {
					this.$1$OnLoginField(user, data);
				}
			}));
			this.$myGateway.on('Area.Site.CreateUser.Response', ss.mkdel(this, function(user1, data1) {
				if (!ss.staticEquals(this.$1$OnUserCreateField, null)) {
					this.$1$OnUserCreateField(user1, data1);
				}
			}));
			this.$myGateway.on('Area.Site.GetGameTypes.Response', ss.mkdel(this, function(user2, data2) {
				if (!ss.staticEquals(this.$1$OnGetGameTypesReceivedField, null)) {
					this.$1$OnGetGameTypesReceivedField(user2, data2);
				}
			}));
			this.$myGateway.on('Area.Site.GetRooms.Response', ss.mkdel(this, function(user3, data3) {
				if (!ss.staticEquals(this.$1$OnGetRoomsReceivedField, null)) {
					this.$1$OnGetRoomsReceivedField(user3, data3);
				}
			}));
			this.$myGateway.on('Area.Site.GetRoomInfo.Response', ss.mkdel(this, function(user4, data4) {
				if (!ss.staticEquals(this.$1$OnGetRoomInfoReceivedField, null)) {
					this.$1$OnGetRoomInfoReceivedField(user4, data4);
				}
			}));
			this.$myGateway.on('Area.Site.JoinRoom.Response', ss.mkdel(this, function(user5, data5) {
				if (!ss.staticEquals(this.$1$OnRoomJoinedField, null)) {
					this.$1$OnRoomJoinedField(user5, data5);
				}
			}));
			this.$myGateway.on('Area.Site.GetGamesByUser.Response', ss.mkdel(this, function(user6, data6) {
				if (!ss.staticEquals(this.$1$OnGetGamesByUserReceivedField, null)) {
					this.$1$OnGetGamesByUserReceivedField(user6, data6);
				}
			}));
			this.$myGateway.on('Area.Site.DoesGameNameExist.Response', ss.mkdel(this, function(user7, data7) {
				if (!ss.staticEquals(this.$1$OnDoesGameNameExistReceivedField, null)) {
					this.$1$OnDoesGameNameExistReceivedField(user7, data7);
				}
			}));
			this.$myGateway.on('Area.Site.DeveloperCreateGame.Response', ss.mkdel(this, function(user8, data8) {
				if (!ss.staticEquals(this.$1$OnDeveloperCreateGameReceivedField, null)) {
					this.$1$OnDeveloperCreateGameReceivedField(user8, data8);
				}
			}));
			this.$myGateway.on('Area.Site.DeveloperUpdateGame.Response', ss.mkdel(this, function(user9, data9) {
				if (!ss.staticEquals(this.$1$OnDeveloperUpdateGameReceivedField, null)) {
					this.$1$OnDeveloperUpdateGameReceivedField(user9, data9);
				}
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
		},
		createUser: function(createUser) {
			this.$myGateway.emit('Area.Site.CreateUser', createUser);
		},
		getGamesByUser: function(getGamesByUser) {
			this.$myGateway.emit('Area.Site.GetGamesByUser', getGamesByUser);
		},
		doesGameNameExist: function(getGamesByUser) {
			this.$myGateway.emit('Area.Site.DoesGameNameExist', getGamesByUser);
		},
		developerCreateGame: function(getGamesByUser) {
			this.$myGateway.emit('Area.Site.DeveloperCreateGame', getGamesByUser);
		},
		developerUpdateGame: function(getGamesByUser) {
			this.$myGateway.emit('Area.Site.DeveloperUpdateGame', getGamesByUser);
		}
	});
})();


(function() {
	////////////////////////////////////////////////////////////////////////////////
	// Models.ClientInformation
	var $Models_ClientInformation = function() {
	};
	$Models_ClientInformation.createInstance = function() {
		return $Models_ClientInformation.$ctor();
	};
	$Models_ClientInformation.$ctor = function() {
		var $this = {};
		$this.loggedInUser = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GatewayLoginMessageModel
	var $Models_GatewayLoginMessageModel = function() {
	};
	$Models_GatewayLoginMessageModel.createInstance = function() {
		return $Models_GatewayLoginMessageModel.$ctor();
	};
	$Models_GatewayLoginMessageModel.$ctor = function() {
		var $this = {};
		$this.userName = null;
		$this.password = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GatewayMessageModel
	var $Models_GatewayMessageModel = function() {
	};
	$Models_GatewayMessageModel.$ctor = function(channel, content) {
		var $this = {};
		$this.channel = null;
		$this.content = null;
		$this.channel = channel;
		$this.content = content;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.RegisterServerModel
	var $Models_RegisterServerModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SocketClientMessageModel
	var $Models_SocketClientMessageModel = function(user, channel, content) {
		this.channel = null;
		this.content = null;
		this.user = null;
		this.user = user;
		this.channel = channel;
		this.content = content;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserCreateResponse
	var $Models_UserCreateResponse = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserDisconnectModel
	var $Models_UserDisconnectModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserLeaveModel
	var $Models_UserLeaveModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserLogicModel
	var $Models_UserLogicModel = function() {
	};
	$Models_UserLogicModel.createInstance = function() {
		return $Models_UserLogicModel.$ctor();
	};
	$Models_UserLogicModel.$ctor = function() {
		var $this = {};
		$this.gateway = null;
		$this.userName = null;
		$this.password = null;
		$this.hash = null;
		$this.currentGameServer = null;
		$this.currentChatServer = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserLoginResponse
	var $Models_UserLoginResponse = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserModel
	var $Models_UserModel = function() {
	};
	$Models_UserModel.createInstance = function() {
		return $Models_UserModel.$ctor();
	};
	$Models_UserModel.$ctor = function() {
		var $this = {};
		$this.gateway = null;
		$this.userName = null;
		$this.password = null;
		$this.hash = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserSocketModel
	var $Models_UserSocketModel = function() {
	};
	$Models_UserSocketModel.createInstance = function() {
		return $Models_UserSocketModel.$ctor();
	};
	$Models_UserSocketModel.toUserModel = function($this) {
		var m = $this.localUserModel || ($this.localUserModel = $Models_UserModel.$ctor());
		m.gateway = $this.gateway;
		m.hash = $this.hash;
		m.password = $this.password;
		m.userName = $this.userName;
		return m;
	};
	$Models_UserSocketModel.toLogicModel = function($this) {
		var m = $this.localLogicModel || ($this.localLogicModel = $Models_UserLogicModel.$ctor());
		m.gateway = $this.gateway;
		m.hash = $this.hash;
		m.currentChatServer = $this.currentChatServer;
		m.currentGameServer = $this.currentGameServer;
		m.password = $this.password;
		m.userName = $this.userName;
		return m;
	};
	$Models_UserSocketModel.$ctor = function() {
		var $this = {};
		$this.localLogicModel = null;
		$this.localUserModel = null;
		$this.gateway = null;
		$this.userName = null;
		$this.password = null;
		$this.hash = null;
		$this.socket = null;
		$this.currentGameServer = null;
		$this.currentChatServer = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatMessageRoomModel
	var $Models_ChatManagerModels_ChatMessageRoomModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatMessagesModel
	var $Models_ChatManagerModels_ChatMessagesModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatRoomInfoModel
	var $Models_ChatManagerModels_ChatRoomInfoModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatRoomModel
	var $Models_ChatManagerModels_ChatRoomModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.CreateChatRoomRequest
	var $Models_ChatManagerModels_CreateChatRoomRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.JoinChatRoomRequest
	var $Models_ChatManagerModels_JoinChatRoomRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.RegisterChatChannelModel
	var $Models_ChatManagerModels_RegisterChatChannelModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.SendChatMessageModel
	var $Models_ChatManagerModels_SendChatMessageModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.CreateGameRequestModel
	var $Models_GameManagerModels_CreateGameRequestModel = function() {
	};
	$Models_GameManagerModels_CreateGameRequestModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.gameName = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.DebugCreateGameRequestModel
	var $Models_GameManagerModels_DebugCreateGameRequestModel = function() {
	};
	$Models_GameManagerModels_DebugCreateGameRequestModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.gameName = null;
		$this.source = null;
		$this.breakPoints = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.DebuggerJoinRequestModel
	var $Models_GameManagerModels_DebuggerJoinRequestModel = function() {
	};
	$Models_GameManagerModels_DebuggerJoinRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameAnswerModel
	var $Models_GameManagerModels_GameAnswerModel = function() {
	};
	$Models_GameManagerModels_GameAnswerModel.$ctor = function() {
		var $this = {};
		$this.lineNumber = 0;
		$this.value = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameAnswerQuestionModel
	var $Models_GameManagerModels_GameAnswerQuestionModel = function() {
	};
	$Models_GameManagerModels_GameAnswerQuestionModel.$ctor = function() {
		var $this = {};
		$this.answer = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameCreateRequestModel
	var $Models_GameManagerModels_GameCreateRequestModel = function() {
	};
	$Models_GameManagerModels_GameCreateRequestModel.$ctor = function() {
		var $this = {};
		$this.gameType = null;
		$this.players = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameRoomModel
	var $Models_GameManagerModels_GameRoomModel = function() {
	};
	$Models_GameManagerModels_GameRoomModel.createInstance = function() {
		return $Models_GameManagerModels_GameRoomModel.$ctor();
	};
	$Models_GameManagerModels_GameRoomModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameSendAnswerModel
	var $Models_GameManagerModels_GameSendAnswerModel = function() {
	};
	$Models_GameManagerModels_GameSendAnswerModel.$ctor = function() {
		var $this = {};
		$this.question = null;
		$this.answers = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameSourceRequestModel
	var $Models_GameManagerModels_GameSourceRequestModel = function() {
	};
	$Models_GameManagerModels_GameSourceRequestModel.$ctor = function() {
		var $this = {};
		$this.gameName = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameSourceResponseModel
	var $Models_GameManagerModels_GameSourceResponseModel = function() {
	};
	$Models_GameManagerModels_GameSourceResponseModel.$ctor = function() {
		var $this = {};
		$this.content = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.JoinGameRequestModel
	var $Models_GameManagerModels_JoinGameRequestModel = function() {
	};
	$Models_GameManagerModels_JoinGameRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		$this.user = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.StartGameRequestModel
	var $Models_GameManagerModels_StartGameRequestModel = function() {
	};
	$Models_GameManagerModels_StartGameRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.CreateRoomRequest
	var $Models_SiteManagerModels_CreateRoomRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GameTypeModel
	var $Models_SiteManagerModels_GameTypeModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetGameTypesReceivedResponse
	var $Models_SiteManagerModels_GetGameTypesReceivedResponse = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomInfoRequest
	var $Models_SiteManagerModels_GetRoomInfoRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomInfoResponse
	var $Models_SiteManagerModels_GetRoomInfoResponse = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomsRequest
	var $Models_SiteManagerModels_GetRoomsRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomsResponse
	var $Models_SiteManagerModels_GetRoomsResponse = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.LeaveRoomRequest
	var $Models_SiteManagerModels_LeaveRoomRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.RoomJoinRequest
	var $Models_SiteManagerModels_RoomJoinRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.RoomJoinResponse
	var $Models_SiteManagerModels_RoomJoinResponse = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.RoomModel
	var $Models_SiteManagerModels_RoomModel = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.SiteCreateUserRequest
	var $Models_SiteManagerModels_SiteCreateUserRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.SiteLoginRequest
	var $Models_SiteManagerModels_SiteLoginRequest = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.StartGameRequest
	var $Models_SiteManagerModels_StartGameRequest = function() {
	};
	$Models_SiteManagerModels_StartGameRequest.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.EffectType
	var $Models_SiteManagerModels_Game_EffectType = function() {
	};
	$Models_SiteManagerModels_Game_EffectType.prototype = { highlight: 'highlight', rotate: 'rotate', bend: 'bend', styleProperty: 'styleProperty', animated: 'animated' };
	ss.registerEnum(global, 'Models.SiteManagerModels.Game.EffectType', $Models_SiteManagerModels_Game_EffectType, false);
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameAreaModel
	var $Models_SiteManagerModels_Game_GameAreaModel = function() {
	};
	$Models_SiteManagerModels_Game_GameAreaModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameAreaModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameAreaModel.$ctor = function() {
		var $this = {};
		$this.top = 0;
		$this.left = 0;
		$this.width = 0;
		$this.height = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameCodeModel
	var $Models_SiteManagerModels_Game_GameCodeModel = function() {
	};
	$Models_SiteManagerModels_Game_GameCodeModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameCodeModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameCodeModel.$ctor = function() {
		var $this = {};
		$this.code = null;
		$this.cursorPosition = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameEffectModel
	var $Models_SiteManagerModels_Game_GameEffectModel = function() {
		this.name = null;
		this.type = 0;
		this.properties = null;
		this.properties = [];
	};
	$Models_SiteManagerModels_Game_GameEffectModel.prototype = {
		getPropertyByName: function(T) {
			return function(name) {
				for (var $t1 = 0; $t1 < this.properties.length; $t1++) {
					var effectProperty = this.properties[$t1];
					if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
						return ss.cast(effectProperty.value, T);
					}
				}
				return ss.getDefaultValue(T);
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameEffectPropertyModel
	var $Models_SiteManagerModels_Game_GameEffectPropertyModel = function() {
	};
	$Models_SiteManagerModels_Game_GameEffectPropertyModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameEffectPropertyModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameEffectPropertyModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.value = null;
		$this.type = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameEffectPropertyType
	var $Models_SiteManagerModels_Game_GameEffectPropertyType = function() {
	};
	$Models_SiteManagerModels_Game_GameEffectPropertyType.prototype = { text: 'text', number: 'number', color: 'color' };
	ss.registerEnum(global, 'Models.SiteManagerModels.Game.GameEffectPropertyType', $Models_SiteManagerModels_Game_GameEffectPropertyType, false);
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutModel
	var $Models_SiteManagerModels_Game_GameLayoutModel = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutModel.$ctor = function() {
		var $this = {};
		$this.width = 0;
		$this.height = 0;
		$this.spaces = null;
		$this.texts = null;
		$this.ares = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutScenario
	var $Models_SiteManagerModels_Game_GameLayoutScenario = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutScenario.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutScenario.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutScenario.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.numberOfPlayers = 0;
		$this.screenSize = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameModel
	var $Models_SiteManagerModels_Game_GameModel = function() {
	};
	$Models_SiteManagerModels_Game_GameModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.owner = null;
		$this.description = null;
		$this.maxNumberOfPlayers = 0;
		$this.cardImages = null;
		$this.assets = null;
		$this.gameCode = null;
		$this.gameLayout = null;
		$this.gameLayoutScenarios = null;
		$this.effects = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameSpaceLayoutType
	var $Models_SiteManagerModels_Game_GameSpaceLayoutType = function() {
	};
	$Models_SiteManagerModels_Game_GameSpaceLayoutType.prototype = { straight: 'straight' };
	ss.registerEnum(global, 'Models.SiteManagerModels.Game.GameSpaceLayoutType', $Models_SiteManagerModels_Game_GameSpaceLayoutType, false);
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameSpaceModel
	var $Models_SiteManagerModels_Game_GameSpaceModel = function() {
	};
	$Models_SiteManagerModels_Game_GameSpaceModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameSpaceModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameSpaceModel.$ctor = function() {
		var $this = $Models_SiteManagerModels_Game_GameAreaModel.$ctor();
		$this.layoutType = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameTextModel
	var $Models_SiteManagerModels_Game_GameTextModel = function() {
	};
	$Models_SiteManagerModels_Game_GameTextModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameTextModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameTextModel.$ctor = function() {
		var $this = {};
		$this.top = 0;
		$this.left = 0;
		$this.text = null;
		return $this;
	};
	ss.registerClass(global, 'Models.ClientInformation', $Models_ClientInformation);
	ss.registerClass(global, 'Models.GatewayLoginMessageModel', $Models_GatewayLoginMessageModel);
	ss.registerClass(global, 'Models.GatewayMessageModel', $Models_GatewayMessageModel);
	ss.registerClass(global, 'Models.RegisterServerModel', $Models_RegisterServerModel);
	ss.registerClass(global, 'Models.SocketClientMessageModel', $Models_SocketClientMessageModel);
	ss.registerClass(global, 'Models.UserCreateResponse', $Models_UserCreateResponse);
	ss.registerClass(global, 'Models.UserDisconnectModel', $Models_UserDisconnectModel);
	ss.registerClass(global, 'Models.UserLeaveModel', $Models_UserLeaveModel);
	ss.registerClass(global, 'Models.UserLogicModel', $Models_UserLogicModel);
	ss.registerClass(global, 'Models.UserLoginResponse', $Models_UserLoginResponse);
	ss.registerClass(global, 'Models.UserModel', $Models_UserModel);
	ss.registerClass(global, 'Models.UserSocketModel', $Models_UserSocketModel);
	ss.registerClass(global, 'Models.ChatManagerModels.ChatMessageRoomModel', $Models_ChatManagerModels_ChatMessageRoomModel);
	ss.registerClass(global, 'Models.ChatManagerModels.ChatMessagesModel', $Models_ChatManagerModels_ChatMessagesModel);
	ss.registerClass(global, 'Models.ChatManagerModels.ChatRoomInfoModel', $Models_ChatManagerModels_ChatRoomInfoModel);
	ss.registerClass(global, 'Models.ChatManagerModels.ChatRoomModel', $Models_ChatManagerModels_ChatRoomModel);
	ss.registerClass(global, 'Models.ChatManagerModels.CreateChatRoomRequest', $Models_ChatManagerModels_CreateChatRoomRequest);
	ss.registerClass(global, 'Models.ChatManagerModels.JoinChatRoomRequest', $Models_ChatManagerModels_JoinChatRoomRequest);
	ss.registerClass(global, 'Models.ChatManagerModels.RegisterChatChannelModel', $Models_ChatManagerModels_RegisterChatChannelModel);
	ss.registerClass(global, 'Models.ChatManagerModels.SendChatMessageModel', $Models_ChatManagerModels_SendChatMessageModel);
	ss.registerClass(global, 'Models.GameManagerModels.CreateGameRequestModel', $Models_GameManagerModels_CreateGameRequestModel);
	ss.registerClass(global, 'Models.GameManagerModels.DebugCreateGameRequestModel', $Models_GameManagerModels_DebugCreateGameRequestModel);
	ss.registerClass(global, 'Models.GameManagerModels.DebuggerJoinRequestModel', $Models_GameManagerModels_DebuggerJoinRequestModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameAnswerModel', $Models_GameManagerModels_GameAnswerModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameAnswerQuestionModel', $Models_GameManagerModels_GameAnswerQuestionModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameCreateRequestModel', $Models_GameManagerModels_GameCreateRequestModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameRoomModel', $Models_GameManagerModels_GameRoomModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameSendAnswerModel', $Models_GameManagerModels_GameSendAnswerModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameSourceRequestModel', $Models_GameManagerModels_GameSourceRequestModel);
	ss.registerClass(global, 'Models.GameManagerModels.GameSourceResponseModel', $Models_GameManagerModels_GameSourceResponseModel);
	ss.registerClass(global, 'Models.GameManagerModels.JoinGameRequestModel', $Models_GameManagerModels_JoinGameRequestModel);
	ss.registerClass(global, 'Models.GameManagerModels.StartGameRequestModel', $Models_GameManagerModels_StartGameRequestModel);
	ss.registerClass(global, 'Models.SiteManagerModels.CreateRoomRequest', $Models_SiteManagerModels_CreateRoomRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.GameTypeModel', $Models_SiteManagerModels_GameTypeModel);
	ss.registerClass(global, 'Models.SiteManagerModels.GetGameTypesReceivedResponse', $Models_SiteManagerModels_GetGameTypesReceivedResponse);
	ss.registerClass(global, 'Models.SiteManagerModels.GetRoomInfoRequest', $Models_SiteManagerModels_GetRoomInfoRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.GetRoomInfoResponse', $Models_SiteManagerModels_GetRoomInfoResponse);
	ss.registerClass(global, 'Models.SiteManagerModels.GetRoomsRequest', $Models_SiteManagerModels_GetRoomsRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.GetRoomsResponse', $Models_SiteManagerModels_GetRoomsResponse);
	ss.registerClass(global, 'Models.SiteManagerModels.LeaveRoomRequest', $Models_SiteManagerModels_LeaveRoomRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.RoomJoinRequest', $Models_SiteManagerModels_RoomJoinRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.RoomJoinResponse', $Models_SiteManagerModels_RoomJoinResponse);
	ss.registerClass(global, 'Models.SiteManagerModels.RoomModel', $Models_SiteManagerModels_RoomModel);
	ss.registerClass(global, 'Models.SiteManagerModels.SiteCreateUserRequest', $Models_SiteManagerModels_SiteCreateUserRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.SiteLoginRequest', $Models_SiteManagerModels_SiteLoginRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.StartGameRequest', $Models_SiteManagerModels_StartGameRequest);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameAreaModel', $Models_SiteManagerModels_Game_GameAreaModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameCodeModel', $Models_SiteManagerModels_Game_GameCodeModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameEffectModel', $Models_SiteManagerModels_Game_GameEffectModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameEffectPropertyModel', $Models_SiteManagerModels_Game_GameEffectPropertyModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameLayoutModel', $Models_SiteManagerModels_Game_GameLayoutModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameLayoutScenario', $Models_SiteManagerModels_Game_GameLayoutScenario);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameModel', $Models_SiteManagerModels_Game_GameModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameSpaceModel', $Models_SiteManagerModels_Game_GameSpaceModel, $Models_SiteManagerModels_Game_GameAreaModel);
	ss.registerClass(global, 'Models.SiteManagerModels.Game.GameTextModel', $Models_SiteManagerModels_Game_GameTextModel);
})();

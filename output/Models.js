
(function() {
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
	$Models_GatewayMessageModel.$ctor = function(channel, content, gameServer) {
		var $this = {};
		$this.channel = null;
		$this.content = null;
		$this.gameServer = null;
		$this.channel = channel;
		$this.content = content;
		$this.gameServer = gameServer;
		return $this;
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
	// Models.UserDisconnectModel
	var $Models_UserDisconnectModel = function() {
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
	$Models_UserSocketModel.$ctor = function() {
		var $this = {};
		$this.localUserModel = null;
		$this.gateway = null;
		$this.userName = null;
		$this.password = null;
		$this.hash = null;
		$this.socket = null;
		return $this;
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
		$this.roomID = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameAnswerRequestModel
	var $Models_GameManagerModels_GameAnswerRequestModel = function() {
	};
	$Models_GameManagerModels_GameAnswerRequestModel.$ctor = function() {
		var $this = {};
		$this.answer = 0;
		$this.roomID = null;
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
		$this.gameServer = null;
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
	// Models.SiteManagerModels.RoomData
	var $Models_SiteManagerModels_RoomData = function() {
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
	// Models.SiteManagerModels.SiteLoginRequest
	var $Models_SiteManagerModels_SiteLoginRequest = function() {
	};
	Type.registerClass(global, 'Models.GatewayLoginMessageModel', $Models_GatewayLoginMessageModel, Object);
	Type.registerClass(global, 'Models.GatewayMessageModel', $Models_GatewayMessageModel, Object);
	Type.registerClass(global, 'Models.SocketClientMessageModel', $Models_SocketClientMessageModel, Object);
	Type.registerClass(global, 'Models.UserDisconnectModel', $Models_UserDisconnectModel, Object);
	Type.registerClass(global, 'Models.UserLoginResponse', $Models_UserLoginResponse, Object);
	Type.registerClass(global, 'Models.UserModel', $Models_UserModel, Object);
	Type.registerClass(global, 'Models.UserSocketModel', $Models_UserSocketModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.CreateGameRequestModel', $Models_GameManagerModels_CreateGameRequestModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.DebugCreateGameRequestModel', $Models_GameManagerModels_DebugCreateGameRequestModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.DebuggerJoinRequestModel', $Models_GameManagerModels_DebuggerJoinRequestModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameAnswerModel', $Models_GameManagerModels_GameAnswerModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameAnswerQuestionModel', $Models_GameManagerModels_GameAnswerQuestionModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameAnswerRequestModel', $Models_GameManagerModels_GameAnswerRequestModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameRoomModel', $Models_GameManagerModels_GameRoomModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameSendAnswerModel', $Models_GameManagerModels_GameSendAnswerModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameSourceRequestModel', $Models_GameManagerModels_GameSourceRequestModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.GameSourceResponseModel', $Models_GameManagerModels_GameSourceResponseModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.JoinGameRequestModel', $Models_GameManagerModels_JoinGameRequestModel, Object);
	Type.registerClass(global, 'Models.GameManagerModels.StartGameRequestModel', $Models_GameManagerModels_StartGameRequestModel, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.CreateRoomRequest', $Models_SiteManagerModels_CreateRoomRequest, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.GameTypeModel', $Models_SiteManagerModels_GameTypeModel, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.GetGameTypesReceivedResponse', $Models_SiteManagerModels_GetGameTypesReceivedResponse, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.GetRoomInfoRequest', $Models_SiteManagerModels_GetRoomInfoRequest, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.GetRoomInfoResponse', $Models_SiteManagerModels_GetRoomInfoResponse, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.GetRoomsRequest', $Models_SiteManagerModels_GetRoomsRequest, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.GetRoomsResponse', $Models_SiteManagerModels_GetRoomsResponse, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.RoomData', $Models_SiteManagerModels_RoomData);
	Type.registerClass(global, 'Models.SiteManagerModels.RoomJoinRequest', $Models_SiteManagerModels_RoomJoinRequest, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.RoomJoinResponse', $Models_SiteManagerModels_RoomJoinResponse, Object);
	Type.registerClass(global, 'Models.SiteManagerModels.SiteLoginRequest', $Models_SiteManagerModels_SiteLoginRequest, Object);
})();

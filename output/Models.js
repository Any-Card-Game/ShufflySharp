
(function() {
	'use strict';
	global.Models = global.Models || {};
	global.Models.ChatManagerModels = global.Models.ChatManagerModels || {};
	global.Models.DebugGameManagerModels = global.Models.DebugGameManagerModels || {};
	global.Models.GameManagerModels = global.Models.GameManagerModels || {};
	global.Models.SiteManagerModels = global.Models.SiteManagerModels || {};
	global.Models.SiteManagerModels.Game = global.Models.SiteManagerModels.Game || {};
	////////////////////////////////////////////////////////////////////////////////
	// Models.ClientInformation
	var $Models_ClientInformation = function() {
	};
	$Models_ClientInformation.__typeName = 'Models.ClientInformation';
	$Models_ClientInformation.createInstance = function() {
		return $Models_ClientInformation.$ctor();
	};
	$Models_ClientInformation.$ctor = function() {
		var $this = {};
		$this.loggedInUser = null;
		return $this;
	};
	global.Models.ClientInformation = $Models_ClientInformation;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GatewayLoginMessageModel
	var $Models_GatewayLoginMessageModel = function() {
	};
	$Models_GatewayLoginMessageModel.__typeName = 'Models.GatewayLoginMessageModel';
	$Models_GatewayLoginMessageModel.createInstance = function() {
		return $Models_GatewayLoginMessageModel.$ctor();
	};
	$Models_GatewayLoginMessageModel.$ctor = function() {
		var $this = {};
		$this.userName = null;
		$this.password = null;
		return $this;
	};
	global.Models.GatewayLoginMessageModel = $Models_GatewayLoginMessageModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GatewayMessageModel
	var $Models_GatewayMessageModel = function() {
	};
	$Models_GatewayMessageModel.__typeName = 'Models.GatewayMessageModel';
	$Models_GatewayMessageModel.$ctor = function(channel, content) {
		var $this = {};
		$this.channel = null;
		$this.content = null;
		$this.channel = channel;
		$this.content = content;
		return $this;
	};
	global.Models.GatewayMessageModel = $Models_GatewayMessageModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.RegisterServerModel
	var $Models_RegisterServerModel = function() {
	};
	$Models_RegisterServerModel.__typeName = 'Models.RegisterServerModel';
	global.Models.RegisterServerModel = $Models_RegisterServerModel;
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
	$Models_SocketClientMessageModel.__typeName = 'Models.SocketClientMessageModel';
	global.Models.SocketClientMessageModel = $Models_SocketClientMessageModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserCreateResponse
	var $Models_UserCreateResponse = function() {
	};
	$Models_UserCreateResponse.__typeName = 'Models.UserCreateResponse';
	global.Models.UserCreateResponse = $Models_UserCreateResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserDisconnectModel
	var $Models_UserDisconnectModel = function() {
	};
	$Models_UserDisconnectModel.__typeName = 'Models.UserDisconnectModel';
	global.Models.UserDisconnectModel = $Models_UserDisconnectModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserLeaveModel
	var $Models_UserLeaveModel = function() {
	};
	$Models_UserLeaveModel.__typeName = 'Models.UserLeaveModel';
	global.Models.UserLeaveModel = $Models_UserLeaveModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserLogicModel
	var $Models_UserLogicModel = function() {
	};
	$Models_UserLogicModel.__typeName = 'Models.UserLogicModel';
	$Models_UserLogicModel.createInstance = function() {
		return $Models_UserLogicModel.$ctor();
	};
	$Models_UserLogicModel.$ctor = function() {
		var $this = {};
		$this.gateway = null;
		$this.userName = null;
		$this.password = null;
		$this.hash = null;
		$this.currentDebugServer = null;
		$this.currentGameServer = null;
		$this.currentChatServer = null;
		return $this;
	};
	global.Models.UserLogicModel = $Models_UserLogicModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserLoginResponse
	var $Models_UserLoginResponse = function() {
	};
	$Models_UserLoginResponse.__typeName = 'Models.UserLoginResponse';
	global.Models.UserLoginResponse = $Models_UserLoginResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserModel
	var $Models_UserModel = function() {
		this.gateway = null;
		this.userName = null;
		this.password = null;
		this.hash = null;
	};
	$Models_UserModel.__typeName = 'Models.UserModel';
	global.Models.UserModel = $Models_UserModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.UserSocketModel
	var $Models_UserSocketModel = function() {
	};
	$Models_UserSocketModel.__typeName = 'Models.UserSocketModel';
	$Models_UserSocketModel.createInstance = function() {
		return $Models_UserSocketModel.$ctor();
	};
	$Models_UserSocketModel.toUserModel = function($this) {
		var m = $this.localUserModel || ($this.localUserModel = new $Models_UserModel());
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
		m.currentDebugServer = $this.currentDebugServer;
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
		$this.currentDebugServer = null;
		$this.currentGameServer = null;
		$this.currentChatServer = null;
		return $this;
	};
	global.Models.UserSocketModel = $Models_UserSocketModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatMessageRoomModel
	var $Models_ChatManagerModels_ChatMessageRoomModel = function() {
	};
	$Models_ChatManagerModels_ChatMessageRoomModel.__typeName = 'Models.ChatManagerModels.ChatMessageRoomModel';
	global.Models.ChatManagerModels.ChatMessageRoomModel = $Models_ChatManagerModels_ChatMessageRoomModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatMessagesModel
	var $Models_ChatManagerModels_ChatMessagesModel = function() {
	};
	$Models_ChatManagerModels_ChatMessagesModel.__typeName = 'Models.ChatManagerModels.ChatMessagesModel';
	global.Models.ChatManagerModels.ChatMessagesModel = $Models_ChatManagerModels_ChatMessagesModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatRoomInfoModel
	var $Models_ChatManagerModels_ChatRoomInfoModel = function() {
	};
	$Models_ChatManagerModels_ChatRoomInfoModel.__typeName = 'Models.ChatManagerModels.ChatRoomInfoModel';
	global.Models.ChatManagerModels.ChatRoomInfoModel = $Models_ChatManagerModels_ChatRoomInfoModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.ChatRoomModel
	var $Models_ChatManagerModels_ChatRoomModel = function() {
	};
	$Models_ChatManagerModels_ChatRoomModel.__typeName = 'Models.ChatManagerModels.ChatRoomModel';
	global.Models.ChatManagerModels.ChatRoomModel = $Models_ChatManagerModels_ChatRoomModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.CreateChatRoomRequest
	var $Models_ChatManagerModels_CreateChatRoomRequest = function() {
	};
	$Models_ChatManagerModels_CreateChatRoomRequest.__typeName = 'Models.ChatManagerModels.CreateChatRoomRequest';
	global.Models.ChatManagerModels.CreateChatRoomRequest = $Models_ChatManagerModels_CreateChatRoomRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.JoinChatRoomRequest
	var $Models_ChatManagerModels_JoinChatRoomRequest = function() {
	};
	$Models_ChatManagerModels_JoinChatRoomRequest.__typeName = 'Models.ChatManagerModels.JoinChatRoomRequest';
	global.Models.ChatManagerModels.JoinChatRoomRequest = $Models_ChatManagerModels_JoinChatRoomRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.RegisterChatChannelModel
	var $Models_ChatManagerModels_RegisterChatChannelModel = function() {
	};
	$Models_ChatManagerModels_RegisterChatChannelModel.__typeName = 'Models.ChatManagerModels.RegisterChatChannelModel';
	global.Models.ChatManagerModels.RegisterChatChannelModel = $Models_ChatManagerModels_RegisterChatChannelModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.ChatManagerModels.SendChatMessageModel
	var $Models_ChatManagerModels_SendChatMessageModel = function() {
	};
	$Models_ChatManagerModels_SendChatMessageModel.__typeName = 'Models.ChatManagerModels.SendChatMessageModel';
	global.Models.ChatManagerModels.SendChatMessageModel = $Models_ChatManagerModels_SendChatMessageModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.CreateDebugGameRequest
	var $Models_DebugGameManagerModels_CreateDebugGameRequest = function() {
	};
	$Models_DebugGameManagerModels_CreateDebugGameRequest.__typeName = 'Models.DebugGameManagerModels.CreateDebugGameRequest';
	global.Models.DebugGameManagerModels.CreateDebugGameRequest = $Models_DebugGameManagerModels_CreateDebugGameRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugCreateGameRequestModel
	var $Models_DebugGameManagerModels_DebugCreateGameRequestModel = function() {
	};
	$Models_DebugGameManagerModels_DebugCreateGameRequestModel.__typeName = 'Models.DebugGameManagerModels.DebugCreateGameRequestModel';
	$Models_DebugGameManagerModels_DebugCreateGameRequestModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.gameName = null;
		$this.source = null;
		$this.breakPoints = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugCreateGameRequestModel = $Models_DebugGameManagerModels_DebugCreateGameRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugGameAnswerModel
	var $Models_DebugGameManagerModels_DebugGameAnswerModel = function() {
	};
	$Models_DebugGameManagerModels_DebugGameAnswerModel.__typeName = 'Models.DebugGameManagerModels.DebugGameAnswerModel';
	$Models_DebugGameManagerModels_DebugGameAnswerModel.$ctor = function() {
		var $this = {};
		$this.lineNumber = 0;
		$this.value = 0;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugGameAnswerModel = $Models_DebugGameManagerModels_DebugGameAnswerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugGameAnswerQuestionModel
	var $Models_DebugGameManagerModels_DebugGameAnswerQuestionModel = function() {
	};
	$Models_DebugGameManagerModels_DebugGameAnswerQuestionModel.__typeName = 'Models.DebugGameManagerModels.DebugGameAnswerQuestionModel';
	$Models_DebugGameManagerModels_DebugGameAnswerQuestionModel.$ctor = function() {
		var $this = {};
		$this.answer = 0;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugGameAnswerQuestionModel = $Models_DebugGameManagerModels_DebugGameAnswerQuestionModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugGameBreakModel
	var $Models_DebugGameManagerModels_DebugGameBreakModel = function() {
	};
	$Models_DebugGameManagerModels_DebugGameBreakModel.__typeName = 'Models.DebugGameManagerModels.DebugGameBreakModel';
	$Models_DebugGameManagerModels_DebugGameBreakModel.$ctor = function() {
		var $this = {};
		$this.lineNumber = 0;
		$this.variableLookupResult = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugGameBreakModel = $Models_DebugGameManagerModels_DebugGameBreakModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugGameLogModel
	var $Models_DebugGameManagerModels_DebugGameLogModel = function() {
	};
	$Models_DebugGameManagerModels_DebugGameLogModel.__typeName = 'Models.DebugGameManagerModels.DebugGameLogModel';
	$Models_DebugGameManagerModels_DebugGameLogModel.$ctor = function() {
		var $this = {};
		$this.value = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugGameLogModel = $Models_DebugGameManagerModels_DebugGameLogModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugGameRoomModel
	var $Models_DebugGameManagerModels_DebugGameRoomModel = function() {
	};
	$Models_DebugGameManagerModels_DebugGameRoomModel.__typeName = 'Models.DebugGameManagerModels.DebugGameRoomModel';
	$Models_DebugGameManagerModels_DebugGameRoomModel.createInstance = function() {
		return $Models_DebugGameManagerModels_DebugGameRoomModel.$ctor();
	};
	$Models_DebugGameManagerModels_DebugGameRoomModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugGameRoomModel = $Models_DebugGameManagerModels_DebugGameRoomModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugGameSendAnswerModel
	var $Models_DebugGameManagerModels_DebugGameSendAnswerModel = function() {
	};
	$Models_DebugGameManagerModels_DebugGameSendAnswerModel.__typeName = 'Models.DebugGameManagerModels.DebugGameSendAnswerModel';
	$Models_DebugGameManagerModels_DebugGameSendAnswerModel.$ctor = function() {
		var $this = {};
		$this.question = null;
		$this.answers = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugGameSendAnswerModel = $Models_DebugGameManagerModels_DebugGameSendAnswerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebuggerJoinRequestModel
	var $Models_DebugGameManagerModels_DebuggerJoinRequestModel = function() {
	};
	$Models_DebugGameManagerModels_DebuggerJoinRequestModel.__typeName = 'Models.DebugGameManagerModels.DebuggerJoinRequestModel';
	$Models_DebugGameManagerModels_DebuggerJoinRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebuggerJoinRequestModel = $Models_DebugGameManagerModels_DebuggerJoinRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugJoinGameRequestModel
	var $Models_DebugGameManagerModels_DebugJoinGameRequestModel = function() {
	};
	$Models_DebugGameManagerModels_DebugJoinGameRequestModel.__typeName = 'Models.DebugGameManagerModels.DebugJoinGameRequestModel';
	$Models_DebugGameManagerModels_DebugJoinGameRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		$this.user = null;
		return $this;
	};
	global.Models.DebugGameManagerModels.DebugJoinGameRequestModel = $Models_DebugGameManagerModels_DebugJoinGameRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DebugResponse
	var $Models_DebugGameManagerModels_DebugResponse = function() {
	};
	$Models_DebugGameManagerModels_DebugResponse.__typeName = 'Models.DebugGameManagerModels.DebugResponse';
	global.Models.DebugGameManagerModels.DebugResponse = $Models_DebugGameManagerModels_DebugResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.DebugGameManagerModels.DestroyDebugGameRequest
	var $Models_DebugGameManagerModels_DestroyDebugGameRequest = function() {
	};
	$Models_DebugGameManagerModels_DestroyDebugGameRequest.__typeName = 'Models.DebugGameManagerModels.DestroyDebugGameRequest';
	global.Models.DebugGameManagerModels.DestroyDebugGameRequest = $Models_DebugGameManagerModels_DestroyDebugGameRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.CreateGameRequestModel
	var $Models_GameManagerModels_CreateGameRequestModel = function() {
	};
	$Models_GameManagerModels_CreateGameRequestModel.__typeName = 'Models.GameManagerModels.CreateGameRequestModel';
	$Models_GameManagerModels_CreateGameRequestModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.gameName = null;
		return $this;
	};
	global.Models.GameManagerModels.CreateGameRequestModel = $Models_GameManagerModels_CreateGameRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.DebugCreateGameRequestModel
	var $Models_GameManagerModels_DebugCreateGameRequestModel = function() {
	};
	$Models_GameManagerModels_DebugCreateGameRequestModel.__typeName = 'Models.GameManagerModels.DebugCreateGameRequestModel';
	$Models_GameManagerModels_DebugCreateGameRequestModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.gameName = null;
		$this.source = null;
		$this.breakPoints = null;
		return $this;
	};
	global.Models.GameManagerModels.DebugCreateGameRequestModel = $Models_GameManagerModels_DebugCreateGameRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameAnswerModel
	var $Models_GameManagerModels_GameAnswerModel = function() {
	};
	$Models_GameManagerModels_GameAnswerModel.__typeName = 'Models.GameManagerModels.GameAnswerModel';
	$Models_GameManagerModels_GameAnswerModel.$ctor = function() {
		var $this = {};
		$this.lineNumber = 0;
		$this.value = 0;
		return $this;
	};
	global.Models.GameManagerModels.GameAnswerModel = $Models_GameManagerModels_GameAnswerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameAnswerQuestionModel
	var $Models_GameManagerModels_GameAnswerQuestionModel = function() {
	};
	$Models_GameManagerModels_GameAnswerQuestionModel.__typeName = 'Models.GameManagerModels.GameAnswerQuestionModel';
	$Models_GameManagerModels_GameAnswerQuestionModel.$ctor = function() {
		var $this = {};
		$this.answer = 0;
		return $this;
	};
	global.Models.GameManagerModels.GameAnswerQuestionModel = $Models_GameManagerModels_GameAnswerQuestionModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameCreateRequestModel
	var $Models_GameManagerModels_GameCreateRequestModel = function() {
	};
	$Models_GameManagerModels_GameCreateRequestModel.__typeName = 'Models.GameManagerModels.GameCreateRequestModel';
	$Models_GameManagerModels_GameCreateRequestModel.$ctor = function() {
		var $this = {};
		$this.gameType = null;
		$this.players = null;
		return $this;
	};
	global.Models.GameManagerModels.GameCreateRequestModel = $Models_GameManagerModels_GameCreateRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameRoomModel
	var $Models_GameManagerModels_GameRoomModel = function() {
	};
	$Models_GameManagerModels_GameRoomModel.__typeName = 'Models.GameManagerModels.GameRoomModel';
	$Models_GameManagerModels_GameRoomModel.createInstance = function() {
		return $Models_GameManagerModels_GameRoomModel.$ctor();
	};
	$Models_GameManagerModels_GameRoomModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	global.Models.GameManagerModels.GameRoomModel = $Models_GameManagerModels_GameRoomModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.GameSendAnswerModel
	var $Models_GameManagerModels_GameSendAnswerModel = function() {
	};
	$Models_GameManagerModels_GameSendAnswerModel.__typeName = 'Models.GameManagerModels.GameSendAnswerModel';
	$Models_GameManagerModels_GameSendAnswerModel.$ctor = function() {
		var $this = {};
		$this.question = null;
		$this.answers = null;
		return $this;
	};
	global.Models.GameManagerModels.GameSendAnswerModel = $Models_GameManagerModels_GameSendAnswerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.JoinGameRequestModel
	var $Models_GameManagerModels_JoinGameRequestModel = function() {
	};
	$Models_GameManagerModels_JoinGameRequestModel.__typeName = 'Models.GameManagerModels.JoinGameRequestModel';
	$Models_GameManagerModels_JoinGameRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		$this.user = null;
		return $this;
	};
	global.Models.GameManagerModels.JoinGameRequestModel = $Models_GameManagerModels_JoinGameRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.GameManagerModels.StartGameRequestModel
	var $Models_GameManagerModels_StartGameRequestModel = function() {
	};
	$Models_GameManagerModels_StartGameRequestModel.__typeName = 'Models.GameManagerModels.StartGameRequestModel';
	$Models_GameManagerModels_StartGameRequestModel.$ctor = function() {
		var $this = {};
		$this.roomID = null;
		return $this;
	};
	global.Models.GameManagerModels.StartGameRequestModel = $Models_GameManagerModels_StartGameRequestModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.CreateRoomRequest
	var $Models_SiteManagerModels_CreateRoomRequest = function() {
	};
	$Models_SiteManagerModels_CreateRoomRequest.__typeName = 'Models.SiteManagerModels.CreateRoomRequest';
	global.Models.SiteManagerModels.CreateRoomRequest = $Models_SiteManagerModels_CreateRoomRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.DeveloperCreateGameRequest
	var $Models_SiteManagerModels_DeveloperCreateGameRequest = function() {
	};
	$Models_SiteManagerModels_DeveloperCreateGameRequest.__typeName = 'Models.SiteManagerModels.DeveloperCreateGameRequest';
	global.Models.SiteManagerModels.DeveloperCreateGameRequest = $Models_SiteManagerModels_DeveloperCreateGameRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.DeveloperCreateGameResponse
	var $Models_SiteManagerModels_DeveloperCreateGameResponse = function() {
	};
	$Models_SiteManagerModels_DeveloperCreateGameResponse.__typeName = 'Models.SiteManagerModels.DeveloperCreateGameResponse';
	global.Models.SiteManagerModels.DeveloperCreateGameResponse = $Models_SiteManagerModels_DeveloperCreateGameResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.DeveloperUpdateGameRequest
	var $Models_SiteManagerModels_DeveloperUpdateGameRequest = function() {
	};
	$Models_SiteManagerModels_DeveloperUpdateGameRequest.__typeName = 'Models.SiteManagerModels.DeveloperUpdateGameRequest';
	global.Models.SiteManagerModels.DeveloperUpdateGameRequest = $Models_SiteManagerModels_DeveloperUpdateGameRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.DeveloperUpdateGameResponse
	var $Models_SiteManagerModels_DeveloperUpdateGameResponse = function() {
	};
	$Models_SiteManagerModels_DeveloperUpdateGameResponse.__typeName = 'Models.SiteManagerModels.DeveloperUpdateGameResponse';
	global.Models.SiteManagerModels.DeveloperUpdateGameResponse = $Models_SiteManagerModels_DeveloperUpdateGameResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.DoesGameExistRequest
	var $Models_SiteManagerModels_DoesGameExistRequest = function() {
	};
	$Models_SiteManagerModels_DoesGameExistRequest.__typeName = 'Models.SiteManagerModels.DoesGameExistRequest';
	global.Models.SiteManagerModels.DoesGameExistRequest = $Models_SiteManagerModels_DoesGameExistRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.DoesGameExistResponse
	var $Models_SiteManagerModels_DoesGameExistResponse = function() {
	};
	$Models_SiteManagerModels_DoesGameExistResponse.__typeName = 'Models.SiteManagerModels.DoesGameExistResponse';
	global.Models.SiteManagerModels.DoesGameExistResponse = $Models_SiteManagerModels_DoesGameExistResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GameTypeModel
	var $Models_SiteManagerModels_GameTypeModel = function() {
	};
	$Models_SiteManagerModels_GameTypeModel.__typeName = 'Models.SiteManagerModels.GameTypeModel';
	global.Models.SiteManagerModels.GameTypeModel = $Models_SiteManagerModels_GameTypeModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetGamesByUserRequest
	var $Models_SiteManagerModels_GetGamesByUserRequest = function() {
	};
	$Models_SiteManagerModels_GetGamesByUserRequest.__typeName = 'Models.SiteManagerModels.GetGamesByUserRequest';
	global.Models.SiteManagerModels.GetGamesByUserRequest = $Models_SiteManagerModels_GetGamesByUserRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetGamesByUserResponse
	var $Models_SiteManagerModels_GetGamesByUserResponse = function() {
	};
	$Models_SiteManagerModels_GetGamesByUserResponse.__typeName = 'Models.SiteManagerModels.GetGamesByUserResponse';
	global.Models.SiteManagerModels.GetGamesByUserResponse = $Models_SiteManagerModels_GetGamesByUserResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetGameTypesReceivedResponse
	var $Models_SiteManagerModels_GetGameTypesReceivedResponse = function() {
	};
	$Models_SiteManagerModels_GetGameTypesReceivedResponse.__typeName = 'Models.SiteManagerModels.GetGameTypesReceivedResponse';
	global.Models.SiteManagerModels.GetGameTypesReceivedResponse = $Models_SiteManagerModels_GetGameTypesReceivedResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomInfoRequest
	var $Models_SiteManagerModels_GetRoomInfoRequest = function() {
	};
	$Models_SiteManagerModels_GetRoomInfoRequest.__typeName = 'Models.SiteManagerModels.GetRoomInfoRequest';
	global.Models.SiteManagerModels.GetRoomInfoRequest = $Models_SiteManagerModels_GetRoomInfoRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomInfoResponse
	var $Models_SiteManagerModels_GetRoomInfoResponse = function() {
	};
	$Models_SiteManagerModels_GetRoomInfoResponse.__typeName = 'Models.SiteManagerModels.GetRoomInfoResponse';
	global.Models.SiteManagerModels.GetRoomInfoResponse = $Models_SiteManagerModels_GetRoomInfoResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomsRequest
	var $Models_SiteManagerModels_GetRoomsRequest = function() {
	};
	$Models_SiteManagerModels_GetRoomsRequest.__typeName = 'Models.SiteManagerModels.GetRoomsRequest';
	global.Models.SiteManagerModels.GetRoomsRequest = $Models_SiteManagerModels_GetRoomsRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.GetRoomsResponse
	var $Models_SiteManagerModels_GetRoomsResponse = function() {
	};
	$Models_SiteManagerModels_GetRoomsResponse.__typeName = 'Models.SiteManagerModels.GetRoomsResponse';
	global.Models.SiteManagerModels.GetRoomsResponse = $Models_SiteManagerModels_GetRoomsResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.LeaveRoomRequest
	var $Models_SiteManagerModels_LeaveRoomRequest = function() {
	};
	$Models_SiteManagerModels_LeaveRoomRequest.__typeName = 'Models.SiteManagerModels.LeaveRoomRequest';
	global.Models.SiteManagerModels.LeaveRoomRequest = $Models_SiteManagerModels_LeaveRoomRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.RoomJoinRequest
	var $Models_SiteManagerModels_RoomJoinRequest = function() {
	};
	$Models_SiteManagerModels_RoomJoinRequest.__typeName = 'Models.SiteManagerModels.RoomJoinRequest';
	global.Models.SiteManagerModels.RoomJoinRequest = $Models_SiteManagerModels_RoomJoinRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.RoomJoinResponse
	var $Models_SiteManagerModels_RoomJoinResponse = function() {
	};
	$Models_SiteManagerModels_RoomJoinResponse.__typeName = 'Models.SiteManagerModels.RoomJoinResponse';
	global.Models.SiteManagerModels.RoomJoinResponse = $Models_SiteManagerModels_RoomJoinResponse;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.RoomModel
	var $Models_SiteManagerModels_RoomModel = function() {
	};
	$Models_SiteManagerModels_RoomModel.__typeName = 'Models.SiteManagerModels.RoomModel';
	global.Models.SiteManagerModels.RoomModel = $Models_SiteManagerModels_RoomModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.SiteCreateUserRequest
	var $Models_SiteManagerModels_SiteCreateUserRequest = function() {
	};
	$Models_SiteManagerModels_SiteCreateUserRequest.__typeName = 'Models.SiteManagerModels.SiteCreateUserRequest';
	global.Models.SiteManagerModels.SiteCreateUserRequest = $Models_SiteManagerModels_SiteCreateUserRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.SiteLoginRequest
	var $Models_SiteManagerModels_SiteLoginRequest = function() {
	};
	$Models_SiteManagerModels_SiteLoginRequest.__typeName = 'Models.SiteManagerModels.SiteLoginRequest';
	global.Models.SiteManagerModels.SiteLoginRequest = $Models_SiteManagerModels_SiteLoginRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.StartGameRequest
	var $Models_SiteManagerModels_StartGameRequest = function() {
	};
	$Models_SiteManagerModels_StartGameRequest.__typeName = 'Models.SiteManagerModels.StartGameRequest';
	$Models_SiteManagerModels_StartGameRequest.createInstance = function() {
		return {};
	};
	global.Models.SiteManagerModels.StartGameRequest = $Models_SiteManagerModels_StartGameRequest;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutCardState
	var $Models_SiteManagerModels_Game_CardState = function() {
	};
	$Models_SiteManagerModels_Game_CardState.__typeName = 'Models.SiteManagerModels.Game.CardState';
	global.Models.SiteManagerModels.Game.CardState = $Models_SiteManagerModels_Game_CardState;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.EffectHelper
	var $Models_SiteManagerModels_Game_EffectHelper = function() {
	};
	$Models_SiteManagerModels_Game_EffectHelper.__typeName = 'Models.SiteManagerModels.Game.EffectHelper';
	$Models_SiteManagerModels_Game_EffectHelper.getNumber = function(effect, name) {
		for (var $t1 = 0; $t1 < effect.properties.length; $t1++) {
			var effectProperty = effect.properties[$t1];
			if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
				return parseFloat(effectProperty.value.toString());
			}
		}
		return 0;
	};
	$Models_SiteManagerModels_Game_EffectHelper.getString = function(effect, name) {
		for (var $t1 = 0; $t1 < effect.properties.length; $t1++) {
			var effectProperty = effect.properties[$t1];
			if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
				return effectProperty.value.toString();
			}
		}
		return '';
	};
	global.Models.SiteManagerModels.Game.EffectHelper = $Models_SiteManagerModels_Game_EffectHelper;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.EffectType
	var $Models_SiteManagerModels_Game_EffectType = function() {
	};
	$Models_SiteManagerModels_Game_EffectType.__typeName = 'Models.SiteManagerModels.Game.EffectType';
	global.Models.SiteManagerModels.Game.EffectType = $Models_SiteManagerModels_Game_EffectType;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameAreaModel
	var $Models_SiteManagerModels_Game_GameAreaModel = function() {
	};
	$Models_SiteManagerModels_Game_GameAreaModel.__typeName = 'Models.SiteManagerModels.Game.GameAreaModel';
	$Models_SiteManagerModels_Game_GameAreaModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameAreaModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameAreaModel.$ctor = function() {
		var $this = {};
		$this.guid = null;
		$this.name = null;
		$this.top = 0;
		$this.left = 0;
		$this.width = 0;
		$this.height = 0;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameAreaModel = $Models_SiteManagerModels_Game_GameAreaModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameCodeModel
	var $Models_SiteManagerModels_Game_GameCodeModel = function() {
	};
	$Models_SiteManagerModels_Game_GameCodeModel.__typeName = 'Models.SiteManagerModels.Game.GameCodeModel';
	$Models_SiteManagerModels_Game_GameCodeModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameCodeModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameCodeModel.$ctor = function() {
		var $this = {};
		$this.code = null;
		$this.cursorPosition = null;
		$this.code = 'dada';
		$this.cursorPosition = new CommonLibraries.IntPoint(0, 0);
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameCodeModel = $Models_SiteManagerModels_Game_GameCodeModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameEffectModel
	var $Models_SiteManagerModels_Game_GameEffectModel = function() {
	};
	$Models_SiteManagerModels_Game_GameEffectModel.__typeName = 'Models.SiteManagerModels.Game.GameEffectModel';
	$Models_SiteManagerModels_Game_GameEffectModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameEffectModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameEffectModel.$ctor = function() {
		var $this = {};
		$this.guid = null;
		$this.name = null;
		$this.type = 0;
		$this.properties = null;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameEffectModel = $Models_SiteManagerModels_Game_GameEffectModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameEffectPropertyModel
	var $Models_SiteManagerModels_Game_GameEffectPropertyModel = function() {
	};
	$Models_SiteManagerModels_Game_GameEffectPropertyModel.__typeName = 'Models.SiteManagerModels.Game.GameEffectPropertyModel';
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
	global.Models.SiteManagerModels.Game.GameEffectPropertyModel = $Models_SiteManagerModels_Game_GameEffectPropertyModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameEffectPropertyType
	var $Models_SiteManagerModels_Game_GameEffectPropertyType = function() {
	};
	$Models_SiteManagerModels_Game_GameEffectPropertyType.__typeName = 'Models.SiteManagerModels.Game.GameEffectPropertyType';
	global.Models.SiteManagerModels.Game.GameEffectPropertyType = $Models_SiteManagerModels_Game_GameEffectPropertyType;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutModel
	var $Models_SiteManagerModels_Game_GameLayoutModel = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutModel.__typeName = 'Models.SiteManagerModels.Game.GameLayoutModel';
	$Models_SiteManagerModels_Game_GameLayoutModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutModel.$ctor = function() {
		var $this = {};
		$this.width = 0;
		$this.height = 0;
		$this.spaces = null;
		$this.texts = null;
		$this.areas = null;
		$this.width = 25;
		$this.height = 15;
		$this.spaces = [];
		$this.texts = [];
		$this.areas = [];
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameLayoutModel = $Models_SiteManagerModels_Game_GameLayoutModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutScenario
	var $Models_SiteManagerModels_Game_GameLayoutScenario = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutScenario.__typeName = 'Models.SiteManagerModels.Game.GameLayoutScenario';
	$Models_SiteManagerModels_Game_GameLayoutScenario.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutScenario.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutScenario.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.numberOfPlayers = 0;
		$this.screenSize = null;
		$this.spaces = null;
		$this.effects = null;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameLayoutScenario = $Models_SiteManagerModels_Game_GameLayoutScenario;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutScenarioCard
	var $Models_SiteManagerModels_Game_GameLayoutScenarioCard = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutScenarioCard.__typeName = 'Models.SiteManagerModels.Game.GameLayoutScenarioCard';
	$Models_SiteManagerModels_Game_GameLayoutScenarioCard.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutScenarioCard.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutScenarioCard.$ctor = function() {
		var $this = {};
		$this.cardGuid = null;
		$this.value = 0;
		$this.type = 0;
		$this.state = 0;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameLayoutScenarioCard = $Models_SiteManagerModels_Game_GameLayoutScenarioCard;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutScenarioEffect
	var $Models_SiteManagerModels_Game_GameLayoutScenarioEffect = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutScenarioEffect.__typeName = 'Models.SiteManagerModels.Game.GameLayoutScenarioEffect';
	$Models_SiteManagerModels_Game_GameLayoutScenarioEffect.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutScenarioEffect.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutScenarioEffect.$ctor = function() {
		var $this = {};
		$this.effectGuid = null;
		$this.spaceGuids = null;
		$this.cardGuids = null;
		$this.textGuids = null;
		$this.areaGuids = null;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameLayoutScenarioEffect = $Models_SiteManagerModels_Game_GameLayoutScenarioEffect;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameLayoutScenarioSpace
	var $Models_SiteManagerModels_Game_GameLayoutScenarioSpace = function() {
	};
	$Models_SiteManagerModels_Game_GameLayoutScenarioSpace.__typeName = 'Models.SiteManagerModels.Game.GameLayoutScenarioSpace';
	$Models_SiteManagerModels_Game_GameLayoutScenarioSpace.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameLayoutScenarioSpace.$ctor();
	};
	$Models_SiteManagerModels_Game_GameLayoutScenarioSpace.$ctor = function() {
		var $this = {};
		$this.spaceGuid = null;
		$this.cards = null;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameLayoutScenarioSpace = $Models_SiteManagerModels_Game_GameLayoutScenarioSpace;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameModel
	var $Models_SiteManagerModels_Game_GameModel = function() {
	};
	$Models_SiteManagerModels_Game_GameModel.__typeName = 'Models.SiteManagerModels.Game.GameModel';
	$Models_SiteManagerModels_Game_GameModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.userHash = null;
		$this.description = null;
		$this.maxNumberOfPlayers = 0;
		$this.cardImages = null;
		$this.assets = null;
		$this.gameCode = null;
		$this.gameLayout = null;
		$this.gameLayoutScenarios = null;
		$this.effects = null;
		$this._id = null;
		$this.deleted = false;
		$this.gameCode = $Models_SiteManagerModels_Game_GameCodeModel.$ctor();
		$this.cardImages = [];
		$this.assets = [];
		$this.gameLayout = $Models_SiteManagerModels_Game_GameLayoutModel.$ctor();
		$this.gameLayoutScenarios = [];
		$this.effects = [];
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameModel = $Models_SiteManagerModels_Game_GameModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameSpaceLayoutType
	var $Models_SiteManagerModels_Game_GameSpaceLayoutType = function() {
	};
	$Models_SiteManagerModels_Game_GameSpaceLayoutType.__typeName = 'Models.SiteManagerModels.Game.GameSpaceLayoutType';
	global.Models.SiteManagerModels.Game.GameSpaceLayoutType = $Models_SiteManagerModels_Game_GameSpaceLayoutType;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameSpaceModel
	var $Models_SiteManagerModels_Game_GameSpaceModel = function() {
	};
	$Models_SiteManagerModels_Game_GameSpaceModel.__typeName = 'Models.SiteManagerModels.Game.GameSpaceModel';
	$Models_SiteManagerModels_Game_GameSpaceModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameSpaceModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameSpaceModel.$ctor = function() {
		var $this = $Models_SiteManagerModels_Game_GameAreaModel.$ctor();
		$this.layoutType = 0;
		$this.vertical = false;
		$this.resizeType = 0;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameSpaceModel = $Models_SiteManagerModels_Game_GameSpaceModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.GameTextModel
	var $Models_SiteManagerModels_Game_GameTextModel = function() {
	};
	$Models_SiteManagerModels_Game_GameTextModel.__typeName = 'Models.SiteManagerModels.Game.GameTextModel';
	$Models_SiteManagerModels_Game_GameTextModel.createInstance = function() {
		return $Models_SiteManagerModels_Game_GameTextModel.$ctor();
	};
	$Models_SiteManagerModels_Game_GameTextModel.$ctor = function() {
		var $this = {};
		$this.guid = null;
		$this.top = 0;
		$this.left = 0;
		$this.name = null;
		$this.text = null;
		return $this;
	};
	global.Models.SiteManagerModels.Game.GameTextModel = $Models_SiteManagerModels_Game_GameTextModel;
	////////////////////////////////////////////////////////////////////////////////
	// Models.SiteManagerModels.Game.TableSpaceResizeType
	var $Models_SiteManagerModels_Game_TableSpaceResizeType = function() {
	};
	$Models_SiteManagerModels_Game_TableSpaceResizeType.__typeName = 'Models.SiteManagerModels.Game.TableSpaceResizeType';
	global.Models.SiteManagerModels.Game.TableSpaceResizeType = $Models_SiteManagerModels_Game_TableSpaceResizeType;
	ss.initClass($Models_ClientInformation, {});
	ss.initClass($Models_GatewayLoginMessageModel, {});
	ss.initClass($Models_GatewayMessageModel, {});
	ss.initClass($Models_RegisterServerModel, {});
	ss.initClass($Models_SocketClientMessageModel, {
		toString: function() {
			return ss.formatString('Channel: {0}, Content: {1}, User: ({2})', this.channel, this.content, this.user);
		}
	});
	ss.initClass($Models_UserCreateResponse, {});
	ss.initClass($Models_UserDisconnectModel, {});
	ss.initClass($Models_UserLeaveModel, {});
	ss.initClass($Models_UserLogicModel, {});
	ss.initClass($Models_UserLoginResponse, {});
	ss.initClass($Models_UserModel, {
		toString: function() {
			return ss.formatString('Gateway: {0}, UserName: {1}, Password: {2}, Hash: {3}', this.gateway, this.userName, this.password, this.hash);
		}
	});
	ss.initClass($Models_UserSocketModel, {});
	ss.initClass($Models_ChatManagerModels_ChatMessageRoomModel, {});
	ss.initClass($Models_ChatManagerModels_ChatMessagesModel, {});
	ss.initClass($Models_ChatManagerModels_ChatRoomInfoModel, {});
	ss.initClass($Models_ChatManagerModels_ChatRoomModel, {});
	ss.initClass($Models_ChatManagerModels_CreateChatRoomRequest, {});
	ss.initClass($Models_ChatManagerModels_JoinChatRoomRequest, {});
	ss.initClass($Models_ChatManagerModels_RegisterChatChannelModel, {});
	ss.initClass($Models_ChatManagerModels_SendChatMessageModel, {});
	ss.initClass($Models_DebugGameManagerModels_CreateDebugGameRequest, {});
	ss.initClass($Models_DebugGameManagerModels_DebugCreateGameRequestModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugGameAnswerModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugGameAnswerQuestionModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugGameBreakModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugGameLogModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugGameRoomModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugGameSendAnswerModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebuggerJoinRequestModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugJoinGameRequestModel, {});
	ss.initClass($Models_DebugGameManagerModels_DebugResponse, {});
	ss.initClass($Models_DebugGameManagerModels_DestroyDebugGameRequest, {});
	ss.initClass($Models_GameManagerModels_CreateGameRequestModel, {});
	ss.initClass($Models_GameManagerModels_DebugCreateGameRequestModel, {});
	ss.initClass($Models_GameManagerModels_GameAnswerModel, {});
	ss.initClass($Models_GameManagerModels_GameAnswerQuestionModel, {});
	ss.initClass($Models_GameManagerModels_GameCreateRequestModel, {});
	ss.initClass($Models_GameManagerModels_GameRoomModel, {});
	ss.initClass($Models_GameManagerModels_GameSendAnswerModel, {});
	ss.initClass($Models_GameManagerModels_JoinGameRequestModel, {});
	ss.initClass($Models_GameManagerModels_StartGameRequestModel, {});
	ss.initClass($Models_SiteManagerModels_CreateRoomRequest, {});
	ss.initClass($Models_SiteManagerModels_DeveloperCreateGameRequest, {});
	ss.initClass($Models_SiteManagerModels_DeveloperCreateGameResponse, {});
	ss.initClass($Models_SiteManagerModels_DeveloperUpdateGameRequest, {});
	ss.initClass($Models_SiteManagerModels_DeveloperUpdateGameResponse, {});
	ss.initClass($Models_SiteManagerModels_DoesGameExistRequest, {});
	ss.initClass($Models_SiteManagerModels_DoesGameExistResponse, {});
	ss.initClass($Models_SiteManagerModels_GameTypeModel, {});
	ss.initClass($Models_SiteManagerModels_GetGamesByUserRequest, {});
	ss.initClass($Models_SiteManagerModels_GetGamesByUserResponse, {});
	ss.initClass($Models_SiteManagerModels_GetGameTypesReceivedResponse, {});
	ss.initClass($Models_SiteManagerModels_GetRoomInfoRequest, {});
	ss.initClass($Models_SiteManagerModels_GetRoomInfoResponse, {});
	ss.initClass($Models_SiteManagerModels_GetRoomsRequest, {});
	ss.initClass($Models_SiteManagerModels_GetRoomsResponse, {});
	ss.initClass($Models_SiteManagerModels_LeaveRoomRequest, {});
	ss.initClass($Models_SiteManagerModels_RoomJoinRequest, {});
	ss.initClass($Models_SiteManagerModels_RoomJoinResponse, {});
	ss.initClass($Models_SiteManagerModels_RoomModel, {});
	ss.initClass($Models_SiteManagerModels_SiteCreateUserRequest, {});
	ss.initClass($Models_SiteManagerModels_SiteLoginRequest, {});
	ss.initClass($Models_SiteManagerModels_StartGameRequest, {});
	ss.initEnum($Models_SiteManagerModels_Game_CardState, { faceUp: 'faceUp', faceDown: 'faceDown', faceUpIfOwned: 'faceUpIfOwned' });
	ss.initClass($Models_SiteManagerModels_Game_EffectHelper, {});
	ss.initEnum($Models_SiteManagerModels_Game_EffectType, { highlight: 'highlight', rotate: 'rotate', bend: 'bend', styleProperty: 'styleProperty', animated: 'animated' });
	ss.initClass($Models_SiteManagerModels_Game_GameAreaModel, {});
	ss.initClass($Models_SiteManagerModels_Game_GameCodeModel, {});
	ss.initClass($Models_SiteManagerModels_Game_GameEffectModel, {});
	ss.initClass($Models_SiteManagerModels_Game_GameEffectPropertyModel, {});
	ss.initEnum($Models_SiteManagerModels_Game_GameEffectPropertyType, { text: 'text', number: 'number', color: 'color' });
	ss.initClass($Models_SiteManagerModels_Game_GameLayoutModel, {});
	ss.initClass($Models_SiteManagerModels_Game_GameLayoutScenario, {});
	ss.initClass($Models_SiteManagerModels_Game_GameLayoutScenarioCard, {});
	ss.initClass($Models_SiteManagerModels_Game_GameLayoutScenarioEffect, {});
	ss.initClass($Models_SiteManagerModels_Game_GameLayoutScenarioSpace, {});
	ss.initClass($Models_SiteManagerModels_Game_GameModel, {});
	ss.initEnum($Models_SiteManagerModels_Game_GameSpaceLayoutType, { grow: 'grow', static: 'static' });
	ss.initClass($Models_SiteManagerModels_Game_GameSpaceModel, {}, $Models_SiteManagerModels_Game_GameAreaModel);
	ss.initClass($Models_SiteManagerModels_Game_GameTextModel, {});
	ss.initEnum($Models_SiteManagerModels_Game_TableSpaceResizeType, { grow: 'grow', static: 'static' });
})();

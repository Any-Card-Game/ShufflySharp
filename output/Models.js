
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
// Models.UserLoginResponse
var $Models_UserLoginResponse = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Models.UserModel
var $Models_UserModel = function() {
	this.gateway = null;
	this.userName = null;
	this.$1$PasswordField = null;
	this.$1$HashField = null;
};
$Models_UserModel.prototype = {
	get_password: function() {
		return this.$1$PasswordField;
	},
	set_password: function(value) {
		this.$1$PasswordField = value;
	},
	get_hash: function() {
		return this.$1$HashField;
	},
	set_hash: function(value) {
		this.$1$HashField = value;
	},
	toString: function() {
		return String.format('User {{{0} - {1}}}', this.gateway, this.userName);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Models.UserSocketModel
var $Models_UserSocketModel = function() {
	this.gateway = null;
	this.userName = null;
	this.$1$PasswordField = null;
	this.$1$HashField = null;
	this.socket = null;
	this.$localUserModel = null;
};
$Models_UserSocketModel.prototype = {
	get_password: function() {
		return this.$1$PasswordField;
	},
	set_password: function(value) {
		this.$1$PasswordField = value;
	},
	get_hash: function() {
		return this.$1$HashField;
	},
	set_hash: function(value) {
		this.$1$HashField = value;
	},
	toString: function() {
		return String.format('User {{{0} - {1}}}', this.gateway, this.userName);
	},
	toUserModel: function() {
		var m = this.$localUserModel || (this.$localUserModel = new $Models_UserModel());
		m.gateway = this.gateway;
		m.set_hash(this.get_hash());
		m.set_password(this.get_password());
		m.userName = this.userName;
		return m;
	}
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
// Models.SiteManagerModels.SiteLoginRequest
var $Models_SiteManagerModels_SiteLoginRequest = function() {
};
Type.registerClass(global, 'Models.GatewayLoginMessageModel', $Models_GatewayLoginMessageModel, Object);
Type.registerClass(global, 'Models.GatewayMessageModel', $Models_GatewayMessageModel, Object);
Type.registerClass(global, 'Models.SocketClientMessageModel', $Models_SocketClientMessageModel, Object);
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
Type.registerClass(global, 'Models.SiteManagerModels.SiteLoginRequest', $Models_SiteManagerModels_SiteLoginRequest, Object);

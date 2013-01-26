
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
// Models.UserModel
var $Models_UserModel = function() {
	this.gateway = null;
	this.userName = null;
	this.socket = null;
};
$Models_UserModel.prototype = {
	toString: function() {
		return String.format('User {{{0} - {1}}}', this.gateway, this.userName);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.CreateGameRequestModel
var $Models_ShufflyManagerModels_CreateGameRequestModel = function() {
};
$Models_ShufflyManagerModels_CreateGameRequestModel.$ctor = function() {
	var $this = {};
	$this.name = null;
	$this.gameName = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.DebuggerJoinRequestModel
var $Models_ShufflyManagerModels_DebuggerJoinRequestModel = function() {
};
$Models_ShufflyManagerModels_DebuggerJoinRequestModel.$ctor = function() {
	var $this = {};
	$this.roomID = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameAnswerModel
var $Models_ShufflyManagerModels_GameAnswerModel = function() {
};
$Models_ShufflyManagerModels_GameAnswerModel.$ctor = function() {
	var $this = {};
	$this.lineNumber = 0;
	$this.value = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameAnswerQuestionModel
var $Models_ShufflyManagerModels_GameAnswerQuestionModel = function() {
};
$Models_ShufflyManagerModels_GameAnswerQuestionModel.$ctor = function() {
	var $this = {};
	$this.answer = 0;
	$this.roomID = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameAnswerRequestModel
var $Models_ShufflyManagerModels_GameAnswerRequestModel = function() {
};
$Models_ShufflyManagerModels_GameAnswerRequestModel.$ctor = function() {
	var $this = {};
	$this.answer = 0;
	$this.roomID = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameRoomModel
var $Models_ShufflyManagerModels_GameRoomModel = function() {
};
$Models_ShufflyManagerModels_GameRoomModel.createInstance = function() {
	return $Models_ShufflyManagerModels_GameRoomModel.$ctor();
};
$Models_ShufflyManagerModels_GameRoomModel.$ctor = function() {
	var $this = {};
	$this.roomID = null;
	$this.gameServer = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameSendAnswerModel
var $Models_ShufflyManagerModels_GameSendAnswerModel = function() {
};
$Models_ShufflyManagerModels_GameSendAnswerModel.$ctor = function() {
	var $this = {};
	$this.question = null;
	$this.answers = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameSourceRequestModel
var $Models_ShufflyManagerModels_GameSourceRequestModel = function() {
};
$Models_ShufflyManagerModels_GameSourceRequestModel.$ctor = function() {
	var $this = {};
	$this.gameName = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.GameSourceResponseModel
var $Models_ShufflyManagerModels_GameSourceResponseModel = function() {
};
$Models_ShufflyManagerModels_GameSourceResponseModel.$ctor = function() {
	var $this = {};
	$this.content = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.JoinGameRequestModel
var $Models_ShufflyManagerModels_JoinGameRequestModel = function() {
};
$Models_ShufflyManagerModels_JoinGameRequestModel.$ctor = function() {
	var $this = {};
	$this.roomID = null;
	$this.user = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.ShufflyManagerModels.StartGameRequestModel
var $Models_ShufflyManagerModels_StartGameRequestModel = function() {
};
$Models_ShufflyManagerModels_StartGameRequestModel.$ctor = function() {
	var $this = {};
	$this.roomID = null;
	return $this;
};
Type.registerClass(global, 'Models.GatewayLoginMessageModel', $Models_GatewayLoginMessageModel, Object);
Type.registerClass(global, 'Models.GatewayMessageModel', $Models_GatewayMessageModel, Object);
Type.registerClass(global, 'Models.SocketClientMessageModel', $Models_SocketClientMessageModel, Object);
Type.registerClass(global, 'Models.UserModel', $Models_UserModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.CreateGameRequestModel', $Models_ShufflyManagerModels_CreateGameRequestModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.DebuggerJoinRequestModel', $Models_ShufflyManagerModels_DebuggerJoinRequestModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameAnswerModel', $Models_ShufflyManagerModels_GameAnswerModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameAnswerQuestionModel', $Models_ShufflyManagerModels_GameAnswerQuestionModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameAnswerRequestModel', $Models_ShufflyManagerModels_GameAnswerRequestModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameRoomModel', $Models_ShufflyManagerModels_GameRoomModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameSendAnswerModel', $Models_ShufflyManagerModels_GameSendAnswerModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameSourceRequestModel', $Models_ShufflyManagerModels_GameSourceRequestModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.GameSourceResponseModel', $Models_ShufflyManagerModels_GameSourceResponseModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.JoinGameRequestModel', $Models_ShufflyManagerModels_JoinGameRequestModel, Object);
Type.registerClass(global, 'Models.ShufflyManagerModels.StartGameRequestModel', $Models_ShufflyManagerModels_StartGameRequestModel, Object);

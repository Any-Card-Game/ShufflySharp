////////////////////////////////////////////////////////////////////////////////
// Models.CreateGameRequestModel
var $Models_CreateGameRequestModel = function() {
};
$Models_CreateGameRequestModel.createInstance = function() {
	return $Models_CreateGameRequestModel.$ctor();
};
$Models_CreateGameRequestModel.$ctor = function() {
	var $this = {};
	$this.name = null;
	$this.gameName = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.DebuggerJoinRequestModel
var $Models_DebuggerJoinRequestModel = function() {
};
$Models_DebuggerJoinRequestModel.$ctor = function(roomId) {
	var $this = {};
	$this.roomID = null;
	$this.roomID = roomId;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameAnswerQuestionModel
var $Models_GameAnswerQuestionModel = function() {
};
$Models_GameAnswerQuestionModel.createInstance = function() {
	return $Models_GameAnswerQuestionModel.$ctor();
};
$Models_GameAnswerQuestionModel.$ctor1 = function(roomId, answer) {
	var $this = {};
	$this.answer = 0;
	$this.roomID = null;
	$this.roomID = roomId;
	$this.answer = answer;
	return $this;
};
$Models_GameAnswerQuestionModel.$ctor = function() {
	var $this = {};
	$this.answer = 0;
	$this.roomID = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameAnswerRequestModel
var $Models_GameAnswerRequestModel = function() {
	this.answer = 0;
	this.roomID = null;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameSendAnswerModel
var $Models_GameSendAnswerModel = function() {
};
$Models_GameSendAnswerModel.createInstance = function() {
	return $Models_GameSendAnswerModel.$ctor();
};
$Models_GameSendAnswerModel.$ctor = function() {
	var $this = {};
	$this.question = null;
	$this.answers = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameSourceRequestModel
var $Models_GameSourceRequestModel = function() {
};
$Models_GameSourceRequestModel.$ctor = function(name) {
	var $this = {};
	$this.gameName = null;
	$this.gameName = name;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameSourceResponseModel
var $Models_GameSourceResponseModel = function(content) {
	this.content = null;
	this.content = content;
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
// Models.JoinGameRequestModel
var $Models_JoinGameRequestModel = function() {
};
$Models_JoinGameRequestModel.$ctor = function(roomId, user) {
	var $this = {};
	$this.roomID = null;
	$this.user = null;
	$this.roomID = roomId;
	$this.user = user;
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
// Models.StartGameRequestModel
var $Models_StartGameRequestModel = function() {
};
$Models_StartGameRequestModel.$ctor = function(roomId) {
	var $this = {};
	$this.roomID = null;
	$this.roomID = roomId;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.UserModel
var $Models_UserModel = function() {
	this.gateway = null;
	this.userName = null;
	this.socket = null;
};
Type.registerClass(global, 'Models.CreateGameRequestModel', $Models_CreateGameRequestModel, Object);
Type.registerClass(global, 'Models.DebuggerJoinRequestModel', $Models_DebuggerJoinRequestModel, Object);
Type.registerClass(global, 'Models.GameAnswerQuestionModel', $Models_GameAnswerQuestionModel, Object);
Type.registerClass(global, 'Models.GameAnswerRequestModel', $Models_GameAnswerRequestModel, Object);
Type.registerClass(global, 'Models.GameSendAnswerModel', $Models_GameSendAnswerModel, Object);
Type.registerClass(global, 'Models.GameSourceRequestModel', $Models_GameSourceRequestModel, Object);
Type.registerClass(global, 'Models.GameSourceResponseModel', $Models_GameSourceResponseModel, Object);
Type.registerClass(global, 'Models.GatewayLoginMessageModel', $Models_GatewayLoginMessageModel, Object);
Type.registerClass(global, 'Models.GatewayMessageModel', $Models_GatewayMessageModel, Object);
Type.registerClass(global, 'Models.JoinGameRequestModel', $Models_JoinGameRequestModel, Object);
Type.registerClass(global, 'Models.SocketClientMessageModel', $Models_SocketClientMessageModel, Object);
Type.registerClass(global, 'Models.StartGameRequestModel', $Models_StartGameRequestModel, Object);
Type.registerClass(global, 'Models.UserModel', $Models_UserModel, Object);

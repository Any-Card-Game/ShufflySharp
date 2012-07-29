Type.registerNamespace('Models');
////////////////////////////////////////////////////////////////////////////////
// Models.CreateGameRequestModel
Models.CreateGameRequestModel = function() {
};
Models.CreateGameRequestModel.$ctor = function() {
	var $this = {};
	$this.name = null;
	$this.gameName = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.DebuggerJoinRequestModel
Models.DebuggerJoinRequestModel = function() {
};
Models.DebuggerJoinRequestModel.$ctor = function(roomId) {
	var $this = {};
	$this.roomID = null;
	$this.roomID = roomId;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameAnswerQuestionModel
Models.GameAnswerQuestionModel = function() {
};
Models.GameAnswerQuestionModel.$ctor1 = function(roomId, answer) {
	var $this = {};
	$this.answer = 0;
	$this.roomID = null;
	$this.roomID = roomId;
	$this.answer = answer;
	return $this;
};
Models.GameAnswerQuestionModel.$ctor = function() {
	var $this = {};
	$this.answer = 0;
	$this.roomID = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameAnswerRequestModel
Models.GameAnswerRequestModel = function() {
	this.answer = 0;
	this.roomID = null;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameSendAnswerModel
Models.GameSendAnswerModel = function() {
};
Models.GameSendAnswerModel.$ctor = function() {
	var $this = {};
	$this.question = null;
	$this.answers = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameSourceRequestModel
Models.GameSourceRequestModel = function() {
};
Models.GameSourceRequestModel.$ctor = function(name) {
	var $this = {};
	$this.gameName = null;
	$this.gameName = name;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GameSourceResponseModel
Models.GameSourceResponseModel = function(content) {
	this.content = null;
	this.content = content;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GatewayLoginMessageModel
Models.GatewayLoginMessageModel = function() {
};
Models.GatewayLoginMessageModel.$ctor = function() {
	var $this = {};
	$this.userName = null;
	$this.password = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GatewayMessageModel
Models.GatewayMessageModel = function() {
};
Models.GatewayMessageModel.$ctor = function(channel, content, gameServer) {
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
Models.JoinGameRequestModel = function() {
};
Models.JoinGameRequestModel.$ctor = function(roomId, user) {
	var $this = {};
	$this.roomID = null;
	$this.user = null;
	$this.roomID = roomId;
	$this.user = user;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.SocketClientMessageModel
Models.SocketClientMessageModel = function(user, channel, content) {
	this.user = null;
	this.channel = null;
	this.content = null;
	this.user = user;
	this.channel = channel;
	this.content = content;
};
////////////////////////////////////////////////////////////////////////////////
// Models.StartGameRequestModel
Models.StartGameRequestModel = function() {
};
Models.StartGameRequestModel.$ctor = function(roomId) {
	var $this = {};
	$this.roomID = null;
	$this.roomID = roomId;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.UserModel
Models.UserModel = function() {
	this.gateway = null;
	this.userName = null;
	this.socket = null;
};
Models.CreateGameRequestModel.registerClass('Models.CreateGameRequestModel', Object);
Models.DebuggerJoinRequestModel.registerClass('Models.DebuggerJoinRequestModel', Object);
Models.GameAnswerQuestionModel.registerClass('Models.GameAnswerQuestionModel', Object);
Models.GameAnswerRequestModel.registerClass('Models.GameAnswerRequestModel', Object);
Models.GameSendAnswerModel.registerClass('Models.GameSendAnswerModel', Object);
Models.GameSourceRequestModel.registerClass('Models.GameSourceRequestModel', Object);
Models.GameSourceResponseModel.registerClass('Models.GameSourceResponseModel', Object);
Models.GatewayLoginMessageModel.registerClass('Models.GatewayLoginMessageModel', Object);
Models.GatewayMessageModel.registerClass('Models.GatewayMessageModel', Object);
Models.JoinGameRequestModel.registerClass('Models.JoinGameRequestModel', Object);
Models.SocketClientMessageModel.registerClass('Models.SocketClientMessageModel', Object);
Models.StartGameRequestModel.registerClass('Models.StartGameRequestModel', Object);
Models.UserModel.registerClass('Models.UserModel', Object);

Type.registerNamespace('Models');
////////////////////////////////////////////////////////////////////////////////
// Models.GameAnswerQuestionModel
Models.GameAnswerQuestionModel = function() {
};
Models.GameAnswerQuestionModel.$ctor1 = function(roomId, answer) {
	var $this = {};
	$this.answer = null;
	$this.roomID = null;
	$this.roomID = roomId;
	$this.answer = answer;
	return $this;
};
Models.GameAnswerQuestionModel.$ctor = function() {
	var $this = {};
	$this.answer = null;
	$this.roomID = null;
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
// Models.JoinGameRequest
Models.JoinGameRequest = function() {
};
Models.JoinGameRequest.$ctor = function(roomId) {
	var $this = {};
	$this.roomID = null;
	$this.roomID = roomId;
	return $this;
};
Models.GameAnswerQuestionModel.registerClass('Models.GameAnswerQuestionModel', Object);
Models.GameSourceRequestModel.registerClass('Models.GameSourceRequestModel', Object);
Models.GameSourceResponseModel.registerClass('Models.GameSourceResponseModel', Object);
Models.GatewayMessageModel.registerClass('Models.GatewayMessageModel', Object);
Models.JoinGameRequest.registerClass('Models.JoinGameRequest', Object);

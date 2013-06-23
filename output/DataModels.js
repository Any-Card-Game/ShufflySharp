
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// DataModels.ChatManagerModels.ChatRoomDataModel
	var $DataModels_ChatManagerModels_ChatRoomDataModel = function() {
	};
	$DataModels_ChatManagerModels_ChatRoomDataModel.toModel = function($this) {
		return { roomName: $this.roomName, users: $this.users, messages: $this.messages };
	};
	////////////////////////////////////////////////////////////////////////////////
	// DataModels.GameManagerModels.GameInfoDataModel
	var $DataModels_GameManagerModels_GameInfoDataModel = function() {
	};
	$DataModels_GameManagerModels_GameInfoDataModel.createInstance = function() {
		return $DataModels_GameManagerModels_GameInfoDataModel.$ctor();
	};
	$DataModels_GameManagerModels_GameInfoDataModel.$ctor = function() {
		var $this = NodeLibraries.MongoDB.MongoDocument.$ctor();
		$this.answerIndex = 0;
		$this.gameName = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// DataModels.SiteManagerModels.RoomDataModel
	var $DataModels_SiteManagerModels_RoomDataModel = function() {
	};
	$DataModels_SiteManagerModels_RoomDataModel.toModel = function($this) {
		return { gameType: $this.gameType, roomName: $this.roomName, chatChannel: $this.chatChannel, gameChannel: $this.gameChannel, players: $this.players, chatServer: $this.chatServer, gameServer: $this.gameServer, id: $this._id };
	};
	////////////////////////////////////////////////////////////////////////////////
	// DataModels.SiteManagerModels.UserModelData
	var $DataModels_SiteManagerModels_UserModelData = function() {
	};
	$DataModels_SiteManagerModels_UserModelData.createInstance = function() {
		return $DataModels_SiteManagerModels_UserModelData.$ctor();
	};
	$DataModels_SiteManagerModels_UserModelData.$ctor = function() {
		var $this = NodeLibraries.MongoDB.MongoDocument.$ctor();
		$this.username = null;
		$this.password = null;
		return $this;
	};
	ss.registerClass(global, 'DataModels.ChatManagerModels.ChatRoomDataModel', $DataModels_ChatManagerModels_ChatRoomDataModel, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.GameManagerModels.GameInfoDataModel', $DataModels_GameManagerModels_GameInfoDataModel, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.SiteManagerModels.RoomDataModel', $DataModels_SiteManagerModels_RoomDataModel, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.SiteManagerModels.UserModelData', $DataModels_SiteManagerModels_UserModelData, NodeLibraries.MongoDB.MongoDocument);
})();

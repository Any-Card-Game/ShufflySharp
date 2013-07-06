
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
	////////////////////////////////////////////////////////////////////////////////
	// DataModels.SiteManagerModels.Game.GameDataModel
	var $DataModels_SiteManagerModels_Game_GameDataModel = function() {
	};
	$DataModels_SiteManagerModels_Game_GameDataModel.createInstance = function() {
		return $DataModels_SiteManagerModels_Game_GameDataModel.$ctor();
	};
	$DataModels_SiteManagerModels_Game_GameDataModel.toModel = function($this) {
		var $t1 = Models.SiteManagerModels.Game.GameModel.$ctor();
		$t1._id = $this._id;
		$t1.name = $this.name;
		$t1.userHash = $this.userHash;
		$t1.description = $this.description;
		$t1.maxNumberOfPlayers = $this.maxNumberOfPlayers;
		$t1.cardImages = $this.cardImages;
		$t1.assets = $this.assets;
		$t1.gameCode = $this.gameCode;
		$t1.gameLayout = $this.gameLayout;
		$t1.gameLayoutScenarios = $this.gameLayoutScenarios;
		$t1.effects = $this.effects;
		$t1.deleted = $this.deleted;
		return $t1;
	};
	$DataModels_SiteManagerModels_Game_GameDataModel.$ctor = function() {
		var $this = NodeLibraries.MongoDB.MongoDocument.$ctor();
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
		$this.deleted = false;
		return $this;
	};
	ss.registerClass(global, 'DataModels.ChatManagerModels.ChatRoomDataModel', $DataModels_ChatManagerModels_ChatRoomDataModel, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.GameManagerModels.GameInfoDataModel', $DataModels_GameManagerModels_GameInfoDataModel, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.SiteManagerModels.RoomDataModel', $DataModels_SiteManagerModels_RoomDataModel, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.SiteManagerModels.UserModelData', $DataModels_SiteManagerModels_UserModelData, NodeLibraries.MongoDB.MongoDocument);
	ss.registerClass(global, 'DataModels.SiteManagerModels.Game.GameDataModel', $DataModels_SiteManagerModels_Game_GameDataModel, NodeLibraries.MongoDB.MongoDocument);
})();

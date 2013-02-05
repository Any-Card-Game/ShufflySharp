
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// MongoDBLibrary.MongoDocument
	var $MongoDBLibrary_MongoDocument = function() {
	};
	$MongoDBLibrary_MongoDocument.createInstance = function() {
		return $MongoDBLibrary_MongoDocument.$ctor();
	};
	$MongoDBLibrary_MongoDocument.get_objectID = function() {
		return $MongoDBLibrary_MongoDocument.$1$ObjectIDField;
	};
	$MongoDBLibrary_MongoDocument.set_objectID = function(value) {
		$MongoDBLibrary_MongoDocument.$1$ObjectIDField = value;
	};
	$MongoDBLibrary_MongoDocument.getID = function(id) {
		if (ss.isNullOrUndefined(id)) {
			return null;
		}
		if (ss.referenceEquals(Type.getInstanceType(id), String)) {
			return $MongoDBLibrary_MongoDocument.get_objectID()(id);
		}
		return id;
	};
	$MongoDBLibrary_MongoDocument.$ctor = function() {
		var $this = {};
		$this._id = null;
		return $this;
	};
	Type.registerClass(global, 'MongoDBLibrary.MongoDocument', $MongoDBLibrary_MongoDocument, Object);
	$MongoDBLibrary_MongoDocument.$1$ObjectIDField = null;
	$MongoDBLibrary_MongoDocument.set_objectID(require('bson').ObjectID);
})();

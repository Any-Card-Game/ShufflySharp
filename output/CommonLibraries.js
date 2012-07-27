Type.registerNamespace('CommonLibraries');
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.GameAnswer
CommonLibraries.GameAnswer = function() {
	this.value = 0;
	this.lineNumber = 0;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Guid
CommonLibraries.Guid = function() {
};
CommonLibraries.Guid.newGuid = function() {
	var guid = '';
	for (var i = 0; i < 12; i++) {
		guid += String.fromCharCode((parseInt((Math.random() * 26 + 65).toString())));
	}
	return guid;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Size
CommonLibraries.Size = function() {
	this.width = 0;
	this.height = 0;
};
CommonLibraries.GameAnswer.registerClass('CommonLibraries.GameAnswer', Object);
CommonLibraries.Guid.registerClass('CommonLibraries.Guid', Object);
CommonLibraries.Size.registerClass('CommonLibraries.Size', Object);

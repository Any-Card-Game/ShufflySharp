require('./mscorlib.js');
////////////////////////////////////////////////////////////////////////////////
// SiteServer.SiteServer
var $SiteServer_SiteServer = function() {
};
$SiteServer_SiteServer.main = function() {
	try {
		new $SiteServer_SiteServer();
	}
	catch ($t1) {
		var exc = ss.Exception.wrap($t1);
		console.log('CRITICAL FAILURE: ' + exc.toString());
	}
};
Type.registerClass(global, 'SiteServer.SiteServer', $SiteServer_SiteServer, Object);
$SiteServer_SiteServer.main();

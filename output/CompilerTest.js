require("./mscorlib.node.debug.js");


Type.registerNamespace('Client');
////////////////////////////////////////////////////////////////////////////////
// Client.Class
Client.Class = function() {
	this.$1$fmsintField = null;
	this.set_fmsint(new Array(10));
	var $t1 = this.get_fmsint().getEnumerator();
	try {
		while ($t1.moveNext()) {
			var i = $t1.get_current();
			console.log(i);
		}
	}
	finally {
		$t1.dispose();
	}
	console.log('--');
};
Client.Class.prototype = {
	get_fmsint: function() {
		return this.$1$fmsintField;
	},
	set_fmsint: function(value) {
		this.$1$fmsintField = value;
	}
};
Client.Class.registerClass('Client.Class', Object);

new Client.Class();
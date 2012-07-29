Type.registerNamespace('global');
////////////////////////////////////////////////////////////////////////////////
// global._
global._ = function() {
};
global._.numbers = function(start, finish) {
	var items = new Array(finish - start);
	for (var i = 0; i < finish - start; i++) {
		items[i] = start + i;
	}
	return items;
};
global._.clone = function(obj) {
	if (ss.isNullOrUndefined(obj) || ss.referenceEquals((Type.getInstanceType(obj)), Object)) {
		return obj;
	}
	var ob = Type.cast(obj, Object);
	var temp;
	if (Type.isInstanceOfType(obj, Array)) {
		temp = [];
	}
	else {
		temp = new Object();
	}
	var $t1 = (Object.keys(ob)).getEnumerator();
	try {
		while ($t1.moveNext()) {
			var key = $t1.get_current();
			temp[key] = global._.clone(ob[key]);
		}
	}
	finally {
		if (Type.isInstanceOfType($t1, ss.IDisposable)) {
			Type.cast($t1, ss.IDisposable).dispose();
		}
	}
	return temp;
};
global._.floor = function(j) {
	return ss.Int32.trunc(j);
};
global._.random = function() {
	return Math.random();
};
////////////////////////////////////////////////////////////////////////////////
// global.shuff
global.shuff = function() {
};
global.shuff.askQuestion = function(user, question, answers, cardGame) {
	cardGame.emulating = false;
	if (cardGame.answers.length - 1 > cardGame.answerIndex) {
		cardGame.emulating = true;
		return (cardGame.answers[cardGame.answerIndex++]).value;
		//todo .value
	}
	var m = { user: user, question: question, answers: answers, cardGame: cardGame };
	var answer = yield({ type: 'askQuestion', question: m });
	cardGame.answerIndex++;
	return (ss.isNullOrUndefined(answer) ? 0 : answer.value);
};
global.shuff.declareWinner = function(user) {
	yield({ type: 'gameOver' });
};
global.shuff.log = function(msg) {
	yield({ type: 'log', contents: msg });
};
global.shuff.break_ = function(lineNumber, cardGame, varLookup) {
	if (cardGame.emulating) {
		return;
	}
	var $t1 = global.YieldObject.$ctor();
	$t1.type = 'break';
	$t1.lineNumber = lineNumber - 1;
	$t1.value = '';
	var yieldObject = $t1;
	while (true) {
		var answ = yield(yieldObject);
		if (ss.Nullable.unbox(Type.cast(ss.isNullOrUndefined(answ), Boolean))) {
			//continue
			return;
		}
		if (ss.Nullable.unbox(Type.cast(answ.variableLookup, Boolean))) {
			yieldObject.type = 'variableLookup';
			yieldObject.value = varLookup(Type.cast(answ.variableLookup, String));
			yieldObject.lineNumber = 0;
			continue;
		}
		break;
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.YieldObject
global.YieldObject = function() {
};
global.YieldObject.$ctor = function() {
	var $this = {};
	$this.type = null;
	$this.lineNumber = 0;
	$this.value = null;
	return $this;
};
Type.registerNamespace('ShufflyGameLibrary');
////////////////////////////////////////////////////////////////////////////////
// ShufflyGameLibrary.CardGameAnswer
ShufflyGameLibrary.CardGameAnswer = function() {
	this.value = 0;
};
////////////////////////////////////////////////////////////////////////////////
// ShufflyGameLibrary.GameCardGameSpace
ShufflyGameLibrary.GameCardGameSpace = function() {
};
////////////////////////////////////////////////////////////////////////////////
// ShufflyGameLibrary.GameCardGameTextArea
ShufflyGameLibrary.GameCardGameTextArea = function() {
};
global._.registerClass('global._', Object);
global.shuff.registerClass('global.shuff', Object);
global.YieldObject.registerClass('global.YieldObject', Object);
ShufflyGameLibrary.CardGameAnswer.registerClass('ShufflyGameLibrary.CardGameAnswer', Object);
ShufflyGameLibrary.GameCardGameSpace.registerClass('ShufflyGameLibrary.GameCardGameSpace', Object);
ShufflyGameLibrary.GameCardGameTextArea.registerClass('ShufflyGameLibrary.GameCardGameTextArea', Object);

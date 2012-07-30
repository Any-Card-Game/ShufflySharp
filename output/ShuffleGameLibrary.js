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
	if (ss.Nullable.unbox(Type.cast(ss.isNullOrUndefined(obj) || !Type.isInstanceOfType(obj, Array) && (!ss.referenceEquals((Type.getInstanceType(obj)), Object) && (eval('({}).toString.call(obj) != \'[object Function]\''))), Boolean))) {
		return obj;
	}
	var ob = Type.cast(obj, Object);
	var temp = null;
	//::dynamic okay
	if (Type.isInstanceOfType(obj, Array)) {
		temp = [];
		//::dynamic okay
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
// global.ArrayUtils
global.ArrayUtils = function() {
	eval('Array.prototype.foreach=function(does){return global.ArrayUtils.forEach(this,does);};');
	eval('Array.prototype.sortCards=function(){return global.ArrayUtils.sortCards(this);};');
	eval('Array.prototype.where=function(does){return global.ArrayUtils.where(this,does);};');
	eval('Array.prototype.any=function(does){return global.ArrayUtils.any(this,does);};');
};
global.ArrayUtils.forEach = function(ts, does) {
	for (var i = 0; i < ts.length; i++) {
		var df = does(ts[i], i);
		if (df) {
			return df;
		}
	}
	return false;
};
global.ArrayUtils.select = function(T, T2) {
	return function(ts, does) {
		var ts2 = new Array(ts.length);
		for (var i = 0; i < ts.length; i++) {
			ts2[i] = does(ts[i]);
		}
		return ts2;
	};
};
global.ArrayUtils.sortCards = function(ts) {
	debugger;;
	var ijc = global.ArrayUtils.groupBy(global.Card, ss.Int32).call(null, ts, function(a) {
		return a.type;
	});
	var ij = global.ArrayUtils.select(Type.makeGenericType(global.ArrayUtils$GroupByKey$2, [global.Card, ss.Int32]), Array).call(null, ijc, function(a1) {
		a1.items.sort(function(b, c) {
			return b.value - c.value;
		});
		return a1.items;
	});
	var items = new Array(ts.length);
	var jf = 0;
	for (var $t1 = 0; $t1 < ij.length; $t1++) {
		var cardGameCard = ij[$t1];
		var $t2 = cardGameCard.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var gameCard = $t2.get_current();
				items[jf++] = gameCard;
			}
		}
		finally {
			if (Type.isInstanceOfType($t2, ss.IDisposable)) {
				Type.cast($t2, ss.IDisposable).dispose();
			}
		}
	}
	for (var i = 0; i < items.length; i++) {
		ts[i] = items[i];
	}
	return items;
};
global.ArrayUtils.groupBy = function(T, T2) {
	return function(ts, does) {
		var items = new Array();
		for (var $t1 = 0; $t1 < ts.length; $t1++) {
			var t = ts[$t1];
			var t2 = does(t);
			var good = false;
			var $t2 = items.getEnumerator();
			try {
				while ($t2.moveNext()) {
					var item = $t2.get_current();
					if (ss.Nullable.unbox(Type.cast(ss.referenceEquals(item.key, t2), Boolean))) {
						item.items.add(t);
						good = true;
						break;
					}
				}
			}
			finally {
				if (Type.isInstanceOfType($t2, ss.IDisposable)) {
					Type.cast($t2, ss.IDisposable).dispose();
				}
			}
			if (!good) {
				items.add(new (Type.makeGenericType(global.ArrayUtils$GroupByKey$2, [T, T2]))(t2, ([ t ])));
			}
		}
		return Type.cast((items), Array);
	};
};
global.ArrayUtils.where = function(ts, does) {
	var jf = new Array();
	for (var i = 0; i < ts.length; i++) {
		if (does(ts[i], i)) {
			jf.add(ts[i]);
		}
	}
	return jf;
};
global.ArrayUtils.any = function(ts, does) {
	var jf = new Array();
	for (var i = 0; i < ts.length; i++) {
		if (does(ts[i], i)) {
			return true;
		}
	}
	return false;
};
////////////////////////////////////////////////////////////////////////////////
// global.ArrayUtils$GroupByKey$2
global.ArrayUtils$GroupByKey$2 = function(T, T2) {
	var $type = function(key, items) {
		this.key = T2.getDefaultValue();
		this.items = null;
		this.key = key;
		this.items = items;
	};
	$type.registerGenericClassInstance($type, global.ArrayUtils$GroupByKey$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
global.ArrayUtils$GroupByKey$2.registerGenericClass('global.ArrayUtils$GroupByKey$2', 2);
////////////////////////////////////////////////////////////////////////////////
// global.Card
global.Card = function(value, type) {
	this.value = 0;
	this.type = 0;
	this.state = 0;
	this.effects = null;
	this.value = value;
	this.type = type;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGame
global.CardGame = function(options) {
	this.emulating = false;
	this.name = null;
	this.answerIndex = 0;
	this.spaces = null;
	this.textAreas = null;
	this.size = null;
	this.answers = null;
	this.users = null;
	this.deck = null;
	this.numberOfCards = 0;
	this.numberOfJokers = 0;
	this.spaces = new Array();
	this.textAreas = new Array();
	this.answers = new Array();
	this.users = new Array();
	this.numberOfCards = ((options.numberOfCards === 0) ? 52 : options.numberOfCards);
	this.numberOfJokers = ((options.numberOfJokers === 0) ? 52 : options.numberOfJokers);
	this.deck = new global.Pile('deck');
	for (var i = 0; i < this.numberOfCards; i++) {
		this.deck.cards.add(new global.Card(i % 13, Math.floor(ss.Int32.div(i, 13))));
	}
	for (var i1 = 0; i1 < this.numberOfJokers; i1++) {
		this.deck.cards.add(new global.Card(0, 0));
	}
	var $t1 = new CommonLibraries.Size();
	$t1.width = 16;
	$t1.height = 12;
	this.size = $t1;
	//
	//           
	//
	//    this.setAnswers = function (answers) {
	//
	//           
	//
	//    this.answers = answers;
	//
	//           
	//
	//    };
};
global.CardGame.prototype = {
	setAnswers: function(answers) {
		this.answers = answers;
	},
	setPlayers: function(players) {
		this.users = new Array();
		if (ss.isNullOrUndefined(players) || players.length === 0) {
			return;
		}
		if (players.length > 6) {
			players.removeRange(6, players.length - 6);
		}
		for (var j = 0; j < players.length; j++) {
			this.users.add(new global.User((players[j]).userName));
		}
	},
	dealCards: function(numberOfCards, state) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAnswer
global.CardGameAnswer = function() {
	this.value = 0;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameArea
global.CardGameArea = function() {
};
global.CardGameArea.$ctor = function() {
	var $this = {};
	$this.size = null;
	$this.spaces = null;
	$this.textAreas = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameEffectBendOptions
global.CardGameEffectBendOptions = function() {
};
global.CardGameEffectBendOptions.$ctor = function() {
	var $this = {};
	$this.degrees = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameEffectHighlightOptions
global.CardGameEffectHighlightOptions = function() {
};
global.CardGameEffectHighlightOptions.$ctor = function() {
	var $this = {};
	$this.radius = 0;
	$this.color = null;
	$this.rotate = 0;
	$this.offsetX = 0;
	$this.offsetY = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameEffectRotateOptions
global.CardGameEffectRotateOptions = function() {
};
global.CardGameEffectRotateOptions.$ctor = function() {
	var $this = {};
	$this.degrees = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameQuestion
global.CardGameQuestion = function(user, question, answers, cardGame) {
	this.user = null;
	this.question = null;
	this.answers = null;
	this.cardGame = null;
	this.user = user;
	this.question = question;
	this.answers = answers;
	this.cardGame = cardGame;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameTableSpaceOptions
global.CardGameTableSpaceOptions = function() {
};
global.CardGameTableSpaceOptions.$ctor = function() {
	var $this = {};
	$this.vertical = false;
	$this.x = 0;
	$this.y = 0;
	$this.width = 0;
	$this.height = 0;
	$this.pile = null;
	$this.rotate = 0;
	$this.visible = false;
	$this.stackCards = false;
	$this.drawCardsBent = false;
	$this.name = null;
	$this.sortPrder = 0;
	$this.numerOfCardsHorizontal = 0;
	$this.numerOfCardsVertical = 0;
	$this.resizeType = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardState
global.CardState = function() {
};
global.CardState.prototype = {};
global.CardState.registerEnum('global.CardState', false);
////////////////////////////////////////////////////////////////////////////////
// global.CardType
global.CardType = function() {
};
global.CardType.prototype = {};
global.CardType.registerEnum('global.CardType', false);
////////////////////////////////////////////////////////////////////////////////
// global.DrawTime
global.DrawTime = function() {
};
global.DrawTime.prototype = {};
global.DrawTime.registerEnum('global.DrawTime', false);
////////////////////////////////////////////////////////////////////////////////
// global.Effect$Bend
global.Effect$Bend = function(options) {
	this.degrees = 0;
	global.Effects.call(this);
	this.type = 'bend';
	this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
	this.post = 1;
};
////////////////////////////////////////////////////////////////////////////////
// global.Effect$Highlight
global.Effect$Highlight = function(options) {
	this.radius = 0;
	this.color = null;
	this.rotate = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	global.Effects.call(this);
	this.type = 'highlight';
	this.radius = ((options.radius === 0) ? 0 : options.radius);
	this.color = (ss.isNullOrUndefined(options.color) ? 'yellow' : options.color);
	this.rotate = ((options.rotate === 0) ? 0 : options.rotate);
	this.offsetX = ((options.offsetX === 0) ? 0 : options.offsetX);
	this.offsetY = ((options.offsetY === 0) ? 0 : options.offsetY);
	this.post = 0;
};
////////////////////////////////////////////////////////////////////////////////
// global.Effect$Rotate
global.Effect$Rotate = function(options) {
	this.degrees = 0;
	global.Effects.call(this);
	this.type = 'rotate';
	this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
	this.post = 1;
};
////////////////////////////////////////////////////////////////////////////////
// global.Effects
global.Effects = function() {
	this.type = null;
	this.post = 0;
	this.type = '';
	this.post = 0;
};
////////////////////////////////////////////////////////////////////////////////
// global.EffectType
global.EffectType = function() {
};
global.EffectType.prototype = {};
global.EffectType.registerEnum('global.EffectType', false);
////////////////////////////////////////////////////////////////////////////////
// global.FiberYieldResponse
global.FiberYieldResponse = function(type) {
	this.variableLookup = null;
	this.type = null;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
};
global.FiberYieldResponse.$ctor2 = function(type, question) {
	this.variableLookup = null;
	this.type = null;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
	this.question = question;
};
global.FiberYieldResponse.$ctor1 = function(type, contents) {
	this.variableLookup = null;
	this.type = null;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
	this.contents = contents;
};
global.FiberYieldResponse.$ctor3 = function(type, lineNumber, value) {
	this.variableLookup = null;
	this.type = null;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
	this.lineNumber = lineNumber;
	this.value = value;
};
global.FiberYieldResponse.$ctor2.prototype = global.FiberYieldResponse.$ctor1.prototype = global.FiberYieldResponse.$ctor3.prototype = global.FiberYieldResponse.prototype;
////////////////////////////////////////////////////////////////////////////////
// global.GameCardGameOptions
global.GameCardGameOptions = function() {
};
global.GameCardGameOptions.$ctor = function() {
	var $this = {};
	$this.numberOfCards = 0;
	$this.numberOfJokers = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.GameCardGameTextAreaOptions
global.GameCardGameTextAreaOptions = function() {
};
global.GameCardGameTextAreaOptions.$ctor = function() {
	var $this = {};
	$this.name = null;
	$this.x = 0;
	$this.nayme = 0;
	$this.text = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.Order
global.Order = function() {
};
global.Order.prototype = {};
global.Order.registerEnum('global.Order', false);
////////////////////////////////////////////////////////////////////////////////
// global.Pile
global.Pile = function(name) {
	this.name = null;
	this.cards = null;
	this.name = name;
	this.cards = new Array();
};
global.Pile.prototype = {
	shuffle: function() {
		var o = this.cards;
		var x;
		for (var j, i = o.length; i === 0; j = (parseInt((Math.random() * i).toString())), x = o[--i], o[i] = o[j], o[j] = x) {
			;
		}
		//lol
		this.cards = o;
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.PokerResult
global.PokerResult = function(weight, type, cards) {
	this.weight = 0;
	this.state = 0;
	this.cards = null;
	this.weight = weight;
	this.state = type;
	this.cards = cards;
};
////////////////////////////////////////////////////////////////////////////////
// global.PokerWinType
global.PokerWinType = function() {
};
global.PokerWinType.prototype = {};
global.PokerWinType.registerEnum('global.PokerWinType', false);
////////////////////////////////////////////////////////////////////////////////
// global.Rectangle
global.Rectangle = function(x, y, width, height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
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
	var m = new global.CardGameQuestion(user, question, answers, cardGame);
	var answer = yield(new global.FiberYieldResponse.$ctor2('askQuestion', m));
	cardGame.answerIndex++;
	return (ss.isNullOrUndefined(answer) ? 0 : answer.value);
};
global.shuff.declareWinner = function(user) {
	yield(new global.FiberYieldResponse('gameOver'));
};
global.shuff.log = function(msg) {
	yield(new global.FiberYieldResponse.$ctor1('log', msg));
};
global.shuff.break_ = function(lineNumber, cardGame, varLookup) {
	if (cardGame.emulating) {
		return;
	}
	var yieldObject = new global.FiberYieldResponse.$ctor3('break', lineNumber - 1, '');
	while (true) {
		var answ = yield(yieldObject);
		if (ss.isNullOrUndefined(answ)) {
			//continue
			return;
		}
		if (ss.isValue(answ.variableLookup)) {
			yieldObject = new global.FiberYieldResponse.$ctor3('variableLookup', 0, varLookup(answ.variableLookup));
			continue;
		}
		break;
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.TableSpace
global.TableSpace = function(options) {
	this.vertical = false;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.pile = null;
	this.rotate = 0;
	this.visible = false;
	this.stackCards = false;
	this.drawCardsBent = false;
	this.name = null;
	this.sortPrder = 0;
	this.numerOfCardsHorizontal = 0;
	this.numerOfCardsVertical = 0;
	this.effects = null;
	this.resizeType = null;
	this.vertical = (!options.vertical ? false : options.vertical);
	this.x = ((options.x === 0) ? 0 : options.x);
	this.y = ((options.y === 0) ? 0 : options.y);
	this.width = ((options.width === 0) ? 0 : options.width);
	this.height = ((options.height === 0) ? 0 : options.height);
	this.pile = options.pile;
	this.rotate = ((options.rotate === 0) ? 0 : options.rotate);
	this.visible = (!options.visible ? true : options.visible);
	this.stackCards = (!options.stackCards ? false : options.stackCards);
	this.drawCardsBent = (!options.drawCardsBent ? true : options.drawCardsBent);
	this.name = Object.coalesce(options.name, 'TableSpace');
	this.sortPrder = options.sortPrder;
	this.numerOfCardsHorizontal = ((options.numerOfCardsHorizontal === 0) ? 1 : options.numerOfCardsHorizontal);
	this.numerOfCardsVertical = ((options.numerOfCardsVertical === 0) ? 1 : options.numerOfCardsVertical);
	this.effects = new Array();
	this.resizeType = (ss.isNullOrUndefined(options.resizeType) ? 'grow' : options.resizeType);
};
////////////////////////////////////////////////////////////////////////////////
// global.TableTextArea
global.TableTextArea = function(options) {
	this.name = null;
	this.x = 0;
	this.y = 0;
	this.text = null;
	this.name = (ss.isNullOrUndefined(options.name) ? 'Text Area' : options.name);
	this.x = ((options.x === 0) ? 0 : options.x);
	this.y = ((options.nayme === 0) ? 0 : options.nayme);
	this.text = (ss.isNullOrUndefined(options.text) ? 'Text' : options.text);
};
////////////////////////////////////////////////////////////////////////////////
// global.User
global.User = function(name) {
	this.userName = null;
	this.playerDealingOrder = 0;
	this.cards = null;
	this.userName = name;
	this.cards = new global.Pile(name);
};
global._.registerClass('global._', Object);
global.ArrayUtils.registerClass('global.ArrayUtils', Object);
global.Card.registerClass('global.Card', Object);
global.CardGame.registerClass('global.CardGame', Object);
global.CardGameAnswer.registerClass('global.CardGameAnswer', Object);
global.CardGameArea.registerClass('global.CardGameArea', Object);
global.CardGameEffectBendOptions.registerClass('global.CardGameEffectBendOptions', Object);
global.CardGameEffectHighlightOptions.registerClass('global.CardGameEffectHighlightOptions', Object);
global.CardGameEffectRotateOptions.registerClass('global.CardGameEffectRotateOptions', Object);
global.CardGameQuestion.registerClass('global.CardGameQuestion', Object);
global.CardGameTableSpaceOptions.registerClass('global.CardGameTableSpaceOptions', Object);
global.Effects.registerClass('global.Effects', Object);
global.FiberYieldResponse.registerClass('global.FiberYieldResponse', Object);
global.GameCardGameOptions.registerClass('global.GameCardGameOptions', Object);
global.GameCardGameTextAreaOptions.registerClass('global.GameCardGameTextAreaOptions', Object);
global.Pile.registerClass('global.Pile', Object);
global.PokerResult.registerClass('global.PokerResult', Object);
global.Rectangle.registerClass('global.Rectangle', Object);
global.shuff.registerClass('global.shuff', Object);
global.TableSpace.registerClass('global.TableSpace', Object);
global.TableTextArea.registerClass('global.TableTextArea', Object);
global.User.registerClass('global.User', Object);
global.Effect$Bend.registerClass('global.Effect$Bend', global.Effects);
global.Effect$Highlight.registerClass('global.Effect$Highlight', global.Effects);
global.Effect$Rotate.registerClass('global.Effect$Rotate', global.Effects);

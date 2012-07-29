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
// global.Card
global.Card = function(number, type) {
	this.$1$NumberField = 0;
	this.$1$TypeField = 0;
	this.set_number(number);
	this.set_type(type);
};
global.Card.prototype = {
	get_number: function() {
		return this.$1$NumberField;
	},
	set_number: function(value) {
		this.$1$NumberField = value;
	},
	get_type: function() {
		return this.$1$TypeField;
	},
	set_type: function(value) {
		this.$1$TypeField = value;
	},
	getName: function() {
		return this.get_number() + ' ' + this.get_type();
	}
};
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
};
////////////////////////////////////////////////////////////////////////////////
// global.Effects
global.Effects = function() {
	this.type = null;
	this.type = '';
};
////////////////////////////////////////////////////////////////////////////////
// global.EffectType
global.EffectType = function() {
};
global.EffectType.prototype = {};
global.EffectType.registerEnum('global.EffectType', false);
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
// global.GameCardGameSpace
global.GameCardGameSpace = function() {
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
	this.vertical = (!options.vertical ? true : options.vertical);
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
};
////////////////////////////////////////////////////////////////////////////////
// global.TableTextArea
global.TableTextArea = function(options) {
	this.name = null;
	this.x = 0;
	this.nayme = 0;
	this.text = null;
	this.name = (ss.isNullOrUndefined(options.name) ? 'Text Area' : options.name);
	this.x = ((options.x === 0) ? 0 : options.x);
	this.nayme = ((options.nayme === 0) ? 0 : options.nayme);
	this.text = (ss.isNullOrUndefined(options.text) ? 'Text' : options.text);
};
////////////////////////////////////////////////////////////////////////////////
// global.TableTextArea
global.TableTextArea = function() {
	this.text = null;
	this.x = 0;
	this.y = 0;
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
global._.registerClass('global._', Object);
global.Card.registerClass('global.Card', Object);
global.Card.registerClass('global.Card', Object);
global.CardGame.registerClass('global.CardGame', Object);
global.CardGameAnswer.registerClass('global.CardGameAnswer', Object);
global.CardGameArea.registerClass('global.CardGameArea', Object);
global.CardGameEffectHighlightOptions.registerClass('global.CardGameEffectHighlightOptions', Object);
global.CardGameTableSpaceOptions.registerClass('global.CardGameTableSpaceOptions', Object);
global.Effects.registerClass('global.Effects', Object);
global.GameCardGameOptions.registerClass('global.GameCardGameOptions', Object);
global.GameCardGameSpace.registerClass('global.GameCardGameSpace', Object);
global.GameCardGameTextAreaOptions.registerClass('global.GameCardGameTextAreaOptions', Object);
global.Pile.registerClass('global.Pile', Object);
global.PokerResult.registerClass('global.PokerResult', Object);
global.Rectangle.registerClass('global.Rectangle', Object);
global.shuff.registerClass('global.shuff', Object);
global.TableSpace.registerClass('global.TableSpace', Object);
global.TableTextArea.registerClass('global.TableTextArea', Object);
global.TableTextArea.registerClass('global.TableTextArea', Object);
global.User.registerClass('global.User', Object);
global.YieldObject.registerClass('global.YieldObject', Object);
global.Effect$Highlight.registerClass('global.Effect$Highlight', global.Effects);

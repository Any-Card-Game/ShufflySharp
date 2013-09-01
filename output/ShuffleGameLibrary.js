
(function() {
	'use strict';
	global.global = global.global || {};
	////////////////////////////////////////////////////////////////////////////////
	// global.GameUtils
	var $global__ = function() {
	};
	$global__.__typeName = 'global._';
	$global__.numbers = function(start, finish) {
		var items = new Array(finish - start);
		for (var i = 0; i < finish - start; i++) {
			items[i] = start + i;
		}
		return items;
	};
	$global__.clone = function(obj) {
		if (!!(ss.isNullOrUndefined(obj) || !ss.isInstanceOfType(obj, Array) && (!ss.referenceEquals(ss.getInstanceType(obj), Object) && eval("({}).toString.call(obj) != '[object Function]'")))) {
			return obj;
		}
		var ob = obj;
		var temp = null;
		//::dynamic okay
		if (ss.isInstanceOfType(obj, Array)) {
			temp = [];
		}
		else {
			temp = new Object();
		}
		var $t1 = ss.getEnumerator(Object.keys(ob));
		try {
			while ($t1.moveNext()) {
				var key = $t1.current();
				temp[key] = $global__.clone(ob[key]);
			}
		}
		finally {
			$t1.dispose();
		}
		return temp;
	};
	$global__.floor = function(j) {
		return ss.Int32.trunc(j);
	};
	$global__.random = function() {
		return Math.random();
	};
	global.global._ = $global__;
	////////////////////////////////////////////////////////////////////////////////
	// global.ArrayUtils
	var $global_ArrayUtils = function() {
	};
	$global_ArrayUtils.__typeName = 'global.ArrayUtils';
	$global_ArrayUtils.forEach = function(ts, does) {
		for (var i = 0; i < ts.length; i++) {
			var df = does(ts[i], i);
			if (df) {
				return df;
			}
		}
		return false;
	};
	$global_ArrayUtils.select = function(T, T2) {
		return function(ts, does) {
			var ts2 = new Array(ts.length);
			for (var i = 0; i < ts.length; i++) {
				ts2[i] = does(ts[i]);
			}
			return ts2;
		};
	};
	$global_ArrayUtils.sortCards = function(ts) {
		var ijc = $global_ArrayUtils.groupBy($global_Card, ss.Int32).call(null, ts, function(a) {
			return a.type;
		});
		var ij = $global_ArrayUtils.select(ss.makeGenericType($global_ArrayUtils$GroupByKey$2, [$global_Card, ss.Int32]), Array).call(null, ijc, function(a1) {
			a1.items.sort(function(b, c) {
				return b.value - c.value;
			});
			return a1.items;
		});
		var items = new Array(ts.length);
		var jf = 0;
		for (var $t1 = 0; $t1 < ij.length; $t1++) {
			var cardGameCard = ij[$t1];
			for (var $t2 = 0; $t2 < cardGameCard.length; $t2++) {
				var gameCard = cardGameCard[$t2];
				items[jf++] = gameCard;
			}
		}
		$global_ArrayUtils.$setArrayData($global_Card).call(null, ts, items);
		return ts;
	};
	$global_ArrayUtils.$setArrayData = function(T) {
		return function(ts, items) {
			for (var i = 0; i < items.length; i++) {
				ts[i] = items[i];
			}
		};
	};
	$global_ArrayUtils.groupBy = function(T, T2) {
		return function(ts, does) {
			var items = [];
			for (var $t1 = 0; $t1 < ts.length; $t1++) {
				var t = ts[$t1];
				var t2 = does(t);
				var good = false;
				for (var $t2 = 0; $t2 < items.length; $t2++) {
					var item = items[$t2];
					var f3 = !!eval('item.key==t2');
					//throws wild notimplementedexcpetion if item.key and t2 are cast to dynamic
					if (f3) {
						ss.add(item.items, t);
						good = true;
						break;
					}
				}
				if (!good) {
					ss.add(items, new (ss.makeGenericType($global_ArrayUtils$GroupByKey$2, [T, T2]))(t2, [t]));
				}
			}
			return ss.cast(items, Array);
		};
	};
	$global_ArrayUtils.where = function(ts, does) {
		var jf = [];
		for (var i = 0; i < ts.length; i++) {
			if (does(ts[i], i)) {
				ss.add(jf, ts[i]);
			}
		}
		return jf;
	};
	$global_ArrayUtils.any = function(ts, does) {
		var jf = [];
		for (var i = 0; i < ts.length; i++) {
			if (does(ts[i], i)) {
				return true;
			}
		}
		return false;
	};
	global.global.ArrayUtils = $global_ArrayUtils;
	////////////////////////////////////////////////////////////////////////////////
	// global.ArrayUtils.GroupByKey
	var $global_ArrayUtils$GroupByKey$2 = function(T, T2) {
		var $type = function(key, items) {
			this.key = ss.getDefaultValue(T2);
			this.items = null;
			this.key = key;
			this.items = items;
		};
		ss.registerGenericClassInstance($type, $global_ArrayUtils$GroupByKey$2, [T, T2], {}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$global_ArrayUtils$GroupByKey$2.__typeName = 'global.ArrayUtils$GroupByKey$2';
	ss.initGenericClass($global_ArrayUtils$GroupByKey$2, 2);
	global.global.ArrayUtils$GroupByKey$2 = $global_ArrayUtils$GroupByKey$2;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameCard
	var $global_Card = function(value, type) {
		this.value = 0;
		this.type = 0;
		this.state = 0;
		this.effects = null;
		this.value = value;
		this.type = type;
		this.effects = [];
	};
	$global_Card.__typeName = 'global.Card';
	global.global.Card = $global_Card;
	////////////////////////////////////////////////////////////////////////////////
	// global.GameCardGame
	var $global_CardGame = function() {
		this.emulating = false;
		this.name = null;
		this.emulatedAnswerIndex = 0;
		this.spaces = null;
		this.textAreas = null;
		this.size = null;
		this.emulatedAnswers = null;
		this.users = null;
		this.deck = null;
		this.numberOfCards = 0;
		this.numberOfJokers = 0;
		this.effects = null;
		this.spaces = [];
		this.textAreas = [];
		this.emulatedAnswers = [];
		this.users = [];
		this.effects = [];
		this.deck = new $global_Pile('deck');
	};
	$global_CardGame.__typeName = 'global.CardGame';
	global.global.CardGame = $global_CardGame;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAnswer
	var $global_CardGameAnswer = function() {
	};
	$global_CardGameAnswer.__typeName = 'global.CardGameAnswer';
	$global_CardGameAnswer.createInstance = function() {
		return $global_CardGameAnswer.$ctor();
	};
	$global_CardGameAnswer.$ctor = function() {
		var $this = {};
		$this.value = 0;
		return $this;
	};
	global.global.CardGameAnswer = $global_CardGameAnswer;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameEffect
	var $global_CardGameEffect = function(cardGameEffectOptions) {
		this.name = null;
		this.type = 0;
		this.properties = null;
		this.name = cardGameEffectOptions.name;
		this.type = cardGameEffectOptions.type;
		this.properties = cardGameEffectOptions.properties;
	};
	$global_CardGameEffect.__typeName = 'global.CardGameEffect';
	global.global.CardGameEffect = $global_CardGameEffect;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameEffectOptions
	var $global_CardGameEffectOptions = function() {
	};
	$global_CardGameEffectOptions.__typeName = 'global.CardGameEffectOptions';
	$global_CardGameEffectOptions.createInstance = function() {
		return $global_CardGameEffectOptions.$ctor();
	};
	$global_CardGameEffectOptions.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.type = 0;
		$this.properties = null;
		return $this;
	};
	global.global.CardGameEffectOptions = $global_CardGameEffectOptions;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameEffectProperty
	var $global_CardGameEffectProperty = function() {
	};
	$global_CardGameEffectProperty.__typeName = 'global.CardGameEffectProperty';
	$global_CardGameEffectProperty.createInstance = function() {
		return $global_CardGameEffectProperty.$ctor();
	};
	$global_CardGameEffectProperty.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.value = null;
		return $this;
	};
	global.global.CardGameEffectProperty = $global_CardGameEffectProperty;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameQuestion
	var $global_CardGameQuestion = function(user, question, answers, cardGame) {
		this.user = null;
		this.question = null;
		this.answers = null;
		this.cardGame = null;
		this.user = user;
		this.question = question;
		this.answers = answers;
		this.cardGame = cardGame;
	};
	$global_CardGameQuestion.__typeName = 'global.CardGameQuestion';
	global.global.CardGameQuestion = $global_CardGameQuestion;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameTableSpaceOptions
	var $global_CardGameTableSpaceOptions = function() {
		this.vertical = false;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.pile = null;
		this.rotate = 0;
		this.visible = false;
		this.stackCards = false;
		this.name = null;
		this.sortOrder = 0;
		this.numerOfCardsHorizontal = 0;
		this.numerOfCardsVertical = 0;
		this.resizeType = 0;
		this.resizeType = 'grow';
		this.rotate = 0;
	};
	$global_CardGameTableSpaceOptions.__typeName = 'global.CardGameTableSpaceOptions';
	global.global.CardGameTableSpaceOptions = $global_CardGameTableSpaceOptions;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameCardState
	var $global_CardState = function() {
	};
	$global_CardState.__typeName = 'global.CardState';
	global.global.CardState = $global_CardState;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameCardType
	var $global_CardType = function() {
	};
	$global_CardType.__typeName = 'global.CardType';
	global.global.CardType = $global_CardType;
	////////////////////////////////////////////////////////////////////////////////
	// global.ClientGameCardGameHelper
	var $global_ClientGameCardGameHelper = function() {
	};
	$global_ClientGameCardGameHelper.__typeName = 'global.ClientGameCardGameHelper';
	$global_ClientGameCardGameHelper.clientGetEffectByName = function(cardGame, effectName) {
		for (var $t1 = 0; $t1 < cardGame.effects.length; $t1++) {
			var cardGameEffect = cardGame.effects[$t1];
			if (ss.referenceEquals(cardGameEffect.name.toLowerCase(), effectName.toLowerCase())) {
				return cardGameEffect;
			}
		}
		return null;
	};
	$global_ClientGameCardGameHelper.clientGetSpaceByName = function(cardGame, name) {
		for (var $t1 = 0; $t1 < cardGame.spaces.length; $t1++) {
			var cardGameTableSpace = cardGame.spaces[$t1];
			if (ss.referenceEquals(cardGameTableSpace.name.toLowerCase(), name.toLowerCase())) {
				return cardGameTableSpace;
			}
		}
		return null;
	};
	$global_ClientGameCardGameHelper.clientGetTextByName = function(cardGame, name) {
		for (var $t1 = 0; $t1 < cardGame.textAreas.length; $t1++) {
			var gameCardGameTextArea = cardGame.textAreas[$t1];
			if (ss.referenceEquals(gameCardGameTextArea.name.toLowerCase(), name.toLowerCase())) {
				return gameCardGameTextArea;
			}
		}
		return null;
	};
	global.global.ClientGameCardGameHelper = $global_ClientGameCardGameHelper;
	////////////////////////////////////////////////////////////////////////////////
	// global.DebugFiberYieldResponse
	var $global_DebugFiberYieldResponse = function(type) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
	};
	$global_DebugFiberYieldResponse.__typeName = 'global.DebugFiberYieldResponse';
	$global_DebugFiberYieldResponse.$ctor2 = function(type, question) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
		this.question = question;
	};
	$global_DebugFiberYieldResponse.$ctor1 = function(type, contents) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
		this.contents = contents;
	};
	$global_DebugFiberYieldResponse.$ctor3 = function(type, lineNumber, value) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
		this.lineNumber = lineNumber;
		this.value = value;
	};
	global.global.DebugFiberYieldResponse = $global_DebugFiberYieldResponse;
	////////////////////////////////////////////////////////////////////////////////
	// global.DebugFiberYieldResponseType
	var $global_DebugFiberYieldResponseType = function() {
	};
	$global_DebugFiberYieldResponseType.__typeName = 'global.DebugFiberYieldResponseType';
	global.global.DebugFiberYieldResponseType = $global_DebugFiberYieldResponseType;
	////////////////////////////////////////////////////////////////////////////////
	// global.EffectHelper
	var $global_EffectHelper = function() {
	};
	$global_EffectHelper.__typeName = 'global.EffectHelper';
	$global_EffectHelper.getNumber = function(effect, name) {
		for (var $t1 = 0; $t1 < effect.properties.length; $t1++) {
			var effectProperty = effect.properties[$t1];
			if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
				return parseFloat(effectProperty.value.toString());
			}
		}
		return 0;
	};
	$global_EffectHelper.getString = function(effect, name) {
		for (var $t1 = 0; $t1 < effect.properties.length; $t1++) {
			var effectProperty = effect.properties[$t1];
			if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
				return effectProperty.value.toString();
			}
		}
		return '';
	};
	global.global.EffectHelper = $global_EffectHelper;
	////////////////////////////////////////////////////////////////////////////////
	// global.FiberYieldResponse
	var $global_FiberYieldResponse = function(type) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
	};
	$global_FiberYieldResponse.__typeName = 'global.FiberYieldResponse';
	$global_FiberYieldResponse.$ctor2 = function(type, question) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
		this.question = question;
	};
	$global_FiberYieldResponse.$ctor1 = function(type, contents) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
		this.contents = contents;
	};
	$global_FiberYieldResponse.$ctor3 = function(type, lineNumber, value) {
		this.variableLookup = null;
		this.type = 0;
		this.contents = null;
		this.question = null;
		this.lineNumber = 0;
		this.value = null;
		this.type = type;
		this.lineNumber = lineNumber;
		this.value = value;
	};
	global.global.FiberYieldResponse = $global_FiberYieldResponse;
	////////////////////////////////////////////////////////////////////////////////
	// global.FiberYieldResponseType
	var $global_FiberYieldResponseType = function() {
	};
	$global_FiberYieldResponseType.__typeName = 'global.FiberYieldResponseType';
	global.global.FiberYieldResponseType = $global_FiberYieldResponseType;
	////////////////////////////////////////////////////////////////////////////////
	// global.GameCardGameTextAreaOptions
	var $global_GameCardGameTextAreaOptions = function() {
	};
	$global_GameCardGameTextAreaOptions.__typeName = 'global.GameCardGameTextAreaOptions';
	$global_GameCardGameTextAreaOptions.createInstance = function() {
		return $global_GameCardGameTextAreaOptions.$ctor();
	};
	$global_GameCardGameTextAreaOptions.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.x = 0;
		$this.y = 0;
		$this.text = null;
		return $this;
	};
	global.global.GameCardGameTextAreaOptions = $global_GameCardGameTextAreaOptions;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameOrder
	var $global_Order = function() {
	};
	$global_Order.__typeName = 'global.Order';
	global.global.Order = $global_Order;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGamePile
	var $global_Pile = function(name) {
		this.name = null;
		this.cards = null;
		this.name = name;
		this.cards = [];
	};
	$global_Pile.__typeName = 'global.Pile';
	global.global.Pile = $global_Pile;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGamePokerResult
	var $global_PokerResult = function(weight, type, cards) {
		this.weight = 0;
		this.state = 0;
		this.cards = null;
		this.weight = weight;
		this.state = type;
		this.cards = cards;
	};
	$global_PokerResult.__typeName = 'global.PokerResult';
	global.global.PokerResult = $global_PokerResult;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGamePokerWinType
	var $global_PokerWinType = function() {
	};
	$global_PokerWinType.__typeName = 'global.PokerWinType';
	global.global.PokerWinType = $global_PokerWinType;
	////////////////////////////////////////////////////////////////////////////////
	// global.Rectangle
	var $global_Rectangle = function() {
	};
	$global_Rectangle.__typeName = 'global.Rectangle';
	global.global.Rectangle = $global_Rectangle;
	////////////////////////////////////////////////////////////////////////////////
	// global.Shuff
	var $global_shuff = function() {
	};
	$global_shuff.__typeName = 'global.shuff';
	$global_shuff.askQuestion = function(user, question, answers, cardGame) {
		cardGame.emulating = false;
		if (cardGame.emulatedAnswers.length - 1 > cardGame.emulatedAnswerIndex) {
			cardGame.emulating = true;
			return cardGame.emulatedAnswers[cardGame.emulatedAnswerIndex++].value;
			//todo .value
		}
		var m = new $global_CardGameQuestion(user, question, answers, cardGame);
		var answer = Fiber.yield(new $global_FiberYieldResponse.$ctor2(0, m));
		cardGame.emulatedAnswerIndex++;
		return (ss.isNullOrUndefined(answer) ? 0 : answer.value);
	};
	$global_shuff.declareWinner = function(user) {
		Fiber.yield(new $global_FiberYieldResponse(2));
	};
	$global_shuff.gameOver = function() {
		Fiber.yield(new $global_FiberYieldResponse(2));
	};
	$global_shuff.playersLeave = function(usersLeft) {
		var users = Fiber.yield(new $global_FiberYieldResponse(5));
		if (users.length > 0) {
			usersLeft(users);
		}
	};
	$global_shuff.log = function(msg) {
		Fiber.yield(new $global_FiberYieldResponse.$ctor1(1, msg));
	};
	$global_shuff.break_ = function(lineNumber, cardGame, varLookup) {
		//   if (cardGame.Emulating)
		//   return;
		var yieldObject = new $global_FiberYieldResponse.$ctor3(3, lineNumber - 1, '');
		while (true) {
			console.log('breaking');
			var answ = Fiber.yield(yieldObject);
			if (ss.isNullOrUndefined(answ)) {
				//continue
				return;
			}
			if (ss.isValue(answ.variableLookup)) {
				yieldObject = new $global_FiberYieldResponse.$ctor3(4, 0, varLookup(answ.variableLookup));
				continue;
			}
			break;
		}
	};
	global.global.shuff = $global_shuff;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameTableSpace
	var $global_TableSpace = function(options) {
		this.vertical = false;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.pile = null;
		this.effects = null;
		this.visible = false;
		this.stackCards = false;
		this.name = null;
		this.sortOrder = 0;
		this.numberOfCardsHorizontal = 0;
		this.numberOfCardsVertical = 0;
		this.resizeType = 0;
		this.pileName = null;
		this.userName = null;
		this.user = null;
		this.vertical = (!options.vertical ? false : options.vertical);
		this.x = ((options.x === 0) ? 0 : options.x);
		this.y = ((options.y === 0) ? 0 : options.y);
		this.name = ss.coalesce(options.name, 'TableSpace');
		this.width = ((options.width === 0) ? 0 : options.width);
		this.height = ((options.height === 0) ? 0 : options.height);
		//Rotate = options.Rotate == 0 ? 0 : options.Rotate;
		this.visible = (!options.visible ? true : options.visible);
		this.stackCards = (!options.stackCards ? false : options.stackCards);
		this.pile = new $global_Pile(this.name + 'Pile');
		this.sortOrder = options.sortOrder;
		this.numberOfCardsHorizontal = ((options.numerOfCardsHorizontal === 0) ? 1 : options.numerOfCardsHorizontal);
		this.numberOfCardsVertical = ((options.numerOfCardsVertical === 0) ? 1 : options.numerOfCardsVertical);
		this.resizeType = options.resizeType;
		//Rotate = ExtensionMethods.eval("options.rotate? options.rotate : 0");
		this.effects = [];
	};
	$global_TableSpace.__typeName = 'global.TableSpace';
	global.global.TableSpace = $global_TableSpace;
	////////////////////////////////////////////////////////////////////////////////
	// global.GameCardGameTextArea
	var $global_TableTextArea = function(options) {
		this.name = null;
		this.x = 0;
		this.y = 0;
		this.text = null;
		this.name = ss.coalesce(options.name, 'Text Area');
		this.x = ((options.x === 0) ? 0 : options.x);
		this.y = ((options.y === 0) ? 0 : options.y);
		this.text = ss.coalesce(options.text, 'Text');
	};
	$global_TableTextArea.__typeName = 'global.TableTextArea';
	global.global.TableTextArea = $global_TableTextArea;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameUser
	var $global_User = function(name) {
		this.userName = null;
		this.playerDealingOrder = 0;
		this.cards = null;
		this.userName = name;
		this.cards = new $global_Pile(name);
	};
	$global_User.__typeName = 'global.User';
	global.global.User = $global_User;
	ss.initClass($global__, {});
	ss.initClass($global_ArrayUtils, {});
	ss.initClass($global_Card, {});
	ss.initClass($global_CardGame, {
		configurationCompleted: function() {
			for (var i = 0; i < this.numberOfCards; i++) {
				ss.add(this.deck.cards, new $global_Card(i % 13, ss.Int32.trunc(Math.floor(i / 13))));
			}
			for (var i1 = 0; i1 < this.numberOfJokers; i1++) {
				ss.add(this.deck.cards, new $global_Card(0, 0));
			}
		},
		setEmulatedAnswers: function(answers) {
			this.emulatedAnswers = answers;
		},
		setPlayers: function(players) {
			this.users = [];
			if (ss.isNullOrUndefined(players) || players.length === 0) {
				return;
			}
			if (players.length > 6) {
				ss.arrayRemoveRange(players, 6, players.length - 6);
			}
			for (var j = 0; j < players.length; j++) {
				ss.add(this.users, new $global_User(players[j].userName));
			}
		},
		getSpaceByName: function(name) {
			for (var $t1 = 0; $t1 < this.spaces.length; $t1++) {
				var cardGameTableSpace = this.spaces[$t1];
				if (ss.referenceEquals(cardGameTableSpace.name.toLowerCase(), name.toLowerCase())) {
					return cardGameTableSpace;
				}
			}
			return null;
		},
		getTextByName: function(name) {
			for (var $t1 = 0; $t1 < this.textAreas.length; $t1++) {
				var gameCardGameTextArea = this.textAreas[$t1];
				if (ss.referenceEquals(gameCardGameTextArea.name.toLowerCase(), name.toLowerCase())) {
					return gameCardGameTextArea;
				}
			}
			return null;
		},
		dealCards: function(numberOfCards, state) {
		},
		getEffectByName: function(effectName) {
			for (var $t1 = 0; $t1 < this.effects.length; $t1++) {
				var cardGameEffect = this.effects[$t1];
				if (ss.referenceEquals(cardGameEffect.name.toLowerCase(), effectName.toLowerCase())) {
					return cardGameEffect;
				}
			}
			return null;
		}
	});
	ss.initClass($global_CardGameAnswer, {});
	ss.initClass($global_CardGameEffect, {});
	ss.initClass($global_CardGameEffectOptions, {});
	ss.initClass($global_CardGameEffectProperty, {});
	ss.initClass($global_CardGameQuestion, {});
	ss.initClass($global_CardGameTableSpaceOptions, {});
	ss.initEnum($global_CardState, { faceUp: 0, faceDown: 1, faceUpIfOwned: 2 });
	ss.initEnum($global_CardType, { heart: 0, diamond: 1, spade: 2, club: 3 });
	ss.initClass($global_ClientGameCardGameHelper, {});
	ss.initClass($global_DebugFiberYieldResponse, {});
	$global_DebugFiberYieldResponse.$ctor2.prototype = $global_DebugFiberYieldResponse.$ctor1.prototype = $global_DebugFiberYieldResponse.$ctor3.prototype = $global_DebugFiberYieldResponse.prototype;
	ss.initEnum($global_DebugFiberYieldResponseType, { askQuestion: 0, log: 1, gameOver: 2, break$1: 3, variableLookup: 4, playersLeft: 5 });
	ss.initClass($global_EffectHelper, {});
	ss.initClass($global_FiberYieldResponse, {});
	$global_FiberYieldResponse.$ctor2.prototype = $global_FiberYieldResponse.$ctor1.prototype = $global_FiberYieldResponse.$ctor3.prototype = $global_FiberYieldResponse.prototype;
	ss.initEnum($global_FiberYieldResponseType, { askQuestion: 0, log: 1, gameOver: 2, break$1: 3, variableLookup: 4, playersLeft: 5 });
	ss.initClass($global_GameCardGameTextAreaOptions, {});
	ss.initEnum($global_Order, { noOrder: 0, ascending: 1, descending: 2 });
	ss.initClass($global_Pile, {
		shuffle: function() {
			var o = this.cards;
			var x;
			for (var j, i = o.length; i === 0; j = parseInt((Math.random() * i).toString()), x = o[--i], o[i] = o[j], o[j] = x) {
				;
			}
			//lol
			this.cards = o;
		}
	});
	ss.initClass($global_PokerResult, {});
	ss.initEnum($global_PokerWinType, { straight: 1, flush: 2, pair: 3, threeOfAKind: 4, fourOfAKind: 5, straightFlush: 6 });
	ss.initClass($global_Rectangle, {});
	ss.initClass($global_shuff, {});
	ss.initClass($global_TableSpace, {
		assignPile: function(pile) {
			this.pile = pile;
			this.pileName = pile.name;
			return this;
		},
		assignUser: function(user) {
			this.user = user;
			this.userName = user.userName;
			return this;
		}
	});
	ss.initClass($global_TableTextArea, {});
	ss.initClass($global_User, {});
	eval('Array.prototype.foreach=function(does){return global.ArrayUtils.forEach(this,does);};');
	eval('Array.prototype.sortCards=function(){return global.ArrayUtils.sortCards(this);};');
	eval('Array.prototype.where=function(does){return global.ArrayUtils.where(this,does);};');
	eval('Array.prototype.any=function(does){return global.ArrayUtils.any(this,does);};');
	eval('Array.prototype.remove=function(does){ this.splice(this.indexOf(does),1); };');
})();

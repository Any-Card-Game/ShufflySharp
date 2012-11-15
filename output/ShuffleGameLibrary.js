////////////////////////////////////////////////////////////////////////////////
// global.GameUtils
var $global__ = function() {
};
$global__.numbers = function(start, finish) {
	var items = new Array(finish - start);
	for (var i = 0; i < finish - start; i++) {
		items[i] = start + i;
	}
	return items;
};
$global__.clone = function(obj) {
	if (!!(ss.isNullOrUndefined(obj) || !Type.isInstanceOfType(obj, Array) && (!ss.referenceEquals(Type.getInstanceType(obj), Object) && eval('({}).toString.call(obj) != \'[object Function]\'')))) {
		return obj;
	}
	var ob = obj;
	var temp = null;
	//::dynamic okay
	if (Type.isInstanceOfType(obj, Array)) {
		temp = [];
		//::dynamic okay
	}
	else {
		temp = new Object();
	}
	var $t1 = Object.keys(ob).getEnumerator();
	try {
		while ($t1.moveNext()) {
			var key = $t1.get_current();
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
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceAnimatedEffect
var $global_AnimatedEffect = function(animationEffectType, duration, ease) {
	this.type = 0;
	this.duration = 0;
	this.pauseAfter = 0;
	this.pauseBefore = 0;
	this.ease = 0;
	$global_Effect.call(this, 4);
	this.ease = ease;
	this.type = animationEffectType;
	this.duration = duration;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceAnimatedEffectBetweenProperties
var $global_AnimatedEffect$Between = function(duration, ease) {
	this.from = null;
	this.to = null;
	$global_AnimatedEffect.call(this, 0, duration, ease);
	this.from = new $global_Effect$StyleProperty(new $global_AppearanceStyle());
	this.to = new $global_Effect$StyleProperty(new $global_AppearanceStyle());
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceAnimatedEffectEase
var $global_AnimatedEffectEase = function() {
};
$global_AnimatedEffectEase.prototype = { linear: 0, swing: 1, easeInQuad: 2, easeOutQuad: 3, easeInOutQuad: 4, easeInCubic: 5, easeOutCubic: 6, easeInOutCubic: 7, easeInQuart: 8, easeOutQuart: 9, easeInOutQuart: 10, easeInQuint: 11, easeOutQuint: 12, easeInOutQuint: 13, easeInSine: 14, easeOutSine: 15, easeInOutSine: 16, easeInExpo: 17, easeOutExpo: 18, easeInOutExpo: 19, easeInCirc: 20, easeOutCirc: 21, easeInOutCirc: 22, easeInElastic: 23, easeOutElastic: 24, easeInOutElastic: 25, easeInBack: 26, easeOutBack: 27, easeInOutBack: 28, easeInBounce: 29, easeOutBounce: 30, easeInOutBounce: 31 };
Type.registerEnum(global, 'global.AnimatedEffectEase', $global_AnimatedEffectEase, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceAnimatedEffectType
var $global_AnimatedEffectType = function() {
};
$global_AnimatedEffectType.prototype = { between: 0 };
Type.registerEnum(global, 'global.AnimatedEffectType', $global_AnimatedEffectType, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearance
var $global_Appearance = function() {
	this.effects = null;
	$global_AppearanceStyle.call(this);
	this.effects = [];
};
$global_Appearance.fromJson = function(json) {
	var ap = new $global_Appearance();
	ap.innerStyle = $global_AppearanceStyleItem.fromJson(json.innerStyle);
	ap.outerStyle = $global_AppearanceStyleItem.fromJson(json.outerStyle);
	ap.effects = [];
	if (ss.isValue(json.effects)) {
		for (var $t1 = 0; $t1 < json.effects.length; $t1++) {
			var effect = json.effects[$t1];
			ap.effects.add($global_Effect.fromJson(effect));
		}
	}
	return ap;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyle
var $global_AppearanceStyle = function() {
	this.outerStyle = null;
	this.innerStyle = null;
	this.outerStyle = new $global_AppearanceStyleItem({});
	this.innerStyle = new $global_AppearanceStyleItem({});
};
$global_AppearanceStyle.$ctor1 = function(outersStyle, innerStyle) {
	this.outerStyle = null;
	this.innerStyle = null;
	this.outerStyle = outersStyle;
	this.innerStyle = innerStyle;
};
$global_AppearanceStyle.$ctor1.prototype = $global_AppearanceStyle.prototype;
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleBorder
var $global_AppearanceStyleBorder = function() {
	this.top = null;
	this.bottom = null;
	this.left = null;
	this.right = null;
	this.all = null;
	this.top = new $global_AppearanceStyleBorderArea();
	this.bottom = new $global_AppearanceStyleBorderArea();
	this.left = new $global_AppearanceStyleBorderArea();
	this.right = new $global_AppearanceStyleBorderArea();
	this.all = new $global_AppearanceStyleBorderArea();
};
$global_AppearanceStyleBorder.fromJson = function(st) {
	var sp = new $global_AppearanceStyleBorder();
	sp.all = st.all;
	sp.bottom = st.bottom;
	sp.left = st.left;
	sp.right = st.right;
	sp.top = st.top;
	return sp;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleBorderArea
var $global_AppearanceStyleBorderArea = function() {
	this.color = null;
	this.radius = null;
	this.width = null;
	this.style = 0;
	this.color = '#FFF';
	this.radius = '0px';
	this.width = '0px';
	this.style = 0;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleItem
var $global_AppearanceStyleItem = function(options) {
	this.backColor = null;
	this.rotate = 0;
	this.border = null;
	this.padding = null;
	this.margin = null;
	this.zindex = 0;
	this.cursor = 0;
	if (!!ss.isNullOrUndefined(options)) {
		options = {};
	}
	this.backColor = Type.cast(ss.coalesce(options.backColor, null), String);
	this.zindex = ss.Nullable.unbox(Type.cast(ss.coalesce(options.zIndex, 0), ss.Int32));
	var $t1 = options.border;
	if (ss.isNullOrUndefined($t1)) {
		$t1 = new $global_AppearanceStyleBorder();
	}
	this.border = Type.cast($t1, $global_AppearanceStyleBorder);
	var $t2 = options.padding;
	if (ss.isNullOrUndefined($t2)) {
		$t2 = new $global_AppearanceStylePadding();
	}
	this.padding = Type.cast($t2, $global_AppearanceStylePadding);
	var $t3 = options.margin;
	if (ss.isNullOrUndefined($t3)) {
		$t3 = new $global_AppearanceStyleMargin();
	}
	this.margin = Type.cast($t3, $global_AppearanceStyleMargin);
	this.cursor = Type.cast(ss.coalesce(options.cursor, 0), ss.Int32);
	this.rotate = 0;
};
$global_AppearanceStyleItem.fromJson = function(st) {
	var si = new $global_AppearanceStyleItem({});
	si.backColor = st.backColor;
	si.border = $global_AppearanceStyleBorder.fromJson(st.border);
	si.cursor = st.cursor;
	si.margin = $global_AppearanceStyleMargin.fromJson(st.margin);
	si.padding = $global_AppearanceStylePadding.fromJson(st.padding);
	si.rotate = st.rotate;
	si.zindex = st.zindex;
	return si;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleMargin
var $global_AppearanceStyleMargin = function() {
	this.top = 0;
	this.bottom = 0;
	this.left = 0;
	this.right = 0;
	this.all = 0;
	this.top = 0;
	this.bottom = 0;
	this.left = 0;
	this.right = 0;
	this.all = 0;
};
$global_AppearanceStyleMargin.fromJson = function(st) {
	var sp = new $global_AppearanceStyleMargin();
	sp.all = st.all;
	sp.bottom = st.bottom;
	sp.left = st.left;
	sp.right = st.right;
	sp.top = st.top;
	return sp;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStylePadding
var $global_AppearanceStylePadding = function() {
	this.top = 0;
	this.bottom = 0;
	this.left = 0;
	this.right = 0;
	this.all = 0;
	this.top = 0;
	this.bottom = 0;
	this.left = 0;
	this.right = 0;
	this.all = 0;
};
$global_AppearanceStylePadding.fromJson = function(st) {
	var sp = new $global_AppearanceStylePadding();
	sp.all = st.all;
	sp.bottom = st.bottom;
	sp.left = st.left;
	sp.right = st.right;
	sp.top = st.top;
	return sp;
};
////////////////////////////////////////////////////////////////////////////////
// global.ArrayUtils
var $global_ArrayUtils = function() {
	eval('Array.prototype.foreach=function(does){return global.ArrayUtils.forEach(this,does);};');
	eval('Array.prototype.sortCards=function(){return global.ArrayUtils.sortCards(this);};');
	eval('Array.prototype.where=function(does){return global.ArrayUtils.where(this,does);};');
	eval('Array.prototype.any=function(does){return global.ArrayUtils.any(this,does);};');
};
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
	var ij = $global_ArrayUtils.select(Type.makeGenericType($global_ArrayUtils$GroupByKey$2, [$global_Card, ss.Int32]), Array).call(null, ijc, function(a1) {
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
					item.items.add(t);
					good = true;
					break;
				}
			}
			if (!good) {
				items.add(new (Type.makeGenericType($global_ArrayUtils$GroupByKey$2, [T, T2]))(t2, [t]));
			}
		}
		return Type.cast(items, Array);
	};
};
$global_ArrayUtils.where = function(ts, does) {
	var jf = [];
	for (var i = 0; i < ts.length; i++) {
		if (does(ts[i], i)) {
			jf.add(ts[i]);
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
////////////////////////////////////////////////////////////////////////////////
// global.ArrayUtils.GroupByKey
var $global_ArrayUtils$GroupByKey$2 = function(T, T2) {
	var $type = function(key, items) {
		this.key = T2.getDefaultValue();
		this.items = null;
		this.key = key;
		this.items = items;
	};
	Type.registerGenericClassInstance($type, $global_ArrayUtils$GroupByKey$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'global.ArrayUtils$GroupByKey$2', $global_ArrayUtils$GroupByKey$2, 2);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameCard
var $global_Card = function(value, type) {
	this.value = 0;
	this.type = 0;
	this.state = 0;
	this.appearance = null;
	this.value = value;
	this.type = type;
	this.appearance = new $global_Appearance();
};
////////////////////////////////////////////////////////////////////////////////
// global.CardDrawing
var $global_CardDrawing = function(item1, item2) {
	this.outerElement = null;
	this.image = null;
	this.outerElement = item1;
	this.image = item2;
};
////////////////////////////////////////////////////////////////////////////////
// global.GameCardGame
var $global_CardGame = function(options) {
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
	this.spaces = [];
	this.textAreas = [];
	this.answers = [];
	this.users = [];
	this.numberOfCards = ((options.numberOfCards === 0) ? 52 : options.numberOfCards);
	this.numberOfJokers = ((options.numberOfJokers === 0) ? 52 : options.numberOfJokers);
	this.deck = new $global_Pile('deck');
	for (var i = 0; i < this.numberOfCards; i++) {
		this.deck.cards.add(new $global_Card(i % 13, ss.Int32.trunc(Math.floor(ss.Int32.div(i, 13)))));
	}
	for (var i1 = 0; i1 < this.numberOfJokers; i1++) {
		this.deck.cards.add(new $global_Card(0, 0));
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
$global_CardGame.prototype = {
	setAnswers: function(answers) {
		this.answers = answers;
	},
	setPlayers: function(players) {
		this.users = [];
		if (ss.isNullOrUndefined(players) || players.length === 0) {
			return;
		}
		if (players.length > 6) {
			players.removeRange(6, players.length - 6);
		}
		for (var j = 0; j < players.length; j++) {
			this.users.add(new $global_User(players[j].userName));
		}
	},
	dealCards: function(numberOfCards, state) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAnswer
var $global_CardGameAnswer = function() {
	this.value = 0;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceEffectDrawTime
var $global_CardGameAppearanceEffectDrawTime = function() {
};
$global_CardGameAppearanceEffectDrawTime.prototype = { pre: 0, during: 1, post: 2 };
Type.registerEnum(global, 'global.CardGameAppearanceEffectDrawTime', $global_CardGameAppearanceEffectDrawTime, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleBorderStyle
var $global_CardGameAppearanceStyleBorderStyle = function() {
};
$global_CardGameAppearanceStyleBorderStyle.prototype = { none: 0, dotted: 1, dashed: 2, solid: 3, double: 4, groove: 5, ridge: 6, inset: 7, offset: 8 };
Type.registerEnum(global, 'global.CardGameAppearanceStyleBorderStyle', $global_CardGameAppearanceStyleBorderStyle, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleCursor
var $global_CardGameAppearanceStyleCursor = function() {
};
$global_CardGameAppearanceStyleCursor.prototype = { default: 0, auto: 1, pointer: 2, move: 3, eResize: 4, neResize: 5, nwResize: 6, nResize: 7, seResize: 8, swResize: 9, sResize: 10, wResize: 11, text: 12, wait: 13, help: 14 };
Type.registerEnum(global, 'global.CardGameAppearanceStyleCursor', $global_CardGameAppearanceStyleCursor, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameArea
var $global_CardGameArea = function() {
};
$global_CardGameArea.createInstance = function() {
	return $global_CardGameArea.$ctor();
};
$global_CardGameArea.$ctor = function() {
	var $this = {};
	$this.size = null;
	$this.spaces = null;
	$this.textAreas = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameEffectBendOptions
var $global_CardGameEffectBendOptions = function() {
};
$global_CardGameEffectBendOptions.createInstance = function() {
	return $global_CardGameEffectBendOptions.$ctor();
};
$global_CardGameEffectBendOptions.$ctor = function() {
	var $this = {};
	$this.degrees = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameEffectHighlightOptions
var $global_CardGameEffectHighlightOptions = function() {
};
$global_CardGameEffectHighlightOptions.createInstance = function() {
	return $global_CardGameEffectHighlightOptions.$ctor();
};
$global_CardGameEffectHighlightOptions.$ctor = function() {
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
var $global_CardGameEffectRotateOptions = function() {
};
$global_CardGameEffectRotateOptions.createInstance = function() {
	return $global_CardGameEffectRotateOptions.$ctor();
};
$global_CardGameEffectRotateOptions.$ctor = function() {
	var $this = {};
	$this.degrees = 0;
	return $this;
};
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
////////////////////////////////////////////////////////////////////////////////
// global.CardGameTableSpaceOptions
var $global_CardGameTableSpaceOptions = function() {
};
$global_CardGameTableSpaceOptions.createInstance = function() {
	return $global_CardGameTableSpaceOptions.$ctor();
};
$global_CardGameTableSpaceOptions.$ctor = function() {
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
	$this.resizeType = 0;
	$this.resizeType = 0;
	$this.rotate = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameCardState
var $global_CardState = function() {
};
$global_CardState.prototype = { faceUp: 0, faceDown: 1, faceUpIfOwned: 2 };
Type.registerEnum(global, 'global.CardState', $global_CardState, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameCardType
var $global_CardType = function() {
};
$global_CardType.prototype = { heart: 0, diamond: 1, spade: 2, club: 3 };
Type.registerEnum(global, 'global.CardType', $global_CardType, false);
////////////////////////////////////////////////////////////////////////////////
// global.DomUtils
var $global_domUtils = function() {
};
$global_domUtils.nopx = function(ar) {
	if (ss.isNullOrUndefined(ar)) {
		return 0;
	}
	return parseFloat(ar.replaceAll('px', ''));
};
$global_domUtils.px = function(ar) {
	return ar + 'px';
};
$global_domUtils.transformRadius = function(ar) {
	return String.format('rotate({0}deg)', ar);
};
$global_domUtils.noTransformRadius = function(ar) {
	return parseFloat(ar.replaceAll('rotate(', '').replaceAll('deg)', ''));
	//todo regex??
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceEffect
var $global_Effect = function(type) {
	this.type = 0;
	this.post = 0;
	this.childrenEffects = null;
	this.type = type;
	this.post = 0;
};
$global_Effect.prototype = {
	chainEffect: function(ef) {
		this.childrenEffects = ef;
		return ef;
	},
	build: function(m) {
	},
	tearDown: function(m) {
	},
	build$1: function(m) {
	},
	tearDown$1: function(em) {
	}
};
$global_Effect.fromJson = function(effect) {
	var ef;
	switch (effect.type) {
		case 0: {
			var $t1 = $global_CardGameEffectHighlightOptions.$ctor();
			$t1.color = Type.cast(effect.color, String);
			$t1.offsetX = ss.Nullable.unbox(Type.cast(ss.coalesce(effect.offsetX, 0), Number));
			$t1.offsetY = ss.Nullable.unbox(Type.cast(ss.coalesce(effect.offsetY, 0), Number));
			$t1.radius = ss.Nullable.unbox(Type.cast(ss.coalesce(effect.radius, 0), Number));
			$t1.rotate = ss.Nullable.unbox(Type.cast(ss.coalesce(effect.rotate, 0), Number));
			ef = new $global_Effect$Highlight($t1);
			break;
		}
		case 1: {
			var $t2 = $global_CardGameEffectRotateOptions.$ctor();
			$t2.degrees = ss.Nullable.unbox(Type.cast(ss.coalesce(effect.degrees, 0), Number));
			ef = new $global_Effect$Rotate($t2);
			break;
		}
		case 2: {
			var $t3 = $global_CardGameEffectBendOptions.$ctor();
			$t3.degrees = ss.Nullable.unbox(Type.cast(ss.coalesce(effect.degrees, 0), Number));
			ef = new $global_Effect$Bend($t3);
			break;
		}
		case 3: {
			ef = new $global_Effect$StyleProperty(new $global_AppearanceStyle());
			var jm = ef;
			eval('jm.style=effect.style');
			break;
		}
		case 4: {
			ef = null;
			break;
		}
		default: {
			ef = null;
			break;
		}
	}
	if (ss.isValue(ef.childrenEffects)) {
		ef.childrenEffects = $global_Effect.fromJson(effect.childrenEffects);
	}
	return ef;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceEffectBend
var $global_Effect$Bend = function(options) {
	this.degrees = 0;
	$global_Effect.call(this, 2);
	this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
	this.post = 1;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceEffectHighlight
var $global_Effect$Highlight = function(options) {
	this.radius = 0;
	this.color = null;
	this.rotate = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	$global_Effect.call(this, 0);
	this.radius = ((options.radius === 0) ? 0 : options.radius);
	this.color = (ss.isNullOrUndefined(options.color) ? 'yellow' : options.color);
	this.rotate = ((options.rotate === 0) ? 0 : options.rotate);
	this.offsetX = ((options.offsetX === 0) ? 0 : options.offsetX);
	this.offsetY = ((options.offsetY === 0) ? 0 : options.offsetY);
	this.post = 0;
};
$global_Effect$Highlight.prototype = {
	build: function(e) {
		var em = e.outerElement;
		em.style.padding = String.format('{0} {0} {0} {0}', $global_domUtils.px(this.radius));
		em.style.backgroundColor = this.color;
		em.style.backgroundColor = this.color;
		em.style.border = 'solid 2px black';
		em.style['border-radius'] = $global_domUtils.px(15);
		em.style['box-shadow'] = '4px 4px 2px #333';
	},
	build$1: function(e) {
		var em = e.outerElement;
		em.style.padding = String.format('{0} {0} {0} {0}', $global_domUtils.px(this.radius));
		em.style.backgroundColor = this.color;
		em.style.border = 'solid 2px black';
		em.style['border-radius'] = $global_domUtils.px(15);
		em.style['box-shadow'] = '4px 4px 2px #333';
	},
	tearDown: function(e) {
		var em = e.outerElement;
		var paddingRadiusL = $global_domUtils.nopx(em.style.paddingLeft);
		var paddingRadiusT = $global_domUtils.nopx(em.style.paddingTop);
		em.style.left = $global_domUtils.px($global_domUtils.nopx(em.style.left) - $global_domUtils.nopx(em.style.paddingLeft));
		em.style.top = $global_domUtils.px($global_domUtils.nopx(em.style.top) - $global_domUtils.nopx(em.style.paddingTop));
		for (var i = 0; i < em.childNodes.length; i++) {
			if (em.childNodes[i].tagName === 'DIV') {
				em.childNodes[i].style.left = $global_domUtils.px($global_domUtils.nopx(em.childNodes[i].style.left) + paddingRadiusL);
				em.childNodes[i].style.top = $global_domUtils.px($global_domUtils.nopx(em.childNodes[i].style.top) + paddingRadiusT);
			}
		}
	},
	tearDown$1: function(e) {
		var em = e.outerElement;
		var paddingRadiusL = $global_domUtils.nopx(em.style.paddingLeft);
		var paddingRadiusT = $global_domUtils.nopx(em.style.paddingTop);
		em.style.left = $global_domUtils.px($global_domUtils.nopx(em.style.left) - $global_domUtils.nopx(em.style.paddingLeft));
		em.style.top = $global_domUtils.px($global_domUtils.nopx(em.style.top) - $global_domUtils.nopx(em.style.paddingTop));
		for (var i = 0; i < em.childNodes.length; i++) {
			if (em.childNodes[i].tagName === 'DIV') {
				em.childNodes[i].style.left = $global_domUtils.px($global_domUtils.nopx(em.childNodes[i].style.left) + paddingRadiusL);
				em.childNodes[i].style.top = $global_domUtils.px($global_domUtils.nopx(em.childNodes[i].style.top) + paddingRadiusT);
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceEffectRotate
var $global_Effect$Rotate = function(options) {
	this.degrees = 0;
	$global_Effect.call(this, 1);
	this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
	this.post = 1;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceEffectStyleProperty
var $global_Effect$StyleProperty = function(style) {
	this.style = null;
	$global_Effect.call(this, 3);
	this.style = style;
};
$global_Effect$StyleProperty.prototype = {
	build: function(m) {
		if (ss.isNullOrUndefined(this.style)) {
			return;
		}
		m.outerElement.style.backgroundColor = this.style.outerStyle.backColor;
		if (ss.isValue(this.style.outerStyle.border)) {
			if (ss.isValue(this.style.outerStyle.border.left)) {
				m.outerElement.style.borderLeftColor = this.style.outerStyle.border.left.color;
				m.outerElement.style.borderLeftStyle = this.style.outerStyle.border.left.style.toString();
				m.outerElement.style.borderLeftWidth = this.style.outerStyle.border.left.width;
			}
			if (ss.isValue(this.style.outerStyle.border.top)) {
				m.outerElement.style.borderTopColor = this.style.outerStyle.border.top.color;
				m.outerElement.style.borderTopStyle = this.style.outerStyle.border.top.style.toString();
				m.outerElement.style.borderTopWidth = this.style.outerStyle.border.top.width;
			}
			if (ss.isValue(this.style.outerStyle.border.right)) {
				m.outerElement.style.borderRightColor = this.style.outerStyle.border.right.color;
				m.outerElement.style.borderRightStyle = this.style.outerStyle.border.right.style.toString();
				m.outerElement.style.borderRightWidth = this.style.outerStyle.border.right.width;
			}
			if (ss.isValue(this.style.outerStyle.border.bottom)) {
				m.outerElement.style.borderBottomColor = this.style.outerStyle.border.bottom.color;
				m.outerElement.style.borderBottomStyle = this.style.outerStyle.border.bottom.style.toString();
				m.outerElement.style.borderBottomWidth = this.style.outerStyle.border.bottom.width;
			}
		}
	},
	tearDown: function(m) {
		$global_Effect.prototype.tearDown.call(this, m);
	},
	build$1: function(m) {
		if (ss.isNullOrUndefined(this.style)) {
			return;
		}
		m.outerElement.style.backgroundColor = this.style.outerStyle.backColor;
	},
	tearDown$1: function(em) {
		$global_Effect.prototype.tearDown$1.call(this, em);
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.EffectType
var $global_EffectType = function() {
};
$global_EffectType.prototype = { highlight: 0, rotate: 1, bend: 2, styleProperty: 3, animated: 4 };
Type.registerEnum(global, 'global.EffectType', $global_EffectType, false);
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
$global_FiberYieldResponse.$ctor2.prototype = $global_FiberYieldResponse.$ctor1.prototype = $global_FiberYieldResponse.$ctor3.prototype = $global_FiberYieldResponse.prototype;
////////////////////////////////////////////////////////////////////////////////
// global.FiberYieldResponseType
var $global_FiberYieldResponseType = function() {
};
$global_FiberYieldResponseType.prototype = { askQuestion: 0, log: 1, gameOver: 2, break: 3, variableLookup: 4 };
Type.registerEnum(global, 'global.FiberYieldResponseType', $global_FiberYieldResponseType, false);
////////////////////////////////////////////////////////////////////////////////
// global.GameCardGameOptions
var $global_GameCardGameOptions = function() {
};
$global_GameCardGameOptions.createInstance = function() {
	return $global_GameCardGameOptions.$ctor();
};
$global_GameCardGameOptions.$ctor = function() {
	var $this = {};
	$this.numberOfCards = 0;
	$this.numberOfJokers = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.GameCardGameTextAreaOptions
var $global_GameCardGameTextAreaOptions = function() {
};
$global_GameCardGameTextAreaOptions.createInstance = function() {
	return $global_GameCardGameTextAreaOptions.$ctor();
};
$global_GameCardGameTextAreaOptions.$ctor = function() {
	var $this = {};
	$this.name = null;
	$this.x = 0;
	$this.nayme = 0;
	$this.text = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameOrder
var $global_Order = function() {
};
$global_Order.prototype = { noOrder: 0, ascending: 1, descending: 2 };
Type.registerEnum(global, 'global.Order', $global_Order, false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGamePile
var $global_Pile = function(name) {
	this.name = null;
	this.cards = null;
	this.name = name;
	this.cards = [];
};
$global_Pile.prototype = {
	shuffle: function() {
		var o = this.cards;
		var x;
		for (var j, i = o.length; i === 0; j = parseInt((Math.random() * i).toString()), x = o[--i], o[i] = o[j], o[j] = x) {
			;
		}
		//lol
		this.cards = o;
	}
};
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
////////////////////////////////////////////////////////////////////////////////
// global.CardGamePokerWinType
var $global_PokerWinType = function() {
};
$global_PokerWinType.prototype = { straight: 1, flush: 2, pair: 3, threeOfAKind: 4, fourOfAKind: 5, straightFlush: 6 };
Type.registerEnum(global, 'global.PokerWinType', $global_PokerWinType, false);
////////////////////////////////////////////////////////////////////////////////
// global.Rectangle
var $global_Rectangle = function(x, y, width, height) {
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
// global.Shuff
var $global_shuff = function() {
};
$global_shuff.askQuestion = function(user, question, answers, cardGame) {
	cardGame.emulating = false;
	if (cardGame.answers.length - 1 > cardGame.answerIndex) {
		cardGame.emulating = true;
		return cardGame.answers[cardGame.answerIndex++].value;
		//todo .value
	}
	var m = new $global_CardGameQuestion(user, question, answers, cardGame);
	var answer = Fiber.yield(new $global_FiberYieldResponse.$ctor2(0, m));
	cardGame.answerIndex++;
	return (ss.isNullOrUndefined(answer) ? 0 : answer.value);
};
$global_shuff.declareWinner = function(user) {
	Fiber.yield(new $global_FiberYieldResponse(2));
};
$global_shuff.log = function(msg) {
	Fiber.yield(new $global_FiberYieldResponse.$ctor1(1, msg));
};
$global_shuff.break_ = function(lineNumber, cardGame, varLookup) {
	if (cardGame.emulating) {
		return;
	}
	var yieldObject = new $global_FiberYieldResponse.$ctor3(3, lineNumber - 1, '');
	while (true) {
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
////////////////////////////////////////////////////////////////////////////////
// global.SpaceDrawing
var $global_SpaceDrawing = function(item1) {
	this.outerElement = null;
	this.childNodes = null;
	this.outerElement = item1;
	this.childNodes = [];
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameTableSpace
var $global_TableSpace = function(options) {
	this.vertical = false;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.pile = null;
	this.appearance = null;
	this.visible = false;
	this.stackCards = false;
	this.drawCardsBent = false;
	this.name = null;
	this.sortPrder = 0;
	this.numerOfCardsHorizontal = 0;
	this.numerOfCardsVertical = 0;
	this.resizeType = 0;
	this.vertical = (!options.vertical ? false : options.vertical);
	this.x = ((options.x === 0) ? 0 : options.x);
	this.y = ((options.y === 0) ? 0 : options.y);
	this.width = ((options.width === 0) ? 0 : options.width);
	this.height = ((options.height === 0) ? 0 : options.height);
	this.pile = options.pile;
	//Rotate = options.Rotate == 0 ? 0 : options.Rotate;
	this.visible = (!options.visible ? true : options.visible);
	this.stackCards = (!options.stackCards ? false : options.stackCards);
	this.drawCardsBent = (!options.drawCardsBent ? true : options.drawCardsBent);
	this.name = ss.coalesce(options.name, 'TableSpace');
	this.sortPrder = options.sortPrder;
	this.numerOfCardsHorizontal = ((options.numerOfCardsHorizontal === 0) ? 1 : options.numerOfCardsHorizontal);
	this.numerOfCardsVertical = ((options.numerOfCardsVertical === 0) ? 1 : options.numerOfCardsVertical);
	this.resizeType = options.resizeType;
	//Rotate = ExtensionMethods.eval("options.rotate? options.rotate : 0");
	this.appearance = new $global_Appearance();
};
////////////////////////////////////////////////////////////////////////////////
// global.TableSpaceResizeType
var $global_TableSpaceResizeType = function() {
};
$global_TableSpaceResizeType.prototype = { grow: 0, static: 1 };
Type.registerEnum(global, 'global.TableSpaceResizeType', $global_TableSpaceResizeType, false);
////////////////////////////////////////////////////////////////////////////////
// global.GameCardGameTextArea
var $global_TableTextArea = function(options) {
	this.name = null;
	this.x = 0;
	this.y = 0;
	this.text = null;
	this.name = ss.coalesce(options.name, 'Text Area');
	this.x = ((options.x === 0) ? 0 : options.x);
	this.y = ((options.nayme === 0) ? 0 : options.nayme);
	this.text = ss.coalesce(options.text, 'Text');
};
////////////////////////////////////////////////////////////////////////////////
// global.CardGameUser
var $global_User = function(name) {
	this.userName = null;
	this.playerDealingOrder = 0;
	this.cards = null;
	this.userName = name;
	this.cards = new $global_Pile(name);
};
Type.registerClass(global, 'global._', $global__, Object);
Type.registerClass(global, 'global.AppearanceStyle', $global_AppearanceStyle, Object);
Type.registerClass(global, 'global.AppearanceStyleBorder', $global_AppearanceStyleBorder, Object);
Type.registerClass(global, 'global.AppearanceStyleBorderArea', $global_AppearanceStyleBorderArea, Object);
Type.registerClass(global, 'global.AppearanceStyleItem', $global_AppearanceStyleItem, Object);
Type.registerClass(global, 'global.AppearanceStyleMargin', $global_AppearanceStyleMargin, Object);
Type.registerClass(global, 'global.AppearanceStylePadding', $global_AppearanceStylePadding, Object);
Type.registerClass(global, 'global.ArrayUtils', $global_ArrayUtils, Object);
Type.registerClass(global, 'global.Card', $global_Card, Object);
Type.registerClass(global, 'global.CardDrawing', $global_CardDrawing, Object);
Type.registerClass(global, 'global.CardGame', $global_CardGame, Object);
Type.registerClass(global, 'global.CardGameAnswer', $global_CardGameAnswer, Object);
Type.registerClass(global, 'global.CardGameArea', $global_CardGameArea, Object);
Type.registerClass(global, 'global.CardGameEffectBendOptions', $global_CardGameEffectBendOptions, Object);
Type.registerClass(global, 'global.CardGameEffectHighlightOptions', $global_CardGameEffectHighlightOptions, Object);
Type.registerClass(global, 'global.CardGameEffectRotateOptions', $global_CardGameEffectRotateOptions, Object);
Type.registerClass(global, 'global.CardGameQuestion', $global_CardGameQuestion, Object);
Type.registerClass(global, 'global.CardGameTableSpaceOptions', $global_CardGameTableSpaceOptions, Object);
Type.registerClass(global, 'global.domUtils', $global_domUtils, Object);
Type.registerClass(global, 'global.Effect', $global_Effect, Object);
Type.registerClass(global, 'global.Effect$Bend', $global_Effect$Bend, $global_Effect);
Type.registerClass(global, 'global.Effect$Highlight', $global_Effect$Highlight, $global_Effect);
Type.registerClass(global, 'global.Effect$Rotate', $global_Effect$Rotate, $global_Effect);
Type.registerClass(global, 'global.Effect$StyleProperty', $global_Effect$StyleProperty, $global_Effect);
Type.registerClass(global, 'global.FiberYieldResponse', $global_FiberYieldResponse, Object);
Type.registerClass(global, 'global.GameCardGameOptions', $global_GameCardGameOptions, Object);
Type.registerClass(global, 'global.GameCardGameTextAreaOptions', $global_GameCardGameTextAreaOptions, Object);
Type.registerClass(global, 'global.Pile', $global_Pile, Object);
Type.registerClass(global, 'global.PokerResult', $global_PokerResult, Object);
Type.registerClass(global, 'global.Rectangle', $global_Rectangle, Object);
Type.registerClass(global, 'global.shuff', $global_shuff, Object);
Type.registerClass(global, 'global.SpaceDrawing', $global_SpaceDrawing, Object);
Type.registerClass(global, 'global.TableSpace', $global_TableSpace, Object);
Type.registerClass(global, 'global.TableTextArea', $global_TableTextArea, Object);
Type.registerClass(global, 'global.User', $global_User, Object);
Type.registerClass(global, 'global.AnimatedEffect', $global_AnimatedEffect, $global_Effect);
Type.registerClass(global, 'global.AnimatedEffect$Between', $global_AnimatedEffect$Between, $global_AnimatedEffect);
Type.registerClass(global, 'global.Appearance', $global_Appearance, $global_AppearanceStyle);

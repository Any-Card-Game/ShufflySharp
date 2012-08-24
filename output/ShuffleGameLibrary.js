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
	if (!!(ss.isNullOrUndefined(obj) || !Type.isInstanceOfType(obj, Array) && (!ss.referenceEquals((Type.getInstanceType(obj)), Object) && (eval('({}).toString.call(obj) != \'[object Function]\''))))) {
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
		$t1.dispose();
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
// global.AnimatedEffect
global.AnimatedEffect = function(animationEffectType, duration, ease) {
	this.type = 0;
	this.duration = 0;
	this.pauseAfter = 0;
	this.pauseBefore = 0;
	this.ease = 0;
	global.Effect.call(this, 4);
	this.ease = ease;
	this.type = animationEffectType;
	this.duration = duration;
};
////////////////////////////////////////////////////////////////////////////////
// global.AnimatedEffect$Between
global.AnimatedEffect$Between = function(duration, ease) {
	this.from = null;
	this.to = null;
	global.AnimatedEffect.call(this, 0, duration, ease);
	this.from = new global.Effect$StyleProperty(new global.AppearanceStyle());
	this.to = new global.Effect$StyleProperty(new global.AppearanceStyle());
};
////////////////////////////////////////////////////////////////////////////////
// global.AnimatedEffectEase
global.AnimatedEffectEase = function() {
};
global.AnimatedEffectEase.prototype = {};
global.AnimatedEffectEase.registerEnum('global.AnimatedEffectEase', false);
////////////////////////////////////////////////////////////////////////////////
// global.AnimatedEffectType
global.AnimatedEffectType = function() {
};
global.AnimatedEffectType.prototype = {};
global.AnimatedEffectType.registerEnum('global.AnimatedEffectType', false);
////////////////////////////////////////////////////////////////////////////////
// global.Appearance
global.Appearance = function() {
	this.effects = null;
	global.AppearanceStyle.call(this);
	this.effects = new Array();
};
global.Appearance.fromJson = function(json) {
	var ap = new global.Appearance();
	ap.innerStyle = global.AppearanceStyleItem.fromJson(json.innerStyle);
	ap.outerStyle = global.AppearanceStyleItem.fromJson(json.outerStyle);
	ap.effects = new Array();
	if (ss.isValue(json.effects)) {
		var $t1 = json.effects.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var effect = $t1.get_current();
				ap.effects.add(global.Effect.fromJson(effect));
			}
		}
		finally {
			$t1.dispose();
		}
	}
	return ap;
};
////////////////////////////////////////////////////////////////////////////////
// global.AppearanceStyle
global.AppearanceStyle = function() {
	this.outerStyle = null;
	this.innerStyle = null;
	this.outerStyle = new global.AppearanceStyleItem({});
	this.innerStyle = new global.AppearanceStyleItem({});
};
global.AppearanceStyle.$ctor1 = function(outersStyle, innerStyle) {
	this.outerStyle = null;
	this.innerStyle = null;
	this.outerStyle = outersStyle;
	this.innerStyle = innerStyle;
};
global.AppearanceStyle.$ctor1.prototype = global.AppearanceStyle.prototype;
////////////////////////////////////////////////////////////////////////////////
// global.AppearanceStyleBorder
global.AppearanceStyleBorder = function() {
	this.top = null;
	this.bottom = null;
	this.left = null;
	this.right = null;
	this.all = null;
	this.top = new global.AppearanceStyleBorderArea();
	this.bottom = new global.AppearanceStyleBorderArea();
	this.left = new global.AppearanceStyleBorderArea();
	this.right = new global.AppearanceStyleBorderArea();
	this.all = new global.AppearanceStyleBorderArea();
};
global.AppearanceStyleBorder.fromJson = function(st) {
	var sp = new global.AppearanceStyleBorder();
	sp.all = st.all;
	sp.bottom = st.bottom;
	sp.left = st.left;
	sp.right = st.right;
	sp.top = st.top;
	return sp;
};
////////////////////////////////////////////////////////////////////////////////
// global.AppearanceStyleBorderArea
global.AppearanceStyleBorderArea = function() {
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
// global.AppearanceStyleItem
global.AppearanceStyleItem = function(options) {
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
	this.backColor = Type.cast(Object.coalesce(options.backColor, null), String);
	this.zindex = ss.Nullable.unbox(Type.cast(Object.coalesce(options.zIndex, 0), ss.Int32));
	this.border = Type.cast(Object.coalesce(options.border, new global.AppearanceStyleBorder()), global.AppearanceStyleBorder);
	this.padding = Type.cast(Object.coalesce(options.padding, new global.AppearanceStylePadding()), global.AppearanceStylePadding);
	this.margin = Type.cast(Object.coalesce(options.margin, new global.AppearanceStyleMargin()), global.AppearanceStyleMargin);
	this.cursor = Type.cast(Object.coalesce(options.cursor, 0), ss.Int32);
	this.rotate = 0;
};
global.AppearanceStyleItem.fromJson = function(st) {
	var si = new global.AppearanceStyleItem({});
	si.backColor = st.backColor;
	si.border = global.AppearanceStyleBorder.fromJson(st.border);
	si.cursor = st.cursor;
	si.margin = global.AppearanceStyleMargin.fromJson(st.margin);
	si.padding = global.AppearanceStylePadding.fromJson(st.padding);
	si.rotate = st.rotate;
	si.zindex = st.zindex;
	return si;
};
////////////////////////////////////////////////////////////////////////////////
// global.AppearanceStyleMargin
global.AppearanceStyleMargin = function() {
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
global.AppearanceStyleMargin.fromJson = function(st) {
	var sp = new global.AppearanceStyleMargin();
	sp.all = st.all;
	sp.bottom = st.bottom;
	sp.left = st.left;
	sp.right = st.right;
	sp.top = st.top;
	return sp;
};
////////////////////////////////////////////////////////////////////////////////
// global.AppearanceStylePadding
global.AppearanceStylePadding = function() {
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
global.AppearanceStylePadding.fromJson = function(st) {
	var sp = new global.AppearanceStylePadding();
	sp.all = st.all;
	sp.bottom = st.bottom;
	sp.left = st.left;
	sp.right = st.right;
	sp.top = st.top;
	return sp;
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
			$t2.dispose();
		}
	}
	global.ArrayUtils.$setArrayData(global.Card).call(null, ts, items);
	return ts;
};
global.ArrayUtils.$setArrayData = function(T) {
	return function(ts, items) {
		for (var i = 0; i < items.length; i++) {
			ts[i] = items[i];
		}
	};
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
					var f3 = !!(eval('item.key==t2'));
					//throws wild notimplementedexcpetion if item.key and t2 are cast to dynamic
					if (f3) {
						item.items.add(t);
						good = true;
						break;
					}
				}
			}
			finally {
				$t2.dispose();
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
	this.appearance = null;
	this.value = value;
	this.type = type;
	this.appearance = new global.Appearance();
};
////////////////////////////////////////////////////////////////////////////////
// global.CardDrawing
global.CardDrawing = function(item1, item2) {
	this.outerElement = null;
	this.image = null;
	this.outerElement = item1;
	this.image = item2;
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
			this.users.add(new global.User(players[j].userName));
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
// global.CardGameAppearanceEffectDrawTime
global.CardGameAppearanceEffectDrawTime = function() {
};
global.CardGameAppearanceEffectDrawTime.prototype = {};
global.CardGameAppearanceEffectDrawTime.registerEnum('global.CardGameAppearanceEffectDrawTime', false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleBorderStyle
global.CardGameAppearanceStyleBorderStyle = function() {
};
global.CardGameAppearanceStyleBorderStyle.prototype = {};
global.CardGameAppearanceStyleBorderStyle.registerEnum('global.CardGameAppearanceStyleBorderStyle', false);
////////////////////////////////////////////////////////////////////////////////
// global.CardGameAppearanceStyleCursor
global.CardGameAppearanceStyleCursor = function() {
};
global.CardGameAppearanceStyleCursor.prototype = {};
global.CardGameAppearanceStyleCursor.registerEnum('global.CardGameAppearanceStyleCursor', false);
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
	$this.resizeType = 0;
	$this.resizeType = 0;
	$this.rotate = 0;
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
// global.domUtils
global.domUtils = function() {
};
global.domUtils.nopx = function(ar) {
	if (ss.isNullOrUndefined(ar)) {
		return 0;
	}
	return parseFloat(ar.replaceAll('px', ''));
};
global.domUtils.px = function(ar) {
	return ar + 'px';
};
global.domUtils.transformRadius = function(ar) {
	return String.format('rotate({0}deg)', ar);
};
global.domUtils.noTransformRadius = function(ar) {
	return parseFloat(ar.replaceAll('rotate(', '').replaceAll('deg)', ''));
	//todo regex??
};
////////////////////////////////////////////////////////////////////////////////
// global.Effect
global.Effect = function(type) {
	this.type = 0;
	this.post = 0;
	this.childrenEffects = null;
	this.type = type;
	this.post = 0;
};
global.Effect.prototype = {
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
global.Effect.fromJson = function(effect) {
	var ef;
	switch (effect.type) {
		case 0: {
			var $t1 = global.CardGameEffectHighlightOptions.$ctor();
			$t1.color = Type.cast((effect).color, String);
			$t1.offsetX = ss.Nullable.unbox(Type.cast(Object.coalesce((effect).offsetX, 0), Number));
			$t1.offsetY = ss.Nullable.unbox(Type.cast(Object.coalesce((effect).offsetY, 0), Number));
			$t1.radius = ss.Nullable.unbox(Type.cast(Object.coalesce((effect).radius, 0), Number));
			$t1.rotate = ss.Nullable.unbox(Type.cast(Object.coalesce((effect).rotate, 0), Number));
			ef = new global.Effect$Highlight($t1);
			break;
		}
		case 1: {
			var $t2 = global.CardGameEffectRotateOptions.$ctor();
			$t2.degrees = ss.Nullable.unbox(Type.cast(Object.coalesce((effect).degrees, 0), Number));
			ef = new global.Effect$Rotate($t2);
			break;
		}
		case 2: {
			var $t3 = global.CardGameEffectBendOptions.$ctor();
			$t3.degrees = ss.Nullable.unbox(Type.cast(Object.coalesce((effect).degrees, 0), Number));
			ef = new global.Effect$Bend($t3);
			break;
		}
		case 3: {
			ef = new global.Effect$StyleProperty(new global.AppearanceStyle());
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
		ef.childrenEffects = global.Effect.fromJson(effect.childrenEffects);
	}
	return ef;
};
////////////////////////////////////////////////////////////////////////////////
// global.Effect$Bend
global.Effect$Bend = function(options) {
	this.degrees = 0;
	global.Effect.call(this, 2);
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
	global.Effect.call(this, 0);
	this.radius = ((options.radius === 0) ? 0 : options.radius);
	this.color = (ss.isNullOrUndefined(options.color) ? 'yellow' : options.color);
	this.rotate = ((options.rotate === 0) ? 0 : options.rotate);
	this.offsetX = ((options.offsetX === 0) ? 0 : options.offsetX);
	this.offsetY = ((options.offsetY === 0) ? 0 : options.offsetY);
	this.post = 0;
};
global.Effect$Highlight.prototype = {
	build: function(e) {
		var em = e.outerElement;
		em.style.padding = String.format('{0} {0} {0} {0}', global.domUtils.px(this.radius));
		em.style.backgroundColor = this.color;
		em.style.backgroundColor = this.color;
		em.style.border = 'solid 2px black';
		em.style['border-radius'] = global.domUtils.px(15);
		em.style['box-shadow'] = '4px 4px 2px #333';
	},
	build$1: function(e) {
		var em = e.outerElement;
		em.style.padding = String.format('{0} {0} {0} {0}', global.domUtils.px(this.radius));
		em.style.backgroundColor = this.color;
		em.style.border = 'solid 2px black';
		em.style['border-radius'] = global.domUtils.px(15);
		em.style['box-shadow'] = '4px 4px 2px #333';
	},
	tearDown: function(e) {
		var em = e.outerElement;
		var paddingRadiusL = global.domUtils.nopx(em.style.paddingLeft);
		var paddingRadiusT = global.domUtils.nopx(em.style.paddingTop);
		em.style.left = global.domUtils.px(global.domUtils.nopx(em.style.left) - global.domUtils.nopx(em.style.paddingLeft));
		em.style.top = global.domUtils.px(global.domUtils.nopx(em.style.top) - global.domUtils.nopx(em.style.paddingTop));
		for (var i = 0; i < em.childNodes.length; i++) {
			if (em.childNodes[i].tagName === 'DIV') {
				em.childNodes[i].style.left = global.domUtils.px(global.domUtils.nopx(em.childNodes[i].style.left) + paddingRadiusL);
				em.childNodes[i].style.top = global.domUtils.px(global.domUtils.nopx(em.childNodes[i].style.top) + paddingRadiusT);
			}
		}
	},
	tearDown$1: function(e) {
		var em = e.outerElement;
		var paddingRadiusL = global.domUtils.nopx(em.style.paddingLeft);
		var paddingRadiusT = global.domUtils.nopx(em.style.paddingTop);
		em.style.left = global.domUtils.px(global.domUtils.nopx(em.style.left) - global.domUtils.nopx(em.style.paddingLeft));
		em.style.top = global.domUtils.px(global.domUtils.nopx(em.style.top) - global.domUtils.nopx(em.style.paddingTop));
		for (var i = 0; i < em.childNodes.length; i++) {
			if (em.childNodes[i].tagName === 'DIV') {
				em.childNodes[i].style.left = global.domUtils.px(global.domUtils.nopx(em.childNodes[i].style.left) + paddingRadiusL);
				em.childNodes[i].style.top = global.domUtils.px(global.domUtils.nopx(em.childNodes[i].style.top) + paddingRadiusT);
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.Effect$Rotate
global.Effect$Rotate = function(options) {
	this.degrees = 0;
	global.Effect.call(this, 1);
	this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
	this.post = 1;
};
////////////////////////////////////////////////////////////////////////////////
// global.Effect$StyleProperty
global.Effect$StyleProperty = function(style) {
	this.style = null;
	global.Effect.call(this, 3);
	this.style = style;
};
global.Effect$StyleProperty.prototype = {
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
		global.Effect.prototype.tearDown.call(this, m);
	},
	build$1: function(m) {
		if (ss.isNullOrUndefined(this.style)) {
			return;
		}
		m.outerElement.style.backgroundColor = this.style.outerStyle.backColor;
	},
	tearDown$1: function(em) {
		global.Effect.prototype.tearDown$1.call(this, em);
	}
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
	this.type = 0;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
};
global.FiberYieldResponse.$ctor2 = function(type, question) {
	this.variableLookup = null;
	this.type = 0;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
	this.question = question;
};
global.FiberYieldResponse.$ctor1 = function(type, contents) {
	this.variableLookup = null;
	this.type = 0;
	this.contents = null;
	this.question = null;
	this.lineNumber = 0;
	this.value = null;
	this.type = type;
	this.contents = contents;
};
global.FiberYieldResponse.$ctor3 = function(type, lineNumber, value) {
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
global.FiberYieldResponse.$ctor2.prototype = global.FiberYieldResponse.$ctor1.prototype = global.FiberYieldResponse.$ctor3.prototype = global.FiberYieldResponse.prototype;
////////////////////////////////////////////////////////////////////////////////
// global.FiberYieldResponseType
global.FiberYieldResponseType = function() {
};
global.FiberYieldResponseType.prototype = {};
global.FiberYieldResponseType.registerEnum('global.FiberYieldResponseType', false);
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
		return cardGame.answers[cardGame.answerIndex++].value;
		//todo .value
	}
	var m = new global.CardGameQuestion(user, question, answers, cardGame);
	var answer = yield(new global.FiberYieldResponse.$ctor2(0, m));
	cardGame.answerIndex++;
	return (ss.isNullOrUndefined(answer) ? 0 : answer.value);
};
global.shuff.declareWinner = function(user) {
	yield(new global.FiberYieldResponse(2));
};
global.shuff.log = function(msg) {
	yield(new global.FiberYieldResponse.$ctor1(1, msg));
};
global.shuff.break_ = function(lineNumber, cardGame, varLookup) {
	if (cardGame.emulating) {
		return;
	}
	var yieldObject = new global.FiberYieldResponse.$ctor3(3, lineNumber - 1, '');
	while (true) {
		var answ = yield(yieldObject);
		if (ss.isNullOrUndefined(answ)) {
			//continue
			return;
		}
		if (ss.isValue(answ.variableLookup)) {
			yieldObject = new global.FiberYieldResponse.$ctor3(4, 0, varLookup(answ.variableLookup));
			continue;
		}
		break;
	}
};
////////////////////////////////////////////////////////////////////////////////
// global.SpaceDrawing
global.SpaceDrawing = function(item1) {
	this.outerElement = null;
	this.childNodes = null;
	this.outerElement = item1;
	this.childNodes = new Array();
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
	this.name = Object.coalesce(options.name, 'TableSpace');
	this.sortPrder = options.sortPrder;
	this.numerOfCardsHorizontal = ((options.numerOfCardsHorizontal === 0) ? 1 : options.numerOfCardsHorizontal);
	this.numerOfCardsVertical = ((options.numerOfCardsVertical === 0) ? 1 : options.numerOfCardsVertical);
	this.resizeType = options.resizeType;
	//Rotate = ExtensionMethods.eval("options.rotate? options.rotate : 0");
	this.appearance = new global.Appearance();
};
////////////////////////////////////////////////////////////////////////////////
// global.TableSpaceResizeType
global.TableSpaceResizeType = function() {
};
global.TableSpaceResizeType.prototype = {};
global.TableSpaceResizeType.registerEnum('global.TableSpaceResizeType', false);
////////////////////////////////////////////////////////////////////////////////
// global.TableTextArea
global.TableTextArea = function(options) {
	this.name = null;
	this.x = 0;
	this.y = 0;
	this.text = null;
	this.name = Object.coalesce(options.name, 'Text Area');
	this.x = ((options.x === 0) ? 0 : options.x);
	this.y = ((options.nayme === 0) ? 0 : options.nayme);
	this.text = Object.coalesce(options.text, 'Text');
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
global.AppearanceStyle.registerClass('global.AppearanceStyle', Object);
global.AppearanceStyleBorder.registerClass('global.AppearanceStyleBorder', Object);
global.AppearanceStyleBorderArea.registerClass('global.AppearanceStyleBorderArea', Object);
global.AppearanceStyleItem.registerClass('global.AppearanceStyleItem', Object);
global.AppearanceStyleMargin.registerClass('global.AppearanceStyleMargin', Object);
global.AppearanceStylePadding.registerClass('global.AppearanceStylePadding', Object);
global.ArrayUtils.registerClass('global.ArrayUtils', Object);
global.Card.registerClass('global.Card', Object);
global.CardDrawing.registerClass('global.CardDrawing', Object);
global.CardGame.registerClass('global.CardGame', Object);
global.CardGameAnswer.registerClass('global.CardGameAnswer', Object);
global.CardGameArea.registerClass('global.CardGameArea', Object);
global.CardGameEffectBendOptions.registerClass('global.CardGameEffectBendOptions', Object);
global.CardGameEffectHighlightOptions.registerClass('global.CardGameEffectHighlightOptions', Object);
global.CardGameEffectRotateOptions.registerClass('global.CardGameEffectRotateOptions', Object);
global.CardGameQuestion.registerClass('global.CardGameQuestion', Object);
global.CardGameTableSpaceOptions.registerClass('global.CardGameTableSpaceOptions', Object);
global.domUtils.registerClass('global.domUtils', Object);
global.Effect.registerClass('global.Effect', Object);
global.Effect$Bend.registerClass('global.Effect$Bend', global.Effect);
global.Effect$Highlight.registerClass('global.Effect$Highlight', global.Effect);
global.Effect$Rotate.registerClass('global.Effect$Rotate', global.Effect);
global.Effect$StyleProperty.registerClass('global.Effect$StyleProperty', global.Effect);
global.FiberYieldResponse.registerClass('global.FiberYieldResponse', Object);
global.GameCardGameOptions.registerClass('global.GameCardGameOptions', Object);
global.GameCardGameTextAreaOptions.registerClass('global.GameCardGameTextAreaOptions', Object);
global.Pile.registerClass('global.Pile', Object);
global.PokerResult.registerClass('global.PokerResult', Object);
global.Rectangle.registerClass('global.Rectangle', Object);
global.shuff.registerClass('global.shuff', Object);
global.SpaceDrawing.registerClass('global.SpaceDrawing', Object);
global.TableSpace.registerClass('global.TableSpace', Object);
global.TableTextArea.registerClass('global.TableTextArea', Object);
global.User.registerClass('global.User', Object);
global.AnimatedEffect.registerClass('global.AnimatedEffect', global.Effect);
global.AnimatedEffect$Between.registerClass('global.AnimatedEffect$Between', global.AnimatedEffect);
global.Appearance.registerClass('global.Appearance', global.AppearanceStyle);

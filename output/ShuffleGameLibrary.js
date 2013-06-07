
(function() {
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
		if (!!(ss.isNullOrUndefined(obj) || !ss.isInstanceOfType(obj, Array) && (!ss.referenceEquals(ss.getInstanceType(obj), Object) && eval('({}).toString.call(obj) != \'[object Function]\'')))) {
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
	ss.registerEnum(global, 'global.AnimatedEffectEase', $global_AnimatedEffectEase, false);
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceAnimatedEffectType
	var $global_AnimatedEffectType = function() {
	};
	$global_AnimatedEffectType.prototype = { between: 0 };
	ss.registerEnum(global, 'global.AnimatedEffectType', $global_AnimatedEffectType, false);
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearance
	var $global_Appearance = function() {
		this.effects = null;
		this.effectNames = null;
		$global_AppearanceStyle.call(this);
		this.effects = [];
		this.effectNames = [];
	};
	$global_Appearance.fromJson = function(json) {
		var ap = new $global_Appearance();
		ap.innerStyle = $global_AppearanceStyleItem.fromJson(json.innerStyle);
		ap.outerStyle = $global_AppearanceStyleItem.fromJson(json.outerStyle);
		ap.effects = [];
		if (ss.isValue(json.effects)) {
			for (var $t1 = 0; $t1 < json.effects.length; $t1++) {
				var effect = json.effects[$t1];
				ss.add(ap.effects, $global_Effect.fromJson(effect));
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
	// global.CardGameAppearanceStyleCursor
	var $global_AppearanceStyleCursor = function() {
	};
	$global_AppearanceStyleCursor.prototype = { default: 'default', auto: 'auto', pointer: 'pointer', move: 'move', eResize: 'eResize', neResize: 'neResize', nwResize: 'nwResize', nResize: 'nResize', seResize: 'seResize', swResize: 'swResize', sResize: 'sResize', wResize: 'wResize', text: 'text', wait: 'wait', help: 'help' };
	ss.registerEnum(global, 'global.AppearanceStyleCursor', $global_AppearanceStyleCursor, false);
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
		this.backColor = ss.cast(ss.coalesce(options.backColor, null), String);
		this.zindex = ss.Nullable.unbox(ss.cast(ss.coalesce(options.zIndex, 0), ss.Int32));
		var $t1 = options.border;
		if (ss.isNullOrUndefined($t1)) {
			$t1 = new $global_AppearanceStyleBorder();
		}
		this.border = ss.cast($t1, $global_AppearanceStyleBorder);
		var $t2 = options.padding;
		if (ss.isNullOrUndefined($t2)) {
			$t2 = new $global_AppearanceStylePadding();
		}
		this.padding = ss.cast($t2, $global_AppearanceStylePadding);
		var $t3 = options.margin;
		if (ss.isNullOrUndefined($t3)) {
			$t3 = new $global_AppearanceStyleMargin();
		}
		this.margin = ss.cast($t3, $global_AppearanceStyleMargin);
		this.cursor = ss.cast(ss.coalesce(options.cursor, 0), ss.Int32);
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
	////////////////////////////////////////////////////////////////////////////////
	// global.ArrayUtils.GroupByKey
	var $global_ArrayUtils$GroupByKey$2 = function(T, T2) {
		var $type = function(key, items) {
			this.key = ss.getDefaultValue(T2);
			this.items = null;
			this.key = key;
			this.items = items;
		};
		ss.registerGenericClassInstance($type, $global_ArrayUtils$GroupByKey$2, [T, T2], function() {
			return Object;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'global.ArrayUtils$GroupByKey$2', $global_ArrayUtils$GroupByKey$2, 2);
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
	var $global_CardDrawing = function(item1) {
		this.outerElement = null;
		this.outerElementStyle = null;
		this.outerElement = item1;
		this.outerElementStyle = new $global_InternalStyle();
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
			ss.add(this.deck.cards, new $global_Card(i % 13, ss.Int32.trunc(Math.floor(ss.Int32.div(i, 13)))));
		}
		for (var i1 = 0; i1 < this.numberOfJokers; i1++) {
			ss.add(this.deck.cards, new $global_Card(0, 0));
		}
		this.size = options.size || CommonLibraries.Size.$ctor1(15, 15);
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
				ss.arrayRemoveRange(players, 6, players.length - 6);
			}
			for (var j = 0; j < players.length; j++) {
				ss.add(this.users, new $global_User(players[j].userName));
			}
		},
		dealCards: function(numberOfCards, state) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAnswer
	var $global_CardGameAnswer = function() {
	};
	$global_CardGameAnswer.createInstance = function() {
		return $global_CardGameAnswer.$ctor();
	};
	$global_CardGameAnswer.$ctor = function() {
		var $this = {};
		$this.value = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceEffectDrawTime
	var $global_CardGameAppearanceEffectDrawTime = function() {
	};
	$global_CardGameAppearanceEffectDrawTime.prototype = { pre: 0, during: 1, post: 2 };
	ss.registerEnum(global, 'global.CardGameAppearanceEffectDrawTime', $global_CardGameAppearanceEffectDrawTime, false);
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceStyleBorderStyle
	var $global_CardGameAppearanceStyleBorderStyle = function() {
	};
	$global_CardGameAppearanceStyleBorderStyle.prototype = { none: 0, dotted: 1, dashed: 2, solid: 3, double$1: 4, groove: 5, ridge: 6, inset: 7, offset: 8 };
	ss.registerEnum(global, 'global.CardGameAppearanceStyleBorderStyle', $global_CardGameAppearanceStyleBorderStyle, false);
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
		$this.opacity = 0;
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
		this.sortOrder = 0;
		this.numerOfCardsHorizontal = 0;
		this.numerOfCardsVertical = 0;
		this.resizeType = 0;
		this.resizeType = 0;
		this.rotate = 0;
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameCardState
	var $global_CardState = function() {
	};
	$global_CardState.prototype = { faceUp: 0, faceDown: 1, faceUpIfOwned: 2 };
	ss.registerEnum(global, 'global.CardState', $global_CardState, false);
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameCardType
	var $global_CardType = function() {
	};
	$global_CardType.prototype = { heart: 0, diamond: 1, spade: 2, club: 3 };
	ss.registerEnum(global, 'global.CardType', $global_CardType, false);
	////////////////////////////////////////////////////////////////////////////////
	// global.DomUtils
	var $global_domUtils = function() {
	};
	$global_domUtils.nopx = function(ar) {
		if (ss.isNullOrUndefined(ar)) {
			return 0;
		}
		return parseFloat(ss.replaceAllString(ar, 'px', ''));
	};
	$global_domUtils.px = function(ar) {
		return ar + 'px';
	};
	$global_domUtils.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$global_domUtils.noTransformRotate = function(ar) {
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceEffect
	var $global_Effect = function(type) {
		this.type = 0;
		this.drawTime = 0;
		this.chainedEffect = null;
		this.type = type;
		this.drawTime = 0;
	};
	$global_Effect.prototype = {
		chainEffect: function(ef) {
			this.chainedEffect = ef;
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
				$t1.color = ss.cast(effect.color, String);
				$t1.offsetX = ss.Nullable.unbox(ss.cast(ss.coalesce(effect.offsetX, 0), Number));
				$t1.offsetY = ss.Nullable.unbox(ss.cast(ss.coalesce(effect.offsetY, 0), Number));
				$t1.radius = ss.Nullable.unbox(ss.cast(ss.coalesce(effect.radius, 0), Number));
				$t1.rotate = ss.Nullable.unbox(ss.cast(ss.coalesce(effect.rotate, 0), Number));
				ef = new $global_Effect$Highlight($t1);
				break;
			}
			case 1: {
				var $t2 = $global_CardGameEffectRotateOptions.$ctor();
				$t2.degrees = ss.Nullable.unbox(ss.cast(ss.coalesce(effect.degrees, 0), Number));
				ef = new $global_Effect$Rotate($t2);
				break;
			}
			case 2: {
				var $t3 = $global_CardGameEffectBendOptions.$ctor();
				$t3.degrees = ss.Nullable.unbox(ss.cast(ss.coalesce(effect.degrees, 0), Number));
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
		if (ss.isValue(ef.chainedEffect)) {
			ef.chainedEffect = $global_Effect.fromJson(effect.chainedEffect);
		}
		return ef;
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceEffectBend
	var $global_Effect$Bend = function(options) {
		this.degrees = 0;
		$global_Effect.call(this, 2);
		this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
		this.drawTime = 1;
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceEffectHighlight
	var $global_Effect$Highlight = function(options) {
		this.radius = 0;
		this.color = null;
		this.rotate = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		this.opacity = 0;
		$global_Effect.call(this, 0);
		this.radius = ((options.radius === 0) ? 0 : options.radius);
		this.color = (ss.isNullOrUndefined(options.color) ? 'yellow' : options.color);
		this.rotate = ((options.rotate === 0) ? 0 : options.rotate);
		this.opacity = ((options.opacity === 0) ? 0 : options.opacity);
		this.offsetX = ((options.offsetX === 0) ? 0 : options.offsetX);
		this.offsetY = ((options.offsetY === 0) ? 0 : options.offsetY);
		this.drawTime = 0;
	};
	$global_Effect$Highlight.prototype = {
		build: function(e) {
			var em = e.outerElementStyle;
			em.set_padding(ss.formatString('{0} {0} {0} {0}', $global_domUtils.px(this.radius)));
			em.set_backgroundColor(this.color);
			em.set_border('solid 2px black');
			em.set_left($global_domUtils.px($global_domUtils.nopx(em.get_left()) - this.radius));
			em.set_top($global_domUtils.px($global_domUtils.nopx(em.get_top()) - this.radius));
			em.set_borderRadius($global_domUtils.px(15));
			em.set_boxShadow('4px 4px 2px #333');
		},
		build$1: function(e) {
			var cur = new $global_InternalStyle();
			cur.addChild(e.outerElementStyle);
			e.outerElementStyle = cur;
			var em = e.outerElementStyle;
			em.set_padding(ss.formatString('{0} {0} {0} {0}', $global_domUtils.px(this.radius)));
			em.set_backgroundColor(this.color);
			em.set_border('solid 2px black');
			em.set_left($global_domUtils.px($global_domUtils.nopx(em.get_left()) - this.radius));
			em.set_top($global_domUtils.px($global_domUtils.nopx(em.get_top()) - this.radius));
			em.set_borderRadius($global_domUtils.px(15));
			em.set_boxShadow('4px 4px 2px #333');
		},
		tearDown: function(e) {
			//
			//            var em = e.OuterElementStyle;
			//
			//            
			//
			//            ///     Window.Alert("good2");
			//
			//            
			//
			//            double paddingRadiusL = em.PaddingLeft.nopx();
			//
			//            double paddingRadiusT = em.PaddingTop.nopx();
			//
			//            em.Left = ( em.Left.nopx() - em.PaddingLeft.nopx() ).px();
			//
			//            em.Top = ( em.Top.nopx() - em.PaddingTop.nopx() ).px();
			//
			//            
			//
			//            for (int i = 0; i < e.OuterElement.ChildNodes.Length; i++) {
			//
			//            var childNode = e.OuterElement.ChildNodes[i];
			//
			//            
			//
			//            if (childNode.TagName == "DIV") {
			//
			//            childNode.Style.Left = ( childNode.Style.Left.nopx() + paddingRadiusL ).px();
			//
			//            childNode.Style.Top = ( childNode.Style.Top.nopx() + paddingRadiusT ).px();
			//
			//            }
			//
			//            }
		},
		tearDown$1: function(e) {
			//
			//            var em = e.OuterElementStyle;
			//
			//            
			//
			//            ///     Window.Alert("good2");
			//
			//            
			//
			//            double paddingRadiusL = em.PaddingLeft.nopx();
			//
			//            double paddingRadiusT = em.PaddingTop.nopx();
			//
			//            em.Left = ( em.Left.nopx() - em.PaddingLeft.nopx() ).px();
			//
			//            em.Top = ( em.Top.nopx() - em.PaddingTop.nopx() ).px();
			//
			//            
			//
			//            for (int i = 0; i < e.OuterElement.ChildNodes.Length; i++) {
			//
			//            var childNode = e.OuterElement.ChildNodes[i];
			//
			//            if (childNode.TagName == "DIV") {
			//
			//            childNode.Style.Left = (childNode.Style.Left.nopx() + paddingRadiusL).px();
			//
			//            childNode.Style.Top = (childNode.Style.Top.nopx() + paddingRadiusT).px();
			//
			//            }
			//
			//            }
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameAppearanceEffectRotate
	var $global_Effect$Rotate = function(options) {
		this.degrees = 0;
		$global_Effect.call(this, 1);
		this.degrees = ((options.degrees === 0) ? 0 : options.degrees);
		this.drawTime = 1;
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
			m.outerElementStyle.set_backgroundColor(this.style.outerStyle.backColor);
			if (ss.isValue(this.style.outerStyle.border)) {
				if (ss.isValue(this.style.outerStyle.border.left)) {
					m.outerElementStyle.set_borderLeftColor(this.style.outerStyle.border.left.color);
					m.outerElementStyle.set_borderLeftStyle(this.style.outerStyle.border.left.style.toString());
					m.outerElementStyle.set_borderLeftWidth(this.style.outerStyle.border.left.width);
				}
				if (ss.isValue(this.style.outerStyle.border.top)) {
					m.outerElementStyle.set_borderTopColor(this.style.outerStyle.border.top.color);
					m.outerElementStyle.set_borderTopStyle(this.style.outerStyle.border.top.style.toString());
					m.outerElementStyle.set_borderTopWidth(this.style.outerStyle.border.top.width);
				}
				if (ss.isValue(this.style.outerStyle.border.right)) {
					m.outerElementStyle.set_borderRightColor(this.style.outerStyle.border.right.color);
					m.outerElementStyle.set_borderRightStyle(this.style.outerStyle.border.right.style.toString());
					m.outerElementStyle.set_borderRightWidth(this.style.outerStyle.border.right.width);
				}
				if (ss.isValue(this.style.outerStyle.border.bottom)) {
					m.outerElementStyle.set_borderBottomColor(this.style.outerStyle.border.bottom.color);
					m.outerElementStyle.set_borderBottomStyle(this.style.outerStyle.border.bottom.style.toString());
					m.outerElementStyle.set_borderBottomWidth(this.style.outerStyle.border.bottom.width);
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
			m.outerElementStyle.set_backgroundColor(this.style.outerStyle.backColor);
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
	ss.registerEnum(global, 'global.EffectType', $global_EffectType, false);
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
	$global_FiberYieldResponseType.prototype = { askQuestion: 0, log: 1, gameOver: 2, break$1: 3, variableLookup: 4, playersLeft: 5 };
	ss.registerEnum(global, 'global.FiberYieldResponseType', $global_FiberYieldResponseType, false);
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
		$this.size = null;
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
		$this.y = 0;
		$this.text = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.InternalStyle
	var $global_InternalStyle = function() {
		this.$keys = {};
		this.$lastStyle = null;
		this.$myAccelerator = false;
		this.$myBackground = null;
		this.$myBackgroundAttachment = null;
		this.$myBackgroundColor = null;
		this.$myBackgroundImage = null;
		this.$myBackgroundPosition = null;
		this.$myBackgroundPositionX = null;
		this.$myBackgroundPositionY = null;
		this.$myBackgroundRepeat = null;
		this.$myBorder = null;
		this.$myBorderBottom = null;
		this.$myBorderBottomColor = null;
		this.$myBorderBottomStyle = null;
		this.$myBorderBottomWidth = null;
		this.$myBorderCollapse = null;
		this.$myBorderColor = null;
		this.$myBorderLeft = null;
		this.$myBorderLeftColor = null;
		this.$myBorderLeftStyle = null;
		this.$myBorderLeftWidth = null;
		this.$myBorderRadius = null;
		this.$myBorderRight = null;
		this.$myBorderRightColor = null;
		this.$myBorderRightStyle = null;
		this.$myBorderRightWidth = null;
		this.$myBorderStyle = null;
		this.$myBorderTop = null;
		this.$myBorderTopColor = null;
		this.$myBorderTopStyle = null;
		this.$myBorderTopWidth = null;
		this.$myBorderWidth = null;
		this.$myBottom = null;
		this.$myBoxShadow = null;
		this.$myClear = null;
		this.$myClip = null;
		this.$myColor = null;
		this.$myCssFloat = null;
		this.$myCssText = null;
		this.$myCursor = null;
		this.$myDirection = null;
		this.$myDisplay = null;
		this.$myFilter = null;
		this.$myFont = null;
		this.$myFontFamily = null;
		this.$myFontSize = null;
		this.$myFontStyle = null;
		this.$myFontVariant = null;
		this.$myFontWeight = null;
		this.$myHeight = null;
		this.$myLeft = null;
		this.$myLetterSpacing = null;
		this.$myLineHeight = null;
		this.$myListStyle = null;
		this.$myListStyleImage = null;
		this.$myListStylePosition = null;
		this.$myListStyleType = null;
		this.$myMargin = null;
		this.$myMarginBottom = null;
		this.$myMarginLeft = null;
		this.$myMarginRight = null;
		this.$myMarginTop = null;
		this.$myMaxHeight = null;
		this.$myMaxWidth = null;
		this.$myMinHeight = null;
		this.$myMinWidth = null;
		this.$myMsInterpolationMode = null;
		this.$myOpacity = null;
		this.$myOverflow = null;
		this.$myOverflowX = null;
		this.$myOverflowY = null;
		this.$myPadding = null;
		this.$myPaddingBottom = null;
		this.$myPaddingLeft = null;
		this.$myPaddingRight = null;
		this.$myPaddingTop = null;
		this.$myPageBreakAfter = null;
		this.$myPageBreakBefore = null;
		this.$myPixelBottom = 0;
		this.$myPixelHeight = 0;
		this.$myPixelLeft = 0;
		this.$myPixelRight = 0;
		this.$myPixelTop = 0;
		this.$myPixelWidth = 0;
		this.$myPosBottom = 0;
		this.$myPosHeight = 0;
		this.$myPosLeft = 0;
		this.$myPosRight = 0;
		this.$myPosTop = 0;
		this.$myPosWidth = 0;
		this.$myPosition = null;
		this.$myRight = null;
		this.$myStyleFloat = null;
		this.$myTableLayout = null;
		this.$myTextAlign = null;
		this.$myTextDecoration = null;
		this.$myTextDecorationBlink = null;
		this.$myTextDecorationLineThrough = null;
		this.$myTextDecorationNone = null;
		this.$myTextDecorationOverline = null;
		this.$myTextDecorationUnderline = null;
		this.$myTextIndent = null;
		this.$myTextJustify = null;
		this.$myTextOverflow = null;
		this.$myTextTransform = null;
		this.$myTop = null;
		this.$myTransform = null;
		this.$myVerticalAlign = null;
		this.$myVisibility = null;
		this.$myWhiteSpace = null;
		this.$myWidth = null;
		this.$myWordSpacing = null;
		this.$myWordWrap = null;
		this.$myWritingMode = null;
		this.$myZIndex = 0;
		this.$myZoom = null;
		this.parent = null;
		this.children = null;
		this.children = [];
		this.$lastStyle = new $global_InternalStyle.$ctor1(null);
	};
	$global_InternalStyle.prototype = {
		get_accelerator: function() {
			return this.$myAccelerator;
		},
		set_accelerator: function(value) {
			this.$myAccelerator = value;
			this.$setValue('accelerator', value);
		},
		get_background: function() {
			return this.$myBackground;
		},
		set_background: function(value) {
			this.$myBackground = value;
			this.$setValue('background', value);
		},
		get_backgroundAttachment: function() {
			return this.$myBackgroundAttachment;
		},
		set_backgroundAttachment: function(value) {
			this.$myBackgroundAttachment = value;
			this.$setValue('background-attachment', value);
		},
		get_boxShadow: function() {
			return this.$myBoxShadow;
		},
		set_boxShadow: function(value) {
			this.$myBoxShadow = value;
			this.$setValue('box-shadow', value);
		},
		get_borderRadius: function() {
			return this.$myBorderRadius;
		},
		set_borderRadius: function(value) {
			this.$myBorderRadius = value;
			this.$setValue('border-radius', value);
		},
		get_transform: function() {
			return this.$myTransform;
		},
		set_transform: function(value) {
			this.$myTransform = value;
			this.$setValue('transform', value);
		},
		get_backgroundColor: function() {
			return this.$myBackgroundColor;
		},
		set_backgroundColor: function(value) {
			this.$myBackgroundColor = value;
			this.$setValue('background-color', value);
		},
		get_backgroundImage: function() {
			return this.$myBackgroundImage;
		},
		set_backgroundImage: function(value) {
			this.$myBackgroundImage = value;
			this.$setValue('background-image', value);
		},
		get_backgroundPosition: function() {
			return this.$myBackgroundPosition;
		},
		set_backgroundPosition: function(value) {
			this.$myBackgroundPosition = value;
			this.$setValue('background-position', value);
		},
		get_backgroundPositionX: function() {
			return this.$myBackgroundPositionX;
		},
		set_backgroundPositionX: function(value) {
			this.$myBackgroundPositionX = value;
			this.$setValue('background-position-x', value);
		},
		get_backgroundPositionY: function() {
			return this.$myBackgroundPositionY;
		},
		set_backgroundPositionY: function(value) {
			this.$myBackgroundPositionY = value;
			this.$setValue('background-position-y', value);
		},
		get_backgroundRepeat: function() {
			return this.$myBackgroundRepeat;
		},
		set_backgroundRepeat: function(value) {
			this.$myBackgroundRepeat = value;
			this.$setValue('background-repeat', value);
		},
		get_border: function() {
			return this.$myBorder;
		},
		set_border: function(value) {
			this.$myBorder = value;
			this.$setValue('border', value);
		},
		get_borderBottom: function() {
			return this.$myBorderBottom;
		},
		set_borderBottom: function(value) {
			this.$myBorderBottom = value;
			this.$setValue('border-bottom', value);
		},
		get_borderBottomColor: function() {
			return this.$myBorderBottomColor;
		},
		set_borderBottomColor: function(value) {
			this.$myBorderBottomColor = value;
			this.$setValue('border-bottom-color', value);
		},
		get_borderBottomStyle: function() {
			return this.$myBorderBottomStyle;
		},
		set_borderBottomStyle: function(value) {
			this.$myBorderBottomStyle = value;
			this.$setValue('border-bottom-style', value);
		},
		get_borderBottomWidth: function() {
			return this.$myBorderBottomWidth;
		},
		set_borderBottomWidth: function(value) {
			this.$myBorderBottomWidth = value;
			this.$setValue('border-bottom-width', value);
		},
		get_borderCollapse: function() {
			return this.$myBorderCollapse;
		},
		set_borderCollapse: function(value) {
			this.$myBorderCollapse = value;
			this.$setValue('border-collapse', value);
		},
		get_borderColor: function() {
			return this.$myBorderColor;
		},
		set_borderColor: function(value) {
			this.$myBorderColor = value;
			this.$setValue('border-color', value);
		},
		get_borderLeft: function() {
			return this.$myBorderLeft;
		},
		set_borderLeft: function(value) {
			this.$myBorderLeft = value;
			this.$setValue('border-left', value);
		},
		get_borderLeftColor: function() {
			return this.$myBorderLeftColor;
		},
		set_borderLeftColor: function(value) {
			this.$myBorderLeftColor = value;
			this.$setValue('border-left-color', value);
		},
		get_borderLeftStyle: function() {
			return this.$myBorderLeftStyle;
		},
		set_borderLeftStyle: function(value) {
			this.$myBorderLeftStyle = value;
			this.$setValue('border-left-style', value);
		},
		get_borderLeftWidth: function() {
			return this.$myBorderLeftWidth;
		},
		set_borderLeftWidth: function(value) {
			this.$myBorderLeftWidth = value;
			this.$setValue('border-left-width', value);
		},
		get_borderRight: function() {
			return this.$myBorderRight;
		},
		set_borderRight: function(value) {
			this.$myBorderRight = value;
			this.$setValue('border-right', value);
		},
		get_borderRightColor: function() {
			return this.$myBorderRightColor;
		},
		set_borderRightColor: function(value) {
			this.$myBorderRightColor = value;
			this.$setValue('border-right-color', value);
		},
		get_borderRightStyle: function() {
			return this.$myBorderRightStyle;
		},
		set_borderRightStyle: function(value) {
			this.$myBorderRightStyle = value;
			this.$setValue('border-right-style', value);
		},
		get_borderRightWidth: function() {
			return this.$myBorderRightWidth;
		},
		set_borderRightWidth: function(value) {
			this.$myBorderRightWidth = value;
			this.$setValue('border-right-width', value);
		},
		get_borderStyle: function() {
			return this.$myBorderStyle;
		},
		set_borderStyle: function(value) {
			this.$myBorderStyle = value;
			this.$setValue('border-style', value);
		},
		get_borderTop: function() {
			return this.$myBorderTop;
		},
		set_borderTop: function(value) {
			this.$myBorderTop = value;
			this.$setValue('border-top', value);
		},
		get_borderTopColor: function() {
			return this.$myBorderTopColor;
		},
		set_borderTopColor: function(value) {
			this.$myBorderTopColor = value;
			this.$setValue('border-top-color', value);
		},
		get_borderTopStyle: function() {
			return this.$myBorderTopStyle;
		},
		set_borderTopStyle: function(value) {
			this.$myBorderTopStyle = value;
			this.$setValue('border-top-style', value);
		},
		get_borderTopWidth: function() {
			return this.$myBorderTopWidth;
		},
		set_borderTopWidth: function(value) {
			this.$myBorderTopWidth = value;
			this.$setValue('border-top-width', value);
		},
		get_borderWidth: function() {
			return this.$myBorderWidth;
		},
		set_borderWidth: function(value) {
			this.$myBorderWidth = value;
			this.$setValue('border-width', value);
		},
		get_bottom: function() {
			return this.$myBottom;
		},
		set_bottom: function(value) {
			this.$myBottom = value;
			this.$setValue('bottom', value);
		},
		get_clear: function() {
			return this.$myClear;
		},
		set_clear: function(value) {
			this.$myClear = value;
			this.$setValue('clear', value);
		},
		get_clip: function() {
			return this.$myClip;
		},
		set_clip: function(value) {
			this.$myClip = value;
			this.$setValue('clip', value);
		},
		get_color: function() {
			return this.$myColor;
		},
		set_color: function(value) {
			this.$myColor = value;
			this.$setValue('color', value);
		},
		get_cssFloat: function() {
			return this.$myCssFloat;
		},
		set_cssFloat: function(value) {
			this.$myCssFloat = value;
			this.$setValue('css-float', value);
		},
		get_cssText: function() {
			return this.$myCssText;
		},
		set_cssText: function(value) {
			this.$myCssText = value;
			this.$setValue('css-text', value);
		},
		get_cursor: function() {
			return this.$myCursor;
		},
		set_cursor: function(value) {
			this.$myCursor = value;
			this.$setValue('cursor', value);
		},
		get_direction: function() {
			return this.$myDirection;
		},
		set_direction: function(value) {
			this.$myDirection = value;
			this.$setValue('direction', value);
		},
		get_display: function() {
			return this.$myDisplay;
		},
		set_display: function(value) {
			this.$myDisplay = value;
			this.$setValue('display', value);
		},
		get_filter: function() {
			return this.$myFilter;
		},
		set_filter: function(value) {
			this.$myFilter = value;
			this.$setValue('filter', value);
		},
		get_font: function() {
			return this.$myFont;
		},
		set_font: function(value) {
			this.$myFont = value;
			this.$setValue('font', value);
		},
		get_fontFamily: function() {
			return this.$myFontFamily;
		},
		set_fontFamily: function(value) {
			this.$myFontFamily = value;
			this.$setValue('font-family', value);
		},
		get_fontSize: function() {
			return this.$myFontSize;
		},
		set_fontSize: function(value) {
			this.$myFontSize = value;
			this.$setValue('font-size', value);
		},
		get_fontStyle: function() {
			return this.$myFontStyle;
		},
		set_fontStyle: function(value) {
			this.$myFontStyle = value;
			this.$setValue('font-style', value);
		},
		get_fontVariant: function() {
			return this.$myFontVariant;
		},
		set_fontVariant: function(value) {
			this.$myFontVariant = value;
			this.$setValue('font-variant', value);
		},
		get_fontWeight: function() {
			return this.$myFontWeight;
		},
		set_fontWeight: function(value) {
			this.$myFontWeight = value;
			this.$setValue('font-weight', value);
		},
		get_height: function() {
			return this.$myHeight;
		},
		set_height: function(value) {
			this.$myHeight = value;
			this.$setValue('height', value);
		},
		get_left: function() {
			return this.$myLeft;
		},
		set_left: function(value) {
			this.$myLeft = value;
			this.$setValue('left', value);
		},
		get_letterSpacing: function() {
			return this.$myLetterSpacing;
		},
		set_letterSpacing: function(value) {
			this.$myLetterSpacing = value;
			this.$setValue('letter-spacing', value);
		},
		get_lineHeight: function() {
			return this.$myLineHeight;
		},
		set_lineHeight: function(value) {
			this.$myLineHeight = value;
			this.$setValue('line-height', value);
		},
		get_listStyle: function() {
			return this.$myListStyle;
		},
		set_listStyle: function(value) {
			this.$myListStyle = value;
			this.$setValue('list-style', value);
		},
		get_listStyleImage: function() {
			return this.$myListStyleImage;
		},
		set_listStyleImage: function(value) {
			this.$myListStyleImage = value;
			this.$setValue('list-style-image', value);
		},
		get_listStylePosition: function() {
			return this.$myListStylePosition;
		},
		set_listStylePosition: function(value) {
			this.$myListStylePosition = value;
			this.$setValue('list-style-position', value);
		},
		get_listStyleType: function() {
			return this.$myListStyleType;
		},
		set_listStyleType: function(value) {
			this.$myListStyleType = value;
			this.$setValue('list-style-type', value);
		},
		get_margin: function() {
			return this.$myMargin;
		},
		set_margin: function(value) {
			this.$myMargin = value;
			this.$setValue('margin', value);
		},
		get_marginBottom: function() {
			return this.$myMarginBottom;
		},
		set_marginBottom: function(value) {
			this.$myMarginBottom = value;
			this.$setValue('margin-bottom', value);
		},
		get_marginLeft: function() {
			return this.$myMarginLeft;
		},
		set_marginLeft: function(value) {
			this.$myMarginLeft = value;
			this.$setValue('margin-left', value);
		},
		get_marginRight: function() {
			return this.$myMarginRight;
		},
		set_marginRight: function(value) {
			this.$myMarginRight = value;
			this.$setValue('margin-right', value);
		},
		get_marginTop: function() {
			return this.$myMarginTop;
		},
		set_marginTop: function(value) {
			this.$myMarginTop = value;
			this.$setValue('margin-top', value);
		},
		get_maxHeight: function() {
			return this.$myMaxHeight;
		},
		set_maxHeight: function(value) {
			this.$myMaxHeight = value;
			this.$setValue('max-height', value);
		},
		get_maxWidth: function() {
			return this.$myMaxWidth;
		},
		set_maxWidth: function(value) {
			this.$myMaxWidth = value;
			this.$setValue('max-width', value);
		},
		get_minHeight: function() {
			return this.$myMinHeight;
		},
		set_minHeight: function(value) {
			this.$myMinHeight = value;
			this.$setValue('min-height', value);
		},
		get_minWidth: function() {
			return this.$myMinWidth;
		},
		set_minWidth: function(value) {
			this.$myMinWidth = value;
			this.$setValue('min-width', value);
		},
		get_msInterpolationMode: function() {
			return this.$myMsInterpolationMode;
		},
		set_msInterpolationMode: function(value) {
			this.$myMsInterpolationMode = value;
			this.$setValue('ms-interpolation-mode', value);
		},
		get_opacity: function() {
			return this.$myOpacity;
		},
		set_opacity: function(value) {
			this.$myOpacity = value;
			this.$setValue('opacity', value);
		},
		get_overflow: function() {
			return this.$myOverflow;
		},
		set_overflow: function(value) {
			this.$myOverflow = value;
			this.$setValue('overflow', value);
		},
		get_overflowX: function() {
			return this.$myOverflowX;
		},
		set_overflowX: function(value) {
			this.$myOverflowX = value;
			this.$setValue('overflow-x', value);
		},
		get_overflowY: function() {
			return this.$myOverflowY;
		},
		set_overflowY: function(value) {
			this.$myOverflowY = value;
			this.$setValue('overflow-y', value);
		},
		get_padding: function() {
			return this.$myPadding;
		},
		set_padding: function(value) {
			this.$myPadding = value;
			this.$setValue('padding', value);
		},
		get_paddingBottom: function() {
			return this.$myPaddingBottom;
		},
		set_paddingBottom: function(value) {
			this.$myPaddingBottom = value;
			this.$setValue('padding-bottom', value);
		},
		get_paddingLeft: function() {
			return this.$myPaddingLeft;
		},
		set_paddingLeft: function(value) {
			this.$myPaddingLeft = value;
			this.$setValue('padding-left', value);
		},
		get_paddingRight: function() {
			return this.$myPaddingRight;
		},
		set_paddingRight: function(value) {
			this.$myPaddingRight = value;
			this.$setValue('padding-right', value);
		},
		get_paddingTop: function() {
			return this.$myPaddingTop;
		},
		set_paddingTop: function(value) {
			this.$myPaddingTop = value;
			this.$setValue('padding-top', value);
		},
		get_pageBreakAfter: function() {
			return this.$myPageBreakAfter;
		},
		set_pageBreakAfter: function(value) {
			this.$myPageBreakAfter = value;
			this.$setValue('page-break-after', value);
		},
		get_pageBreakBefore: function() {
			return this.$myPageBreakBefore;
		},
		set_pageBreakBefore: function(value) {
			this.$myPageBreakBefore = value;
			this.$setValue('page-break-before', value);
		},
		get_pixelBottom: function() {
			return this.$myPixelBottom;
		},
		set_pixelBottom: function(value) {
			this.$myPixelBottom = value;
			this.$setValue('pixel-bottom', value);
		},
		get_pixelHeight: function() {
			return this.$myPixelHeight;
		},
		set_pixelHeight: function(value) {
			this.$myPixelHeight = value;
			this.$setValue('pixel-height', value);
		},
		get_pixelLeft: function() {
			return this.$myPixelLeft;
		},
		set_pixelLeft: function(value) {
			this.$myPixelLeft = value;
			this.$setValue('pixel-left', value);
		},
		get_pixelRight: function() {
			return this.$myPixelRight;
		},
		set_pixelRight: function(value) {
			this.$myPixelRight = value;
			this.$setValue('pixel-right', value);
		},
		get_pixelTop: function() {
			return this.$myPixelTop;
		},
		set_pixelTop: function(value) {
			this.$myPixelTop = value;
			this.$setValue('pixel-top', value);
		},
		get_pixelWidth: function() {
			return this.$myPixelWidth;
		},
		set_pixelWidth: function(value) {
			this.$myPixelWidth = value;
			this.$setValue('pixel-width', value);
		},
		get_posBottom: function() {
			return this.$myPosBottom;
		},
		set_posBottom: function(value) {
			this.$myPosBottom = value;
			this.$setValue('pos-bottom', value);
		},
		get_posHeight: function() {
			return this.$myPosHeight;
		},
		set_posHeight: function(value) {
			this.$myPosHeight = value;
			this.$setValue('pos-height', value);
		},
		get_position: function() {
			return this.$myPosition;
		},
		set_position: function(value) {
			this.$myPosition = value;
			this.$setValue('position', value);
		},
		get_posLeft: function() {
			return this.$myPosLeft;
		},
		set_posLeft: function(value) {
			this.$myPosLeft = value;
			this.$setValue('pos-left', value);
		},
		get_posRight: function() {
			return this.$myPosRight;
		},
		set_posRight: function(value) {
			this.$myPosRight = value;
			this.$setValue('pos-pight', value);
		},
		get_posTop: function() {
			return this.$myPosTop;
		},
		set_posTop: function(value) {
			this.$myPosTop = value;
			this.$setValue('pos-top', value);
		},
		get_posWidth: function() {
			return this.$myPosWidth;
		},
		set_posWidth: function(value) {
			this.$myPosWidth = value;
			this.$setValue('pos-width', value);
		},
		get_right: function() {
			return this.$myRight;
		},
		set_right: function(value) {
			this.$myRight = value;
			this.$setValue('right', value);
		},
		get_styleFloat: function() {
			return this.$myStyleFloat;
		},
		set_styleFloat: function(value) {
			this.$myStyleFloat = value;
			this.$setValue('float', value);
		},
		get_tableLayout: function() {
			return this.$myTableLayout;
		},
		set_tableLayout: function(value) {
			this.$myTableLayout = value;
			this.$setValue('table-layout', value);
		},
		get_textAlign: function() {
			return this.$myTextAlign;
		},
		set_textAlign: function(value) {
			this.$myTextAlign = value;
			this.$setValue('text-align', value);
		},
		get_textDecoration: function() {
			return this.$myTextDecoration;
		},
		set_textDecoration: function(value) {
			this.$myTextDecoration = value;
			this.$setValue('text-decoration', value);
		},
		get_textDecorationBlink: function() {
			return this.$myTextDecorationBlink;
		},
		set_textDecorationBlink: function(value) {
			this.$myTextDecorationBlink = value;
			this.$setValue('text-decoration-blink', value);
		},
		get_textDecorationLineThrough: function() {
			return this.$myTextDecorationLineThrough;
		},
		set_textDecorationLineThrough: function(value) {
			this.$myTextDecorationLineThrough = value;
			this.$setValue('text-decoration-line-through', value);
		},
		get_textDecorationNone: function() {
			return this.$myTextDecorationNone;
		},
		set_textDecorationNone: function(value) {
			this.$myTextDecorationNone = value;
			this.$setValue('text-decoration-none', value);
		},
		get_textDecorationOverline: function() {
			return this.$myTextDecorationOverline;
		},
		set_textDecorationOverline: function(value) {
			this.$myTextDecorationOverline = value;
			this.$setValue('text-decoration-overline', value);
		},
		get_textDecorationUnderline: function() {
			return this.$myTextDecorationUnderline;
		},
		set_textDecorationUnderline: function(value) {
			this.$myTextDecorationUnderline = value;
			this.$setValue('text-decoration-underline', value);
		},
		get_textIndent: function() {
			return this.$myTextIndent;
		},
		set_textIndent: function(value) {
			this.$myTextIndent = value;
			this.$setValue('text-indent', value);
		},
		get_textJustify: function() {
			return this.$myTextJustify;
		},
		set_textJustify: function(value) {
			this.$myTextJustify = value;
			this.$setValue('text-justify', value);
		},
		get_textOverflow: function() {
			return this.$myTextOverflow;
		},
		set_textOverflow: function(value) {
			this.$myTextOverflow = value;
			this.$setValue('textOverflow', value);
		},
		get_textTransform: function() {
			return this.$myTextTransform;
		},
		set_textTransform: function(value) {
			this.$myTextTransform = value;
			this.$setValue('text-transform', value);
		},
		get_top: function() {
			return this.$myTop;
		},
		set_top: function(value) {
			this.$myTop = value;
			this.$setValue('top', value);
		},
		get_verticalAlign: function() {
			return this.$myVerticalAlign;
		},
		set_verticalAlign: function(value) {
			this.$myVerticalAlign = value;
			this.$setValue('vertical-align', value);
		},
		get_visibility: function() {
			return this.$myVisibility;
		},
		set_visibility: function(value) {
			this.$myVisibility = value;
			this.$setValue('visibility', value);
		},
		get_whiteSpace: function() {
			return this.$myWhiteSpace;
		},
		set_whiteSpace: function(value) {
			this.$myWhiteSpace = value;
			this.$setValue('white-space', value);
		},
		get_width: function() {
			return this.$myWidth;
		},
		set_width: function(value) {
			this.$myWidth = value;
			this.$setValue('width', value);
		},
		get_wordSpacing: function() {
			return this.$myWordSpacing;
		},
		set_wordSpacing: function(value) {
			this.$myWordSpacing = value;
			this.$setValue('word-spacing', value);
		},
		get_wordWrap: function() {
			return this.$myWordWrap;
		},
		set_wordWrap: function(value) {
			this.$myWordWrap = value;
			this.$setValue('word-wrap', value);
		},
		get_writingMode: function() {
			return this.$myWritingMode;
		},
		set_writingMode: function(value) {
			this.$myWritingMode = value;
			this.$setValue('writing-mode', value);
		},
		get_zIndex: function() {
			return this.$myZIndex;
		},
		set_zIndex: function(value) {
			this.$myZIndex = value;
			this.$setValue('z-index', value);
		},
		get_zoom: function() {
			return this.$myZoom;
		},
		set_zoom: function(value) {
			this.$myZoom = value;
			this.$setValue('zoom', value);
		},
		addChild: function(style) {
			ss.add(this.children, style);
			style.parent = this;
		},
		$setValue: function(name, v) {
			this.$keys[name] = v;
		},
		setStyle: function(outerElement) {
			var fm = this.$lastStyle.$keys;
			var $t1 = new ss.ObjectEnumerator(fm);
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					if (!ss.keyExists(this.$keys, item.key)) {
						outerElement.style[item.key] = null;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = new ss.ObjectEnumerator(this.$keys);
			try {
				while ($t2.moveNext()) {
					var key = $t2.current();
					if (ss.keyExists(fm, key.key)) {
						if (!ss.referenceEquals(fm[key.key], key.value)) {
							outerElement.style[key.key] = (ss.isNullOrUndefined(key.value) ? null : key.value.toString());
						}
					}
					else if (ss.isNullOrUndefined(key.value)) {
						if (ss.isNullOrUndefined(outerElement.style[key.key])) {
							outerElement.style[key.key] = null;
						}
					}
					else {
						outerElement.style[key.key] = key.value.toString();
					}
				}
			}
			finally {
				$t2.dispose();
			}
			this.$lastStyle = new $global_InternalStyle.$ctor1(this);
		}
	};
	$global_InternalStyle.$ctor1 = function(val) {
		this.$keys = {};
		this.$lastStyle = null;
		this.$myAccelerator = false;
		this.$myBackground = null;
		this.$myBackgroundAttachment = null;
		this.$myBackgroundColor = null;
		this.$myBackgroundImage = null;
		this.$myBackgroundPosition = null;
		this.$myBackgroundPositionX = null;
		this.$myBackgroundPositionY = null;
		this.$myBackgroundRepeat = null;
		this.$myBorder = null;
		this.$myBorderBottom = null;
		this.$myBorderBottomColor = null;
		this.$myBorderBottomStyle = null;
		this.$myBorderBottomWidth = null;
		this.$myBorderCollapse = null;
		this.$myBorderColor = null;
		this.$myBorderLeft = null;
		this.$myBorderLeftColor = null;
		this.$myBorderLeftStyle = null;
		this.$myBorderLeftWidth = null;
		this.$myBorderRadius = null;
		this.$myBorderRight = null;
		this.$myBorderRightColor = null;
		this.$myBorderRightStyle = null;
		this.$myBorderRightWidth = null;
		this.$myBorderStyle = null;
		this.$myBorderTop = null;
		this.$myBorderTopColor = null;
		this.$myBorderTopStyle = null;
		this.$myBorderTopWidth = null;
		this.$myBorderWidth = null;
		this.$myBottom = null;
		this.$myBoxShadow = null;
		this.$myClear = null;
		this.$myClip = null;
		this.$myColor = null;
		this.$myCssFloat = null;
		this.$myCssText = null;
		this.$myCursor = null;
		this.$myDirection = null;
		this.$myDisplay = null;
		this.$myFilter = null;
		this.$myFont = null;
		this.$myFontFamily = null;
		this.$myFontSize = null;
		this.$myFontStyle = null;
		this.$myFontVariant = null;
		this.$myFontWeight = null;
		this.$myHeight = null;
		this.$myLeft = null;
		this.$myLetterSpacing = null;
		this.$myLineHeight = null;
		this.$myListStyle = null;
		this.$myListStyleImage = null;
		this.$myListStylePosition = null;
		this.$myListStyleType = null;
		this.$myMargin = null;
		this.$myMarginBottom = null;
		this.$myMarginLeft = null;
		this.$myMarginRight = null;
		this.$myMarginTop = null;
		this.$myMaxHeight = null;
		this.$myMaxWidth = null;
		this.$myMinHeight = null;
		this.$myMinWidth = null;
		this.$myMsInterpolationMode = null;
		this.$myOpacity = null;
		this.$myOverflow = null;
		this.$myOverflowX = null;
		this.$myOverflowY = null;
		this.$myPadding = null;
		this.$myPaddingBottom = null;
		this.$myPaddingLeft = null;
		this.$myPaddingRight = null;
		this.$myPaddingTop = null;
		this.$myPageBreakAfter = null;
		this.$myPageBreakBefore = null;
		this.$myPixelBottom = 0;
		this.$myPixelHeight = 0;
		this.$myPixelLeft = 0;
		this.$myPixelRight = 0;
		this.$myPixelTop = 0;
		this.$myPixelWidth = 0;
		this.$myPosBottom = 0;
		this.$myPosHeight = 0;
		this.$myPosLeft = 0;
		this.$myPosRight = 0;
		this.$myPosTop = 0;
		this.$myPosWidth = 0;
		this.$myPosition = null;
		this.$myRight = null;
		this.$myStyleFloat = null;
		this.$myTableLayout = null;
		this.$myTextAlign = null;
		this.$myTextDecoration = null;
		this.$myTextDecorationBlink = null;
		this.$myTextDecorationLineThrough = null;
		this.$myTextDecorationNone = null;
		this.$myTextDecorationOverline = null;
		this.$myTextDecorationUnderline = null;
		this.$myTextIndent = null;
		this.$myTextJustify = null;
		this.$myTextOverflow = null;
		this.$myTextTransform = null;
		this.$myTop = null;
		this.$myTransform = null;
		this.$myVerticalAlign = null;
		this.$myVisibility = null;
		this.$myWhiteSpace = null;
		this.$myWidth = null;
		this.$myWordSpacing = null;
		this.$myWordWrap = null;
		this.$myWritingMode = null;
		this.$myZIndex = 0;
		this.$myZoom = null;
		this.parent = null;
		this.children = null;
		this.children = [];
		if (ss.isNullOrUndefined(val)) {
			return;
		}
		this.$myAccelerator = val.get_accelerator();
		this.$myBackground = val.get_background();
		this.$myBackgroundAttachment = val.get_backgroundAttachment();
		this.$myBoxShadow = val.get_boxShadow();
		this.$myBorderRadius = val.get_borderRadius();
		this.$myTransform = val.get_transform();
		this.$myBackgroundColor = val.get_backgroundColor();
		this.$myBackgroundImage = val.get_backgroundImage();
		this.$myBackgroundPosition = val.get_backgroundPosition();
		this.$myBackgroundPositionX = val.get_backgroundPositionX();
		this.$myBackgroundPositionY = val.get_backgroundPositionY();
		this.$myBackgroundRepeat = val.get_backgroundRepeat();
		this.$myBorder = val.get_border();
		this.$myBorderBottom = val.get_borderBottom();
		this.$myBorderBottomColor = val.get_borderBottomColor();
		this.$myBorderBottomStyle = val.get_borderBottomStyle();
		this.$myBorderBottomWidth = val.get_borderBottomWidth();
		this.$myBorderCollapse = val.get_borderCollapse();
		this.$myBorderColor = val.get_borderColor();
		this.$myBorderLeft = val.get_borderLeft();
		this.$myBorderLeftColor = val.get_borderLeftColor();
		this.$myBorderLeftStyle = val.get_borderLeftStyle();
		this.$myBorderLeftWidth = val.get_borderLeftWidth();
		this.$myBorderRight = val.get_borderRight();
		this.$myBorderRightColor = val.get_borderRightColor();
		this.$myBorderRightStyle = val.get_borderRightStyle();
		this.$myBorderRightWidth = val.get_borderRightWidth();
		this.$myBorderStyle = val.get_borderStyle();
		this.$myBorderTop = val.get_borderTop();
		this.$myBorderTopColor = val.get_borderTopColor();
		this.$myBorderTopStyle = val.get_borderTopStyle();
		this.$myBorderTopWidth = val.get_borderTopWidth();
		this.$myBorderWidth = val.get_borderWidth();
		this.$myBottom = val.get_bottom();
		this.$myClear = val.get_clear();
		this.$myClip = val.get_clip();
		this.$myColor = val.get_color();
		this.$myCssFloat = val.get_cssFloat();
		this.$myCssText = val.get_cssText();
		this.$myCursor = val.get_cursor();
		this.$myDirection = val.get_direction();
		this.$myDisplay = val.get_display();
		this.$myFilter = val.get_filter();
		this.$myFont = val.get_font();
		this.$myFontFamily = val.get_fontFamily();
		this.$myFontSize = val.get_fontSize();
		this.$myFontStyle = val.get_fontStyle();
		this.$myFontVariant = val.get_fontVariant();
		this.$myFontWeight = val.get_fontWeight();
		this.$myHeight = val.get_height();
		this.$myLeft = val.get_left();
		this.$myLetterSpacing = val.get_letterSpacing();
		this.$myLineHeight = val.get_lineHeight();
		this.$myListStyle = val.get_listStyle();
		this.$myListStyleImage = val.get_listStyleImage();
		this.$myListStylePosition = val.get_listStylePosition();
		this.$myListStyleType = val.get_listStyleType();
		this.$myMargin = val.get_margin();
		this.$myMarginBottom = val.get_marginBottom();
		this.$myMarginLeft = val.get_marginLeft();
		this.$myMarginRight = val.get_marginRight();
		this.$myMarginTop = val.get_marginTop();
		this.$myMaxHeight = val.get_maxHeight();
		this.$myMaxWidth = val.get_maxWidth();
		this.$myMinHeight = val.get_minHeight();
		this.$myMinWidth = val.get_minWidth();
		this.$myMsInterpolationMode = val.get_msInterpolationMode();
		this.$myOpacity = val.get_opacity();
		this.$myOverflow = val.get_overflow();
		this.$myOverflowX = val.get_overflowX();
		this.$myOverflowY = val.get_overflowY();
		this.$myPadding = val.get_padding();
		this.$myPaddingBottom = val.get_paddingBottom();
		this.$myPaddingLeft = val.get_paddingLeft();
		this.$myPaddingRight = val.get_paddingRight();
		this.$myPaddingTop = val.get_paddingTop();
		this.$myPageBreakAfter = val.get_pageBreakAfter();
		this.$myPageBreakBefore = val.get_pageBreakBefore();
		this.$myPixelBottom = val.get_pixelBottom();
		this.$myPixelHeight = val.get_pixelHeight();
		this.$myPixelLeft = val.get_pixelLeft();
		this.$myPixelRight = val.get_pixelRight();
		this.$myPixelTop = val.get_pixelTop();
		this.$myPixelWidth = val.get_pixelWidth();
		this.$myPosBottom = val.get_posBottom();
		this.$myPosHeight = val.get_posHeight();
		this.$myPosition = val.get_position();
		this.$myPosLeft = val.get_posLeft();
		this.$myPosRight = val.get_posRight();
		this.$myPosTop = val.get_posTop();
		this.$myPosWidth = val.get_posWidth();
		this.$myRight = val.get_right();
		this.$myStyleFloat = val.get_styleFloat();
		this.$myTableLayout = val.get_tableLayout();
		this.$myTextAlign = val.get_textAlign();
		this.$myTextDecoration = val.get_textDecoration();
		this.$myTextDecorationBlink = val.get_textDecorationBlink();
		this.$myTextDecorationLineThrough = val.get_textDecorationLineThrough();
		this.$myTextDecorationNone = val.get_textDecorationNone();
		this.$myTextDecorationOverline = val.get_textDecorationOverline();
		this.$myTextDecorationUnderline = val.get_textDecorationUnderline();
		this.$myTextIndent = val.get_textIndent();
		this.$myTextJustify = val.get_textJustify();
		this.$myTextOverflow = val.get_textOverflow();
		this.$myTextTransform = val.get_textTransform();
		this.$myTop = val.get_top();
		this.$myVerticalAlign = val.get_verticalAlign();
		this.$myVisibility = val.get_visibility();
		this.$myWhiteSpace = val.get_whiteSpace();
		this.$myWidth = val.get_width();
		this.$myWordSpacing = val.get_wordSpacing();
		this.$myWordWrap = val.get_wordWrap();
		this.$myWritingMode = val.get_writingMode();
		this.$myZIndex = val.get_zIndex();
		this.$myZoom = val.get_zoom();
	};
	$global_InternalStyle.$ctor1.prototype = $global_InternalStyle.prototype;
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameOrder
	var $global_Order = function() {
	};
	$global_Order.prototype = { noOrder: 0, ascending: 1, descending: 2 };
	ss.registerEnum(global, 'global.Order', $global_Order, false);
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
	ss.registerEnum(global, 'global.PokerWinType', $global_PokerWinType, false);
	////////////////////////////////////////////////////////////////////////////////
	// global.Rectangle
	var $global_Rectangle = function() {
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
		this.outerElementStyle = null;
		this.outerElement = null;
		this.childNodes = null;
		this.outerElement = item1;
		this.childNodes = [];
		this.outerElementStyle = new $global_InternalStyle();
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
		this.sortOrder = 0;
		this.numberOfCardsHorizontal = 0;
		this.numberOfCardsVertical = 0;
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
		this.sortOrder = options.sortOrder;
		this.numberOfCardsHorizontal = ((options.numerOfCardsHorizontal === 0) ? 1 : options.numerOfCardsHorizontal);
		this.numberOfCardsVertical = ((options.numerOfCardsVertical === 0) ? 1 : options.numerOfCardsVertical);
		this.resizeType = options.resizeType;
		//Rotate = ExtensionMethods.eval("options.rotate? options.rotate : 0");
		this.appearance = new $global_Appearance();
	};
	////////////////////////////////////////////////////////////////////////////////
	// global.TableSpaceResizeType
	var $global_TableSpaceResizeType = function() {
	};
	$global_TableSpaceResizeType.prototype = { grow: 0, static: 1 };
	ss.registerEnum(global, 'global.TableSpaceResizeType', $global_TableSpaceResizeType, false);
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
	////////////////////////////////////////////////////////////////////////////////
	// global.CardGameUser
	var $global_User = function(name) {
		this.userName = null;
		this.playerDealingOrder = 0;
		this.cards = null;
		this.userName = name;
		this.cards = new $global_Pile(name);
	};
	ss.registerClass(global, 'global._', $global__);
	ss.registerClass(global, 'global.Effect', $global_Effect);
	ss.registerClass(global, 'global.AnimatedEffect', $global_AnimatedEffect, $global_Effect);
	ss.registerClass(global, 'global.AnimatedEffect$Between', $global_AnimatedEffect$Between, $global_AnimatedEffect);
	ss.registerClass(global, 'global.AppearanceStyle', $global_AppearanceStyle);
	ss.registerClass(global, 'global.Appearance', $global_Appearance, $global_AppearanceStyle);
	ss.registerClass(global, 'global.AppearanceStyleBorder', $global_AppearanceStyleBorder);
	ss.registerClass(global, 'global.AppearanceStyleBorderArea', $global_AppearanceStyleBorderArea);
	ss.registerClass(global, 'global.AppearanceStyleItem', $global_AppearanceStyleItem);
	ss.registerClass(global, 'global.AppearanceStyleMargin', $global_AppearanceStyleMargin);
	ss.registerClass(global, 'global.AppearanceStylePadding', $global_AppearanceStylePadding);
	ss.registerClass(global, 'global.ArrayUtils', $global_ArrayUtils);
	ss.registerClass(global, 'global.Card', $global_Card);
	ss.registerClass(global, 'global.CardDrawing', $global_CardDrawing);
	ss.registerClass(global, 'global.CardGame', $global_CardGame);
	ss.registerClass(global, 'global.CardGameAnswer', $global_CardGameAnswer);
	ss.registerClass(global, 'global.CardGameArea', $global_CardGameArea);
	ss.registerClass(global, 'global.CardGameEffectBendOptions', $global_CardGameEffectBendOptions);
	ss.registerClass(global, 'global.CardGameEffectHighlightOptions', $global_CardGameEffectHighlightOptions);
	ss.registerClass(global, 'global.CardGameEffectRotateOptions', $global_CardGameEffectRotateOptions);
	ss.registerClass(global, 'global.CardGameQuestion', $global_CardGameQuestion);
	ss.registerClass(global, 'global.CardGameTableSpaceOptions', $global_CardGameTableSpaceOptions);
	ss.registerClass(global, 'global.domUtils', $global_domUtils);
	ss.registerClass(global, 'global.Effect$Bend', $global_Effect$Bend, $global_Effect);
	ss.registerClass(global, 'global.Effect$Highlight', $global_Effect$Highlight, $global_Effect);
	ss.registerClass(global, 'global.Effect$Rotate', $global_Effect$Rotate, $global_Effect);
	ss.registerClass(global, 'global.Effect$StyleProperty', $global_Effect$StyleProperty, $global_Effect);
	ss.registerClass(global, 'global.FiberYieldResponse', $global_FiberYieldResponse);
	ss.registerClass(global, 'global.GameCardGameOptions', $global_GameCardGameOptions);
	ss.registerClass(global, 'global.GameCardGameTextAreaOptions', $global_GameCardGameTextAreaOptions);
	ss.registerClass(global, 'global.InternalStyle', $global_InternalStyle);
	ss.registerClass(global, 'global.Pile', $global_Pile);
	ss.registerClass(global, 'global.PokerResult', $global_PokerResult);
	ss.registerClass(global, 'global.Rectangle', $global_Rectangle);
	ss.registerClass(global, 'global.shuff', $global_shuff);
	ss.registerClass(global, 'global.SpaceDrawing', $global_SpaceDrawing);
	ss.registerClass(global, 'global.TableSpace', $global_TableSpace);
	ss.registerClass(global, 'global.TableTextArea', $global_TableTextArea);
	ss.registerClass(global, 'global.User', $global_User);
	eval('Array.prototype.foreach=function(does){return global.ArrayUtils.forEach(this,does);};');
	eval('Array.prototype.sortCards=function(){return global.ArrayUtils.sortCards(this);};');
	eval('Array.prototype.where=function(does){return global.ArrayUtils.where(this,does);};');
	eval('Array.prototype.any=function(does){return global.ArrayUtils.any(this,does);};');
	eval('Array.prototype.remove=function(does){ this.splice(this.indexOf(does),1); };');
})();

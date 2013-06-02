
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.EffectEditorController
	var $CardGameUI_Controllers_$EffectEditorController = function(scope, editEffects) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		editEffects.popOpenEffect = ss.delegateCombine(editEffects.popOpenEffect, ss.mkdel(this, this.$popOpenEffectFn));
	};
	$CardGameUI_Controllers_$EffectEditorController.prototype = {
		$popOpenEffectFn: function(effect) {
			this.$myScope.effect = effect;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.ListEffectsController
	var $CardGameUI_Controllers_$ListEffectsController = function(scope, editEffects, effectWatcher, effectManager) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myEffectWatcher = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		this.$myEffectWatcher = effectWatcher;
		scope.effects = effectManager.effects = [];
		var effectTypes = [];
		ss.add(effectTypes, 'bend');
		ss.add(effectTypes, 'highlight');
		ss.add(effectTypes, 'rotate');
		ss.add(effectTypes, 'styleProperty');
		scope.effectTypes = effectTypes;
		scope.selectedEffectType = 'bend';
		scope.newEffect = '';
		scope.addEffect = ss.mkdel(this, this.$addEffectFn);
		scope.effectClick = ss.mkdel(this, this.$effectClickFn);
		scope.enableEffect = ss.mkdel(this, this.$enableEffectFn);
		ss.add(this.$myScope.effects, $CardGameUI_Controllers_$ListEffectsController.$makeEffect('bend', 'bend'));
	};
	$CardGameUI_Controllers_$ListEffectsController.prototype = {
		$enableEffectFn: function(effect) {
			this.$myEffectWatcher.applyEffect(effect);
		},
		$addEffectFn: function() {
			ss.add(this.$myScope.effects, $CardGameUI_Controllers_$ListEffectsController.$makeEffect(this.$myScope.newEffect, this.$myScope.selectedEffectType));
			this.$myScope.selectedEffectType = 'bend';
			this.$myScope.newEffect = '';
		},
		$effectClickFn: function(effect) {
			this.$myEditEffects.popOpenEffect(effect);
		}
	};
	$CardGameUI_Controllers_$ListEffectsController.$makeEffect = function(effectName, type) {
		var $t1 = new $CardGameUI_Util_Effect();
		$t1.name = effectName;
		var effect = $t1;
		effect.type = type;
		switch (effect.type) {
			case 'highlight': {
				var $t3 = effect.properties;
				var $t2 = $CardGameUI_Util_EffectProperty.$ctor();
				$t2.name = 'Radius';
				$t2.value = 5;
				$t2.type = 'number';
				ss.add($t3, $t2);
				var $t5 = effect.properties;
				var $t4 = $CardGameUI_Util_EffectProperty.$ctor();
				$t4.name = 'Color';
				$t4.value = '#242444';
				$t4.type = 'color';
				ss.add($t5, $t4);
				var $t7 = effect.properties;
				var $t6 = $CardGameUI_Util_EffectProperty.$ctor();
				$t6.name = 'Opacity';
				$t6.value = 0.5;
				$t6.type = 'number';
				ss.add($t7, $t6);
				var $t9 = effect.properties;
				var $t8 = $CardGameUI_Util_EffectProperty.$ctor();
				$t8.name = 'Rotate';
				$t8.value = 0;
				$t8.type = 'number';
				ss.add($t9, $t8);
				var $t11 = effect.properties;
				var $t10 = $CardGameUI_Util_EffectProperty.$ctor();
				$t10.name = 'OffsetX';
				$t10.value = 0;
				$t10.type = 'number';
				ss.add($t11, $t10);
				var $t13 = effect.properties;
				var $t12 = $CardGameUI_Util_EffectProperty.$ctor();
				$t12.name = 'OffsetY';
				$t12.value = 0;
				$t12.type = 'number';
				ss.add($t13, $t12);
				break;
			}
			case 'rotate': {
				var $t15 = effect.properties;
				var $t14 = $CardGameUI_Util_EffectProperty.$ctor();
				$t14.name = 'Degrees';
				$t14.value = 90;
				$t14.type = 'number';
				ss.add($t15, $t14);
				break;
			}
			case 'bend': {
				var $t17 = effect.properties;
				var $t16 = $CardGameUI_Util_EffectProperty.$ctor();
				$t16.name = 'Degrees';
				$t16.value = 15;
				$t16.type = 'number';
				ss.add($t17, $t16);
				break;
			}
			case 'styleProperty': {
				var $t19 = effect.properties;
				var $t18 = $CardGameUI_Util_EffectProperty.$ctor();
				$t18.name = 'Property Name';
				$t18.value = 'background-color';
				$t18.type = 'text';
				ss.add($t19, $t18);
				var $t21 = effect.properties;
				var $t20 = $CardGameUI_Util_EffectProperty.$ctor();
				$t20.name = 'Property Value';
				$t20.value = 'red';
				$t20.type = 'text';
				ss.add($t21, $t20);
				break;
			}
			case 'animated': {
				var $t23 = effect.properties;
				var $t22 = $CardGameUI_Util_EffectProperty.$ctor();
				$t22.name = 'idk';
				$t22.value = 'rite?';
				$t22.type = 'text';
				ss.add($t23, $t22);
				break;
			}
		}
		return effect;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Controllers.GameCtrl
	var $CardGameUI_Controllers_GameCtrl = function(scope, effectWatcher) {
		this.$scope = null;
		this.$myEffectWatcher = null;
		this.$scope = scope;
		this.$myEffectWatcher = effectWatcher;
		scope.mainArea = eval('loadMainArea()');
		scope.selectedCard = null;
		var addRule = (function(style) {
			var document = eval('window.document');
			var sheet = document.head.appendChild(style).sheet;
			return function(selector, css) {
				var propText = Object.keys(css).map(function(p) {
					return p + ':' + css[p];
				}).join(';');
				sheet.insertRule(selector + '{' + propText + '}', sheet.cssRules.length);
			};
		})(document.createElement('style'));
		//new Action<string,JsDictionary<string,object>>()
		for (var $t1 = 0; $t1 < scope.mainArea.spaces.length; $t1++) {
			var space = scope.mainArea.spaces[$t1];
			addRule('.space' + space.name, {});
			addRule('.space' + space.name + '::before', {});
			addRule('.space' + space.name + '::after', {});
			for (var $t2 = 0; $t2 < space.pile.cards.length; $t2++) {
				var card = space.pile.cards[$t2];
				card.appearance.effectNames = [];
				if (ss.startsWithString(space.name, 'User')) {
					ss.add(card.appearance.effectNames, 'bend');
				}
				addRule('.card' + card.type + '-' + card.value + '', {});
				addRule('.card' + card.type + '-' + card.value + '::before', {});
				addRule('.card' + card.type + '-' + card.value + '::after', {});
			}
		}
		var $t3 = $CardGameUI_Util_Point.$ctor();
		$t3.x = ss.Int32.div($(window).width(), scope.mainArea.size.width) * 0.9;
		$t3.y = ss.Int32.div($(window).height() - 250, scope.mainArea.size.height) * 0.9;
		scope.scale = $t3;
		scope.moveCard = function() {
			for (var i = 0; i < 1; i++) {
				var card1 = null;
				while (ss.isNullOrUndefined(card1)) {
					var pile = $CardGameUI_Util_Extensions.randomElement(global.TableSpace).call(null, scope.mainArea.spaces).pile;
					card1 = $CardGameUI_Util_Extensions.randomElement(global.Card).call(null, pile.cards);
					var _pile = $CardGameUI_Util_Extensions.randomElement(global.TableSpace).call(null, scope.mainArea.spaces);
					if (ss.isValue(card1) && ss.isValue(_pile)) {
						ss.remove(card1.appearance.effectNames, 'bend');
						if (ss.startsWithString(_pile.name, 'User')) {
							ss.add(card1.appearance.effectNames, 'bend');
						}
						ss.remove(pile.cards, card1);
						ss.add(_pile.pile.cards, card1);
					}
				}
			}
		};
		scope.animateCard = function() {
			for (var i1 = 0; i1 < 1; i1++) {
				var card2 = { $: null };
				while (ss.isNullOrUndefined(card2.$)) {
					var pile1 = $CardGameUI_Util_Extensions.randomElement(global.TableSpace).call(null, scope.mainArea.spaces).pile;
					card2.$ = $CardGameUI_Util_Extensions.randomElement(global.Card).call(null, pile1.cards);
					var _pile1 = { $: $CardGameUI_Util_Extensions.randomElement(global.TableSpace).call(null, scope.mainArea.spaces) };
					if (ss.isValue(card2.$) && ss.isValue(_pile1.$)) {
						var css1 = ss.formatString('.card{0}-{1}', card2.$.type, card2.$.value);
						var clone = { $: $CardGameUI_Util_Extensions.fuckingClone($(css1)) };
						var space1 = $(ss.formatString('.space{0}', _pile1.$.name));
						var off = space1.offset();
						clone.$.css('z-index', 1000);
						var ops = {};
						ops['left'] = off.left + ss.Int32.div(space1.width(), 2) - 35;
						ops['top'] = off.top + ss.Int32.div(space1.height(), 2) - 48;
						ops['rotate'] = '0deg';
						ss.remove(pile1.cards, card2.$);
						clone.$.animate(ops, 700, 'easeInOutQuart', ss.mkdel({ card2: card2, _pile1: _pile1, clone: clone }, function() {
							ss.remove(this.card2.$.appearance.effectNames, 'bend');
							if (ss.startsWithString(this._pile1.$.name, 'User')) {
								ss.add(this.card2.$.appearance.effectNames, 'bend');
							}
							this.clone.$.remove();
							ss.add(this._pile1.$.pile.cards, this.card2.$);
							scope.$apply();
						}));
					}
				}
			}
		};
		effectWatcher.applyEffect = ss.delegateCombine(effectWatcher.applyEffect, function(effect) {
			if (ss.isNullOrUndefined(scope.selectedCard)) {
				return;
			}
			ss.add(scope.selectedCard.appearance.effectNames, effect.name);
		});
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.AcgDrawCardDirective
	var $CardGameUI_Directives_AcgDrawCardDirective = function(effectManager) {
		this.$myEffectManager = null;
		this.link = null;
		this.$myEffectManager = effectManager;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('style', 'width:71px; height:96px;');
			element.attr('class', 'card ' + ss.formatString('card{0}-{1}', scope.card.type, scope.card.value));
			scope.$watch('$parent.$parent.selectedCard', function() {
				if (ss.isNullOrUndefined(scope.$parent.$parent.selectedCard) || !ss.referenceEquals(scope.$parent.$parent.selectedCard, scope.card)) {
					scope.cardStyle.border = undefined;
				}
				else {
					scope.cardStyle.border = 'solid 4px green';
				}
			});
			scope.cardClick = function() {
				if (ss.referenceEquals(scope.$parent.$parent.selectedCard, scope.card)) {
					scope.$parent.$parent.selectedCard = null;
				}
				else {
					scope.$parent.$parent.selectedCard = scope.card;
				}
			};
			var redrawCard = ss.mkdel(this, function() {
				var spaceScale = { width: scope.$parent.space.width / scope.$parent.space.pile.cards.length, height: scope.$parent.space.height / scope.$parent.space.pile.cards.length };
				var vertical = scope.$parent.space.vertical;
				var cardIndex = ss.indexOf(scope.$parent.space.pile.cards, scope.card);
				scope.cardStyle = {};
				var xx = 0;
				var yy = 0;
				switch (scope.$parent.space.resizeType) {
					case 1: {
						if (vertical) {
							yy = (scope.card.value + 1) / 13 * scope.$parent.space.height * scope.$parent.$parent.scale.y;
						}
						else {
							xx = (scope.card.value + 1) / 13 * scope.$parent.space.width * scope.$parent.$parent.scale.x;
						}
						break;
					}
					case 0: {
						xx = (!vertical ? (cardIndex * spaceScale.width * scope.$parent.$parent.scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.height * scope.$parent.$parent.scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (cardIndex * spaceScale.width * scope.$parent.$parent.scale.x) : 0);
						yy = (vertical ? (cardIndex * spaceScale.height * scope.$parent.$parent.scale.y) : 0);
						break;
					}
				}
				xx -= 35;
				yy -= 48;
				scope.cardStyle.position = 'absolute';
				scope.cardStyle.zIndex = cardIndex;
				scope.cardStyle.borderRadius = '5px';
				scope.cardStyle.left = xx + (vertical ? (scope.$parent.space.width * scope.$parent.$parent.scale.x / 2) : 0);
				scope.cardStyle.top = yy + (!vertical ? (scope.$parent.space.height * scope.$parent.$parent.scale.y / 2) : 0);
				//                scope.CardStyle["-webkit-transform"] = "rotate(" + scope.Parent.Space.Appearance.InnerStyle.Rotate + "deg)";
				element.rotate(scope.$parent.space.appearance.innerStyle.rotate + 'deg');
				scope.cardStyle.content = '""';
				if (ss.startsWithString(scope.$parent.space.name, 'User')) {
					if (scope.card.appearance.effects.length === 0) {
						var $t2 = scope.card.appearance.effects;
						var $t1 = global.CardGameEffectBendOptions.$ctor();
						$t1.degrees = 15;
						ss.add($t2, new global.Effect$Bend($t1));
					}
				}
				else {
					for (var index = scope.card.appearance.effects.length - 1; index >= 0; index--) {
						var cardGameAppearanceEffect = scope.card.appearance.effects[index];
						if (cardGameAppearanceEffect.type === 2) {
							ss.remove(scope.card.appearance.effects, cardGameAppearanceEffect);
						}
					}
				}
				for (var $t3 = 0; $t3 < scope.card.appearance.effectNames.length; $t3++) {
					var effect = scope.card.appearance.effectNames[$t3];
					var grabbedEffect = this.$myEffectManager.getEffectByName(effect);
					if (ss.isNullOrUndefined(grabbedEffect)) {
						continue;
					}
					switch (grabbedEffect.type) {
						case 'highlight': {
							var $t4 = global.CardGameEffectHighlightOptions.$ctor();
							$t4.color = grabbedEffect.getPropertyByName(String).call(grabbedEffect, 'color');
							$t4.radius = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'radius');
							$t4.rotate = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'rotate');
							$t4.offsetX = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'offsetx');
							$t4.offsetY = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'offsety');
							$t4.opacity = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'opacity');
							var _effect = new global.Effect$Highlight($t4);
							var beforeStyle = {};
							beforeStyle['display'] = 'block';
							beforeStyle['position'] = 'relative';
							beforeStyle['z-index'] = '-1';
							beforeStyle['width'] = '100%';
							beforeStyle['height'] = '100%';
							beforeStyle['left'] = -_effect.radius + _effect.offsetX + 'px';
							beforeStyle['top'] = -_effect.radius + _effect.offsetY + 'px';
							beforeStyle['padding'] = _effect.radius + 'px';
							beforeStyle['border-radius'] = '5px';
							beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
							var color = $CardGameUI_Directives_AcgDrawCardDirective.hextorgb(_effect.color);
							beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', color.R, color.G, color.B, _effect.opacity);
							beforeStyle['border'] = '2px solid black';
							$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', beforeStyle);
							break;
						}
						case 'rotate': {
							break;
						}
						case 'bend': {
							var $t5 = global.CardGameEffectBendOptions.$ctor();
							$t5.degrees = grabbedEffect.getPropertyByName(Number).call(grabbedEffect, 'degrees');
							var bEffect = new global.Effect$Bend($t5);
							var rotate = ss.replaceAllString(element.css('transform'), ' scale(1, 1)', '');
							element.rotate(-bEffect.degrees / 2 + bEffect.degrees / (scope.$parent.space.pile.cards.length - 1) * cardIndex + $CardGameUI_Directives_AcgDrawCardDirective.noTransformRotate(rotate) + 'deg');
							break;
						}
						case 'styleProperty': {
							break;
						}
						case 'animated': {
							break;
						}
					}
				}
			});
			var keys = {};
			keys['content'] = 'url(\'http://198.211.107.101:8881/assets/cards/' + (100 + (scope.card.value + 1) + scope.card.type * 13) + '.gif\')';
			$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
			scope.$watch('$parent.space', function() {
				console.log('ac');
				redrawCard();
			}, true);
			scope.$watch('card.appearance.effectNames', function() {
				console.log('b');
				redrawCard();
			}, true);
			scope.$watch(ss.mkdel(this, function(_scope) {
				var effects = [];
				for (var $t6 = 0; $t6 < _scope.card.appearance.effectNames.length; $t6++) {
					var ef = _scope.card.appearance.effectNames[$t6];
					var _ef = this.$myEffectManager.getEffectByName(ef);
					ss.add(effects, _ef);
				}
				return effects;
			}), function() {
				console.log('c');
				redrawCard();
			}, true);
			redrawCard();
		}
	};
	$CardGameUI_Directives_AcgDrawCardDirective.hextorgb = function(hex) {
		var result = (new RegExp('^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$')).exec(hex);
		return (ss.isValue(result) ? { R: parseInt(result[1], 16), G: parseInt(result[2], 16), B: parseInt(result[3], 16) } : null);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.noTransformRotate = function(ar) {
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.AcgDrawSpaceDirective
	var $CardGameUI_Directives_AcgDrawSpaceDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_AcgDrawSpaceDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('class', 'space ' + ss.formatString('space{0}', scope.space.name));
			element.resizable({
				grid: [scope.$parent.scale.x, scope.$parent.scale.y],
				minHeight: -1,
				minWidth: -1,
				handles: 'n, e, s, w,nw,sw,ne,se',
				resize: function(ev, ele) {
					scope.space.width = ele.size.width / scope.$parent.scale.x;
					scope.space.height = ele.size.height / scope.$parent.scale.y;
					scope.$apply();
				}
			});
			element.draggable({
				cursor: 'crosshair',
				grid: [scope.$parent.scale.x, scope.$parent.scale.y],
				drag: function(ev1, ele1) {
					scope.space.x = ele1.position.left / scope.$parent.scale.x;
					scope.space.y = ele1.position.top / scope.$parent.scale.y;
					scope.$apply();
				}
			});
			var beforeStyle = {};
			beforeStyle['display'] = 'block';
			beforeStyle['position'] = 'relative';
			beforeStyle['z-index'] = '-1';
			beforeStyle['width'] = '100%';
			beforeStyle['height'] = '100%';
			beforeStyle['left'] = '-50px';
			beforeStyle['top'] = '-50px';
			beforeStyle['padding'] = '50px';
			beforeStyle['border-radius'] = '15px';
			beforeStyle['box-shadow'] = 'rgb(51, 51, 51) 4px 4px 2px';
			beforeStyle['content'] = '""';
			beforeStyle['background'] = 'rgba(112, 12, 58, 0.231373)';
			$CardGameUI_Directives_AcgDrawSpaceDirective.$changeCSS('space' + scope.space.name + '::before', beforeStyle);
			scope.spaceStyle = {};
			scope.spaceStyle.position = 'absolute';
			scope.spaceStyle.left = scope.space.x * scope.$parent.scale.x;
			scope.spaceStyle.top = scope.space.y * scope.$parent.scale.y;
			scope.spaceStyle.width = scope.space.width * scope.$parent.scale.x;
			scope.spaceStyle.height = scope.space.height * scope.$parent.scale.y;
			scope.spaceStyle.backgroundColor = 'red';
			for (var $t1 = 0; $t1 < scope.space.appearance.effects.length; $t1++) {
				var effect = scope.space.appearance.effects[$t1];
				switch (effect.type) {
					case 0: {
						var hEffect = effect;
						scope.spaceStyle.padding = ss.formatString('{0} {0} {0} {0}', hEffect.radius);
						scope.spaceStyle.backgroundColor = hEffect.color;
						scope.spaceStyle.border = 'solid 2px black';
						scope.spaceStyle.borderRadius = 15;
						scope.spaceStyle.boxShadow = '4px 4px 2px #333';
						break;
					}
					case 1: {
						window.alert(effect.type.toString());
						break;
					}
					case 2: {
						var bEffect = effect;
						//rotate
						break;
					}
					case 3: {
						window.alert(effect.type.toString());
						break;
					}
					case 4: {
						window.alert(effect.type.toString());
						break;
					}
					default: {
						break;
					}
				}
			}
		}
	};
	$CardGameUI_Directives_AcgDrawSpaceDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$CardGameUI_Directives_AcgDrawSpaceDirective.$changeCSS = function(myClass, values) {
		myClass = '.' + myClass;
		var CSSRules = '';
		var document = eval('window.document');
		if (document.all) {
			CSSRules = 'rules';
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules';
		}
		for (var a = 0; a < document.styleSheets.length; a++) {
			if (ss.isNullOrUndefined(document.styleSheets[a][CSSRules])) {
				continue;
			}
			for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
				if (ss.referenceEquals(document.styleSheets[a][CSSRules][i].selectorText, myClass)) {
					var $t1 = new ss.ObjectEnumerator(values);
					try {
						while ($t1.moveNext()) {
							var m = $t1.current();
							document.styleSheets[a][CSSRules][i].style[m.key] = m.value;
						}
					}
					finally {
						$t1.dispose();
					}
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.DraggableDirective
	var $CardGameUI_Directives_DraggableDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_DraggableDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.draggable();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.PropertyDirective
	var $CardGameUI_Directives_PropertyDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_PropertyDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			var prop = scope[attrs.property];
			switch (prop.type) {
				case 'text': {
					element[0].setAttribute('type', 'text');
					break;
				}
				case 'number': {
					element[0].setAttribute('type', 'number');
					break;
				}
				case 'color': {
					element[0].setAttribute('type', 'color');
					break;
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope._KeepBaseScopeAlive
	var $CardGameUI_Scope__KeepBaseScopeAlive = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.CardScope
	var $CardGameUI_Scope_CardScope = function() {
		this.card = null;
		this.cardStyle = null;
		this.cardClick = null;
		this.$parent = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.EffectEditorScope
	var $CardGameUI_Scope_EffectEditorScope = function() {
		this.effect = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.GameCtrlScope
	var $CardGameUI_Scope_GameCtrlScope = function() {
		this.mainArea = null;
		this.scale = null;
		this.moveCard = null;
		this.animateCard = null;
		this.selectedCard = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.ListEffectsScope
	var $CardGameUI_Scope_ListEffectsScope = function() {
		this.newEffect = null;
		this.addEffect = null;
		this.effects = null;
		this.effectTypes = null;
		this.selectedEffectType = 0;
		this.effectClick = null;
		this.enableEffect = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Scope.SpaceScope
	var $CardGameUI_Scope_SpaceScope = function() {
		this.space = null;
		this.$parent = null;
		this.spaceStyle = null;
		CardGameUI.Scope.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.EditEffectService
	var $CardGameUI_Services_$EditEffectService = function() {
		this.popOpenEffect = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.EffectManagerService
	var $CardGameUI_Services_EffectManagerService = function() {
		this.effects = null;
	};
	$CardGameUI_Services_EffectManagerService.prototype = {
		getEffectByName: function(effect) {
			for (var $t1 = 0; $t1 < this.effects.length; $t1++) {
				var eff = this.effects[$t1];
				if (ss.referenceEquals(eff.name.toLowerCase(), effect.toLowerCase())) {
					return eff;
				}
			}
			return null;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Services.EffectWatcherService
	var $CardGameUI_Services_EffectWatcherService = function() {
		this.applyEffect = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.Effect
	var $CardGameUI_Util_Effect = function() {
		this.name = null;
		this.type = 0;
		this.properties = null;
		this.properties = [];
	};
	$CardGameUI_Util_Effect.prototype = {
		getPropertyByName: function(T) {
			return function(name) {
				for (var $t1 = 0; $t1 < this.properties.length; $t1++) {
					var effectProperty = this.properties[$t1];
					if (ss.referenceEquals(effectProperty.name.toLowerCase(), name.toLowerCase())) {
						return effectProperty.value;
					}
				}
				return ss.getDefaultValue(T);
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectProperty
	var $CardGameUI_Util_EffectProperty = function() {
	};
	$CardGameUI_Util_EffectProperty.createInstance = function() {
		return $CardGameUI_Util_EffectProperty.$ctor();
	};
	$CardGameUI_Util_EffectProperty.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.value = null;
		$this.type = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectPropertyType
	var $CardGameUI_Util_EffectPropertyType = function() {
	};
	$CardGameUI_Util_EffectPropertyType.prototype = { text: 'text', number: 'number', color: 'color' };
	ss.registerEnum(global, 'CardGameUI.Util.EffectPropertyType', $CardGameUI_Util_EffectPropertyType, false);
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectType2
	var $CardGameUI_Util_EffectType2 = function() {
	};
	$CardGameUI_Util_EffectType2.prototype = { highlight: 'highlight', rotate: 'rotate', bend: 'bend', styleProperty: 'styleProperty', animated: 'animated' };
	ss.registerEnum(global, 'CardGameUI.Util.EffectType2', $CardGameUI_Util_EffectType2, false);
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.Extensions
	var $CardGameUI_Util_Extensions = function() {
	};
	$CardGameUI_Util_Extensions.randomElement = function(T) {
		return function(arr) {
			return arr[ss.Int32.trunc(Math.floor(Math.random() * arr.length))];
		};
	};
	$CardGameUI_Util_Extensions.fuckingClone = function(elem) {
		var pos = elem.offset();
		var m = elem.clone();
		m.css('left', -999999);
		m.css('top', -999999);
		$('body').append(m);
		var curTransformX = m.position().left;
		var curTransformY = m.position().top;
		var oldRot = m.css('-webkit-transform');
		m.css('-webkit-transform', '');
		curTransformX = m.position().left - curTransformX;
		curTransformY = m.position().top - curTransformY;
		m.css('-webkit-transform', oldRot);
		m.css('left', pos.left + curTransformX);
		m.css('top', pos.top + curTransformY);
		return m;
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.Point
	var $CardGameUI_Util_Point = function() {
	};
	$CardGameUI_Util_Point.createInstance = function() {
		return $CardGameUI_Util_Point.$ctor();
	};
	$CardGameUI_Util_Point.$ctor = function() {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.BuildSite
	var $Client_BuildSite = function(gatewayServerAddress) {
		this.$gatewayServerAddress = null;
		this.shuffUIManager = null;
		$Client_BuildSite.instance = this;
		this.$gatewayServerAddress = gatewayServerAddress;
		$Client_BuildSite.$loadJunk(CommonLibraries.IPs.webIP, ss.mkdel(this, this.$ready));
	};
	$Client_BuildSite.prototype = {
		$ready: function() {
			var elem = document.getElementById('loading');
			elem.parentNode.removeChild(elem);
			var stats = new xStats();
			document.body.appendChild(stats.element);
			window.setTimeout(function() {
				$('.xstats').css('right', '0px');
				$('.xstats').css('position', 'absolute');
				$('.xstats').css('z-index', '9998!important');
				$('.xstats').children().css('z-index', '9998!important');
			}, 1000);
			window.addEventListener('scroll', function(e) {
				window.scrollTo(0, 0);
				e.stopImmediatePropagation();
			});
			var dvGame = document.createElement('div');
			$('body').append(dvGame);
			dvGame.id = 'dvGame';
			dvGame.style.left = '0%';
			dvGame.style.position = 'absolute';
			dvGame.style.top = '0';
			dvGame.style.right = '0';
			dvGame.style.bottom = '0';
			dvGame.style['-webkit-transform'] = 'scale(1.2)';
			document.body.style['overflow'] = 'hidden';
			document.body.addEventListener('contextmenu', function(e1) {
				//  e.PreventDefault();
				//todo: Special right click menu;
			}, false);
			var pageHandler = new $Client_PageHandler(this.$gatewayServerAddress);
			//
			//
			//
			//
			//
			//        var chatArea = shuffUIManager.createWindow({
			//
			//
			//
			//
			//
			//        title: "Chat",
			//
			//
			//
			//
			//
			//        x: 600,
			//
			//
			//
			//
			//
			//        y: 100,
			//
			//
			//
			//
			//
			//        width: 300,
			//
			//
			//
			//
			//
			//        height: 275,
			//
			//
			//
			//
			//
			//        allowClose: true,
			//
			//
			//
			//
			//
			//        allowMinimize: true,
			//
			//
			//
			//
			//
			//        visible: false
			//
			//
			//
			//
			//
			//        
			//
			//
			//
			//
			//
			//        });
		}
	};
	$Client_BuildSite.$loadJunk = function(url, ready) {
		var scriptLoader = new $Client_Libs_ScriptLoader();
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/jquery-ui.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/codemirror/lib/codemirror.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/codemirror/theme/night.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/jqwidgets/styles/jqx.base.css');
		$Client_Libs_ScriptLoader.loadCss(url + 'lib/site.css');
		var stepThree = function() {
			scriptLoader.load([url + 'lib/RawDeflate.js'], true, ready);
		};
		var stepTwo = function() {
			scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], false, stepThree);
		};
		var stepOne = function() {
			scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/lib/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], false, stepTwo);
		};
		scriptLoader.loadSync([url + 'lib/jqwidgets/scripts/gettheme.js', url + 'lib/jqwidgets/jqxcore.js'], stepOne);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.ClientInformation
	var $Client_ClientInformation = function() {
	};
	$Client_ClientInformation.createInstance = function() {
		return $Client_ClientInformation.$ctor();
	};
	$Client_ClientInformation.$ctor = function() {
		var $this = {};
		$this.loggedInUser = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.PageHandler
	var $Client_PageHandler = function(gatewayServerAddress) {
		this.gameDrawer = null;
		this.$shuffUIManager = null;
		this.clientGameManager = null;
		this.clientDebugManager = null;
		this.clientSiteManager = null;
		this.clientChatManager = null;
		this.timeTracker = null;
		this.codeEditorUI = null;
		this.questionUI = null;
		this.debugUI = null;
		this.homeUI = null;
		this.loginUI = null;
		this.clientInfo = null;
		this.$1$GameManagerField = null;
		this.$shuffUIManager = new WebLibraries.ShuffUI.ShuffUI.ShuffUIManager();
		this.gameDrawer = new $Client_ShufflyGame_GameDrawer();
		this.timeTracker = $Client_Libs_TimeTracker.$ctor();
		var gateway = new ClientLibs.Gateway(gatewayServerAddress, false);
		this.clientGameManager = new ClientLibs.Managers.ClientGameManager(gateway);
		this.clientSiteManager = new ClientLibs.Managers.ClientSiteManager(gateway);
		this.clientDebugManager = new ClientLibs.Managers.ClientDebugManager(gateway);
		this.clientChatManager = new ClientLibs.Managers.ClientChatManager(gateway);
		this.clientInfo = $Client_ClientInformation.$ctor();
		this.set_gameManager(new $Client_ShufflyGame_GameManager(this));
		this.loginUI = new $Client_UIWindow_LoginUI(this.$shuffUIManager, this);
		this.homeUI = new $Client_UIWindow_HomeUI(this.$shuffUIManager, this);
		this.questionUI = new $Client_UIWindow_QuestionUI(this.$shuffUIManager, this);
		//gateway.On("Area.Lobby.ListCardGames.Response", (data) => { });
		//gateway.On("Area.Lobby.ListRooms.Response", (data) => { Logger.Log });
		//ie8
		//   {
		//   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;
		//   
		//   var m = (Action<string, ElementEventHandler>)d2;
		//   m("contextmenu", () =>
		//   {
		//   
		//   });
		//   }
	};
	$Client_PageHandler.prototype = {
		get_gameManager: function() {
			return this.$1$GameManagerField;
		},
		set_gameManager: function(value) {
			this.$1$GameManagerField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Libs.ScriptLoader
	var $Client_Libs_ScriptLoader = function() {
	};
	$Client_Libs_ScriptLoader.prototype = {
		$loadScript: function(url, cache, callback) {
			cache = false;
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url + (cache ? ('?' + Math.floor(Math.random() * 10000)) : '');
			//caching
			if (!ss.staticEquals(callback, null)) {
				script.onreadystatechange = function(a) {
					if (script.readyState === 'loaded' || script.readyState === 'complete') {
						callback();
					}
				};
				script.onload = function(a1) {
					callback();
				};
			}
			head.appendChild(script);
		},
		load: function(items, cache, done) {
			var counter = 0;
			for (var i = 0; i < items.length; i++) {
				this.$loadScript(items[i], cache, function() {
					counter++;
					if (counter >= items.length) {
						done();
					}
				});
			}
		},
		loadSync: function(items, done) {
			var counter = 0;
			var nextOne = null;
			nextOne = ss.mkdel(this, function() {
				counter++;
				if (counter >= items.length) {
					done();
				}
				else {
					this.$loadScript(items[counter], false, nextOne);
				}
			});
			this.$loadScript(items[0], false, nextOne);
		}
	};
	$Client_Libs_ScriptLoader.loadCss = function(filename) {
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
		document.getElementsByTagName('head')[0].appendChild(fileref);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Libs.TimeTracker
	var $Client_Libs_TimeTracker = function() {
	};
	$Client_Libs_TimeTracker.createInstance = function() {
		return $Client_Libs_TimeTracker.$ctor();
	};
	$Client_Libs_TimeTracker.$ctor = function() {
		var $this = {};
		$this.numOfTimes = 0;
		$this.startTime = new Date(0);
		$this.timeValue = 0;
		$this.endTime = new Date(0);
		$this.startTime = new Date();
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.ShufflyGame.GameDrawer
	var $Client_ShufflyGame_GameDrawer = function() {
		this.$cardImages = null;
		this.cards = {};
		this.$resetStyles = ['border-radius', '-moz-border-radius', 'left', 'top', '-webkit-border-radius', 'box-shadow', '-moz-box-shadow', 'transform', '-webkit-transform', 'padding', 'background-color', 'border'];
		this.spaces = {};
		this.$cardImages = {};
		for (var i = 101; i < 153; i++) {
			var img = new Image();
			var domain = 'http://198.211.107.101:8881/assets';
			var src = domain + '/cards/' + i;
			var jm;
			img.src = jm = src + '.gif';
			this.$cardImages[jm] = img;
		}
	};
	$Client_ShufflyGame_GameDrawer.prototype = {
		draw: function(data) {
			for (var $t1 = 0; $t1 < data.spaces.length; $t1++) {
				var space = data.spaces[$t1];
				space.appearance = this.$fixAppearance(space.appearance);
				for (var $t2 = 0; $t2 < space.pile.cards.length; $t2++) {
					var card = space.pile.cards[$t2];
					card.appearance = this.$fixAppearance(card.appearance);
				}
			}
			this.drawArea(data);
		},
		$fixAppearance: function(appearance) {
			return global.Appearance.fromJson(appearance);
		},
		drawArea: function(mainArea) {
			this.$newDrawArea(mainArea);
			for (var $t1 = 0; $t1 < mainArea.textAreas.length; $t1++) {
				var ta = mainArea.textAreas[$t1];
				//  gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
				//  gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
			}
		},
		$findSpace: function(space) {
			var id = 'dv_space_' + space.name;
			if (ss.isValue(this.spaces[id])) {
				return this.spaces[id];
			}
			else {
				var sp = document.createElement('div');
				sp.id = id;
				sp.style.position = 'absolute';
				$('#dvGame').append(sp);
				return this.spaces[id] = new global.SpaceDrawing(sp);
			}
		},
		$findCard: function(wantedSpace, card) {
			var id = 'dv_card_' + card.type + '_' + card.value;
			var space = this.$findSpace(wantedSpace);
			var doc;
			if (ss.isValue(this.cards[id])) {
				var m = document.getElementById(id);
				if (!ss.referenceEquals(m.parentNode, space.outerElement)) {
					m.parentNode.removeChild(m);
					space.outerElement.appendChild(m);
				}
				doc = this.cards[id];
			}
			else {
				var sp = document.createElement('div');
				sp.id = id;
				$(space.outerElement).append(sp);
				var cardImage = this.$cloneImage(this.$cardImages[this.drawCard(card)]);
				sp.appendChild(cardImage);
				sp.style.position = 'absolute';
				doc = this.cards[id] = new global.CardDrawing(sp);
			}
			return doc;
		},
		$newDrawArea: function(mainArea) {
			//jQuery.Select("#dvGame").Children().Remove();
			var scale = new CommonLibraries.Point(ss.Int32.div(document.documentElement.clientWidth, mainArea.size.width) * 0.9, ss.Int32.div(document.documentElement.clientHeight - 250, mainArea.size.height) * 0.9);
			//ExtensionMethods.debugger(null); 
			//
			//                        for (int spaceIndex = 0; spaceIndex < sl; spaceIndex++)
			//
			//                        {
			//
			//                        var space = mainArea.Spaces[spaceIndex];
			//
			//                        var jf = findSpace(space).OuterElement;
			//
			//                        
			//
			//                        for (int i = 0; i < resetStyles.Length; i++)
			//
			//                        {
			//
			//                        jf.Style[resetStyles[i]] = null;
			//
			//                        }
			//
			//                        
			//
			//                        l = space.Pile.Cards.Count;
			//
			//                        for (int index = 0; index < l; index++)
			//
			//                        {
			//
			//                        var card = space.Pile.Cards[index];
			//
			//                        var m = findCard(space, card);
			//
			//                        
			//
			//                        for (int i = 0; i < resetStyles.Length; i++)
			//
			//                        {
			//
			//                        m.OuterElement.Style[resetStyles[i]] = null;
			//
			//                        m.Image.Style[resetStyles[i]] = null;
			//
			//                        }
			//
			//                        }
			//
			//                        }
			for (var $t1 = 0; $t1 < mainArea.spaces.length; $t1++) {
				var space = mainArea.spaces[$t1];
				var vertical = space.vertical;
				var spaceDiv = this.$findSpace(space);
				// var spaceDivJ = jQuery.FromElement(spaceDiv);
				//ExtensionMethods.debugger();
				var cl = space.appearance.effects.length;
				for (var i = 0; i < cl; i++) {
					var effect = space.appearance.effects[i];
					effect.build$1(spaceDiv);
				}
				spaceDiv.outerElementStyle.set_width(global.domUtils.px(space.width * scale.x));
				spaceDiv.outerElementStyle.set_height(global.domUtils.px(space.height * scale.y));
				//   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);
				var spaceScale = new CommonLibraries.Point(space.width / space.pile.cards.length, space.height / space.pile.cards.length);
				var j = 0;
				var numOfCards = space.pile.cards.length;
				for (var i1 = 0; i1 < numOfCards; i1++) {
					var card = space.pile.cards[i1];
					var xx = 0;
					var yy = 0;
					switch (space.resizeType) {
						case 1: {
							if (vertical) {
								yy = card.value * scale.y / 2;
							}
							else {
								xx = card.value * scale.x / 2;
							}
							break;
						}
						case 0: {
							xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
							yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
							break;
						}
						default: {
							xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
							yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
							break;
						}
					}
					var cardDiv = this.$findCard(space, card);
					xx -= global.domUtils.nopx(cardDiv.outerElementStyle.get_width()) / 2;
					yy -= global.domUtils.nopx(cardDiv.outerElementStyle.get_height()) / 2;
					cardDiv.outerElementStyle.set_borderRadius('5px');
					cardDiv.outerElementStyle.set_boxShadow('3px 3px 2px #2c2c2c');
					this.$styleAppearanceFromSpace(cardDiv, j, space);
					this.$styleAppearance(cardDiv, card.appearance);
					spaceDiv.outerElementStyle.set_left(global.domUtils.px(space.x * scale.x));
					spaceDiv.outerElementStyle.set_top(global.domUtils.px(space.y * scale.y));
					//cardDiv.OuterElement.Style["transform"] = 0.0.TransformRotate();
					cardDiv.outerElementStyle.set_left(global.domUtils.px(xx + (vertical ? (space.width * scale.x / 2) : 0)));
					cardDiv.outerElementStyle.set_top(global.domUtils.px(yy + (!vertical ? (space.height * scale.y / 2) : 0)));
					cardDiv.outerElementStyle.set_transform(global.domUtils.transformRotate(space.appearance.innerStyle.rotate));
					cardDiv.outerElementStyle.setStyle(cardDiv.outerElement);
					this.fixBrowserPrefixes(cardDiv.outerElement.style);
					//                    spaceDiv.AppendChild(cardDiv);
					j++;
					//effects
				}
				var el = space.appearance.effects.length;
				for (var i2 = 0; i2 < el; i2++) {
					var effect1 = space.appearance.effects[i2];
					effect1.tearDown$1(spaceDiv);
				}
			}
			for (var $t2 = 0; $t2 < mainArea.spaces.length; $t2++) {
				var space1 = mainArea.spaces[$t2];
				this.$findSpace(space1).outerElementStyle.setStyle(this.$findSpace(space1).outerElement);
				for (var $t3 = 0; $t3 < space1.pile.cards.length; $t3++) {
					var card1 = space1.pile.cards[$t3];
					//   
					var m = this.$findCard(space1, card1);
					this.$findSpace(space1).outerElementStyle.setStyle(this.$findSpace(space1).outerElement);
					//
					//                                        m.ImageStyle = new MyStyle();
					//
					//                                        m.OuterElementStyle = new MyStyle();
				}
			}
			//
			//
			//            foreach (var ta in mainArea.TextAreas)
			//
			//
			//            {
			//
			//
			//            gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
			//
			//
			//            gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
			//
			//
			//            }
		},
		$styleAppearanceFromSpace: function(element, cardIndex, space) {
			var appearance = space.appearance;
			for (var $t1 = 0; $t1 < appearance.effects.length; $t1++) {
				var cardGameAppearanceEffect = appearance.effects[$t1];
				//   cardGameAppearanceEffect.Build(element.Item1);
				switch (cardGameAppearanceEffect.type) {
					case 2: {
						var bEffect = cardGameAppearanceEffect;
						//rotate
						var trans = element.outerElementStyle.get_transform();
						if (ss.startsWithString(ss.coalesce(trans, ''), 'rotate(')) {
							element.outerElementStyle.set_transform(global.domUtils.transformRotate(-bEffect.degrees / 2 + bEffect.degrees / (space.pile.cards.length - 1) * cardIndex + global.domUtils.noTransformRotate(trans)));
						}
						else {
							element.outerElementStyle.set_transform(global.domUtils.transformRotate(appearance.innerStyle.rotate));
						}
						break;
					}
				}
			}
			element.outerElementStyle.set_backgroundColor(appearance.innerStyle.backColor);
		},
		$styleAppearance: function(element, appearance) {
			for (var $t1 = 0; $t1 < appearance.effects.length; $t1++) {
				var cardGameAppearanceEffect = appearance.effects[$t1];
				cardGameAppearanceEffect.build(element);
				//new object().debugger();
				cardGameAppearanceEffect.tearDown(element);
			}
			//rotate
			var trans = element.outerElementStyle.get_transform();
			if (ss.startsWithString(ss.coalesce(trans, ''), 'rotate(')) {
				element.outerElementStyle.set_transform(ss.formatString('rotate({0}deg)', appearance.innerStyle.rotate + parseInt(ss.replaceAllString(ss.replaceAllString(trans, 'rotate(', ''), 'deg)', ''))));
			}
			else {
				element.outerElementStyle.set_transform(ss.formatString('rotate({0}deg)', appearance.innerStyle.rotate));
			}
			element.outerElementStyle.set_backgroundColor(appearance.innerStyle.backColor);
		},
		fixBrowserPrefixes: function(cardImage) {
			if (ss.isValue(cardImage['transform'])) {
				cardImage['-webkit-transform'] = cardImage['transform'];
			}
			if (ss.isValue(cardImage['box-shadow'])) {
				cardImage['-moz-box-shadow'] = cardImage['box-shadow'];
				cardImage['-webkit-box-shadow'] = cardImage['box-shadow'];
			}
			if (ss.isValue(cardImage['border-radius'])) {
				cardImage['-moz-border-radius'] = cardImage['box-shadow'];
				cardImage['-webkit-border-radius'] = cardImage['box-shadow'];
			}
		},
		$cloneImage: function(cardImage) {
			var img = new Image();
			img.src = cardImage.src;
			return img;
		},
		drawCard: function(card) {
			var src = '';
			var domain = 'http://198.211.107.101:8881/assets';
			src = domain + '/cards/' + (100 + (card.value + 1) + card.type * 13);
			return src + '.gif';
		},
		canvasOnClick: function(e) {
			e.preventDefault();
		},
		canvasMouseMove: function(e) {
			e.preventDefault();
			document.body.style.cursor = 'default';
		},
		canvasMouseUp: function(e) {
			e.preventDefault();
		},
		handleScroll: function(e) {
			e.preventDefault();
		},
		clearCache: function() {
			this.cards = {};
			this.spaces = {};
		},
		init: function() {
			this.clearCache();
			$('#dvGame').width('100%');
			$('#dvGame').height('100%');
			$('#dvGame').empty();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.ShufflyGame.GameManager
	var $Client_ShufflyGame_GameManager = function(pageHandler) {
		this.$1$PageHandlerField = null;
		this.clientGameManager = null;
		this.set_pageHandler(pageHandler);
		this.clientGameManager = pageHandler.clientGameManager;
		this.$init();
	};
	$Client_ShufflyGame_GameManager.prototype = {
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$init: function() {
			this.clientGameManager.add_onAskQuestion(ss.mkdel(this, function(user, gameSendAnswerModel) {
				this.get_pageHandler().questionUI.load(gameSendAnswerModel);
				//alert(JSON.stringify(data));
				this.get_pageHandler().timeTracker.endTime = new Date();
				var time = this.get_pageHandler().timeTracker.endTime - this.get_pageHandler().timeTracker.startTime;
				this.get_pageHandler().debugUI.lblHowFast.set_text('how long: ' + time);
			}));
			this.clientGameManager.add_onUpdateState(ss.mkdel(this, function(user1, update) {
				var data = JSON.parse((new Compressor()).DecompressText(update));
				//  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
				this.get_pageHandler().gameDrawer.draw(data);
			}));
			this.clientGameManager.add_onGameStarted(function(user2, room) {
				//alert(JSON.stringify(data));
			});
			this.clientGameManager.add_onGameOver(function(user3, room1) {
				//alert(JSON.stringify(data));
			});
		},
		startGame: function() {
			this.get_pageHandler().gameDrawer.init();
			this.get_pageHandler().clientSiteManager.startGame({});
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.ActiveLobbyUI
	var $Client_UIWindow_ActiveLobbyUI = function(shuffUIManager, pageHandler, room) {
		this.$myPageHandler = null;
		this.$myRoom = null;
		this.$myShuffUIManager = null;
		this.$myChatBox = null;
		this.$myChatText = null;
		this.$myRoomPlayers = null;
		this.uiWindow = null;
		pageHandler.clientSiteManager.add_onGetRoomInfoReceived(ss.mkdel(this, this.$getRoomInfo));
		pageHandler.clientChatManager.add_onGetChatLines(ss.mkdel(this, this.$getChatLines));
		pageHandler.clientChatManager.add_onGetChatInfo(ss.mkdel(this, this.$getChatInfo));
		this.$myShuffUIManager = shuffUIManager;
		this.$myPageHandler = pageHandler;
		this.$myRoom = room;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = ss.formatString('{0} Lobby', this.$myRoom.roomName);
		$t1.set_x(250);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(800));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(600));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.onClose = ss.delegateCombine(this.uiWindow.onClose, ss.mkdel(this, function() {
			this.uiWindow.set_visible(true);
			this.uiWindow.swingAway(4, false);
			pageHandler.clientSiteManager.leaveRoom({ room: room });
			pageHandler.homeUI.uiWindow.swingBack();
		}));
		this.uiWindow.swingAway(4, true);
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(600, 200, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(300), null);
		$t2.set_visible(true);
		this.$myRoomPlayers = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t3, $t2);
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(600, 510, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(23), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Start Game!'), ss.mkdel(this, function(a) {
			pageHandler.get_gameManager().startGame();
			this.uiWindow.set_height(CommonLibraries.Number.op_Implicit$2(200));
		})));
		var $t5 = this.uiWindow;
		var $t4 = new $Client_UIWindow_Controls_ChatBox(50, 50, 550, 500);
		$t4.set_visible(true);
		this.$myChatBox = $t5.addElement($Client_UIWindow_Controls_ChatBox).call($t5, $t4);
		var $t7 = this.uiWindow;
		var $t6 = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(50, 560, CommonLibraries.Number.op_Implicit$2(500), CommonLibraries.Number.op_Implicit$2(30), '', '', null);
		$t6.set_onEnter(ss.mkdel(this, function() {
			if (this.$myChatText.get_text().trim() === '') {
				return;
			}
			pageHandler.clientChatManager.sendChatMessage({ message: this.$myChatText.get_text() });
			this.$myChatText.set_text('');
		}));
		this.$myChatText = $t7.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call($t7, $t6);
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(560, 560, CommonLibraries.Number.op_Implicit$2(50), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send'), ss.mkdel(this, function(e) {
			if (this.$myChatText.get_text().trim() === '') {
				return;
			}
			pageHandler.clientChatManager.sendChatMessage({ message: this.$myChatText.get_text() });
			this.$myChatText.set_text('');
		})));
		this.uiWindow.swingBack();
		this.$populateGameRoom(room);
	};
	$Client_UIWindow_ActiveLobbyUI.prototype = {
		$getChatLines: function(user, o) {
			this.$myChatBox.addChatMessages(o.messages);
		},
		$getChatInfo: function(user, o) {
			this.$populateChatRoom(o.info);
		},
		$getRoomInfo: function(user, o) {
			this.$populateGameRoom(o.room);
		},
		$populateChatRoom: function(roomData) {
			this.$myRoomPlayers.clearItems();
			for (var $t1 = 0; $t1 < roomData.users.length; $t1++) {
				var userModel = roomData.users[$t1];
				this.$myRoomPlayers.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(userModel.userName, userModel.userName));
			}
			if (ss.isValue(roomData.messages)) {
				this.$myChatBox.addChatMessages(roomData.messages);
			}
		},
		$populateGameRoom: function(roomData) {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.CodeEditorUI
	var $Client_UIWindow_CodeEditorUI = function(shuffUIManager, pageHandler) {
		this.$1$ShuffUIManagerField = null;
		this.$1$PageHandlerField = null;
		this.codeEditor = null;
		this.console = null;
		this.breakPoints = null;
		this.uiWindow = null;
		this.set_shuffUIManager(shuffUIManager);
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Code';
		$t1.set_x(0);
		$t1.set_y(0);
		$t1.staticPositioning = false;
		$t1.set_width(CommonLibraries.Number.op_Implicit$2($(window).width() * 0.5));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2($(window).height() * 0.9));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.breakPoints = [];
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor.$ctor1(0, 0, CommonLibraries.Number.op_Implicit$3('100%'), CommonLibraries.Number.op_Implicit$3('80%'), '');
		$t2.set_dock(2);
		this.codeEditor = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor).call($t3, $t2);
		var $t5 = this.uiWindow;
		var $t4 = new WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor.$ctor1(0, 0, CommonLibraries.Number.op_Implicit$3('100%'), CommonLibraries.Number.op_Implicit$3('20%'), '');
		$t4.lineNumbers = false;
		$t4.set_dock(2);
		this.console = $t5.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor).call($t5, $t4);
		pageHandler.clientDebugManager.add_onGetGameSource(ss.mkdel(this, this.$populateGameSource));
		pageHandler.clientDebugManager.requestGameSource({ gameName: 'Sevens' });
	};
	$Client_UIWindow_CodeEditorUI.prototype = {
		get_shuffUIManager: function() {
			return this.$1$ShuffUIManagerField;
		},
		set_shuffUIManager: function(value) {
			this.$1$ShuffUIManagerField = value;
		},
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$populateGameSource: function(user, gameSource) {
			var endTime = new Date();
			var timeTracker = this.get_pageHandler().timeTracker;
			var time = endTime - timeTracker.startTime;
			timeTracker.numOfTimes++;
			timeTracker.timeValue += time;
			//  PageHandler.DebugUI.lblHowFast.Text = ( "Time Taken: " + ( timeTracker.TimeValue / timeTracker.NumOfTimes ) );
			this.get_pageHandler().codeEditorUI.codeEditor.information.editor.setValue(gameSource.content);
			//
			//                                                 buildSite.CodeEditorUI.codeEditor.Information.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
			this.get_pageHandler().codeEditorUI.codeEditor.information.editor.refresh();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.CreateRoomUI
	var $Client_UIWindow_CreateRoomUI = function(shuffUIManager, pageHandler, gameType) {
		this.uiWindow = null;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Create Room';
		$t1.set_x(ss.Int32.div($('body').innerWidth(), 2) - 140);
		$t1.set_y(ss.Int32.div($('body').innerHeight(), 2) - 62);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(280));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(125));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.swingAway(6, true);
		this.uiWindow.swingBack();
		var roomName = null;
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(115, 40, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Room Name', null);
		$t2.set_onEnter(ss.mkdel(this, function() {
			this.$createRoom(pageHandler, gameType, roomName);
		}));
		$t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call($t3, roomName = $t2);
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(55, 100, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create'), ss.mkdel(this, function(e) {
			this.$createRoom(pageHandler, gameType, roomName);
		})));
		roomName.focus();
	};
	$Client_UIWindow_CreateRoomUI.prototype = {
		$createRoom: function(pageHandler, gameType, roomName) {
			pageHandler.clientSiteManager.createRoom({ gameType: gameType, roomName: roomName.get_text() });
			this.uiWindow.swingAway(2, false);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.DebugUI
	var $Client_UIWindow_DebugUI = function(shuffUIManager, pageHandler) {
		this.selectedGame = 'Sevens';
		this.uiWindow = null;
		this.txtNumOfPlayers = null;
		this.varText = null;
		this.lblAnother = null;
		this.lblHowFast = null;
		this.joined = 0;
		this.created = false;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Developer';
		$t1.set_x(500);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(420));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		var but = null;
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, but = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(280, 84, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel(this, function() {
			return 'Game: ' + this.selectedGame;
		})), ss.mkdel(this, function(e) {
			if (this.selectedGame === 'Sevens') {
				this.selectedGame = 'BlackJack';
			}
			else {
				this.selectedGame = 'Sevens';
			}
			pageHandler.clientDebugManager.requestGameSource({ gameName: this.selectedGame });
			var m = ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(but.text);
		})));
		this.lblHowFast = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(80, 80, 'Time Taken:'));
		this.lblAnother = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(80, 100, 'Another: '));
		// devArea.AddButton(new ShuffButton()
		// {
		// X = 280,
		// Y = 94,
		// Width = "150",
		// Height = "25",
		// Text = "Continue",
		// Click = (evt) =>
		// {
		// pageHandler.gateway.Emit("Area.Debug.Continue", new { }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		// }
		// });
		this.varText = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(150, 134, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(25), 'Var Lookup', null, null));
		//  devArea.AddButton(new ShuffButton()
		//  {
		//  X = 280,
		//  Y = 134,
		//  Width = "150",
		//  Height = "25",
		//  Text = "Lookup",
		//  Click = (evt) =>
		//  {
		//  pageHandler.gateway.Emit("Area.Debug.VariableLookup.Request", new { variableName = devArea.Data.varText.GetValue() }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//  }
		//  });
		//   devArea.AddButton(new ShuffButton()
		//   {
		//   X = 280,
		//   Y = 164,
		//   Width = "150",
		//   Height = "25",
		//   Text = "Push New Source",
		//   Click = (evt) =>
		//   {
		//   pageHandler.gateway.Emit("Area.Debug.PushNewSource", new { source = codeArea.Data.codeEditor.editor.GetValue(), breakPoints = codeArea.Data.breakPoints },
		//   devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//   }
		//   });
		this.txtNumOfPlayers = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(130, 43, CommonLibraries.Number.op_Implicit$2(130), CommonLibraries.Number.op_Implicit$2(20), '6', 'Number of players=', 'font-size:13px'));
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.HomeUI
	var $Client_UIWindow_HomeUI = function(shuffUIManager, pageHandler) {
		this.$myPageHandler = null;
		this.$myShuffUIManager = null;
		this.$lblHeader = null;
		this.$myCreateGameType = null;
		this.$myCreateRoom = null;
		this.$myGameTypeList = null;
		this.$myJoinRoom = null;
		this.$myLoadedRooms = null;
		this.$myRefreshRoom = null;
		this.$myRoomGameType = null;
		this.$myRoomName = null;
		this.$myRoomPlayers = null;
		this.$myRoomsList = null;
		this.$mySpectateRoom = null;
		this.uiWindow = null;
		this.$myShuffUIManager = shuffUIManager;
		this.$myPageHandler = pageHandler;
		pageHandler.clientSiteManager.add_onGetGameTypesReceived(ss.mkdel(this, this.$populateGames));
		pageHandler.clientSiteManager.add_onGetRoomsReceived(ss.mkdel(this, this.$populateRooms));
		pageHandler.clientSiteManager.add_onRoomJoined(ss.mkdel(this, this.$roomJoined));
		pageHandler.clientSiteManager.add_onGetRoomInfoReceived(ss.mkdel(this, this.$getRoomInfo));
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'CardGame';
		$t1.set_x(400);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(600));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.$lblHeader = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(40, 44, 'Please Login!'));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(30, 80, 'Game Types'));
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(25, 100, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(300), null);
		$t2.onClick = ss.mkdel(this, function(item) {
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: item.value });
		});
		this.$myGameTypeList = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t3, $t2);
		this.$myCreateGameType = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(45, 410, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(40), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create New Game!'), function(c) {
			var ui = new $Client_UIWindow_CodeEditorUI(shuffUIManager, pageHandler);
		}));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(210, 80, 'Rooms'));
		this.$myCreateRoom = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(260, 70, CommonLibraries.Number.op_Implicit$2(70), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Refresh!'), ss.mkdel(this, function(c1) {
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: this.$myGameTypeList.selectedItem.value });
		})));
		var $t5 = this.uiWindow;
		var $t4 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(200, 100, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(300), null);
		$t4.onClick = ss.mkdel(this, function(item1) {
			var room = Enumerable.from(this.$myLoadedRooms).first(function(a) {
				return ss.referenceEquals(a.roomName, item1.value);
			});
			this.$populateRoom(room);
		});
		this.$myRoomsList = $t5.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t5, $t4);
		this.$myCreateRoom = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(225, 410, CommonLibraries.Number.op_Implicit$2(100), CommonLibraries.Number.op_Implicit$2(40), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create New Room!'), ss.mkdel(this, function(c2) {
			var create = new $Client_UIWindow_CreateRoomUI(shuffUIManager, pageHandler, this.$myGameTypeList.selectedItem.value);
			shuffUIManager.focus(create.uiWindow);
		})));
		var $t7 = this.uiWindow;
		var $t6 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(400, 200, CommonLibraries.Number.op_Implicit$2(175), CommonLibraries.Number.op_Implicit$2(200), null);
		$t6.set_visible(false);
		this.$myRoomPlayers = $t7.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t7, $t6);
		var $t9 = this.uiWindow;
		var $t8 = new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(400, 100, '');
		$t8.set_visible(false);
		this.$myRoomGameType = $t9.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call($t9, $t8);
		var $t11 = this.uiWindow;
		var $t10 = new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(400, 130, '');
		$t10.set_visible(false);
		this.$myRoomName = $t11.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call($t11, $t10);
		var $t13 = this.uiWindow;
		var $t12 = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(410, 160, CommonLibraries.Number.op_Implicit$2(75), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Join!'), ss.mkdel(this, function(c3) {
			pageHandler.clientSiteManager.joinRoom({ gameType: this.$myGameTypeList.selectedItem.value, roomName: this.$myRoomsList.selectedItem.value });
		}));
		$t12.set_visible(false);
		this.$myJoinRoom = $t13.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call($t13, $t12);
		var $t15 = this.uiWindow;
		var $t14 = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(490, 160, CommonLibraries.Number.op_Implicit$2(75), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Spectate!'), function(c4) {
		});
		$t14.set_visible(false);
		this.$mySpectateRoom = $t15.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call($t15, $t14);
		var $t17 = this.uiWindow;
		var $t16 = new WebLibraries.ShuffUI.ShuffUI.ShuffButton(420, 410, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(25), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Refresh!'), ss.mkdel(this, function(c5) {
			pageHandler.clientSiteManager.getRoomInfo({ gameType: this.$myGameTypeList.selectedItem.value, roomName: this.$myRoomsList.selectedItem.value });
		}));
		$t16.set_visible(false);
		this.$myRefreshRoom = $t17.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call($t17, $t16);
		//UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.ClientSiteManager.GetGameList(); }));
	};
	$Client_UIWindow_HomeUI.prototype = {
		$getRoomInfo: function(user, o) {
			for (var i = 0; i < this.$myLoadedRooms.length; i++) {
				if (ss.referenceEquals(this.$myLoadedRooms[i]._id, o.room._id)) {
					ss.removeAt(this.$myLoadedRooms, i);
					ss.insert(this.$myLoadedRooms, i, o.room);
					break;
				}
			}
			this.$populateRoom(o.room);
		},
		$roomJoined: function(user, o) {
			this.$populateRoom(o.room);
			this.uiWindow.swingAway(0, false);
			new $Client_UIWindow_ActiveLobbyUI(this.$myShuffUIManager, this.$myPageHandler, o.room);
		},
		userLoggedIn: function() {
			this.$lblHeader.set_text(ss.formatString('Welcome: {0}!', this.$myPageHandler.clientInfo.loggedInUser.userName));
			this.$myPageHandler.clientSiteManager.getGameTypes();
			this.uiWindow.set_visible(true);
			this.uiWindow.swingAway(6, true);
			this.uiWindow.swingBack();
		},
		$populateGames: function(user, o) {
			this.$myGameTypeList.clearItems();
			for (var $t1 = 0; $t1 < o.gameTypes.length; $t1++) {
				var gameType = o.gameTypes[$t1];
				this.$myGameTypeList.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(gameType.name, gameType.name));
			}
			this.$myPageHandler.clientSiteManager.getRooms({ gameType: o.gameTypes[0].name });
		},
		$populateRooms: function(user, o) {
			this.$myRoomsList.clearItems();
			this.$myLoadedRooms = o.rooms;
			if (o.rooms.length === 0) {
				return;
			}
			for (var $t1 = 0; $t1 < o.rooms.length; $t1++) {
				var room = o.rooms[$t1];
				this.$myRoomsList.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(room.roomName, room.roomName));
			}
			this.$populateRoom(o.rooms[0]);
		},
		$populateRoom: function(roomData) {
			this.$myRoomPlayers.set_visible(true);
			this.$myRoomName.set_visible(true);
			this.$myRoomGameType.set_visible(true);
			this.$myJoinRoom.set_visible(true);
			this.$mySpectateRoom.set_visible(true);
			this.$myRefreshRoom.set_visible(true);
			this.$myRoomPlayers.clearItems();
			for (var $t1 = 0; $t1 < roomData.players.length; $t1++) {
				var userModel = roomData.players[$t1];
				this.$myRoomPlayers.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(userModel.userName, userModel.userName));
			}
			this.$myRoomName.set_text(ss.formatString('Room: {0}', roomData.roomName));
			this.$myRoomGameType.set_text(ss.formatString('Game Type: {0}', roomData.gameType));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.LoginUI
	var $Client_UIWindow_LoginUI = function(shuffUIManager, pageHandler) {
		this.uiWindow = null;
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Login';
		$t1.set_x($('body').innerWidth() - 500);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(280));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(165));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		var loginName;
		var password;
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, loginName = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(115, 40, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Username', null));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffTextbox).call(this.uiWindow, password = new WebLibraries.ShuffUI.ShuffUI.ShuffTextbox(115, 75, CommonLibraries.Number.op_Implicit$2(150), CommonLibraries.Number.op_Implicit$2(30), '', 'Password', null));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(55, 150, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Create'), function(e) {
			pageHandler.clientSiteManager.login(loginName.get_text(), password.get_text());
		}));
		this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffButton).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffButton(155, 150, CommonLibraries.Number.op_Implicit$2(90), CommonLibraries.Number.op_Implicit$2(30), ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Login'), function(e1) {
			pageHandler.clientSiteManager.login(loginName.get_text(), password.get_text());
		}));
		pageHandler.clientSiteManager.add_onLogin(ss.mkdel(this, function(user, data) {
			pageHandler.clientInfo.loggedInUser = user;
			pageHandler.homeUI.userLoggedIn();
			this.uiWindow.swingAway(7, false);
		}));
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.QuestionUI
	var $Client_UIWindow_QuestionUI = function(shuffUIManager, pageHandler) {
		this.$1$PageHandlerField = null;
		this.question = null;
		this.answerBox = null;
		this.load = null;
		this.uiWindow = null;
		this.set_pageHandler(pageHandler);
		var $t1 = new WebLibraries.ShuffUI.ShuffUI.ShuffWindow();
		$t1.title = 'Question';
		$t1.set_x(600);
		$t1.set_y(100);
		$t1.set_width(CommonLibraries.Number.op_Implicit$2(300));
		$t1.set_height(CommonLibraries.Number.op_Implicit$2(275));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(true);
		this.uiWindow = shuffUIManager.createWindow($t1);
		this.uiWindow.swingAway(0, true);
		this.question = this.uiWindow.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffLabel).call(this.uiWindow, new WebLibraries.ShuffUI.ShuffUI.ShuffLabel(20, 40, ''));
		this.load = ss.mkdel(this, function(question) {
			this.uiWindow.swingBack();
			this.question.set_text(question.question);
			this.answerBox.clearItems();
			for (var i = 0; i < question.answers.length; i++) {
				this.answerBox.addItem(new WebLibraries.ShuffUI.ShuffUI.ShuffListItem(question.answers[i], i));
			}
		});
		debugger;
		var $t3 = this.uiWindow;
		var $t2 = new WebLibraries.ShuffUI.ShuffUI.ShuffListBox(30, 65, CommonLibraries.Number.op_Implicit$2(215), CommonLibraries.Number.op_Implicit$2(125), null);
		$t2.onClick = ss.mkdel(this, function(e) {
			this.$selectAnswer(e);
		});
		this.answerBox = $t3.addElement(WebLibraries.ShuffUI.ShuffUI.ShuffListBox).call($t3, $t2);
	};
	$Client_UIWindow_QuestionUI.prototype = {
		get_pageHandler: function() {
			return this.$1$PageHandlerField;
		},
		set_pageHandler: function(value) {
			this.$1$PageHandlerField = value;
		},
		$selectAnswer: function(e) {
			this.get_pageHandler().clientGameManager.answerQuestion({ answer: e.value });
			this.uiWindow.swingAway(0, false);
			this.get_pageHandler().timeTracker.startTime = new Date();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.UIWindow.Controls.ChatBox
	var $Client_UIWindow_Controls_ChatBox = function(x, y, width, height) {
		WebLibraries.ShuffUI.ShuffUI.ShuffElement.call(this);
		this.element = $('<div></div>');
		this.element.css('position', 'absolute');
		this.element.css('background-color', 'grey');
		this.element.css('overflow-y', 'scroll');
		this.set_x(x);
		this.set_y(y);
		this.set_width(CommonLibraries.Number.op_Implicit$2(width));
		this.set_height(CommonLibraries.Number.op_Implicit$2(height));
		this.set_visible(true);
	};
	$Client_UIWindow_Controls_ChatBox.prototype = {
		addChatMessage: function(message) {
			var msgElement = $('<div></div>');
			msgElement.css('background-color', '#DDDDDD');
			msgElement.append($('<span>' + message.user.userName + '</span>'));
			msgElement.append($('<span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>'));
			msgElement.append($('<span>' + message.content + '</span>'));
			this.element.append(msgElement);
			this.element.scrollTop(this.element.height());
		},
		addChatMessages: function(messages) {
			for (var $t1 = 0; $t1 < messages.length; $t1++) {
				var chatMessageRoomModel = messages[$t1];
				this.addChatMessage(chatMessageRoomModel);
			}
		}
	};
	ss.registerClass(null, 'CardGameUI.Controllers.$EffectEditorController', $CardGameUI_Controllers_$EffectEditorController);
	ss.registerClass(null, 'CardGameUI.Controllers.$ListEffectsController', $CardGameUI_Controllers_$ListEffectsController);
	ss.registerClass(global, 'CardGameUI.Controllers.GameCtrl', $CardGameUI_Controllers_GameCtrl);
	ss.registerClass(global, 'CardGameUI.Directives.AcgDrawCardDirective', $CardGameUI_Directives_AcgDrawCardDirective);
	ss.registerClass(global, 'CardGameUI.Directives.AcgDrawSpaceDirective', $CardGameUI_Directives_AcgDrawSpaceDirective);
	ss.registerClass(global, 'CardGameUI.Directives.DraggableDirective', $CardGameUI_Directives_DraggableDirective);
	ss.registerClass(global, 'CardGameUI.Directives.PropertyDirective', $CardGameUI_Directives_PropertyDirective);
	ss.registerClass(global, 'CardGameUI.Scope._KeepBaseScopeAlive', $CardGameUI_Scope__KeepBaseScopeAlive);
	ss.registerClass(global, 'CardGameUI.Scope.CardScope', $CardGameUI_Scope_CardScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.EffectEditorScope', $CardGameUI_Scope_EffectEditorScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.GameCtrlScope', $CardGameUI_Scope_GameCtrlScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.ListEffectsScope', $CardGameUI_Scope_ListEffectsScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(global, 'CardGameUI.Scope.SpaceScope', $CardGameUI_Scope_SpaceScope, CardGameUI.Scope.BaseScope);
	ss.registerClass(null, 'CardGameUI.Services.$EditEffectService', $CardGameUI_Services_$EditEffectService);
	ss.registerClass(global, 'CardGameUI.Services.EffectManagerService', $CardGameUI_Services_EffectManagerService);
	ss.registerClass(global, 'CardGameUI.Services.EffectWatcherService', $CardGameUI_Services_EffectWatcherService);
	ss.registerClass(global, 'CardGameUI.Util.Effect', $CardGameUI_Util_Effect);
	ss.registerClass(global, 'CardGameUI.Util.EffectProperty', $CardGameUI_Util_EffectProperty);
	ss.registerClass(global, 'CardGameUI.Util.Extensions', $CardGameUI_Util_Extensions);
	ss.registerClass(global, 'CardGameUI.Util.Point', $CardGameUI_Util_Point);
	ss.registerClass(global, 'Client.BuildSite', $Client_BuildSite);
	ss.registerClass(global, 'Client.ClientInformation', $Client_ClientInformation);
	ss.registerClass(global, 'Client.PageHandler', $Client_PageHandler);
	ss.registerClass(global, 'Client.Libs.ScriptLoader', $Client_Libs_ScriptLoader);
	ss.registerClass(global, 'Client.Libs.TimeTracker', $Client_Libs_TimeTracker);
	ss.registerClass(global, 'Client.ShufflyGame.GameDrawer', $Client_ShufflyGame_GameDrawer);
	ss.registerClass(global, 'Client.ShufflyGame.GameManager', $Client_ShufflyGame_GameManager);
	ss.registerClass(global, 'Client.UIWindow.ActiveLobbyUI', $Client_UIWindow_ActiveLobbyUI);
	ss.registerClass(global, 'Client.UIWindow.CodeEditorUI', $Client_UIWindow_CodeEditorUI);
	ss.registerClass(global, 'Client.UIWindow.CreateRoomUI', $Client_UIWindow_CreateRoomUI);
	ss.registerClass(global, 'Client.UIWindow.DebugUI', $Client_UIWindow_DebugUI);
	ss.registerClass(global, 'Client.UIWindow.HomeUI', $Client_UIWindow_HomeUI);
	ss.registerClass(global, 'Client.UIWindow.LoginUI', $Client_UIWindow_LoginUI);
	ss.registerClass(global, 'Client.UIWindow.QuestionUI', $Client_UIWindow_QuestionUI);
	ss.registerClass(global, 'Client.UIWindow.Controls.ChatBox', $Client_UIWindow_Controls_ChatBox, WebLibraries.ShuffUI.ShuffUI.ShuffElement);
	$Client_BuildSite.instance = null;
	angular.module('acg', []).config(['$routeProvider', function(provider) {
		provider.when('/gameUI', { controller: 'GameCtrl', templateUrl: 'http://198.211.107.101:8881/partials/gameUI.html' }).otherwise({ redirectTo: '/gameUI' });
	}]).config(['$httpProvider', function(httpProvider) {
		httpProvider.defaults.useXDomain = true;
		delete httpProvider.defaults.headers.common['X-Requested-With'];
	}]).controller('GameCtrl', ['$scope', 'effectWatcher', function(scope, effectWatcher) {
		return new $CardGameUI_Controllers_GameCtrl(scope, effectWatcher);
	}]).controller('ListEffectsController', ['$scope', 'editEffects', 'effectWatcher', 'effectManager', function(scope1, editEffects, effectWatcher1, effectmanager) {
		return new $CardGameUI_Controllers_$ListEffectsController(scope1, editEffects, effectWatcher1, effectmanager);
	}]).controller('EffectEditorController', ['$scope', 'editEffects', function(scope2, editEffects1) {
		return new $CardGameUI_Controllers_$EffectEditorController(scope2, editEffects1);
	}]).service('editEffects', [function() {
		return new $CardGameUI_Services_$EditEffectService();
	}]).service('effectWatcher', [function() {
		return new $CardGameUI_Services_EffectWatcherService();
	}]).service('effectManager', [function() {
		return new $CardGameUI_Services_EffectManagerService();
	}]).directive('draggable', [function() {
		return new $CardGameUI_Directives_DraggableDirective();
	}]).directive('property', [function() {
		return new $CardGameUI_Directives_PropertyDirective();
	}]).directive('acgDrawCard', ['effectManager', function(effectManager) {
		return new $CardGameUI_Directives_AcgDrawCardDirective(effectManager);
	}]).directive('acgDrawSpace', [function() {
		return new $CardGameUI_Directives_AcgDrawSpaceDirective();
	}]);
})();

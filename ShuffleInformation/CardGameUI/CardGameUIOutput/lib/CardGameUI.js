(function() {
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Program
	var $CardGameUI_$Program = function() {
	};
	$CardGameUI_$Program.$main = function() {
		angular.module('acg', []).config(['$routeProvider', function(provider) {
			provider.when('/gameUI', { controller: 'GameCtrl', templateUrl: 'partials/gameUI.html' }).otherwise({ redirectTo: '/gameUI' });
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
	};
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
						clone.$.animate(ops, 6000, 'easeInOutQuart', ss.mkdel({ card2: card2, _pile1: _pile1, clone: clone }, function() {
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
							element.rotate(-bEffect.degrees / 2 + bEffect.degrees / (scope.$parent.space.pile.cards.length - 1) * cardIndex + $CardGameUI_Directives_AcgDrawCardDirective.noTransformRotate(element.rotate()) + 'deg');
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
			keys['content'] = 'url(\'assets/cards/' + (100 + (scope.card.value + 1) + scope.card.type * 13) + '.gif\')';
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
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Util.EffectType2
	var $CardGameUI_Util_EffectType2 = function() {
	};
	$CardGameUI_Util_EffectType2.prototype = { highlight: 'highlight', rotate: 'rotate', bend: 'bend', styleProperty: 'styleProperty', animated: 'animated' };
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
	ss.registerClass(null, 'CardGameUI.$Program', $CardGameUI_$Program);
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
	ss.registerEnum(global, 'CardGameUI.Util.EffectPropertyType', $CardGameUI_Util_EffectPropertyType);
	ss.registerEnum(global, 'CardGameUI.Util.EffectType2', $CardGameUI_Util_EffectType2);
	ss.registerClass(global, 'CardGameUI.Util.Extensions', $CardGameUI_Util_Extensions);
	ss.registerClass(global, 'CardGameUI.Util.Point', $CardGameUI_Util_Point);
	$CardGameUI_$Program.$main();
})();

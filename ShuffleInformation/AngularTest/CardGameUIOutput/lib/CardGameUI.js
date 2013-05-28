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
		}]).controller('ListEffectsController', ['$scope', 'editEffects', 'effectWatcher', function(scope1, editEffects, effectWatcher1) {
			return new $CardGameUI_Controllers_$ListEffectsController(scope1, editEffects, effectWatcher1);
		}]).controller('EffectEditorController', ['$scope', 'editEffects', function(scope2, editEffects1) {
			return new $CardGameUI_Controllers_$EffectEditorController(scope2, editEffects1);
		}]).service('editEffects', [function() {
			return new $CardGameUI_Services_$EditEffectService();
		}]).service('effectWatcher', [function() {
			return new $CardGameUI_Services_EffectWatcherService();
		}]).directive('draggable', [function() {
			return new $CardGameUI_Directives_DraggableDirective();
		}]).directive('property', [function() {
			return new $CardGameUI_Directives_PropertyDirective();
		}]).directive('acgDrawCard', [function() {
			return new $CardGameUI_Directives_AcgDrawCardDirective();
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
	var $CardGameUI_Controllers_$ListEffectsController = function(scope, editEffects, effectWatcher) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myEffectWatcher = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		this.$myEffectWatcher = effectWatcher;
		scope.effects = [];
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
	};
	$CardGameUI_Controllers_$ListEffectsController.prototype = {
		$enableEffectFn: function(effect) {
			this.$myEffectWatcher.applyEffect(effect);
		},
		$addEffectFn: function() {
			var $t1 = new $CardGameUI_Util_Effect();
			$t1.name = this.$myScope.newEffect;
			var effect = $t1;
			effect.type = this.$myScope.selectedEffectType;
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
					break;
				}
				case 'styleProperty': {
					var $t17 = effect.properties;
					var $t16 = $CardGameUI_Util_EffectProperty.$ctor();
					$t16.name = 'Property Name';
					$t16.value = 'background-color';
					$t16.type = 'text';
					ss.add($t17, $t16);
					var $t19 = effect.properties;
					var $t18 = $CardGameUI_Util_EffectProperty.$ctor();
					$t18.name = 'Property Value';
					$t18.value = 'red';
					$t18.type = 'text';
					ss.add($t19, $t18);
					break;
				}
				case 'animated': {
					var $t21 = effect.properties;
					var $t20 = $CardGameUI_Util_EffectProperty.$ctor();
					$t20.name = 'idk';
					$t20.value = 'rite?';
					$t20.type = 'text';
					ss.add($t21, $t20);
					break;
				}
			}
			ss.add(this.$myScope.effects, effect);
			this.$myScope.selectedEffectType = 'bend';
			this.$myScope.newEffect = '';
		},
		$effectClickFn: function(effect) {
			this.$myEditEffects.popOpenEffect(effect);
		}
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
						ss.remove(pile.cards, card1);
						ss.add(_pile.pile.cards, card1);
					}
				}
			}
		};
		effectWatcher.applyEffect = ss.delegateCombine(effectWatcher.applyEffect, function(effect) {
			if (ss.isNullOrUndefined(scope.selectedCard)) {
				return;
			}
			var _effect;
			switch (effect.type) {
				case 'highlight': {
					var $t4 = global.CardGameEffectHighlightOptions.$ctor();
					$t4.color = effect.getPropertyByName(String).call(effect, 'color');
					$t4.radius = effect.getPropertyByName(Number).call(effect, 'radius');
					$t4.rotate = effect.getPropertyByName(Number).call(effect, 'rotate');
					$t4.offsetX = effect.getPropertyByName(Number).call(effect, 'offsetx');
					$t4.offsetY = effect.getPropertyByName(Number).call(effect, 'offsety');
					$t4.opacity = effect.getPropertyByName(Number).call(effect, 'opacity');
					_effect = new global.Effect$Highlight($t4);
					break;
				}
				case 'rotate':
				case 'bend':
				case 'styleProperty':
				case 'animated':
				default: {
					return;
					break;
				}
			}
			ss.add(scope.selectedCard.appearance.effects, _effect);
		});
	};
	////////////////////////////////////////////////////////////////////////////////
	// CardGameUI.Directives.AcgDrawCardDirective
	var $CardGameUI_Directives_AcgDrawCardDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$CardGameUI_Directives_AcgDrawCardDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.attr('style', 'width:71px; height:96px;');
			element.attr('class', 'card card' + scope.card.type + '-' + scope.card.value + '');
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
			var redrawCard = function() {
				var spaceScale = { width: scope.$parent.space.width / scope.$parent.space.pile.cards.length, height: scope.$parent.space.height / scope.$parent.space.pile.cards.length };
				var vertical = scope.$parent.space.vertical;
				var cardIndex = ss.indexOf(scope.$parent.space.pile.cards, scope.card);
				scope.cardStyle = {};
				var xx = 0;
				var yy = 0;
				switch (scope.$parent.space.resizeType) {
					case 1: {
						if (vertical) {
							yy = scope.card.value * scope.$parent.$parent.scale.y / 2;
						}
						else {
							xx = scope.card.value * scope.$parent.$parent.scale.x / 2;
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
				scope.cardStyle['-webkit-transform'] = 'rotate(' + scope.$parent.space.appearance.innerStyle.rotate + 'deg)';
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
				for (var $t3 = 0; $t3 < scope.card.appearance.effects.length; $t3++) {
					var effect = scope.card.appearance.effects[$t3];
					switch (effect.type) {
						case 0: {
							var hEffect = effect;
							var beforeStyle = {};
							beforeStyle['display'] = 'block';
							beforeStyle['position'] = 'relative';
							beforeStyle['z-index'] = '-1';
							beforeStyle['width'] = '100%';
							beforeStyle['height'] = '100%';
							beforeStyle['left'] = -hEffect.radius + hEffect.offsetX + 'px';
							beforeStyle['top'] = -hEffect.radius + hEffect.offsetY + 'px';
							beforeStyle['padding'] = hEffect.radius + 'px';
							beforeStyle['border-radius'] = '5px';
							beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
							var color = $CardGameUI_Directives_AcgDrawCardDirective.hextorgb(hEffect.color);
							beforeStyle['background-color'] = ss.formatString('rgba({0}, {1}, {2}, {3})', color.R, color.G, color.B, hEffect.opacity);
							beforeStyle['border'] = '2px solid black';
							$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', beforeStyle);
							break;
						}
						case 1: {
							window.alert('type ' + effect.type.toString());
							break;
						}
						case 2: {
							var bEffect = effect;
							var trans = scope.cardStyle['-webkit-transform'];
							if (ss.startsWithString(ss.coalesce(trans, ''), 'rotate(')) {
								scope.cardStyle['-webkit-transform'] = $CardGameUI_Directives_AcgDrawCardDirective.transformRotate(-bEffect.degrees / 2 + bEffect.degrees / (scope.$parent.space.pile.cards.length - 1) * cardIndex + $CardGameUI_Directives_AcgDrawCardDirective.noTransformRotate(trans));
							}
							else {
								scope.cardStyle['-webkit-transform'] = $CardGameUI_Directives_AcgDrawCardDirective.transformRotate(scope.$parent.space.appearance.innerStyle.rotate);
							}
							console.log('bending ' + scope.$parent.space.name + ' ' + scope.cardStyle['-webkit-transform']);
							break;
						}
						case 3: {
							window.alert('type ' + effect.type.toString());
							break;
						}
						case 4: {
							window.alert('type ' + effect.type.toString());
							break;
						}
						default: {
							window.alert('type ' + effect.type.toString());
							break;
						}
					}
				}
				var keys = {};
				keys['content'] = 'url(\'assets/cards/' + (100 + (scope.card.value + 1) + scope.card.type * 13) + '.gif\')';
				$CardGameUI_Directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
			};
			scope.$watch('$parent.space.pile.cards', redrawCard, true);
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
			element.attr('class', 'space space' + scope.space.name);
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
	ss.registerClass(global, 'CardGameUI.Services.EffectWatcherService', $CardGameUI_Services_EffectWatcherService);
	ss.registerClass(global, 'CardGameUI.Util.Effect', $CardGameUI_Util_Effect);
	ss.registerClass(global, 'CardGameUI.Util.EffectProperty', $CardGameUI_Util_EffectProperty);
	ss.registerEnum(global, 'CardGameUI.Util.EffectPropertyType', $CardGameUI_Util_EffectPropertyType);
	ss.registerEnum(global, 'CardGameUI.Util.EffectType2', $CardGameUI_Util_EffectType2);
	ss.registerClass(global, 'CardGameUI.Util.Extensions', $CardGameUI_Util_Extensions);
	ss.registerClass(global, 'CardGameUI.Util.Point', $CardGameUI_Util_Point);
	$CardGameUI_$Program.$main();
})();

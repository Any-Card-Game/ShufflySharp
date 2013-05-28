(function() {
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.EditEffectService
	var $AngularTest_$EditEffectService = function() {
		this.popOpenEffect = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.Program
	var $AngularTest_$Program = function() {
	};
	$AngularTest_$Program.$main = function() {
		angular.module('acg', []).config(['$routeProvider', function(provider) {
			provider.when('/gameUI', { controller: 'GameCtrl', templateUrl: 'partials/gameUI.html' }).otherwise({ redirectTo: '/gameUI' });
		}]).controller('GameCtrl', ['$scope', function(scope) {
			return new $Client_Angular_controllers_GameCtrl(scope);
		}]).controller('ListEffectsController', ['$scope', 'editEffects', function(scope1, editEffects) {
			return new $Client_Angular_controllers_$ListEffectsController(scope1, editEffects);
		}]).controller('EffectEditorController', ['$scope', 'editEffects', function(scope2, editEffects1) {
			return new $Client_Angular_controllers_$EffectEditorController(scope2, editEffects1);
		}]).service('editEffects', [function() {
			return new $AngularTest_$EditEffectService();
		}]).directive('draggable', [function() {
			return new $Client_Angular_directives_DraggableDirective();
		}]).directive('acgDrawCard', [function() {
			return new $Client_Angular_directives_AcgDrawCardDirective();
		}]).directive('acgDrawSpace', [function() {
			return new $Client_Angular_directives_AcgDrawSpaceDirective();
		}]);
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.CardScope
	var $AngularTest_scope_CardScope = function() {
		this.card = null;
		this.cardStyle = null;
		this.cardClick = null;
		this.$parent = null;
		Client.Angular.interfaces.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.Effect
	var $AngularTest_scope_Effect = function() {
	};
	$AngularTest_scope_Effect.createInstance = function() {
		return $AngularTest_scope_Effect.$ctor();
	};
	$AngularTest_scope_Effect.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.type = 0;
		$this.properties = null;
		$this.properties = {};
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.EffectEditorScope
	var $AngularTest_scope_EffectEditorScope = function() {
		this.effect = null;
		Client.Angular.interfaces.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.GameCtrlScope
	var $AngularTest_scope_GameCtrlScope = function() {
		this.mainArea = null;
		this.scale = null;
		this.moveCard = null;
		this.selectedCard = null;
		Client.Angular.interfaces.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.ListEffectsScope
	var $AngularTest_scope_ListEffectsScope = function() {
		this.newEffect = null;
		this.addEffect = null;
		this.effects = null;
		this.effectTypes = null;
		this.effectTypesNames = null;
		this.effectClick = null;
		Client.Angular.interfaces.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.Point
	var $AngularTest_scope_Point = function() {
	};
	$AngularTest_scope_Point.createInstance = function() {
		return $AngularTest_scope_Point.$ctor();
	};
	$AngularTest_scope_Point.$ctor = function() {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// AngularTest.scope.SpaceScope
	var $AngularTest_scope_SpaceScope = function() {
		this.space = null;
		this.$parent = null;
		this.spaceStyle = null;
		Client.Angular.interfaces.BaseScope.call(this);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.controllers.EffectEditorController
	var $Client_Angular_controllers_$EffectEditorController = function(scope, editEffects) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		editEffects.popOpenEffect = ss.delegateCombine(editEffects.popOpenEffect, ss.mkdel(this, this.$popOpenEffectFn));
	};
	$Client_Angular_controllers_$EffectEditorController.prototype = {
		$popOpenEffectFn: function(effect) {
			this.$myScope.effect = effect;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.controllers.ListEffectsController
	var $Client_Angular_controllers_$ListEffectsController = function(scope, editEffects) {
		this.$myScope = null;
		this.$myEditEffects = null;
		this.$myScope = scope;
		this.$myEditEffects = editEffects;
		scope.effects = [];
		scope.effectTypes = [];
		ss.add(scope.effectTypes, 'bend');
		ss.add(scope.effectTypes, 'highlight');
		ss.add(scope.effectTypes, 'rotate');
		ss.add(scope.effectTypes, 'styleProperty');
		scope.effectTypesNames = scope.effectTypes.map(function(a) {
			var $t1 = $Client_Angular_controllers_CheckboxListItem.$ctor();
			$t1.name = a.toString();
			$t1.checked = false;
			return $t1;
		});
		var $t3 = scope.effects;
		var $t2 = $AngularTest_scope_Effect.$ctor();
		$t2.name = 'Some Highlighter';
		$t2.type = 'highlight';
		ss.add($t3, $t2);
		scope.newEffect = 'hi';
		scope.addEffect = ss.mkdel(this, this.$addEffectFn);
		scope.effectClick = ss.mkdel(this, this.$effectClickFn);
	};
	$Client_Angular_controllers_$ListEffectsController.prototype = {
		$addEffectFn: function() {
			var $t1 = $AngularTest_scope_Effect.$ctor();
			$t1.name = this.$myScope.newEffect;
			var effect = $t1;
			for (var $t2 = 0; $t2 < this.$myScope.effectTypesNames.length; $t2++) {
				var checkboxListItem = this.$myScope.effectTypesNames[$t2];
				if (checkboxListItem.checked) {
					effect.type = ss.Enum.parse($Client_Angular_controllers_EffectType2, checkboxListItem.name);
				}
				checkboxListItem.checked = false;
			}
			ss.add(this.$myScope.effects, effect);
			this.$myScope.newEffect = 'Hi!';
		},
		$effectClickFn: function(effect) {
			this.$myEditEffects.popOpenEffect(effect);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.controllers.CheckboxListItem
	var $Client_Angular_controllers_CheckboxListItem = function() {
	};
	$Client_Angular_controllers_CheckboxListItem.createInstance = function() {
		return $Client_Angular_controllers_CheckboxListItem.$ctor();
	};
	$Client_Angular_controllers_CheckboxListItem.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.checked = false;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.controllers.EffectType2
	var $Client_Angular_controllers_EffectType2 = function() {
	};
	$Client_Angular_controllers_EffectType2.prototype = { highlight: 'highlight', rotate: 'rotate', bend: 'bend', styleProperty: 'styleProperty', animated: 'animated' };
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.controllers.Extensions
	var $Client_Angular_controllers_Extensions = function() {
	};
	$Client_Angular_controllers_Extensions.randomElement = function(T) {
		return function(arr) {
			return arr[ss.Int32.trunc(Math.floor(Math.random() * arr.length))];
		};
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.controllers.GameCtrl
	var $Client_Angular_controllers_GameCtrl = function(scope) {
		this.$scope = null;
		this.$scope = scope;
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
		var $t3 = $AngularTest_scope_Point.$ctor();
		$t3.x = ss.Int32.div($(window).width(), scope.mainArea.size.width) * 0.9;
		$t3.y = ss.Int32.div($(window).height() - 250, scope.mainArea.size.height) * 0.9;
		scope.scale = $t3;
		scope.moveCard = function() {
			for (var i = 0; i < 1; i++) {
				var card1 = null;
				while (ss.isNullOrUndefined(card1)) {
					var pile = $Client_Angular_controllers_Extensions.randomElement(global.TableSpace).call(null, scope.mainArea.spaces).pile;
					card1 = $Client_Angular_controllers_Extensions.randomElement(global.Card).call(null, pile.cards);
					var _pile = $Client_Angular_controllers_Extensions.randomElement(global.TableSpace).call(null, scope.mainArea.spaces);
					if (ss.isValue(card1) && ss.isValue(_pile)) {
						ss.remove(pile.cards, card1);
						ss.add(_pile.pile.cards, card1);
					}
				}
			}
		};
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.directives.AcgDrawCardDirective
	var $Client_Angular_directives_AcgDrawCardDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Angular_directives_AcgDrawCardDirective.prototype = {
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
			}, true);
			scope.cardClick = function() {
				debugger;
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
							window.alert('type ' + effect.type.toString());
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
								scope.cardStyle['-webkit-transform'] = $Client_Angular_directives_AcgDrawCardDirective.transformRotate(-bEffect.degrees / 2 + bEffect.degrees / (scope.$parent.space.pile.cards.length - 1) * cardIndex + $Client_Angular_directives_AcgDrawCardDirective.noTransformRotate(trans));
							}
							else {
								scope.cardStyle['-webkit-transform'] = $Client_Angular_directives_AcgDrawCardDirective.transformRotate(scope.$parent.space.appearance.innerStyle.rotate);
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
				var beforeStyle = {};
				if (Math.random() * 200 < 50) {
					beforeStyle['display'] = 'block';
					beforeStyle['position'] = 'relative';
					beforeStyle['z-index'] = '-1';
					beforeStyle['width'] = '100%';
					beforeStyle['height'] = '100%';
					beforeStyle['left'] = '-5px';
					beforeStyle['top'] = '-5px';
					beforeStyle['padding'] = '5px';
					beforeStyle['border-radius'] = '5px';
					beforeStyle['box-shadow'] = 'rgb(44, 44, 44) 3px 3px 2px';
					beforeStyle['background'] = 'rgba(0, 12, 58, 0.231373)';
					beforeStyle['border'] = '2px solid black';
					$Client_Angular_directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', beforeStyle);
				}
				var keys = {};
				keys['content'] = 'url(\'assets/cards/' + (100 + (scope.card.value + 1) + scope.card.type * 13) + '.gif\')';
				$Client_Angular_directives_AcgDrawCardDirective.$changeCSS('card' + scope.card.type + '-' + scope.card.value + '::before', keys);
			};
			scope.$watch('$parent.space.pile.cards', redrawCard, true);
			redrawCard();
		}
	};
	$Client_Angular_directives_AcgDrawCardDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Angular_directives_AcgDrawCardDirective.noTransformRotate = function(ar) {
		return parseFloat(ss.replaceAllString(ss.replaceAllString(ar, 'rotate(', ''), 'deg)', ''));
		//todo regex??
	};
	$Client_Angular_directives_AcgDrawCardDirective.$changeCSS = function(myClass, values) {
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
	// Client.Angular.directives.AcgDrawSpaceDirective
	var $Client_Angular_directives_AcgDrawSpaceDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Angular_directives_AcgDrawSpaceDirective.prototype = {
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
			$Client_Angular_directives_AcgDrawSpaceDirective.$changeCSS('space' + scope.space.name + '::before', beforeStyle);
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
	$Client_Angular_directives_AcgDrawSpaceDirective.transformRotate = function(ar) {
		return ss.formatString('rotate({0}deg)', ar);
	};
	$Client_Angular_directives_AcgDrawSpaceDirective.$changeCSS = function(myClass, values) {
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
	// Client.Angular.directives.DraggableDirective
	var $Client_Angular_directives_DraggableDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$Client_Angular_directives_DraggableDirective.prototype = {
		$linkFn: function(scope, element, attrs) {
			element.draggable();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Client.Angular.interfaces._Foo
	var $Client_Angular_interfaces__Foo = function() {
	};
	ss.registerClass(null, 'AngularTest.$EditEffectService', $AngularTest_$EditEffectService);
	ss.registerClass(null, 'AngularTest.$Program', $AngularTest_$Program);
	ss.registerClass(global, 'AngularTest.scope.CardScope', $AngularTest_scope_CardScope, Client.Angular.interfaces.BaseScope);
	ss.registerClass(global, 'AngularTest.scope.Effect', $AngularTest_scope_Effect);
	ss.registerClass(global, 'AngularTest.scope.EffectEditorScope', $AngularTest_scope_EffectEditorScope, Client.Angular.interfaces.BaseScope);
	ss.registerClass(global, 'AngularTest.scope.GameCtrlScope', $AngularTest_scope_GameCtrlScope, Client.Angular.interfaces.BaseScope);
	ss.registerClass(global, 'AngularTest.scope.ListEffectsScope', $AngularTest_scope_ListEffectsScope, Client.Angular.interfaces.BaseScope);
	ss.registerClass(global, 'AngularTest.scope.Point', $AngularTest_scope_Point);
	ss.registerClass(global, 'AngularTest.scope.SpaceScope', $AngularTest_scope_SpaceScope, Client.Angular.interfaces.BaseScope);
	ss.registerClass(null, 'Client.Angular.controllers.$EffectEditorController', $Client_Angular_controllers_$EffectEditorController);
	ss.registerClass(null, 'Client.Angular.controllers.$ListEffectsController', $Client_Angular_controllers_$ListEffectsController);
	ss.registerClass(global, 'Client.Angular.controllers.CheckboxListItem', $Client_Angular_controllers_CheckboxListItem);
	ss.registerEnum(global, 'Client.Angular.controllers.EffectType2', $Client_Angular_controllers_EffectType2);
	ss.registerClass(global, 'Client.Angular.controllers.Extensions', $Client_Angular_controllers_Extensions);
	ss.registerClass(global, 'Client.Angular.controllers.GameCtrl', $Client_Angular_controllers_GameCtrl);
	ss.registerClass(global, 'Client.Angular.directives.AcgDrawCardDirective', $Client_Angular_directives_AcgDrawCardDirective);
	ss.registerClass(global, 'Client.Angular.directives.AcgDrawSpaceDirective', $Client_Angular_directives_AcgDrawSpaceDirective);
	ss.registerClass(global, 'Client.Angular.directives.DraggableDirective', $Client_Angular_directives_DraggableDirective);
	ss.registerClass(global, 'Client.Angular.interfaces._Foo', $Client_Angular_interfaces__Foo);
	$AngularTest_$Program.$main();
})();

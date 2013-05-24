'use strict';

/* Controllers */

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
window.AddRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = Object.keys(css).map(function (p) {
            return p + ":" + css[p]
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    }
})(document.createElement("style"));

window.ChangeCSS = function (myClass, values) {
    myClass = '.' + myClass;
    var CSSRules;
    if (document.all)
        CSSRules = 'rules';
    else if (document.getElementById)
        CSSRules = 'cssRules';
    for (var a = 0; a < document.styleSheets.length; a++) {
        for (var i = 0; i < document.styleSheets[a][CSSRules].length; i++) {
            if (document.styleSheets[a][CSSRules][i].selectorText == myClass) {
                for (var m in values) {
                    document.styleSheets[a][CSSRules][i].style[m] = values[m];
                }
            }
        }
    }
};


function GameCtrl($scope) {
    $scope.MainArea = loadMainArea();
    var c=0;
    for (var i = 0; i < $scope.MainArea.spaces.length; i++) {
        var space = $scope.MainArea.spaces[i];
        space.class = {};
        space.class.main = 'space' + i;
        AddRule('.' + space.class.main, {});
        space.class.before = 'space' + i + '::before';
        AddRule('.' + space.class.before, {});
        space.class.after = 'space' + i + '::after';
        AddRule('.' + space.class.after, {});


        for (var a = 0; a < space.pile.cards.length; a++) {
            var card = space.pile.cards[a];
            card.class = {};
            card.class.main = 'card' + c;
            AddRule('.' + card.class.main, {});
            card.class.before = 'card' + c + '::before';
            AddRule('.' + card.class.before, {});
            card.class.after = 'card' + c + '::after';
            AddRule('.' + card.class.after, {});
            c++;
        }

    }

    $scope.scale = {x: $(window).width() / $scope.MainArea.size.width * .9, y: (($(window).height() - 250) / $scope.MainArea.size.height) * .9};

    $scope.moveCard = function () {

        for (var i = 0; i < 15; i++) {
            var card = null;
            while (!card) {
                var pile = $scope.MainArea.spaces.randomElement().pile;
                card = pile.cards.randomElement();
                var _pile = $scope.MainArea.spaces.randomElement();

                if (card && _pile) {
                    pile.cards.splice(pile.cards.indexOf(card), 1);
                    _pile.pile.cards.push(card);
                }
            }
        }
    };


}

var Area = {
    spaces: [
        {}
    ],
    textAreas: [],
    size: {width: 10, height: 9}
};

var Space = {
    vertical: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pile: {},
    appearance: 0,
    visible: 0,
    stackCards: 0,
    drawCardsBent: 0,
    name: 0,
    sortOrder: 0,
    numberOfCardsHorizontal: 0,
    numberOfCardsVertical: 0,
    resizeType: 0
};

var Pile = {
    name: 0,
    cards: [
        {}
    ]
};

var Card = {
    value: 0,
    type: 0,
    state: 0,
    appearance: 0
};



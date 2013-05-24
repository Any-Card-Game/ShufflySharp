'use strict';

/* Directives */


angular.module('acg')
    .directive('acgDrawCard',function () {

        return {
            link: function (scope, element, attrs, model) {

                element.attr('style', 'width:71px; height:96px;')
                element.attr('class', scope.card.class.main);

                scope.$watch('space.pile.cards', redrawCard, true);

                var beforeStyle;
                if (Math.random() * 200 < 50) {
                    beforeStyle = {
                        'display': 'block',
                        'position': 'relative',
                        'z-index': '-1',
                        'width': '100%',
                        'height': '100%',
                        'left': '-5px',
                        'top': '-5px',
                        'padding': '5px',
                        'border-radius': '5px',
                        'box-shadow': 'rgb(44, 44, 44) 3px 3px 2px',
                        'content': '""',
                        'background': 'rgba(0, 12, 58, 0.231373)'
                    };
                    window.ChangeCSS(scope.card.class.before, beforeStyle);
                }

                var afterStyle = {
                    'display': 'block',
                    'position': 'relative',
                    'width': '100%',
                    'height': '100%',
                    'content': 'url("assets/cards/' + ( 100 + ( scope.card.value + 1 ) + ( scope.card.type ) * 13 ) + '.gif")',
                };

                if (beforeStyle) {
                    afterStyle.border = '2px solid black';

                }
                window.ChangeCSS(scope.card.class.before, afterStyle);


                function redrawCard() {
                    var spaceScale = {width: scope.space.width / scope.space.pile.cards.length, height: scope.space.height / scope.space.pile.cards.length};

                    var vertical = scope.space.vertical;
                    var cardIndex = scope.space.pile.cards.indexOf(scope.card);
                    //console.log("watched", scope.space.name, cardIndex);

                    scope.cardStyle = {};

                    var xx = 0.0;
                    var yy = 0.0;

                    switch (scope.space.resizeType) {
                        case 1:
                            if (vertical)
                                yy = scope.card.value * scope.scale.y / 2;
                            else
                                xx = scope.card.value * scope.scale.x / 2;

                            break;

                        case 0:
                            xx = ( !vertical ? ( cardIndex * spaceScale.width * scope.scale.x ) : 0 );
                            yy = ( vertical ? ( cardIndex * spaceScale.height * scope.scale.y ) : 0 );
                            break;
                        default:
                            xx = ( !vertical ? ( cardIndex * spaceScale.width * scope.scale.x ) : 0 );
                            yy = ( vertical ? ( cardIndex * spaceScale.height * scope.scale.y ) : 0 );
                            break;

                    }

                    xx -= 71 / 2;
                    yy -= 96 / 2;

                    scope.cardStyle.position = "absolute";
                    scope.cardStyle.zIndex = cardIndex;
                    scope.cardStyle.borderRadius = "5px";
                    scope.cardStyle.left = ( xx + ( vertical ? scope.space.width * scope.scale.x / 2 : 0 ) );
                    scope.cardStyle.top = ( yy + ( !vertical ? scope.space.height * scope.scale.y / 2 : 0 ) );
                    scope.cardStyle.transform = "rotate(" + scope.space.appearance.innerStyle.rotate + "deg)";

                    scope.cardStyle.content = 'hi';


                    for (var i = 0; i < scope.card.appearance.effects.length; i++) {
                        var effect = scope.card.appearance.effects[i];
                        switch (effect.type) {
                            case 0:
                                break;

                            case 1:

                                break;

                            case 2:

                                break;
                            default:
                                alert(effect.type);
                                break;

                        }
                    }


                }

                redrawCard();


            }
        }
    }).directive('acgDrawSpace', function () {

        return {
            link: function (scope, element, attrs, model) {

                element.attr('class', scope.space.class.main);


                var beforeStyle = {
                    'display': 'block',
                    'position': 'relative',
                    'z-index': '-1',
                    'width': '100%',
                    'height': '100%',
                    'left': '-50px',
                    'top': '-50px',
                    'padding': '50px',
                    'border-radius': '15px',
                    'box-shadow': 'rgb(51, 51, 51) 4px 4px 2px',
                    'content': '""',
                    'background': 'rgba(112, 12, 58, 0.231373)'
                };
                window.ChangeCSS(scope.space.class.before, beforeStyle);


                scope.spaceStyle = {};

                scope.spaceStyle.position = 'absolute';
                scope.spaceStyle.left = scope.space.x * scope.scale.x;
                scope.spaceStyle.top = scope.space.y * scope.scale.y;

                scope.spaceStyle.width = scope.space.width * scope.scale.x;
                scope.spaceStyle.height = scope.space.height * scope.scale.y;
                scope.spaceStyle.backgroundColor = "red";


                for (var i = 0; i < scope.space.appearance.effects.length; i++) {
                    var effect = scope.space.appearance.effects[i];
                    switch (effect.type) {
                        case 0:
                            scope.spaceStyle.padding = "{0} {0} {0} {0}".format(effect.radius);
                            scope.spaceStyle.backgroundColor = effect.color;
                            scope.spaceStyle.border = "solid 2px black";
                            //scope.spaceStyle.left -= effect.radius;
                            //scope.spaceStyle.top -= effect.radius;
                            scope.spaceStyle.borderRadius = 15.0;
                            scope.spaceStyle.boxShadow = "4px 4px 2px #333";
                            break;

                        case 1:

                            break;

                        case 2:

                            break;
                        default:
                            alert(effect.type);
                            break;

                    }
                }


            }
        }
    });


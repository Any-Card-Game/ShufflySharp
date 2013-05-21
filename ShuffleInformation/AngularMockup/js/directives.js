'use strict';

/* Directives */


angular.module('acg')
    .directive('acgDrawCard', function() {

        return {


            link:         function(scope, element, attrs,model) {

                element.attr('src','assets/cards/'+( 100 + ( scope.card.value + 1 ) + ( scope.card.type ) * 13 )+'.gif')
            }
        }
    });



//( 100 + ( card.Value + 1 ) + ( card.Type ) * 13 )
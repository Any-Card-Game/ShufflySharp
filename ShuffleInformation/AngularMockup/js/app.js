'use strict';
angular.module('acg', ['acgFilters', 'acgServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/gameUI', {templateUrl: 'partials/gameUI.html',   controller: GameCtrl}).
            otherwise({redirectTo: '/gameUI'});
    }]);
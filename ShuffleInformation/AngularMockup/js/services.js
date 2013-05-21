'use strict';

/* Services */

angular.module('acgServices', ['ngResource'])/*.
    factory('Phone', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
})*/;

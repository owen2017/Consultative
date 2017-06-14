define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.header', [])
		.controller('header', ["$scope", "$location", function ($scope, $location) {
			$scope.logout = function(){	
				$location.url("/");
				window.history.forward(1);
			}
		}])
		
});
define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.side', [])
		.controller('side_page', ["$scope", "$routeParams", "$location", function ($scope, $routeParams, $location) {
			$scope.sid = $routeParams.sid;
			
			
			$scope.side_def = function(){
				$scope.side_editPwd         = false;
				$scope.side_counselorList   = false;
				$scope.side_counselorApply  = false;
				$scope.side_counselorModify = false;
				$scope.side_feedback        = false;
				$scope.side_bulletin        = false;

				document.getElementsByTagName("BODY")[0].style.overflowY="auto";
			}

			$scope.side_def();

			var url = location.hash.split("/");
			var path = "side_"+url[1];			
			$scope[path] = true;

						
		}])
		
});
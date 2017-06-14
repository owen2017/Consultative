define(['angular'], function (angular) {
	'use strict';
	return angular.module(AppName+'.login', [])
		.controller('do_login', ["$scope", "$location", "do_ajax", function ($scope, $location, do_ajax) {
			$scope.login = function(){	
				var cmd = {};
				cmd.cmd = "1,1";
				if($scope.acc==undefined || $scope.acc==""){alert("請輸入帳號");return;}
				cmd.acc = $scope.acc;
				if($scope.pwd==undefined || $scope.pwd==""){alert("請輸入密碼");return;}
				cmd.pwd = $scope.pwd;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){		    		
			    		$location.url("/counselorList/"+data["sid"]);
			    	}
			  	});
				
			}
		}])
		
});
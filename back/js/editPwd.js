define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.editPwd', [])
		.controller('editPwd', ["$scope", "do_ajax", "$routeParams", function ($scope, do_ajax, $routeParams) {
			

			$scope.submit = function(){
				var cmd = {};
				cmd.cmd = "1,2";

				if($scope.old_pwd==undefined || $scope.old_pwd==""){alert("請輸入舊密碼");return;}

				if($scope.new_pwd==undefined || $scope.new_pwd==""){alert("請輸入新密碼");return;}		

				if($scope.new_pwd2==undefined || $scope.new_pwd2==""){alert("請再次輸入新密碼");return;}

				if($scope.new_pwd!=$scope.new_pwd2){alert("新密碼不相同");return;}

				cmd.old_pwd = $scope.old_pwd;
				cmd.new_pwd = $scope.new_pwd;
				cmd.sid = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){		    		
			    		alert("成功");
			    		$scope.old_pwd = "";
			    		$scope.new_pwd = "";
			    		$scope.new_pwd2 = "";
			    	}
			  	});
			}
		}])
		
});
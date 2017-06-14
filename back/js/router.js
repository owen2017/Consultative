define(['angular', 'app'], function(angular, app) {
	'use strict';

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "html/main/login.html"
			})
			.when("/main/:sid", {
				templateUrl: "html/main/main.html"
				//templateUrl: "html/main/counselorList.html"
			})
			.when("/editPwd/:sid", {
				templateUrl: "html/main/editPwd.html"
			})
			.when("/counselorList/:sid", {
				templateUrl: "html/main/counselorList.html"
			})
			.when("/counselorApply/:sid", {
				templateUrl: "html/main/counselorApply.html"
			})
			.when("/counselorModify/:sid", {
				templateUrl: "html/main/counselorModify.html"
			})
			.when("/feedback/:sid/:acc", {
				templateUrl: "html/main/feedback.html"
			})
			.when("/bulletin/:sid", {
				templateUrl: "html/main/bulletin.html"
			})
			.otherwise({
				redirectTo: '/'
			})
	}]);
	return app;
});

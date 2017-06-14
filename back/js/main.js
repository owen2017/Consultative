require.config({
	baseUrl: 'js',
	paths: {
		angular: 'lib/angular/angular.min',
		// ,text: 'js/lib/require/text'
	},	
	shim: {
		'angular' : {'exports' : 'angular'}
		// ,'angularMocks': {deps:['angular'], 'exports':'angular.mock'}
	},
	priority: [
		"angular"
	]
});

require( ['angular','app','router'], function( angular, app, router) {
	'use strict';	
	angular.bootstrap(document, [app['name']]);
});

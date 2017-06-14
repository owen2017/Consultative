define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.ajax', [])
		.service('do_ajax', ['$http', "$location", "ErrCode", function ($http, $location, ErrCode) {
			this.do_get = function(){

			}	

			this.do_post = function(cmd){
				var url = '../gateway/Supergateway.php'; 
				var data = cmd; 
				return $http.post(url, data).then(function(rtn){
					var status = rtn["data"]["status"];
					var errmsg = rtn["data"]["errmsg"];
					var data   = rtn["data"]["data"];
					if(status=="0"){
						if(data==""){data = true;}	
						return data;
					}else{					
						// if(errmsg=="ERR_SID_ERROR"){location.href="https://www.google.com.tw/";}

						ErrCode(errmsg);	
						if(errmsg=="ERR_SID_OVER_TIME" || errmsg=="ERR_SID_ERROR"){$location.url("/");}
						return false;
					}				
				});			
			}
		}]);
		
});


define(['angular', 'app'], function(angular, app) {
	'use strict';
	// console.log(angular);
	// console.log(app);
	return app.service(AppName+'.ajax', ['$http',"$location","ErrCode", function($http, $location, ErrCode){
		this.do_get = function(){

		}

		
	}])


});
define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.bulletin', [])
		.controller('bulletin', ["$scope", "do_ajax", "$routeParams", function ($scope, do_ajax, $routeParams) {
			$scope.window_enable = false;	
			$scope.nodata        = false;
			$scope.sel_enable 	 = "Y";	

			$scope.ctl_window = function(_sn){
				$scope.window_enable = ($scope.window_enable==false)?true:false;
				$scope.submit_type = true;
				$scope.empty();	
				// 修改
				if(_sn!="N" && _sn>0){
					$scope.submit_type = false;					
				}
				$scope.search(_sn);
			}

			$scope.search = function(_sn){
				var cmd = {};
				cmd.cmd = "4,1";

				cmd.sn     = (_sn=="N")?"":_sn;
				cmd.enable = $scope.sel_enable;
				cmd.sid    = $routeParams.sid;
				
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    		if(_sn!="N"){			    			
			    			var __sn = "_"+_sn;
			    			$scope.sn      = data[__sn]["sn"];
			    			$scope.title   = data[__sn]["title"];
			    			$scope.content = data[__sn]["content"];
			    			$scope.enable  = (data[__sn]["enable"])?"Y":"N";
			    			$scope.remark  = data[__sn]["remark"];
			    			$scope.nodata = false;
			    		}
			    		$scope.list = data;
			    	}else{
			    		$scope.list = [];
			    		$scope.nodata = true;
			    	}

			    	
			    	
			  	});
			}
			$scope.search("N");

			$scope.submit = function(_type){					    	

				var cmd = {};
				if(_type=="ins"){cmd.cmd = "4,2";}
				if(_type=="upd"){cmd.cmd = "4,3";}

				if($scope.title==undefined || $scope.title==""){alert("請輸入標題");return;}

				if($scope.content==undefined || $scope.content==""){alert("請輸入內容");return;}		

				if($scope.enable==undefined || $scope.enable==""){alert("請選擇狀態");return;}

				cmd.sn   	= $scope.sn;
				cmd.title   = $scope.title;
				cmd.content = $scope.content;
				cmd.enable  = $scope.enable;
				cmd.remark  = $scope.remark;
				cmd.sid     = $routeParams.sid;
				
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){	    		
			    		alert("成功");
			    		$scope.search("N");
			    		$scope.ctl_window("N");	
			    	}
			  	});
			}
		

			$scope.del = function(_sn){				
				var cmd = {};
				cmd.cmd = "4,4";
				if(_sn==undefined || _sn==""){alert("錯誤");return;}
				cmd.sn = _sn;
				cmd.sid = $routeParams.sid;					
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    		$scope.search("N");
			    	}
			  	});
			}

			$scope.empty = function(){
				$scope.sn      = "";
				$scope.title   = "";
				$scope.content = "";
				$scope.enable  = "Y";
				$scope.remark  = "";
			}
		}])
		
});
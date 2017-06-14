

define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.feedback', [])
		.controller('feedback', ["$scope", "do_ajax", "$routeParams", function ($scope, do_ajax, $routeParams) {
			
			if($routeParams.acc) $scope.acc = $routeParams.acc;

			// 搜尋狀態預設為0
			$scope.status = "";
			$scope.rows   = "20";

			$scope.total_len		= 0;
			$scope.max_show_page 	= 4;		// 只能偶數 (顯示5頁 設定為4)
			$scope.now_page         = "1";	
			$scope.page_list        = [];
			$scope.page_ctl   		= false;
			$scope.nodata           = false;

			$scope.search = function(_page){
				var cmd = {};
				$scope.now_page  = (_page)?_page:$scope.now_page;
				cmd.cmd = "3,1";
				cmd.acc          = ($scope.acc) || "";				
				cmd.name         = ($scope.name) || "";	

				cmd.status       = $scope.status;
				cmd.page         = $scope.now_page;
				cmd.rows         = $scope.rows;
				cmd.sid          = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){

			    	  	$scope.list = data["data"];	
			    	  	$scope.pages = Math.ceil(data["count"] / $scope.rows);		    	  
			    	  	
			    	  	$scope.show_pag_tag($scope.pages);
			    	  	$scope.nodata = false;
			    	}else{
			    		$scope.list = [];
			    		$scope.n_page = false;
			    		$scope.page_ctl = false;			    		
			    		$scope.nodata = true;
			    	}
			    	
			  	});
			}
			$scope.search();

			// 修改狀態
			$scope.upd_status = function(sn, cid, status){
				var cmd = {};
				cmd.cmd = "3,3";
							
				cmd.sn     = sn;
				cmd.cid    = cid;
				cmd.status = status;
				cmd.sid    = $routeParams.sid;
				
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    	  	alert("成功");
			    	  	$scope.search();
			    	}		    	
			    	
			  	});
			}

			// 刪除
			$scope.del = function(sn, cid){
				var cmd = {};
				cmd.cmd = "3,4";
							
				cmd.sn   = sn;
				cmd.cid  = cid;
				cmd.sid  = $routeParams.sid;
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    	  	alert("成功");
			    	  	$scope.search();
			    	}		    	
			    	
			  	});
			}
							
			//設置當前選中頁樣式
            $scope.isActivePage = function (page) {
            	if(page==$scope.now_page){
            		return true;
            	}else{
            		return false;
            	}                
            };

            // 頁碼控制
            $scope.show_pag_tag = function(t_len){            	

            	$scope.total_len = t_len;
            	if(t_len <= 0){return;}
            	$scope.page_ctl = true;
            	var m_len = $scope.max_show_page / 2;
            	
            	var min = 1;
            	var max = t_len;
            	
            	// 顯示的頁碼
            	if(($scope.now_page-m_len)<=min){ 
            		max = min+$scope.max_show_page;            		
            	}else if(($scope.now_page+m_len)>=max){
            		min = 1;  	
            	}else{
            		min = $scope.now_page-m_len;
					max = $scope.now_page+m_len;
            	}
            	if(t_len<($scope.max_show_page+1)){
            		max = t_len;
            	}
           	
            	var ary = [];
            	for (var i = min ; i <= max ; i++) {
                    ary.push(i);
                }
               
            	$scope.page_list = ary;     

            	// 上一頁 下一頁 顯示控制   

            	$scope.p_page = true;
            	$scope.n_page = true;

            	if($scope.now_page == 1){
            		$scope.p_page = false;
            	}else if($scope.now_page == t_len){
            		$scope.n_page = false;
            	}
            	if(max==1){
		    		$scope.p_page = false;
		    		$scope.n_page = false;
		    	}
            }

            // 換頁
            $scope.change_page = function (page) {

            	if(page!=$scope.now_page){
            		$scope.now_page = (page-0);
            		$scope.search();
            	}
            } 

           	// 上一頁
            $scope.previous = function () {  
            	var to_page = ($scope.now_page-0)-1;
            	if(to_page<1){return;}

            	$scope.now_page = to_page;
            	$scope.search();              
            }   

            // 下一頁
            $scope.next = function () {   
           		var to_page = ($scope.now_page-0)+1;            	
            	if(to_page>$scope.total_len){return;}

            	$scope.now_page = to_page;
            	$scope.search();              
            }   

            // 轉字串
			$scope.obj_trans = function(obj){
				var _obj = JSON.parse(obj);
				if(_obj["checkbox"]){
					var data = _obj["checkbox"];					
					var rtn = $scope.obj_to_str(data)
					if(_obj["other"]!=""){
						rtn += " , "+_obj["other"];
					}
				}else{
					var data = _obj;
					var rtn = $scope.obj_to_str(data);
				};

				return rtn;
			} 

		}]);		
});
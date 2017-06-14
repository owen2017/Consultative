define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.counselorApply', [])
		.controller('counselorApply', ["$scope", "do_ajax", "$routeParams", function ($scope, do_ajax, $routeParams) {
			

			$scope.show_detail = false;
			$scope.nodata      = false;

			$scope.total_len		= 0;
			$scope.max_show_page 	= 4;		// 只能偶數 (顯示5頁 設定為4)
			$scope.now_page         = "1";	
			$scope.rows         	= "20";
			$scope.page_ctl   		= false;

			$scope.detail 	   = [];


			// 搜尋狀態預設為0
			$scope.status = 0;
			$scope.search = function(_page){

				var cmd = {};
				$scope.now_page  = (_page)?_page:$scope.now_page;

				cmd.cmd    = "2,1";				
				cmd.status = $scope.status;
				cmd.page   = $scope.now_page;
				cmd.rows   = $scope.rows;
				cmd.sid    = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
					
			    	if(data!=false){
			    		var count = data["data"].length;
			    		for(var i=0 ; i<count ; i++){		
			    			data["data"][i]["area"]        = $scope.obj_trans(data["data"][i]["area"]);			    			
			    			data["data"][i]["office_area"] = $scope.obj_trans(data["data"][i]["office_area"]);
			    			data["data"][i]["serviceobj"]  = $scope.obj_trans(data["data"][i]["serviceobj"]);			    			
			    			data["data"][i]["training"]    = $scope.obj_trans(data["data"][i]["training"]);			    			
			    			data["data"][i]["license"]     = $scope.obj_trans(data["data"][i]["license"]);
			    			data["data"][i]["specialty"]   = $scope.obj_trans(data["data"][i]["specialty"]);
			    		}
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

			// 核準
			$scope.approve = function(_sn){

				var cmd = {};
				cmd.cmd = "2,2";
				
				cmd.sn  = _sn;
				cmd.sid = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    		alert("成功");
			    		$scope.search();
			    	}			    	
			    	
			  	});
			}

			// 拒絕
			$scope.refuse = function(_sn){

				var cmd = {};
				cmd.cmd = "2,3";
				
				cmd.sn  = _sn;
				cmd.sid = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    		alert("成功");
			    		$scope.search();
			    	}			    	
			    	
			  	});
			}

			// 顯示詳細內容
			$scope.pop_detail = function(_index){
				$scope.detail = $scope.list[_index];
				$scope.show_detail = true;
			}

			// 關閉詳細內容
			$scope.close_detail = function(){
				$scope.detail = [];
				$scope.show_detail = false;
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

			// obj轉字串
			$scope.obj_to_str = function(obj){
				var count = Object.size(obj);
				if(count<=0){ return; }				
				var str=[];	    		
	    		for(var i=0 ; i<count ; i++){		    						
	    			str.push(obj[i]);
	    		}	
	    		return str.join(" , ");
			}

			Object.size = function(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
	    		return size;
			};



		}]);
		
});
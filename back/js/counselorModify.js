define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.counselorModify', [])
		.controller('counselorModify', ["$scope", "do_ajax", "$routeParams", function ($scope, do_ajax, $routeParams) {

			// 搜尋狀態預設為0
			$scope.status = 0;
			$scope.rows   = "20";

			$scope.total_len		= 0;
			$scope.max_show_page 	= 4;		// 只能偶數 (顯示5頁 設定為4)
			$scope.now_page         = "1";	
			$scope.page_list        = [];

			$scope.div_pop_connect = false;
			$scope.page_ctl        = false;
			$scope.nodata          = false;

			$scope.search = function(_page){
				var cmd = {};
				$scope.now_page  = (_page)?_page:$scope.now_page;
				cmd.cmd = "2,6";
				cmd.acc          = ($scope.acc) || "";				
				cmd.status       = $scope.status;
				cmd.page         = $scope.now_page;
				cmd.rows         = $scope.rows;
				cmd.sid          = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){	

			    		var num = data["data"].length;		    		

			    		for(var i=0; i<num; i++){
			    			var type = data["data"][i]["type"];
			    			var oldData = data["data"][i]["oldData"];
			    			var newData = data["data"][i]["newData"];

			    			data["data"][i]["type"] = getType(type);

			    			if(type=="area" || type=="serviceobj" || type=="office_area" || type=="training" || type=="license"){
			    				data["data"][i]["oldData"] = obj_trans(oldData);
			    				data["data"][i]["newData"] = obj_trans(newData);
			    			}
			    			if(type=="specialty"){	
			    				data["data"][i]["oldData"] = obj_trans(oldData);
			    				data["data"][i]["newData"] = obj_trans(newData);	
			    				// data["data"][i]["oldData"] = obj_trans_specialty(newData);
			    				// data["data"][i]["newData"] = obj_trans_specialty(newData);
			    			}
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

			// 核准
			$scope.approve = function(sn){
				var cmd = {};
				cmd.cmd = "2,7";
							
				cmd.sn   = sn;
				cmd.sid  = $routeParams.sid;
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    	  	alert("成功");
			    	  	$scope.search();
			    	}		    	
			    	
			  	});
			}

			// 拒絕
			$scope.refuse = function(sn){
				var cmd = {};
				cmd.cmd = "2,8";
							
				cmd.sn   = sn;
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

		}])
		
});

function getType(_type){
	var ary             = [];
	ary["password"]     = "密碼";
	ary["gender"]       = "性別";
	ary["identity"]     = "專業人員同志身分";
	ary["identity_yes"] = "同志身份";
	ary["mobile"]       = "手機";
	ary["phone"]        = "機構電話";
	ary["email"]        = "E-mail";
	ary["area"]         = "服務地區";
	ary["office_time"]  = "服務時段";
	ary["office_area"]  = "工作場域";
	ary["job"]          = "職稱";
	ary["service_area"] = "可服務地點";
	ary["serviceobj"]   = "可服務對象";
	ary["serviceLimit"] = "服務對象限制";
	ary["charges"]      = "是否收費";
	ary["fee"]      	= "收費標準";
	ary["seniority"]    = "年資";
	ary["training"]     = "修課及訓練";
	ary["experience"]   = "服務同志實務經歷";
	ary["case_times"]   = "接案次數";
	ary["education"]    = "學歷";
	ary["license"]      = "相關證照";
	ary["license_num"]  = "證照證號";
	ary["specialty"]    = "同志諮商領域專長";

	return ary[_type];
}

// 轉字串
obj_trans = function(obj){

	var _obj = JSON.parse(obj);
	
	if(_obj["checkbox"]){
		var data = _obj["checkbox"];
		var rtn = obj_to_str(data)
		if(_obj["other"]!=""){
			rtn += " , "+_obj["other"];
		}
	}else{
		var data = _obj;
		var rtn = obj_to_str(data);
	};

	return rtn;
}

// obj轉字串
obj_to_str = function(obj){
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

obj_trans_specialty = function(obj){
	var _obj = JSON.parse(obj);

	var str = "";
	str += "同志諮商領域專長:<br>";
	
	str += obj_to_str(_obj["checkbox"]);
	str += "<br>一般專長:<br>";
	str += _obj["other"];
	
	return str;
	
}
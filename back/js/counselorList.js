define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.counselorList', [])
		.controller('counselorList', ["$scope", "do_ajax", "$routeParams", function ($scope, do_ajax, $routeParams) {

			$scope.area             = "";
			$scope.satisfaction     = "";
			$scope.enable           = "";
			$scope.upd_satisfaction = "1";
			$scope.now_index        = "";
			$scope.now_satisfaction = "";

			$scope.sid = $routeParams.sid;
					
			$scope.rows         	= "20";

			$scope.total_len		= 0;
			$scope.max_show_page 	= 4;		// 只能偶數 (顯示5頁 設定為4)
			$scope.now_page         = "1";	
			$scope.page_list        = [];
			
			$scope.div_pop_satisfaction = false;
			$scope.show_detail = false;
			$scope.page_ctl    = false;
			$scope.nodata      = false;

			$scope.reupdata = function(){
				$scope.upd_name = false;
				$scope.upd_password = false;
				$scope.upd_gender = false;
				$scope.upd_identity = false;
				$scope.upd_mobile = false;
				$scope.upd_phone = false;
				$scope.upd_email = false;
				$scope.upd_area = false;
				$scope.upd_office_time = false;
				$scope.upd_office_area = false;
				$scope.upd_job = false;
				$scope.upd_service_area = false;
				$scope.upd_serviceobj = false;
				$scope.upd_serviceLimit = false;
				$scope.upd_charges = false;
				$scope.upd_seniority = false;
				$scope.upd_training = false;
				$scope.upd_experience = false;
				$scope.upd_case_times = false;
				$scope.upd_education = false;
				$scope.upd_license = false;
				$scope.upd_license_num = false;
				$scope.upd_specialty = false;
			}
			$scope.reupdata();

			$scope.empty_updata = function(){
				$scope.updata_name         = "";
				$scope.updata_password     = "";
				$scope.updata_gender       = "";
				$scope.updata_identity     = "";
				$scope.updata_identity_yes = "";
				$scope.updata_mobile       = "";
				$scope.updata_phone        = "";
				$scope.updata_email        = "";
				$scope.updata_area         = "";
				$scope.updata_office_time  = "";
				$scope.updata_office_area  = "";
				$scope.updata_job          = "";
				$scope.updata_service_area = "";
				$scope.updata_serviceobj   = "";
				$scope.updata_serviceLimit = "";
				$scope.updata_charges      = "";
				$scope.updata_fee      	   = "";
				$scope.updata_seniority    = "";
				$scope.updata_training     = "";
				$scope.updata_experience   = "";
				$scope.updata_case_times   = "";
				$scope.updata_education    = "";
				$scope.updata_license      = "";
				$scope.updata_license_num  = "";
				$scope.updata_specialty    = "";
			}
			$scope.empty_updata();


			$scope.default = function(){
				var cmd = {};
				cmd.cmd = "5,1";
				do_ajax.do_post(cmd).then(function(data){
					if(data!=false){
						$scope.default = data;
					}
				});
			}
			$scope.default();			

			$scope.search = function(_page){
				var cmd = {};
				$scope.now_page  = (_page)?_page:$scope.now_page;
				cmd.cmd = "2,11";
				cmd.acc          = ($scope.acc) || "";
				cmd.name         = ($scope.name) || "";
				cmd.area         = $scope.area;
				cmd.satisfaction = $scope.satisfaction;
				cmd.enable       = $scope.enable;
				cmd.page         = $scope.now_page;
				cmd.rows         = $scope.rows;
				cmd.sid          = $routeParams.sid;
				
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
			    	  	// console.log($scope.list );
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
			$scope.upd_status = function(sn, enable){

				var cmd = {};
				cmd.cmd = "2,12";	
				cmd.sn     = sn;
				cmd.enable = enable;
				cmd.sid    = $routeParams.sid;
				
				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    	  	alert("成功");
			    	  	$scope.search();
			    	}		    	
			    	
			  	});
			}

			// 彈窗 - 修改滿意度
			$scope.edit_satisfaction = function(index, satisfaction){
				var mem_data = $scope.list[index];
				$scope.now_index = index;
				$scope.now_satisfaction = satisfaction;
				$scope.upd_satisfaction = mem_data["satisfaction"];
				$scope.div_pop_satisfaction = true;
			}

			// 彈窗 - 修改滿意度 -> 確定修改
			$scope.do_upd_satisfaction = function(){

				if($scope.now_satisfaction == $scope.upd_satisfaction){
					alert("請選擇不同的滿意度");
					return;
				}

				var mem_data = $scope.list[$scope.now_index];
				
				var cmd          = {};
				cmd.cmd          = "2,12";
				cmd.sn           = mem_data["sn"];
				cmd.satisfaction = $scope.upd_satisfaction;				
				cmd.sid          = $routeParams.sid;

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    		// console.log(data);
			    		alert("成功");
			    	  	$scope.search();
			    	  	$scope.div_pop_satisfaction = false;
			    	}			    	
			  	});

				
			}

			// 彈窗 - 修改滿意度 -> 關閉
			$scope.close_satisfaction = function(){
				$scope.div_pop_satisfaction = false;
			}	

			// 顯示詳細內容
			$scope.pop_detail = function(_index){
				$scope.detail = $scope.list[_index];
				
				$scope.updata_name         = $scope.list[_index]["name"];
				$scope.updata_password     = $scope.list[_index]["password"];
				$scope.updata_gender       = $scope.list[_index]["gender"];
				$scope.updata_identity     = $scope.list[_index]["identity"];
				$scope.updata_identity_yes = $scope.list[_index]["identity_yes"];
				$scope.updata_mobile       = $scope.list[_index]["mobile"];
				$scope.updata_phone        = $scope.list[_index]["phone"];
				$scope.updata_email        = $scope.list[_index]["email"];
				$scope.updata_area         = $scope.list[_index]["area"];
				$scope.updata_office_time  = $scope.list[_index]["office_time"];
				$scope.updata_job          = $scope.list[_index]["job"];
				$scope.updata_service_area = $scope.list[_index]["service_area"];
				$scope.updata_serviceobj   = $scope.list[_index]["serviceobj"];
				$scope.updata_serviceLimit = $scope.list[_index]["serviceLimit"];
				$scope.updata_charges      = $scope.list[_index]["charges"];
				$scope.updata_fee          = $scope.list[_index]["fee"];
				$scope.updata_seniority    = $scope.list[_index]["seniority"];
				$scope.updata_experience   = $scope.list[_index]["experience"];
				$scope.updata_case_times   = $scope.list[_index]["case_times"];
				$scope.updata_education    = $scope.list[_index]["education"];
				$scope.updata_license_num  = $scope.list[_index]["license_num"];
				// console.log($scope.detail);			
				$scope.show_detail = true;
				document.getElementsByTagName("BODY")[0].style.overflowY="hidden";
			}

			// 關閉詳細內容
			$scope.close_detail = function(){
				$scope.detail      = [];
				$scope.show_detail = false;
				$scope.empty_updata();
				$scope.reupdata();
				document.getElementsByTagName("BODY")[0].style.overflowY="auto";
			}	

			$scope.do_show_upd = function(_type){					
				$scope.reupdata();
				$scope["upd_"+_type] = true;
				var data = $scope.detail[_type];

				if(_type=="gender" || _type=="charges" || _type=="identity" || _type=="case_times"){
					$scope["sel_"+_type] = data;
				}
				
				if(_type=="office_area" || _type=="serviceobj" || _type=="training" || _type=="license" || _type=="specialty"){
					
					var def = (data["def"])?data["def"]:data;
					var other = data["other"];
					$scope["sel_"+_type] = {};
					var len = $scope.default[_type].length;
					for (var i = 0; i < len; i++) {
						var sel = $scope.default[_type][i];					
						var chk = def.indexOf(sel);		
						if(chk>=0){
							$scope["sel_"+_type][sel] = true;							
							// console.log($scope["sel_"+_type]);
						}
						if(other && other!=""){
							$scope["sel_"+_type]["other"] = true;
							$scope["other_"+_type] = other;
						}
					}
				}

				if(_type=="area"){

					$scope["sel_"+_type] = {};
					var len = $scope.default[_type].length;
					var ary = [];
					for (var i = 0; i < len; i++) {						
						var city = $scope.default[_type][i]["city"];
						var chk = data.indexOf(city);
						
						if(chk>=0){
							$scope["sel_"+_type][city] = true;						
						}
					}
				}
			}

			$scope.do_upd_counselor = function(_sn, _type){	
				var cmd  = {};
				cmd.cmd  = "2,30";							
				cmd.sid  = $routeParams.sid;
				cmd.sn   = _sn;
				cmd.type = _type;

				if(_type=="name" || _type=="password"|| _type=="mobile" || _type=="phone" || _type=="email" || _type=="office_time" || _type=="job" || _type=="service_area" || _type=="serviceLimit"  || _type=="seniority" || _type=="experience" || _type=="case_times" || _type=="education" || _type=="license_num"){
					cmd.modify  = $scope["updata_"+_type];				
				}

				if(_type=="gender"){
					cmd.modify  = $scope["sel_"+_type];				
				}

				if(_type=="area" || _type=="serviceobj"){					
					var ary = {};
					var i = 0;
					angular.forEach($scope["sel_"+_type], function(val, key){									
						if (!!$scope["sel_"+_type][key]){
							ary[i] = key;
							i++;
						}
					});								
					cmd.modify  = JSON.stringify(ary);
				}
				
				if(_type=="office_area" || _type=="training" || _type=="license" || _type=="specialty"){					
					var ary = {};
					ary["checkbox"] = {};
					ary["other"] = "";
					var i = 0;
					angular.forEach($scope["sel_"+_type], function(val, key){	
									
						if (!!$scope["sel_"+_type][key] && key!="other"){
							ary["checkbox"][i] = key;
							i++;
						}
						if(!!$scope["sel_"+_type][key] && key=="other"){
							ary["other"] = $scope["other_"+_type];
						}
					});		
									
					cmd.modify  = JSON.stringify(ary);
				}

				if(_type=="identity"){
					cmd.modify  = $scope["sel_identity"];
					
					cmd.type1 = "identity_yes";
					cmd.modify1 = "";
					if($scope["sel_identity"]=="我是同志，我願意公開同志身份"){
						cmd.modify1 = $scope["updata_identity_yes"];
					}
				}

				if(_type=="charges"){
					cmd.modify  = $scope["sel_charges"];
					
					cmd.type1 = "charges_yes";
					cmd.modify1 = "";
					if($scope["sel_charges"]=="我是同志，我願意公開同志身份"){
						cmd.modify1 = $scope["收費"];
					}
				}				

				do_ajax.do_post(cmd).then(function(data){
			    	if(data!=false){
			    	  	alert("成功");
			    	  	$scope.search();
			    	  	$scope.close_detail();
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
					var rtn = {};
					rtn["def"] = $scope.obj_to_str(data);
					rtn["all"] = rtn["def"];
					rtn["other"] = "";
					if(_obj["other"] && _obj["other"].length>0){					
						rtn["other"] = _obj["other"];
						rtn["all"] += " , "+_obj["other"];
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

		}])
		
});
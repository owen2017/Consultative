"use strict";

if(typeof app.search == "undefined") app.search = {};

(function(_app){

	// 頁數
	_app.page = 1;
	// 頁數
	_app.rows = 10;
	// 資料最大筆數
	_app.max_rows = 0;

	_app.init = function(){
		// 諮商師搜尋
	  	_app.get_search();
	  	// 按鈕動作
	  	_app.btn_actions();	  	
	}

	// 取得諮商師資料
	_app.get_search = function(){

		$("[name=total_row]").closest("h3").hide();
		$("[name=total_no_data]").hide();

		var cmd   = {};     
		cmd.cmd   = "2,16";
		cmd.page = _app.page;
		cmd.rows = _app.rows;

		// 主下拉式選單類型
		var type = $("[name=main_sel]").val();
		if(type=="all"){			
			cmd.all = $("[sub_sel=all] input").val();
		}
		if(type=="name"){
			cmd.name = $("[sub_sel=name] input").val();
			if(cmd.name=="" || cmd.name==undefined){
				app.popwin.popwin_errmsg("請輸入搜尋資料");
				return;
			}
		}
		if(type=="area"){
			cmd.area = $("[name=area_opts]").html();
			if(cmd.area=="" || cmd.area==undefined){
				app.popwin.popwin_errmsg("請輸入搜尋資料");
				return;
			}
		}
		if(type=="specialty"){
			cmd.specialty = $("[sub_sel=specialty] select").val();
			if(cmd.specialty=="" || cmd.specialty==undefined){
				app.popwin.popwin_errmsg("請輸入搜尋資料");
				return;
			}
		}		

		var res = app.ajax.do_post(cmd);
		if(res==false){ 
			// 移除舊列表 
  			$("[copy=Y]").remove();
			return; 
		}

		var count = res["count"];
		var data = res["data"];

		_app.max_rows = count;		

		if(count<=0){			
			$("[name=total_no_data]").show();
		}else{			
			_app.do_list(data);
			// 資料總筆數
			$("[name=total_row]").html(_app.max_rows);
			$("[name=total_row]").closest("h3").show();			
		}
	}	

	// 產生列表
	_app.do_list = function(res){

		var _li = $("[list=li]").clone();
		_li.attr("copy","Y").show();

		var list = [];

		$.each(res, function(key, val){			

			var star = "";
			for (var i = 1; i <= val["satisfaction"]; i++) {
				star+='<span class="satisfaction star"></span>';
			}
			$("[list=area]",_li).html(_app.obj_trans(val["area"]));
			$("[list=name]",_li).html(val["name"]);
			$("[list=specialty]",_li).html(_app.obj_trans(val["specialty"]));
			$("[list=license]",_li).html(_app.obj_trans(val["license"]));
			$("[list=star]",_li).html(star);

			var sn = '{"sn":"'+val["sn"]+'"}';			
			$("[list=feeback]",_li).attr("options", sn);
			$("[list=contact]",_li).attr("options", sn);
			
			list.push(_li.prop("outerHTML"));
		});

		// 產生列表
		$("[list=ul]").append(list.join(""));

	}

	// 按鈕動作
  	_app.btn_actions = function(){

  		// 捲動載入
	    $(window).scroll(function() {
	        var scroll     = $(window).scrollTop();
	        var height     = $(window).height();
	        var div_height = $("body").height();
	        if((scroll+height+100)>=div_height){
	            if(_app.page*_app.rows<_app.max_rows){
	            	_app.page++;
	            	_app.get_search();
	            }
	        }
	    });

  		// 搜尋按鈕
  		$("[name=search]").on("click",function(){  			
  			_app.page = 1;
  			// 移除舊列表 
  			$("[copy=Y]").remove();
  			_app.get_search();
  		});  
  	}

  	// 轉字串
	_app.obj_trans = function(obj){

		var _obj = JSON.parse(obj);
		
		if(_obj["checkbox"]){
			var data = _obj["checkbox"];
			var rtn = _app.obj_to_str(data)
			if(_obj["other"]!=""){
				rtn += " , "+_obj["other"];
			}
		}else{
			var data = _obj;
			var rtn = _app.obj_to_str(data);
		};

		return rtn;
	}

	// obj轉字串
	_app.obj_to_str = function(obj){
		var count = _app.size(obj);
		if(count<=0){ return; }				
		var str=[];	    		
		for(var i=0 ; i<count ; i++){		    						
			str.push(obj[i]);
		}	
		return str.join(" , ");
	}

	_app.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
		return size;
	};


}(app.search));


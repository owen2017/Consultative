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
		var cmd   = {};     
		cmd.cmd   = "2,16";
		cmd.page = _app.page;
		cmd.rows = _app.rows;

		// 主下拉式選單類型
		var type = $("[name=main_sel]").val();
		if(type=="name"){cmd.name = $("[sub_sel=name] input").val();}
		if(type=="area"){cmd.area = $("[name=area_opts]").html();}
		if(type=="specialty"){cmd.specialty = $("[sub_sel=specialty] select").val();}		

		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		_app.max_rows = res["count"];
		_app.do_list(res["data"]);
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
  		$("[name=search]").off().on("click",function(){
  			// 移除列表 
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


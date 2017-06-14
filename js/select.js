"use strict";

if(typeof app.select == "undefined") app.select = {};

(function(_app){

	// 選單資料
	_app.options = [];

	_app.init = function(){
		// 取得下拉式選單資料
		_app.get_options();
	  	// 按鈕動作
	  	_app.btn_actions();
	}

	// 取得下拉式選單資料
	_app.get_options = function(){
		var cmd   = {};     
      	cmd.cmd   = "5,1";
		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		_app.options = res;
	}

	// 主選單改變
	_app.main_sel_change = function(key){
		$("[sub_sel]").hide();

		if(key==""){ 
			return; 
		}

		var _this = $("[sub_sel="+key+"]");
		_this.show();

		// 姓名
		if(key=="name"){_this.find("input").val("");}

		// 地區
		if(key=="area"){
			_this.find("select option").remove();
			// 清空已選地區
			_app.area_opts = "";
			$("[name=area_opts]").html("");
			$("[name=clear_area]").hide();
			_this.find("select").append("<option>請選擇</option>");
			$.each(_app.options[key],function(_key, _val){
				var opt = "<option value="+_val["city"]+">"+_val["city"]+"</option>";
				_this.find("select").append(opt);
			});
		}

		// 專長
		if(key=="specialty"){
			_this.find("select option").remove();

			$.each(_app.options[key],function(_key, _val){
				var opt = "<option value="+_val+">"+_val+"</option>";
				_this.find("select").append(opt);
			});
		}

		// 工作場域
		if(key=="office_area"){
			_this.find("select option").remove();

			$.each(_app.options[key],function(_key, _val){
				var opt = "<option value="+_val+">"+_val+"</option>";
				_this.find("select").append(opt);
			});
		}
	}

	// 地區 - 子選單
	_app.area_opts = "";

	// 地區 - 子選單改變
	_app.main_sel_area_change = function(area){

		if(area=="請選擇"){return;}
		var len = _app.area_opts.split(",").length;	   
	    if(len>=3){	    	
	    	app.popwin.popwin_errmsg("最多只能選擇3個地區");
	    	return;
	    }
	    // 選過的地區不能再選
	    $("[sub_sel=area]").find("[value="+area+"]").prop("disabled", true);

		var num = _app.area_opts.indexOf(area);
		if(num<0){
	      if(_app.area_opts == ""){
	        _app.area_opts += area;
	      }else{
	        _app.area_opts += "," + area;
	      }
	    }
	    
	    $("[name=area_opts]").html(_app.area_opts);
	    $("[name=clear_area]").show();
	}

	// 按鈕動作
  	_app.btn_actions = function(){

  		// 主選單改變
  		$("[name=main_sel]").on("change",function(){
  			var key = $(this).val();
  			_app.main_sel_change(key);
  		});

  		// 地區 - 子選單改變
  		$("[sub_sel=area] select").on("change",function(){
  			var key = $(this).val();  			
  			_app.main_sel_area_change(key);
  		});

  		// 清空地區選項
  		$("[name=clear_area]").on("click",function(){
  			// 清空已選地區
			_app.area_opts = "";
  			$("[name=area_opts]").html("");
  			$("[sub_sel=area]").find("option").prop("disabled", false);
  			$("[name=clear_area]").hide();
  		});
  	}


}(app.select));


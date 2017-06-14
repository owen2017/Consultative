"use strict";

if(typeof app.popwin == "undefined") app.popwin = {};

(function(_app){

	// 錯誤訊息定時
	_app.err_timeout = "";

	_app.init = function(){
		// 按鈕動作
	  	_app.btn_actions();
	}

	// 彈窗 - 錯誤訊息
	_app.popwin_errmsg = function(errmsg){		
		$("[name=popwin_errmsg]").html(errmsg);
		$("[name=popwin_errmsg]").fadeIn();
		_app.err_timeout = setTimeout(function(){ 
	  		$("[name=popwin_errmsg]").fadeOut();
	  	}, 3000);
	}

	// 彈窗 - 資料頁面
	_app.popwin_html = function(html){		
		$.get("html/"+html+".html",function(data){
		    $("[name=showHTML]").html(data).show();
		    $("[name=popwin_html]").show();
		    $("body").css("overflow-y", "hidden");
		});
	}

	// 關閉彈窗 - 資料頁面
	_app.close_popwin_html = function(){		
		$("[name=popwin_html]").hide();
  		$("[name=mask]").hide();
  		$("body").css("overflow-y", "auto");
	}

	// 按鈕動作
	_app.btn_actions = function(){

		// 彈窗 - 資料頁面
  		$("body").on("click","[popwin]",function(){
  			// 打開遮罩
  			$("[name=mask]").show();
  			var key = $(this).attr("popwin");
  			if(key=="popwin_close"){return;}

  			// 網址參數
  			var options = $(this).attr("options");  			
  			if(options){
  				app.params = JSON.parse(options);
  			}
  			
  			_app.popwin_html(key);
  		}); 

  		// 彈窗 - 關閉
  		$("body").on("click","[popwin=popwin_close]",function(){
  			_app.close_popwin_html();
  		}); 
	}
	
}(app.popwin));


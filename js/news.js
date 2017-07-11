"use strict";

if(typeof app.news == "undefined") app.news = {};

(function(_app){

	// 頁數
	_app.page = 1;
	// 頁數
	_app.rows = 5;

	_app.init = function(){
		// 取得最新消息
		_app.get_news();
		// 按鈕動作
		_app.btn_actions();
	}

	// 取得最新消息
	_app.get_news = function(){
		var cmd   = {};     
		cmd.cmd   = "4,1";
		cmd.enable = "Y";
		cmd.page = _app.page;
		cmd.rows = _app.rows;
		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		_app.do_list(res);
	}

	// 產生列表
	_app.do_list = function(res){

		var _li = $("[news=li]").clone();
		_li.attr("copy","Y").show();

		var list = [];

		$.each(res, function(key, val){			
			
			$("[news=time]",_li).html(val["build_time"]);
			$("[news=title]",_li).html(val["title"]);			
			$("[news=content]",_li).html(val["content"].replace(/\n/g,"<br />"));
			
			list.push(_li.prop("outerHTML"));
		});
		$("[news=ul]").append(list.join(""));

	}

	// 按鈕動作
	_app.btn_actions = function(){

		// 彈窗 - 顯示詳細內容
  		$("[news=li]").on("click",function(){
  			$("[news=content]").stop().slideUp()
  			$(this).find("[news=content]").stop().slideToggle();  			
  		}); 
	}

}(app.news));

$(function(){

	app.news.init();

});
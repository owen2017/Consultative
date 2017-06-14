"use strict";

if(typeof app.visitor == "undefined") app.visitor = {};

(function(_app){

	_app.init = function(){
		// 取得瀏覽次數
		_app.get_visitor();	  	
	}

	// 取得瀏覽次數
	_app.get_visitor = function(){
		var cmd   = {};     
      	cmd.cmd   = "3,5";
		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		$("[name=visitor]").html(res["num"]);
	}

}(app.visitor));


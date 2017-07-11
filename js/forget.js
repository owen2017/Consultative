"use strict";

if(typeof app.login  == "undefined") app.login  = {};

(function(_app){	

	_app.init = function(){		
		// 按鈕動作
		_app.btn_actions();
	}	

	// 寄送
	_app.do_submit = function(){
		var cmd   = {};     
		cmd.cmd   = "2,40";

		var account = $("[forget=account]").val();
		var email   = $("[forget=email]").val();

		if(account==""){
			app.popwin.popwin_errmsg("請輸入帳號");
			return;
		}
		if(email==""){
			app.popwin.popwin_errmsg("請輸入信箱");
			return;
		}		

		cmd.account = account;
		cmd.email   = email;

		var res = app.ajax.do_post(cmd);

		if(res=="SUCCESS"){ 
			app.popwin.popwin_errmsg("信件已成功寄送");
			app.popwin.close_popwin_html();
		}
	}


	// 按鈕動作
	_app.btn_actions = function(){

		// 寄送
  		$("[forget=do_submit]").off().on("click",function(){
  			_app.do_submit();			
  		}); 
	}

}(app.login));

$(function(){

	app.login.init();

});
"use strict";

if(typeof app.login  == "undefined") app.login  = {};

(function(_app){	

	_app.init = function(){		
		// 檢查是否登入
		_app.chk_login();
		// 按鈕動作
		_app.btn_actions();
	}

	// 檢查是否登入
	_app.chk_login = function(){
		if(app.SID && app.SID!=""){
			app.popwin.popwin_html("signedIn");
			return;
		}
	}

	// 登入
	_app.do_login = function(){
		var cmd   = {};     
		cmd.cmd   = "2,20";

		var account  = $("[login=account]").val();
		var password = $("[login=password]").val();
		var captcha  = $("[login=captcha]").val();

		if(account==""){
			app.popwin.popwin_errmsg("請輸入帳號");
			return;
		}
		if(password==""){
			app.popwin.popwin_errmsg("請輸入密碼");
			return;
		}
		if(captcha==""){
			app.popwin.popwin_errmsg("請輸入驗證碼");
			return;
		}

		cmd.account  = account;
		cmd.password = password;
		cmd.captcha  = captcha;

		var res = app.ajax.do_post(cmd);
		if(res==false){ 
			$("#captcha").attr("src", "Captcha/Captcha.php");
			return; 
		}
		app.counselor = res;
		app.SID = res["sid"];		
		app.popwin.popwin_html("signedIn");
	}


	// 按鈕動作
	_app.btn_actions = function(){

		// 登入
  		$("[login=do_login]").off().on("click",function(){
  			_app.do_login();			
  		}); 
	}

}(app.login));

$(function(){

	app.login.init();

});
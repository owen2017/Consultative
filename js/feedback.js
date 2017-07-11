"use strict";

if(typeof app.feedback == "undefined") app.feedback = {};

(function(_app){	

	_app.init = function(){

		// 按鈕動作
		_app.btn_actions();
	}	

	// 按鈕動作
	_app.btn_actions = function(){	

		// 新增回饋
  		// $("[feedback=do_submit]").off().on("click",function(){ 
  		$("[feedback=do_submit]").on("click",function(){ 
  			_app.do_submit();
  		});
	}

	// 送出回饋
	_app.do_submit = function(){
		var cmd = {};  		
		cmd.cmd = "3,2";
  		cmd.sn 	= app.params.sn;

  		var data = $("[feedback=data]").val();
  		if(data=="" || data==undefined){
  			app.popwin.popwin_errmsg("請輸入回饋內容");
  			return;
  		}

  		var captcha = $("[feedback=captcha]").val();
  		if(captcha=="" || captcha==undefined){
  			app.popwin.popwin_errmsg("請輸入驗證碼");
  			return;
  		}

  		cmd.data    = data;
  		cmd.captcha = captcha;

  		var res = app.ajax.do_post(cmd);

  		var date = new Date();
  		var time = date.getTime();
  		$("[feedback=captcha]").val("");
		$("#captcha").attr("src", "Captcha/Captcha.php?"+time);

		if(res==false){
			// $("[feedback=captcha]").val("");
			// $("#captcha").attr("src", "Captcha/Captcha.php");
			return; 
		}

		app.popwin.popwin_errmsg("感謝您的回饋");
		app.popwin.close_popwin_html();
	}



}(app.feedback));

$(function(){
		
	app.feedback.init();

});
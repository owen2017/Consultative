"use strict";

if(typeof app.check == "undefined") app.check = {};

(function(_app){

	// 檢查空白
	_app.check_empty = function(type, val){		
		var chk = (!val || val=="" || val==undefined)?false:true;
		if(chk==false){			
			// app.popwin.popwin_errmsg(type+"不能空白");
			app.popwin.popwin_errmsg("請輸入"+type);
		}
		return chk;
	}

	// 檢查email格式
	_app.check_email = function(type, val){
		if(!/.+@.+\.+.[a-zA-Z]{1,4}$/.test(val)){			
			app.popwin.popwin_errmsg(type+"格式不符合");
			return false;
		}
		return true;
	}


}(app.check));

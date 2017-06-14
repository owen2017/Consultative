"use strict";

if(typeof app.errCode == "undefined") app.errCode = {};

(function(_this){

	//url
	_this.errCode = function(msg){
		var code                     = {};
		code["SUCCESS"]              = "成功";
		code["ERR_ACC_OR_PWD_ERROR"] = "帳號或密碼錯誤";
		code["ERR_SID_ERROR"]        = "SID錯誤";
		code["ERR_SID_OVER_TIME"]    = "登入時間過長 ，請重新登入";
		code["ERR_UPD_FAIL"]         = "修改失敗";
		code["ERR_ADD_FAIL"]         = "新增失敗";
		code["ERR_DEL_FAIL"]         = "刪除失敗";
		code["ERR_NO_DATA"]          = "沒有資料";
		code["ERR_NO_APPLY_DATA"]    = "沒有申請資料";
	  	code["ERR_ACCOUNT_REPEAT"]   = "帳號已經存在";
	  	code["ERR_MOBILE_REPEAT"]    = "電話已經存在";
	  	code["ERR_ADDRESS_REPEAT"]   = "地址已經存在";
		code["ERR_EMAIL_REPEAT"]     = "信箱已經存在";
		code["ERR_UPD_MEM_FAIL"]     = "修改會員資料失敗";
		code["ERR_CAPTCHA"]          = "驗證碼錯誤";
	  	code["ERR_NO_COUNSELOR"]     = "沒有這個諮商師";
		code["ERR_DATA_IN_VERIFY"]   = "資料修改正在審核中";

		// var _msg = (code[msg])?code[msg]:"未知錯誤";
		return code[msg];	
	};
	
	

}(app.errCode));

define(['angular'], function (angular) {
	'use strict';

	return angular.module(AppName+'.errcode', [])
		.value('ErrCode', function (msg) {
			var code                        = {};
			code["SUCCESS"]                 = "成功";
			code["ERR_ACC_OR_PWD_ERROR"]    = "帳號或密碼錯誤";
			code["ERR_SID_ERROR"]           = "發生錯誤 ，請重新登入";
			code["ERR_SID_OVER_TIME"]       = "登入時間過長 ，請重新登入";
			code["ERR_UPD_FAIL"]       		= "修改失敗";
			code["ERR_ADD_FAIL"] 			= "新增失敗";
			code["ERR_DEL_FAIL"] 			= "刪除失敗";
			code["ERR_NO_DATA"] 			= "沒有資料";
			code["ERR_NO_APPLY_DATA"] 		= "沒有申請資料";
			code["ERR_ACCOUNT_REPEAT"] 		= "帳號重複";
			code["ERR_UPD_MEM_FAIL"] 		= "修改會員資料失敗";
			code["ERR_NO_COUNSELOR"] 		= "沒有這個專業人員";

			// var _msg = (code[msg])?code[msg]:"未知錯誤";
			if(msg=="ERR_NO_DATA"){return;}
			return alert(code[msg]);
		});
		
});
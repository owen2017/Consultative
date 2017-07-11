var AppName = "myApp";

var JsPath = [];
JsPath.push("angular");
JsPath.push("errcode");         // 錯誤代碼
JsPath.push("ajax");            // 資料傳輸
JsPath.push("login");           // 登入
JsPath.push("side");            // 測欄
JsPath.push("counselorList");   // 專業人員列表
JsPath.push("counselorApply");  // 專業人員申請
JsPath.push("counselorModify"); // 專業人員修改
JsPath.push("feedback"); 		// 訪客回饋
JsPath.push("editPwd");         // 修改密碼
JsPath.push("bulletin");        // 公告
JsPath.push("header");        	// header 

var JsPathStr = JsPath.join(",");
var JsPath_len = JsPath.length;

var NgModule = [];
for(var i=1; i<JsPath_len; i++){
	NgModule.push(AppName+"."+JsPath[i]);
}

define(JsPath, function (JsPathStr) {
		'use strict';
		return angular.module(AppName, NgModule);
});

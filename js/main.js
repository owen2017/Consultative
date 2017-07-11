"use strict";

$(function(){

	// 隱藏子選單
	$("[sub_sel]").hide();
	// 隱藏遮罩
	$(".mask").hide();
	
	// SID
	app.SID = "";

	// 專業人員資料
	app.counselor = [];

	// 網址參數
	app.params = "";

	// 下拉式選單資料
	app.select.init();  	

  	// 瀏覽次數
  	app.visitor.init();

  	// 專業人員列表
  	app.search.init();

  	// 彈跳視窗
  	app.popwin.init();

  	// Top 功能
  	app.top.init();

});
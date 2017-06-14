"use strict";

if(typeof app.ajax == "undefined") app.ajax = {};

(function(_this){

	//url
	_this.url = "gateway/Supergateway.php";

	// 非同步
	_this.async = false;

	// 回傳資料
	_this.return = "";
	
	// get
	_this.do_get = function(){
	}

	// post
	_this.do_post = function(data){
		$.ajax({
		  type: 'POST',
		  async: _this.async,
		  url: _this.url,
		  data: data,
		  success: _this.success,
		  dataType: 'json'
		});
		return _this.return;
	}

	// 回傳處理
	_this.success = function(rtn){		
		var status = rtn["status"];
		var errmsg = rtn["errmsg"];
		var data   = rtn["data"];
		if(data==""){data = [];}
		if(status=="0"){
			_this.return = (data==false)?errmsg:data;
		}else{
			_this.return = false;
			app.popwin.popwin_errmsg(app.errCode.errCode(errmsg));
		}				
	}

}(app.ajax));

"use strict";

if(typeof app.signedIn == "undefined") app.signedIn = {};

(function(_app){	

	_app.init = function(){

		// 設定預設資料
		_app.set_default();

		// 產生諮商師列表
		_app.do_list();

		// 按鈕動作
		_app.btn_actions();
	}	

	// 設定預設資料
	_app.set_default = function(){

		$.each(app.select.options, function(key, val){
			_app.set_checkbox(key, val)
		});		
	}

	// 設置checkbox
	_app.set_checkbox = function(type, data){
		var _this = $("[default="+type+"]");
		if(!_this){ return; }

		var br = (_this.attr("br")=="Y")?"<br>":"";

		var _clone = _this.find("span").clone();
		_clone.show();

		var list = [];
		$.each(data, function(key, val){

			if(type=="area"){val=val["city"];}

			$("input",_clone).val(val);
			$("span",_clone).html(val);		
			list.push(_clone.prop("outerHTML"));
		});
		_this.find("div").html(list.join(br));
	}

	// 產生諮商師列表
	_app.do_list = function(){	
		console.log(app.counselor);	
		$.each(app.counselor, function(key, val){

			if(key=="gender" || key=="charges" || key=="idea1" || key=="idea2"){
				$("[signedIn="+key+"][value="+val+"]").prop("checked", true);
			}

			else if(key=="area" || key=="serviceobj"){			
				var data = JSON.parse(val);	
				$.each(data, function(_key, _val){
					$("[chkbox="+key+"][value="+_val+"]").prop("checked", true);
				});
			}

			else if(key=="office_area" || key=="training" || key=="license" || key=="specialty"){
				var data     = JSON.parse(val);
				var checkbox = data["checkbox"];
				var other    = data["other"];

				$.each(checkbox, function(__key, __val){
					$("[chkbox="+key+"][value="+__val+"]").prop("checked", true);
				});
				if(data["checkbox"] && data["checkbox"]!=""){
					$("[chkbox="+key+"][key=other]").prop("checked", true);
					$("[other="+key+"]").val(other);
				}
			}

			else{
				$("[signedIn="+key+"]").val(val);
			}
		});
	}

	// 按鈕動作
	_app.btn_actions = function(){

		// 修改按鈕(打開disabled)
  		// $("[btn=do_update]").on("click",function(){
  			
  		// 	$("[signedIn]").prop("disabled", false);
  		// 	$("[chkbox]").prop("disabled", false);
  		// 	$("[other]").prop("disabled", false);

  		// 	$("[signedIn=account]").prop("disabled", true);
  		// 	$("[signedIn=name]").prop("disabled", true);  			
  		// 	$("[signedIn=idea1]").prop("disabled", true);
  		// 	$("[signedIn=idea2]").prop("disabled", true);

  		// 	$("[upd=submit]").show();
  		// }); 

  		// 修改
  		$("[btn=do_logout]").on("click",function(){
  			app.SID = "";
			app.counselor = "";
			app.popwin.close_popwin_html();
			app.popwin.popwin_errmsg("已經成功登出");

  		});

  		// 修改
  		$("[upd=submit]").on("click",function(){
  			let key = $(this).attr("key");

  			// 資料更新
  			_app.do_update(key);
  		});

  		// 資料更新
  		_app.do_update = function(type){
  			var data
  			var cmd = {};  		
			cmd.cmd = "2,9";

			
			// 性別	收費標準	 	
			if(type=="gender" || type=="charges"){							
				data = $("[signedIn="+type+"]:checked").val();
			}

			// 專業人員同志身分 手機 	機構電話 E-mail 
			// 服務時段 職稱	可服務地點 服務對象限制  
			// 年資 服務同志實務經歷 接案次數 學歷
			// 證照證號 密碼
			if(type=="password" || type=="identity" || type=="mobile" || type=="phone" || type=="email" || type=="office_time" || type=="job" || type=="service_area" || type=="serviceLimit" || type=="seniority" || type=="experience" || type=="case_times" || type=="education" || type=="license_num"){							
				data = $("[signedIn="+type+"]").val();				
			}

			// 地區 可服務對象
			if(type=="area" || type=="serviceobj"){
				var count = 0;
				var obj = {};
				$("[default="+type+"]").find("[type=checkbox]:checked").each(function(){			
					var val = $(this).val();
					obj[count] = val;
					count++;					
				});
				data = JSON.stringify(obj);
				if(count<=0){
					if(type=="area"){app.popwin.popwin_errmsg("請選擇至少一項服務地區");}					
					return;
				}
			}


			// 工作場域 修課及訓練 相關證照 同志諮商領域專長
			if(type=="office_area" || type=="training" || type=="license" || type=="specialty"){				
				var count = 0;
				var obj = {};				
				obj["checkbox"] = {};				
				obj["other"] = {};		
						
				$("[default="+type+"]").find("[type=checkbox]:checked").each(function(){
					var key 	= $(this).attr("key");
					var val 	= $(this).val();

					if(key=="other"){
						val = $("[other="+type+"]").val();
						obj["other"] = val;			
						if(val && val!=""){count++;}
					}else{				
						obj["checkbox"][count] = val;
						count++;				
					}

					if(type=="specialty"){
						val = $("[other="+type+"]").val();
						obj["other"] = val;
					}
				});
				data = JSON.stringify(obj);
				if(count<=0){
					if(type=="office_area"){app.popwin.popwin_errmsg("請選擇至少一項工作場域");}
					if(type=="serviceobj"){app.popwin.popwin_errmsg("請選擇至少一項服務對象");}
					if(type=="training"){app.popwin.popwin_errmsg("請選擇至少一項修課及訓練");}
					if(type=="license"){app.popwin.popwin_errmsg("請選擇至少一項相關證照");}
					if(type=="specialty"){app.popwin.popwin_errmsg("請選擇至少一項同志諮商領域專長");}
					return;
				}
			}
			
			// console.log(type);
			// console.log(data);
			// console.log(app.counselor[type]);
			cmd["type"] = type;
			cmd[type] = data;
			if(data == app.counselor[type]){
				return app.popwin.popwin_errmsg("修改資料，請填寫不同的內容");
			}

			// alert(type+" = "+data);

			cmd.sid = app.SID;
			var res = app.ajax.do_post(cmd);
			if(res==false){ return; }
			app.popwin.popwin_errmsg("成功，等待審核");
			app.popwin.close_popwin_html();

  		}
	}

}(app.signedIn));

$(function(){

	app.signedIn.init();

});
"use strict";

if(typeof app.signedIn == "undefined") app.signedIn = {};

(function(_app){	

	_app.init = function(){

		// 設定預設資料
		_app.set_default();

		// 產生專業人員列表
		_app.do_list();

		// 按鈕動作
		_app.btn_actions();
	}	

	// 設定預設資料
	_app.set_default = function(){

		$.each(app.select.options, function(key, val){
			_app.set_sel_datas(key, val)
		});		
	}

	// 設置checkbox
	_app.set_sel_datas = function(type, data){
		var _this = $("[default="+type+"]");
		if(!_this){ return; }

		var br = (_this.attr("br")=="Y")?"<br>":"";

		var _clone = _this.find("label").clone();
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

	// 產生專業人員列表
	_app.do_list = function(){	
		$.each(app.counselor, function(key, val){

			if(key=="gender"|| key=="case_times" || key=="idea1" || key=="idea2"){
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

				if(other && other.length>0){
					$("[chkbox="+key+"][key=other]").prop("checked", true);
					$("[other="+key+"]").val(other);
				}
			}
			else if(key=="identity"){
				$("[signedIn="+key+"][value="+val+"]").prop("checked", true);
				if(val!="我是同志，我願意公開同志身份"){
					$("[signedIn=identity_yes]").prop("disabled", true);
				}
			}

			else if(key=="charges"){
				$("[signedIn="+key+"][value="+val+"]").prop("checked", true);
				if(val!="收費"){
					$("[signedIn=fee]").prop("disabled", true);
				}
			}

			else{
				$("[signedIn="+key+"]").val(val);
			}
		});
	}

	// 按鈕動作
	_app.btn_actions = function(){

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

			
			// 性別
			if(type=="gender" || type=="case_times"){							
				data = $("[signedIn="+type+"]:checked").val();
			}

			//  手機 	機構電話 E-mail 
			// 服務時段 職稱	可服務地點 服務對象限制  
			// 年資 服務同志實務經歷 接案次數 學歷
			// 證照證號 密碼
			if(type=="password" || type=="mobile" || type=="phone" || type=="email" || type=="office_time" || type=="job" || type=="service_area" || type=="serviceLimit" || type=="seniority" || type=="experience"|| type=="education" || type=="license_num"){							
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

			if(data == app.counselor[type]){
				return app.popwin.popwin_errmsg("修改資料，請填寫不同的內容");
			}

			// 專業人員同志身分 收費標準
			if(type=="identity" || type=="charges"){
				data = $("[signedIn="+type+"]:checked").val();

				var type_1 = (type=="identity")?"identity_yes":"fee";
				var data_1 = $("[signedIn="+type_1+"]").val();
				if(data!="我是同志，我願意公開同志身份" && data!="收費"){
					data_1="";
				}
				
				if((data == app.counselor[type])&&(data_1 == app.counselor[type_1])){
					return app.popwin.popwin_errmsg("修改資料，請填寫不同的內容");
				}
				
			}
			
			// console.log(type);
			// console.log(data);
			// console.log(app.counselor[type]);
			cmd["type"] = type;
			cmd[type] = data;

			cmd["type1"] = type_1;
			cmd[type_1] = data_1;
			
			// return;
			// alert(type+" = "+data);

			cmd.sid = app.SID;
			var res = app.ajax.do_post(cmd);
			if(res==false){ return; }
			app.popwin.popwin_errmsg("成功，等待審核");
			app.popwin.close_popwin_html();

  		}

  		$("[name=charges]").on("change",function(){
  			var val = $(this).attr("value");
  			if(val=="收費"){
  				$("[signedIn=fee]").prop("disabled",false);
  			}else{
  				$("[signedIn=fee]").val("");
  				$("[signedIn=fee]").prop("disabled",true);
  			}
  		});

  		$("[name=identity]").on("change",function(){
  			var val = $(this).attr("value");
  			if(val=="我是同志，我願意公開同志身份"){
  				$("[signedIn=identity_yes]").prop("disabled",false);
  			}else{
  				$("[signedIn=identity_yes]").val("");
  				$("[signedIn=identity_yes]").prop("disabled",true);
  			}
  		});
	}



}(app.signedIn));

$(function(){

	app.signedIn.init();

});
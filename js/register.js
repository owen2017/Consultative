"use strict";

if(typeof app.register == "undefined") app.register = {};

(function(_app){

	_app.init = function(){	

		// 設定預設資料
		_app.set_default();	
		// 按鈕動作
		_app.btn_actions();
	}

	// 設定預設資料
	_app.set_default = function(){
		// console.log(app.select.options);
		$.each(app.select.options, function(key, val){
			_app.set_sel_datas(key, val)
		});

		$("[name=gender]").eq(1).prop("checked",true);
		
		$("[name=identity]").eq(1).prop("checked",true);
		$("[apply=identity_yes]").prop("disabled",true);

		$("[name=charges]").eq(1).prop("checked",true);
		$("[apply=fee]").prop("disabled",true);

		$("[name=case_times]").eq(1).prop("checked",true);
	}

	// 設置可選資料
	_app.set_sel_datas = function(type, data){
		var _this = $("[register="+type+"]");
		if(!_this || _this==undefined){ return; }
		
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

	// 註冊
	_app.do_register = function(){

		var cmd   = {};     
		cmd.cmd   = "2,4";

		// ===================================================================
		// 帳號
		// ===================================================================
		var account = $("[apply=account]").val();
		var chk_account  = app.check.check_empty("帳號", account);
		if(chk_account==false){ return; }
		cmd.account = account;

		// ===================================================================
		// 密碼
		// ===================================================================
		var password = $("[apply=password]").val();
		var chk_password  = app.check.check_empty("密碼", password);
		if(chk_password==false){ return; }
		cmd.password = password;

		// ===================================================================
		// 密碼2
		// ===================================================================
		var password2 = $("[apply=password2]").val();
		var chk_password2  = app.check.check_empty("重複密碼", password2);
		if(chk_password2==false){ return; }
		if(password!=password2){
			app.popwin.popwin_errmsg("密碼與重複密碼必須相同");
			return;
		}

		// ===================================================================
		// 姓名
		// ===================================================================
		var name = $("[apply=name]").val();
		var chk_name  = app.check.check_empty("姓名", name);
		if(chk_name==false){ return; }
		cmd.name = name;

		// ===================================================================
		// 性別
		// ===================================================================
		var gender = $("[apply=gender]:checked").val();
		cmd.gender = gender;

		// ===================================================================
		// 專業人員同志身分
		// ===================================================================
		var identity = $("[apply=identity]:checked").val();
		cmd.identity = identity;

		cmd.identity_yes = "";
		var identity_yes = $("[apply=identity_yes]").val();		
		if(identity=="我是同志，我願意公開同志身份"){
			var chk_identity_yes  = app.check.check_empty("同志身份", identity_yes);
			if(chk_identity_yes==false){ return; }
			cmd.identity_yes = identity_yes;
		};

		// ===================================================================
		// 手機
		// ===================================================================
		var mobile = $("[apply=mobile]").val();
		cmd.mobile = mobile;

		// ===================================================================
		// 機構電話
		// ===================================================================
		var phone = $("[apply=phone]").val();
		cmd.phone = phone;

		// ===================================================================
		// E-mail
		// ===================================================================

		var email = $("[apply=email]").val();
		if(email==""){
			app.popwin.popwin_errmsg("請輸入E-mail");
		}			
		var chk_email  = app.check.check_email("E-mail", email);
		if(chk_email==false){ return; }		
		cmd.email = email;

		if(mobile=="" && phone=="" && email==""){
			app.popwin.popwin_errmsg("請至少留下一種聯絡方式(手機、機構電話、E-mail)");
			return;
		}

		// ===================================================================
		// 服務地區
		// ===================================================================

		var count_area = 0;
		$("[register=area]").find("[type=checkbox]:checked").each(function(){
			
			var val = $(this).val();

			if(!cmd["area"]){cmd["area"]={};}

			cmd["area"][count_area] = val;
			count_area++;				
			
		});
		cmd["area"] = JSON.stringify(cmd["area"]);
		if(count_area<=0){
			app.popwin.popwin_errmsg("請選擇至少一項服務地區");
			return;
		}

		// ===================================================================
		// 服務時段
		// ===================================================================
		var office_time = $("[apply=office_time]").val();
		cmd.office_time = office_time;

		// ===================================================================
		// 工作場域
		// ===================================================================

		var count_office_area = 0;
		$("[register=office_area]").find("[type=checkbox]:checked").each(function(){
			var key 	= $(this).attr("key");
			var val 	= $(this).val();

			if(!cmd["office_area"]){cmd["office_area"]={};}
			if(!cmd["office_area"]["checkbox"]){cmd["office_area"]["checkbox"]={};}
			if(!cmd["office_area"]["other"]){cmd["office_area"]["other"]="";}

			if(key=="other"){
				val = $("[other=office_area]").val();
				cmd["office_area"]["other"] = val;			
				if(val && val!=""){count_office_area++;}
			}else{				
				cmd["office_area"]["checkbox"][count_office_area] = val;
				count_office_area++;				
			}
		});
		cmd["office_area"] = JSON.stringify(cmd["office_area"]);
		if(count_office_area<=0){
			app.popwin.popwin_errmsg("請選擇至少一項工作場域");
			return;
		}


		// ===================================================================
		// 職稱
		// ===================================================================
		var job = $("[apply=job]").val();
		cmd.job = job;

		// ===================================================================
		// 可服務地點
		// ===================================================================
		var service_area = $("[apply=service_area]").val();
		cmd.service_area = service_area;

		// ===================================================================
		// 可服務對象
		// ===================================================================

		var count_serviceobj = 0;
		$("[register=serviceobj]").find("[type=checkbox]:checked").each(function(){
			
			var val 	= $(this).val();

			if(!cmd["serviceobj"]){cmd["serviceobj"]={};}

			cmd["serviceobj"][count_serviceobj] = val;
			count_serviceobj++;				
			
		});
		cmd["serviceobj"] = JSON.stringify(cmd["serviceobj"]);
		if(count_serviceobj<=0){
			app.popwin.popwin_errmsg("請選擇至少一項服務對象");
			return;
		}

		// ===================================================================
		// 服務對象限制
		// ===================================================================
		var serviceLimit = $("[apply=serviceLimit]").val();
		cmd.serviceLimit = serviceLimit;

		// ===================================================================
		// 收費標準
		// ===================================================================
		var charges = $("[apply=charges]:checked").val();
		cmd.charges = charges;

		cmd.fee = "";
		var fee = $("[apply=fee]").val();		
		if(charges=="收費"){
			var chk_fee  = app.check.check_empty("收費標準", fee);
			if(chk_fee==false){ return; }
			cmd.fee = fee;
		};
		
		// ===================================================================
		// 年資
		// ===================================================================
		var seniority = $("[apply=seniority]").val();
		cmd.seniority = seniority;

		// ===================================================================
		// 修課及訓練
		// ===================================================================

		var count_training = 0;
		$("[register=training]").find("[type=checkbox]:checked").each(function(){
			var key 	= $(this).attr("key");
			var val 	= $(this).val();

			if(!cmd["training"]){cmd["training"]={};}
			if(!cmd["training"]["checkbox"]){cmd["training"]["checkbox"]={};}
			if(!cmd["training"]["other"]){cmd["training"]["other"]="";}

			if(key=="other"){
				val = $("[other=training]").val();
				cmd["training"]["other"] = val;			
				if(val && val!=""){count_training++;}
			}else{
				cmd["training"]["checkbox"][count_training] = val;
				count_training++;				
			}
		});
		cmd["training"] = JSON.stringify(cmd["training"]);
		if(count_training<=0){
			app.popwin.popwin_errmsg("請選擇至少一項修課及訓練");
			return;
		}

		// ===================================================================
		// 服務同志實務經歷
		// ===================================================================
		var experience = $("[apply=experience]").val();
		cmd.experience = experience;

		// ===================================================================
		// 接案次數
		// ===================================================================
		var case_times = $("[apply=case_times]:checked").val();
		cmd.case_times = case_times;

		// ===================================================================
		// 學歷
		// ===================================================================
		var education = $("[apply=education]").val();
		cmd.education = education;

		// ===================================================================
		// 相關證照
		// ===================================================================

		var count_license = 0;
		$("[register=license]").find("[type=checkbox]:checked").each(function(){
			var key 	= $(this).attr("key");
			var val 	= $(this).val();

			if(!cmd["license"]){cmd["license"]={};}
			if(!cmd["license"]["checkbox"]){cmd["license"]["checkbox"]={};}
			if(!cmd["license"]["other"]){cmd["license"]["other"]="";}

			if(key=="other"){
				val = $("[other=license]").val();
				cmd["license"]["other"] = val;			
				if(val && val!=""){count_license++;}
			}else{				
				cmd["license"]["checkbox"][count_license] = val;
				count_license++;				
			}
		});
		cmd["license"] = JSON.stringify(cmd["license"]);
		if(count_license<=0){
			app.popwin.popwin_errmsg("請選擇至少一項相關證照");
			return;
		}

		// ===================================================================
		// 證照證號
		// ===================================================================
		var license_num = $("[apply=license_num]").val();
		cmd.license_num = license_num;

		// ===================================================================
		// 同志諮商領域專長
		// ===================================================================

		var count_specialty = 0;
		$("[register=specialty]").find("[type=checkbox]:checked").each(function(){
			var key 	= $(this).attr("key");
			var val 	= $(this).val();

			if(!cmd["specialty"]){cmd["specialty"]={};}
			if(!cmd["specialty"]["checkbox"]){cmd["specialty"]["checkbox"]={};}
			
			cmd["specialty"]["checkbox"][count_specialty] = val;
			count_specialty++;				
		
		});

		if(count_specialty<=0){
			app.popwin.popwin_errmsg("請選擇至少一項同志諮商領域專長");
			return;
		}
		
		var specialty = $("[other=specialty]").val();
		cmd["specialty"]["other"] = specialty;
		cmd["specialty"] = JSON.stringify(cmd["specialty"]);

		// ===================================================================
		// 看法1
		// ===================================================================
		var idea1 = $("[apply=idea1]:checked").val();
		cmd.idea1 = idea1;

		// ===================================================================
		// 看法2
		// ===================================================================
		var idea2 = $("[apply=idea2]:checked").val();
		cmd.idea2 = idea2;

		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		app.popwin.popwin_errmsg("已收到申請，請等候通知");
		app.popwin.close_popwin_html();
	}

	// 按鈕動作
	_app.btn_actions = function(){

		// 登入
  		$("[register=do_register]").off().on("click",function(){
  			_app.do_register();			
  		}); 

  		$("[name=charges]").on("change",function(){
  			var val = $(this).attr("value");
  			if(val=="收費"){
  				$("[apply=fee]").prop("disabled",false);
  			}else{
  				$("[apply=fee]").val("");
  				$("[apply=fee]").prop("disabled",true);
  			}
  		});

  		$("[name=identity]").on("change",function(){
  			var val = $(this).attr("value");
  			if(val=="我是同志，我願意公開同志身份"){
  				$("[apply=identity_yes]").prop("disabled",false);
  			}else{
  				$("[apply=identity_yes]").val("");
  				$("[apply=identity_yes]").prop("disabled",true);
  			}
  		});
	}

}(app.register));

$(function(){

	app.register.init();

});
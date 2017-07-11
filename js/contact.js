"use strict";

if(typeof app.contact == "undefined") app.contact = {};

(function(_app){	

	_app.init = function(){		

		// 產生專業人員列表
		_app.do_list();

		// 按鈕動作
		// _app.btn_actions();
	}

	// 產生專業人員列表
	_app.do_list = function(){

		var cmd   = {};     
		cmd.cmd   = "2,13";
		cmd.sn 	  = app.params.sn;

		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		
		$.each(res, function(key, val){

			if(key=="area" || key=="serviceobj" || key=="office_area" || key=="training" || key=="license"){
				var data = app.objTrans.obj_trans(val);
				$("[contact="+key+"]").html(data);
				if(data=="" || data==undefined){
					$("[contact="+key+"]").closest("div").hide();
				}
			}

			else if(key=="specialty"){	
				var data = JSON.parse(val);			
				var checkbox = data["checkbox"];
				var other    = data["other"];				

				$("[contact="+key+"]").html(app.objTrans.obj_to_str(checkbox));
				$("[contact=n_"+key+"]").html(other);
			}

			else if(key=="identity"){					
				var data = res["identity_yes"];
				if(val!="我是同志，我願意公開同志身份" || data==""){
					$("[contact=identity_yes]").closest("div").hide();
				}
			}

			else{
				$("[contact="+key+"]").html(val);
				if(val=="" || val==undefined){
					$("[contact="+key+"]").closest("div").hide();
				}
			}
		});
	}

	// 按鈕動作
	_app.btn_actions = function(){		
	}



}(app.contact));

$(function(){

	app.contact.init();

});
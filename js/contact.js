"use strict";

if(typeof app.contact == "undefined") app.contact = {};

(function(_app){	

	_app.init = function(){		

		// 產生諮商師列表
		_app.do_list();

		// 按鈕動作
		// _app.btn_actions();
	}

	// 產生諮商師列表
	_app.do_list = function(){

		var cmd   = {};     
		cmd.cmd   = "2,13";
		cmd.sn 	  = app.params.sn;

		var res = app.ajax.do_post(cmd);
		if(res==false){ return; }
		
		$.each(res, function(key, val){

			// if(key=="gender" || key=="charges"){
			// 	$("[contact="+key+"][value="+val+"]").prop("checked", true);
			// }

			// else 
			if(key=="area" || key=="serviceobj" || key=="office_area" || key=="training" || key=="license"){
				$("[contact="+key+"]").html(app.objTrans.obj_trans(val));
			}

			else if(key=="specialty"){	
				var data = JSON.parse(val);			
				var checkbox = data["checkbox"];
				var other    = data["other"];

				$("[contact="+key+"]").html(app.objTrans.obj_to_str(checkbox));
				$("[contact=n_"+key+"]").html(other);
			}

			else{
				$("[contact="+key+"]").html(val);
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
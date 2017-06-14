"use strict";

if(typeof app.objTrans == "undefined") app.objTrans = {};

(function(_app){

	// 轉字串
	_app.obj_trans = function(obj){

		var _obj = JSON.parse(obj);
		
		if(_obj["checkbox"]){
			var data = _obj["checkbox"];
			var rtn = _app.obj_to_str(data)
			if(_obj["other"]!=""){
				rtn += " , "+_obj["other"];
			}
		}else{
			var data = _obj;
			var rtn = _app.obj_to_str(data);
		};

		return rtn;
	}

	// obj轉字串
	_app.obj_to_str = function(obj){
		var count = Object.size(obj);
		if(count<=0){ return; }				
		var str=[];	    		
		for(var i=0 ; i<count ; i++){		    						
			str.push(obj[i]);
		}	
		return str.join(" , ");
	}

	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
		return size;
	};
	

}(app.objTrans));

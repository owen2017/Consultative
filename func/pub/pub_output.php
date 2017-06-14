<?php  
	namespace func\pub;
	class pub_output{   

		# 定義回傳格式
	    static function do_return($_status, $_errmsg, $_data){ 
	    	$rtn           = array();
	    	$rtn["status"] = $_status;
	    	$rtn["errmsg"] = $_errmsg;
	    	$rtn["data"]   = $_data;
	    	return json_encode($rtn);
	    }   
	}
?>
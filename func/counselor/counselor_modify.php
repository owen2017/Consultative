<?php
	namespace func\counselor;
	use RTN;
	use CNL_SQL;
	use DB;
	use UIP;
	use SID;
	use CTA;
	
	class counselor_modify{ 


		# 修改專業人員資料
	    static function do_upd($_ARG){
	    	$sn           = $_ARG["sn"];
	    	$satisfaction = $_ARG["satisfaction"];
	    	$enable       = $_ARG["enable"];

	    	$data = CNL_SQL::sql_do_upd($sn, "", "", "", "", "", "", "", "", $satisfaction, $enable);
	    	if($data==false){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_MEM_FAIL","");
	    	}

	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 申請修改列表
	    static function get_modify_apply_list($_ARG){
	    	
	    	$acc    = $_ARG["acc"];
	    	$status = $_ARG["status"];
	    	$page   = $_ARG["page"];
	    	$rows   = $_ARG["rows"];

	    	# 取得申請修改列表
	    	$data = CNL_SQL::sql_get_modify_apply_list("", $acc, $status, $page, $rows);

	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	# 取得列表資料總數
	    	$count = CNL_SQL::sql_get_modify_apply_list_num($acc, $status, $page, $rows);
	    	if($count==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	$rtn["data"] = $data;
	    	$rtn["count"] = $count;
	    	return RTN::do_return("0","SUCCESS",$rtn);
	    }

	    # 申請修改列表 - 核准
	    static function modify_do_approve($_ARG){

	    	$sn = $_ARG["sn"];

	    	$list = CNL_SQL::sql_get_modify_apply_list($sn, "", 0, "", "");
	    	if($list==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}	   
	    	// print_R($list);
	    	$mid     = $list[0]["mid"];
	    	$type    = $list[0]["type"];
	    	$oldData = $list[0]["oldData"];
	    	$newData = $list[0]["newData"];	    	

	    	$upd = CNL_SQL::sql_do_upd_modify($mid, $type, $oldData, $newData);
	    	if($upd==false){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_MEM_FAIL","");
	    	}

	    	$data = CNL_SQL::sql_upd_modify_apply_status($sn, 1);
	    	if($data==false){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_FAIL","");
	    	}

	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 申請修改列表 - 拒絕
	    static function modify_do_refuse($_ARG){

	    	$sn = $_ARG["sn"];

	    	$data = CNL_SQL::sql_upd_modify_apply_status($sn, 2);

	    	if($data==false){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_FAIL","");
	    	}

	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 新增修改申請
	    static function add_modify_apply($_ARG){

	    	$type    = $_ARG["type"];
	    	$newData = $_ARG[$type];

	    	$type1    = $_ARG["type1"];
	    	$newData1 = $_ARG[$type1];
	    	
	    	$cid = SID::$MID;

	    	$c_data = CNL_SQL::sql_get_list($cid, "", "", "", "", "", "", "");

	    	if($c_data==false || count($c_data)<=0){
	    		# 沒有這個專業人員
	    		return RTN::do_return("-1","ERR_NO_COUNSELOR","");
	    	}

	    	$chk = CNL_SQL::sql_chk_modify_repeat($cid, $type);
	    	if($chk || $chk>=1){
	    		# 資料修改正在審核中
	    		return RTN::do_return("-1","ERR_DATA_IN_VERIFY","");
	    	}

	    	# 檢查第2資料
	    	if($type1=="identity_yes" || $type1=="fee"){
		    	$chk = CNL_SQL::sql_chk_modify_repeat($cid, $type1);
		    	if($chk || $chk>=1){
		    		# 資料修改正在審核中
		    		return RTN::do_return("-1","ERR_DATA_IN_VERIFY","");
		    	}
	    	}



	    	if($type=="mobile" || $type=="email" || $type=="address"){

		    	$_chk = CNL_SQL::sql_chk_counselor($type,$newData);

		    	if($_chk || $_chk>=1){    		

		    		# 電話已經存在
		    		if($type == "mobile"){
		    			$str = "ERR_MOBILE_REPEAT";
		    		}

		    		# 信箱已經存在
		    		if($type == "email"){
		    			$str = "ERR_EMAIL_REPEAT";
		    		}

		    		# 地址已經存在
		    		if($type == "address"){
		    			$str = "ERR_ADDRESS_REPEAT";
		    		}
	    				    		
		    		return RTN::do_return("-1",$str,"");
		    	}
	    	}

	    	$account = $c_data[0]["account"];
	    	$oldData = $c_data[0][$type];
	    	$oldData1 = $c_data[0][$type1];
	    	
	    	if($oldData!=$newData){	    		
		    	$data = CNL_SQL::sql_ins_modify_apply($type, $account, $oldData, $newData, $cid);	    	
		    	if($data==false){
		    		# 新增失敗
		    		return RTN::do_return("-1","ERR_ADD_FAIL","");
		    	}
	    	}

	    	if($oldData1!=$newData1 && ($type1=="identity_yes" || $type1=="fee")){
		    	$data1 = CNL_SQL::sql_ins_modify_apply($type1, $account, $oldData1, $newData1, $cid);	    
		    	if($data1==false){
		    		# 新增失敗
		    		return RTN::do_return("-1","ERR_ADD_FAIL","");
		    	} 
	    	}	    	   	

	    	return RTN::do_return("0","SUCCESS",array());
	    }

	    # 後台修改專業人員資料
	    static function back_do_modify($ARG){
	    	
	    	$sn      = $ARG["sn"];
	    	$type    = $ARG["type"];
	    	$modify  = $ARG["modify"];
	    	$type1   = $ARG["type1"];
	    	$modify1 = $ARG["modify1"];

	    	$data = CNL_SQL::sql_get_list($sn, "", "", "", "", "", "", "");
	    	if($data==false){
	    		# 沒有這個專業人員	    		
	    		return RTN::do_return("-1","ERR_NO_COUNSELOR","");
	    	} 

	    	$counselor = $data[0];
	    	$before = $data[0][$type];
	    	$before1 = $data[0][$type1];

	    	$upd = CNL_SQL::sql_do_upd_modify($sn, $type, $before, $modify);
	    	// if($upd==false){
	    	// 	# 修改失敗
	    	// 	return RTN::do_return("-1","ERR_UPD_MEM_FAIL","");
	    	// }
	    	$log = CNL_SQL::sql_log_back_changed($sn, $type, $before, $modify);


	    	if($type=="identity" || $type=="charges"){
	    		
	    		if($before1!=$modify1){
	    			$upd = CNL_SQL::sql_do_upd_modify($sn, $type1, $before1, $modify1);
			    	// if($upd==false){
			    	// 	# 修改失敗
			    	// 	return RTN::do_return("-1","ERR_UPD_MEM_FAIL","");
			    	// }
			    	$log = CNL_SQL::sql_log_back_changed($sn, $type1, $before1, $modify1);
	    		}    		
	    	}

	    	
	    	return RTN::do_return("0","SUCCESS",array());
	    }


	}
?>
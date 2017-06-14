<?php
	namespace func\counselor;
	use RTN;
	use CNL_SQL;
	use DB;
	use UIP;
	use SID;
	use CTA;
	
	class counselor_apply{ 


		# 申請列表
	    static function get_apply_list($_ARG){

	    	$status = $_ARG["status"];
	    	$page   = $_ARG["page"];
	    	$rows   = $_ARG["rows"];
	    	
	    	$data = CNL_SQL::sql_get_apply_list(false, $status, $page, $rows);
	    	
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	
	    	foreach ($data as $key => $value) {

				$data[$key]["apply_time"]   = date("Y-m-d H:i:s",$value["apply_time"]);
				$data[$key]["approve_time"] = ($value["approve_time"]==0)?0:date("Y-m-d H:i:s",$value["approve_time"]);	
	    	}

	    	# 取得列表資料總數
	    	$count = CNL_SQL::sql_get_apply_list_num($status);
	    	
	    	if($count==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	$rtn["data"] = $data;
	    	$rtn["count"] = $count;
	    	
	    	return RTN::do_return("0","SUCCESS",$rtn);
	    }

	    # 申請列表 - 新增
	    static function do_add_apply($_ARG){

	    	$account      = $_ARG["account"];
	    	$password     = $_ARG["password"];
	    	$name         = $_ARG["name"];
	    	$gender       = $_ARG["gender"];
	    	$identity     = $_ARG["identity"];
	    	$mobile       = $_ARG["mobile"];
	    	$phone        = $_ARG["phone"];
	    	$email        = $_ARG["email"];
	    	$area         = $_ARG["area"];
	    	$office_time  = $_ARG["office_time"];
	    	$office_area  = $_ARG["office_area"];
	    	$job          = $_ARG["job"];
	    	$service_area = $_ARG["service_area"];
	    	$serviceobj   = $_ARG["serviceobj"];
	    	$serviceLimit = $_ARG["serviceLimit"];
	    	$charges      = $_ARG["charges"];
	    	$seniority    = $_ARG["seniority"];
	    	$training     = $_ARG["training"];
	    	$experience   = $_ARG["experience"];
	    	$case_times   = $_ARG["case_times"];
	    	$education    = $_ARG["education"];
	    	$license      = $_ARG["license"];
	    	$license_num  = $_ARG["license_num"];
	    	$specialty    = $_ARG["specialty"];
	    	$idea1        = $_ARG["idea1"];
	    	$idea2        = $_ARG["idea2"];

	    	$chk_data["account"] = $_ARG["account"];
	    	$chk_data["mobile"]  = $_ARG["mobile"];
	    	$chk_data["phone"]   = $_ARG["phone"];
	    	$chk_data["email"]   = $_ARG["email"];
	    	
	    	// 驗證資料是否重複
	    	foreach ($chk_data as $_key => $_value) {

	    		$chk = CNL_SQL::sql_chk_counselor($_key,$_value);

		    	if($chk || $chk>=1){

		    		# 帳號已經存在
		    		if($_key == "account"){
		    			$str = "ERR_ACCOUNT_REPEAT";
		    		}

		    		# 電話已經存在
		    		if($_key == "mobile"){
		    			$str = "ERR_MOBILE_REPEAT";
		    		}

		    		# 信箱已經存在
		    		if($_key == "email"){
		    			$str = "ERR_EMAIL_REPEAT";
		    		}

		    		# 地址已經存在
		    		if($_key == "address"){
		    			$str = "ERR_ADDRESS_REPEAT";
		    		}
	    				    		
		    		return RTN::do_return("-1",$str,"");
		    	}
	    	}	    	

	    	$ins = CNL_SQL::sql_ins_counselor_apply($account,$password,$name,$gender,$identity,$mobile,$phone,$email,$area,$office_time,$office_area,$job,$service_area,$serviceobj,$serviceLimit,$charges,$seniority,$training,$experience,$case_times,$education,$license,$license_num,$specialty,$idea1,$idea2);
	    	if($ins==false){
	    		# 新增失敗
	    		return RTN::do_return("-1","ERR_ADD_FAIL","");
	    	}

	    	return RTN::do_return("0","SUCCESS",array());
	    }

	    # 申請列表 - 核准
	    static function do_approve($_ARG){

	    	$sn = $_ARG["sn"];

	    	# 取得申請者資料
	    	$data = CNL_SQL::sql_get_apply_list($sn, false);
	    	if($data==false){
	    		# 沒有申請資料
	    		return RTN::do_return("-1","ERR_NO_APPLY_DATA","");
	    	}

	    	$acc = $data[0]["account"];

	    	# 判斷帳號是否重複
	    	$repeat = CNL_SQL::sql_get_list("",$acc, "", "", "", "", "", "");
	    	if($repeat!=false){
	    		# 帳號已經存在
	    		return RTN::do_return("-1","ERR_ACCOUNT_REPEAT","");
	    	}
	    	
	    	# 新增至諮商師
	    	$ins = CNL_SQL::sql_ins_counselor($data[0]);
	    	if($ins==false){
	    		# 新增失敗
	    		return RTN::do_return("-1","ERR_ADD_FAIL","");
	    	}

	    	# 更新申請單狀態
	    	$upd = CNL_SQL::sql_chg_apply_status($sn, "1");
	    	if($upd==false){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_FAIL","");
	    	}	

	    	return RTN::do_return("0","SUCCESS",$ins);
	    }


	    # 申請列表 - 拒絕
	    static function do_refuse($_ARG){

	    	$sn = $_ARG["sn"];
	    	$data = CNL_SQL::sql_chg_apply_status($sn, "2");
	    	if($data==false){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_FAIL","");
	    	}

	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	}
?>
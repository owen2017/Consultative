<?php
	namespace func\counselor;
	use RTN;
	use CNL_SQL;
	use DB;
	use UIP;
	use SID;
	use CTA;
	
	class counselor{    

	    # 顯示列表
	    static function get_list($_ARG){

	    	$sn           = $_ARG["sn"];
	    	$acc          = $_ARG["acc"];
			$name         = $_ARG["name"];
			$area         = $_ARG["area"];
			$satisfaction = $_ARG["satisfaction"];
			$enable       = $_ARG["enable"];
			$page         = $_ARG["page"];
			$rows         = $_ARG["rows"];

			# 取得列表
	    	$data = CNL_SQL::sql_get_list($sn, $acc, $name, $area, $satisfaction, $enable, $page, $rows);

	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	# 取得列表資料總數
	    	$count = CNL_SQL::sql_get_list_num($sn, $acc, $name, $area, $satisfaction, $enable);
	    	if($count==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	$rtn["data"] = $data;
	    	$rtn["count"] = $count;
	    	return RTN::do_return("0","SUCCESS",$rtn);
	    }    


	    # 前台專業人員搜尋
	    static function front_do_search($_ARG){

	    	$all          = $_ARG["all"];
	    	$acc          = $_ARG["acc"];
			$name         = $_ARG["name"];
			$area         = $_ARG["area"];
			$satisfaction = $_ARG["satisfaction"];
			$specialty    = $_ARG["specialty"];
			$page         = $_ARG["page"];
			$rows         = $_ARG["rows"];

			$rtn = array();
			$rtn["data"] = array();
	    	$rtn["count"] = 0;

			# 全部欄位模糊查找
			if($all && $all!=""){
				# 取得列表
		    	$data = CNL_SQL::sql_front_get_list_all($all, $page, $rows);
		    	if($data==false){
		    		# 沒有資料
		    		return RTN::do_return("0","SUCCESS",$rtn);
		    	}
		    	# 取得列表資料總數
		    	$count = CNL_SQL::sql_front_get_list_all_num($all);
		    	if($count==false){
		    		# 沒有資料
		    		return RTN::do_return("0","SUCCESS",$rtn);
		    	}				
			}else{
				# 取得列表
		    	$data = CNL_SQL::sql_front_get_list($acc, $name, $area, $satisfaction, $specialty, $page, $rows);

		    	if($data==false){
		    		# 沒有資料
		    		return RTN::do_return("0","SUCCESS",$rtn);
		    	}

		    	# 取得列表資料總數
		    	$count = CNL_SQL::sql_front_get_list_num($acc, $name, $area, $satisfaction, $specialty);
		    	if($count==false){
		    		# 沒有資料
		    		return RTN::do_return("0","SUCCESS",$rtn);
		    	}
			}
			
			$rtn["data"] = $data;
	    	$rtn["count"] = $count;
	    	
	    	return RTN::do_return("0","SUCCESS",$rtn);
	    }

	    # 修改專業人員點擊人數
	    static function do_upd_click($_ARG){

	    	$cid = $_ARG["sn"];
	    	CNL_SQL::sql_do_upd_click($cid);
	    	$data = CNL_SQL::sql_get_list($cid, "", "", "", "", "", "", "");	    	
	    	return RTN::do_return("0","SUCCESS",$data[0]);
	    }

	    # 前台專業人員登入
	    static function front_do_login($_ARG){
	    	$account  = $_ARG["account"];
	    	$password = $_ARG["password"];
	    	$captcha  = $_ARG["captcha"];	    	

	    	$chk = CTA::do_chk($captcha);
	    	if($chk==false){
	    		# 驗證碼錯誤
	    		return RTN::do_return("-1","ERR_CAPTCHA","");
	    	}    	

	    	$data = CNL_SQL::sql_do_chk_login($account, $password);
	    	// print_r($data);
	    	if($data==false || count($data)<=0){
	    		# 帳號或密碼錯誤
	    		return RTN::do_return("-1","ERR_ACC_OR_PWD_ERROR","");
	    	}
	    	# 登入成功 -> 加密 mid
	    	$cid = $data[0]["sn"];
	    	SID::do_encode("2",$cid);
	    	$data[0]["sid"] = SID::$SID;
	    	return RTN::do_return("0","SUCCESS",$data[0]);
	    }    
	}    
?>
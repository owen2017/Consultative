<?php
	namespace func\manager;
	use RTN;
	use MAG;
	use DB;
	use SID;
	
	class manager{   

		# 登入
	    static function do_login($_ARG){
	    	$acc = $_ARG["acc"];
	    	$pwd = $_ARG["pwd"];
	    	$data = MAG::sql_get_login($acc, $pwd);
	    	if($data==false){
	    		# 帳號或密碼錯誤
	    		return RTN::do_return("-1","ERR_ACC_OR_PWD_ERROR","");
	    	}
	    	$mid = $data["mid"];
	    	# 登入成功 -> 加密 mid
	    	SID::do_encode("1",$mid);
	    	$rtn["sid"] = SID::$SID;
	    	return RTN::do_return("0","SUCCESS",$rtn);
	    }   

	    # 修改密碼
	    static function edit_pwd($_ARG){
	    	$old_pwd = $_ARG["old_pwd"];
	    	$new_pwd = $_ARG["new_pwd"];

	    	$data = MAG::sql_upd_pwd($old_pwd, $new_pwd);
	    	if($data==false){return RTN::do_return("-1","ERR_UPD_ERROR","");}
	    	return RTN::do_return("0","SUCCESS","SUCCESS");
	    }




	    #
	    #	SQL
	    #

	    # 登入-> 檢查帳密
	    static function sql_get_login($_acc, $_pwd){

	    	$sql  = " select sn as mid ";
	    	$sql .= " from manager ";
	    	$sql .= " where account='".$_acc."'";
	    	$sql .= " and password='".$_pwd."'";
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
				$ary["mid"] = $row["mid"];
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    # 檢查會員MID是否存在
	    static function sql_chk_mid($_mid){

	    	$sql  = " select count(1) as count";
	    	$sql .= " from manager ";
	    	$sql .= " where sn='".$_mid."'";
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);	    	
	    	
	    	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
				$count = $row["count"];
			}			
			if($count<=0){return false;}			
			return true;
	    }

	    # 修改管理者密碼
	    static function sql_upd_pwd($_old_pwd, $_new_pwd){

	    	$sql  = " update manager set";
	    	$sql .= " password ='".$_new_pwd."'";
	    	$sql .= " where password='".$_old_pwd."'";
	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }
	}
?>
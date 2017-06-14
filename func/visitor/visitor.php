<?php
	namespace func\visitor;
	use RTN;
	use VIR;
	use DB;
	use UIP;
	use CTA;
	use CNL_SQL;
	
	class visitor{

		# 取得列表
	    static function get_apply_list($_ARG){

	    	$acc    = $_ARG["acc"];
	    	$name   = $_ARG["name"];
	    	$status = $_ARG["status"];
	    	$page   = $_ARG["page"];
			$rows   = $_ARG["rows"];

	    	$data = VIR::sql_get_apply_list($acc, $name, $status, $page, $rows);

	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	$count = VIR::sql_get_apply_list_sum($acc, $name, $status);

	    	if($count==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	
	    	$rtn["data"] = $data;
	    	$rtn["count"] = $count;
	    	return RTN::do_return("0","SUCCESS",$rtn);
	    }

	    // 新增
	    static function do_add($_ARG){

	    	$cid          = $_ARG["sn"];
	    	$data         = $_ARG["data"];
	    	$satisfaction = $_ARG["satisfaction"];
	    	$captcha      = $_ARG["captcha"];

	    	$chk = CTA::do_chk($captcha);
	    	if($chk==false){
	    		# 驗證碼錯誤
	    		return RTN::do_return("-1","ERR_CAPTCHA","");
	    	}

	    	$col_data = CNL_SQL::sql_get_list($cid, "", "", "", "", "", "", "");
	    	if($col_data==false){
	    		# 沒有這個諮商師
	    		return RTN::do_return("-1","ERR_NO_COUNSELOR","");
	    	}

	    	$account = $col_data[0]["account"];
	    	$name    = $col_data[0]["name"];

	    	$rtn = VIR::sql_add_message($cid, $account, $name, $data, $satisfaction, "Y");
	    	if($rtn==false){
	    		# 新增失敗
	    		return RTN::do_return("-1","ERR_ADD_FAIL","");
	    	}

	    	return RTN::do_return("0","SUCCESS",array());
	    }

	    # 修改狀態
	    static function do_upd($_ARG){

	    	$sn     = $_ARG["sn"];
	    	$cid    = $_ARG["cid"];
	    	$status = $_ARG["status"];

	    	$data = VIR::sql_upd_message($sn, $cid, $status);

	    	if($data <= 0){
	    		# 修改失敗
	    		return RTN::do_return("-1","ERR_UPD_FAIL","");
	    	}
	    	
	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 刪除
	    static function do_del($_ARG){

	    	$sn  = $_ARG["sn"];
	    	$cid = $_ARG["cid"];

	    	$data = VIR::sql_del_message($sn, $cid);

	    	if($data <= 0){
	    		# 刪除失敗
	    		return RTN::do_return("-1","ERR_ADD_FAIL","");
	    	}
	    	
	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 訪問次數
	    static function do_add_visit_times(){

	    	VIR::sql_ins_visit_times();

	    	$data["num"] = VIR::sql_get_visit_times();
	    	
	    	return RTN::do_return("0","SUCCESS",$data);
	    }
	    
	    
	    #
	    #	SQL
	    #


	    # 取得列表
	    static function sql_get_apply_list($_acc, $_name, $_status, $_page, $_rows){
	    	$sql  = " select sn, cid, account, name, message, status, builttime, op_IP";
	    	$sql .= " from feedback ";
	    	$sql .= " where 1=1";
	    	if($_acc!=""){
	    		$sql .= " and account='".$_acc."'";
	    	}
	    	if($_name!=""){
	    		$sql .= " and name='".$_name."'";
	    	}
	    	if($_status!=""){
	    		$sql .= " and `status`='".$_status."'";
	    	}
	    	
	    	$sql .= " order by sn asc";

	    	if($_page!="" && $_rows!=""){
	    		$start = ($_page-1)*$_rows;
	    		$sql .= " limit ".$start.",".$_rows;
	    	}
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	    		$row["builttime"]   = date("Y-m-d H:i:s",$row["builttime"]);
	    		$row["op_IP"] 		= UIP::DeUIP($row["op_IP"]);
				$ary[] = $row;

			}			
			if(count($ary)<=0){return false;}			
			return $ary;

	    }

	    static function sql_add_message($_cid, $_account, $_name, $_data, $_satisfaction, $_status){
	    	$sql  = " insert into feedback set";
	    	$sql .= " cid='".$_cid."'";
	    	$sql .= " , account='".$_account."'";
	    	$sql .= " , name='".$_name."'";
	    	$sql .= " , satisfaction='".$_satisfaction."'";
	    	$sql .= " , message='".$_data."'";
	    	$sql .= " , status='".$_status."'";
	    	$sql .= " , builttime='".time()."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";

	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    static function sql_upd_message($_sn, $_cid, $_status){

	    	$sql  = " update feedback set";
	    	$sql .= " status='".$_status."'";    	
	    	$sql .= " where sn=".$_sn;
	    	$sql .= " and cid=".$_cid;

	    	// echo $sql;

			$result = DB::SqlQuery($sql);
			return DB::$affect;
	    } 

	    static function sql_get_apply_list_sum($_acc, $_name, $_status){
	    	$sql  = " select count(1) as count";
	    	$sql .= " from feedback ";
	    	$sql .= " where 1=1";
	    	if($_acc!=""){
	    		$sql .= " and account='".$_acc."'";
	    	}
	    	if($_name!=""){
	    		$sql .= " and name='".$_name."'";
	    	} 	
	    	if($_status!=""){
	    		$sql .= " and `status`='".$_status."'";
	    	}
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    } 

	     # 刪除訊息
	    static function sql_del_message($_sn, $_cid){
	    	$sql  = " delete from feedback ";
	    	$sql .= " where sn=".$_sn;
	    	$sql .= " and cid=".$_cid;
	    	// echo $sql;

			$result = DB::SqlQuery($sql);
			return DB::$affect;
	    }

	    # 新增訪問次數
	    static function sql_ins_visit_times(){
	    	$sql  = " insert into visitor set";
	    	$sql .= " time=".time()."";
	    	$sql .= " , ip='".UIP::$UIP."'";

	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    # 新增訪問次數
	    static function sql_get_visit_times(){
	    	$sql  = " select count(1) as count from visitor where 1=1";
	    	// echo $sql;
	    	$result = DB::SqlQuery($sql);
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    }

	   
	}
?>
<?php
	namespace func\bulletin;
	use RTN;
	use BB;
	use DB;
	use UIP;
	use SID;

	class bulletin{   

		# 公告列表
		static function get_list($_ARG){

			$sn     = $_ARG["sn"];
			$enable = $_ARG["enable"];
			$page   = $_ARG["page"];
			$rows   = $_ARG["rows"];

			$list = BB::sql_get_bulletin($sn, $enable, $page, $rows);
			if($list==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}

	    	return RTN::do_return("0","SUCCESS",$list);
		}

		# 新增公告
		static function do_add($_ARG){

	    	$title      = $_ARG["title"];
	    	$content    = $_ARG["content"];
	    	$enable     = $_ARG["enable"];
	    	$remark     = $_ARG["remark"];

	    	$title   = str_replace( "'", "''", $title);
	    	$content = str_replace( "'", "''", $content);

	    	$sn = BB::sql_add_bulletin($title, $content, $enable, $remark);
	    	if($sn <= 0){
	    		# 新增公告失敗
	    		return RTN::do_return("-1","ERR_ADD_FAIL","");
	    	}
	    	
	    	return RTN::do_return("0","SUCCESS","");
	    } 

	    # 修改公告
		static function do_upd($_ARG){

	    	$sn      = $_ARG["sn"];
	    	$title   = $_ARG["title"];
	    	$content = $_ARG["content"];
	    	$enable  = $_ARG["enable"];
	    	$remark  = $_ARG["remark"];

	    	$title   = str_replace( "'", "''", $title);
	    	$content = str_replace( "'", "''", $content);

	    	$_sn = BB::sql_upd_bulletin($sn, $title, $content, $enable, $remark);
	    	if($_sn <= 0){
	    		# 新增失敗
	    		return RTN::do_return("-1","ERR_UPD_FAIL","");
	    	}
	    	
	    	return RTN::do_return("0","SUCCESS","");
	    }  

	    # 刪除公告
		static function do_del($_ARG){

	    	$sn = $_ARG["sn"];

	    	$data = BB::sql_del_bulletin($sn);
	    	if($data <= 0){
	    		# 刪除失敗
	    		return RTN::do_return("-1","ERR_DEL_FAIL","");
	    	}
	    	
	    	return RTN::do_return("0","SUCCESS",$data);
	    } 

	    #
	    #	SQL
	    #

	    # 公告列表
	    static function sql_get_bulletin($_sn, $_enable, $_page, $_rows){

	    	$sql  = " select sn, title, content, enable, build_time, remark, op_IP";
	    	$sql .= " from bulletin ";
	    	$sql .= " where 1=1 ";
	    	if($_sn!=""){
	    		$sql .= " and sn='".$_sn."'";	
	    	}
	    	if($_enable!=""){
	    		$sql .= " and enable='".$_enable."'";	
	    	}

	    	$sql .= " order by `sn` desc";

	    	if($_page!="" && $_rows!=""){
	    		$start = ($_page-1)*$_rows;
	    		$sql .= " limit ".$start.",".$_rows;
	    	}
	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	    		$row["build_time"] = date("Y-m-d H:i:s",$row["build_time"]);
	    		$row["op_IP"] = UIP::DeUIP($row["op_IP"]);
				$ary["_".$row["sn"]] = $row;
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    # 新增公告
	    static function sql_add_bulletin($_title, $_content, $_enable, $_remark){

	    	$sql  = " insert into bulletin set";
	    	$sql .= " title='".$_title."'";
	    	$sql .= " , content='".$_content."'";
	    	$sql .= " , enable='".$_enable."'";
	    	$sql .= " , remark='".$_remark."'";
	    	$sql .= " , build_time='".time()."'";
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";
	    	// echo $sql;

			$result = DB::SqlQuery($sql);
			return DB::$affect;
	    }	   

	    # 修改公告
	    static function sql_upd_bulletin($_sn, $_title, $_content, $_enable, $_remark){

	    	$sql  = " update bulletin set";
	    	$sql .= " title='".$_title."'";
	    	$sql .= " , content='".$_content."'";
	    	$sql .= " , enable='".$_enable."'";
	    	$sql .= " , remark='".$_remark."'";
	    	$sql .= " , build_time='".time()."'";
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";
	    	$sql .= " where sn=".$_sn;

	    	// echo $sql;

			$result = DB::SqlQuery($sql);
			return DB::$affect;
	    }

	    # 刪除公告
	    static function sql_del_bulletin($_sn){

	    	$sql  = " delete from bulletin ";
	    	$sql .= " where sn=".$_sn;
	    	// echo $sql;

			$result = DB::SqlQuery($sql);
			return DB::$affect;
	    } 
	}
?>
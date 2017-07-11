<?php
	namespace func\counselor;
	use RTN;
	use DB;
	use UIP;
	use SID;
	use CTA;
	
	class counselor_sql{
	  
	  	# 申請列表
	    static function sql_get_apply_list($_sn, $_status, $_page="", $_rows=""){

	    	$sql  = " select * ";
	    	$sql .= " from counselor_apply ";
	    	$sql .= " where 1=1";
	    	if($_sn!==false){
	    		$sql .= " and sn='".$_sn."'";
	    	}
	    	if($_status!==false){
	    		$sql .= " and status='".$_status."'";
	    	}
	    	if($_page!="" && $_rows!=""){
	    		$start = ($_page-1)*$_rows;
	    		$sql .= " limit ".$start.",".$_rows;
	    	}
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row;
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    static function sql_get_apply_list_num($_status){

	    	$sql  = " select count(1) as count ";
	    	$sql .= " from counselor_apply ";
	    	$sql .= " where 1=1";
	    	
	    	if($_status!==false){
	    		$sql .= " and status='".$_status."'";
	    	}

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = @mysqli_fetch_array($result, MYSQL_ASSOC);

			if($row["count"]<=0){return false;}		
				
			return $row["count"];
	    }

	    # 申請列表 - 新增
	    static function sql_ins_counselor_apply($_account,$_password,$_name,$_gender,$_identity,$_identity_yes,$_mobile,$_phone,$_email,$_area,$_office_time,$_office_area,$_job,$_service_area,$_serviceobj,$_serviceLimit,$_charges,$_fee,$_seniority,$_training,$_experience,$_case_times,$_education,$_license,$_license_num,$_specialty,$_idea1,$_idea2){

	    	$sql  = " insert into counselor_apply set";	    		    	
	    	$sql .= " account='".$_account."'";
	    	$sql .= " , password='".$_password."'";
	    	$sql .= " , name='".$_name."'";
	    	$sql .= " , gender='".$_gender."'";
	    	$sql .= " , identity='".$_identity."'";
	    	$sql .= " , identity_yes='".$_identity_yes."'";
	    	$sql .= " , mobile='".$_mobile."'";
	    	$sql .= " , phone='".$_phone."'";
	    	$sql .= " , email='".$_email."'";
	    	$sql .= " , area='".$_area."'";
	    	$sql .= " , office_time='".$_office_time."'";
	    	$sql .= " , office_area='".$_office_area."'";
	    	$sql .= " , job='".$_job."'";
	    	$sql .= " , service_area='".$_service_area."'";
	    	$sql .= " , serviceobj='".$_serviceobj."'";
	    	$sql .= " , serviceLimit='".$_serviceLimit."'";
	    	$sql .= " , charges='".$_charges."'";
	    	$sql .= " , fee='".$_fee."'";
	    	$sql .= " , seniority='".$_seniority."'";
	    	$sql .= " , training='".$_training."'";
	    	$sql .= " , experience='".$_experience."'";
	    	$sql .= " , case_times='".$_case_times."'";
	    	$sql .= " , education='".$_education."'";
	    	$sql .= " , license='".$_license."'";
	    	$sql .= " , license_num='".$_license_num."'";
	    	$sql .= " , specialty='".$_specialty."'";
	    	$sql .= " , idea1='".$_idea1."'";
	    	$sql .= " , idea2='".$_idea2."'";	    	
	    	$sql .= " , apply_time=".time();
	    	$sql .= " , approve_time=0";
	    	$sql .= " , `status`=0";
	    	$sql .= " , op=0";
	    	$sql .= " , op_IP=".UIP::$UIP;
	    	// echo $sql."<br>";

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;

	    }

	    # 申請列表 - 修改狀態
	    static function sql_chg_apply_status($_sn, $_status){

	    	$sql  = " update counselor_apply set";
	    	$sql .= " status ='".$_status."'";
	    	$sql .= " , approve_time=".time();
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";
	    	$sql .= " where sn='".$_sn."'";
	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    // 檢查資料是否重複
	    static function sql_chk_counselor($_type,$_data){
	    	
	    	$sql  = " select count(1) as count";
	    	$sql .= " from counselor ";
	    	$sql .= " where $_type='".$_data."'";
	    		    	
	    	// echo $sql."<br>";

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = @mysqli_fetch_array($result, MYSQL_ASSOC);

			if($row["count"]<=0){return false;}		
				
			return $row["count"];
	    }

	    # 新增至專業人員
	    static function sql_ins_counselor($_data){
	    	$sql  = " insert into counselor set";	    		    	
	    	$sql .= " account='".$_data["account"]."'";
	    	$sql .= " , password='".$_data["password"]."'";
	    	$sql .= " , name='".$_data["name"]."'";
	    	$sql .= " , gender='".$_data["gender"]."'";
	    	$sql .= " , identity='".$_data["identity"]."'";
	    	$sql .= " , identity_yes='".$_data["identity_yes"]."'";
	    	$sql .= " , mobile='".$_data["mobile"]."'";
	    	$sql .= " , phone='".$_data["phone"]."'";
	    	$sql .= " , email='".$_data["email"]."'";
	    	$sql .= " , area='".$_data["area"]."'";
	    	$sql .= " , office_time='".$_data["office_time"]."'";
	    	$sql .= " , office_area='".$_data["office_area"]."'";
	    	$sql .= " , job='".$_data["job"]."'";
	    	$sql .= " , service_area='".$_data["service_area"]."'";
	    	$sql .= " , serviceobj='".$_data["serviceobj"]."'";
	    	$sql .= " , serviceLimit='".$_data["serviceLimit"]."'";
	    	$sql .= " , charges='".$_data["charges"]."'";
	    	$sql .= " , fee='".$_data["fee"]."'";
	    	$sql .= " , seniority='".$_data["seniority"]."'";
	    	$sql .= " , training='".$_data["training"]."'";
	    	$sql .= " , experience='".$_data["experience"]."'";
	    	$sql .= " , case_times='".$_data["case_times"]."'";
	    	$sql .= " , education='".$_data["education"]."'";
	    	$sql .= " , license='".$_data["license"]."'";
	    	$sql .= " , license_num='".$_data["license_num"]."'";
	    	$sql .= " , specialty='".$_data["specialty"]."'";
	    	$sql .= " , idea1='".$_data["idea1"]."'";
	    	$sql .= " , idea2='".$_data["idea2"]."'";	  
	    	$sql .= " , satisfaction=1";
			$sql .= " , click=0"; 
			$sql .= " , remark=''";
			$sql .= " , enable='Y'";
	    	$sql .= " , apply_time=".$_data["apply_time"];
	    	$sql .= " , approve_time=".time();
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP=".UIP::$UIP;
	    	// echo $sql;
	  
	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    # 取得列表
	    static function sql_get_list($_sn, $_acc, $_name, $_area, $_satisfaction, $_enable, $_page, $_rows){

	    	$sql  = " select *";
	    	$sql .= " from counselor ";
	    	$sql .= " where 1=1";
	    	if($_sn!=""){
	    		$sql .= " and sn='".$_sn."'";
	    	}
	    	if($_acc!=""){
	    		$sql .= " and account='".$_acc."'";
	    	}
	    	if($_name!=""){
	    		$sql .= " and name='".$_name."'";
	    	}
	    	if($_area!=""){
	    		$sql .= " and area like '%".$_area."%'";
	    	}
	    	if($_satisfaction!=""){
	    		$sql .= " and satisfaction='".$_satisfaction."'";
	    	}
	    	if($_enable!=""){
	    		$sql .= " and enable='".$_enable."'";
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
				$ary[] = $row;
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    } 

	    # 取得列表總數
	    static function sql_get_list_num($_sn, $_acc, $_name, $_area, $_satisfaction, $_enable){

	    	$sql  = " select count(1) as count";
	    	$sql .= " from counselor ";
	    	$sql .= " where 1=1";
	    	if($_sn!=""){
	    		$sql .= " and sn='".$_sn."'";
	    	}
	    	if($_acc!=""){
	    		$sql .= " and account='".$_acc."'";
	    	}
	    	if($_name!=""){
	    		$sql .= " and name='".$_name."'";
	    	}
	    	if($_area!=""){
	    		$sql .= " and area like '%".$_area."%'";
	    	}
	    	if($_satisfaction!=""){
	    		$sql .= " and satisfaction='".$_satisfaction."'";
	    	}
	    	if($_enable!=""){
	    		$sql .= " and enable='".$_enable."'";
	    	}	    	

	    	$sql .= " order by sn asc";
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    }

	    # 修改專業人員資料	   
	   	static function sql_do_upd($_sn, $_password, $_area, $_specialty, $_license, $_seniority, $_mobile, $_email, $_address, $_satisfaction, $_enable){
	   		
	    	$sql  = " update counselor set ";
	    	$sql .= " op='".SID::$MID."'";
			$sql .= " , op_IP='".UIP::$UIP."'";

	    	if($_password && $_password!==false){
	    		$sql .= " ,password ='".$_password."'";
	    	}
	    	if($_area && $_area!==false){
	    		$sql .= " ,area ='".$_area."'";
	    	}
	    	if($_specialty && $_specialty!==false){
	    		$sql .= " ,specialty ='".$_specialty."'";
	    	}
	    	if($_license && $_license!==false){
	    		$sql .= " ,license ='".$_license."'";
	    	}
	    	if($_seniority && $_seniority!==false){
	    		$sql .= " ,seniority ='".$_seniority."'";
	    	}
	    	if($_mobile && $_mobile!==false){
	    		$sql .= " ,mobile ='".$_mobile."'";
	    	}
	    	if($_email && $_email!==false){
	    		$sql .= " ,email ='".$_email."'";
	    	}
	    	if($_address && $_address!==false){
	    		$sql .= " ,address ='".$_address."'";
	    	}
	    	if($_satisfaction && $_satisfaction!==false){
	    		$sql .= " ,satisfaction ='".$_satisfaction."'";
	    	}   
	    	if($_enable && $_enable!==false){
	    		$sql .= " ,enable ='".$_enable."'";
	    	}   	
	    	
	    	$sql .= " where sn='".$_sn."'";
	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    # 取得申請修改列表
	    static function sql_get_modify_apply_list($_sn, $_acc, $_status, $_page, $_rows){
	    	
	    	$sql  = " select sn, mid, account, `type`, oldData, newData , status";
	    	$sql .= " from counselor_modify_apply ";
	    	$sql .= " where 1=1";
	    	if($_acc!=""){
	    		$sql .= " and account='".$_acc."'";
	    	}	

	    	if($_sn!=""){
	    		$sql .= " and sn='".$_sn."'";
	    	}	    	
	    	
	    	$sql .= " and status='".$_status."'";
	    	
	    	$sql .= " order by sn asc";

	    	if($_page!="" && $_rows!=""){
	    		$start = ($_page-1)*$_rows;
	    		$sql .= " limit ".$start.",".$_rows;
	    	}
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
				$ary[] = $row;
			}
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    # 取得申請修改列表總數
	    static function sql_get_modify_apply_list_num($_acc, $_status, $_page, $_rows){

	    	$sql  = " select count(1) as count";
	    	$sql .= " from counselor_modify_apply ";
	    	$sql .= " where 1=1";
	    	if($_acc!=""){
	    		$sql .= " and account='".$_acc."'";
	    	}	    	

	    	$sql .= " and status='".$_status."'";
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    }

	    # 修改 專業人員修改申請狀態
	    static function sql_upd_modify_apply_status($_sn, $_status){
	    	
	    	$sql  = " update counselor_modify_apply set";
	    	if($_status && $_status!==false){
	    		$sql .= " status ='".$_status."'";
	    	}
	    	
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";
	    	$sql .= " where sn='".$_sn."'";
	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }	

		# 取得列表
	    static function sql_front_get_list($_acc, $_name, $_area, $_satisfaction, $_specialty, $_page, $_rows){

	    	$sql  = " select sn, name, area, specialty, license, mobile, email, satisfaction";
	    	$sql .= " from counselor ";
	    	$sql .= " where 1=1";
	    	if($_acc!=""){
	    		$sql .= " and account like '%".$_acc."%'";
	    	}
	    	if($_name!=""){
	    		$sql .= " and name like '%".$_name."%'";
	    	}
	    	if($_area!=""){
	    		$ary = array();
	    		$str = "(";
	    		$area = explode(",", $_area);
	    		foreach ($area as $key => $value) {
	    			$ary[] = "area like '%".$value."%'";	
	    		}	
	    		$str .= join(" or ",$ary);
	    		$str .= ")";
	    		$sql .= " and ".$str."";
	    	}
	    	if($_satisfaction!=""){
	    		$sql .= " and satisfaction='".$_satisfaction."'";
	    	}else{
	    		$sql .= " and satisfaction>=1";
	    	}
	    	if($_specialty!=""){
	    		$sql .= " and specialty like '%".$_specialty."%'";
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
	    		
	    		$de_specialty = json_decode($row["specialty"], true);	    		
	    		$row["area"] = $row["area"];
				$ary[] = $row;

			}
			
			if(count($ary)<=0){return false;}			
			return $ary;
	    } 

	    # 取得列表總數
	    static function sql_front_get_list_num($_acc, $_name, $_area, $_satisfaction, $_specialty){

	    	$sql  = " select count(1) as count";
	    	$sql .= " from counselor ";
	    	$sql .= " where 1=1";
	    	if($_acc!=""){
	    		$sql .= " and account like '%".$_acc."%'";
	    	}
	    	if($_name!=""){
	    		$sql .= " and name like '%".$_name."%'";
	    	}
	    	if($_area!=""){
	    		// $_area = str_replace(",", "|", $_area);	    		
	    		// $sql .= " and area regexp '".$_area."'";
	    		$ary = array();
	    		$str = "(";
	    		$area = explode(",", $_area);
	    		foreach ($area as $key => $value) {
	    			$ary[] = "area like '%".$value."%'";	
	    		}	
	    		$str .= join(" or ",$ary);
	    		$str .= ")";
	    		$sql .= " and ".$str."";
	    	}
	    	if($_satisfaction!=""){
	    		$sql .= " and satisfaction='".$_satisfaction."'";
	    	}else{
	    		$sql .= " and satisfaction>=1";
	    	}
	    	if($_specialty!=""){
	    		$sql .= " and specialty like '%".$_specialty."%'";
	    	}	    		    	

	    	// $sql .= " order by sn asc";
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    }

	    # 取得列表 - 全部搜尋
	    static function sql_front_get_list_all($_all, $_page, $_rows){

	    	$sql  = " select sn, name, area, specialty, license, mobile, email, satisfaction";
	    	$sql .= " from counselor ";
	    	$sql .= " where (account like '%".$_all."%'";
	    	$sql .= " or name like '%".$_all."%'";
	    	$sql .= " or gender like '%".$_all."%'";
	    	$sql .= " or identity like '%".$_all."%'";
	    	$sql .= " or identity_yes like '%".$_all."%'";
	    	$sql .= " or mobile like '%".$_all."%'";
	    	$sql .= " or phone like '%".$_all."%'";
	    	$sql .= " or email like '%".$_all."%'";
	    	$sql .= " or area like '%".$_all."%'";
	    	$sql .= " or office_time like '%".$_all."%'";
	    	$sql .= " or office_area like '%".$_all."%'";
	    	$sql .= " or job like '%".$_all."%'";
	    	$sql .= " or service_area like '%".$_all."%'";
	    	$sql .= " or serviceobj like '%".$_all."%'";
	    	$sql .= " or serviceLimit like '%".$_all."%'";
	    	$sql .= " or charges like '%".$_all."%'";
	    	$sql .= " or fee like '%".$_all."%'";
	    	$sql .= " or seniority like '%".$_all."%'";
	    	$sql .= " or training like '%".$_all."%'";
	    	$sql .= " or experience like '%".$_all."%'";
	    	$sql .= " or case_times like '%".$_all."%'";
	    	$sql .= " or education like '%".$_all."%'";
	    	$sql .= " or license like '%".$_all."%'";
	    	$sql .= " or license_num like '%".$_all."%'";
	    	$sql .= " or specialty like '%".$_all."%')";	    	
	    	$sql .= " and enable ='Y'";	    	

	    	$sql .= " order by sn asc";

	    	if($_page!="" && $_rows!=""){
	    		$start = ($_page-1)*$_rows;
	    		$sql .= " limit ".$start.",".$_rows;
	    	}
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	    		
	    		$de_specialty = json_decode($row["specialty"], true);	    		
	    		$row["area"] = $row["area"];
				$ary[] = $row;

			}
			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    # 取得列表總數 - 全部搜尋
	    static function sql_front_get_list_all_num($_all){

	    	$sql  = " select count(1) as count";
	    	$sql .= " from counselor ";
	    	$sql .= " where (account like '%".$_all."%'";
	    	$sql .= " or name like '%".$_all."%'";
	    	$sql .= " or gender like '%".$_all."%'";
	    	$sql .= " or identity like '%".$_all."%'";
	    	$sql .= " or identity_yes like '%".$_all."%'";
	    	$sql .= " or mobile like '%".$_all."%'";
	    	$sql .= " or phone like '%".$_all."%'";
	    	$sql .= " or email like '%".$_all."%'";
	    	$sql .= " or area like '%".$_all."%'";
	    	$sql .= " or office_time like '%".$_all."%'";
	    	$sql .= " or office_area like '%".$_all."%'";
	    	$sql .= " or job like '%".$_all."%'";
	    	$sql .= " or service_area like '%".$_all."%'";
	    	$sql .= " or serviceobj like '%".$_all."%'";
	    	$sql .= " or serviceLimit like '%".$_all."%'";
	    	$sql .= " or charges like '%".$_all."%'";
	    	$sql .= " or fee like '%".$_all."%'";
	    	$sql .= " or seniority like '%".$_all."%'";
	    	$sql .= " or training like '%".$_all."%'";
	    	$sql .= " or experience like '%".$_all."%'";
	    	$sql .= " or case_times like '%".$_all."%'";
	    	$sql .= " or education like '%".$_all."%'";
	    	$sql .= " or license like '%".$_all."%'";
	    	$sql .= " or license_num like '%".$_all."%'";
	    	$sql .= " or specialty like '%".$_all."%')";	
	    	$sql .= " and enable ='Y'";	
	    	
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    }

	    static function sql_do_upd_click($_sn){
	    	$sql  = " update counselor set";	    		    	
	    	$sql .= " `click`=(`click`+1)";
	    	$sql .= " where sn='".$_sn."'";
	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;	
	    }

	    static function sql_do_chk_login($_account, $_password){
	    	$sql  = " select *";
	    	$sql .= " from counselor ";
	    	$sql .= " where account = '".$_account."'";
	    	$sql .= " and password = '".$_password."'";
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	    		// unset($row["password"]);
				$ary[] = $row;

			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    static function sql_ins_modify_apply($_type, $_account, $_oldData, $_newData, $_cid){
	    	$sql  = "insert into counselor_modify_apply set";
	    	$sql .= " mid =".$_cid;
	    	$sql .= " , account ='".$_account."'";
	    	$sql .= " , `type` ='".$_type."'";
	    	$sql .= " , oldData ='".$_oldData."'";
	    	$sql .= " , newData ='".$_newData."'";
	    	$sql .= " , `status` =0 ";
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";

	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    static function sql_chk_modify_repeat($_cid, $_type){
	    	$sql  = " select count(1) as count";
	    	$sql .= " from counselor_modify_apply ";
	    	$sql .= " where mid = ".$_cid;
	    	$sql .= " and type = '".$_type."'";
	    	$sql .= " and status = 0";
	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);	    	
	    	
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
	    	$count = $row["count"];
			if($count<=0){return false;}			
			return $count;
	    }
	    
	    static function sql_do_upd_modify($_mid, $_type, $_oldData, $_newData){
	    	$sql  = " update counselor set";	    		    	
	    	$sql .= " `$_type`='".$_newData."'";
	    	$sql .= " where sn='".$_mid."'";
	    	$sql .= " and `$_type`='".$_oldData."'";
	    	// echo $sql;
	    	
	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;	
	    }

	    static function sql_log_back_changed($_cid, $_type, $_oldData, $_newData){
	    	$sql  = "insert into log_back_changed set";
	    	$sql .= " cid =".$_cid;
	    	$sql .= " , `type` ='".$_type."'";
	    	$sql .= " , oldData ='".$_oldData."'";
	    	$sql .= " , newData ='".$_newData."'";
	    	$sql .= " , builttime ='".time()."'";
	    	$sql .= " , op='".SID::$MID."'";
	    	$sql .= " , op_IP='".UIP::$UIP."'";

	    	// echo $sql;

	    	$result = DB::SqlQuery($sql);
	    	if(DB::$affect<=0){return false;}
	 		return true;
	    }

	    # 忘記密碼 - 依帳號取得信箱
	    static function sql_get_email($_account, $_email){
	    	$sql  = " select account, password, email";
	    	$sql .= " from counselor";
	    	$sql .= " where account='".$_account."'";

	    	// echo $sql;	    	

			$result =  DB::SqlQuery($sql);	    	
	    	
	    	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
			if(count($row)<=0){return false;}			
			return $row;
	    }

	}
?>
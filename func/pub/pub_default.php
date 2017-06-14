<?php  
	namespace func\pub;
	use RTN;
	use DEF;
	use DB;
	class pub_default{	

		# 取得全部預設資料
	    static function get_all_def(){

	    	$data["area"]        = DEF::sql_get_area_def();
	    	$data["specialty"]   = DEF::sql_get_specialty_def();
	    	$data["license"]     = DEF::sql_get_license_def();
	    	$data["serviceobj"]  = DEF::sql_get_serviceobj_def();
	    	$data["office_area"] = DEF::sql_get_office_area_def();
	    	$data["training"]    = DEF::sql_get_training_def();

	    	return RTN::do_return("0","SUCCESS",$data);
	    } 

	    # 取得地區預設資料
	    static function get_area_def(){
	    	$data = DEF::sql_get_area_def();
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 取得專長預設資料
	    static function get_specialty_def(){
	    	$data = DEF::sql_get_specialty_def();
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	return RTN::do_return("0","SUCCESS",$data);
	    } 

	    # 取得證照預設資料
	    static function get_license_def(){
	    	$data = DEF::sql_get_license_def();
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	return RTN::do_return("0","SUCCESS",$data);
	    } 

	    # 取得服務人員預設資料
	    static function get_serviceobj_def(){
	    	$data = DEF::sql_get_serviceobj_def();
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 取得工作地點
	    static function get_office_area_def(){
	    	$data = DEF::sql_get_office_area_def();
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    # 取得訓練
	    static function get_training_def(){
	    	$data = DEF::sql_get_training_def();
	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_DATA","");
	    	}
	    	return RTN::do_return("0","SUCCESS",$data);
	    }

	    static function sql_get_area_def(){
	    	$sql  = " select area, city";
	    	$sql .= " from config_city";
	    	$sql .= " where 1=1";

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row;
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    static function sql_get_specialty_def(){
	    	$sql  = " select specialty";
	    	$sql .= " from config_specialty";
	    	$sql .= " where 1=1";

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row["specialty"];
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

		static function sql_get_license_def(){
	    	$sql  = " select license";
	    	$sql .= " from config_license";
	    	$sql .= " where 1=1";

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row["license"];
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    static function sql_get_serviceobj_def(){
	    	$sql  = " select serviceobj";
	    	$sql .= " from config_serviceobj";
	    	$sql .= " where 1=1";

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row["serviceobj"];
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    static function sql_get_office_area_def(){
	    	$sql  = " select office";
	    	$sql .= " from config_office_area";
	    	$sql .= " where 1=1";

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row["office"];
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }

	    static function sql_get_training_def(){
	    	$sql  = " select training";
	    	$sql .= " from config_training";
	    	$sql .= " where 1=1";

	    	// echo $sql;

	    	$result =  DB::SqlQuery($sql);
	    	
	    	$ary = array();
	    	while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {	    		
				$ary[] = $row["training"];
			}			
			if(count($ary)<=0){return false;}			
			return $ary;
	    }



	   
	    	
	    
	}
?>
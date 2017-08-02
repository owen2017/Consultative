<?php
	# DB型態
	namespace func\config;

	use DB;

	class config_db{   
	    protected static $link;
	    # 影響列數
	    static $affect;

	    # 連線
	    static function connection(){  
	    	static::$link = mysqli_connect("127.0.0.1", "company", "1q2w3e4r", "company", "3306") or die('connection');  
	    	mysqli_set_charset(static::$link,"utf8");
	    }

	   
	    static function SqlQuery($_sql){
	    	$result = DB::$link->query($_sql);
	    	static::$affect = mysqli_affected_rows(static::$link);
	    	return $result;
	    }
	    
	}
?>
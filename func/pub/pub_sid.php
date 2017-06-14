<?php  
	namespace func\pub;
	use SID;
	use MAG;
	use CNL_SQL;
	class pub_sid{	

		static $SID;
		static $LEVEL;
		static $MID;
		static $TIME;

		# 加密MID
	    static function do_encode($_level, $_mid){
	    	$len1 = rand("1","3");
	    	$mid_len = strlen($_mid);
	    	$str1 = rand(pow(10,$len1-1),(pow(10,$len1)-1));
	    	$str2 = rand(pow(10,$len1-1),(pow(10,$len1)-1));
	    	$sid = $len1.$_level.$mid_len.$str1.$_mid.$str2.time();
	    	$len2 = strlen($sid);
	    	$len3 = 30-$len2;
	    	for($i=1;$i<=$len3;$i++){
	    		$sid .= rand("0","9");
	    	}	    	
	    	$sid_len = strlen($sid);
	    	SID::$SID = $sid;

	    	// echo "sid = $sid \n";
	    	// echo "level = $_level \n";
	    	// echo "mid   = $_mid \n";
	    	// echo "time   = ".time()." \n";	    	
	    	// SID::do_decode($sid);
	    }   

	    # 解密SID
	    static function do_decode($_sid){ 
	    	$len        = substr($_sid,0,1);
	    	$level      = substr($_sid,1,1);
	    	$mid_len    = substr($_sid,2,1);
	    	$mid        = substr($_sid,(3+$len),$mid_len);
	    	$time       = substr($_sid,(3+$len*2+$mid_len),10);
	    	// echo "level = $level \n";
	    	// echo "mid   = $mid \n";
	    	// echo "time  = $time \n";
	    	SID::$LEVEL = $level;
	    	SID::$MID   = $mid;
	    	SID::$TIME  = $time;
	    }

	    # 檢查SID
	    static function do_chk_sid($_sid){

	    	$sid_len = strlen($_sid);
	    	if($sid_len!=30){return false;}

	    	SID::do_decode($_sid);

	    	if(SID::$LEVEL!="1" && SID::$LEVEL!="2"){return false;}

	    	if((time()-SID::$TIME)>3600){return "overtime";}

	    	if(SID::$LEVEL=="1"){
	    		if(MAG::sql_chk_mid(SID::$MID)==false){return false;}
	    	}
	    	else if(SID::$LEVEL=="2"){
	    		if(CNL_SQL::sql_get_list_num(SID::$MID, "", "", "", "", "")==false){return false;}
	    	}else{
	    		return false;
	    	}
	    	
	    }
	}
?>
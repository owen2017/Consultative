<?php
	# DB型態
	namespace func\config;

	use UIP;
	class config_ip{   

	    static $IP;
	    static $UIP;

	    # 取得會員IP / UIP
	    static function SetUIP(){
			$ip = $_SERVER['REMOTE_ADDR'];
			if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
			  //存在的話將HTTP_X_FORWARDED_FOR拆解取出第一個IP即可
			  $proxy_ip = split(',',$_SERVER['HTTP_X_FORWARDED_FOR']);
			  $ip = $proxy_ip[0];
			}

			static::$IP = $ip;

		    $iparr = explode('.','0'.$ip);

		    $uip = 0;
		    for($i=0;$i<count($iparr);$i++){
		        $uip += intval($iparr[$i]) * pow(256,count($iparr)-($i+1));
		    }		    
			
			static::$UIP = $uip;
		}

		# UIP 解碼
		static function DeUIP($_uip){
			return long2ip($_uip);
		}
	}
?>
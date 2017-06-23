<?php
	namespace func\counselor;
	use RTN;
	// use MAIL;
	use CNL_SQL;
	require_once('../func/pub/pub_mail.php');
	class counselor_forget{    

	    # 忘記密碼
	    static function forget_password($_ARG){

	    	$account = $_ARG["account"];   	
	    	$email   = $_ARG["email"];   	

			# 忘記密碼 - 依帳號取得信箱
	    	$data = CNL_SQL::sql_get_email($account, $email);

	    	if($data==false){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_NO_ACCOUNT","");
	    	}

	    	if($data["email"] && $data["email"]!=$email){
	    		# 沒有資料
	    		return RTN::do_return("-1","ERR_ERROR_EMAIL","");
	    	}

	    	$email    = $data["email"];
	    	$password = $data["password"];

	    	$sender  = "同志諮商專業人員網";
	    	$title   = "忘記密碼";
	    	$content = "您的密碼為 : ".$password;

	    	do_send_mail($email, $sender, $title, $content);
	    	
	    	return RTN::do_return("0","SUCCESS",array());
	    }
	    
	}    
?>
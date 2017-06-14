<?php
	if($_GET){
		// if($_GET["try"] != "dgo856"){
		// 	echo "<script language='javascript'>document.location.href='https://www.google.com.tw';</script>";
		// 	exit;
		// }
		// $ARG=$_GET;
		exit();
	}else{
		$ARG = json_decode(file_get_contents("php://input"),true);
		$ARG =(!$ARG)?$_POST:$ARG;
	}

	$cmd = $ARG["cmd"];
	$sid = $ARG["sid"];
	
	require("../func/config/config.php");

	if($cmd!="1,1" && $cmd!="2,4" && $cmd!="2,16" && $cmd!="2,13" && $cmd!="2,20" && $cmd!="3,2" && $cmd!="4,1" && $cmd!="3,5" && $cmd!="5,1"){
		$chk = SID::do_chk_sid($sid);
		if($chk===false){echo RTN::do_return("-1","ERR_SID_ERROR","");exit;}
		if($chk==="overtime"){echo RTN::do_return("-1","ERR_SID_OVER_TIME","");exit;}
		
	}

	$cmd = explode(",", $cmd);

	switch($cmd[0]){		
		case 1:
			# 管理者		
	       	require("gateway_manager.php");
	        break;
	    case 2:
			# 諮商師	 
			require("gateway_counselor.php");      	
	        break;
 		case 3:
			# 訪客
	       	require("gateway_visitor.php");
	        break;
	    case 4:
			# 公告
	       	require("gateway_bulletin.php");
	        break; 
	    case 5:
			# 設定
	       	require("gateway_default.php");
	        break; 	   

	    default:
	    	break;
	}






?>
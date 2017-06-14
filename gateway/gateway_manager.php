<?php

	switch($cmd[1]){	
		# 管理者登入	
		case 1:
			echo MAG::do_login($ARG);
	        break;

	    # 諮商師登入
	    case 2:	       
			echo MAG::edit_pwd($ARG);
	        break;    

	    default:
	    	break;
	}






?>
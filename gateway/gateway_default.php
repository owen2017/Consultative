<?php

	switch($cmd[1]){	
		# 取得全部預設資料
		case 1:			
			echo DEF::get_all_def();
	        break;

	    # 取得地區預設資料
	    case 2:
	    	echo DEF::get_area_def();
	        break;

	    # 取得專長預設資料
	    case 3:	    
			echo DEF::get_specialty_def();
	        break;

	    # 取得證照預設資料
	    case 4:	     
			echo DEF::get_license_def();
	        break;

	    # 取得服務人員預設資料
	    case 5:	     
			echo DEF::get_serviceobj_def();
	        break;

	    default:
	    	break;
	}






?>
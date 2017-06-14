<?php

	switch($cmd[1]){	
		# 列表
		case 1:			
			echo BB::get_list($ARG);
	        break;

	    # 新增
	    case 2:
	    	echo BB::do_add($ARG);
	        break;

	    # 修改
	    case 3:	    
			echo BB::do_upd($ARG);
	        break;

	    # 刪除
	    case 4:	     
			echo BB::do_del($ARG);
	        break;

	    default:
	    	break;
	}






?>
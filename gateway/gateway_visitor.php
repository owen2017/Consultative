<?php

	switch($cmd[1]){	
		# 列表
		case 1:			
			echo VIR::get_apply_list($ARG);
	        break;

	    # 新增
	    case 2:
	    	echo VIR::do_add($ARG);
	        break;

	    # 修改狀態
	    case 3:	    
			echo VIR::do_upd($ARG);
	        break;

	    # 刪除
	    case 4:	     
			echo VIR::do_del($ARG);
	        break;

	    # 訪問次數
	    case 5:	     
			echo VIR::do_add_visit_times();
	        break;

	    default:
	    	break;
	}






?>
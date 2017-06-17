<?php

	switch($cmd[1]){	
		# 申請列表
		case 1:			
			echo CNL_APPLY::get_apply_list($ARG);
	        break;

	    # 申請列表 - 核准
	    case 2:
	    	echo CNL_APPLY::do_approve($ARG);
	        break;

	    # 申請列表 - 拒絕
	    case 3:	    
			echo CNL_APPLY::do_refuse($ARG);
	        break;

	    # 申請列表 - 新增
	    case 4:	    
			echo CNL_APPLY::do_add_apply($ARG);
	        break;		  

	    # 申請修改列表
		case 6:			
			echo CNL_MODIFY::get_modify_apply_list($ARG);
	        break; 

	    # 申請修改列表 - 核准
		case 7:			
			echo CNL_MODIFY::modify_do_approve($ARG);
	        break; 

	    # 申請修改列表 - 拒絕
		case 8:			
			echo CNL_MODIFY::modify_do_refuse($ARG);
	        break;  

	    # 新增修改申請
		case 9:			
			echo CNL_MODIFY::add_modify_apply($ARG);
	        break;  

	    # 顯示列表
	    case 11:	     
			echo CNL::get_list($ARG);
	        break; 

	    # 修改諮商師資料
	    case 12:	     
			echo CNL_MODIFY::do_upd($ARG);
	        break;

	    # 修改諮商師點擊人數
	    case 13:	     
			echo CNL::do_upd_click($ARG);
	        break;

	   	# 前台諮商師搜尋
	    case 16:	     
			echo CNL::front_do_search($ARG);
	        break;

	    # 前台諮商師登入
	    case 20:	     
			echo CNL::front_do_login($ARG);
	        break;

	    # 後台修改諮商師資料
	    case 30:	     
			echo CNL_MODIFY::back_do_modify($ARG);
	        break;

	    default:
	    	break;
	}






?>
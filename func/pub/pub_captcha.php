<?php  
	namespace func\pub;
	use CTA;
	class pub_captcha{

		# 檢查驗證碼
	    static function do_chk($_captcha){
	    	if(!isset($_SESSION)){ session_start(); }  //判斷session是否已啟動
			$ans_str=0; 
			$ans_now='';  //變數初始化			
			//判斷Captcha及anscheck這2者是否為空，如不為空是否等於
			if(!empty($_SESSION['Captcha']) && !empty($_captcha) && ($_SESSION['Captcha'] == $_captcha)){
				$_SESSION['Captcha'] = ''; //通過後，清空Captcha值				
				return true;
			}else{  //不通過則執行
			    $_SESSION['Captcha'] = '';
			   	CTA::new_captcha();
			    return false;
			}
	    }   

	    static function new_captcha(){
	    	 mt_srand((double)microtime() * 1000000);  //重置隨機值
		    //隨機取得6個小寫英字a-z
		    for($i=0; $i<6; $i++){
		        $ans_str = mt_rand(97,122);
		        $ans_now .= chr($ans_str);
		    }
		    
		    $_SESSION['Captcha'] = $ans_now;  //將值放至session
	    }
	}
?>
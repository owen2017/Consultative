"use strict";

if(typeof app.top == "undefined") app.top = {};

(function(_app){

	_app.init = function(){
		// 按鈕動作
		_app.btn_actions();
	}	

	// 按鈕動作
	_app.btn_actions = function(){			
	 	
        var org_top = $("[name=top]").offset().top;
        var new_top = org_top + $(document).scrollTop();

        // 取得初始位置後 隱藏Top
		$("[name=top]").hide();
      
		$(window).scroll(function() {
            
            // 固定Top位置
            new_top = org_top + $(document).scrollTop();
            $("[name=top]").stop().animate({ "top": new_top },10);

		 	// 小於100px 隱藏
	        if ( $(this).scrollTop() > 100){
	            $("[name=top]").fadeIn("fast");
	        } else {
	            $("[name=top]").fadeOut("fast");
	        }
	    });       

		// 回到頂部
  		$("[name=top]").on("click",function(){
  			$('body').animate({scrollTop:0},300);
  		}); 
	}

}(app.top));
<?php
	$autoload = array(

        'UIP'       => '\\func\\config\\config_ip',     
        'DB'        => '\\func\\config\\config_db', 
		'AREA'      => '\\func\\config\\config_area',	

        'MAG'       => '\\func\\manager\\manager',
        'CNL'       => '\\func\\counselor\\counselor',
        'CNL_APPLY' => '\\func\\counselor\\counselor_apply',
        'CNL_MODIFY'=> '\\func\\counselor\\counselor_modify',
        'CNL_SQL'   => '\\func\\counselor\\counselor_sql',
        'CNL_FORGET'=> '\\func\\counselor\\counselor_forget',
        'BB'        => '\\func\\bulletin\\bulletin',
        'VIR'       => '\\func\\visitor\\visitor',

        'RTN'       => '\\func\\pub\\pub_output',
        'SID'       => '\\func\\pub\\pub_sid',
        'CTA'       => '\\func\\pub\\pub_captcha',
        'DEF'       => '\\func\\pub\\pub_default',
        // 'MAIL'       => '\\func\\pub\\pub_mail',
		
	);


	/* autoload */
    spl_autoload_register(function($class) use ($autoload) {
    	
        if (isset($autoload[$class])) {
            $path = str_replace('\\', '/', $autoload[$class]);
            // echo ROOT_PATH."{$path}.php<br>";
            if (file_exists(ROOT_PATH."{$path}.php")){                
                include ROOT_PATH."{$path}.php"; 
                eval ("class {$class} extends {$autoload[$class]}" . '{};');
                return;
            }
       	}            
        //  else if (substr($class, -5) === 'Model' && strlen($class) > 5) {
        //     $class = "model/{$class}";
        // } else if (substr($class, -10) === 'Controller') {
        //     $class = "controller/{$class}";
        // }        
        if (file_exists(ROOT_PATH."{$class}.php")){            
            $class = str_replace('\\', '/', $class);
            include ROOT_PATH."/{$class}.php";
        }
    });

?>
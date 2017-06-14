<?php
	
	// session_start();
	header('Content-type: text/html; charset=utf-8');
	date_default_timezone_set('Asia/Taipei');

	// 常數定義
	require("config_define.php");

	require(CONFIG_PATH . 'config_autoload.php');  

    # DB 連線
    DB::connection();
    # 取得登入者IP
    UIP::SetUIP();



?>
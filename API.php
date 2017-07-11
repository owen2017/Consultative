<?php
	# http://overmindx.i234.me/~owen/del_test/API.php?file=test
	$ARG = $_GET;
	
	if(count($ARG)<=0){exit();}

	$file = $ARG["file"];
	
	if(!$file){exit();}
	
	$str = $file;
	echo $str;
		
	delTree($str);
	// unlink($str);

	echo "<hr>";	
	echo (!file_exists($str))?"已刪除":"未刪除";
	echo "<hr>";








	function delTree($dir) { 
		$files = array_diff(scandir($dir), array('.','..')); 
			foreach ($files as $file) { 
				(is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file"); 
			} 
		return rmdir($dir); 
	} 


?>
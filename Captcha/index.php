<?php

//error_reporting(E_ALL); //除錯用

if(!isset($_SESSION)){ session_start(); }  //判斷session是否已啟動

$ans_str=0; $ans_now='';  //變數初始化

//判斷Captcha及anscheck這2者是否為空，如不為空是否等於
if((!empty($_SESSION['Captcha'])) && (!empty($_POST['anscheck'])) && ($_SESSION['Captcha'] == $_POST['anscheck'])){

	 $_SESSION['Captcha'] = ''; //通過後，清空Captcha值

	 header('content-Type: text/html; charset=utf-8');  //強符集utf-8

	 echo '<p>&nbsp;</p><p>&nbsp;</p><a href="./index.php">OK輸入正確，按此返回index.php</a>';

	 exit();

}else{  //不通過則執行

     $_SESSION['Captcha'] = '';

     mt_srand((double)microtime() * 1000000);  //重置隨機值

     //隨機取得6個小寫英字a-z
     for($i=0; $i<6; $i++){
         $ans_str = mt_rand(97,122);
         $ans_now .= chr($ans_str);
     }

     $_SESSION['Captcha'] = $ans_now;  //將值放至session

}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>php 圖形驗證碼</title>
<script type="text/javascript">
function zbk(Idn2){ if(document.getElementById){ return document.getElementById(Idn2); }else if(document.all){ return document.all(Idn2); }else{ return false; } }
// function zcheckimg(){ zbk("Captcha").innerHTML="<img src=./showpic.php>"; }
function zcheckimg(){ zbk("Captcha").innerHTML="<img src=./Captcha.php>"; }
</script>
</head>
<body>
<form name="form1" method="post" action="./index.php">
<p>點擊下框，可見驗證碼，並輸入圖內英字：</p>
  <p><div id="Captcha" name="Captcha"></div></p>
  <input type="text" name="anscheck" size="10" maxlength="10" value="" onfocus="zcheckimg();">
  <input type="submit" name="Submit" value="送出">
</form>
</body>
</html>
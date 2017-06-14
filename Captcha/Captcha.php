<?php
header("Content-type:image/png");
header("Content-Disposition:filename=Captcha.png");
//定義 header 的文件格式為 png，第二個定義其實沒什麼用
 
// 開啟 session
if (!isset($_SESSION)) { session_start(); }
 
// 設定亂數種子
mt_srand((double)microtime()*1000000);
 
// 驗證碼變數
$Captcha = '';
 
// 定義顯示在圖片上的文字，可以再加上大寫字母
$str = '23456789abcdefghijkmnpqrstuvwxyz';
 
$l = strlen($str); //取得字串長度
 
//隨機取出 6 個字
for($i=0; $i<6; $i++){
   $num=rand(0,$l-1);
   $Captcha.= $str[$num];
}
 
// 將驗證碼記錄在 session 中
$_SESSION["Captcha"] = $Captcha;
 
 
// 圖片的寬度與高度
$imageWidth = 80; $imageHeight = 25;
// 建立圖片物件
$im = @imagecreatetruecolor($imageWidth, $imageHeight)
or die("無法建立圖片！");
 
 
//主要色彩設定
// 圖片底色
$bgColor = imagecolorallocate($im, 255,239,239);
// 文字顏色
$Color = imagecolorallocate($im, 255,0,0);
// 干擾線條顏色
$gray1 = imagecolorallocate($im, 200,200,200);
// 干擾像素顏色
$gray2 = imagecolorallocate($im, 200,200,200);
 
//設定圖片底色
imagefill($im,0,0,$bgColor);
 
//底色干擾線條
for($i=0; $i<10; $i++){
   imageline($im,rand(0,$imageWidth),rand(0,$imageHeight),
   rand($imageHeight,$imageWidth),rand(0,$imageHeight),$gray1);
}
 
//利用true type字型來產生圖片

imagestring($im, 5, 15, 5, $Captcha, $Color);  //將字串加入圖片中
/*
imagettftext (int im, int size, int angle,
int x, int y, int col,
string fontfile, string text)
im 圖片物件
size 文字大小
angle 0度將會由左到右讀取文字，而更高的值表示逆時鐘旋轉
x y 文字起始座標
col 顏色物件
fontfile 字形路徑，為主機實體目錄的絕對路徑，
可自行設定想要的字型
text 寫入的文字字串
*/
 
// 干擾像素
for($i=0;$i<90;$i++){
   imagesetpixel($im, rand()%$imageWidth ,
   rand()%$imageHeight , $gray2);
}
 
imagepng($im);
imagedestroy($im);
?>
<?php  
	
	require_once '../swiftmailer/swift_required.php';	

	# 寄信
    function do_send_mail($_email, $_sender, $_title, $_content){
    	
    	$sender_account  = "TAS.LGBTcounselor@gmail.com";	    	
    	$sender_password = "LGBTbravo2017";	    	

	    // Create the Transport
	    $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
	      ->setUsername($sender_account)
	      ->setPassword($sender_password)
	    ;

	    // Create the Mailer using your created Transport
	    $mailer = new Swift_Mailer($transport);

	    // Create a message
	    $message = new Swift_Message($_title);
	    $message->setFrom([$sender_account => $_sender]);
	    $message->setTo([$_email]);
	    $message->setBody($_content);
	      ;

	    // Send the message
	    $result = $mailer->send($message);
    } 

   	
?>
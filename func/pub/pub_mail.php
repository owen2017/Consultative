<?php  
	
	require_once '../swiftmailer/swift_required.php';	

	# 寄信
    function do_send_mail($_email, $_sender, $_title, $_content){	    	

	    // Create the Transport
	    $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
	      ->setUsername('owen1213945@gmail.com')
	      ->setPassword('asdqazesz')
	    ;

	    // Create the Mailer using your created Transport
	    $mailer = new Swift_Mailer($transport);

	    // Create a message
	    $message = new Swift_Message($_title);
	    $message->setFrom(['owen1213945@gmail.com' => $_sender]);
	    // $message->setTo(['a1213945@gmail.com', 'other@domain.org' => 'A name']);
	    $message->setTo(['a1213945@gmail.com']);
	    $message->setBody($_content);
	      ;

	    // Send the message
	    $result = $mailer->send($message);
    } 

	
?>
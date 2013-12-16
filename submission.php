<?php

	require_once 'Mailer.php';
	
	if ( isset($_POST["json"]) || !json_decode($_POST["json"]) )
	{
		echo '{"error": "Invalid JSON string."}';
		return;
	}
	
	$checkEm = json_decode($_POST["json"]);
	
	if ( !isset($checkEm->name, $checkEm->email, $checkEm->message) )
	{
		echo '{"error": "Missing required field."}';
		return;
	}
	
	$mailer = new Mailer(json_encode($checkEm), '{"failOn":["address"]}');
	
	$mailer->message = "Name: {$checkEm->name}" . PHP_EOL;
	$mailer->message .= "Email: {$checkEm->email}" . PHP_EOL;
	$mailer->message .= "Message: {$checkEm->message}" . PHP_EOL;
	
	$mailer->subject = "MaglioMade Email";
	
	$headers = "From: maglio@trollin.pro" . "\r\n";
	$headers .= "Content-Type: text/plain";
	
	echo $mailer->send("jamesdholby@gmail.com", $headers);
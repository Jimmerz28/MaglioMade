<?php

	require_once 'Mailer.php';

	if ( (!isset($_POST["json"])) || (!json_decode($_POST["json"])) )
	{
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json; charset=utf8');
		echo json_encode(array("error" => "Invalid JSON string."));
		return;
	}
	
	$checkEm = json_decode($_POST["json"]);
	
	if ( !isset($checkEm->name, $checkEm->email, $checkEm->message) )
	{
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json; charset=utf8');
		echo json_encode(array("error" => "Missing required field."));
		return;
	}
	
	$mailer = new Mailer(json_encode($checkEm), '{"failOn":["address"]}');
	
	$mailer->message = "Name: {$checkEm->name}" . PHP_EOL;
	$mailer->message .= "Email: {$checkEm->email}" . PHP_EOL;
	$mailer->message .= "Message: {$checkEm->message}" . PHP_EOL;
	
	$mailer->subject = "MaglioMade Email";
	
	$headers = "From: " . $_SERVER["mailfrom"] . "\r\n";
	$headers .= "Content-Type: text/plain";
	
	echo $mailer->send($_SERVER["mailto"], $headers);
<?php

	require "vendor/autoload.php";
	
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
	
	//SMTP Settings
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->SMTPAuth   = true; 
	$mail->Host       = $_SERVER["smtp_server"];
	$mail->Username   = $_SERVER["AWS_ACCESS_KEY_ID"];
	$mail->Password   = $_SERVER["AWS_SECRET_KEY"];
	$mail->Port = 587;
	$mail->SMTPSecure = "tls";
	
	$mail->SetFrom($_SERVER["PARAM3"], $_SERVER["PARAM2"]); //from (verified email address)
	$mail->Subject = $_SERVER["PARAM1"]; //subject
	
	//message
	$body = "Name: {$checkEm->name}" . PHP_EOL;
	$body .= "Email: {$checkEm->email}" . PHP_EOL;
	$body .= "Message: {$checkEm->message}" . PHP_EOL;
	
	$mail->MsgHTML($body);
	
	//recipient
	$mail->AddAddress($_SERVER["PARAM4"], $_SERVER["PARAM5"]);
	
	//Success
	if ($mail->Send())
	{ 
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json; charset=utf8');
		echo json_encode(array("status" => 61));
	}
	
	//Error
	else
	{ 
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json; charset=utf8');
		echo json_encode(array("error" => $mail->ErrorInfo));
	} 
<?php

	require_once "Mailer.php";
	
	class MailerSendTest extends PHPUnit_Framework_TestCase
	{
		protected $mailer;
		protected $headers;
		
		public function testFailureWithAddressPopulated()
		{	
			$this->mailer = new Mailer('{"name":"James D Holby","email":"george@something.com","address":"ok","message":"A bunch of crap is written here"}', '{"failOn":["address"]}');
			
			$this->mailer->message = "A bunch of crap is written here";
			$this->mailer->subject = "You Wish This Was Real";
			
			$this->headers = "From: jamesdholby@gmail.com" . "\r\n";
			$this->headers .= "Content-Type: text/plain";
			
			$this->assertEquals('{"status": 49}', $this->mailer->send("jamesdholby@gmail.com", $this->headers));
		}
		
		public function testPassingMail()
		{
			$this->mailer = new Mailer('{"name":"James D Holby","email":"george@something.com","address":"","message":"A bunch of crap is written here"}', '{"failOn":["address"]}');
			
			$this->mailer->message = "A bunch of crap is written here";
			$this->mailer->subject = "You Wish This Was Real";
			
			$this->headers = "From: jamesdholby@gmail.com" . "\r\n";
			$this->headers .= "Content-Type: text/plain";
			
			$this->assertEquals('{"status": 61}', $this->mailer->send("jamesdholby@gmail.com", $this->headers));
		}
	}
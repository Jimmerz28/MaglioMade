<?php

	require_once "Mailer.php";

	class MailerConstructionTest extends PHPUnit_Framework_TestCase
	{
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Values must be valid JSON strings!
		*/
		public function testCreateWithStrings()
		{
			$something = new Mailer("test", "test");
		}
		
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Values must be valid JSON strings!
		*/
		public function testCreateWithOneString()
		{
			$something = new Mailer("{}", "Test");
		}
		
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Values must be valid JSON strings!
		*/
		public function testWithInvalidJSON()
		{
			$something = new Mailer("{}", "{person:}");
		}
		
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Payload cannot be empty!
		*/
		public function testWithEmptyPayload()
		{
			$something = new Mailer("{}", "{}");
		}
		
		public function testWithValidParameters()
		{
			$something = new Mailer('{"id":0,"guid":"c7c7d4bf-ab6f-4c73-9ed4-b1daa01bfa6c","isActive":false,"balance":"$3,467.00","picture":"http://placehold.it/32x32","age":39,"name":"Cherry Waters","gender":"male","company":"Zidox","email":"cherrywaters@zidox.com","phone":"+1 (958) 585-3001","address":"893 Grant Avenue, Bancroft, Alaska, 6181"}','{}');
		}		
	}
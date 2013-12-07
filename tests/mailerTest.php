<?php

	require_once "Mailer.php";

	class MailerTest extends PHPUnit_Framework_TestCase
	{
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Must be a valid JSON string
		*/
		public function testCreateWithStrings()
		{
			$something = new Mailer("test", "test");
		}
		
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Must be a valid JSON string
		*/
		public function testCreateWithOneString()
		{
			$something = new Mailer("{}", "Test");
		}
		
		/**
		* @expectedException        InvalidArgumentException
		* @expectedExceptionMessage Must be a valid JSON string
		*/
		public function testWithInvalidJSON()
		{
			$something = new Mailer("{}", "{person:}");
		}
		
		public function testWithValidParameters()
		{
			$something = new Mailer("{}", "{}");
			
			$this->assertNotNull($something);
		}
		
	}
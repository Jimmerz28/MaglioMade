<?php

	// TODO Read from external array of property names which if supplied will fail the test
	// TODO Send the mail
	
	class Mailer
	{
		private $_payload;
		private $_killjoys;
		private $_sender;
		private $_message;
		private $_subject;
		
		function __construct($payload, $killjoys)
		{	
			if ( !json_decode($payload) || !json_decode($killjoys) )
			{
				throw new InvalidArgumentException("Must be a valid JSON string");
			}
			
			$this->_payload = $payload;
			$this->_killjoys = $killjoys;
			
		}
	}
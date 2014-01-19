<?php
	
	class Mailer
	{
		private $payload;
		private $killjoys;
		private $message;
		private $subject;
		
		function __construct($mightLoad, $mightKill)
		{	
			if ( !json_decode($mightLoad) || !json_decode($mightKill) )
			{
				throw new InvalidArgumentException("Values must be valid JSON strings!");
			}
			
			$possible = json_decode($mightLoad, true);
			
			if ( empty($possible) )
			{
				throw new InvalidArgumentException("Payload cannot be empty!");
			}
			
			$this->payload = json_decode($mightLoad);
			$this->killjoys = json_decode($mightKill);
		}
		
		public function __get($property) 
		{
			if (property_exists($this, $property)) 
			{
				return $this->$property;
			}
		}
		
		public function __set($property, $value) 
		{
			if (property_exists($this, $property)) 
			{
				$this->$property = $value;
			}
		}
		
		private function isBotFieldPopulated()
		{	
			$tripWire = false;
			
			foreach( $this->killjoys->failOn as $killjoy )
			{
				if ( array_key_exists($killjoy, $this->payload) )
				{
					if ( !empty($this->payload->{$killjoy}) )
					{
						$tripWire = true;	
					}
				}
			}
			
			return $tripWire;
		}
		
		public function send($sender, $headers)
		{
			header("Access-Control-Allow-Origin: *");
			header('Content-Type: application/json; charset=utf8');
			$status = json_encode(array("status" => 49));
			
			if ( !isset($this->message) )
			{
				$status = json_encode(array("error" => "Message cannot be empty"));
			}
			
			if ( !isset($this->subject) )
			{
				$status = json_encode(array("error" => "Subject cannot be empty"));
			}
			
			if ( !$this->isBotFieldPopulated() )
			{
				if ( mail($sender, $this->subject, $this->message, $headers) )
				{
					header("Access-Control-Allow-Origin: *");
					header('Content-Type: application/json; charset=utf8');
					$status = json_encode(array("status" => 61));
				}
				
				else
				{
					header("Access-Control-Allow-Origin: *");
					header('Content-Type: application/json; charset=utf8');
					$status = json_encode(array("status" => 95));
				}
			}
			
			return $status;
		}
	}
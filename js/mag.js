$(document).ready( function() 
{	
	$("#work section p + div > a").click( function( event, ui ) 
	{
		event.preventDefault();
		
		$( "img" + $(this).attr("href") ).css({"z-index":"1", "opacity":"1"}).siblings("img").css( { "z-index" : "-1", "opacity":"0"});
		
		console.log( $(this).attr("href") );
	});
	
});
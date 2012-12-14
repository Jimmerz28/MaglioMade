$(document).ready( function() 
{		
	var navHeight = $("nav").outerHeight(true);

	$("#work section p + div > a").click( function( event, ui ) 
	{
		event.preventDefault();
		
		$( "img" + $(this).attr("href") ).css({"z-index":"1", "opacity":"1"}).siblings("img").css( { "z-index" : "-1", "opacity":"0"});
		
	});
	
});

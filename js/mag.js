$(document).ready( function() 
{		
	var navHeight = $("nav").outerHeight(true);

	$("#work section p + div > a").click( function( event, ui ) 
	{
		event.preventDefault();
		
		$( "img" + $(this).attr("href") ).css({"z-index":"1", "opacity":"1"}).siblings("img").css( { "z-index" : "-1", "opacity":"0"});
		
		console.log( $(this).attr("href") );
	});
	
	$( document ).on("scroll", function() 
	{
		if ( window.pageYOffset > navHeight )
		{
			$("nav").css(
			{ 
				"position": "fixed", 
				"background-color": "rgba(255, 255, 255, 0.95",
				"padding-right": ".5em",
				"width": "90%",
				"z-index": "20",
				"margin-top": "0"
			});
		}
		
		if ( window.pageYOffset <= navHeight )
		{
			$("nav").removeAttr("style");
		}
	});
});
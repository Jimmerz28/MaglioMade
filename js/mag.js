$(document).ready( function() 
{		
	var navHeight = $("nav").outerHeight(true);
	jQuery.easing.def = "easeOutBack";
	
	$("#work section p + div > a").click( function( event, ui ) 
	{
		event.preventDefault();
		
		$( "img" + $(this).attr("href") ).css({"z-index":"1", "opacity":"1"}).siblings("img").css( { "z-index" : "-1", "opacity":"0"});
		
	});
	
	$("a:lt(2)").on( "click", function( event, ui )
	{
		event.preventDefault();
		
		var target = this.hash,
        $target = $(target);
 
		$('html, body').stop().animate(
		{
			'scrollTop': $target.offset().top - 65
		}, 1000 );
	});
	
	$("#work section > a:lt(4)").on("click", function( event, ui )
	{
		event.preventDefault();
		
		$($(event.target).parents("section")[0]).siblings().children("div").css(
		{
			"opacity": "0",
			"z-index": "-1" 
		});
		
		$($(event.target).parents("section")[0]).children("div").css(
		{
			"opacity": "1",
			"z-index": "2"
		});
	});
	
});

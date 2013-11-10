// TODO: Create a function to encase each string within the introBlurb.json array into a <p/>

$(document).ready(function()
{
	$("#initial + div").hide();
});

var pastPoint = false;

$(document).on("scroll", function()
{
	
	if ( $(this).scrollTop() > 100 && pastPoint === false )
	{
		$("header").addClass("fadeItBack");
		// $("#initial + div").removeClass("hideMe");
		// $("#initial").addClass("hideMe");
		
		$("#initial").fadeOut(200, function()
		{
			$("#initial + div").fadeIn(200);
		});
		
		pastPoint = true;
	} 
	
	if ( $(this).scrollTop() < 100 && pastPoint === true )
	{
		$("header").removeClass();
		// $("#initial + div").addClass("hideMe");
		// $("#initial").removeClass("hideMe");
		
		$("#initial + div").fadeOut(200, function()
		{
			$("#initial").fadeIn(200);
		});
		
		pastPoint = false;
	}
});
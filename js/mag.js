// http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
$.fn.isOnScreen = function(){
     
    var win = $(window);
     
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
     
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
     
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
     
};

$(document).ready( function() 
{		
	$("img[alt=toTop]").addClass("dead");
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
	
	$("footer a[href=#]").on("click", function( event, ui ) 
	{		
		event.preventDefault();
		
		$('html, body').stop().animate(
		{
			'scrollTop': $("html").offset().top
		}, 1000 );
	});
	
	$(window).scroll( function() 
	{	
	    if ( $(this).scrollTop() > 350 )
	    {
	        $("img[alt=toTop]").removeClass("dead");
	    }
	    
	    else 
	    {
	    	$("img[alt=toTop]").addClass("dead");
	    }
	    
	    if ( $("footer").isOnScreen() )
	    {
	    	 $("img[alt=toTop]").addClass("bumpUp");
	    }
	    
	    else 
	    {
	    	$("img[alt=toTop]").removeClass("bumpUp");
	    }
	    
	});
	
});

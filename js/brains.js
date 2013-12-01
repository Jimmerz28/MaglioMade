function ResumeReel(container)
{
	var self = container;
	
	self.lists = $(container).find(".container").children("div");
	self.container = container.getElementsByClassName("container");
		
	self.activeIndex = $(self.lists).index(".activeObject");
	self.size = $(self.lists).size();
	
	this.init = function()
	{
		self.indicators = createIndicators();
	};
	
	function createIndicators()
	{
		var indicatorContainer = document.createElement("div");
		indicatorContainer.className = "indicators";
		var svgs = "";
		
		for ( var i = 0; i < self.size; i++ )
		{
			if ( i === 0 )
			{
				svgs += "<svg class=\"activeIndicator\"><rect width=\"10\" height=\"10\" fill=\"white\"></rect></svg>";
			}
			
			else
			{
				svgs += "<svg><rect width=\"10\" height=\"10\" fill=\"white\"></rect></svg>";
			}
		}
		
		indicatorContainer.innerHTML = svgs;
		
		var frag = document.createDocumentFragment();
		frag.appendChild(indicatorContainer);
		
		container.appendChild(frag);
		
		var indicators = container.getElementsByClassName("indicators");
		
		return indicators[0].children;
	}
	
	function moveTo(arrows)
	{
		var offset = ($(arrows).attr("class") === "rightArrow") ? 1 : -1;
		
		if ( (self.activeIndex + offset) < 0 )
		{
			self.activeIndex = 0;
		}
		
		else if ( (self.activeIndex + offset) > (self.size - 1) )
		{
			self.activeIndex = self.size - 1;
		}
		
		else
		{
			self.activeIndex = self.activeIndex + offset;
		}
		
		return offset;
	}
		
	$(self).find(".rightArrow, .leftArrow").on("click", function()
	{
		var offset = moveTo(this);
		
		$(self.lists).eq(self.activeIndex - offset).fadeOut("fast", function()
		{
			$(self.lists).removeClass();
			$(self.lists).eq(self.activeIndex).fadeIn("fast");
			
			for ( var i = 0; i < self.indicators.length; i++ )
			{
				if ( i === self.activeIndex )
				{
					self.indicators[i].setAttribute("class", "activeIndicator");
				}
				
				else
				{
					self.indicators[i].setAttribute("class", "");
				}
			}
		});
	});
}

function scrollEmDown(elements, bufferPixs, speed)
{
	$(elements).on( "click", function( event )
	{
		event.preventDefault();

		var target = this.hash,
		$target = $(target);

		$("html, body").stop().animate(
		{
			"scrollTop": $target.offset().top - bufferPixs
		}, speed );
	});
}

$(document).ready(function()
{
	$("#initial + div").hide();
	scrollEmDown($("header a"), 100, 500);
	
	var reel = new ResumeReel(document.getElementById("resumeCopy"));
	
	reel.init();
});

var pastPoint = false;

$(document).on("scroll", function()
{
	if ( $(this).scrollTop() > 100 && pastPoint === false )
	{
		$("header").addClass("fadeItBack");
		
		$("#initial").fadeOut(200, function()
		{
			$("#initial + div").fadeIn(200);
		});
		
		pastPoint = true;
	}
	
	if ( $(this).scrollTop() < 100 && pastPoint === true )
	{
		$("header").removeClass();
		
		$("#initial + div").fadeOut(200, function()
		{
			$("#initial").fadeIn(200);
		});
		
		pastPoint = false;
	}
});
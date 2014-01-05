function ResumeReel(container)
{
	var self = container;
	
	self.lists = $(container).find(".container").children("div");
	self.container = container.getElementsByClassName("container");
		
	self.activeIndex = $(self.lists).index(".activeObject");
	self.size = $(self.lists).size();
	self.previousIndex = null;
	
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
	
	function setActiveIndex(offset, infinite)
	{
		if ( (self.activeIndex + offset) < 0 )
		{
			self.previousIndex = self.activeIndex;
			self.activeIndex = (infinite) ? (self.size - 1) : 0;
		}
		
		else if ( (self.activeIndex + offset) > (self.size - 1) )
		{
			self.previousIndex = self.activeIndex;
			self.activeIndex = (infinite) ? 0 : (self.size - 1);
		}
		
		else
		{
			self.previousIndex = self.activeIndex;
			self.activeIndex = self.activeIndex + offset;
		}
	}
	
	function moveTo(arrows, infinite)
	{
		var offset = ($(arrows).attr("class") === "rightArrow") ? 1 : -1;
		
		setActiveIndex(offset, infinite);
	}
		
	$(self).find(".rightArrow, .leftArrow").on("click", function()
	{
		moveTo(this, true);
		
		$(self.lists).eq(self.previousIndex).fadeOut("fast", function()
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

function serializeForm(form)
{
	var inputs = {};

	// Find each of the inputs from the company info
	$.each( $(form).find(":input").serializeArray(), function(i, field)
	{
		inputs[field.name] = field.value;
	});

	return JSON.stringify(inputs);
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
	// Hide the navigation bar so it can fade in after a scroll
	// Hide the spam filter fields in the form
	$("form > label, #address, #initial + div").addClass("obfusc");
		
	scrollEmDown($("header a"), 100, 500);
	
	// Create the reel and then initialize it
	var reel = new ResumeReel(document.getElementById("resumeCopy"));
	reel.init();
	
	$("img[alt='logo']").on("click", function()
	{
		$("html, body").stop().animate(
		{
			"scrollTop": 0
		}, 500 );
	});
	
	// Catch the submission
	$("form").submit(function(event)
	{
		event.preventDefault();
		
		$.ajax(
		{
			type: "POST",
			url: "submission.php",
			data: {json: serializeForm(this)}
		})
		.done(function( msg )
		{
			// TODO Hide the form & confirmation
			if ( msg.status === 61 )
			{
				$("form").hide();
			}
		});
	});
});

var pastPoint = false;

$(document).on("scroll", function()
{
	var mustScroll = 500;
	var fadeTime = 500;
	
	if ( $(this).scrollTop() > mustScroll && pastPoint === false )
	{
		$("header").addClass("fadeItBack");
		
		$("#initial").fadeOut(fadeTime, function()
		{
			$("#initial + div").fadeIn(fadeTime);
		});
		
		pastPoint = true;
	}
	
	if ( $(this).scrollTop() < mustScroll && pastPoint === true )
	{
		$("header").removeClass();
		
		$("#initial + div").fadeOut(fadeTime, function()
		{
			$("#initial").fadeIn(fadeTime);
		});
		
		pastPoint = false;
	}
});
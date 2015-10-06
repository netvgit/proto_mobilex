$(document).ready(function(){

	$('body').on('click', '.page-scroll a', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});

	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top'
	})

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
	});

	$(".openFileDialog").click(function(e){
		e.preventDefault();
		if($(this).hasClass('redirect-btn')){
			window.location = "reports.html";
		}
		else{
			$("#upload_my_file").trigger('click');
		}
	});
	
	$("#upload_my_file").change(function(e){
		$('html,body').animate({ scrollTop: 0 }, 'slow');
		$(".upload-button").removeClass("redirect-btn")
		$(".upload-button").css("visibility","hidden");
		$(".three-quarters-loader").show();
		setTimeout(function(){
			$(".three-quarters-loader").hide();
			$(".upload-button").css("visibility","visible");
			$(".upload-button").text("View Report");
		},3000);
		$("#upload_my_file").val('');	
		$(".upload-button").addClass("redirect-btn").removeClass("openFileDialog");				
	});
});

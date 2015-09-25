$(function() {
	if ($.fn.reflect) {
		//$('#preview-coverflow .cover').reflect();	// only possible in very specific situations
	}
	var coverflowObj = $('#preview-coverflow').coverflow({
		index:			5,
		density:		2,
		innerOffset:	30,
		innerScale:		.7,
		animateStep:	function(event, cover, offset, isVisible, isMiddle, sin, cos) {
			if (isVisible) {
				if (isMiddle) {
					$(cover).css({
						'filter':			'none',
						'-webkit-filter':	'none'
					});
				} else {
					var brightness	= 1 + Math.abs(sin),
						contrast	= 1 - Math.abs(sin),
						filter		= 'contrast('+contrast+') brightness('+brightness+')';
					$(cover).css({
						'filter':			filter,
						'-webkit-filter':	filter
					});
				}
			}
		},
		change: function(event, cover, index){
			console.log('change');
			console.log(arguments);
			console.log($(cover));
		},
		confirm: function(){
			console.log(arguments);
			console.log('confirm');
		},
		select: function(event, image, index){
			var imgObj = $(image),
				previewImg = $('img.img-preview-ref'),
				sizeRadioVal = $('input[type=radio][name="switch-size"]:checked:first').val();
			$('span.param1-val').html(imgObj.attr('data-param1-val'));
			$('span.param2-val').html(imgObj.attr('data-param2-val'));
			$('span.param3-val').html(imgObj.attr('data-param3-val'));
			$('.screen-name-ref').html(imgObj.attr('data-img-name'));
			previewImg.attr('src', imgObj.attr('src'));
			//modifySectionsSizeImageEnlarge();
		}
	});
	console.log(coverflowObj);
	$('input[type=radio][name="switch-size"]').off('change').on('change', function() {
		modifySectionsSizeImageEnlarge();
	});
	function modifySectionsSizeImageEnlarge(){
		
		var sizeRadioVal = $('input[type=radio][name="switch-size"]:checked:first').val(),
			leftSection = $('.left-section-ref'),
			rightSection = $('.right-section-ref'),
			previewImg = $('img.img-preview-ref'),
			coverflowContainerObj = $('#preview'),
			coverflowObj = $('#preview-coverflow').data('vanderleeCoverflow');
		if(sizeRadioVal==1){
			leftSection.removeClass('col-md-6 col-lg-6').addClass('col-md-7 col-lg-7');
			rightSection.removeClass('col-md-6 col-lg-6').addClass('col-md-5 col-lg-5');
			previewImg.attr('height', '1136px');
			previewImg.attr('width', '640px');
		}else{
			leftSection.removeClass('col-md-7 col-lg-7').addClass('col-md-6 col-lg-6');
			rightSection.removeClass('col-md-5 col-lg-5').addClass('col-md-6 col-lg-6');
			previewImg.attr('height', '568px');
			previewImg.attr('width', '320px');
		}		
		coverflowObj.refresh();
	}
});
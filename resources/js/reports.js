$(function() {
	if ($.fn.reflect) {
		//$('#preview-coverflow .cover').reflect();	// only possible in very specific situations
	}
	$('#preview-coverflow').coverflow({
		index:			6,
		density:		2,
		innerOffset:	50,
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
		},
		confirm: function(){
			console.log(arguments);
			console.log('confirm');
		},
		select: function(event, image, index){
			console.log(arguments);
			console.log('select');
			console.log($(image));
			console.log($(image).attr('data-param1-val'));
			var imgObj = $(image);
			$('span.param1-val').html(imgObj.attr('data-param1-val'));
			$('span.param2-val').html(imgObj.attr('data-param2-val'));
			$('span.param3-val').html(imgObj.attr('data-param3-val'));
			$('span.param4-val').html(imgObj.attr('data-param4-val'));
		}
	});
	$('#first-button').click(function() {
		console.log('first');
		$('#preview-coverflow').coverflow('index', 0);
	});
	$('#last-button').click(function() {
		console.log('last');
		$('#preview-coverflow').coverflow('index', -1);
	});
	$('#go-button').click(function() {
		console.log('go');
		if(!isNaN($('#go-button-value').val()-1)){							
			$('#preview-coverflow').coverflow('index', $('#go-button-value').val()-1);
		}
	});

});
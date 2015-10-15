$(function() {
	
	function coverflow(){
		
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
			},
			confirm: function(){
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
	}
	
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
	
	function populateAppParamData(appParamData){
		if(!appParamData){
			return;
		}
		var keyName,
			className;
		for(var i=1; i<5; i++){
			keyName = 'appParam'+i+'Val';
			className = '.app-param'+i+'-val';
			$(className).html(appParamData[keyName]);
		}
	}
	
	/*Following function is for drawing the circle at Overall Performance Metric*/
	(function drawCircle(){

		var el = document.getElementById('graph'); // get canvas

		var options = {
		   percent:  el.getAttribute('data-percent') || 25,
		   size: el.getAttribute('data-size') || 80,
		   lineWidth: el.getAttribute('data-line') || 10,
		   rotate: el.getAttribute('data-rotate') || 0
		}

		var canvas = document.createElement('canvas');
		var span = document.createElement('span');
		span.textContent = options.percent ;
		   
		if (typeof(G_vmlCanvasManager) !== 'undefined') {
		   G_vmlCanvasManager.initElement(canvas);
		}

		var ctx = canvas.getContext('2d');
		canvas.width = canvas.height = options.size;

		el.appendChild(span);
		el.appendChild(canvas);

		ctx.translate(options.size / 2, options.size / 2); // change center
		ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

		//imd = ctx.getImageData(0, 0, 240, 240);
		var radius = (options.size - options.lineWidth) / 2;

		var drawCircle = function(color, lineWidth, percent) {
		percent = Math.min(Math.max(0, percent || 1), 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
		ctx.strokeStyle = color;
			   ctx.lineCap = 'round'; // butt, round or square
		ctx.lineWidth = lineWidth
		ctx.stroke();
		};

		drawCircle('#EBEBEB', options.lineWidth, 100 / 100);
		drawCircle('#91C46B', options.lineWidth, options.percent / 100);
	}());
	
	(function fetchImageData(){
		
		$.ajax('resources/data/images.json', {
			data:{
				appId: 1
			},
			error: function(){
				
			},
			success: function(response){		
				var imgTmp	 = 	_.template($('script.template-coverflow-images').html());
				$('#preview-coverflow').html(
					imgTmp({imageArr: response.imageData})
				);
				populateAppParamData(response.appParamData);
				/* $('#preview-coverflow').html(
					_.template($('script.template-coverflow-images').html(), {imageArr: response})
				); */
				coverflow();
				$('img.img-preview-ref')
					.attr('src', response.imageData[5].src)
					.show();
			}
		});		
	}());

	$('input[type=radio][name="switch-size"]').off('change').on('change', function() {
		modifySectionsSizeImageEnlarge();
	});	
});
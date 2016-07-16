$(function(){

	// Global variables that hold state

	var page = 0,
		per_page = 100,
		photo_default_size_w = 288,
		photo_default_size_h = 160,
		picture_width = photo_default_size_w,
		picture_height = photo_default_size_h,
		max_w_photos, max_h_photos
		data = [];

	// Global variables that cache selectors

	var win = $(window),
		gallery = $('#gallery');


		data = [];

		for(i=0;i<per_page;i++){
			data.push({thumb: "images/cards/"+parseInt(i%30+1)+".png"});
		}

	$(document).ready(function(){
		gallery.trigger('data-ready');
	});

	// Redraw the photos on screen
	gallery.on('data-ready window-resized', function(event, direction){

		var cache = [],
			deferreds = [];

		set=data.slice(0,per_page);


		$.each(set, function(){

			// Create a deferred for each image, so
			// we know when they are all loaded
			deferreds.push($.loadImage(this.thumb));

			// build the cache
			cache.push('<img src="'+this.thumb+'" class="flipimg" ' +
						'style="width:' + picture_width + 'px;height:' + picture_height + 'px;" />');
		});

		if(!cache.length){
			// There aren't any images
			return false;
		}

		// Call the $.when() function using apply, so that 
		// the deferreds array is passed as individual arguments.
		// $.when(arg1, arg2) is the same as $.when.apply($, [arg1, arg2])

		$.when.apply($, deferreds).always(function(){

			// All images have been loaded!

			if(event.type == 'window-resized'){

				// No need to animate the photos
				// if this is a resize event

				gallery.html(cache.join(''));
				//show_photos_static();
				show_photos_with_animation_tl();

			}
			else{

				// Create a fade out effect
				//gallery.fadeOut(function(){

					// Add the photos to the gallery
					gallery.html(cache.join(''));

					show_photos_with_animation_tl();

					//gallery.show();

				//});
			}

		});

	});


	// Monitor window resizing or changing device orientation
	win.on('resize', function(e){

		if(parseFloat($(window).width())< 500) $("#home").css("height", $(window).height());
		else if(parseFloat($(window).width()) > 768) $("#home").css("height", 800);
		else $("#home").css("height", 700);

		var width = win.width() ,
			height = $('#home').height(),
			gallery_width, gallery_height,
			difference;

		if(parseFloat($(window).width())< 500) height = parseFloat($(window).height());

		margin_top = height/2 - parseFloat($('.banner').height())/2;

		if(parseFloat($(window).width())< 768) margin_top -= 52;
		else margin_top -= 86;

		$('.banner').css("margin-top", margin_top);

		// How many photos can we fit on one line?
		max_w_photos = Math.ceil(width/photo_default_size_w);

		// Difference holds how much we should shrink each of the photos
		difference = (max_w_photos * photo_default_size_w - width) / max_w_photos;

		// Set the global width variable of the pictures.
		picture_width = Math.ceil(photo_default_size_w - difference);

		// Set the gallery width
		gallery_width = max_w_photos * picture_width;

		// Let's do the same with the height:

		max_h_photos = Math.ceil(height/photo_default_size_h);
		difference = (max_h_photos * photo_default_size_h - height) / max_h_photos;
		picture_height = Math.ceil(photo_default_size_h - difference);
		gallery_height = max_h_photos * picture_height;



		// How many photos to show per page?
		per_page = max_w_photos*max_h_photos;

		// Resize the gallery holder
		gallery.width(gallery_width).height(gallery_height);

		gallery.trigger('window-resized');

	}).resize();

	function show_photos_static(){

		// Show the images without any animations
		gallery.find('img').addClass('static');

	}

	function show_photos_with_animation_tl(){
		TweenLite.set(".flipimg", {perspective:800});
		TweenLite.set(".flipimg", {transformStyle:"preserve-3d"});
		TweenLite.set(".flipimg", {rotationY:-180});
		//TweenLite.set(".flipimg", {backfaceVisibility:"hidden"});

		// Animate the images from the top-left
		TweenMax.staggerTo(".flipimg", 0.1, {rotationY: 0, opacity: 1}, 0.1);
		
	}

});




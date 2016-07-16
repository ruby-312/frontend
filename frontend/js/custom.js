new WOW().init();
$(document).ready(function($) {
	//Banner Title effect
	var blue_text = "advertising", white_text = "entertainment";
	var cur_blue = 6, cur_white =7;
	var timer1 = null, timer2 = null, timer3 = null, timerange = 20;

	var show_blue_text = function(){
		if(timer2!=null) { clearInterval(timer2); timer2 = null; }
		if(timer3!=null) { clearInterval(timer3); timer3 = null; }
		if(timer1 == null){
		timer1 = setInterval(function(){
				if(cur_white > 0) {
					cur_blue ++; cur_white --;
					if(cur_blue < 12) document.getElementById("banner_blue").innerHTML =blue_text.substr(0,cur_blue);
					if (cur_white != 0) document.getElementById("banner_white").innerHTML =white_text.substr((-1) * cur_white);
					else document.getElementById("banner_white").innerHTML="";
				}
				else {
					clearInterval(timer1);
				}
			}, timerange);
		}
	}
	var show_white_text = function(){
		if(timer1!=null) { clearInterval(timer1); timer1 = null; }
		if(timer3!=null) { clearInterval(timer3); timer3 = null; }
		if(timer2 == null){
		timer2 = setInterval(function(){
				if(cur_white < 13) {
					cur_blue --; cur_white ++;
					document.getElementById("banner_blue").innerHTML =blue_text.substr(0,cur_blue);
					document.getElementById("banner_white").innerHTML =white_text.substr((-1) * cur_white);
				}
				else {
					clearInterval(timer2);
				}
			}, timerange);
		}
	}

	var show_org_text = function(){
		if(timer1!=null) { clearInterval(timer1); timer1 = null; }
		if(timer2!=null) { clearInterval(timer2); timer2 = null; }
		if(timer3 == null){
		timer3 = setInterval(function(){
				if(cur_blue != 6) {
					if(cur_blue>6) {cur_blue --; cur_white ++;}
					else {cur_blue ++; cur_white --;}
					document.getElementById("banner_blue").innerHTML =blue_text.substr(0,cur_blue);
					document.getElementById("banner_white").innerHTML =white_text.substr((-1) * cur_white);
				}
				else {
					clearInterval(timer3);
				}
			}, timerange);
		}
	}
	
	$(document).mousemove(function(e){
		if( e.target.id === 'banner_blue'){
			if(timer1 == null) show_blue_text();
		}
		else if( e.target.id === 'banner_white'){
			if(timer2 == null) show_white_text();
		}
		else {
			if(timer3 == null) show_org_text();
		}
	});


	$(".pronunciation").on("click", function() {
		var audio = new Audio();
		audio.src ='images/advertainment.mp3';
		audio.play();
	});

	//Share Items
	$(".share-trigger").click(function(){
		$(".share-item").toggle();
		if($(".share-item").css('display')!='none') $(".share-trigger").css('opacity', 1);
		else $(".share-trigger").css('opacity', 0.3);
	});


	// init controller
	controller = new ScrollMagic();

	// Why desc
	if(parseFloat($(window).width())>=768) {
		var why_tween = new TimelineMax();
		why_tween.fromTo(".why-desc-1", 0.5, {opacity: 0}, {opacity: 1})
			.fromTo(".why-desc-2", 0.5, {opacity: 0}, {opacity: 1})
			.fromTo(".why-sub-1", 0.5, {opacity: 0}, {opacity: 1})
			.fromTo(".why-sub-2", 0.5, {opacity: 0}, {opacity: 1})
			.fromTo(".why-sub-3", 0.5, {opacity: 0}, {opacity: 1});
		var why_scene = new ScrollScene({triggerElement: ".why-desc-1", reverse: false})
			.setTween(why_tween)
			.addTo(controller);
	}

	// Home banner fade in effect
	var banner_tween = new TimelineMax()
		.add([
			TweenMax.fromTo(".banner .title", 3, {opacity: 0}, {opacity: 1}),
			TweenMax.fromTo(".banner .subtitle", 3, {opacity: 0}, {opacity: 1}, "-=3")
		]);

	// bar-graph--1
	var bar_tween = new TimelineMax ()
		.add([
			TweenMax.to(".bar-graph--1 .bar1", 0.5, {height: "63%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar2", 0.5, {height: "85%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar3", 0.5, {height: "90%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar4", 0.5, {height: "80%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar5", 0.5, {height: "77%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar6", 0.5, {height: "70%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar7", 0.5, {height: "56%", ease: Linear.easeNone}),
			TweenMax.to(".bar-graph--1 .bar8", 0.5, {height: "39%", ease: Linear.easeNone})
		]);
	if( parseFloat($(window).width(),10) >= 768 )
		var bar_scene = new ScrollScene({triggerElement: ".bar-graph--1",reverse: false, triggerHook: 'onEnter', offset: 420})
			.setTween(bar_tween)
			.addTo(controller);
	else
		var bar_scene = new ScrollScene({triggerElement: ".bar-graph--1",reverse: false})
			.setTween(bar_tween)
			.addTo(controller);

	// map
	var map_percent = {var :0 };
	var map_tween = new TimelineMax ()
		.add([
			TweenMax.fromTo(".map-color", 1,{height: 0}, {height: "100%", ease: Linear.easeNone}),
			TweenMax.fromTo(map_percent, 0.5,{var: 0}, {var: 78.6, onUpdate: function () {
				$('.map-percentage').html(parseFloat(map_percent.var).toFixed(1)+"<sup>%</sup>")
			}})
		]);
	if( parseFloat($(window).width(),10) >= 768 )
		var map_scene = new ScrollScene({triggerElement: ".map",reverse: false, triggerHook: 'onEnter', offset: 340})
			.setTween(map_tween)
			.addTo(controller);
	else
		var map_scene = new ScrollScene({triggerElement: ".map",reverse: false})
			.setTween(map_tween)
			.addTo(controller);

	// Coin stacker
	var coin_tween = new TimelineMax();

	var coin_number_2 = {var:0}, coin_number_3 = {var: 0};

	if(parseFloat($(window).width(), 10)>=992 || (parseFloat($(window).width()) >= 480 && parseFloat($(window).width()) < 768) ){
		coin_tween.fromTo(".coin-label-1", 0.1,{opacity: 0}, {opacity: 1})
			.fromTo(".coin-head-wrapper-1", 0.1, {opacity: 0}, {opacity: 1})
			.fromTo(".coin-graph .coin1", 0.3, {height: 0, autoAlpha: 0}, {height: 78, autoAlpha: 1})
			.fromTo(".coin-head-wrapper-1",0.3,{bottom:0},{bottom: 70}, "-=0.3")
			.fromTo(".coin-label-2", 0.1,{opacity: 0}, {opacity: 1})
			.fromTo(".coin-head-wrapper-2", 0.1, {opacity: 0}, {opacity: 1})
			.fromTo(".coin2", 0.3, {height: "0px", autoAlpha: 0}, {height: "78px", autoAlpha: 1})
			.fromTo(".coin-head-wrapper-2",0.3,{bottom:0},{bottom: 70}, "-=0.3")
			.fromTo(".coin-number-2", 0.1, {opacity:0}, {opacity:1})
			.fromTo(coin_number_2, 0.2, {var: 0}, {var: 52, onUpdate: function(){
				$(".coin-number-2").html("+"+coin_number_2.var.toFixed(0)+"%");
			}})
			.to(".coin2", 0.3, {height: "147px"},"-=0.3")
			.to(".coin-head-wrapper-2",0.3,{bottom: 139}, "-=0.3")
			.fromTo(".coin-label-3", 0.1,{opacity: 0}, {opacity: 1})
			.fromTo(".coin-head-wrapper-3", 0.1, {opacity: 0}, {opacity: 1})
			.fromTo(".coin3", 0.3, {height: "0px", autoAlpha: 0}, {height: "147px", autoAlpha: 1})
			.fromTo(".coin-head-wrapper-3",0.3,{bottom:0},{bottom: 139}, "-=0.3")
			.fromTo(coin_number_3, 0.3, {var: 0}, {var: 34, onUpdate: function(){
				$(".coin-number-3").html("+"+coin_number_3.var.toFixed(0)+"%");
			}})
			.fromTo(".coin-number-3", 0.1, {opacity:0}, {opacity:1})
			.fromTo(".coin3", 0.3, {height: "147px"}, {height: "259px"},"-=0.3")
			.to(".coin-head-wrapper-3",0.3,{bottom: 251}, "-=0.3");
	}
	if((parseFloat($(window).width(), 10)>=768 && parseFloat($(window).width(), 10)<992) || (parseFloat($(window).width(), 10)<480)){
		coin_tween.fromTo(".coin-label-1", 0.1,{opacity: 0}, {opacity: 1})
			.fromTo(".coin-head-wrapper-1", 0.1, {opacity: 0}, {opacity: 1})
			.fromTo(".coin1", 0.3, {height: "0px", autoAlpha: 0}, {height: "62px", autoAlpha: 1})
			.fromTo(".coin-head-wrapper-1",0.3,{bottom:0},{bottom: 56}, "-=0.3")
			.fromTo(".coin-label-2", 0.1,{opacity: 0}, {opacity: 1})
			.fromTo(".coin-head-wrapper-2", 0.1, {opacity: 0}, {opacity: 1})
			.fromTo(".coin2", 0.3, {height: "0px", autoAlpha: 0}, {height: "62px", autoAlpha: 1})
			.fromTo(".coin-head-wrapper-2",0.3,{bottom:0},{bottom: 56}, "-=0.3")
			.fromTo(".coin-number-2", 0.1, {opacity:0}, {opacity:1})
			.fromTo(coin_number_2, 0.2, {var: 0}, {var: 52, onUpdate: function(){
				$(".coin-number-2").html("+"+coin_number_2.var.toFixed(0)+"%");
			}})
			.to(".coin2", 0.3, {height: "118px"},"-=0.3")
			.to(".coin-head-wrapper-2",0.3,{bottom: 112}, "-=0.3")
			.fromTo(".coin-label-3", 0.1,{opacity: 0}, {opacity: 1})
			.fromTo(".coin-head-wrapper-3", 0.1, {opacity:0}, {opacity:1})
			.fromTo(".coin3", 0.3, {height: "0px", autoAlpha: 0}, {height: "118px", autoAlpha: 1})
			.fromTo(".coin-head-wrapper-3",0.3,{bottom:0},{bottom: 112}, "-=0.3")
			.fromTo(".coin-number-3", 0.1, {opacity:0},{opacity: 1})
			.fromTo(coin_number_3, 0.3, {var: 0}, {var: 34, onUpdate: function(){
				$(".coin-number-3").html("+"+coin_number_3.var.toFixed(0)+"%");
			}})
			.fromTo(".coin3", 0.3, {height: "118px"}, {height: "207px"},"-=0.3")
			.to(".coin-head-wrapper-3",0.3,{bottom: 202}, "-=0.3");
	}

	if(parseFloat($(window).width(), 10)>=992)
		var coin_scene = new ScrollScene({triggerElement: ".coin-graph-wrapper", reverse: false, triggerHook: 'onEnter', offset: 435})
			.setTween(coin_tween)
			.addTo(controller);
	else
		var coin_scene = new ScrollScene({triggerElement: ".coin-graph-wrapper", reverse: false})
			.setTween(coin_tween)
			.addTo(controller);

	$(window).on("resize", function(){
		if((parseFloat($(window).width())>= 768 && parseFloat($(window).width())< 992) || (parseFloat($(window).width(), 10)<480)){
			$(".coin-head-wrapper-1").css("bottom", 56);
			$(".coin-head-wrapper-2").css("bottom", 112);
			$(".coin-head-wrapper-3").css("bottom", 202);
			$(".coin-graph .coin1").css("height", 62);
			$(".coin-graph .coin2").css("height", 118);
			$(".coin-graph .coin3").css("height", 207);
		}
		if(parseFloat($(window).width()) >= 992 || (parseFloat($(window).width()) >= 480 && parseFloat($(window).width()) < 768) ){
			$(".coin-head-wrapper-1").css("bottom", 70);
			$(".coin-head-wrapper-2").css("bottom", 139);
			$(".coin-head-wrapper-3").css("bottom", 251);
			$(".coin-graph .coin1").css("height", 78);
			$(".coin-graph .coin2").css("height", 147);
			$(".coin-graph .coin3").css("height", 259);
		}
	});

	// Horizontal Graph 1
	var horz1_width = "15%";
	if(parseFloat($(window).width()) < 480) horz1_width = "50px";
	var horz_tween = new TimelineMax();
	var horz_year1 = {var: 0}, horz_year2 = {var: 0};
	horz_tween.fromTo(".horz-graph  .year-1", 0.5, {opacity: 0}, {opacity: 1})
		.fromTo(".horz-wrapper-1", 0.5, {width:"0%"}, {width:"100%"})
		.fromTo(".horz-graph .year-2", 0.5, {opacity: 0}, {opacity: 1})
		.fromTo(".horz-wrapper-2", 0.5, {width:"0%"}, {width:"100%"})
		.fromTo(horz_year1, 0.5, {var:0}, {var:12, onStart: function(){
			$('.horz-label-1').addClass("wow animated fadeIn");
			$('.horz-label-1').css("visibility", "visible");
			$(".horz-number-1").css("visibility", "visible");
		}, onUpdate: function(){
			$(".horz-number-1").html(horz_year1.var.toFixed(0)+"%");
		}})
		.fromTo(".horz1", 0.5, {width: "0px", autoAlpha: 0}, {width: horz1_width, autoAlpha: 1}, "-=0.5")
		.fromTo(horz_year2, 0.5, {var: 0}, {var: 28, onStart: function(){
			$('.horz-label-2').addClass("wow animated fadeIn");
			$('.horz-label-2').css("visibility", "visible");
			$(".horz-number-2").css("visibility", "visible");
		}, onUpdate: function(){
			$(".horz-number-2").html(horz_year2.var.toFixed(0)+"%");
		}})
		.fromTo(".horz2", 1, {width: "0%"}, {width: "35%"}, "-=0.5");
	if( parseFloat($(window).width(),10) >= 768 )
		var horz_scene = new ScrollScene({triggerElement: ".horz-graph-wrapper", reverse: false, triggerHook: 'onEnter', offset: 390})
			.setTween(horz_tween)
			.addTo(controller);
	else
		var horz_scene = new ScrollScene({triggerElement: ".horz-graph-wrapper", reverse: false})
			.setTween(horz_tween)
			.addTo(controller);

	$(window).on('resize', function(){
		var horz1_width = "15%";
		if(parseFloat($(window).width()) < 480) horz1_width = "50px";
		$(".horz1").css("width", horz1_width);
	});

	// Hello Horz Graph
	if(parseFloat($(window).width())>=480){
		var hello3 = (parseFloat($(window).width())>=992 || parseFloat($(window).width())<768)?350:238;
		var hello2 = (parseFloat($(window).width())>=992 || parseFloat($(window).width())<768)?200:170;
		var hello_tween = new TimelineMax();
		var hello_year2 = {var: 0}, hello_year3 = {var:0};
		hello_tween.fromTo(".hello-graph .year-1", 0.3, {opacity: 0}, {opacity: 1})
			.fromTo(".hello-graph .year-2", 0.3, {opacity: 0}, {opacity: 1})
			.fromTo(".hello-graph .year-3", 0.3, {opacity: 0}, {opacity: 1})
			.fromTo(".hello1", 0.5, {width: "0px"}, {width: "75px"})
			.fromTo(".hello2", 0.5, {width: "0px", autoAlpha: 0}, {width: "75px", autoAlpha:1}, "-=0.5")
			.fromTo(hello_year2, 0.5,{var: 0}, {var: 61, onUpdate: function(){
				$(".hello-label-2").html("+"+hello_year2.var.toFixed(0)+"%");
			}})
			.fromTo(".hello-label-2", 0.5, {opacity: 0}, {opacity: 1}, "-=0.5")
			.fromTo(".hello2", 0.5, {width: "75px"}, {width: hello2}, "-=0.5")
			.fromTo(".hello-label-2", 0.5, {left: "0px"}, {left: hello2-55},"-=0.5")
			
			.fromTo(".hello3", 0.5, {width: "0px", autoAlpha: 0}, {width: "75px", autoAlpha:1}, "-=1")
			.fromTo(hello_year3, 0.5,{var: 0}, {var: 328, onUpdate: function(){
				$(".hello-label-3").html("+"+hello_year3.var.toFixed(0)+"%");
			}},"-=0.5")
			.fromTo(".hello-label-3", 0.5, {opacity: 0}, {opacity: 1}, "-=0.5")
			.fromTo(".hello3", 0.5, {width: "75px"}, {width: hello3}, "-=0.5")
			.fromTo(".hello-label-3", 0.5, {left: "0px"}, {left: hello3-65},"-=0.5")
			.fromTo(".hello-number-1", 0.5, {opacity: 0}, {opacity:1})
			.fromTo(".hello-number-2", 0.5, {opacity: 0}, {opacity:1})
			.fromTo(".hello-number-3", 0.5, {opacity: 0}, {opacity:1});
		if( parseFloat($(window).width(),10) >= 768 )
			var hello_scene = new ScrollScene({triggerElement: ".hello-graph-wrapper", reverse: false, triggerHook: 'onEnter', offset: 370})
				.setTween(hello_tween)
				.addTo(controller);
		else
			var hello_scene = new ScrollScene({triggerElement: ".hello-graph-wrapper", reverse: false})
				.setTween(hello_tween)
				.addTo(controller);
	}
	$(window).on("resize", function(){
		if(parseFloat($(window).width())>=480){
			var hello3 = (parseFloat($(window).width())>=992 || parseFloat($(window).width())<768)?350:238;
			var hello2 = (parseFloat($(window).width())>=992 || parseFloat($(window).width())<768)?200:170;
			$(".hello2").css("width", hello2);
			$(".hello3").css("width", hello3);
			$(".hello-label-2").css("left", hello2-55);
			$(".hello-label-3").css("left", hello3-65);
		}
		else {
			$(".hello2").css("width", "80%");
			$(".hello3").css("width", "100%");
			$(".hello-label-2").css("left", "calc( 80% - 55px)");
			$(".hello-label-3").css("left", "calc( 100% - 65px )");
		}
	});

	// Smartview percent
	var smart_percent = {var: 0};
	var smart_tween = new TimelineMax()
		.add([
			TweenMax.fromTo(".smartview-color", 1,{height: "0%"}, {height: "100%", ease:Linear.easeNone}),
			TweenMax.fromTo(smart_percent, 0.5, {var: 0}, {var: 55.5, onUpdate: function(){
				$(".smartview-percent").html(parseFloat(smart_percent.var).toFixed(1)+"<sup>%</sup>");
				$(".smartview-percent").css("color", "#95cd2b");
			}}, "-=1")
		]);
	if(parseFloat($(window).width()>=768))
		var smart_scene = new ScrollScene({triggerElement: ".smartview", reverse: false, triggerHook: 'onEnter', offset: 485})
			.setTween(smart_tween)
			.addTo(controller);
	else
		var smart_scene = new ScrollScene({triggerElement: ".smartview", reverse: false})
			.setTween(smart_tween)
			.addTo(controller);

	// Tabletview percent
	var tablet_vpercent = {var: 0};
	var tablet_tween = new TimelineMax()
		.add([
			TweenMax.fromTo(".tabletview-color", 1,{height: "0%"}, {height: "100%", ease:Linear.easeNone}),
			TweenMax.fromTo(tablet_vpercent, 0.5, {var: 0}, {var: 63.3, onUpdate: function(){
				$(".tabletview-percent").html(parseFloat(tablet_vpercent.var).toFixed(1)+"<sup>%</sup>");
				$(".tabletview-percent").css("color", "#f19134");
			}}, "-=1")
		]);
	if(parseFloat($(window).width()>=768))
		var tablet_scene = new ScrollScene({triggerElement: ".tabletview", reverse: false, triggerHook: 'onEnter', offset: 520})
			.setTween(tablet_tween)
			.addTo(controller);
	else
		var tablet_scene = new ScrollScene({triggerElement: ".tabletview", reverse: false})
			.setTween(tablet_tween)
			.addTo(controller);


	//Smartphone percent
	var sm_tween = new TimelineMax();
	var sm_percent = {var: 0};
	sm_tween.fromTo([".clock-b", ".second-b"], 0.3, {opacity: 0}, {opacity: 1, onComplete: function(){
			$(".smartmetircs-percent1").css("visibility", "visible");
		}})
		.fromTo(sm_percent, 0.5, {var: 0}, {var: 46, onUpdate: function(){
			$(".smartmetircs-percent1").html(parseInt(sm_percent.var).toFixed(0)+"<sup>%</sup>");
		}, onComplete: function(){
			$(".arrow-l").css("visibility", "visible");
			$(".arrow-l").addClass("wow fadeIn animated");
			$(".smartmetircs-percent2").css("visibility", "visible");
			$(".smartmetircs-percent2").addClass("wow slideInRight animated");
		}})
		.fromTo(".second-b", 1, {rotation: 0, transformOrigin:"center 53px"}, {rotation: 360,transformOrigin:"center 53px"}, "-=0.5")
		.fromTo(".second-b", 0.3, {rotation: 0, transformOrigin:"center 53px"}, {rotation: 30,transformOrigin:"center 53px"})

	if(parseFloat($(window).width()>=768))
		var sm_scene = new ScrollScene({triggerElement: ".smartmetrics", reverse: false, triggerHook: 'onEnter', offset: 480})
			.setTween(sm_tween)
			.addTo(controller);
	else
		var sm_scene = new ScrollScene({triggerElement: ".smartmetrics", reverse: false})
			.setTween(sm_tween)
			.addTo(controller);


	//Tablet percent
	var tablet_tween = new TimelineMax();
	var tablet_percent = {var: 0};
	tablet_tween.fromTo([".clock-y", ".second-y"], 0.3, {opacity: 0}, {opacity: 1, onComplete: function(){
			$(".tabletmetrics-percent1").css("visibility", "visible");
		}})
		.fromTo(tablet_percent, 0.5, {var: 0}, {var: 54, onUpdate: function(){
			$(".tabletmetrics-percent1").html(parseInt(tablet_percent.var).toFixed(0)+"<sup>%</sup>");
		}, onComplete: function(){
			$(".arrow-r").css("visibility", "visible");
			$(".arrow-r").addClass("wow fadeIn animated");
			$(".tabletmetrics-percent2").css("visibility", "visible");
			$(".tabletmetrics-percent2").addClass("wow slideInLeft animated");
		}})
		.fromTo(".second-y", 1, {rotation: 0, transformOrigin:"center 53px"}, {rotation: 360,transformOrigin:"center 53px"}, "-=0.5")
		.fromTo(".second-y", 0.3, {rotation: 0, transformOrigin:"center 53px"}, {rotation: 30,transformOrigin:"center 53px"});

	if(parseFloat($(window).width()>=768))
		var tablet_scene = new ScrollScene({triggerElement: ".tabletmetrics", reverse: false, triggerHook: 'onEnter', offset: 480})
			.setTween(tablet_tween)
			.addTo(controller);
	else
		var tablet_scene = new ScrollScene({triggerElement: ".tabletmetrics", reverse: false})
			.setTween(tablet_tween)
			.addTo(controller);


	// Timeline animation
	if(parseFloat($(window).width(), 10)>=992){
		for(i = 1; i <= 8; i++){
			var timeline_tween = new TimelineMax();
			var first_block = $(".timeline-container .timeline-block:nth-child(1)");
			var current_block = $(".timeline-container .timeline-block:nth-child("+i+")");
			var th1 = 0;
			if(i > 1) 
				var th1 = $(".timeline-container .timeline-block:nth-child("+(i-1)+")").offset().top - first_block.offset().top;
			var th2 = current_block.offset().top - first_block.offset().top;
			if(current_block.find(".timeline-icon").hasClass("img")){
				timeline_tween.fromTo(current_block.find(".timeline-icon"), 0.1, {scale: 0, rotation: 0, opacity: 0}, {scale: 1, rotation:360, opacity: 1})
			}
			else{
				timeline_tween.fromTo(current_block.find(".timeline-icon"), 0.1, {scale: 0, opacity: 0}, {scale: 1.7, opacity: 1})
						.fromTo(current_block.find(".timeline-icon"), 0.05, {scale: 1.7}, {scale: 1})
						.fromTo(current_block.find(".timeline-icon"), 0.1, {scale: 1}, {scale: 1.3})
						.fromTo(current_block.find(".timeline-icon"), 0.05, {scale: 1.3}, {scale: 1})
			}
			timeline_tween.fromTo(current_block.find(".timeline-line"), 0.1, {width: 0, opacity: 0}, {width: 202, opacity: 1})
							.fromTo(current_block.find(".timeline-endpoint"), 0.1, {opacity: 0}, {opacity: 1})
							.fromTo(current_block.find(".timeline-time"), 0.1, {scale: 0, opacity: 0}, {scale: 1, opacity: 1})
							.fromTo(current_block.find(".panel-body .panel-image "), 0.1, {width: "0px", autoAlpha: 0}, {width: "200px", autoAlpha: 1})
							.fromTo(current_block.find(".panel-body .panel-desc "), 0.1, {opacity: 0}, {opacity: 1});
			var timeline_scene = new ScrollScene({triggerElement: current_block, reverse: false})
				.setTween(timeline_tween)
				.addTo(controller);
		}
		for(i = 1; i <= 8; i++){
			var timeline_tween = new TimelineMax();
			var first_block = $(".timeline-container .timeline-block:nth-child(1)");
			var current_block = $(".timeline-container .timeline-block:nth-child("+i+")");
			var th1 = 0;
			if(i > 1) 
				var th1 = $(".timeline-container .timeline-block:nth-child("+(i-1)+")").offset().top - first_block.offset().top;
			var th2 = current_block.offset().top - first_block.offset().top;
			if(i > 1)
				timeline_tween.to(".timeline-container .timeline-cline", 0.5, {height: th2/*, opacity: 1*/});
			
			var timeline_scene = new ScrollScene({triggerElement: current_block.find(".timeline-icon"), reverse: false, triggerHook: 'onEnter', triggerOffset: 700, duration: 300})
				.setTween(timeline_tween)
				.addTo(controller);
		}
	}
});

$(window).on('resize', function(){
	if(parseFloat($(window).width())>= 992) {
		$(".timeline-block .timeline-content .panel-body .panel-image").css("width", 200);
		$(".timeline-container .timeline-block .timeline-line").css("width", 202);
	}
	else if(parseFloat($(window).width())>= 480 && parseFloat($(window).width()) < 992){
		$(".timeline-block .timeline-content .panel-body .panel-image").css("width", 350);
		$(".timeline-container .timeline-block .timeline-line").css("width", 4);
	}
	else {
		$(".timeline-block .timeline-content .panel-body .panel-image").css("width", 280);
		$(".timeline-container .timeline-block .timeline-line").css("width", 4);
	}

	var first_block = $(".timeline-container .timeline-block:nth-child(1)");
	var last_block = $(".timeline-container .timeline-block:nth-child(8)");
	var th2 = last_block.offset().top - first_block.offset().top;
	$(".timeline-container .timeline-cline").css("height",th2);
});

// 8 elements youtube lightbox
$(document).ready(function(){
	var video_urls = ["QoqWo3SJ73c", "CdhWhgA8Y0A", "EK0fKEvgXJo", "QKw2qlqAAW8", "y_hWeN249fs", "r_yOzJqdXFQ",
					"NHznDFD3V3k", "xAsjRRMMg_Q"];
	for(i=1;i<9;i++){
		//$(".youtube"+i).css("background-image", "url(images/youtube/youtube"+i+".jpg)");
		$(".youtube"+i).css("background-image", "url(http://img.youtube.com/vi/"+video_urls[i-1]+"/mqdefault.jpg)");
		$(".youtube"+i).css("background-position", "center center");
		$(".youtube"+i).css("background-size", "cover");
		$(".youtube"+i).css("background-repeat", "no-repeat");
		$(".youtube"+i).magnificPopup({
			items: [
			{
				src: "https://www.youtube.com/watch?v="+video_urls[i-1]
			}
			], 
			type: "iframe",
			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						'</div>', 
			patterns: {
				youtube: {
					  index: 'youtube.com/', 
					  id: 'v=', 
					  src: '//www.youtube.com/embed/%id%?autoplay=1' 
					}
				 },
				 srcAction: 'iframe_src', 
		 }
		});
	}
	$(".feature").magnificPopup({
		items: [{src: "https://www.youtube.com/watch?&v=NHznDFD3V3k"}],
		type: "iframe",
			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						'</div>', 
			patterns: {
				youtube: {
					  index: 'youtube.com/', 
					  id: 'v=', 
					  src: '//www.youtube.com/embed/%id%?autoplay=1' 
					}
				 },
				 srcAction: 'iframe_src', 
			 }
	});
});



/*-------------------------
  News Vertical Accordian
--------------------------*/
(function( $ ) {

	$.fn.bvs = function( options ) {

		// DEFAULT OPTIONS
		var settings = $.extend({
			// These are the defaults.
			// These are the events
			onComplete: false,
			onStart: false,
			onHoverOut: false,
			activeRatio: '75'
		}, options );

		var bvs = this;
		var boxCount = bvs.length;

		// TRIGGER EVENTS
		bvs.triggerEvent = function(event){
			if(event == "start-complete"){
				// trigger start and complete
				if(settings.onStart != false){
					settings.onStart(this);
				}
				setTimeout(function(){
					if(settings.onComplete != false){
						settings.onComplete(this);
					}
				},400);
			}
			else if(event == "hover-out"){
				// trigger hover out
				if(settings.onHoverOut != false){
					settings.onHoverOut(this);
				}
			}
		};

		// ANIMATION EXECUTION AND TRIGGER EVENTS
		$(bvs).hover(
			function(){
				bvs.removeClass("active");
				bvs.addClass("notactive");
				bvs.css("height",((100 - settings.activeRatio) / (boxCount - 1)) + "%");
				$(this).addClass("active");
				$(this).removeClass("notactive");
				$(this).css("height",settings.activeRatio+'%');
				bvs.triggerEvent("start-complete");
				$(this).find(".news-date").css("display","block");
				$(this).find(".news-title").css("display","block");
				$(this).find(".news-date").addClass("wow fadeIn animated");
				$(this).find(".news-title").addClass("wow fadeIn animated");
			},function(){
				bvs.removeClass("active");
				bvs.removeClass("notactive");
				bvs.triggerEvent("hover-out");
				bvs.css("height",(100 / boxCount) + "%");
				$(this).find(".news-date").css("display","none");
				$(this).find(".news-title").css("display","none");
				$(this).find(".news-date").removeClass("wow fadeIn animated");
				$(this).find(".news-title").removeClass("wow fadeIn animated");
			}
		);

		return bvs;

	};
}( jQuery ));

$(window).on('resize', function(){
	if(parseFloat($(window).width())>=768){
		$('.news').css('height', '33.33%');
		$('.news .news-date').css('display', 'none');
		$('.news .news-title').css('display', 'none');
		$(function(){
			$(".news").bvs();
		});
	}
	else {
		$(".news").unbind('mouseenter mouseleave hover');
		$(".news").off('mouseenter mouseleave hover');
		$('.news').css('height', '75%');
		$('.news .news-date').css('display', 'block');
		$('.news .news-title').css('display', 'block');
	}
});
	

Chart.defaults.global = {
	animation: false,
	showScale: false,
	scaleOverride: true,
	scaleSteps: 10,
	scaleStepWidth: 10,
	scaleStartValue: 0,
	scaleShowLabels: false,
	scaleLabel: "<%=value%>",
	scaleIntegersOnly: false,
	scaleBeginAtZero: false,
	responsive: true,
	maintainAspectRatio: false,
	showTooltips: false,
	customTooltips: false,
	onAnimationProgress: function(){},
	onAnimationComplete: function(){}
};
$(document).ready(function(){

	var controller = new ScrollMagic();

	var clock_ctx = document.getElementById("myClockPie").getContext("2d");

	var clock_values = [120, 114, 30, 24];
	var clock_colors = ["#a66bda",  "#95cd2b", "#448def", "#ec375a"];
	var clock_data = [
		{
			value: 360,
			color:"#ffffff"
		}
	];
	var clock_options = {
		animation: false,
		segmentShowStroke : false,
		animationSteps : 100,
		animationEasing : "linear",
		animateRotate : true,
		animateScale : false,
		responsive: false,
		legendTemplate : ""
	};
	var clock_i = 0;
	
	var myPieChart = new Chart(clock_ctx).Pie(clock_data,clock_options);

	var clock_percent = {var: 0};
	var clock_tween = new TimelineMax();
	clock_tween.fromTo(clock_percent, 1, {var: 0}, {var: clock_values[0], onStart: function(){
		myPieChart.addData({
			value: 0,
			color: clock_colors[0]
		}, -1);
		$(".clock-label-1").css("visibility", "visible");
		$(".clock-label-1").addClass("wow fadeIn animated");
	}, onUpdate: function(){
		myPieChart.segments[0].value = clock_percent.var.toFixed(0);
		var white_value = 360;
		white_value -= clock_percent.var.toFixed(0);
		myPieChart.segments[1].value = white_value;
		myPieChart.update();
	}});
	clock_tween.fromTo("#pieMin",1, {rotation: -180, transformOrigin:"1px 18px"}, {rotation: -60, transformOrigin:"1px 18px"}, "-=1");
	clock_tween.fromTo(clock_percent, 1, {var: 0}, {var: clock_values[1], onStart: function(){
		myPieChart.addData({
			value: 0,
			color: clock_colors[1]
		}, -1);
		$(".clock-label-2").css("visibility", "visible");
		$(".clock-label-2").addClass("wow fadeIn animated");
	}, onUpdate: function(){
		myPieChart.segments[1].value = clock_percent.var.toFixed(0);
		var white_value = 360;
		for(i=0;i<1;i++){
			white_value -= clock_values[i];
		}
		white_value -= clock_percent.var.toFixed(0);
		myPieChart.segments[2].value = white_value;
		myPieChart.update();
	}});
	clock_tween.fromTo("#pieMin",1, {rotation: -60, transformOrigin:"1px 18px"}, {rotation: 54, transformOrigin:"1px 18px"}, "-=1");
	clock_tween.fromTo(clock_percent, 0.5, {var: 0}, {var: clock_values[2], onStart: function(){
		myPieChart.addData({
			value: 0,
			color: clock_colors[2]
		}, -1);
		$(".clock-label-3").css("visibility", "visible");
		$(".clock-label-3").addClass("wow fadeIn animated");
	}, onUpdate: function(){
		myPieChart.segments[2].value = clock_percent.var.toFixed(0);
		var white_value = 360;
		for(i=0;i<2;i++){
			white_value -= clock_values[i];
		}
		white_value -= clock_percent.var.toFixed(0);
		myPieChart.segments[3].value = white_value;
		myPieChart.update();
	}});
	clock_tween.fromTo("#pieMin",0.5, {rotation: 54, transformOrigin:"1px 18px"}, {rotation: 84, transformOrigin:"1px 18px"}, "-=0.5");
	clock_tween.fromTo(clock_percent, 0.5, {var: 0}, {var: clock_values[3], onStart: function(){
		myPieChart.addData({
			value: 0,
			color: clock_colors[3]
		}, -1);
		$(".clock-label-4").css("visibility", "visible");
		$(".clock-label-4").addClass("wow fadeIn animated");
	}, onUpdate: function(){
		myPieChart.segments[3].value = clock_percent.var.toFixed(0);
		var white_value = 360;
		for(i=0;i<3;i++){
			white_value -= clock_values[i];
		}
		white_value -= clock_percent.var.toFixed(0);
		myPieChart.segments[4].value = white_value;
		myPieChart.update();
	}});
	clock_tween.fromTo("#pieMin",0.5, {rotation: 84, transformOrigin:"1px 18px"}, {rotation: 108, transformOrigin:"1px 18px"}, "-=0.5");
	clock_tween.fromTo("#pieMin",0.5, {rotation: 108, transformOrigin:"1px 18px"}, {rotation: 180, transformOrigin:"1px 18px"});
	clock_tween.fromTo("#pieMin",1, {rotation: 180, transformOrigin:"1px 18px"}, {rotation: 258, transformOrigin:"1px 18px"});

	if( parseFloat($(window).width(),10) >= 768 )
		var clock_scene = new ScrollScene({triggerElement: ".clock", reverse: false, triggerHook: 'onEnter', offset: 430})
			.setTween(clock_tween)
			.addTo(controller);
	else
		var clock_scene = new ScrollScene({triggerElement: ".clock", reverse: false})
			.setTween(clock_tween)
			.addTo(controller);

	//Donut Chart
	var donut_ctx = document.getElementById("myDonutChart").getContext("2d");

	var donut_data = [
		{
			value: 34,
			color:"#49b7ea"
		}, {
			value: 66,
			color:"#efd246"
		}
	];
	var donut_options = {
		animation: true,
		segmentShowStroke : false,
		animationSteps : 30,
		animationEasing : "linear",
		percentageInnerCutout: 50,
		animateRotate : true,
		animateScale : false,
		responsive: false,
		legendTemplate : ""
	};
	
	
	var donut_tween = new TimelineMax();
	donut_tween.to("#myDonutChart", 0.5,{ease: Strong.easeInOut, onComplete: function(){
			var myDonutChart = new Chart(donut_ctx).Doughnut(donut_data,donut_options);
		}})
		.fromTo(".donut-number-1", 0.5, {opacity: 0}, {opacity: 1}, "+=0.5")
		.fromTo(".donut-label-1", 0.5, {opacity: 0}, {opacity: 1}, "-=0.5")
		.fromTo(".donut-number-2", 0.5, {opacity: 0}, {opacity: 1})
		.fromTo(".donut-label-2", 0.5, {opacity: 0}, {opacity: 1}, "-=0.5");

	if( parseFloat($(window).width(),10) >= 768 )
		var donut_scene = new ScrollScene({triggerElement: "#myDonutChart", reverse: false, triggerHook: 'onEnter', offset: 440})
			.setTween(donut_tween)
			.addTo(controller);
	else
		var donut_scene = new ScrollScene({triggerElement: "#myDonutChart", reverse: false})
			.setTween(donut_tween)
			.addTo(controller);
	
});
var wave_timer = null;
$(window).on('resize', function(){
	if(wave_timer!=null) clearInterval(wave_timer);
	$("#myChart").html('');
	var points = 7;
	if($(window).width()<768) points=5;

	var line_ctx = document.getElementById("myChart").getContext("2d");
	var line_data = {
		labels: ["", "", "", "", "", "", ""],
		datasets: [
			{
				fillColor: "#357ee3",
				strokeColor: "#357ee3",
				pointColor: "#458ef3",
				pointStrokeColor: "#1e62c0",
				pointHighlightFill: "#1e62c0",
				pointHighlightStroke: "#1e62c0",
				data: [90, 94, 98, 95, 93, 96, 100]
			}
		]
	};
	line_data.labels = line_data.labels.slice(0,points);
	line_data.datasets[0].data = line_data.datasets[0].data.slice(0,points);
	var line_step = [0.3, -0.3, 0.3, -0.3, -0.3, 0.3, -0.3];
	var line_options = {
		scaleShowGridLines : false,
		scaleShowHorizontalLines: false,
		scaleShowVerticalLines: false,
		bezierCurve : false,
		pointDot : true,
		pointDotRadius : 7,
		pointDotStrokeWidth : 5,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		legendTemplate : ""
	}
	var myLineChart = new Chart(line_ctx).Line(line_data, line_options);
	wave_timer = setInterval(function(){ 
		for(i=0;i<points;i++){
			if(myLineChart.datasets[0].points[i].value >= 100) line_step[i] = -0.3;
			else if(myLineChart.datasets[0].points[i].value <= 90) line_step[i] = 0.3;
			myLineChart.datasets[0].points[i].value += line_step[i];
		}
		myLineChart.update();
	}, 100);
});
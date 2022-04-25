
$(window).load(function () {
	var h=$(window).height();
	var head=$("header").height();
	var body=$("body").height();
	var hsize = $(window).height()-head;
	if(body>=h){
		$(".content").css("height", "auto");
	}
	if(body<=h){
		$(".content").css("height",hsize + "px");
	}
});
$(window).resize(function () {
	var h=$(window).height();
	var body=$("body").height();
	var head=$("header").height();
	var hsize = $(window).height()-head;
	if(body>=h){
		$(".content").css("height", "auto");
	}
	if(body<=h){
		$(".content").css("height",hsize + "px");
	}
});
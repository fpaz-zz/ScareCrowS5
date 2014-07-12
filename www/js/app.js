function navigateTo(step) {
	history.pushState(step, step, '#' + step);
	window.location.href='#'+step;
	//$('html,body').scrollTop($('#' + step).offset().top);
	if(step == 'login'){
		$('input[name=email]').focus();
	}
}

function loaderInstall() {
	var stepId = window.location.href.split('#')[1];

	if(stepId && (stepId == 'install-screen' || stepId == 'loading-screen')){
		setTimeout(function(){
			var nextId = $('#' + stepId).next().attr("id");
			navigateTo(nextId);
			
		}, 1500);
	}	
}
var touchmove=false;

$(document).on('ready', function(){
	$("dd a.hotspot").click(function(){
		navigateTo(this.href.split("#")[1]);
		return false;
	});

	window.addEventListener("popstate", loaderInstall);

	$("#register-swipe").bind("touchmove", function(){
		touchmove=true;
	}).bind('touchend', function(event){
		var indicator = $("ul#indicator");
		var boxSize = indicator.find("li").size();

		if(!touchmove) return false;

		if(boxSize == 8){
			navigateTo("step3");
		}else{
			indicator.append("<li></li>");
		}
		touchmove=false;
	});

	$("#swipe a").bind("touchmove", function(event){
		touchmove=true;
	}).bind("touchend", function(event){
		if(!touchmove) return false;
		navigateTo(this.href.split("#")[1]);
		touchmove=false;
	});

	loaderInstall();
	
	// make app fullscreen	
	document.addEventListener("deviceready", function(){
		StatusBar.hide();
	}, false);
});
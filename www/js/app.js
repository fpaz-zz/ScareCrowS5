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

$(document).on('ready', function(){
	$("dd a.hotspot").click(function(){
		navigateTo(this.href.split("#")[1]);
		return false;
	});

	window.addEventListener("popstate", loaderInstall);

	$("#register-swipe").bind('touchend', function(event){
		var indicator = $("ul#indicator");
		var boxSize = indicator.find("li").size();

		if(boxSize == 8){
			navigateTo("step3");
		}else{
			indicator.append("<li></li>");
		}
	});

	$("#swipe a").bind("touchend", function(event){
		navigateTo(this.href.split("#")[1]);
	});

	loaderInstall();
	
	// make app fullscreen	
	document.addEventListener("deviceready", function(){
		StatusBar.hide();
	}, false);
});
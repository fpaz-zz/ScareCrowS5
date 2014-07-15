function navigateTo(step) {
	history.pushState(step, step, '#' + step);
	
	window.location.href= '#' + step;

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
			vibrate(500);
		}, 1500);
	}	
}

function vibrate(ms) {
	try{
		navigator.notification.vibrate(ms);
	}catch(e){
		throw("Doesn't support vibrate");
	}	
}

function onDeviceReady(){
	$("dd a.hotspot").click(function(){
		navigateTo(this.href.split("#")[1]);
		return false;
	});

	$("#register-swipe").on('swipedown', function(e,data){
		var indicator = $("ul#indicator");
		var boxSize = indicator.find("li").size();

		if(boxSize == 7){
			vibrate(500);
			navigateTo("step3");
		}else{
			indicator.append("<li></li>");
			vibrate(80);
		}
	}).on('touchmove touchstart touchend', function(e){e.preventDefault();});

	$("#link-swipe").on('swipedown', function(e,data){
		navigateTo('confirm');
		vibrate(500);
	}).on('touchmove touchstart touchend', function(e){e.preventDefault();});

	window.addEventListener("popstate", loaderInstall);

	loaderInstall();
}

$(document).ready(function(){
	if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
		try{
			document.addEventListener("deviceready", onDeviceReady, false);	
  			
  			document.addEventListener("backbutton", function (e) {
				if (window.location.hash == "") {
                	e.preventDefault();
                	navigator.app.exitApp();
            	}
           		else {
                	navigator.app.backHistory();
            	}
        	}, false);			
		}catch(e){};
	}else{
		onDeviceReady();
	}
});
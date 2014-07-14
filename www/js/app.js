function navigateTo(step) {
	history.pushState(step, step, '#' + step);
	window.location.href='#'+step;

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
			try{
				navigator.notification.vibrate(500);
			}catch(e){
				throw("Doesn't support vibrate");
			}
		}, 1500);
	}	
}

function onDeviceReady(){
	alert("Device Ready!");
	$("dd a.hotspot").click(function(){
		navigateTo(this.href.split("#")[1]);
		return false;
	});

	$("#register-swipe").swipedown(function(event){
		var indicator = $("ul#indicator");
		var boxSize = indicator.find("li").size();
		console.log("swipedown");
		if(boxSize == 7){
			navigateTo("step3");
		}else{
			indicator.append("<li></li>");
			try{
				navigator.notification.vibrate(100);
			}catch(e){
				throw("Doesn't support vibrate");
			}
		}
	});

	$("#swipe-link").swipedown(function(event){
		navigateTo(this.href.split("#")[1]);
		try{
			navigator.notification.vibrate(1000);
		}catch(e){
			throw("Doesn't support vibrate");
		}
	});

	window.addEventListener("popstate", loaderInstall);

	loaderInstall();
	
	// make app fullscreen	
	StatusBar.hide();
}

$(document).ready(function(){
	if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
		document.addEventListener("deviceready", onDeviceReady, false);
	}else{
		onDeviceReady();
	}
});
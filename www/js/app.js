function navigateTo(step) {
	if(step == "install-screen") {
		if(!$("#install-NNL").hasClass("checked")) {
			return false;
		}
	}

	if(step == "loading-screen") {
		if($("input[name=email]").val() == "" || $("input[name=password]").val() == ""){
			return false;	
		}
	}

	if(step == "confirm") {
		if(!$("#install-PP").hasClass("checked")){
			step = "install-paypal-app";
			$("#install-PP").addClass("checked");
		}
	}

	history.pushState(step, step, '#' + step);
	
	window.location.href= '#' + step;

	if(step == 'login'){
		$('input[name=email]').focus();
	}
}

function loaderInstall() {
	var stepId = window.location.href.split('#')[1];

	if(stepId && (stepId == 'install-screen' || stepId == 'loading-screen' || stepId == 'install-paypal-app-screen')){
		setTimeout(function(){
			var nextId = $('#' + stepId).next().attr("id");
			navigateTo(nextId);
			vibrate(500);
		}, 5000);
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

	$("#register-swipe").bind('touchend', function(e){
		var indicator = $("ul#indicator");
		var boxSize = indicator.find("li").size();

		if(boxSize == 7){
			vibrate(500);
			navigateTo("step3");
		}else{
			indicator.append("<li></li>");
			vibrate(80);
		}
	});

	$("#link-swipe").bind('touchend', function(e){
		navigateTo('confirm');
		vibrate(500);
	});

	$(".checkbox").click(function(){
		$(this).toggleClass("checked");
	});

	$("#use-paypal").click(function(){
		$(this).toggleClass("toggle-on");
		setTimeout(function(){ navigateTo("splash")},1000);
	});

	window.addEventListener("popstate", loaderInstall);
	
	document.addEventListener("resume", function(){
		window.location.href="index.html";
	}, false);

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
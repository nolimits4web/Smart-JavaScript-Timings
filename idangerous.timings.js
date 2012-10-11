/*
 * Smart Timings - Use setTimeout and setInterval with safe
 *
 * Copyright 2012, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: October 11, 2012
*/

function set_timeout(func, time) {
	//Get Document State
	var hidden, change, vis = {
			hidden: "visibilitychange",
			mozHidden: "mozvisibilitychange",
			webkitHidden: "webkitvisibilitychange",
			msHidden: "msvisibilitychange",
			oHidden: "ovisibilitychange"
		};             
	for (var hidden in vis) {
		if (vis.hasOwnProperty(hidden) && hidden in document) {
			change = vis[hidden];
			break;
		}
	}
	if(!change){
		//IE6-9
		return setTimeout(function(){
			func();	
		},time);
	}
	var timeStart = (new Date()).getTime();
	var timeLeft = false;
	
	//Timeout Counter
	function countTime() {
		if (document[hidden]) {
			timeLeft = time - (( new Date() ).getTime() - timeStart);
			document.removeEventListener(change, countTime);
		}
	}
	document.addEventListener(change, countTime);
	if (!document[hidden]) {
		return setTimeout(function(){
			if (!document[hidden]) func();
			else {
				function continueTimeOut() {
					if (!document[hidden]) {
						set_timeout(func, timeLeft);
						document.removeEventListener(change, continueTimeOut);
					}
				}
				document.addEventListener(change, continueTimeOut);
			}
		}, time);	
	}
	else {
		function onChange(e) {
			if (!document[hidden]) {
				document.removeEventListener(change, onChange);
				set_timeout(func,time);	
			}
		}
		document.addEventListener(change, onChange);
	}
}
function set_interval(func, time, variable, scope) {
	variable = variable || '_undefined_interval_id';
	scope = scope || window;
	
	scope[variable] = set_timeout(function(){
		func();
		return set_interval(func, time, variable, scope);	
	},time);

	return scope[variable];
}
Smart-JavaScript-Timings
========================

Small script that allows you to use <strong>setTimeout and setInterval safety in consideration with page visibility</strong>.
This script is especially useful in using with animation in sliders, galleries, something with auto play, etc.
Usage is pretty easy and almost the same as with well-known setTimeout() and setInterval():

<pre>
set_timeout(func, delay);
	- func: function to execute
	- delay: delay before execution of function, in ms

set_interval(func, delay, variable, scope);
	- func: function to execute
	- delay: delay between executions (repeat) of function, in ms
	- variable: String name of variable where to store interval id. Not required
	- scope: Object where to search variable. By default equal to "window". Not required
</pre>

For example:

<pre>

/* Timeout */
set_timeout(function(){ alert('x') }, 5000)

// or:
var foo = set_timeout(function(){ alert('x') }, 5000);

// and to cancel it:
clearTimeout(foo); 


/* Interval */
set_interval(function(){ alert('x') }, 5000)

// or:
var bar = set_interval(function(){ alert('x') }, 5000, 'bar');

// and to cancel it:
clearTimeout(bar); //Pay attention that there is "clearTimeout", NOT "clearInterval"

</pre>


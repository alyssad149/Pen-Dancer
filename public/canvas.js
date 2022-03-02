function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const d = new Date();
var drawingObj = new Object();

let isDrawing = false;
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#" + getParameterByName("background_color");
ctx.fillRect(0, 0, canvas.width, canvas.height);

// var drawingTimerWorker = null;

// starts after 1st isPlaying is clicked to just get the 


var isPlaying = false;
document.getElementById('togglePlay').addEventListener("click", function(e) {
	drawingObj.startTime = d.getTime();
	this.style.display = "none";
	// isPlaying = true; removed isplaying from here because I want it more synced with music
	// now called from music.js in the togglePlay event listener
});

drawingObj.drawing = [];


if (window.Worker){

	canvas.addEventListener('mousedown', e => {
		if(isPlaying) {		
			x = e.offsetX;
			y = e.offsetY;
			isDrawing = true;
			// drawingTimerWorker.postMessage([x, y]);
			drawingObj.drawing.push([new Date().getTime(), x, y]);
		}
	});

	canvas.addEventListener('mousemove', e => {
		if (isPlaying) {
			if (isDrawing === true) {
			    drawLine(ctx, x, y, e.offsetX, e.offsetY);
			    x = e.offsetX;
			    y = e.offsetY;
			    // drawingTimerWorker.postMessage([x, y]);
			    drawingObj.drawing.push([new Date().getTime(), x, y]);
			}
		}
	});

	window.addEventListener('mouseup', e => {
		if(isPlaying){
		  if (isDrawing === true) {
		    drawLine(ctx, x, y, e.offsetX, e.offsetY);
		    x = 0;
		    y = 0;
		    isDrawing = false;
		    // drawingTimerWorker.postMessage([x, y]);
		    drawingObj.drawing.push([new Date().getTime(), x, y]);
		  }
		}
	});

	function drawLine(context, x1, y1, x2, y2) {
	  context.beginPath();
	  context.strokeStyle = '#' + getParameterByName("foreground_color");
	  context.lineWidth = 1;
	  context.moveTo(x1, y1);
	  context.lineTo(x2, y2);
	  context.stroke();
	  context.closePath();
	}
}





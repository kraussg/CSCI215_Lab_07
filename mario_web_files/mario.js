// JavaScript for creating interactive animations on a canvas 
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"
// declare the background image
var bgImage = new Image();
var  mario = new Image();
var marioL = new Image();
var marioR = new Image();

// Is called when the window loads;
function init() {


	// Initialize Mario Object
	// TODO: Put Mario on the ground instead of the cloud
	Mario = {
		x: 100,
		y: 280,
		w: 50,
		h: 80,
		JumpSound: new Audio('jump.wav'),
		BackgroundSound: new Audio("mario_08.wav"),
		Image: (function() {
			var temp = new Image();
			temp.src = "mario1.png";
			return temp;})(),
		moving: "no",
		timer: "",
		timerInterval: 10
	};

	bgImage.src = "marioBG.jpg";
	draw();

	// TODO: (OPTIONAL) set mario_08.wav as background music

}

////////////////////////////////////////////////////////////////////

function draw() {

	// Get Drawing Area
	var ctx = document.getElementById("mario_canvas").getContext("2d");
	
	// If you want to display images on the canvas when it is initially
	// loaded, you must do it this way
	bgImage.onload = function(){
		ctx.drawImage(bgImage, 0, 0);
		ctx.drawImage(mario, 100, 615, 50, 80);

    }

	/*
	 * TODO: Draw Mario's initial image
	 */
		//Mario.Image.src = "mario1.png";


	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0); 
		renderMario();
	}

	/*
	 * TODO: Alter the y coordinates so Mario will jump while on the ground
	 */
	function renderMario(){
		if (Mario.y > 500 && Mario.moving == "up") {
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			// Change the y value each time 
			Mario.y -= 5; // move 5 px up
			//ctx.drawImage(bgImage, 0, 0 );// g adddddddddddddddddd
			//ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);//g add
		}else if(Mario.y <= 500 && Mario.moving == "up"){
			Mario.moving = "down";
			//Mario.y +=5; //g addddddddddd
		} else if(Mario.y < 615 && Mario.moving == "down"){
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			Mario.y += 5; // move 5 px back down after a jump
		}else if(Mario.y === 615 && Mario.moving == "no"){
			Mario.moving = "up";
			Mario.JumpSound.play();
		}else{
			Mario.moving = "no";
			Mario.Image.src = "mario1.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
		}	
	}
	///////////////////////////////////////////////////////////////////


	/* Monitor key strokes for user input:
	 *
	 * If Enter/Return is pressed, then call the render function
	 * which paints the new scene to the canvas.
	 *
	 * TODO: Add code to set Mario image to proper image whether L or R button pressed
	 * TODO: Stop Mario if he runs out of room
	 *
	 */
	document.body.onkeydown = function(e) {  // listen for a key

    	e = event || window.event;             // any kind of event
    	var keycode = e.charCode || e.keyCode; // any kind of key
		console.log(keycode);
		// The user wants Mario to jump:
    	if(keycode === 13 && Mario.moving == "no") {
    		Mario.moving = "up"
        	Mario.timer = setInterval(render, Mario.timerInterval); 
    	}
    	if(keycode === 37 && Mario.x >0){
    		Mario.moving = "left";
    		mario.src = "marioturnsleft.png";
    		ctx.drawImage(mario, Mario.x, Mario.y, Mario.w, Mario.h )
    		Mario.timer = setTimeout(faceForward, 200);
			lef(Mario.moving);
		}
		if(keycode=== 39 && Mario.x<1150){
			Mario.moving = "right";
			Mario.x += 5;
			mario.src = "marioturnsright.png";
            ctx.drawImage(mario, Mario.x, Mario.y, Mario.w, Mario.h )
			Mario.timer = setTimeout(faceForward, 200);
            right(Mario.moving);
        }



    }

    /* TODO:
     * TODO: Capture keycodes for L and R. In each, set a timeout that calls a function
     * TODO: to face Mario forward after 200 ms. HINT: setTimeout(function, timeInMilliSecs)
     */
    document.body.onkeyup = function(e) {  // listen for a key
		setTimeout(faceForward(), 200);
    }


    /*
     * TODO: Face Mario forward. Do not forget to draw the background image first
     */
    function faceForward() {
		ctx.drawImage(bgImage, 0, 0);
		Mario.Image.src = "mario1.png";
		ctx.drawImage(mario, Mario.x, Mario.y, Mario.w, Mario.h);
		//clearTimeout();
    }
	
} // close draw() 

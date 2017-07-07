var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
	//Make the canvas occupy the full page
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W-650;
	canvas.height = H-200;
	body = [];
	randomFood = {};
	count = 0;
	prevDir = '';
	bodyWidth = 10;
	bodyHeight = 10;
	function fillBackgroundColor(){
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	function generateBodyPart(b,dir){
		bodyLength = b.length;
		var bodyPart = {};
		if(dir == 'left'){ //snake moving in left direction
			bodyPart.x = bodyLength==0?10:b[bodyLength-1].x+bodyWidth;
			bodyPart.y = bodyLength==0?10:b[bodyLength-1].y;		
		}else if(dir == 'right'){ //snake moving in right direction
			bodyPart.x = bodyLength==0?10:b[bodyLength-1].x-bodyWidth;
			bodyPart.y = bodyLength==0?10:b[bodyLength-1].y;		
		}else if(dir == 'up'){ //snake moving in up direction
			bodyPart.x = bodyLength==0?10:b[bodyLength-1].x;
			bodyPart.y = bodyLength==0?10:b[bodyLength-1].y+bodyHeight;		
		}else if(dir == 'down'){ //snake moving in down direction
			bodyPart.x = bodyLength==0?10:b[bodyLength-1].x;
			bodyPart.y = bodyLength==0?10:b[bodyLength-1].y-bodyHeight;		
		}
		bodyPart.h = bodyHeight;
		bodyPart.w = bodyWidth;
		b.push(bodyPart);
		drawBodyPart(b);
	}
	function drawBodyPart(array){
			bodyLength = array.length;
			for(k=0;k<bodyLength;k++){
				part = array[k];
				ctx.beginPath();
				ctx.lineWidth = "2";
				ctx.strokeStyle = "black";
				ctx.fillStyle = "white";
				ctx.rect(part.x, part.y, bodyWidth, bodyHeight);
				ctx.stroke();
				ctx.fill();
			}			
	}
	function generateRandomFood(){
			randomX= Math.round((Math.random()*canvas.width-10)/10)*10;
			randomY= Math.round((Math.random()*canvas.height-10)/10)*10;
			randomFood.x = randomX;
			randomFood.y = randomY
			drawRandomFood(randomFood);
	}
	function drawRandomFood(randomFood){
			ctx.rect(randomFood.x, randomFood.y, bodyWidth, bodyHeight);
			ctx.fillStyle = "white";
			ctx.fill();
	}
	function generateScore(){
		count ++;
		$('#score').text(count);
	}
	function collisionDetection(body,dir){
			head = body[0];
			if(randomFood.x == head.x && randomFood.y == head.y){
				generateRandomFood();
				generateBodyPart(body,dir);
				generateScore();
			}
			if(head.x <0 || head.x > canvas.width-bodyWidth || head.y <0 || head.y > canvas.height-bodyHeight){
					clearInterval(prevDir);
					body = [];
					$('#gameOver').text('Game Over');
			}
				for(j=1;j<body.length;j++){
						if(body[j].x == head.x && body[j].y == head.y){
							clearInterval(prevDir);
							body = [];
							$('#gameOver').text('Game Over');
						}
					}
		}	
	function moveBody(array,dir){	
			bodyLength = array.length;
			for(i=0;i<bodyLength;i++){
				if(i==0){
					tempObj = $.extend({},array[i]);
					if(dir == 'left'){
						array[i].x-=bodyWidth;
					}else if (dir == 'right'){
						array[i].x+=bodyWidth;
					}else if (dir == 'up'){
						array[i].y-=bodyHeight;
					}else if (dir == 'down'){
						array[i].y+=bodyHeight;
					}
				}else{
					newTemp = $.extend({},array[i]); 
					array[i] = tempObj;
					tempObj = newTemp;
				}
				collisionDetection(array,dir);
				fillBackgroundColor(); //for canvas, to avoid trailing of snake body
				drawBodyPart(array); // again draw body after making background color
				drawRandomFood(randomFood); // again draw random food after making background color
			}
	}
	//on key press
	var reversemap={37:'left', 39:'right', 38:'up', 40:'down'};
			$(document).keydown(function(e){
			var dir = reversemap[e.keyCode];
				 if(dir=='left'){
					clearInterval(prevDir);
					 prevDir = setInterval(function(){moveBody(body,'left');},70);
				 }if(dir=='right'){
					clearInterval(prevDir);
					 prevDir = setInterval(function(){moveBody(body,'right');},70);
				 }if(dir=='up'){
					clearInterval(prevDir);
					 prevDir = setInterval(function(){moveBody(body,'up');},70);
				 }if(dir=='down'){
					clearInterval(prevDir);
					 prevDir = setInterval(function(){moveBody(body,'down');},70);
				 }
			});
			
			
	//on page load
	fillBackgroundColor()
	generateBodyPart(body,'right');
	generateRandomFood();
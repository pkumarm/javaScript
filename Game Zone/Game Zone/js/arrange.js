var data = [
			  [1, 2, 3],
			  [4, 5, 6],
			  [7, 8, 0]
			];
	var level = 20;
	var count = -level;
	var refData = $.extend(true, [], data);
	renderBody(data);
 function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
 function findZeroValuePostion(array,value){//find zero positon
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			if(array[i][j] == value){				
				return {x:i,y:j};
			}
		}
	}
	return {};
 }
 function isGameEnd(){
	var dataString = data.toString();
	var refDataString = refData.toString();
	$('#isGameComplete').text('');
	if(dataString==refDataString){
		$('#isGameComplete').text('Game Completed in '+ count+ ' attempts');
	}
 }

 function swapValues(array,p1,p2){
		count++;
		temp = array[p1.x][p1.y];
		array[p1.x][p1.y] = array[p2.x][p2.y];
		array[p2.x][p2.y] = temp;
		isGameEnd();
 }
 function findPossibleBoundaries(zp,maxPostion){
	var bounds={};
	x = zp.x;
	y = zp.y;
	if( x-1 != -1){
		bounds.up = {x:x-1,y:y};
	}if( y-1 != -1){
		bounds.left = {x:x,y:y-1};
	}if( x+1 != maxPostion+1){
		bounds.down = {x:x+1,y:y};
	}if(y+1 != maxPostion+1){
		bounds.right = {x:x,y:y+1};
	}
	return bounds;
 }
 function renderBody(array){
	html = '';
		for(i=0;i<array.length;i++){
			html+='<tr>';
			for(j=0;j<array.length;j++){
				html+='<td class="cell"><div class="brick">'+(array[i][j]?array[i][j]:'')+'</div></td>';
			}
			html+='</tr>';
		}
	$('#wrapper').html(html);
 }
 function getKeys(obj){
		var res=[];
		for(var k in obj){			
			res.push(k);			
		}
		return res;
	}
 function getRand(a,b){
		return Math.round(a+(b-a)*Math.random());
	}
 function shuffle(){
		var zeroPosition = findZeroValuePostion(data,0);
		var bounds = findPossibleBoundaries(zeroPosition,data.length-1);
		var boundkeys = getKeys(bounds); // boundkeys is array of keys nothing but direction
		var randBoundKeyIndex = getRand(0, boundkeys.length-1); //selecting a random number from 0-3
		var randBoundKey = boundkeys[randBoundKeyIndex]; // selecting a random direction with that index
		var targetPosition = bounds[randBoundKey]; //finding target based on the direction
		swapValues(data,zeroPosition,targetPosition); // and swap the values
		zeroPosition=targetPosition; // now the new zero position is the targetPosition
		renderBody(data);
	}
var reversemap={37:'right', 39:'left', 38:'down', 40:'up'};
	$(document).keydown(function(e){
		
		var dir = reversemap[e.keyCode];
		var zeroPosition = findZeroValuePostion(data,0);		
		var bounds = findPossibleBoundaries(zeroPosition,data.length-1);		
		var targetPosition = bounds[dir];
		if(targetPosition){
			swapValues(data,zeroPosition,targetPosition);
			zeroPosition=targetPosition;
			renderBody(data);
		}
		
		$('#movesDiv').text(count);
	});
	
	for(var p=0; p<level; p++){
		shuffle();
	}
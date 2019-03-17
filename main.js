
window.onload = function () {
	var graph = new Graph();
	let grid = {
		valXMin  		 :0.84,
		valXMax  		 :0.88,
		valYMin  		 :1.18,
		valYMax  		 :1.23,
		margin   		 :15,
		canvasZeroXCoord :50,
		canvasZeroYCoord :50,
		lineWidth 		 : 1,
		strokeStyle 	 : "red",
		font 			 : "1 pt Verdana",
		numHorizLines 	 : 10,
		numVerticalLines : 10,
	};
	graph.draw(grid);
	graph.plotGraphByFunc(grid,Exp,0.01,"purple");
	graph.plotGraphByData(grid,Newton(0,1,0,1,0.001),"black");
	graph.plotGraphByData(grid,Runge (0,1,0,1,0.001),"green");
	
}
function Newton(xO,yO,xStart,xEnd,delta){
	let table = [[],[]];
	let count = 1;
	table[0][0] = xO;
	table[1][0] = yO;
	for(let x = xStart+delta;x<xEnd;x+=delta){
		table[0][count] = x;
		table[1][count] = table[1][count-1] + delta*Deriv(x-xStart,table[1][count-1]);
		count++;
	}
	return table;
}
function Runge(xO,yO,xStart,xEnd,delta){
	let table = [[],[]];
	let count = 1;
	table[0][0] = xO;
	table[1][0] = yO;
	for(let x = xStart+delta;x<=xEnd;x+=delta){
		let f0 = delta * Deriv(table[0][count-1],table[1][count-1]);
		let f1 = delta * Deriv(table[0][count-1] + delta/3,table[1][count-1] + f0/3);
		let f2 = delta * Deriv(table[0][count-1] + 2*delta/3,table[1][count-1] - f0/3 + f1);
		let f3 = delta * Deriv(table[0][count-1] + delta,table[1][count-1] + f0-f1+f2);
		table[0][count] = x;
		table[1][count] = table[1][count-1] + (f0+3*f1+3*f2+f3)/8;
		count++;
	}
	console.log(table);
	return table;
}
function Deriv(x,y){
	return x*y/2;
}
function Exp(x){
	return Math.exp(x*x/4);
}



function Graph() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	this.draw = function(grid){		
		let valXMin = grid.valXMin;
		let valXMax = grid.valXMax;
		let valYMin = grid.valYMin;
		let valYMax = grid.valYMax;
		let margin = grid.margin;
		let canvasZeroXCoord=grid.canvasZeroXCoord;
		let canvasZeroYCoord = grid.canvasZeroYCoord;
		let numHorizLines = grid.numHorizLines;
		let numVerticalLines = grid.numVerticalLines;
		let xScale = ((canvas.width-margin)-(margin+canvasZeroXCoord))/(valXMax-valXMin);//коэффицент перевода между индексом массива с годами и пикселями
		let yScale = ((canvas.height-margin)-(canvasZeroYCoord+margin))/(valYMax - valYMin);//коэффицент между значениями и пикселями
		context.lineWidth = grid.lineWidth;
		context.strokeStyle = grid.strokeStyle;
		context.font = grid.font;

		//рисуем сетку
		//вертикальные линии
		context.beginPath();
		var verticalTextMargin;//отступы разбивают осевые значения в 2 ряда для читаемости
		for(var x = 0;x<=numVerticalLines;x++){
			context.moveTo(canvasZeroXCoord+margin + xScale*(valXMax-valXMin)*x/numVerticalLines, canvas.height-(canvasZeroYCoord+margin));
			verticalTextMargin = (x%2)?10:0;
			context.fillText((valXMin+(valXMax-valXMin)*x/numVerticalLines).toFixed(2),margin + canvasZeroXCoord + (xScale)*(valXMax-valXMin)*(x-1/3)/numVerticalLines,canvas.height-(canvasZeroYCoord/2+margin-verticalTextMargin));
			context.lineTo(canvasZeroXCoord+margin + xScale*(valXMax-valXMin)*x/numVerticalLines, margin);
		}
		context.stroke();
		
		//горизонтальные линии
		context.beginPath();
		for (var y =0;y<=numHorizLines;y++){				
			context.moveTo(canvasZeroXCoord+margin,canvas.height-(canvasZeroYCoord+margin) - yScale*y*(valYMax-valYMin)/numHorizLines);
			context.fillText((valYMin+(valYMax-valYMin)*y/numHorizLines).toFixed(2),margin,canvas.height-(canvasZeroYCoord+margin) - yScale*y*(valYMax-valYMin)/numHorizLines);
			context.lineTo(canvas.width-margin,canvas.height-(canvasZeroYCoord+margin) - yScale*y*(valYMax-valYMin)/numHorizLines);
		}
		context.stroke();
			
		context.translate(0,canvas.height);
		context.scale(1,-1);
	}

	this.plotGraphByData = function(grid,dataSet,color) {	
		context.strokeStyle = color;
		context.lineWidth = 1;
		
		let valXMin = grid.valXMin;
		let valXMax = grid.valXMax;
		let valYMin = grid.valYMin;
		let valYMax = grid.valYMax;
		let margin = grid.margin;
		let canvasZeroXCoord=grid.canvasZeroXCoord;
		let canvasZeroYCoord = grid.canvasZeroYCoord;
		let xScale  = ((canvas.width-margin)-(margin+canvasZeroXCoord))/(valXMax-valXMin);//коэффицент перевода между индексом массива с годами и пикселями
		let yScale  = ((canvas.height-margin)-(canvasZeroYCoord+margin))/(valYMax - valYMin);//коэффицент между значениями и пикселями
		context.beginPath();
		for (let count = 0;count<dataSet[0].length;count++) {
			let x = dataSet[0][count];
			let y = dataSet[1][count];
			if(x>=valXMin && x<= valXMax && y>=valYMin && y<= valYMax){
				context.lineTo(canvasZeroXCoord+margin + (x-valXMin)*xScale,canvasZeroYCoord+margin+(y-valYMin)*yScale);
			}
		}
		context.stroke();		
	}
	this.plotGraphByFunc = function(grid,func,delta,color){
		context.strokeStyle = color;
		context.lineWidth = 1;
		
		let valXMin = grid.valXMin;
		let valXMax = grid.valXMax;
		let valYMin = grid.valYMin;
		let valYMax = grid.valYMax;
		let margin = grid.margin;
		let canvasZeroXCoord=grid.canvasZeroXCoord;
		let canvasZeroYCoord = grid.canvasZeroYCoord;
		let xScale =  ((canvas.width-margin)-(margin+canvasZeroXCoord))/(valXMax-valXMin);//коэффицент перевода между индексом массива с годами и пикселями
		let yScale =  ((canvas.height-margin)-(canvasZeroYCoord+margin))/(valYMax - valYMin);//коэффицент между значениями и пикселями
		
		context.beginPath();	
		for(let x = valXMin;x<=valXMax;x+=delta){
			let y = func(x);
			console.log(y)
			if(y>= valYMin && y<=valYMax){
				context.lineTo(canvasZeroXCoord+margin+(x-valXMin)*xScale,canvasZeroYCoord+margin+(y-valYMin)*yScale);
			}
		}
		context.stroke();
	}
}

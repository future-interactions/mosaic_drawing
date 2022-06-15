var vMosaicX = 500;
var vScale = 25;
var numSwatches = 12; //we only have 12 colors in swatch col list so if this changes then update the colors too
var pickedCol = "#eeeeee";
let mosImage, swatches;
let swatchesCol = ["#ffffff", "#d47777", "#bdd477", "#77d4a1", "#77c9d4", "#779ed4", "#e2bbbb", "#dce2bb", "#7d5e63", "#7d765e", "#d3a709", "#6d7368"]
let stl, sbr, str, swatchCenter; //swatch variables for cordinates
let ctl, cbr, canvasCenter; //canvas variables for cordinates
var clickedVal = false;
var counter = 0; //this is just for testing
var currentCellId;

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	console.log("swatchesCol length = " + swatchesCol.length);
	mosImage = createGraphics(vMosaicX, vMosaicX);
	swatches = createGraphics(numSwatches / 6 * vScale * 2, numSwatches / 2 * vScale * 2);

	swatchCenter = createVector(width / 2 - vMosaicX / 2 - (vScale * 4), height / 2 - vMosaicX / 4); //swatch center
	stl = createVector(width / 2 - vMosaicX / 2 - (vScale * 6), height / 2 - vMosaicX / 2); //swatch top left
	sbr = createVector(width / 2 - vMosaicX / 2 - (vScale * 2), height / 2 - vMosaicX / 2 + (vScale * 6 * 2)); //swatch bottom right
	str = createVector(width / 2 - vMosaicX / 2 - (vScale * 2), height / 2 - vMosaicX / 2); //swatch top right
	ctl = createVector(width / 2 - vMosaicX / 2, height / 2 - vMosaicX / 2); //canvas top left
	cbr = createVector(width / 2 + vMosaicX / 2, height / 2 + vMosaicX / 2); //canvas bottom right
	for (let x = 0; x < vMosaicX; x += vScale) {
		for (let y = 0; y < vMosaicX; y += vScale) {
			mosImage.stroke(230, 230, 220);
			mosImage.fill("#eeeeee");
			mosImage.rect(x, y, vScale);
		}
	}
	let loc = 0;
	for (let b = 0; b < numSwatches / 2 * vScale * 2; b += vScale * 2) {
		for (let a = 0; a < numSwatches / 6 * vScale * 2; a += vScale * 2) {
			loc++;
			//console.log(loc);
			swatches.fill(swatchesCol[loc - 1]);
			swatches.stroke(230, 230, 220);
			swatches.rect(a, b, vScale * 2);
		}
	}
}

function draw() {
	background(220, 220, 210);
	stroke(180, 180, 160);
	noFill();

	rect(width / 2 - vMosaicX / 2 - vScale / 2, height / 2 - vMosaicX / 2 - vScale / 2, vMosaicX + vScale, vMosaicX + vScale)
	image(mosImage, width / 2 - vMosaicX / 2, height / 2 - vMosaicX / 2);
	image(swatches, width / 2 - vMosaicX / 2 - (vScale * 6), height / 2 - vMosaicX / 2);

	if (clickedVal == true) {
		stroke(200);
		fill(pickedCol);
		ellipse(mouseX, mouseY, 20, 20);
	}
	if (mouseIsPressed && mouseX > ctl.x && mouseX < cbr.x && mouseY > ctl.y && mouseY < cbr.y) {
		//test for xLocM	
		let xDist = mouseX - ctl.x;
		let xModulo = xDist % (vScale);
		let xPos = xDist - xModulo;
		let xLocM = (xPos + vScale) / (vScale);
		//test for yLocM
		let yDist = mouseY - str.y;
		let yModulo = yDist % (vScale);
		let yPos = yDist - yModulo;
		let yLocM = (yPos + vScale) / (vScale);
		//calc currentCellId to calc where the mouse is over the mosaic
		currentCellId = xLocM + yLocM * (numSwatches * 2) - (numSwatches * 2) - 1;
		mosImage.fill(pickedCol);
		mosImage.rect(xLocM * vScale - vScale, yLocM * vScale - vScale, vScale, vScale);
	}
}

function mousePressed() { //testing for within swatch panel
	if (mouseX > stl.x && mouseX < sbr.x && mouseY > stl.y && mouseY < sbr.y) {
		//pickedCol = get(mouseX, mouseY);
		clickedVal = true;
		//test for xLoc
		let xDist = mouseX - stl.x;
		let xModulo = xDist % (vScale * 2);
		let xPos = xDist - xModulo;
		let xLoc = (xPos + vScale * 2) / (vScale * 2);
		//test for yLoc
		var yDist = mouseY - str.y;
		let yModulo = yDist % (vScale * 2);
		let yPos = yDist - yModulo;
		let yLoc = (yPos + vScale * 2) / (vScale * 2);
		//calc swatchLoc for color picker
		let swatchLoc = xLoc + yLoc * 2 - 3; // it's *2 as that's the width of the swatches in the y and -3 as the result is 3 numbers 3 off 0
		pickedCol = swatchesCol[swatchLoc];
		//	console.log(swatchLoc);
	}
	if (mouseX > 0 && mouseX < 250 && mouseY > 0 && mouseY < 250) {
		let fs = fullscreen();
		fullscreen(!fs);
	}
}


function keyPressed() {
	if (keyCode === BACKSPACE) {
		for (let x = 0; x < vMosaicX; x += vScale) {
			for (let y = 0; y < vMosaicX; y += vScale) {
				mosImage.stroke(230, 230, 220);
				mosImage.fill("#eeeeee");
				mosImage.rect(x, y, vScale);
			}
		}
	}

}





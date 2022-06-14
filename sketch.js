var vMosaicX = 480;
var vScale = 20;
var numSwatches = 12;
var pickedCol;
let mosImage, swatches;
let swatchesCol = ["#d47777", "#d4d077", "#bdd477", "#77d4a1", "#77c9d4", "#779ed4", "#e2bbbb", "#dce2bb", "#7d5e63", "#7d765e", "#d3a709", "#6d7368"]
let stl;
let str;
let sbl;
let sbr;
let swatchCenter;

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	console.log("swatchesCol length = " + swatchesCol.length);
	mosImage = createGraphics(vMosaicX, vMosaicX);
	swatches = createGraphics(numSwatches / 6 * vScale * 2, numSwatches / 2 * vScale * 2);

	swatchCenter = createVector(width / 2 - vMosaicX / 2 - (vScale * 4), height / 2 - vMosaicX / 4);//swatch center
	stl = createVector(width / 2 - vMosaicX / 2 - (vScale * 6), height / 2 - vMosaicX / 2); //swatch top left
	str = createVector(width / 2 - vMosaicX / 2 - (vScale * 2), height / 2 - vMosaicX / 2); //swatch top right
	sbl = createVector(width / 2 - vMosaicX / 2 - (vScale * 6), height / 2); //swatch bottom left
	sbr = createVector(width / 2 - vMosaicX / 2 - (vScale * 2), height / 2); //swatch bottom right

}

function draw() {
	background(220, 220, 210);
	for (var x = 0; x < vMosaicX; x += vScale) {
		for (var y = 0; y < vMosaicX; y += vScale) {
			mosImage.stroke(230, 230, 220);

			mosImage.rect(x, y, vScale);
		}
	}
	var loc = 0;
	for (var a = 0; a < numSwatches / 6 * vScale * 2; a += vScale * 2) {
		for (var b = 0; b < numSwatches / 2 * vScale * 2; b += vScale * 2) {
			loc++;
			//console.log(loc);
			swatches.fill(swatchesCol[loc - 1]);
			swatches.stroke(230, 230, 220);
			swatches.rect(a, b, vScale * 2);
		}
	}
	image(mosImage, width / 2 - vMosaicX / 2, height / 2 - vMosaicX / 2);
	image(swatches, width / 2 - vMosaicX / 2 - (vScale * 6), height / 2 - vMosaicX / 2);




	/*ellipse(stl.x, stl.y, 10);
	ellipse(str.x, str.y, 10);
	ellipse(sbl.x, sbl.y, 10);
	ellipse(sbr.x, sbr.y, 10);
	ellipse(swatchCenter.x, swatchCenter.y, 10);
	*/


	if (mouseIsPressed === true && mouseX>stl.x &&mouseX<str.x&&mouseY>stl.y&&mouseY<sbr.y) {
		pickedCol = get(mouseX, mouseY);
		ellipse(mouseX, mouseY, 20,20);
		//console.log(pickedCol);
	}
}

//babybell
/*
var fromCenter=dist(x, y, vMosaicX/2,vMosaicX/2);
	if (fromCenter<105){
	mosImage.fill(255,0,0);
}else{
	mosImage.fill(255);
}
*/
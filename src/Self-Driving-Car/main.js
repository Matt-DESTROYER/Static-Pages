import Road from "./Modules/Road.js";
import Car from "./Modules/Car.js";

let ctx = null;
let road = null;
let car = null;

let previousFrame = 0;

function main(currentFrame = 0) {
	const deltaTime = currentFrame - previousFrame;
	console.log(deltaTime);

	// PHYSICS
	car.update(deltaTime);

	// RENDERING
	// clear display
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.fillText("Latency: " + Math.round(deltaTime), 10, 10);

	road.render(ctx);

	ctx.fillStyle = "black";
	car.render(ctx);
	ctx.fill();

	previousFrame = currentFrame;
	window.requestAnimationFrame(main);
}

function init() {
	// initialise display
	ctx = document
	.getElementById("display")
	.getContext("2d");

	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	// initialise road
	road = new Road(ctx.canvas.width / 2, 400, 4);

	// initialise car
	car = new Car(road.getLaneCenter(Math.floor((road.laneCount - 1) / 2)), Math.round(ctx.canvas.height / 2), 75, 125);

	// start main loop
	main();
}

if (document.readyState === "complete") {
	init();
} else {
	window.addEventListener("load", init);
}

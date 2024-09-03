let canvas, ctx, particles, data, img, txt, scale = 1;

// variables to change the particles that make up the text
let message = "Text", // determines the message displayed
	textSize = 30, // determines the size of the text
	font = "Trebuchet MS", // determines the font of the text
	spacing = 10, // determines the spacing between each particle
	offsetX = 50, // determines the offset of the particles on the x axis
	offsetY = 0, // determines the offset of the partiles on the y axis
	colour = "#ffffff", // determines the colour of the particles
	// note that enabling connections between lines can cause considerable lag
	connects = false, // determines whether particles should be connected to nearby particles
	connectDist = 40, // determines the distance at which particles will begin connecting to others
	lineThickness = 2, // determines the thickness of the lines that connect particles
	connectColour = [255, 0, 0]; // determines the colour (rgb: red = connectColour[0], green = connectColour[1], blue = connectColour[2]) of the lines that connect the nearby particles

const mouse = {
	x: Infinity,
	y: Infinity,
	down: false,
	_radius: 75,
	radius: 75
};

Math.TWO_PI = 2 * Math.PI;

const random = (min, max) => Math.round(Math.random() * (max - min) + min);

function init() {
	img = document.getElementById("img");
	txt = document.getElementById("txt");
	document.getElementById("spacing").addEventListener("input", function() {
		spacing = this.value;
	});
	document.getElementById("colour").addEventListener("input", function() {
		colour = this.value;
	});
	document.getElementById("connects").addEventListener("input", function() {
		connects = !connects;
	});
	document.getElementById("connect-dist").addEventListener("input", function() {
		connectDist = this.value;
	});
	document.getElementById("line-colour");
	document.getElementById("line-thickness").addEventListener("input", function() {
		ctx.lineWidth = this.value;
	});


	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	document.querySelector("body").insertBefore(canvas, document.getElementById("banner"));

	offsetY = document.getElementById("banner").clientHeight;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const rect = canvas.getBoundingClientRect();

	(function input() {
		canvas.addEventListener("resize", function() {
			offsetY = document.getElementById("banner").clientHeight;

			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});

		canvas.addEventListener("mousedown", function(e) {
			e = e || window.event;
			mouse.down = true;
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		});

		window.addEventListener("mousemove", function(e) {
			e = e || window.event;
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		});

		canvas.addEventListener("mouseup", function() {
			mouse.down = false;
		});

		const passive = !(function() { let b = !1; try { let a = Object.defineProperty({}, "passive", { get: function() { b = !0 } }); window.addEventListener("testPassive", null, a), window.removeEventListener("testPassive", null, a) } catch (c) { } })();

		canvas.addEventListener("touchstart", function(e) {
			e = e || window.event;
			//mouse.down = true;
			mouse.x = e.changedTouches[0].clientX - rect.left;
			mouse.y = e.changedTouches[0].clientY - rect.top;
		}, passive ? { passive: true } : false);

		window.addEventListener("touchmove", function(e) {
			e = e || window.event;
			mouse.x = e.changedTouches[0].clientX - rect.left;
			mouse.y = e.changedTouches[0].clientY - rect.top;
		}, passive ? { passive: true } : false);

		/*canvas.addEventListener("touchcancel", function () {
			mouse.down = false;
		});
    
		canvas.addEventListener("touchend", function () {
			mouse.down = false;
		});*/
	})();

	particles = [];

	ctx.font = textSize + "px " + font;
	ctx.fillStyle = colour;
	ctx.fillText(message, 0, textSize);
	const textDimensions = ctx.measureText(message);
	scale = (canvas.width - offsetX * 2) / (Math.ceil(textDimensions.width) * spacing);
	if (textSize * 2 * spacing * scale + offsetY >= canvas.height) {
		scale = (canvas.height - offsetY) / (textSize * 2 * spacing);
	}
	mouse.radius = mouse._radius * scale;
	data = ctx.getImageData(0, 0, Math.ceil(textDimensions.width) + 5, textSize * 2);

	for (let y = 0; y < data.height; y++) {
		for (let x = 0; x < data.width; x++) {
			const pos = (y * 4 * data.width) + (x * 4);
			if (data.data[pos + 3] > 127) {
				particles.push(new Particle(x * spacing * scale + offsetX, y * spacing * scale + offsetY, "rgb(" + data.data[pos] + "," + data.data[pos + 1] + "," + data.data[pos + 2] + ")"));
			}
		}
	}

	document.getElementById("btn").addEventListener("click", function() {
		message = txt.value || "Text";

		particles = [];

		mouse.x = Infinity;
		mouse.y = Infinity;
		mouse.down = false;

		ctx.font = textSize + "px Trebuchet MS";
		ctx.fillStyle = colour;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText(message, 0, textSize);
		const textDimensions = ctx.measureText(message);
		scale = (canvas.width - offsetX * 2) / (Math.ceil(textDimensions.width) * spacing);
		if (textSize * 2 * spacing * scale + offsetY >= canvas.height) {
			scale = (canvas.height - offsetY) / (textSize * 2 * spacing);
		}
		mouse.radius = mouse._radius * scale;
		data = ctx.getImageData(0, 0, Math.ceil(textDimensions.width) + 5, textSize * 2);

		for (let y = 0; y < data.height; y++) {
			for (let x = 0; x < data.width; x++) {
				const pos = (y * 4 * data.width) + (x * 4);
				if (data.data[pos + 3] > 127) {
					particles.push(new Particle(x * spacing * scale + offsetX, y * spacing * scale + offsetY, "rgb(" + data.data[pos] + "," + data.data[pos + 1] + "," + data.data[pos + 2] + ")"));
				}
			}
		}
	});

	img.addEventListener("input", function(e) {
		e = e || window.event;
		const reader = new FileReader();
		reader.onload = function(e) {
			const image = new Image();
			image.onload = function() {
				scale = 1;
				mouse.radius = mouse._radius;
				let width, height;
				// scale image to fit screen
				if (image.width >= image.height) {
					width = window.innerWidth / spacing;
					height = image.height / image.width * width;
				} else {
					height = window.innerHeight / spacing;
					width = image.width / image.height * height;
				}

				const offset = height * spacing < canvas.height ? canvas.height - height * spacing : 0;

				data = (function() {
					const canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext("2d");
					ctx.drawImage(image, 0, 0, width, height);
					return ctx.getImageData(0, 0, width, height);
				})();

				particles = [];

				mouse.x = Infinity;
				mouse.y = Infinity;
				mouse.down = false;

				for (let y = 0; y < data.height; y++) {
					for (let x = 0; x < data.width; x++) {
						const pos = (y * data.width * 4) + (x * 4);
						if (data.data[pos + 3] > 0) {
							particles.push(new Particle(x * spacing, y * spacing + offset, "rgba(" + data.data[pos] + "," + data.data[pos + 1] + "," + data.data[pos + 2] + "," + (data.data[pos + 3] / 255) + ")"));
						}
					}
				}
			};
			image.src = e.target.result;
		};
		reader.readAsDataURL(e.target.files[0]);
	});

	ctx.lineWidth = lineThickness;

	window.requestAnimationFrame((function() {
		const MAX_FRAME = 100;
		let previousFrame = 0;
		return function loop(currentFrame) {
			const deltaTime = Math.min(currentFrame - previousFrame, MAX_FRAME);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (connects) {
				for (let i = 0; i < particles.length; i++) {
					for (let j = 0; j < particles.length; j++) {
						if (i !== j) {
							const dist = Math.hypot(particles[j].x - particles[i].x, particles[j].y - particles[i].y);
							if (dist < connectDist) {
								ctx.strokeStyle = "rgba(" + connectColour.join(",") + "," + (1 - dist / connectDist) + ")";
								ctx.beginPath();
								ctx.moveTo(particles[i].x, particles[i].y);
								ctx.lineTo(particles[j].x, particles[j].y);
								ctx.closePath();
								ctx.stroke();
							}
						}
					}
				}
			}
			for (let i = 0; i < particles.length; i++) {
				particles[i].update(deltaTime);
				particles[i].render();
			}
			previousFrame = currentFrame;
			window.requestAnimationFrame(loop);
		}
	})());
}

class Particle {
	constructor(x, y, colour) {
		this.startX = x;
		this.startY = y;
		this.x = random(0, canvas.width);
		this.y = random(0, canvas.height);
		this.size = random(2, 4) * scale;
		this.density = random(1, 30);
		this.colour = colour;
		this.maxDist = null;
	}
	update(deltaTime = 16.6) {
		const dx = mouse.x - this.x, dy = mouse.y - this.y;
		const dist = Math.hypot(dx, dy);
		const forceDirX = dx / dist, forceDirY = dy / dist;
		const force = ((this.maxDist || mouse.radius) - dist) / (this.maxDist || mouse.radius);
		const xDir = forceDirX * force * this.density, yDir = forceDirY * force * this.density;
		if (mouse.down) {
			this.x -= xDir * deltaTime / 16.6;
			this.y -= yDir * deltaTime / 16.6;
		} else {
			if (dist < mouse.radius) {
				this.x -= xDir * deltaTime / 16.6;
				this.y -= yDir * deltaTime / 16.6;
			} else {
				if (this.x !== this.startX) {
					this.x -= ((this.x - this.startX) / 25) * deltaTime / 16.6;
				}
				if (this.y !== this.startY) {
					this.y -= ((this.y - this.startY) / 25) * deltaTime / 16.6;
				}
			}
		}
	}
	render() {
		if (this.x + this.size >= 0 && this.y + this.size >= 0 && this.x - this.size <= canvas.width && this.y - this.size <= canvas.height) {
			ctx.fillStyle = this.colour;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.TWO_PI);
			ctx.closePath();
			ctx.fill();
		}
	}
}

window.onload = init;
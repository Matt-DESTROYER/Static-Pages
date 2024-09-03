Math.TWO_PI = 2 * Math.PI;

import img from "./Modules/Img.js";
import Orbiter from "./Modules/Orbiter.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const Mouse = {
	x: null,
	y: null,
	previous: {
		x: null,
		y: null
	},
	down: false
};
const Keys = {};
const Camera = {
	x: 0,
	y: 0,
	_zoom: 1,
	get zoom() {
		return this._zoom;
	},
	set zoom(value) {
		this._zoom = Math.max(value, 0);
	},
	tracking: null
};
const Origin = { x: 0, y: 0 };

window.addEventListener("resize", (function() {
	function resize() {
		Camera.x += (window.innerWidth - canvas.width) / 2;
		Camera.y += (window.innerHeight - canvas.height) / 2;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	Camera.x = canvas.width / 2;
	Camera.y = canvas.height / 2;
	return resize;
})());

const Objects = [];

(function initPlanets() {
	const Stars = {
		stars: (function(x) {
			const stars = [];
			const starImg = img("./Images/Star.png");
			for (let i = 0; i < 360; i += x) {
				const star = new Orbiter(Math.random() * 1000 + 50, Math.random(), starImg, Origin, Math.random() * Math.random(), Math.random(), "Star", false);
				if (star.rotSpeed <= 0.1) {
					star.rotSpeed = 0.1;
				}
				star.rot = i;
				stars.push(star);
			}
			return stars;
		})(0.1),
		update: function(deltaTime) {
			for (let i = 0; i < this.stars.length; i++) {
				this.stars[i].update(deltaTime);
			}
		},
		renderArc(cam, ctx) {
			for (let i = 0; i < this.stars.length; i++) {
				this.stars[i].renderArc(cam, ctx);
			}
		},
		render(cam, ctx) {
			for (let i = 0; i < this.stars.length; i++) {
				this.stars[i].render(cam, ctx, Mouse);
			}
		},
		renderUI(cam, ctx, Mouse) {
			for (let i = 0; i < this.stars.length; i++) {
				this.stars[i].renderUI(cam, ctx, Mouse);
			}
		}
	};
	const Sun = new Orbiter(0, 80, img("./Images/Sun.png"), Origin, 0, 2, "Sun");
	const Mercury = new Orbiter(80, 27, img("./Images/Mercury.png"), Sun, 1.27, 1.75, "Mercury");
	const Venus = new Orbiter(130, 30, img("./Images/Venus.png"), Sun, 1, 1.48, "Venus");
	const Earth = new Orbiter(200, 25, img("./Images/Earth.png"), Sun, 0.73, 1.25, "Earth");
	const Mars = new Orbiter(260, 22, img("./Images/Mars.png"), Sun, 0.4, 1.81, "Mars");
	const AsteroidBelt = {
		asteroids: (function(x) {
			const asteroids = [];
			const asteroidImg = img("./Images/Asteroid.png");
			for (let i = 0; i < 360; i += x) {
				const asteroid = new Orbiter(330 + Math.random() * 50 - 25, 10 + Math.random() * 10 - 5, asteroidImg, Sun, Math.random() * Math.random(), Math.random(), "Asteroid", false);
				if (asteroid.rotSpeed <= 0.1) {
					asteroid.rotSpeed = 0.1;
				}
				asteroid.rot = i;
				asteroids.push(asteroid);
			}
			return asteroids;
		})(1),
		update: function(deltaTime) {
			for (let i = 0; i < this.asteroids.length; i++) {
				this.asteroids[i].update(deltaTime);
			}
		},
		renderArc(cam, ctx) {
			for (let i = 0; i < this.asteroids.length; i++) {
				this.asteroids[i].renderArc(cam, ctx);
			}
		},
		render(cam, ctx) {
			for (let i = 0; i < this.asteroids.length; i++) {
				this.asteroids[i].render(cam, ctx, Mouse);
			}
		},
		renderUI(cam, ctx, Mouse) {
			for (let i = 0; i < this.asteroids.length; i++) {
				this.asteroids[i].renderUI(cam, ctx, Mouse);
			}
		}
	};
	const Jupiter = new Orbiter(430, 40, img("./Images/Jupiter.png"), Sun, 0.35, 1.3, "Jupiter");
	const Saturn = new Orbiter(535, 40, img("./Images/Saturn.png"), Sun, 0.3, 1.2, "Saturn");
	const Uranus = new Orbiter(600, 27, img("./Images/Uranus.png"), Sun, 0.2, 1.4, "Uranus");
	const Neptune = new Orbiter(650, 25, img("./Images/Neptune.png"), Sun, 0.1, 1.5, "Neptune");

	Objects.push(Stars, Sun, Mercury, Venus, Earth, Mars, AsteroidBelt, Jupiter, Saturn, Uranus, Neptune);

	for (let i = 0; i < Objects.length; i++) {
		if ("rot" in Objects[i]) {
			Objects[i].rot = ~~(Math.random() * 360);
		}
	}

	const Moon = new Orbiter(30, 14, img("./Images/Moon.png"), Earth, 1, 1.51, "Moon");
	const Io = new Orbiter(45, 18, img("./Images/Io.png"), Jupiter, 1, 1.5, "Io");
	const Europa = new Orbiter(45, 18, img("./Images/Europa.png"), Jupiter, 1, 1.5, "Europa");
	Europa.rot = 90;
	const Ganymede = new Orbiter(45, 18, img("./Images/Ganymede.png"), Jupiter, 1, 1.5, "Ganymede");
	Ganymede.rot = 180;
	const Callisto = new Orbiter(45, 18, img("./Images/Callisto.png"), Jupiter, 1, 1.5, "Callisto");
	Callisto.rot = 270;

	Objects.push(Moon, Io, Europa, Ganymede, Callisto);
})();

(function initInput() {
	let rect = null, zoomSave = null;
	const touches = [];
	function indexTouch(touch) {
		for (let i = 0; i < touches.length; i++) {
			if (touches[i].identifier === touch.identifier) {
				return i;
			}
		}
		return -1;
	}
	function addTouch(touch) {
		if (indexTouch(touch) !== -1) {
			return;
		}
		const x = touch.clientX - rect.x;
		const y = touch.clientY - rect.y;
		touches.push({
			start: {
				x: x,
				y: y
			},
			previous: {
				x: null,
				y: null
			},
			x: x,
			y: y,
			identifier: touch.identifier
		});
	}
	function updateTouch(touch) {
		const idx = indexTouch(touch);
		touches[idx].previous.x = touches[idx].x;
		touches[idx].previous.y = touches[idx].y;
		touches[idx].x = touch.clientX - rect.x;
		touches[idx].y = touch.clientY - rect.y;
	}
	function removeTouch(touch) {
		touches.splice(indexTouch(touch), 1);
	}
	window.addEventListener("keydown", function(e) {
		e = e || window.event;
		e.preventDefault();
		Keys[e.key.toString().toUpperCase()] = true;
		if (Camera.tracking) {
			Camera.tracking = null;
		}
	});
	window.addEventListener("keyup", function(e) {
		e = e || window.event;
		e.preventDefault();
		Keys[e.key.toString().toUpperCase()] = false;
	});
	window.addEventListener("mousedown", function(e) {
		e = e || window.event;
		e.preventDefault();
		rect = canvas.getBoundingClientRect();
		Mouse.previous.x = Mouse.x;
		Mouse.previous.y = Mouse.y;
		Mouse.x = e.clientX - rect.x;
		Mouse.y = e.clientY - rect.y;
		Mouse.down = true;
		let newTarget = false;
		for (let i = 0; i < Objects.length; i++) {
			if ("asteroids" in Objects[i]) {
				for (let j = Objects[i].asteroids.length - 1; j >= 0; j--) {
					if (Math.sqrt(Math.pow(Mouse.x - Camera.x - Objects[i].asteroids[j].x * Camera.zoom, 2) + Math.pow(Mouse.y - Camera.y - Objects[i].asteroids[j].y * Camera.zoom, 2)) <= (Objects[i].asteroids[j].radius / 2) * Camera.zoom) {
						Camera.tracking = Objects[i].asteroids[j];
						newTarget = true;
						break;
					}
				}
			} else if (Math.sqrt(Math.pow(Mouse.x - Camera.x - Objects[i].x * Camera.zoom, 2) + Math.pow(Mouse.y - Camera.y - Objects[i].y * Camera.zoom, 2)) <= (Objects[i].radius / 2) * Camera.zoom) {
				Camera.tracking = Objects[i];
				newTarget = true;
				break;
			}
		}
		if (!newTarget) {
			Camera.tracking = null;
		}
		canvas.style.cursor = "grab";
	});
	window.addEventListener("touchstart", function(e) {
		e = e || window.event;
		e.preventDefault();
		rect = canvas.getBoundingClientRect();
		Mouse.previous.x = Mouse.x;
		Mouse.previous.y = Mouse.y;
		for (let i = 0; i < e.changedTouches.length; i++) {
			addTouch(e.changedTouches[i]);
		}
		if (touches.length > 1) {
			zoomSave = Camera.zoom;
			Mouse.down = true;
		} else if (touches.length === 1) {
			Mouse.x = touches[0].x;
			Mouse.y = touches[0].y;
			let newTarget = false;
			for (let i = 0; i < Objects.length; i++) {
				if ("asteroids" in Objects[i]) {
					for (let j = Objects[i].asteroids.length - 1; j >= 0; j--) {
						if (Math.sqrt(Math.pow(Mouse.x - Camera.x - Objects[i].asteroids[j].x * Camera.zoom, 2) + Math.pow(Mouse.y - Camera.y - Objects[i].asteroids[j].y * Camera.zoom, 2)) <= (Objects[i].asteroids[j].radius / 2) * Camera.zoom) {
							Camera.tracking = Objects[i].asteroids[j];
							newTarget = true;
							break;
						}
					}
				} else if (Math.sqrt(Math.pow(Mouse.x - Camera.x - Objects[i].x * Camera.zoom, 2) + Math.pow(Mouse.y - Camera.y - Objects[i].y * Camera.zoom, 2)) <= (Objects[i].radius / 2) * Camera.zoom) {
					Camera.tracking = Objects[i];
					newTarget = true;
					break;
				}
			}
			if (!newTarget) {
				Camera.tracking = null;
			}
			Mouse.down = false;
		}
	});
	window.addEventListener("mousemove", function(e) {
		e = e || window.event;
		e.preventDefault();
		const rect = canvas.getBoundingClientRect();
		Mouse.previous.x = Mouse.x;
		Mouse.previous.y = Mouse.y;
		Mouse.x = e.clientX - rect.x;
		Mouse.y = e.clientY - rect.y;
		if (Mouse.down) {
			Camera.x += Mouse.x - Mouse.previous.x;
			Camera.y += Mouse.y - Mouse.previous.y;
		}
	});
	window.addEventListener("touchmove", function(e) {
		e = e || window.event;
		e.preventDefault();
		rect = canvas.getBoundingClientRect();
		Mouse.previous.x = Mouse.x;
		Mouse.previous.y = Mouse.y;
		for (let i = 0; i < e.changedTouches.length; i++) {
			updateTouch(e.changedTouches[i]);
		}
		if (touches.length === 1) {
			Mouse.x = touches[0].x;
			Mouse.y = touches[0].y;
			Camera.x += Mouse.x - Mouse.previous.x;
			Camera.y += Mouse.y - Mouse.previous.y;
		} else {
			const avStartDist = (function getAverageStartDist() {
				let sum = 0, c = 0;
				for (let i = 0; i < touches.length; i++) {
					for (let j = i + 1; j < touches.length; j++) {
						sum += Math.sqrt(Math.pow(touches[i].start.x - touches[j].start.x, 2) + Math.pow(touches[i].start.y - touches[j].start.y, 2));
						c++;
					}
				}
				return sum / c;
			})();
			const avDist = (function getAverageDist() {
				let sum = 0, c = 0;
				for (let i = 0; i < touches.length; i++) {
					for (let j = i + 1; j < touches.length; j++) {
						sum += Math.sqrt(Math.pow(touches[i].x - touches[j].x, 2) + Math.pow(touches[i].y - touches[j].y, 2));
						c++;
					}
				}
				return sum / c;
			})();
			Camera.zoom += (avDist - avStartDist) / 100;
		}
	});
	window.addEventListener("mouseup", function(e) {
		e = e || window.event;
		e.preventDefault();
		Mouse.down = false;
		canvas.style.cursor = "default";
	});
	window.addEventListener("touchend", function(e) {
		e = e || window.event;
		e.preventDefault();
		for (let i = 0; i < e.changedTouches.length; i++) {
			removeTouch(e.changedTouches[i]);
		}
		if (touches.length === 0) {
			Mouse.down = false;
		}
	});
	window.addEventListener("touchcancel", function(e) {
		e = e || window.event;
		e.preventDefault();
		for (let i = 0; i < e.changedTouches.length; i++) {
			removeTouch(e.changedTouches[i]);
		}
		if (touches.length === 0) {
			Mouse.down = false;
		}
	});
	window.addEventListener("wheel", function(e) {
		e = e || window.event;
		e.preventDefault();
		Camera.zoom -= e.deltaY / 1000;
		if (Camera.zoom < 0.1) {
			Camera.zoom = 0.1;
		} else if (Camera.zoom > 10) {
			Camera.zoom = 10;
		}
	}, { passive: false });
})();

window.addEventListener("load", function() {
	document.body.append(canvas);
	window.requestAnimationFrame((function() {
		const MAX_FRAME = 100;
		let previousFrame = 0;
		return function main(currentFrame) {
			if (Camera.tracking) {
				Camera.x = -Camera.tracking.x * Camera.zoom + canvas.width / 2;
				Camera.y = -Camera.tracking.y * Camera.zoom + canvas.height / 2;
			}
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			const deltaTime = Math.min(currentFrame - previousFrame, MAX_FRAME);
			if (Keys.W || Keys.ARROWUP) {
				Camera.y += 2 * Camera.zoom * deltaTime / 16.6;
			}
			if (Keys.S || Keys.ARROWDOWN) {
				Camera.y -= 2 * Camera.zoom * deltaTime / 16.6;
			}
			if (Keys.A || Keys.ARROWLEFT) {
				Camera.x += 2 * Camera.zoom * deltaTime / 16.6;
			}
			if (Keys.D || Keys.ARROWRIGHT) {
				Camera.x -= 2 * Camera.zoom * deltaTime / 16.6;
			}
			for (let i = 0; i < Objects.length; i++) {
				Objects[i].update(deltaTime);
			}
			for (let i = 0; i < Objects.length; i++) {
				Objects[i].renderArc(ctx, Camera);
			}
			for (let i = 0; i < Objects.length; i++) {
				Objects[i].render(ctx, Camera);
			}
			for (let i = 0; i < Objects.length; i++) {
				Objects[i].renderUI(ctx, Camera, Mouse);
			}
			previousFrame = currentFrame;
			window.requestAnimationFrame(main);
		};
	})());
});
(function() {
	const canvas = document.getElementById("game-screen");
	const ctx = canvas.getContext("2d", { "alpha": false });
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.imageSmoothingEnabled = false;
	const SCALE = 5;
	window.addEventListener("resize", function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.imageSmoothingEnabled = false;
	});
	const BirdImg = new Image();
	BirdImg.src = "./Images/bird.png";
	const PipeImg1 = new Image();
	PipeImg1.src = "./Images/pipe1.png";
	const PipeImg2 = new Image();
	PipeImg2.src = "./Images/pipe2.png";
	const PipeSectionImg = new Image();
	PipeSectionImg.src = "./Images/pipe section.png";
	const CloudImg = new Image();
	CloudImg.src = "./Images/cloud.png";
	const BushImg = new Image();
	BushImg.src = "./Images/bush.png";
	const PlayButton = {
		"Default": new Image(),
		"Hover": new Image()
	};
	PlayButton.Default.src = "./Images/UI/play button.png";
	PlayButton.Hover.src = "./Images/UI/play button hover.png";
	const RestartButton = {
		"Default": new Image(),
		"Hover": new Image()
	};
	RestartButton.Default.src = "./Images/UI/restart button.png";
	RestartButton.Hover.src = "./Images/UI/restart button hover.png";
	let score = 0,
		highscore = 0,
		scene = "menu",
		speed = 5,
		pipes = [],
		menuClouds = [];
	let mobile = false;
	const localStorageAvailable = "localStorage" in window,
		saveData = (high) => localStorageAvailable ? window.localStorage.setItem("highscore", high) : null;
	if (localStorageAvailable) {
		highscore = Number(window.localStorage.getItem("highscore")) || 0;
	}
	saveData(highscore);
	const Bird = {
		"x": 20 * SCALE,
		"y": Math.floor(canvas.height / 2),
		"yVel": 0,
		"startYVel": -14,
		"yVelIncrement": -12
	};
	const collision = (x1, y1, w1, h1, x2, y2, w2, h2) => x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2,
		pointInRect = (px, py, rx, ry, rw, rh) => px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
	const Input = {
		"mouseX": 0,
		"mouseY": 0
	};
	document.addEventListener("keydown", function(e) {
		if (scene === "play") {
			Bird.yVel = Bird.yVelIncrement;
		}
	});
	document.addEventListener("click", function(e) {
		if (scene === "menu") {
			if (pointInRect(Input.mouseX, Input.mouseY, Math.floor(canvas.width / 2) - PlayButton.Default.width, Math.floor(canvas.height / 2) - PlayButton.Default.height, PlayButton.Default.width * 2, PlayButton.Default.height * 2)) {
				scene = "play";
				score = 0;
				Bird.yVel = Bird.startYVel;
			}
		} else if (scene === "game over") {
			if (pointInRect(Input.mouseX, Input.mouseY, canvas.width / 2 - RestartButton.Default.width * 1.5, canvas.height / 2 + 50, RestartButton.Default.width * 3, RestartButton.Default.height * 3)) {
				scene = "play";
				if (score > highscore) {
					highscore = score;
				}
				score = 0;
				pipes = [];
				Bird.y = Math.floor(canvas.height / 2);
				Bird.yVel = Bird.startYVel;
			}
		}
	});
	// This will resolve before the game starts as the user has to click the 'Play' button
	document.addEventListener("touchstart", function mobileTest() {
		mobile = true;
		document.removeEventListener("touchstart", mobileTest);
	});
	document.addEventListener("mousedown", function(e) {
		if (scene === "play") {
			Bird.yVel = Bird.yVelIncrement;
		}
	});
	const rect = canvas.getBoundingClientRect();
	document.addEventListener("mousemove", function(e) {
		Input.mouseX = e.clientX - rect.left;
		Input.mouseY = e.clientY - rect.top;
	});
	class Cloud {
		constructor() {
			this.x = 0;
			this.y = 0;
			this.speed = 0;
			this.reset();
			this.x = Math.random() * canvas.width;
		}
		move(deltaTime) {
			this.x -= this.speed * deltaTime * 75;
		}
		reset() {
			this.x = canvas.width + Math.floor(Math.random() * canvas.width / 2);
			this.y = Math.floor(Math.random() * canvas.height / 3);
			this.speed = Math.random() * 2;
			if (this.speed < 0.5) {
				this.speed = 0.5 + Math.random();
			}
		}
		draw() {
			ctx.drawImage(CloudImg, this.x, this.y, CloudImg.width, CloudImg.height);
		}
	}
	for (let i = 0; i < 8; i++) {
		menuClouds.push(new Cloud());
	}
	class Pipe {
		constructor(x, height, pos) {
			this.x = x;
			this.height = height;
			this.pos = pos;
			this.scored = false;
		}
		move(deltaTime) {
			this.x -= ~~(speed * deltaTime * 45);
		}
		draw() {
			if (this.x < canvas.width && this.x + PipeImg1.width > 0) {
				if (this.pos === -1) {
					ctx.drawImage(PipeSectionImg, this.x, 0, PipeSectionImg.width, canvas.height - this.height - PipeImg2.height - 75);
					ctx.drawImage(PipeImg2, this.x, canvas.height - this.height - PipeImg2.height - 75, PipeSectionImg.width, PipeImg2.height);
				} else {
					ctx.drawImage(PipeSectionImg, this.x, canvas.height - this.height + 80, PipeSectionImg.width, this.height + 75);
					ctx.drawImage(PipeImg1, this.x, canvas.height - this.height + 75, PipeSectionImg.width, PipeImg1.height);
				}
			}
		}
	}
	function Update(deltaTime) {
		if (scene === "menu") {
			for (let i = 0; i < menuClouds.length; i++) {
				menuClouds[i].move(deltaTime);
				if (menuClouds[i].x + CloudImg.width < 0) {
					menuClouds[i].reset();
				}
			}
		} else if (scene === "play") {
			for (let i = 0; i < pipes.length; i++) {
				pipes[i].move(deltaTime);
				if (!pipes[i].scored && pipes[i].x + PipeImg1.width < Bird.x + 10 * SCALE) {
					score += 5; // 5 = 10 because there's a top and bottom pipe
					pipes[i].scored = true;
				}
				if (pipes[i].x + PipeImg1.width < 0) {
					pipes.splice(i, 1);
					i--;
					continue;
				}
				if (pipes[i].pos === -1) {
					if (collision(Bird.x, Bird.y, 10 * SCALE, 6 * SCALE, pipes[i].x, 0, PipeSectionImg.width, canvas.height - pipes[i].height - 75)) {
						scene = "game over";
					}
				} else {
					if (collision(Bird.x, Bird.y, 10 * SCALE, 6 * SCALE, pipes[i].x, canvas.height - pipes[i].height + 75, PipeSectionImg.width, pipes[i].height)) {
						scene = "game over";
					}
				}
			}
			while (pipes.length < 11) {
				let _height = Math.floor(Math.random() * canvas.height);
				if (_height < 100) {
					_height = 100;
				} else if (_height > canvas.height - 100) {
					_height = canvas.height - 100;
				}
				if (pipes.length > 0) {
					pipes.push(new Pipe(pipes[pipes.length - 1].x + 250, _height, -1));
					pipes.push(new Pipe(pipes[pipes.length - 2].x + 250, _height, 1));
				} else {
					pipes.push(new Pipe(canvas.width + 50, _height, -1));
					pipes.push(new Pipe(canvas.width + 50, _height, 1));
				}
			}
			Bird.yVel += 0.75;
			Bird.y += Bird.yVel;
			if (Bird.y > canvas.height + 25) {
				scene = "game over";
			} else if (Bird.y < -125) {
				scene = "game over";
			}
		} else if (scene === "game over") {
			Bird.yVel += 0.75;
			Bird.y += Bird.yVel;
		}
	}
	function Render() {
		canvas.style.cursor = "default";
		ctx.fillStyle = "skyblue";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (scene === "menu") {
			ctx.beginPath();
			ctx.fillStyle = "lightgreen";
			ctx.ellipse(Math.floor(canvas.width / 2), canvas.height, canvas.width, canvas.height / 5, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
			ctx.drawImage(BushImg, 320, canvas.height - BushImg.height - canvas.height / 5 + 20, BushImg.width, BushImg.height);
			ctx.drawImage(BushImg, 500, canvas.height - BushImg.height - canvas.height / 5 + 30, BushImg.width, BushImg.height);
			ctx.drawImage(BushImg, 240, canvas.height - BushImg.height - canvas.height / 5 + 40, BushImg.width, BushImg.height);
			ctx.drawImage(BushImg, 620, canvas.height - BushImg.height - canvas.height / 5 + 40, BushImg.width, BushImg.height);
			ctx.drawImage(BushImg, 50, canvas.height - BushImg.height - canvas.height / 5 + 50, BushImg.width, BushImg.height);
			for (let i = 0; i < menuClouds.length; i++) {
				menuClouds[i].draw();
			}
			if (pointInRect(Input.mouseX, Input.mouseY, Math.floor(canvas.width / 2) - PlayButton.Default.width, Math.floor(canvas.height / 2) - PlayButton.Default.height, PlayButton.Default.width * 2, PlayButton.Default.height * 2)) {
				canvas.style.cursor = "pointer";
				ctx.drawImage(PlayButton.Hover, Math.floor(canvas.width / 2) - PlayButton.Hover.width, Math.floor(canvas.height / 2) - PlayButton.Hover.height, PlayButton.Default.width * 2, PlayButton.Default.height * 2);
			} else {
				ctx.drawImage(PlayButton.Default, Math.floor(canvas.width / 2) - PlayButton.Default.width, Math.floor(canvas.height / 2) - PlayButton.Default.height, PlayButton.Default.width * 2, PlayButton.Default.height * 2);
			}
			ctx.fillStyle = "#FFFFFF";
			ctx.font = "28px Trebuchet MS";
			ctx.textAlign = "center";
			ctx.fillText("Play", Math.floor(canvas.width / 2), Math.floor(canvas.height / 2) + 8);
		} else if (scene === "play") {
			for (let i = 0; i < pipes.length; i++) {
				pipes[i].draw();
			}
			ctx.drawImage(BirdImg, Bird.x, Bird.y, 10 * SCALE, 6 * SCALE);
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "left";
			ctx.font = "18px Trebuchet MS";
			ctx.fillText("Score: " + Math.floor(score), 10, 20);
		} else if (scene === "game over") {
			for (let i = 0; i < pipes.length; i++) {
				pipes[i].draw();
			}
			ctx.drawImage(BirdImg, Bird.x, Bird.y, 10 * SCALE, 6 * SCALE);
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "center";
			ctx.font = "40px Trebuchet MS";
			ctx.fillText("Final score: " + Math.floor(score), canvas.width / 2, canvas.height / 2 - 5);
			ctx.font = "24px Trebuchet MS";
			if (score > highscore) {
				saveData(score);
				ctx.fillText("New highscore!", canvas.width / 2, canvas.height / 2 + 30);
			} else {
				ctx.fillText("Highscore: " + highscore, canvas.width / 2, canvas.height / 2 + 30);
			}
			if (pointInRect(Input.mouseX, Input.mouseY, canvas.width / 2 - RestartButton.Default.width * 1.5, canvas.height / 2 + 50, RestartButton.Default.width * 3, RestartButton.Default.height * 3)) {
				canvas.style.cursor = "pointer";
				ctx.drawImage(RestartButton.Hover, canvas.width / 2 - RestartButton.Hover.width * 1.5, canvas.height / 2 + 50, RestartButton.Hover.width * 3, RestartButton.Hover.height * 3);
			} else {
				ctx.drawImage(RestartButton.Default, canvas.width / 2 - RestartButton.Default.width * 1.5, canvas.height / 2 + 50, RestartButton.Default.width * 3, RestartButton.Default.height * 3);
			}
		}
	}
	window.requestAnimationFrame((function() {
		let previousFrame = 0;
		return function loop(currentFrame) {
			const deltaTime = (currentFrame - previousFrame) / 1000;
			Update(deltaTime);
			Render();
			previousFrame = currentFrame;
			window.requestAnimationFrame(loop);
		};
	})());
})();
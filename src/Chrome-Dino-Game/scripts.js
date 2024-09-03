(function() {
	const canvas = document.getElementById("game-canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = 125;

	const [ coverImg, groundImg, dinosaurImg, cactiImg ] = [ new Image(), new Image(), new Image(), new Image() ];

	coverImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAGxJREFUeF7tyMEJwkAQRuFf5ipMKxYQiJ3Z2nSwrWwBA0+DQZcdxEOueaePp9+dQZFB7GpUcURSVU66yVNFj6LFICatThZB6r/ko/pbRpUgilY0Cbw5sNmb9txGXUKyuH7eV25x39DtJXUNPQGJtWFV+BT/QAAAAABJRU5ErkJggg==";
	groundImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABK8AAAARCAQAAACxgkd5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQflCx4JOQvbzF6RAAABo0lEQVR42u3cUW7CMAwA0HXaDddj7o7lY0MrKoUGksZJ3vtGIk5d2wTKtHwAAJDPZ+0FAAD0xXgFAJCV8QoAICvjFQBAVl+1FwBAqnn1VNLPVHs1jCc1A8fLWOMVQGPm5b9Fzcu8jNGuiOM2A/O/vgfTIHECdOG3Oa0HqnXrgtJSM3DUjDVeATRjrzGN0bCoLy0D9/Oy/4ydvs1XAM3Ya0nHvnK53wDhuLQMfHaq1S+nVwCD2J4Y9H+GAHUYrwCGsT0xMFxBCaeOV9sfuLXlWphiRdD6ruaIftz4Wxb92rV+Z8Xc39Z3NUf048bfsvRrtxqvYl/4548eRz/kfn997z1+HfPh7fxX7Vic5xf5Om2l9Lted/vRdSyzBvWqdATq1b1VqVctv+u59cqXgx2JUpCirKNUdLHbYvr+j32eQC1R6kSUdZSKLvq93W+9yj5evZ6qR9Og7KfWcz6dREyQI3N91LX3Kn5pfDWuKFGpV0d2JOI9r17Fo17d+vtjhlL/oxLxAD9Oaeex+IVxL79bz7HaZXJv/x7VE/WKutSrmnFFrFcXAWjyXTXYU2cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMTEtMzBUMDk6NTc6MTErMDI6MDAuYZzaAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTExLTMwVDA5OjU3OjExKzAyOjAwXzwkZgAAAABJRU5ErkJggg==";
	dinosaurImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASMAAAAxCAQAAAA7QAeCAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQflCx4JOARSaHJBAAACI0lEQVR42u2cUXaEIAxFscclukz3aD86HJ2pCoEXHPTev7byEmkIEdBhCQC1/FztANwBwggEEEYggDACAaPt8ilRkc9DmRvo9g3ZCAQM+Q/8qREYsY5EdPvHOKmFEMIcQpgcXOlRNzhp9waTWgUTIfSiIBt5dV1vurBSEEYQmeslbgJhVAxZboXaCAQQRiCAMAIBlbWR1xJbb7pPh2wEAiqz0XZjQDnSe9Pd8sSMRzYCAePfCE2NoL3tyJw26D4DshEISNZGuccirDxHNyfL+fjbziqbIR1xzZnLHKvjeumnE6nm8e9nzqN7fk06x9WERjurZKNOyJlU9RNZrtXx/cfoRE7zebDf3JN1c/XOW5Sc5fS3ypMaCBiW4meQkjWWJ+rWaNd5084q2QgEEEZNmIcr1rrbWSWMQMDrdceSWdSrJrijbo1+vTf+VgvXjXo7ZNGbbm9sXr62xKzXCLyzbon+NXdlt0ptBAI+PgWRu2prBV27/n9LZ630lZ/FKtkIBOx8mKY25o9AN19fb83XKjv8X8f672t59KzO6k4Yfe5YW3awU47uvZkxLfH3ZV221bXszJf4q3veOTpH4Bs2R/1fG7LURl/OtLTbYC23mpjUYnxqR+J73CvGX/Qvjikvf/0ykqonbPejskpt9MVcs0ZeYvUkjHrbQOhL91P1mkykgtoIBJyE0V6ZpSj4WhaNXv7q76Fdr3hYIhuBAMPn1QGO+AVYEhsQrcA4SwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMS0zMFQwOTo1NjowNCswMjowMF8x2N0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTEtMzBUMDk6NTY6MDQrMDI6MDAubGBhAAAAAElFTkSuQmCC";
	cactiImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAAAwAgMAAABI7/87AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADFBMVEX/////9/dTU1P////JG14eAAAAAnRSTlMAAHaTzTgAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5QseCiQ2fo7AxQAAAotJREFUSMft1r2uokAUB/AzBsiN1Vq4iVTWPgUWa00hJmu92YKnID4BFtdiK7LBhDlPuf9zQD4kjKu2l4SJjPObwxnnQ6J5RjQriKjCvcHdVlBaShlaKQOOUBrOqb3qLzZoOoedMR446yrQWBukKkOVAUuXfkTdFy/4MHf4NSo+3L7Oq/Vr+I/ZiWfiswp+g4qBN7HDV/Cb+V/GwPGpaPxm4INy5P3oCR/aofdkECb9+qFfSaEew1V93HxW++qhT6ObvzUXfyruvYnVx+qXz/ugFL+9qgeC9/t+7/BL+NDKMO+s+DPne/gw6vzWdp7vfboVL8N882cLn+ad3/G0NwBw2qzxF4ApP3vZswan2nPt2eXjO1/AV1g/6mX+V3OXP5fpdeAz+AKexWtC+MyT/mJT5n7+Mt1l/fKswPqtdEJz5fTW3DwyJqQrXsK2vrjzx4EvgwhJiEf6Eq3eP8SjQhYUDT0S6vlrLNOCxdepNx5jIRVjHwx9Sa0f7V9IYuzN2IcTvs7ozmMRDbwX5rtpn419OPSr8Hye9HWF4U+2RyvDfLDkH/HY+fR4KZP0gZerTLWU/VvCHfjaetKOH3gdZtm64PVXQC+dl44nzx+VUail+tKXzzbo+dzhRVqSmImeP2gsXZaBZNX4yOHRzu41jfr8+oykk2tsOp+4zk+T6P6d9M6/QDNOW//s+WsO9U/R99PX1Pnrp+95LP1mNF/2ge5Ar3tMbnrH0zF/z4df/n+8p35b+0j9t57fOv0PtviftMA2FZGH8yNX/6vnd64XMH80/m+WMCuW+OY74nuNXzyMn8j6XiQJonhJEiM8li6tSPdv6didP9prA5PrA17cLJOf5NEyXuEvODrO6R/zT1bcH4OEVgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMS0zMFQxMDozNjo1NCswMjowMOX+92QAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTEtMzBUMTA6MzY6NTQrMDI6MDCUo0/YAAAAAElFTkSuQmCC";
	
	groundImg.addEventListener("load", () => {
		if (canvas.width > groundImg.width) {
			canvas.width = groundImg.width;
		}
	});

	const collision = (x1, y1, w1, h1, x2, y2, w2, h2) => x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;

	function scoreToString(s) {
		let result = s.toString();
		while (result.length < 5) {
			result = "0" + result;
		}
		return result;
	}

	let scene = "cover",
		score = 0,
		highScore = (+window.localStorage.getItem("highscore") || 0),
		y = 0, yV = 0,
		cacti = [],
		dinoAnimation = 0,
		groundAnimation = 0,
		speed = 5,
		Input = {},
		previousSpeedIncrease = Date.now(),
		previousDinoAnimation = Date.now(),
		previousCactus = Date.now(),
		previousFrame = Date.now(),
		previousScore = Date.now();

	class Cactus {
		constructor() {
			switch (Math.ceil(Math.random() * 11)) {
				case 1:
					this.cX = 0;
					this.cW = 14;
					this.cH = 32;
					break;
				case 2:
					this.cX = 17;
					this.cW = 14;
					this.cH = 32;
					break;
				case 3:
					this.cX = 34;
					this.cW = 14;
					this.cH = 32;
					break;
				case 4:
					this.cX = 51;
					this.cW = 14;
					this.cH = 32;
					break;
				case 5:
					this.cX = 68;
					this.cW = 14;
					this.cH = 32;
					break;
				case 6:
					this.cX = 85;
					this.cW = 14;
					this.cH = 32;
					break;
				case 7:
					this.cX = 104;
					this.cW = 23;
					this.cH = 47;
					break;
				case 8:
					this.cX = 129;
					this.cW = 23;
					this.cH = 47;
					break;
				case 9:
					this.cX = 154;
					this.cW = 23;
					this.cH = 47;
					break;
				case 10:
					this.cX = 179;
					this.cW = 23;
					this.cH = 47;
					break;
				case 11:
					this.cX = 203;
					this.cW = 49;
					this.cH = 47;
					break;
			}
			this.cY = 0;
			this.x = canvas.width + this.cW;
			this.y = canvas.height - this.cH - 2;
		}
		draw() {
			ctx.drawImage(cactiImg, this.cX, this.cY, this.cW, this.cH, this.x, this.y, this.cW, this.cH);
		}
		getBoundingRect() {
			return {
				x: this.x + 5,
				y: this.y,
				w: this.cW,
				h: this.cH
			};
		}
	}

	const DinosaurBounds = function () {
		switch (dinoAnimation) {
			case 1:
				return [
					{
						x: 20,
						y: canvas.height - 30 - y,
						w: 18,
						h: 29
					},
					{
						x: 32,
						y: canvas.height - 45 - y,
						w: 20,
						h: 15
					}
				];
			case 2:
				return [
					{
						x: 20,
						y: canvas.height - 30 - y,
						w: 18,
						h: 29
					},
					{
						x: 32,
						y: canvas.height - 45 - y,
						w: 20,
						h: 15
					}
				];
			case 3:
				return [
					{
						x: 10,
						y: canvas.height - 28 - y,
						w: 53,
						h: 25
					}
				];
			case 4:
				return [
					{
						x: 10,
						y: canvas.height - 28 - y,
						w: 53,
						h: 25
					}
				];
			case 5:
				return [];
			default:
				return [];
		}
	};

	ctx.font = "15px monospace";
	const loop = () => {
		if (Date.now() - previousFrame > 15) {
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			if (scene === "cover") {
				ctx.drawImage(coverImg, 0, canvas.height - 75);
			} else if (scene === "game") {
				// score
				if (Date.now() - previousScore >= 100) {
					score++;
					previousScore = Date.now();
				}
				// gradual speed-up
				if (Date.now() - previousSpeedIncrease >= 200) {
					speed += 0.01;
					previousSpeedIncrease = Date.now();
				}
				// ground
				ctx.drawImage(groundImg, groundAnimation, 5, groundImg.width - groundAnimation, 10, 0, canvas.height - 10, groundImg.width - groundAnimation, 10);
				groundAnimation += speed;
				if (groundAnimation > groundImg.width - canvas.width) {
					ctx.drawImage(groundImg, 0, 5, canvas.width - groundImg.width + groundAnimation, 10, groundImg.width - groundAnimation, canvas.height - 10, canvas.width - groundImg.width + groundAnimation, 10);
					if (groundAnimation > groundImg.width) {
						groundAnimation = 0;
					}
				}
				// dino bounds
				const DinoBounds = DinosaurBounds();
				// cacti
				if (Date.now() - previousCactus >= 10000 / speed) {
					cacti.push(new Cactus());
					previousCactus = Date.now();
				}
				let _cactusBounds;
				for (let i = 0; i < cacti.length; i++) {
					cacti[i].draw();
					cacti[i].x -= speed;
					_cactusBounds = cacti[i].getBoundingRect();
					// debug cactus hitbox
					// ctx.strokeStyle = "red";
					// ctx.strokeRect(_cactusBounds.x, _cactusBounds.y, _cactusBounds.w, _cactusBounds.h);
					if (DinoBounds.some((bound) => collision(bound.x, bound.y, bound.w, bound.h, _cactusBounds.x, _cactusBounds.y, _cactusBounds.w, _cactusBounds.h))) {
						scene = "game over";
						yV = 0;
						dinoAnimation = 5;
						speed = 0;
						if (score > highScore) {
							window.localStorage.setItem("highscore", score);
							highScore = score;
						}
					}
					if (_cactusBounds.x + _cactusBounds.cW < 0) {
						cacti.splice(i, 1);
						i--;
					}
				}
				// dinosaur
				switch (dinoAnimation) {
					case 1:
						ctx.drawImage(dinosaurImg, 43, 0, 41, 49, 10, canvas.height - 50 - y, 41, 49);
						break;
					case 2:
						ctx.drawImage(dinosaurImg, 87, 0, 41, 49, 10, canvas.height - 50 - y, 41, 49);
						break;
					case 3:
						ctx.drawImage(dinosaurImg, 177, 0, 55, 49, 10, canvas.height - 50 - y, 53, 49);
						break;
					case 4:
						ctx.drawImage(dinosaurImg, 236, 0, 55, 49, 10, canvas.height - 50 - y, 53, 49);
						break;
					case 5:
						ctx.drawImage(dinosaurImg, 133, 0, 41, 49, 10, canvas.height - 50 - y, 41, 49);
						break;
					default:
						ctx.drawImage(dinosaurImg, 0, 0, 41, 49, 10, canvas.height - 50 - y, 41, 49);
						break;
				}
				// debug dinosaur hitbox
				// ctx.strokeStyle = "red";
				// DinoBounds.forEach((bound) => ctx.strokeRect(bound.x, bound.y, bound.w, bound.h));
				if (Date.now() - previousDinoAnimation >= 100) {
					if (Input.S || Input.ARROWDOWN) {
						if (yV > 0) {
							yV = 0;
						}
						if (dinoAnimation !== 3 && dinoAnimation !== 4) {
							dinoAnimation = 3;
						}
					} else if (dinoAnimation === 3 || dinoAnimation === 4) {
						dinoAnimation = 1;
					}
					switch (dinoAnimation) {
						case 1:
							dinoAnimation = 2;
							break;
						case 2:
							dinoAnimation = 1;
							break;
						case 3:
							dinoAnimation = 4;
							break;
						case 4:
							dinoAnimation = 3;
							break;
						case 5:
							break;
						default:
							dinoAnimation = 1;
							break;
					}
					previousDinoAnimation = Date.now();
				}
				if (y === 0 && (Input.W || Input.ARROWUP || Input[" "]) && !(Input.S || Input.ARROWDOWN)) {
					yV = 12;
				}
				if (y > 0) {
					yV--;
				}
				y += yV;
				if (y < 0) {
					yV = 0;
					y = 0;
				}
				ctx.textAlign = "right";
				ctx.fillStyle = "#000000";
				ctx.fillText("HI " + scoreToString(highScore) + " " + scoreToString(score), canvas.width - 10, 15);
			} else if (scene === "game over") {
				// ground
				ctx.drawImage(groundImg, groundAnimation, 5, canvas.width, 10, 0, canvas.height - 10, canvas.width, 10);
				groundAnimation += speed;
				if (groundAnimation > groundImg.width - canvas.width) {
					ctx.drawImage(groundImg, 0, 5, canvas.width, 10, groundImg.width - groundAnimation, canvas.height - 10, canvas.width, 10);
					if (groundAnimation > groundImg.width) {
						groundAnimation = 0;
					}
				}
				// cacti
				for (let i = 0; i < cacti.length; i++) {
					cacti[i].draw();
				}
				// dinosaur
				ctx.drawImage(dinosaurImg, 133, 0, 41, 49, 10, canvas.height - 50 - y, 41, 49);
				// score
				ctx.textAlign = "right";
				ctx.fillStyle = "#000000";
				ctx.fillText("HI " + scoreToString(highScore) + " " + scoreToString(score), canvas.width - 10, 15);
			}
			previousFrame = Date.now();
		}
		window.requestAnimationFrame(loop);
	}

	document.addEventListener("keydown", (e) => {
		Input[(e || window.event).key.toString().toUpperCase()] = true;
		if (scene === "cover" || scene === "game over") {
			scene = "game";
			score = y = yV = dinoAnimation = groundAnimation = 0;
			cacti = [];
			speed = 5;
			previousSpeedIncrease = previousDinoAnimation = previousCactus = previousFrame = Date.now();
		}
	});

	document.addEventListener("keyup", (e) => Input[(e || window.event).key.toString().toUpperCase()] = false);

	window.requestAnimationFrame(loop);
})();
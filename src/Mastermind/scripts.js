const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const Input = {
	"mouseDown": false,
	"mouseX": null,
	"mouseY": null
};

const Mastermind = {
	"state": null,
	"colours": null,
	"colourSelected": null,
	"sequence": null,
	"guesses": null,
	"results": null,
	"pinSelected": null,
	"guessesMade": 0,
	"generateSequence": function() {
		this.sequence = [];
		for (let i = 0; i < 5; i++) {
			this.sequence.push(~~(Math.random() * this.colours.length));
		}
	},
	"submitGuess": function() {
		this.results[this.guessesMade] = this.guesses[this.guessesMade].map((colour, idx) => colour === this.sequence[idx] ? 2 : this.sequence.includes(colour) ? 1 : 0);
		this.guessesMade++;
		this.pinSelected = null;
		if (this.results[this.guessesMade - 1].filter((result) => result !== 2).length === 0) {
			this.state = "win";
		} else if (this.guessesMade === 10) {
			this.state = "lose";
		} else {
			for (let i = 0; i < this.results[this.guessesMade - 1].length; i++) {
				if (this.results[this.guessesMade - 1][i] === 2) {
					this.guesses[this.guessesMade][i] = this.guesses[this.guessesMade - 1][i];
				}
			}
		}
	},
	"init": function() {
		this.state = "game";
		this.colours = ["red", "orange", "yellow", "green", "blue", "rgb(105, 75, 50)", "black", "white"];
		this.colourSelected = null;
		this.generateSequence();
		this.guesses = [
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null]
		];
		this.results = [
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null]
		];
		this.pinSelected = null;
		this.guessesMade = 0;
		return this;
	}
};

let boardWidth = 0, boardHeight = 0;

Math.TWOPI = Math.PI * 2;

function init() {
	canvas.width = 675;
	canvas.height = 475;
	boardWidth = canvas.width - 100;
	boardHeight = canvas.height - 150;
	document.addEventListener("keydown", function(e) {
		e = e || window.event;
		if (Mastermind.pinSelected !== null) {
			switch (e.keyCode) {
				case 49:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 0;
					break;
				case 50:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 1;
					break;
				case 51:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 2;
					break;
				case 52:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 3;
					break;
				case 53:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 4;
					break;
				case 54:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 5;
					break;
				case 55:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 6;
					break;
				case 56:
					Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = 7;
					break;
				case 13:
					Mastermind.submitGuess();
					break;
			}
		}
	});
	document.addEventListener("mousedown", function() {
		Input.mouseDown = true;
	});
	document.addEventListener("mouseup", function() {
		Input.mouseDown = false;
	});
	document.addEventListener("mousemove", function(e) {
		e = e || window.event;
		const rect = canvas.getBoundingClientRect();
		Input.mouseX = e.clientX - rect.left;
		Input.mouseY = e.clientY - rect.top;
	});
	document.addEventListener("touchstart", function(e) {
		e = e || window.event;
		const rect = canvas.getBoundingClientRect();
		Input.mouseX = e.changedTouches[0].clientX - rect.left;
		Input.mouseY = e.changedTouches[0].clientY - rect.top;
		Input.mouseDown = true;
	});
	document.addEventListener("touchmove", function(e) {
		e = e || window.event;
		const rect = canvas.getBoundingClientRect();
		Input.mouseX = e.changedTouches[0].clientX - rect.left;
		Input.mouseY = e.changedTouches[0].clientY - rect.top;
	});
	document.addEventListener("touchend", function(e) {
		e = e || window.event;
		const rect = canvas.getBoundingClientRect();
		Input.mouseX = e.changedTouches[0].clientX - rect.left;
		Input.mouseY = e.changedTouches[0].clientY - rect.top;
		Input.mouseDown = false;
	});
	document.addEventListener("touchcancel", function(e) {
		e = e || window.event;
		const rect = canvas.getBoundingClientRect();
		Input.mouseX = e.changedTouches[0].clientX - rect.left;
		Input.mouseY = e.changedTouches[0].clientY - rect.top;
		Input.mouseDown = false;
	});
	Mastermind.init();
	Mastermind.state = "menu";
	Mastermind.guesses = [
		[0, 1, 2, 3, 4],
		[1, 5, 6, 7, 4],
		[5, 7, 6, 1, 4],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null]
	];
	Mastermind.results = [
		[0, 1, 0, 0, 2],
		[1, 1, 2, 1, 2],
		[2, 2, 2, 2, 2],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null]
	];
	window.requestAnimationFrame(Render);
	(document.body || document.getElementsByTagName("body")[0]).appendChild(canvas);
}

function roundedRect(x, y, width, height, radius, fill = true, stroke = false, fillStyle = null, strokeStyle = null) {
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.arcTo(x, y + height, x + radius, y + height, radius);
	ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
	ctx.arcTo(x + width, y, x + width - radius, y, radius);
	ctx.arcTo(x, y, x, y + radius, radius);
	if (fill) {
		if (fillStyle) {
			ctx.fillStyle = fillStyle;
		}
		ctx.fill();
	}
	if (stroke) {
		if (strokeStyle) {
			ctx.strokeStyle = strokeStyle;
		}
		ctx.stroke();
	}
	ctx.closePath();
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function pointInRect(px, py, rx, ry, rw, rh) {
	return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

const Render = (function() {
	let previousFrame = 0;
	return function Render(currentFrame) {
		const deltaTime = (currentFrame - previousFrame) / 1000;
		canvas.style.cursor = "default";
		if (Mastermind.state === "menu") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgb(90, 90, 90)";
			roundedRect(25, 25, canvas.width - 50, canvas.height - 50, 10);
			ctx.fillStyle = "rgb(120, 120, 120)";
			roundedRect(50, 50, boardWidth, boardHeight, 10);
			let xInterval = (boardWidth - 50) / 10,
				yInterval = (boardHeight - 175) / 4;
			for (let y = 0; y < 5; y++) {
				for (let x = 0; x < 10; x++) {
					if (Mastermind.guesses[x][y] !== null) {
						ctx.fillStyle = Mastermind.colours[Mastermind.guesses[x][y]];
					} else {
						ctx.fillStyle = "rgb(150, 150, 150)";
					}
					ctx.beginPath();
					ctx.arc(100 + x * xInterval, 85 + y * yInterval, 10, 0, Math.TWOPI);
					ctx.fill();
					if (Mastermind.guessesMade === x) {
						if (Mastermind.pinSelected === y) {
							ctx.lineWidth = 2;
							ctx.strokeStyle = "rgb(50, 50, 50)";
							ctx.stroke();
							if (dist(Input.mouseX, Input.mouseY, 100 + x * xInterval, 85 + y * yInterval) <= 10) {
								canvas.style.cursor = "pointer";
							}
						} else if (dist(Input.mouseX, Input.mouseY, 100 + x * xInterval, 85 + y * yInterval) <= 10) {
							ctx.lineWidth = 1;
							ctx.strokeStyle = "rgb(50, 50, 50)";
							ctx.stroke();
							canvas.style.cursor = "pointer";
							if (Input.mouseDown) {
								if (Mastermind.colourSelected !== null) {
									Mastermind.guesses[Mastermind.guessesMade][y] = Mastermind.colourSelected;
									Mastermind.colourSelected = null;
								}
								Mastermind.pinSelected = y;
							}
						}
					}
					ctx.closePath();
				}
			}
			yInterval /= 2;
			for (let y = 0; y < 5; y++) {
				for (let x = 0; x < 10; x++) {
					if (Mastermind.results[x][y]) {
						if (Mastermind.results[x][y] === 1) {
							ctx.fillStyle = "black";
						} else if (Mastermind.results[x][y] === 2) {
							ctx.fillStyle = "white";
						}
					} else {
						ctx.fillStyle = "rgb(150, 150, 150)";
					}
					ctx.beginPath();
					ctx.arc(100 + x * xInterval, 275 + y * yInterval, 5, 0, Math.TWOPI);
					ctx.fill();
					ctx.closePath();
				}
			}
			ctx.fillStyle = "black";
			ctx.font = "30px Trebuchet MS";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.fillText("Mastermind", 75, 410);
			ctx.lineWidth = 1;
			if (pointInRect(Input.mouseX, Input.mouseY, boardWidth - 275, 390, 150, 40)) {
				if (Input.mouseDown) {
					roundedRect(boardWidth - 275, 390, 150, 40, 10, true, true, "rgb(100, 100, 100)", "rgb(0, 0, 0)");
					Mastermind.init();
					Mastermind.state = "game";
				} else {
					roundedRect(boardWidth - 275, 390, 150, 40, 10, true, true, "rgb(125, 125, 125)", "rgb(25, 25, 25)");
				}
				canvas.style.cursor = "pointer";
			} else {
				roundedRect(boardWidth - 275, 390, 150, 40, 10, true, true, "rgb(150, 150, 150)", "rgb(50, 50, 50)");
			}
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.font = "20px Trebuchet MS";
			ctx.fillText("Play", boardWidth - 200, 410);
			if (pointInRect(Input.mouseX, Input.mouseY, boardWidth - 100, 390, 150, 40)) {
				if (Input.mouseDown) {
					roundedRect(boardWidth - 100, 390, 150, 40, 10, true, true, "rgb(100, 100, 100)", "rgb(0, 0, 0)");
					Mastermind.state = "how";
				} else {
					roundedRect(boardWidth - 100, 390, 150, 40, 10, true, true, "rgb(125, 125, 125)", "rgb(25, 25, 25)");
				}
				canvas.style.cursor = "pointer";
			} else {
				roundedRect(boardWidth - 100, 390, 150, 40, 10, true, true, "rgb(150, 150, 150)", "rgb(50, 50, 50)");
			}
			ctx.fillStyle = "black";
			ctx.fillText("How", boardWidth - 25, 410);
		} else if (Mastermind.state === "how") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgb(120, 120, 120)";
			roundedRect(25, 25, canvas.width - 50, canvas.height - 50, 10);
			ctx.fillStyle = "black";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.font = "30px Trebuchet MS";
			ctx.fillText("Mastermind", 50, 70);
			ctx.font = "16px Serif";
			ctx.fillText("Mastermind is (or was) a board game. In Mastermind, your goal is to figure out the", 50, 100);
			ctx.fillText("sequence your opponent has created. This sequence consists of five colours (not", 50, 118);
			ctx.fillText("necessarily different). You get ten guesses to figure out the sequence. Upon making", 50, 136);
			ctx.fillText("each guess, you will see a corresponding result which will help you crack the code.", 50, 154);
			ctx.fillText("In the corresponding result, you will see blank spaces for colours not in the sequence,", 50, 172);
			ctx.fillText("black spaces for colours in the sequence and white spaces for colours in the sequence", 50, 190);
			ctx.fillText("and in the correct spot.", 50, 208);
			ctx.fillText("In this recreation of Mastermind, you can select colours by clicking or tapping them", 50, 240);
			ctx.fillText("and select the pin you want to change the colour of similarly. You can then click or", 50, 258);
			ctx.fillText("tap the 'Submit Guess' button to see the results of your guess. Note that you can only", 50, 276);
			ctx.fillText("select pins in the row of your current guess.", 50, 294);
			ctx.fillText("How quickly can you guess the sequence the computer has randomly created?", 50, 325);
			if (pointInRect(Input.mouseX, Input.mouseY, 50, 390, 150, 40)) {
				if (Input.mouseDown) {
					roundedRect(50, 390, 150, 40, 10, true, true, "rgb(100, 100, 100)", "rgb(0, 0, 0)");
					Mastermind.state = "menu";
				} else {
					roundedRect(50, 390, 150, 40, 10, true, true, "rgb(125, 125, 125)", "rgb(25, 25, 25)");
				}
				canvas.style.cursor = "pointer";
			} else {
				roundedRect(50, 390, 150, 40, 10, true, true, "rgb(150, 150, 150)", "rgb(50, 50, 50)");
			}
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "20px Trebuchet MS";
			ctx.fillText("Menu", 125, 410);
		} else if (Mastermind.state === "game") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			roundedRect(25, 25, canvas.width - 50, canvas.height - 50, 10, true, false, "rgb(90, 90, 90)");
			roundedRect(50, 50, boardWidth, boardHeight, 10, true, false, "rgb(120, 120, 120)");
			let xInterval = (boardWidth - 50) / 10,
				yInterval = (boardHeight - 175) / 4;
			for (let y = 0; y < 5; y++) {
				for (let x = 0; x < 10; x++) {
					if (Mastermind.guesses[x][y] !== null) {
						ctx.fillStyle = Mastermind.colours[Mastermind.guesses[x][y]];
					} else {
						ctx.fillStyle = "rgb(150, 150, 150)";
					}
					ctx.beginPath();
					ctx.arc(100 + x * xInterval, 85 + y * yInterval, 10, 0, Math.TWOPI);
					ctx.fill();
					if (Mastermind.guessesMade === x) {
						if (Mastermind.pinSelected === y) {
							ctx.lineWidth = 2;
							ctx.strokeStyle = "rgb(50, 50, 50)";
							ctx.stroke();
							if (dist(Input.mouseX, Input.mouseY, 100 + x * xInterval, 85 + y * yInterval) <= 10) {
								canvas.style.cursor = "pointer";
							}
						} else if (dist(Input.mouseX, Input.mouseY, 100 + x * xInterval, 85 + y * yInterval) <= 10) {
							ctx.lineWidth = 1;
							ctx.strokeStyle = "rgb(50, 50, 50)";
							ctx.stroke();
							canvas.style.cursor = "pointer";
							if (Input.mouseDown) {
								if (Mastermind.colourSelected !== null) {
									Mastermind.guesses[Mastermind.guessesMade][y] = Mastermind.colourSelected;
									Mastermind.colourSelected = null;
								}
								Mastermind.pinSelected = y;
							}
						}
					}
					ctx.closePath();
				}
			}
			yInterval /= 2;
			for (let y = 0; y < 5; y++) {
				for (let x = 0; x < 10; x++) {
					if (Mastermind.results[x][y]) {
						if (Mastermind.results[x][y] === 1) {
							ctx.fillStyle = "black";
						} else if (Mastermind.results[x][y] === 2) {
							ctx.fillStyle = "white";
						}
					} else {
						ctx.fillStyle = "rgb(150, 150, 150)";
					}
					ctx.beginPath();
					ctx.arc(100 + x * xInterval, 275 + y * yInterval, 5, 0, Math.TWOPI);
					ctx.fill();
					ctx.closePath();
				}
			}
			ctx.lineWidth = 1;
			if (pointInRect(Input.mouseX, Input.mouseY, boardWidth - 100, 390, 150, 40)) {
				if (Input.mouseDown) {
					roundedRect(boardWidth - 100, 390, 150, 40, 10, true, true, "rgb(100, 100, 100)", "rgb(0, 0, 0)");
					if (!Mastermind.guesses[Mastermind.guessesMade].includes(null)) {
						Mastermind.submitGuess();
					}
				} else {
					roundedRect(boardWidth - 100, 390, 150, 40, 10, true, true, "rgb(125, 125, 125)", "rgb(25, 25, 25)");
				}
				canvas.style.cursor = "pointer";
			} else {
				roundedRect(boardWidth - 100, 390, 150, 40, 10, true, true, "rgb(150, 150, 150)", "rgb(50, 50, 50)");
			}
			ctx.fillStyle = "black";
			ctx.font = "20px Trebuchet MS";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Submit Guess", boardWidth - 25, 410);
			xInterval = (boardWidth - 200) / Mastermind.colours.length;
			for (let x = 0; x < Mastermind.colours.length; x++) {
				ctx.fillStyle = Mastermind.colours[x];
				ctx.beginPath();
				ctx.arc(90 + x * xInterval, 410, 15, 0, Math.TWOPI);
				ctx.fill();
				if (Mastermind.colourSelected === x) {
					ctx.lineWidth = 2;
					ctx.strokeStyle = "rgb(50, 50, 50)";
					ctx.stroke();
					if (dist(Input.mouseX, Input.mouseY, 90 + x * xInterval, 410) <= 15) {
						canvas.style.cursor = "pointer";
					}
				} else if (dist(Input.mouseX, Input.mouseY, 90 + x * xInterval, 410) <= 15) {
					ctx.lineWidth = 1;
					ctx.strokeStyle = "rgb(50, 50, 50)";
					ctx.stroke();
					canvas.style.cursor = "pointer";
					if (Input.mouseDown) {
						Mastermind.colourSelected = x;
						if (Mastermind.pinSelected !== null) {
							Mastermind.guesses[Mastermind.guessesMade][Mastermind.pinSelected] = Mastermind.colourSelected;
							Mastermind.colourSelected = null;
						}
					}
				}
				ctx.closePath();
			}
		} else if (Mastermind.state === "win") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			roundedRect(25, 25, canvas.width - 50, canvas.height - 50, 10, true, false, "rgb(120, 120, 120)");
			ctx.fillStyle = "black";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.font = "30px Trebuchet MS";
			ctx.fillText("Mastermind", 50, 70);
			ctx.font = "20px Trebuchet MS";
			ctx.fillText("Congratulations! You guessed the code in " + Mastermind.guessesMade + " guesses!", 50, 100);
			if (pointInRect(Input.mouseX, Input.mouseY, 50, 390, 150, 40)) {
				if (Input.mouseDown) {
					roundedRect(50, 390, 150, 40, 10, true, true, "rgb(100, 100, 100)", "rgb(0, 0, 0)");
					Mastermind.state = "menu";
				} else {
					roundedRect(50, 390, 150, 40, 10, true, true, "rgb(125, 125, 125)", "rgb(25, 25, 25)");
				}
				canvas.style.cursor = "pointer";
			} else {
				roundedRect(50, 390, 150, 40, 10, true, true, "rgb(150, 150, 150)", "rgb(50, 50, 50)");
			}
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.font = "20px Trebuchet MS";
			ctx.fillText("Menu", 125, 410);
		} else if (Mastermind.state === "lose") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			roundedRect(25, 25, canvas.width - 50, canvas.height - 50, 10, true, false, "rgb(120, 120, 120)");
			ctx.fillStyle = "black";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.font = "30px Trebuchet MS";
			ctx.fillText("Mastermind", 50, 70);
			ctx.font = "20px Trebuchet MS";
			ctx.fillText("Whoops, you didn't quite guess the code... Try again?", 50, 100);
			if (pointInRect(Input.mouseX, Input.mouseY, 50, 390, 150, 40)) {
				if (Input.mouseDown) {
					roundedRect(50, 390, 150, 40, 10, true, true, "rgb(100, 100, 100)", "rgb(0, 0, 0)");
					Mastermind.state = "menu";
				} else {
					roundedRect(50, 390, 150, 40, 10, true, true, "rgb(125, 125, 125)", "rgb(25, 25, 25)");
				}
				canvas.style.cursor = "pointer";
			} else {
				roundedRect(50, 390, 150, 40, 10, true, true, "rgb(150, 150, 150)", "rgb(50, 50, 50)");
			}
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.font = "20px Trebuchet MS";
			ctx.fillText("Menu", 125, 410);
		}
		previousFrame = currentFrame;
		window.requestAnimationFrame(Render);
	};
})();

if (document.readyState === "complete" || document.readyState === "interactive") {
	init();
} else {
	window.addEventListener("load", init);
}
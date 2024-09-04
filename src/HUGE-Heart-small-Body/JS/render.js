// Copyright Matthew James, 2021
let titleMessages = [
	"A game",
	"Enter Enviro-land",
	"The Earth is what we all have in common. — Wendell Berry",
	"This feature was made before the game was titled!",
	"By MattDESTROYER",
	"MattDESTROYER was the first nickname I ever used for MineCraft",
	"Developed by Matthew James",
	"Pure HTML, CSS and JavaScript!",
	"1 HTML file and 16 JavaScript files...",
	"Made for the KaJam competition, October 2021",
	"The proper use of science is not to conquer nature but to live in it. — Barry Commoner",
	"Time spent among trees is never time wasted",
	"Most of the source code is minified... sorry",
	"An environmentally concious game",
	"Go plant some trees",
	"I see trees of green... red roses to... What a wonderful world!",
	"Why not spend some time outside?",
	"Reuse bags, don't waste",
	"Turn off lights when they aren't being used",
	"Renewable energy is better for the environment"
], titleMessage = 0;
const randomTitleMessage = _ => titleMessage = Math.floor(Math.random() * titleMessages.length);
randomTitleMessage();
function timedMessageChange() {
	window.setTimeout(function () {
		randomTitleMessage();
		if (scene === "title") {
			timedMessageChange();
		}
	}, 5000);
}
timedMessageChange();

function palmTree(x, y) {
	ctx.beginPath();
	ctx.translate(x, y);
	ctx.fillStyle = "rgb(138, 81, 81)";
	ctx.moveTo(-5, 0);
	ctx.bezierCurveTo(-3, -100, 3, -100, 5, 0);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "rgb(16, 181, 36)";
	ctx.moveTo(-2, -68);
	ctx.lineTo(-21, -83);
	ctx.lineTo(-47, -93);
	ctx.lineTo(-17, -86);
	ctx.lineTo(-1, -75);
	ctx.lineTo(-2, -68);
	ctx.lineTo(-21, -110);
	ctx.lineTo(-47, -118);
	ctx.lineTo(-17, -116);
	ctx.lineTo(-1, -77);
	ctx.lineTo(2, -68);
	ctx.lineTo(21, -99);
	ctx.lineTo(47, -118);
	ctx.lineTo(17, -105);
	ctx.lineTo(-1, -77);
	ctx.lineTo(2, -68);
	ctx.lineTo(21, -120);
	ctx.lineTo(47, -131);
	ctx.lineTo(17, -124);
	ctx.lineTo(-1, -77);
	ctx.lineTo(-2, -68);
	ctx.lineTo(-8, -117);
	ctx.lineTo(-21, -136);
	ctx.lineTo(-2, -121);
	ctx.lineTo(-2, -68);
	ctx.lineTo(6, -110);
	ctx.lineTo(11, -118);
	ctx.lineTo(2, -116);
	ctx.lineTo(-1, -77);
	ctx.lineTo(-1, -77);
	ctx.lineTo(2, -68);
	ctx.lineTo(21, -83);
	ctx.lineTo(47, -93);
	ctx.lineTo(17, -86);
	ctx.lineTo(1, -75);
	ctx.lineTo(-2, -68);
	ctx.lineTo(-21, -67);
	ctx.lineTo(-47, -58);
	ctx.lineTo(-17, -76);
	ctx.lineTo(-1, -77);
	ctx.lineTo(2, -68);
	ctx.lineTo(21, -62);
	ctx.lineTo(47, -44);
	ctx.lineTo(17, -76);
	ctx.lineTo(1, -77);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "rgb(102, 30, 30)";
	ctx.ellipse(-9, -71, 10, 10, 0, 0, 2 * Math.PI);
	ctx.ellipse(13, -65, 10, 10, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.translate(-x, -y);
	ctx.closePath();
}

function Render() {
	cursor("default");
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (scene === "title") {
		ctx.textAlign = "center";
		ctx.font = "80px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText("HUGE Heart small Body", Math.floor(canvas.width / 2) - 3, 78 + sineWave(4, 10));
		ctx.fillStyle = "white";
		ctx.fillText("HUGE Heart small Body", Math.floor(canvas.width / 2), 75 + sineWave(4, 10));
		ctx.font = "30px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText(titleMessages[titleMessage], Math.floor(canvas.width / 2) - 2, 132 + sineWave(5, 10));
		ctx.fillStyle = "white";
		ctx.fillText(titleMessages[titleMessage], Math.floor(canvas.width / 2), 130 + sineWave(5, 10));
		ctx.font = "20px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText("(Press any key to start)", Math.floor(canvas.width / 2) - 2, canvas.height - 40 + sineWave(5.5, 5)) + 2;
		ctx.fillStyle = "white";
		ctx.fillText("(Press any key to start)", Math.floor(canvas.width / 2), canvas.height - 40 + sineWave(5.5, 5));
	} else if (scene === "menu") {
		ctx.textAlign = "center";
		ctx.font = "60px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText("HUGE Heart small Body", Math.floor(canvas.width / 2) - 3, 68 + sineWave(4, 10));
		ctx.fillStyle = "white";
		ctx.fillText("HUGE Heart small Body", Math.floor(canvas.width / 2), 65 + sineWave(4, 10));
		ctx.font = "40px Trebuchet MS";
		if (Input.mouseX > Math.floor(canvas.width / 2) - 47 &&
			Input.mouseX < Math.floor(canvas.width / 2) + 47 &&
			Input.mouseY > 93 + sineWave(5, 8) &&
			Input.mouseY < 147 + sineWave(5, 8)) {
			cursor("pointer");
			ctx.fillStyle = "whitesmoke";
			ctx.fillRect(Math.floor(canvas.width / 2) - 42, 97 + sineWave(5, 8), 85, 45);
			ctx.strokeStyle = "whitesmoke";
			ctx.lineJoin = "round";
			ctx.lineWidth = 5;
			ctx.strokeRect(Math.floor(canvas.width / 2) - 42, 97 + sineWave(5, 8), 85, 45);
			ctx.lineJoin = "miter";
			ctx.lineWidth = 1;
			ctx.fillStyle = "gray";
			ctx.fillText("Play", Math.floor(canvas.width / 2) - 2, 132 + sineWave(5, 8));
			ctx.fillStyle = "black";
			ctx.fillText("Play", Math.floor(canvas.width / 2), 130 + sineWave(5, 8));
		} else {
			ctx.fillStyle = "gray";
			ctx.fillText("Play", Math.floor(canvas.width / 2) - 2, 132 + sineWave(5, 8));
			ctx.fillStyle = "white";
			ctx.fillText("Play", Math.floor(canvas.width / 2), 130 + sineWave(5, 8));
		}
		if (Input.mouseX > Math.floor(canvas.width / 2) - 75 &&
			Input.mouseX < Math.floor(canvas.width / 2) + 75 &&
			Input.mouseY > 163 + sineWave(6, 7) &&
			Input.mouseY < 217 + sineWave(6, 7)) {
			cursor("pointer");
			ctx.fillStyle = "whitesmoke";
			ctx.fillRect(Math.floor(canvas.width / 2) - 70, 167 + sineWave(6, 7), 140, 45);
			ctx.strokeStyle = "whitesmoke";
			ctx.lineJoin = "round";
			ctx.lineWidth = 5;
			ctx.strokeRect(Math.floor(canvas.width / 2) - 70, 167 + sineWave(6, 7), 140, 45);
			ctx.lineJoin = "miter";
			ctx.lineWidth = 1;
			ctx.fillStyle = "gray";
			ctx.fillText("Credits", Math.floor(canvas.width / 2) - 2, 202 + sineWave(6, 7));
			ctx.fillStyle = "black";
			ctx.fillText("Credits", Math.floor(canvas.width / 2), 200 + sineWave(6, 7));
		} else {
			ctx.fillStyle = "gray";
			ctx.fillText("Credits", Math.floor(canvas.width / 2) - 2, 202 + sineWave(6, 7));
			ctx.fillStyle = "white";
			ctx.fillText("Credits", Math.floor(canvas.width / 2), 200 + sineWave(6, 7));
		}
	} else if (scene === "credits") {
		ctx.textAlign = "center";
		ctx.font = "60px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText("HUGE Heart small Body", Math.floor(canvas.width / 2) - 3, 68 + sineWave(4, 10));
		ctx.fillStyle = "white";
		ctx.fillText("HUGE Heart small Body", Math.floor(canvas.width / 2), 65 + sineWave(4, 10));
		ctx.font = "40px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText("MattDESTROYER (Matthew James)", Math.floor(canvas.width / 2) - 2, 177 + sineWave(7, 20));
		ctx.fillStyle = "white";
		ctx.fillText("MattDESTROYER (Matthew James)", Math.floor(canvas.width / 2), 175 + sineWave(7, 20));
		ctx.font = "20px Trebuchet MS";
		ctx.fillStyle = "gray";
		ctx.fillText("(Yep, only one dev...)", Math.floor(canvas.width / 2) - 1, 227 + sineWave(7, 20));
		ctx.fillStyle = "white";
		ctx.fillText("(Yep, only one dev...)", Math.floor(canvas.width / 2), 225 + sineWave(7, 20));
		ctx.font = "40px Trebuchet MS";
		if (Input.mouseX > Math.floor(canvas.width / 2) - 54 &&
			Input.mouseX < Math.floor(canvas.width / 2) + 50 &&
			Input.mouseY > canvas.height - 55 + sineWave(5, 8) &&
			Input.mouseY < canvas.height + sineWave(5, 8)) {
			cursor("pointer");
			ctx.fillStyle = "whitesmoke";
			ctx.fillRect(Math.floor(canvas.width / 2) - 49, canvas.height - 50 + sineWave(5, 8), 94, 45);
			ctx.strokeStyle = "whitesmoke";
			ctx.lineJoin = "round";
			ctx.lineWidth = 5;
			ctx.strokeRect(Math.floor(canvas.width / 2) - 49, canvas.height - 50 + sineWave(5, 8), 94, 45);
			ctx.lineJoin = "miter";
			ctx.lineWidth = 1;
			ctx.fillStyle = "gray";
			ctx.fillText("Menu", Math.floor(canvas.width / 2) - 2, canvas.height - 15 + sineWave(5, 8));
			ctx.fillStyle = "black";
			ctx.fillText("Menu", Math.floor(canvas.width / 2), canvas.height - 17 + sineWave(5, 8));
		} else {
			ctx.fillStyle = "gray";
			ctx.fillText("Menu", Math.floor(canvas.width / 2) - 2, canvas.height - 15 + sineWave(5, 8));
			ctx.fillStyle = "white";
			ctx.fillText("Menu", Math.floor(canvas.width / 2), canvas.height - 17 + sineWave(5, 8));
		}
	} else if (scene === "map" && text === "") {
		ctx.fillStyle = "skyblue";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.save();
		ctx.translate((canvas.width - canvas.height) / 2 - 50, 5);
		ctx.scale(canvas.height / 400, canvas.height / 400);
		ctx.fillStyle = "rgb(210, 235, 75)";
		ctx.moveTo(140, 59);
		ctx.bezierCurveTo(191, 15, 234, 24, 292, 47);
		ctx.moveTo(292, 47);
		ctx.bezierCurveTo(469, 78, 497, 227, 457, 282);
		ctx.moveTo(457, 282);
		ctx.bezierCurveTo(397, 380, 337, 387, 267, 363);
		ctx.moveTo(267, 363);
		ctx.bezierCurveTo(78, 379, 101, 370, 58, 315);
		ctx.moveTo(58, 315);
		ctx.bezierCurveTo(2, 242, 17, 208, 58, 133);
		ctx.moveTo(58, 133);
		ctx.bezierCurveTo(78, 76, 101, 70, 140, 59);
		ctx.moveTo(140, 59);
		ctx.lineTo(292, 47);
		ctx.lineTo(457, 282);
		ctx.lineTo(267, 363);
		ctx.lineTo(58, 315);
		ctx.lineTo(58, 133);
		ctx.lineTo(140, 59);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.scale(0.8, 0.8);
		ctx.translate(50, 50);
		ctx.fillStyle = "rgb(105, 235, 75)";
		ctx.moveTo(140, 59);
		ctx.bezierCurveTo(191, 15, 234, 24, 292, 47);
		ctx.moveTo(292, 47);
		ctx.bezierCurveTo(469, 78, 497, 227, 457, 282);
		ctx.moveTo(457, 282);
		ctx.bezierCurveTo(397, 380, 337, 387, 267, 363);
		ctx.moveTo(267, 363);
		ctx.bezierCurveTo(78, 379, 101, 370, 58, 315);
		ctx.moveTo(58, 315);
		ctx.bezierCurveTo(2, 242, 17, 208, 58, 133);
		ctx.moveTo(58, 133);
		ctx.bezierCurveTo(78, 76, 101, 70, 140, 59);
		ctx.moveTo(140, 59);
		ctx.lineTo(292, 47);
		ctx.lineTo(457, 282);
		ctx.lineTo(267, 363);
		ctx.lineTo(58, 315);
		ctx.lineTo(58, 133);
		ctx.lineTo(140, 59);
		ctx.fill();
		ctx.restore();
		ctx.closePath();
		ctx.save();
		ctx.translate((canvas.width - canvas.height) / 2 - 50, 5);
		ctx.scale(canvas.height / 800, canvas.height / 800);
		palmTree(300, 220);
		palmTree(350, 240);
		palmTree(280, 260);
		palmTree(370, 280);
		palmTree(325, 300);
		palmTree(260, 310);
		ctx.restore();
		ctx.save();
		ctx.translate((canvas.width - canvas.height) / 2 - 50, 5);
		ctx.scale(canvas.height / 1500, canvas.height / 1500);
		ctx.fillStyle = "rgb(105, 35, 0)";
		ctx.fillRect(1000, 650, 200, 200);
		ctx.fillStyle = "rgb(90, 35, 0)";
		ctx.fillRect(980, 650, 220, 20);
		ctx.fillRect(1000, 675, 220, 20);
		ctx.fillRect(980, 700, 220, 20);
		ctx.fillRect(1000, 725, 220, 20);
		ctx.fillRect(980, 750, 220, 20);
		ctx.fillRect(1000, 775, 220, 20);
		ctx.fillRect(980, 800, 220, 20);
		ctx.fillRect(1000, 825, 220, 20);
		ctx.beginPath();
		ctx.fillStyle = "rgb(90, 35, 0)";
		ctx.ellipse(990, 685, 10, 10, 0, 0, Math.PI * 2);
		ctx.ellipse(990, 735, 10, 10, 0, 0, Math.PI * 2);
		ctx.ellipse(990, 785, 10, 10, 0, 0, Math.PI * 2);
		ctx.ellipse(990, 835, 10, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "rgb(90, 35, 0)";
		ctx.ellipse(1210, 660, 10, 10, 0, 0, Math.PI * 2);
		ctx.ellipse(1210, 710, 10, 10, 0, 0, Math.PI * 2);
		ctx.ellipse(1210, 760, 10, 10, 0, 0, Math.PI * 2);
		ctx.ellipse(1210, 810, 10, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "black";
		ctx.fillRect(1075, 750, 50, 100);
		ctx.restore();
		ctx.beginPath();
		ctx.save();
		ctx.translate((canvas.width - canvas.height) / 2 - 50, 5);
		ctx.scale(canvas.height / 400, canvas.height / 400);
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.textAlign = "left";
		ctx.font = "14px Trebuchet MS";
		if (!tasks[2]) {
			ctx.moveTo(300, 220);
			ctx.lineTo(320, 165);
			ctx.lineTo(520, 165);
			if (Input.mouseX > 320 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
				Input.mouseX < 527 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
				Input.mouseY > 145 * canvas.height / 400 + 5 &&
				Input.mouseY < 165 * canvas.height / 400 + 5) {
				cursor("pointer");
				ctx.fillStyle = "white";
				ctx.fillRect(320, 146, 207, 20);
				ctx.fillStyle = "black";
			} else {
				ctx.fillStyle = "white";
			}
			ctx.fillText("Turn off the lights at Cozy Cabin", 323, 160);

		}
		if (!tasks[1]) {
			ctx.moveTo(180, 100);
			ctx.lineTo(200, 45);
			ctx.lineTo(407, 45);
			if (Input.mouseX > 200 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
				Input.mouseX < 413 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
				Input.mouseY > 25 * canvas.height / 400 + 5 &&
				Input.mouseY < 45 * canvas.height / 400 + 5) {
				cursor("pointer");
				ctx.fillStyle = "white";
				ctx.fillRect(200, 26, 213, 20);
				ctx.fillStyle = "black";
			} else {
				ctx.fillStyle = "white";
			}
			ctx.fillText("Plant trees at Palm Tree Clearing", 203, 40);
		}
		if (!tasks[0]) {
			ctx.moveTo(125, 350);
			ctx.lineTo(145, 255);
			ctx.lineTo(350, 255);
			if (Input.mouseX > 145 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
				Input.mouseX < 355 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
				Input.mouseY > 236 * canvas.height / 400 + 5 &&
				Input.mouseY < 256 * canvas.height / 400 + 5) {
				cursor("pointer");
				ctx.fillStyle = "white";
				ctx.fillRect(145, 236, 210, 20);
				ctx.fillStyle = "black";
			} else {
				ctx.fillStyle = "white";
			}
			ctx.fillText("Pick up rubbish at Windy Stretch", 150, 250);
		}
		ctx.stroke();
		ctx.restore();
		ctx.closePath();
	} else if (scene === "windy stretch") {
		ctx.save();
		ctx.fillStyle = "skyblue";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.fillStyle = "rgb(210, 235, 75)";
		ctx.scale(0.25 + canvas.height / 400, 0.25 + canvas.height / 400);
		ctx.moveTo(0, 201);
		ctx.bezierCurveTo(41, 362, 53, 363, 400, 400);
		ctx.lineTo(canvas.width, 0);
		ctx.lineTo(0, 0);
		ctx.lineTo(0, 201);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		scenes[0].render();
	} else if (scene === "cozy cabin") {
		scenes[2].render();
	} else if (scene === "palm tree clearing") {
		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate((canvas.width - canvas.height) / 2 - 50, 5);
		ctx.scale(canvas.height / 400, canvas.height / 400);
		palmTree(100, 150);
		palmTree(455, 180);
		palmTree(410, 330);
		ctx.restore();
		scenes[1].render();
	}
	if (timer) {
		ctx.font = "20px Trebuchet MS";
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		ctx.fillText(currentTime() / 1000, 10, 30);
	}
	if (text.length > 1) {
		ctx.fillStyle = "grey";
		ctx.fillRect(15, 15, canvas.width - 30, canvas.height - 30);
		ctx.fillStyle = "black";
		ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
		ctx.fillStyle = "white";
		ctx.textAlign = "left";
		ctx.font = "15px Trebuchet MS";
		getLines(text, canvas.width - 60).forEach((x, y) => {
			if (x.indexOf("(Press any key to continue)") !== -1) {
				ctx.fillStyle = "red";
			} else {
				ctx.fillStyle = "white";
			}
			ctx.fillText(x, 30, 40 + 17 * y)
		});
	}
}
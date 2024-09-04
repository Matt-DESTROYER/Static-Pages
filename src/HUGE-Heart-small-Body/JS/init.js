// Copyright Matthew James, 2021
let canvas = (document.body || document.getElementsByTagName("body")[0]).appendChild(document.createElement("canvas"));
let ctx = canvas.getContext("2d", { alpha: false });

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scene = "title", Input = {},
	scenes = [
		new Scene([
			new GameObject(0, 0, new PolygonMesh([
				new Vector2(-20, 0),
				new Vector2(-14, -14),
				new Vector2(0, -20),
				new Vector2(14, -14),
				new Vector2(20, 0),
				new Vector2(14, 14),
				new Vector2(0, 20),
				new Vector2(-14, 14)
			]), function () {
				ctx.beginPath();
				ctx.fillStyle = "peru";
				ctx.ellipse(this.x, this.y, 20, 20, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				ctx.translate(this.x, this.y);
				ctx.rotate(angleToMouse(this.x + canvas.width / 2, this.y + canvas.height / 2, false));
				ctx.ellipse(20, 20, 5, 5, 0, 0, Math.PI * 2);
				ctx.ellipse(20, -20, 5, 5, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.closePath();
				ctx.rotate(-angleToMouse(this.x + canvas.width / 2, this.y + canvas.height / 2, false));
				ctx.translate(-this.x, -this.y);
			}, function () {
				this.layer = 3;
				this.holdingItem = false;
				this.item = null;
			}, function () {
				if (Input.W || Input.ARROWUP) {
					this.changeY(-4);
				}
				if (Input.S || Input.ARROWDOWN) {
					this.changeY(4);
				}
				if (Input.A || Input.ARROWLEFT) {
					this.changeX(-4);
				}
				if (Input.D || Input.ARROWRIGHT) {
					this.changeX(4);
				}
				if (this.x - 20 < -canvas.width / 2) {
					this.x = -canvas.width / 2 + 20;
				}
				if (this.x + 20 > canvas.width / 2) {
					this.x = canvas.width / 2 - 20;
				}
				if (this.y - 20 < -canvas.height / 2) {
					this.y = -canvas.height / 2 + 20;
				}
				if (this.y + 20 > canvas.height / 2) {
					this.y = canvas.height / 2 - 20;
				}
				if (this.holdingItem) {
					this.item.x = this.x;
					this.item.y = this.y;
				} else {
					let gameObjs = scenes[0].gameObjects;
					for (let i = 0; i < gameObjs.length - 4; i++) {
						if (dist(this.x, this.y, gameObjs[i].x, gameObjs[i].y) <= 30 &&
							(Input[32] || Input.mouseDown)) {
							this.holdingItem = true;
							this.item = gameObjs[i];
							break;
						}
					}
				}
			}, true),
			new GameObject(-100, -canvas.height / 2 + 50, new RectangleMesh(55, 55), function () {
				ctx.fillStyle = ctx.strokeStyle = "red";
				ctx.lineJoin = "round";
				ctx.lineWidth = 5;
				ctx.strokeRect(this.x - 25, this.y - 25, 50, 50);
				ctx.lineJoin = "miter";
				ctx.lineWidth = 1;
				ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
			}, function () {
				this.layer = 2;
			}, function () { }, true),
			new GameObject(0, -canvas.height / 2 + 50, new RectangleMesh(55, 55), function () {
				ctx.fillStyle = ctx.strokeStyle = "yellow";
				ctx.lineJoin = "round";
				ctx.lineWidth = 5;
				ctx.strokeRect(this.x - 25, this.y - 25, 50, 50);
				ctx.lineJoin = "miter";
				ctx.lineWidth = 1;
				ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
			}, function () {
				this.layer = 2;
			}, function () { }, true),
			new GameObject(100, -canvas.height / 2 + 50, new RectangleMesh(55, 55), function () {
				ctx.fillStyle = ctx.strokeStyle = "green";
				ctx.lineJoin = "round";
				ctx.lineWidth = 5;
				ctx.strokeRect(this.x - 25, this.y - 25, 50, 50);
				ctx.lineJoin = "miter";
				ctx.lineWidth = 1;
				ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
			}, function () {
				this.layer = 2;
			}, function () { }, true)
		], new Camera(0, 0)),
		new Scene([
			new GameObject(0, 0, new PolygonMesh([
				new Vector2(-20, 0),
				new Vector2(-14, -14),
				new Vector2(0, -20),
				new Vector2(14, -14),
				new Vector2(20, 0),
				new Vector2(14, 14),
				new Vector2(0, 20),
				new Vector2(-14, 14)
			]), function () {
				ctx.beginPath();
				ctx.fillStyle = "peru";
				ctx.ellipse(this.x, this.y, 20, 20, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				ctx.translate(this.x, this.y);
				ctx.rotate(angleToMouse(this.x + canvas.width / 2, this.y + canvas.height / 2, false));
				ctx.ellipse(20, 20, 5, 5, 0, 0, Math.PI * 2);
				ctx.ellipse(20, -20, 5, 5, 0, 0, Math.PI * 2);
				if (this.holdingItem && this.item.name === "seed") {
					ctx.fill();
					ctx.closePath();
					ctx.beginPath();
					ctx.fillStyle = "brown";
					ctx.ellipse(30, 0, 5, 3, 0, 0, Math.PI * 2);
				}
				ctx.fill();
				ctx.closePath();
				ctx.rotate(-angleToMouse(this.x + canvas.width / 2, this.y + canvas.height / 2, false));
				ctx.translate(-this.x, -this.y);
			}, function () {
				this.layer = 3;
				this.holdingItem = false;
				this.item = null;
			}, function () {
				if (Input.W || Input.ARROWUP) {
					this.changeY(-4);
				}
				if (Input.S || Input.ARROWDOWN) {
					this.changeY(4);
				}
				if (Input.A || Input.ARROWLEFT) {
					this.changeX(-4);
				}
				if (Input.D || Input.ARROWRIGHT) {
					this.changeX(4);
				}
				if (this.x - 20 < -canvas.width / 2) {
					this.x = -canvas.width / 2 + 20;
				}
				if (this.x + 20 > canvas.width / 2) {
					this.x = canvas.width / 2 - 20;
				}
				if (this.y - 20 < -canvas.height / 2) {
					this.y = -canvas.height / 2 + 20;
				}
				if (this.y + 20 > canvas.height / 2) {
					this.y = canvas.height / 2 - 20;
				}
				if (this.holdingItem) {
					this.item.x = this.x;
					this.item.y = this.y;
				}
			}, true),
			new GameObject(-50, -125, new RectangleMesh(45, 45), function () {
				if (this.itemType === 1) {
					ctx.fillStyle = "DarkKhaki";
					ctx.strokeStyle = "DarkKhaki";
					ctx.fillRect(this.x - 20, this.y - 20, 40, 40);
					ctx.lineWidth = 5;
					ctx.lineJoin = "round";
					ctx.strokeRect(this.x - 20, this.y - 20, 40, 40);
					ctx.lineJoin = "miter";
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.fillStyle = "brown";
					ctx.ellipse(this.x, this.y + 2, 3, 6, 0, 0, Math.PI * 2);
					ctx.fill();
					ctx.closePath();
					ctx.font = "12px Trebuchet MS";
					ctx.textAlign = "center";
					ctx.fillStyle = "black";
					ctx.fillText("Seeds", this.x, this.y - 8);
				} else {
					ctx.beginPath();
					ctx.strokeStyle = "rgb(215, 220, 15)";
					ctx.lineWidth = 3;
					ctx.moveTo(this.x - 15, this.y - 15);
					ctx.bezierCurveTo(this.x - 10, this.y - 30, this.x + 10, this.y - 30, this.x + 15, this.y - 15);
					ctx.stroke();
					ctx.closePath();
					ctx.lineWidth = 1;
					ctx.fillStyle = "rgb(215, 220, 15)";
					ctx.beginPath();
					ctx.ellipse(this.x - 35, this.y - 28, 1, 5, 0, 0, Math.PI * 2);
					ctx.ellipse(this.x, this.y + 15, 15, 4, 0, 0, Math.PI * 2);
					ctx.fill();
					ctx.closePath();
					ctx.fillRect(this.x - 15, this.y - 15, 30, 30);
					ctx.beginPath();
					ctx.moveTo(this.x - 35, this.y - 28);
					ctx.lineTo(this.x - 15, this.y - 10);
					ctx.lineTo(this.x - 15, this.y - 5);
					ctx.lineTo(this.x - 35, this.y - 28);
					ctx.fill();
					ctx.closePath();
				}
			}, function () {
				this.itemType = 1;
				this.name = "seed bag";
			}, function () {
				if (this.itemType === 1) {
					if (dist(this.x, this.y, scenes[1].gameObjects[scenes[1].gameObjects.length - 1].x, scenes[1].gameObjects[scenes[1].gameObjects.length - 1].y) < 60 && !scenes[1].gameObjects[scenes[1].gameObjects.length - 1].holdingItem && (Input.mouseDown || Input[32])) {
						scenes[1].gameObjects[scenes[1].gameObjects.length - 1].holdingItem = true;
						scenes[1].gameObjects[scenes[1].gameObjects.length - 1].item = Seed(0, 0);
						scenes[1].gameObjects[scenes[1].gameObjects.length - 1].item.start();
					}
					let _allMoundsHaveSeeds = true;
					for (let i = 0; i < scenes[1].gameObjects.length; i++) {
						if (scenes[1].gameObjects[i].name === "dirt mound" && scenes[1].gameObjects[i].stage === 0) {
							_allMoundsHaveSeeds = false;
							break;
						}
					}
					if (_allMoundsHaveSeeds) {
						this.itemType = 2;
						this.name = "watering can";
						this.layer = 4;
						this.collides = false;
					}
				} else if ((Input.mouseDown || Input[32]) && dist(this.x, this.y, scenes[1].gameObjects[scenes[1].gameObjects.length - 2].x, scenes[1].gameObjects[scenes[1].gameObjects.length - 2].y) < 40) {
					scenes[1].gameObjects[scenes[1].gameObjects.length - 2].holdingItem = true;
					scenes[1].gameObjects[scenes[1].gameObjects.length - 2].item = this;
				}
			}, true)
		], new Camera(0, 0)),
		new Scene([
			new GameObject(3 * - canvas.width / 8, 0, new RectangleMesh(300, 300), function () {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x - canvas.width / 8, this.y - canvas.width / 8, canvas.width / 4, canvas.width / 4);
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.rect(this.x - 30, this.y - 50, 60, 100);
				ctx.moveTo(this.x - 30, this.y);
				ctx.lineTo(this.x + 30, this.y);
				ctx.stroke();
				ctx.closePath();
				ctx.textAlign = "center";
				ctx.font = "20px Trebuchet MS";
				if (this.on) {
					ctx.fillStyle = "rgb(72, 255, 0)";
					ctx.fillRect(this.x - 30, this.y - 50, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("ON", this.x, this.y - 25);
				} else {
					ctx.fillStyle = "red";
					ctx.fillRect(this.x - 30, this.y, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("OFF", this.x, this.y + 25);
				}
			}, function () {
				this.on = true;
			}, function () { }, false),
			new GameObject(-canvas.width / 8, 0, new RectangleMesh(300, 300), function () {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x - canvas.width / 8, this.y - canvas.width / 8, canvas.width / 4, canvas.width / 4);
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.rect(this.x - 30, this.y - 50, 60, 100);
				ctx.moveTo(this.x - 30, this.y);
				ctx.lineTo(this.x + 30, this.y);
				ctx.stroke();
				ctx.closePath();
				ctx.textAlign = "center";
				ctx.font = "20px Trebuchet MS";
				if (this.on) {
					ctx.fillStyle = "rgb(72, 255, 0)";
					ctx.fillRect(this.x - 30, this.y - 50, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("ON", this.x, this.y - 25);
				} else {
					ctx.fillStyle = "red";
					ctx.fillRect(this.x - 30, this.y, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("OFF", this.x, this.y + 25);
				}
			}, function () {
				this.on = true;
			}, function () { }, false),
			new GameObject(canvas.width / 8, 0, new RectangleMesh(300, 300), function () {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x - canvas.width / 8, this.y - canvas.width / 8, canvas.width / 4, canvas.width / 4);
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.rect(this.x - 30, this.y - 50, 60, 100);
				ctx.moveTo(this.x - 30, this.y);
				ctx.lineTo(this.x + 30, this.y);
				ctx.stroke();
				ctx.closePath();
				ctx.textAlign = "center";
				ctx.font = "20px Trebuchet MS";
				if (this.on) {
					ctx.fillStyle = "rgb(72, 255, 0)";
					ctx.fillRect(this.x - 30, this.y - 50, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("ON", this.x, this.y - 25);
				} else {
					ctx.fillStyle = "red";
					ctx.fillRect(this.x - 30, this.y, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("OFF", this.x, this.y + 25);
				}
			}, function () {
				this.on = true;
			}, function () { }, false),
			new GameObject(3 * canvas.width / 8, 0, new RectangleMesh(300, 300), function () {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x - canvas.width / 8, this.y - canvas.width / 8, canvas.width / 4, canvas.width / 4);
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.rect(this.x - 30, this.y - 50, 60, 100);
				ctx.moveTo(this.x - 30, this.y);
				ctx.lineTo(this.x + 30, this.y);
				ctx.stroke();
				ctx.closePath();
				ctx.textAlign = "center";
				ctx.font = "20px Trebuchet MS";
				if (this.on) {
					ctx.fillStyle = "rgb(72, 255, 0)";
					ctx.fillRect(this.x - 30, this.y - 50, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("ON", this.x, this.y - 25);
				} else {
					ctx.fillStyle = "red";
					ctx.fillRect(this.x - 30, this.y, 60, 50);
					ctx.fillStyle = "black";
					ctx.fillText("OFF", this.x, this.y + 25);
				}
			}, function () {
				this.on = true;
			}, function () { }, false)
		], new Camera(0, 0))
	], currentScene = 0,
	locations = [
		"windy stretch",
		"palm tree clearing",
		"cozy cabin"
	],
	tasks = [
		false,
		false,
		false
	],
	text = "",
	startTime, endTime,
	timer = false;
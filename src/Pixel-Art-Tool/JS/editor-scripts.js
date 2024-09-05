const canvas = document.getElementById("canvas");
canvas.width = canvas.height = Math.floor(window.innerHeight / 25) * 25;
canvas.imageSmoothingEnabled = false;
canvas.mozImageSmoothingEnabled = false;
canvas.webkitImageSmoothingEnabled = false;
canvas.msImageSmoothingEnabled = false;
const ctx = canvas.getContext("2d");

const _canvas = document.createElement("canvas");
_canvas.width = _canvas.height = 16;
_canvas.imageSmoothingEnabled = false;
_canvas.mozImageSmoothingEnabled = false;
_canvas.webkitImageSmoothingEnabled = false;
_canvas.msImageSmoothingEnabled = false;
const _ctx = _canvas.getContext("2d");

window.addEventListener("resize", () => {
	canvas.width = canvas.height = Math.floor(window.innerHeight / 25) * 25;
	canvas.imageSmoothingEnabled = false;
	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	_canvas.imageSmoothingEnabled = false;
	_canvas.mozImageSmoothingEnabled = false;
	_canvas.webkitImageSmoothingEnabled = false;
	_canvas.msImageSmoothingEnabled = false;
});

class Image_Data {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.data = [];
		for (let y = 0; y < this.height; y++) {
			let row = [];
			for (let x = 0; x < this.width; x++) {
				row.push([0, 0, 0, 0]);
			}
			this.data.push(row);
		}
	}
	resize(width, height) {
		this.width = width;
		this.height = height;
		for (let y = 0; y < this.data.length; y++) {
			if (y > this.height) {
				this.data.splice(y, 1);
				y--;
				continue;
			}
			for (let x = 0; x < this.data[y].length; x++) {
				if (x > this.width) {
					this.data[y].splice(x, 1);
					x--;
					continue;
				}
			}
		}
		while (this.data.length < this.height) {
			let row = [];
			for (let x = 0; x < this.width; x++) {
				row.push([0, 0, 0, 0]);
			}
			this.data.push(row);
		}
		for (let y = 0; y < this.data.length; y++) {
			while (this.data[y].length < this.width) {
				this.data[y].push([0, 0, 0, 0]);
			}
		}
	}
	getPixel(x, y) {
		x = ~~x;
		y = ~~y;
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			return null;
		}
		return this.data[y][x];
	}
	setPixel(x, y, c_data) {
		x = ~~x;
		y = ~~y;
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			return null;
		}
		return this.data[y][x] = c_data;
	}
	draw(context, scaleX, scaleY) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				context.fillStyle = "rgba(" + this.data[y][x][0] + "," + this.data[y][x][1] + "," + this.data[y][x][2] + "," + this.data[y][x][3] + ")";
				context.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
			}
		}
	}
	download() {
		const a = document.createElement("a");
		a.setAttribute("download", "Pixel Art.png");
		const c = document.createElement("canvas");
		this.draw(c.getContext("2d"), 1, 1);
		c.toBlob((blob) => {
			const url = URL.createObjectURL(blob);
			a.setAttribute("href", url);
			a.click();
			URL.revokeObjectURL(url);
		});
	}
}

let image_data = new Image_Data(16, 16),
	colour = "#000000",
	scale = 1;

// upload image
function uploadImage() {
	const selectedFile = event.target.files[0];
	const reader = new FileReader();
	const img = new Image();

	img.onload = function() {
		_canvas.width = img.width;
		_canvas.height = img.height;
		document.getElementById("width-label").textContent = "(" + _canvas.width + ")";
		document.getElementById("width").value = _canvas.width;
		document.getElementById("height-label").textContent = "(" + _canvas.height + ")";
		document.getElementById("height").value = _canvas.height;
		image_data = new Image_Data(_canvas.width, _canvas.height);
		_ctx.clearRect(0, 0, _canvas.width, _canvas.height);
		_ctx.drawImage(img, 0, 0);
		const tempData = _ctx.getImageData(0, 0, _canvas.width, _canvas.height);
		for (let i = 0, x = 0, y = 0; i < tempData.data.length; i += 4, x++) {
			if (x >= _canvas.width) {
				x = 0;
				y++;
			}
			image_data.setPixel(x, y, [tempData.data[i], tempData.data[i + 1], tempData.data[i + 2], tempData.data[i + 3] / 255]);
		}
		image_data.draw(_ctx, 1, 1);
	};

	reader.onload = function(event) {
		img.src = event.target.result;
	};

	reader.readAsDataURL(selectedFile);
}

// apply color changes
{
	function changeColour(e) {
		colour = (e || window.event).target.style["background-color"];
	}
	document.getElementById("red").addEventListener("click", changeColour);
	document.getElementById("orange").addEventListener("click", changeColour);
	document.getElementById("yellow").addEventListener("click", changeColour);
	document.getElementById("lightgreen").addEventListener("click", changeColour);
	document.getElementById("green").addEventListener("click", changeColour);
	document.getElementById("blue").addEventListener("click", changeColour);
	document.getElementById("purple").addEventListener("click", changeColour);
	document.getElementById("pink").addEventListener("click", changeColour);
	document.getElementById("black").addEventListener("click", changeColour);
	document.getElementById("white").addEventListener("click", changeColour);
	document.getElementById("colour-picker").addEventListener("change", (e) => {
		colour = (e || window.event).target.value;
	});
}

// apply scaling changes
{
	document.getElementById("width").addEventListener("input", (e) => {
		document.getElementById("width-label").textContent = "(" + e.target.value + ")";
		_canvas.width = document.getElementById("width").value;
		image_data.resize(_canvas.width, _canvas.height);
	});
	document.getElementById("height").addEventListener("input", (e) => {
		document.getElementById("height-label").textContent = "(" + e.target.value + ")";
		_canvas.height = document.getElementById("height").value;
		image_data.resize(_canvas.width, _canvas.height);
	});
	document.getElementById("scale").addEventListener("input", (e) => {
		document.getElementById("scale-label").textContent = "(" + e.target.value + ")";
		scale = e.target.value;
	});
}

// mouse info
let mouseDown = mouseX = mouseY = null;
{
	canvas.addEventListener("mousedown", () => mouseDown = true);
	canvas.addEventListener("mouseup", () => mouseDown = false);
	canvas.addEventListener("mousemove", (e) => {
		e = e || window.event;
		const rect = canvas.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	});
}

const hexToRgb = (function() {
	const _ = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	return function(hex) {
		const result = _.exec(hex);
		return result ? [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16),
			1
		] : [255, 255, 255, 1];
	}
})();

ctx.strokeStyle = "#000000";
image_data.draw(_ctx, 1, 1);
function paint() {
	if (mouseDown) {
		ctx.fillStyle = colour;
		image_data.setPixel(mouseX / canvas.width * image_data.width, mouseY / canvas.height * image_data.height, hexToRgb(ctx.fillStyle));
		image_data.draw(_ctx, 1, 1);
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const xPortion = canvas.width / document.getElementById("width").value,
		yPortion = canvas.height / document.getElementById("height").value;
	image_data.draw(ctx, xPortion, yPortion);
	ctx.beginPath();
	ctx.moveTo(1, 0);
	ctx.lineTo(1, canvas.height);
	for (let x = 0; x < canvas.width; x += xPortion) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}
	ctx.moveTo(canvas.width - 1, 0);
	ctx.lineTo(canvas.width - 1, canvas.height);
	ctx.moveTo(0, 1);
	ctx.lineTo(canvas.width, 1);
	for (let y = 0; y < canvas.height; y += yPortion) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}
	ctx.moveTo(0, canvas.height - 1);
	ctx.lineTo(canvas.width, canvas.height - 1);
	ctx.closePath();
	ctx.stroke();
	window.requestAnimationFrame(paint);
}
window.requestAnimationFrame(paint);
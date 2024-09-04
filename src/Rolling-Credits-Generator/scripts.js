function record(canvas, time, frameRate = 30) {
	return new Promise(function(res, rej) {
		const mediaRecorder = new MediaRecorder(canvas.captureStream(frameRate), { mimeType: "video/webm; codecs=vp9" }),
			recordedChunks = [];
		mediaRecorder.ondataavailable = function(e) {
			recordedChunks.push(e.data);
			if (mediaRecorder.state === "recording") {
				mediaRecorder.stop();
			}
		}
		mediaRecorder.onstop = function() {
			res(URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" })));
		}
		mediaRecorder.start(time);
	});
}

const credits = document.getElementById("credits"),
	input = document.getElementById("input"),
	seconds = document.getElementById("seconds"),
	secondsDisplay = document.getElementById("seconds-display"),
	progressDiv = document.getElementById("progress-div"),
	progress = document.getElementById("progress"),
	progressDisplay = document.getElementById("progress-display");

const credit_elements = [];

document.getElementById("add-title").addEventListener("click", function() {
	if (input.value.trim() === "") return;
	const title = document.createElement("div");
	title.type = "title";
	title.content = input.value;
	const text = document.createElement("h3");
	text.textContent = input.value;
	const del = document.createElement("button");
	del.textContent = "Delete";
	del.addEventListener("click", function() {
		credits.removeChild(credit_elements.splice(credit_elements.indexOf(title), 1)[0]);
	});
	text.appendChild(del);
	title.appendChild(text);
	credit_elements.push(title);
	credits.appendChild(title);
});
document.getElementById("add-credit").addEventListener("click", function() {
	if (input.value.trim() === "") return;
	const name = document.createElement("div");
	name.type = "credit";
	name.content = input.value;
	const text = document.createElement("p");
	text.textContent = input.value;
	const del = document.createElement("button");
	del.textContent = "Delete";
	del.addEventListener("click", function() {
		credits.removeChild(credit_elements.splice(credit_elements.indexOf(name), 1)[0]);
	});
	text.appendChild(del);
	name.appendChild(text);
	credit_elements.push(name);
	credits.appendChild(name);
});
seconds.addEventListener("input", function() {
	secondsDisplay.textContent = seconds.value + " secs";
});
document.getElementById("generate").addEventListener("click", async function() {
	progressDiv.hidden = false;
	progress.value = 0;
	progressDisplay.textContent = "0%";
	const canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d");
	canvas.width = 1920;
	canvas.height = 1080;
	ctx.textAlign = "center";
	ctx.font = "Apple Chancery 20px";
	const elements = credit_elements.map((element) => [element.type, element.content]),
		startTime = Date.now(),
		speed = 2.5;
	let previousFrame = 0, offset = canvas.width, spacing;
	function drawFrame() {
		const _date = Date.now();
		if (_date - previousFrame >= 15) {
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#ffffff";
			spacing = -100;
			for (let i = 0; i < elements.length; i++) {
				if (elements[i][0] === "title") {
					spacing += 100;
					ctx.font = "48px Apple Chancery";
				} else {
					spacing += 30;
					ctx.font = "28px Apple Chancery";
				}
				ctx.fillText(elements[i][1], canvas.width / 2, spacing + offset);
			}
			offset -= speed;
			progress.value = ~~((_date - startTime) / (seconds.value * 10));
			progressDisplay.textContent = ~~((_date - startTime) / (seconds.value * 10)) + "%";
			previousFrame = _date;
		}
		if (_date - startTime >= seconds.value * 1000) {
			progressDiv.hidden = true;
		} else {
			window.requestAnimationFrame(drawFrame);
		}
	}
	window.requestAnimationFrame(drawFrame);
	record(canvas, seconds.value * 1000).then((res) => {
		const a = document.createElement("a");
		a.download = "Rolling Credits";
		a.href = res;
		const download = document.createElement("button");
		download.textContent = "Download";
		download.addEventListener("click", function() {
			document.getElementsByTagName("body")[0].removeChild(a);
		});
		a.appendChild(download);
		document.getElementsByTagName("body")[0].appendChild(a);
	});
});
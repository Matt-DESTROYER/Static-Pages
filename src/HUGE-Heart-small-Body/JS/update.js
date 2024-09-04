// Copyright Matthew James, 2021
function Update() {
	if (scene === "windy stretch") {
		// hint #1: run
		// eval(String.fromCharCode(99,111,110,115,111,108,101,46,108,111,103,40,34,80,105,99,107,32,117,112,32,114,117,98,98,105,115,104,32,97,116,32,87,105,110,100,121,32,83,116,114,101,116,99,104,58,32,121,111,117,32,99,97,110,32,112,114,101,115,115,32,97,110,100,32,104,111,108,100,32,116,104,101,32,115,112,97,99,101,32,98,97,114,32,111,114,32,97,32,109,111,117,115,101,32,98,117,116,116,111,110,46,46,46,34,41,59));
		// in your browser console to see the hint
		if (text === "") {
			if (timer === false) {
				timer = true;
				startTime = Date.now();
			} else if (currentTime() >= 60000) {
				timer = false;
				endTime = Date.now();
				if (scenes[0].gameObjects.length === 4) {
					text = "Good work!\nYou cleaned up all the rubbish in under 60 seconds!\n(Press any key to continue)";
					tasks[0] = true;
				} else if (scenes[0].gameObjects.length <= 14) {
					scenes[0].started = false;
					text = "So close!\nYou almost got all the rubbish cleaned up. I'm sure you'll nail this task next time!\n(Press any key to continue)";
				} else {
					scenes[0].started = false;
					text = "Bad luck.\nYou didn't manage to clean up all the rubbish in time, but you can always try again!\n(Press any key to continue)";
				}
				scene = "map";
			} else if (scenes[0].gameObjects.length === 4) {
				timer = false;
				endTime = Date.now();
				text = "Good work!\nYou cleaned up all the rubbish in under 60 seconds!\n(Press any key to continue)";
				tasks[0] = true;
				scene = "map";
			}
			if (scenes[0].started === false) {
				repeat(function () {
					scenes[0].gameObjects.push(Rubbish(Math.floor(Math.random() * (clamp(canvas.width, 400, 700) - 50)) - clamp(canvas.width, 400, 700) / 2 + 25, clamp(Math.floor(Math.random() * clamp(canvas.height, 300, 350)) - clamp(canvas.height, 300, 350) / 2, -canvas.height / 2 + 120 + Math.floor(Math.random() * 50), clamp(canvas.height / 2, 300, 350)), Math.ceil(Math.random() * 3)));
				}, 15);
				scenes[0].start();
			}
			scenes[0].update();
		}
	} else if (scene === "palm tree clearing") {
		// hint #4: run
		// eval(String.fromCharCode(99,111,110,115,111,108,101,46,108,111,103,40,34,80,108,97,110,116,32,116,114,101,101,115,32,97,116,32,80,97,108,109,32,84,114,101,101,32,67,108,101,97,114,105,110,103,58,32,114,101,102,101,114,32,116,111,32,104,105,110,116,32,35,49,32,120,68,34,41,59));
		// in your browser console to see the hint
		if (!scenes[1].started) {
			scenes[1].gameObjects.push(DirtMound(-45, -30), DirtMound(-115, 40), DirtMound(18, 30), DirtMound(62, 70), DirtMound(-20, 90));
			scenes[1].start();
		}
		scenes[1].update();
		let _allMoundsHaveSeeds = true;
		for (let i = 0; i < scenes[1].gameObjects.length; i++) {
			if (scenes[1].gameObjects[i].name === "dirt mound" && scenes[1].gameObjects[i].stage !== 2) {
				_allMoundsHaveSeeds = false;
				break;
			}
		}
		if (_allMoundsHaveSeeds) {
			scene = "map";
			tasks[1] = true;
			text = "Good work!\nYou planted and watered five palm trees, soon the Palm Tree Clearing will be a grove once more!\n(Press any key to continue)";
		}
	} else if (scene === "cozy cabin") {
		if (!scenes[2].started) {
			scenes[2].start();
		}
		scenes[2].update();
		// hint #3: run
		// eval(String.fromCharCode(99,111,110,115,111,108,101,46,108,111,103,40,34,84,117,114,110,32,111,102,102,32,116,104,101,32,108,105,103,104,116,115,32,105,110,32,67,111,122,121,32,67,97,98,105,110,58,32,49,44,32,50,44,32,51,46,46,46,34,41,59));
		// in your browser console to see the hint
		if (scenes[2].gameObjects[0].on === false &&
			scenes[2].gameObjects[1].on === false &&
			scenes[2].gameObjects[2].on === false &&
			scenes[2].gameObjects[3].on === false) {
			scenes[2].started = false;
			text = "Good work!\nYou managed to turn off all the lights!\n(Press any key to continue)";
			tasks[2] = true;
			scene = "map";
		}
	}
}
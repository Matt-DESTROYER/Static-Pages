// Copyright Matthew James, 2021
document.addEventListener("keydown", function (e) {
	e = e || window.event;
	Input[e.keyCode] = true;
	Input[e.key.toString().toUpperCase()] = true;
	Input.keyCode = e.keyCode;
	Input.key = e.key.toString();
	if (text.indexOf("(Press any key to continue)") > -1) {
		text = "";
		if (scene === "final message") {
			scene = "message from the developer";
			text = "\"Playing this game, I hope you've learned some valuable lessons. You now know some simple ways to help make our planet greener. You can pickup rubbish, turn off lights that aren't being used, and plant trees. These may seem like small, inconsequencial, actions, but they really do add up. Your small actions have a HUGE impact on what our tomorrow will look like. This is a message told by many people, environmentalists, scientists, even Pope Francis, and now we turn to you. Will you join the fight to keep our planet clean?\"\n\nMatthew James, 2021";
		} else if (tasks.filter(x => !x).length === 0) {
			scene = "final message";
			text = "Thanks for all your help! Because of you Enviro-land is greener than ever! This time we will limit the number of people who can vist the island at a time to ensure the island stays as beautiful as you're leaving it. Bye for now, I hope I'll see you again soon!\n(Press any key to continue)";
		}
	}
});
document.addEventListener("keyup", function (e) {
	e = e || window.event;
	Input[e.keyCode] = false;
	Input[e.key.toString().toUpperCase()] = false;
});
document.addEventListener("keypress", function () {
	if (scene === "title") {
		scene = "menu";
	}
});
document.addEventListener("mousedown", function (e) {
	e = e || window.event;
	Input.buttons = e.buttons;
	Input.button = e.button;
	Input.mouseDown = true;
});
document.addEventListener("mouseup", function (e) {
	e = e || window.event;
	Input.buttons = e.buttons;
	Input.button = e.button;
	Input.mouseDown = false;
});
document.addEventListener("click", function () {
	if (scene === "title") {
		scene = "menu";
	} else if (scene === "menu") {
		if (Input.mouseX > Math.floor(canvas.width / 2) - 47 &&
			Input.mouseX < Math.floor(canvas.width / 2) + 47 &&
			Input.mouseY > 93 + sineWave(5, 8) &&
			Input.mouseY < 147 + sineWave(5, 8)) {
			scene = "map";
			text = "Hello fellow environmentalist, welcome to Enviro-land. You're the first person on the green team to visit this island in many years! Why? You're probably wondering. Well, it's a HUGE story. It starts a few years ago...\nThe island was beautiful. We environmentalists kept the place cleaner than it had ever been before. The island was a place to recconect with the earth and experience nature's beauty. Then the word got out. Soon tourists came from all over the globe to visit Enviro-land. We were heavily outnumbered... We never stood a chance... The tourists destroyed our work with their litter and wasteful ways. The island hasn't been the same since... But that's all going to change, because now you're here! Thank you for volunteering to help us clean up Enviro-land! It's a HUGE job, and you're only one small person, but I think you can handle it. Let's get started! Here is a map of the island showing the locations of clean up tasks.\n(Press any key to continue)";
		} else if (Input.mouseX > Math.floor(canvas.width / 2) - 75 &&
			Input.mouseX < Math.floor(canvas.width / 2) + 75 &&
			Input.mouseY > 163 + sineWave(5, 8) &&
			Input.mouseY < 217 + sineWave(5, 8)) {
			scene = "credits";
		}
	} else if (scene === "credits") {
		if (Input.mouseX > Math.floor(canvas.width / 2) - 54 &&
			Input.mouseX < Math.floor(canvas.width / 2) + 50 &&
			Input.mouseY > canvas.height - 55 + sineWave(5, 8) &&
			Input.mouseY < canvas.height + sineWave(5, 8)) {
			scene = "menu";
		}
	} else if (scene === "map" && text === "") {
		if (!tasks[0] &&
			Input.mouseX > 145 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
			Input.mouseX < 355 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
			Input.mouseY > 236 * canvas.height / 400 + 5 &&
			Input.mouseY < 256 * canvas.height / 400 + 5) {
			scene = "windy stretch";
			text = "Pick up plastic at Windy Stretch\nThank goodness you got here, windy stretch is a mess! We need you to pick up all the rubbish and put it in the correct bin. Remember: green is for food scraps/grown items like bananas, yellow is for recyclables like platic bottles, and red is for rubbish like straws.\n\nGOAL: Pick up all the waste and put it in the correct bin in under a minute!\n\nUse the arrow keys and/or W, A, S, and D to move, press space or click to interact. You can only carry one item at a time.\n(Press any key to continue)";
			currentScene = 0;
		} else if (!tasks[1] &&
			Input.mouseX > 200 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
			Input.mouseX < 413 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
			Input.mouseY > 25 * canvas.height / 400 + 5 &&
			Input.mouseY < 45 * canvas.height / 400 + 5) {
			scene = "palm tree clearing";
			text = "Plant trees at Palm Tree Clearing\nThank goodness you got here! What was once Palm Tree Grove, has become Palm Tree Clearing. There aren't enough palm trees here. Can you help plant and water 5 palm trees?\n\nGOAL: Plant and water 5 palm trees.\n\nUse the arrow keys and/or W, A, S, and D to move, press space or click to interact. Go to the bag of seeds (and interact with it) to pick up a seed (you can only carry one seed at a time.), then take them to the mounds of dirt (and interact with them) to plant. Once you've planted five seeds you will see a watering can which you can use to water them (by interacting with the planted seeds).\n(Press any key to continue)";
			currentScene = 1;
		} else if (!tasks[2] &&
			Input.mouseX > 320 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
			Input.mouseX < 527 * canvas.height / 400 + (canvas.width - canvas.height) / 2 - 50 &&
			Input.mouseY > 145 * canvas.height / 400 + 5 &&
			Input.mouseY < 165 * canvas.height / 400 + 5) {
			scene = "cozy cabin";
			text = "Turn off the lights at Cozy Cabin\nThank goodness you made it here! All the lights are on in cozy cabin but no one is using them. It's wasting lots of electricity. Something is wrong with the switches though, flicking one can also affect another, can you find the right order to turn them off?\n\nGOAL: Turn off all the lights.\n\nClick the switch on a light to flick it.\n(Press any key to continue)";
			currentScene = 2;
		}
	} else if (scene === "cozy cabin" && text === "") {
		if (Input.mouseX > 3 * (-canvas.width / 8) - 25 + canvas.width / 2 &&
			Input.mouseX < 3 * (-canvas.width / 8) + 25 + canvas.width / 2 &&
			Input.mouseY > -50 + canvas.height / 2 &&
			Input.mouseY < 50 + canvas.height / 2) {
			scenes[2].gameObjects[0].on = !scenes[2].gameObjects[0].on;
			scenes[2].gameObjects[1].on = !scenes[2].gameObjects[1].on;
		} else if (Input.mouseX > -canvas.width / 8 - 25 + canvas.width / 2 &&
			Input.mouseX < -canvas.width / 8 + 25 + canvas.width / 2 &&
			Input.mouseY > -50 + canvas.height / 2 &&
			Input.mouseY < 50 + canvas.height / 2) {
			scenes[2].gameObjects[1].on = !scenes[2].gameObjects[1].on;
			scenes[2].gameObjects[3].on = !scenes[2].gameObjects[3].on;
		} else if (Input.mouseX > canvas.width / 8 - 25 + canvas.width / 2 &&
			Input.mouseX < canvas.width / 8 + 25 + canvas.width / 2 &&
			Input.mouseY > -50 + canvas.height / 2 &&
			Input.mouseY < 50 + canvas.height / 2) {
			scenes[2].gameObjects[2].on = !scenes[2].gameObjects[2].on;
			scenes[2].gameObjects[1].on = !scenes[2].gameObjects[1].on;
		} else if (Input.mouseX > 3 * (canvas.width / 8) - 25 + canvas.width / 2 &&
			Input.mouseX < 3 * (canvas.width / 8) + 25 + canvas.width / 2 &&
			Input.mouseY > -50 + canvas.height / 2 &&
			Input.mouseY < 50 + canvas.height / 2) {
			scenes[2].gameObjects[3].on = !scenes[2].gameObjects[3].on;
			scenes[2].gameObjects[1].on = !scenes[2].gameObjects[1].on;
		}
	}
});
document.addEventListener("mousemove", function (e) {
	e = e || window.event;
	let rect = canvas.getBoundingClientRect();
	Input.pmouseX = Input.mouseX;
	Input.pmouseY = Input.mouseY;
	Input.mouseX = e.clientX - rect.left;
	Input.mouseY = e.clientY - rect.top;
});
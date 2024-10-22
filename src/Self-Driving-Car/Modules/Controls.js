class Controls {
	constructor() {
		this.forward = false;
		this.left = false;
		this.right = false;
		this.reverse = false;

		this.#addKeyboardListeners();
	}

	#addKeyboardListeners() {
		window.addEventListener("keydown", function(event) {
			switch (event.code) {
				case "KeyW":
				case "ArrowUp":
					this.forward = true;
					break;
				case "KeyA":
				case "ArrowLeft":
					this.left = true;
					break;
				case "KeyD":
				case "ArrowRight":
					this.right = true;
					break;
				case "KeyS":
				case "ArrowDown":
					this.reverse = true;
					break;
			}
			console.table(this);
		});
		window.addEventListener("keyup", function(event) {
			switch (event.code) {
				case "KeyW":
				case "ArrowUp":
					this.forward = false;
					break;
				case "KeyA":
				case "ArrowLeft":
					this.left = false;
					break;
				case "KeyD":
				case "ArrowRight":
					this.right = false;
					break;
				case "KeyS":
				case "ArrowDown":
					this.reverse = false;
					break;
			}
			console.table(this);
		});
	}
}

export { Controls as default };

import Controls from "./Controls.js";

class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.acceleration = 5;
		this.maxSpeed = 135;
		this.friction = 0.85;
		this.rotation = 0;

		this.controls = new Controls();
	}
	#move(deltaTime) {
		if (this.controls.forward) {
			this.speed += this.acceleration * deltaTime;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration * deltaTime;
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		} else if (this.speed < -this.maxSpeed) {
			this.speed = -this.maxSpeed;
		}

		if (this.speed > 0) {
			this.speed -= this.friction * deltaTime;
		} else if (this.speed < 0) {
			this.speed += this.friction * deltaTime;
		}

		if (Math.abs(this.speed) < this.friction * deltaTime) {
			this.speed = 0;
		}

		if (this.speed !== 0) {
			const flip = Math.sign(this.speed);

			if (this.controls.left) {
				this.rotation += 0.04 * flip * deltaTime;
			}
			if (this.controls.right) {
				this.rotation -= 0.04 * flip * deltaTime;
			}
		}

		this.x -= this.speed * Math.sin(this.rotation) * deltaTime;
		this.y -= this.speed * Math.cos(this.rotation) * deltaTime;
	}
	update(deltaTime) {
		this.#move(deltaTime);
	}
	render(ctx) {
		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.rotate(-this.rotation);

		ctx.beginPath();
		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
		ctx.closePath();

		ctx.restore();
	}
}

export { Car as default };

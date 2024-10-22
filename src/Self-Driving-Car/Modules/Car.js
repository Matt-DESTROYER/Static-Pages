import Controls from "./Controls.js";

class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.acceleration = 0.2;
		this.maxSpeed = 3;
		this.friction = 0.05;
		this.rotation = 0;

		this.controls = new Controls();
	}
	#move() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		} else if (this.speed < -this.maxSpeed) {
			this.speed = -this.maxSpeed;
		}

		if (this.speed > 0) {
			this.speed -= this.friction;
		} else if (this.speed < 0) {
			this.speed += this.friction;
		}

		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		if (this.speed !== 0) {
			const flip = Math.sign(this.speed);

			if (this.controls.left) {
				this.rotation += 0.03 * flip;
			}
			if (this.controls.right) {
				this.rotation -= 0.03 * flip;
			}
		}

		this.x -= this.speed * Math.sin(this.rotation);
		this.y -= this.speed * Math.cos(this.rotation);
	}
	update(deltaTime) {
		this.#move();
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
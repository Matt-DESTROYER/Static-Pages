import { lerp } from "../utils.js";

class Road {
	constructor(x, width, laneCount) {
		this.x = x;
		this.width = width;
		this.laneCount = laneCount;

		this.left = x - width / 2;
		this.right = x + width / 2;

		const infinity = 1_000_000;
		this.top = -infinity;
		this.bottom = infinity;
	}
	getLaneCenter(laneIndex) {
		const laneWidth = this.width / this.laneCount;
		return this.left + laneWidth / 2 + laneIndex * laneWidth;
	}
	render(ctx) {
		ctx.lineWidth = 5;
		ctx.strokeStyle = "white";

		for (let i = 0; i <= this.laneCount; i++) {
			const x = lerp(this.left, this.right, i / this.laneCount);

			if (i > 0 && i < this.laneCount) {
				ctx.setLineDash([20, 40]);
			} else {
				ctx.setLineDash([]);
			}

			ctx.beginPath();
			ctx.moveTo(x, this.top);
			ctx.lineTo(x, this.bottom);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

export { Road as default };

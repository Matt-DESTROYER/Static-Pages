if (!("lerp" in Math)) {
	Math.lerp = function (a, b, t) {
		return a + (b - a) * t;
	};
}

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
	render(ctx) {
		ctx.lineWidth = 5;
		ctx.strokeStyle = "white";

		for (let i = 0; i <= this.laneCount; i++) {
			const x = Math.lerp(this.left, this.right, i / this.laneCount);

			ctx.beginPath();
			ctx.moveTo(x, this.top);
			ctx.lineTo(x, this.bottom);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

export { Road as default };

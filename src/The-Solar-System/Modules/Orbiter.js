const Orbiter = class {
	constructor(dist, radius, image, parent, rotSpeed = 1, visualRotSpeed = 1, name = null, arc = true) {
		this.x = null;
		this.y = null;
		this.radius = radius;
		this.image = image;
		this.parent = parent;
		this.rotSpeed = rotSpeed;
		this.rot = 0;
		this.visualRot = 0;
		this.visualRotSpeed = visualRotSpeed;
		this.arc = arc;
		this.name = name;
		this.dist = dist;
	}
	update(deltaTime = 16.6) {
		const rot = deltaTime / 33.2;
		this.rot += rot * this.rotSpeed;
		this.visualRot += rot * this.visualRotSpeed;
		this.rot %= 360;
		this.visualRot %= 360;
		const rad = this.rot * Math.PI / 180;
		this.x = this.parent.x + this.dist * Math.sin(rad);
		this.y = this.parent.y + this.dist * Math.cos(rad);
	}
	renderArc(ctx, cam) {
		if (this.arc) {
			ctx.setTransform(1, 0, 0, 1, cam.x, cam.y);
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2 * cam.zoom;
			ctx.beginPath();
			ctx.arc(this.parent.x * cam.zoom, this.parent.y * cam.zoom, this.dist * cam.zoom, 0, Math.TWO_PI);
			ctx.closePath();
			ctx.stroke();
		}
	}
	render(ctx, cam) {
		if (this.image.isLoaded) {
			const rad = this.visualRot * Math.PI / 180;
			ctx.setTransform(1, 0, 0, 1, this.x * cam.zoom + cam.x, this.y * cam.zoom + cam.y);
			ctx.rotate(-rad);
			ctx.drawImage(this.image, -(this.radius / 2) * cam.zoom, -(this.radius / 2) * cam.zoom, this.radius * cam.zoom, this.radius * cam.zoom);
		}
	}
	renderUI(ctx, cam, Mouse) {
		if (this.name && (cam.tracking === this || Math.sqrt(Math.pow(Mouse.x - cam.x - this.x * cam.zoom, 2) + Math.pow(Mouse.y - cam.y - this.y * cam.zoom, 2)) <= (this.radius / 2) * cam.zoom)) {
			const arcRad = (this.radius / 2) * cam.zoom + (this.radius / 15) * cam.zoom;
			ctx.setTransform(1, 0, 0, 1, cam.x, cam.y);
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = cam.zoom;
			ctx.beginPath();
			ctx.arc(this.x * cam.zoom, this.y * cam.zoom, arcRad, 0, Math.TWO_PI);
			ctx.moveTo(this.x * cam.zoom + arcRad * 0.7071067811865475, this.y * cam.zoom - arcRad * 0.7071067811865475);
			ctx.lineTo(this.x * cam.zoom + arcRad * 0.35355339059327384 + 50 * cam.zoom, this.y * cam.zoom - arcRad * 0.35355339059327384 - 50 * cam.zoom);
			ctx.closePath();
			ctx.stroke();
			ctx.fillStyle = "#fff";
			ctx.font = 12 * cam.zoom + "px Trebuchet MS";
			ctx.fillText(this.name, this.x * cam.zoom + arcRad * 0.35355339059327384 + 45 * cam.zoom, this.y * cam.zoom - arcRad * 0.35355339059327384 - 55 * cam.zoom);
		}
	}
};

export default Orbiter;
if (!("lerp" in Math)) {
	Math.lerp = function (a, b, t) {
		return a + (b - a) * t;
	};
}

const lerp = Math.lerp;

const utils = Object.freeze({
	"lerp": lerp
});

export { utils as default, lerp };

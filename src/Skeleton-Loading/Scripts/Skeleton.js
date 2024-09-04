const Skeleton = (function() {
	return {
		"skeleton": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton");
			}
		},
		"card": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton-card");
			}
		},
		"title": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton-title");
			}
		},
		"logo": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton-logo");
			}
		},
		"details": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton-details");
			}
		},
		"cover": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton-cover");
			}
		},
		"footer": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add("skeleton-footer");
			}
		},
		"remove": function(...elements) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.remove("skeleton", "skeleton-title", "skeleton-card", "skeleton-logo", "skeleton-details", "skeleton-cover", "skeleton-footer");
			}
		}
	};
})();
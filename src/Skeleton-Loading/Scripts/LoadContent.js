// a function to asynchronously load an image (using a Promise)
const img = function(src) {
	return new Promise(function(res, rej) {
		const image = new Image();
		function load() {
			image.removeEventListener("load", load);
			image.removeEventListener("error", error);
			res(image);
		}
		function error() {
			image.removeEventListener("load", load);
			image.removeEventListener("error", error);
			rej(image);
		}
		image.addEventListener("load", load);
		image.addEventListener("error", error);
		image.src = src;
	});
};

// get the content to be loaded
fetch("./Data/content.json")
	.then(function(res) {
		// convert it to json
		return res.json();
	})
	.then(function(res) {
		// load actual content in place of skeleton content
		// get the element containing the title
		const title = document.querySelector("h1");
		// add the actual content to it
		title.textContent = res.title;
		// remove the skeleton CSS from it
		Skeleton.remove(title);
		// get all the cards as an array
		const cards = Array.from(document.getElementById("cards").children);
		// loop through each card
		for (let i = 0; i < cards.length; i++) {
			// get all the skeleton elements as an array
			const elems = Array.from(cards[i].children);
			// load the logo image
			img(res.cards[i].logo).then(function(res) {
				// add the 'icon' class
				res.classList.add("icon");
				// replace the skeleton logo with the actual logo
				cards[i].replaceChild(res, elems[0]);
			});
			// add the actual content to the title
			elems[1].textContent = res.cards[i].title;
			// add the actual content to the details
			elems[2].textContent = res.cards[i].details;
			// load the cover image
			img(res.cards[i].cover).then(function(res) {
				// add the 'cover' class
				res.classList.add("cover");
				// replace the skeleton cover with the actual cover
				cards[i].replaceChild(res, elems[3]);
			});
			// add the actual content to the footer
			elems[4].textContent = res.cards[i].footer;
			// remove the skeleton CSS from these elements (don't remove it from the images because these will take longer to load)
			Skeleton.remove(cards[i], elems[1], elems[2], elems[4]);
			// add the  'card' class
			cards[i].classList.add("card");
		}
	});
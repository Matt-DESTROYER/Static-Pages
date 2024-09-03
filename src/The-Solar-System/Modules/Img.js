const img = function(url) {
	const image = new Image();
	image.isLoaded = false;
	image.addEventListener("load", function() {
		image.isLoaded = true;
	});
	image.src = url;
	return image;
};

export default img;
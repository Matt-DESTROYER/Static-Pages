const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const digit = "0123456789";
const symbols = "$&@?!#";

// Cryptographically secure random function
crypto.random = function random(count, min, max) {
	const numbers = Array.from(
		crypto.getRandomValues(
			new Uint32Array(count)
		)
	)
		.map((n) =>
			// normalize
			(n / (0xffffffff + 1))
			// make between min and max
			* (max - min) + min);
	if (count === 1) {
		return numbers[0];
	}
	return numbers;
};

// helper function to copy text to clipboard
function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.catch(function(err) {
			console.warn("Error: Copy to clipboard failed...", err);
		});
}

// helper function to clamp a value between two bounds
function clamp(value, min, max) {
	if (value < min) {
		return min;
	} else if (value > max) {
		return max;
	}
	return value;
}

window.addEventListener("load", function() {
	const [ inUpper, inLower, inDigit, inSymbols, inChars, inLength ] = Array.from(document.querySelectorAll("input"));
	const output = document.getElementById("output");

	inLength
		.addEventListener("change", function() {
			const new_val = clamp(parseInt(inLength.value), 1, 16384);
			inLength.value = new_val.toString();
		});

	document.getElementById("generate")
		.addEventListener("click", function() {
			let possible_chars = "";

			if (inUpper.checked) possible_chars += upper;
			if (inLower.checked) possible_chars += lower;
			if (inDigit.checked) possible_chars += digit;
			if (inSymbols.checked) possible_chars += symbols;

			possible_chars += inChars.value;

			const chars = crypto.random(inLength.value, 0, possible_chars.length - 1);
			output.textContent = chars.map((n) => possible_chars[Math.round(n)]).join("");
		});

	output
		.addEventListener("click", () => copyToClipboard(output.textContent));

	document.getElementById("copy")
		.addEventListener("click", () => copyToClipboard(output.textContent));
});
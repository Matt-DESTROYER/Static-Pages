const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const digit = "0123456789";
const symbols = "$&@?!#";

// Cryptographically secure random function
function random(count, min, max) {
	const numbers = Array.from(window.crypto.getRandomValues(new Uint32Array(count < 10 ? 10 : count))).map((n) => (n / 4294967295) * (max - min) + min);
	if (count === 1) {
		return numbers[0];
	} else if (count < 10) {
		return numbers.slice(0, count);
	}
	return numbers;
}

function copyToClipboard(text) {
	if ("clipboard" in navigator) {
		navigator.clipboard.writeText(text).catch(function(err) {
			console.error("Error: Copy to clipboard failed...");
		});
	} else {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();
		try {
			document.execCommand("copy");
		} catch (err) {
			console.error("Error: Copy to clipboard failed...");
		}
		document.body.removeChild(textarea);
	}
}

window.addEventListener("load", function() {
	const [inUpper, inLower, inDigit, inSymbols, inChars, inLength] = Array.from(document.querySelectorAll("input"));
	const output = document.getElementById("output");

	inLength.addEventListener("change", function() {
		if (+inLength.value < 1) {
			inLength.value = "1";
		} else if (+inLength.value > 16384) {
			inLength.value = "16384";
		}
	});

	document.getElementById("generate").addEventListener("click", function() {
		let possible_chars = "";
		if (inUpper.checked) {
			possible_chars += upper;
		}
		if (inLower.checked) {
			possible_chars += lower;
		}
		if (inDigit.checked) {
			possible_chars += digit;
		}
		if (inSymbols.checked) {
			possible_chars += symbols;
		}
		possible_chars += inChars.value;
		const chars = random(inLength.value, 0, possible_chars.length - 1);
		output.textContent = chars.map((n) => possible_chars[Math.round(n)]).join("");
	});

	output.addEventListener("click", function() {
		copyToClipboard(output.textContent);
	});

	document.getElementById("copy").addEventListener("click", function() {
		copyToClipboard(output.textContent);
	});
});
// Copyright Matthew James, 2021
let o=Date.now();function loop(){Date.now()-o>15&&(Update(),o=Date.now()),Render(),window.requestAnimationFrame(loop)}window.requestAnimationFrame(loop)
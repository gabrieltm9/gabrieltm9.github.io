document.addEventListener("DOMContentLoaded", function() {
// Clone the logos in the skills section for infinite scrolling
const tracks = document.querySelectorAll('.skills-track');
tracks.forEach(track => {
    const logos = Array.from(track.children);
    logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
    });
    track.style.width = `${logos.length * 250 * 2}px`; // Adjust the width based on the number of logos
});
});
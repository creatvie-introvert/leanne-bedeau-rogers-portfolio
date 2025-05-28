// ====================
// Mobile Navigation Toggle
// ====================

// Select the hamburger button and navigation menu
let hamburgerBtn = document.querySelector('.hamburger');
let navMenu = document.querySelector('.nav-bar');

// Listen for a click on the button
hamburgerBtn.addEventListener("click", toggleNav);

// Function to hid/show the nav bar
function toggleNav () {
    navMenu.classList.toggle('open');

    // Update aria-expanded attribute
    const expanded = hamburgerBtn.getAttribute('aria-exanded') === true;
    hamburgerBtn.setAttribute('aria-expanded', !expanded);
}
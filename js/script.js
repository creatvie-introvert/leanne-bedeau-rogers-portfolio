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


// Toggle function to show/hide project action buttons
function toggleProjectButtons(event) {
  const card = event.currentTarget;
  const btns = card.querySelector('.hover-btns-container');
  if (window.innerWidth <= 960 && btns) {
    btns.classList.toggle('show-btns');
  }
}

// Attach event listeners to all project cards
function initProjectCardToggles() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('click', toggleProjectButtons);
  });
}

// Run the toggle setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initProjectCardToggles);
// ====================
// 1. Mobile Navigation Toggle
// ====================

function initNavToggle() {
  const hamburgerBtn = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-bar');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle('open');

    // Update aria-expanded attribute
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === "true";
    hamburgerBtn.setAttribute('aria-expanded', !expanded);
  });
}


// ====================
// 2. Project Card Toggles (mobile behaviour)
// ====================

function initProjectCardToggles() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('click', (event) => {
      const btns = card.querySelector('.hover-btns-container');
      if (window.innerWidth <= 960 && btns) {
        const isActive = card.classList.toggle('card-border');
        btns.classList.toggle('show-btns', isActive);
      }
    });
  });

  // Close active card when clicking outside
  document.addEventListener('click', (e) => {
    const activeCard = document.querySelector('.project-card.card-border');
    if (activeCard && !activeCard.contains(e.target)) {
      activeCard.classList.remove('card-border');
      const btns = activeCard.querySelector('.hover-btns-container');
      if (btns) btns.classList.remove('show-btns');
    }
  });
}


// ====================
// 3. Project Modals (dynamic)
// ====================

let projectsData = [];

function loadProjects() {
  return fetch('assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
      projectsData = data;
      initProjectModals();
    })
    .catch(err => console.error("Error loading projects.json:", err));
}

function initProjectModals() {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal.querySelector(".close-btn");

  if (!modal || !modalBody || !closeBtn) return;

  // Attach modal openers to each project button
  document.querySelectorAll(".card-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-id");
      const project = projectsData.find(p => p.id === projectId);

      if (project) {
        // Inject project details into modal
        modalBody.innerHTML = `
          <h2>${project.title}</h2>
          <p><strong>Category:</strong> ${project.category}</p>
          <p>${project.description}</p>
          <img src="${project.image}" alt="${project.title} screenshot">

          <h3>Technologies</h3>
          <div class="tech-tags">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>

          <h3>Highlights</h3>
          <ul>
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div class="modal-links">
            <a href="${project.liveDemo}" target="_blank" class="primary-cta">Live Demo</a>
            <a href="${project.sourceCode}" target="_blank" class="secondary-cta">Code</a>
          </div>
        `;
      }

      modal.style.display = "flex";
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


// ====================
// Initialise all scripts when DOM is ready
// ====================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initProjectCardToggles();
  loadProjects();
});
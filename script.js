/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT - ANAMIKA O (DATA ANALYST)
 * Clean, Modular, and Beginner-Friendly Code with Explanatory Comments
 * ==============================================================================
 */

// Execute all DOM-dependent scripts once HTML is completely loaded
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
   * 1. Dynamic Typewriter Effect for Hero Section
   *    Rotates through multiple professional titles smoothly.
   * -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'DATA ANALYST',
    'SQL & PYTHON SPECIALIST',
    'BUSINESS INTELLIGENCE DEVELOPER',
    'POWER BI DASHBOARD DESIGNER'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;    // Speed for typing each character (ms)
  const deletingSpeed = 50;   // Speed when erasing characters (ms)
  const pauseBetweenRoles = 2000; // Pause at full word before deleting (ms)

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Remove characters
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add characters
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine state transition
    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing current role; pause before erasing
      isDeleting = true;
      setTimeout(typeEffect, pauseBetweenRoles);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Finished erasing; move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }

    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, currentSpeed);
  }

  // Start the typewriter loop
  typeEffect();


  /* --------------------------------------------------------------------------
   * 2. Navbar Styling on Scroll
   *    Shrinks navbar and darkens background once user scrolls down.
   * -------------------------------------------------------------------------- */
  const navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial check


  /* --------------------------------------------------------------------------
   * 3. Mobile Navigation Auto-Collapse
   *    Closes the hamburger menu when user clicks any navigation link.
   * -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, #nav-cta-btn');
  const navbarCollapse = document.getElementById('navbarContent');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Use Bootstrap's Collapse API to close
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });


  /* --------------------------------------------------------------------------
   * 4. Floating Back to Top Button
   *    Displays the button after scrolling 300px; scrolls smoothly to top on click.
   * -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('btnBackToTop');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', handleBackToTopVisibility);
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* --------------------------------------------------------------------------
   * 5. Interactive Project Preview Modal
   *    Opens modal when 'Live Demo' is clicked, showing details cleanly.
   * -------------------------------------------------------------------------- */
  const demoButtons = document.querySelectorAll('.demo-modal-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalInfo = document.getElementById('modal-project-info');
  const projectModalElement = document.getElementById('projectDemoModal');

  demoButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const projectName = e.currentTarget.getAttribute('data-project') || 'Project Preview';
      if (modalTitle) modalTitle.textContent = projectName;
      if (modalInfo) {
        modalInfo.textContent = `You clicked the preview for "${projectName}". This application demonstrates responsive frontend layouts, API integrations, and data modeling tailored for portfolio review.`;
      }

      if (projectModalElement) {
        const bsModal = new bootstrap.Modal(projectModalElement);
        bsModal.show();
      }
    });
  });


  /* --------------------------------------------------------------------------
   * 6. Contact Form Client-Side Validation & Feedback
   *    Checks inputs, displays helpful validation feedback, and provides
   *    a friendly submission simulated state.
   * -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name (at least 2 characters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      // Validate Email (standard email regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      // Validate Subject (at least 3 characters)
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        subjectInput.classList.add('is-invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
        subjectInput.classList.add('is-valid');
      }

      // Validate Message (at least 10 characters)
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      }

      if (!isValid) {
        return;
      }

      // If valid: simulate sending state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.classList.add('d-none');
      if (btnSpinner) btnSpinner.classList.remove('d-none');

      // Simulate a network delay (e.g. 1.2 seconds)
      setTimeout(() => {
        // Reset button state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.classList.remove('d-none');
        if (btnSpinner) btnSpinner.classList.add('d-none');

        // Show friendly success alert
        const senderName = nameInput.value.trim();
        if (formAlert) {
          formAlert.className = 'alert alert-success d-flex align-items-center gap-2 mb-4';
          formAlert.innerHTML = `
            <i class="fa-solid fa-circle-check fs-4 text-success"></i>
            <div>
              <strong>Message Sent Successfully!</strong>
              <div class="small">Thank you, ${escapeHtml(senderName)}! Your message has been received. (Tip: In production, point this form action to Formspree or EmailJS to deliver emails to your actual inbox).</div>
            </div>
          `;
          formAlert.classList.remove('d-none');
        }

        // Reset the form fields and valid styling
        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
          input.classList.remove('is-valid');
        });

        // Auto-dismiss alert after 8 seconds
        setTimeout(() => {
          if (formAlert) formAlert.classList.add('d-none');
        }, 8000);

      }, 1200);
    });
  }

  // Helper utility to escape HTML against XSS in feedback text
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }


  /* --------------------------------------------------------------------------
   * 7. Auto-Update Copyright Year in Footer
   * -------------------------------------------------------------------------- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});

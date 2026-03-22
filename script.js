/* ========================================
   Anurag Parde Portfolio - JavaScript
   ======================================== */

// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');

// ========================================
// Navigation - Scroll Effect
// ========================================
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========================================
// Mobile Menu Toggle
// ========================================
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger icon
  const spans = menuToggle.querySelectorAll('span');
  spans.forEach((span, index) => {
    if (navLinks.classList.contains('active')) {
      if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) span.style.opacity = '0';
      if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      span.style.transform = 'none';
      span.style.opacity = '1';
    }
  });
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transform = 'none';
      span.style.opacity = '1';
    });
  });
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Contact Form Handling
// ========================================
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Validate form
  if (!name || !email || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    ${type === 'success' 
      ? 'background: rgba(34, 197, 94, 0.9); color: white;' 
      : 'background: rgba(239, 68, 68, 0.9); color: white;'}
  `;
  
  // Add animation styles if not already added
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// ========================================
// Intersection Observer - Animate on Scroll
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .cert-card, .highlight-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add animate-in styles
const animateStyle = document.createElement('style');
animateStyle.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(animateStyle);

// ========================================
// Active Navigation Link Highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Trigger animations for hero section immediately
  document.querySelector('.hero-content').style.opacity = '1';
  document.querySelector('.hero-content').style.transform = 'translateY(0)';
  
  console.log('Portfolio loaded successfully!');
});

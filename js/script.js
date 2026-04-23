// Mobile Navbar Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

// Dark Mode Toggle with Persistence
const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);

  if (themeToggle) {
    const themeIcon = themeToggle.querySelector(".theme-icon");
    themeToggle.classList.toggle("active", isDark);
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }
  }
};

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight Active Navbar Link by Current Page
const pageName = window.location.pathname.split("/").pop() || "index.html";
const pageMap = {
  "index.html": "index",
  "about.html": "about",
  "contact.html": "contact"
};

document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.dataset.page === pageMap[pageName]) {
    link.classList.add("active-link");
  }
});

// Contact Form Validation and Success Message
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue.length < 2) {
      nameError.textContent = "Please enter at least 2 characters for your name.";
      isValid = false;
    }

    if (!emailRegex.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (messageValue.length < 10) {
      messageError.textContent = "Message should be at least 10 characters long.";
      isValid = false;
    }

    if (isValid) {
      formSuccess.textContent = "Thanks! Your message was submitted successfully.";
      contactForm.reset();
    }
  });
}

// Scroll-to-top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 260) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Fade-in Reveal Animation on Scroll
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("revealed"));
}

// Hide Loader When Page Is Ready
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }
});
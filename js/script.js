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

// Welcome Popup with Time-based Greeting
const getTimeGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning 🌅";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon ☀️";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening 🌇";
  }

  return "Good Night 🌙";
};

const showWelcomePopup = () => {
  const getTodayKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTimeZoneLabel = () => {
    const now = new Date();
    const zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local Time";
    const offsetMinutes = -now.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absoluteMinutes = Math.abs(offsetMinutes);
    const offsetHours = String(Math.floor(absoluteMinutes / 60)).padStart(2, "0");
    const offsetRemainder = String(absoluteMinutes % 60).padStart(2, "0");
    return `${zoneName} (GMT${sign}${offsetHours}:${offsetRemainder})`;
  };

  const formatSystemDateTime = () => {
    const now = new Date();
    const datePart = now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const timePart = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    return `${datePart} • ${timePart} • ${getTimeZoneLabel()}`;
  };

  const activePopupDateKey = getTodayKey();
  const popupShownDateKey = localStorage.getItem("welcomePopupLastShownDate");

  if (popupShownDateKey === activePopupDateKey) {
    return;
  }

  localStorage.setItem("welcomePopupLastShownDate", activePopupDateKey);

  const previousActiveElement = document.activeElement;
  const popupOverlay = document.createElement("div");
  popupOverlay.className = "welcome-popup-overlay";
  popupOverlay.setAttribute("role", "dialog");
  popupOverlay.setAttribute("aria-modal", "true");
  popupOverlay.setAttribute("aria-labelledby", "welcomePopupTitle");

  popupOverlay.innerHTML = `
    <div class="welcome-popup-card">
      <button class="welcome-popup-close" aria-label="Close popup">×</button>
      <h3 id="welcomePopupTitle">${getTimeGreeting()} 👋</h3>
      <p class="welcome-popup-datetime">🗓️ ${formatSystemDateTime()}</p>
      <p>✅ Please use this website to generate <strong>real values</strong>.</p>
      <p>🚫 Please do not generate fake values.</p>
      <button class="btn btn-primary welcome-popup-ok">Got it 👍</button>
    </div>
  `;

  const closeButton = popupOverlay.querySelector(".welcome-popup-close");
  const okButton = popupOverlay.querySelector(".welcome-popup-ok");
  const dateTimeText = popupOverlay.querySelector(".welcome-popup-datetime");

  const updateDateTime = () => {
    if (dateTimeText) {
      dateTimeText.textContent = `🗓️ ${formatSystemDateTime()}`;
    }
  };

  const dateTimeIntervalId = window.setInterval(updateDateTime, 1000);
  updateDateTime();

  const getFocusableElements = () => {
    const selectors = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ];

    return Array.from(popupOverlay.querySelectorAll(selectors.join(",")));
  };

  const handleEscape = (event) => {
    if (event.key === "Escape" && document.body.contains(popupOverlay)) {
      closePopup();
    }
  };

  const handleFocusTrap = (event) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const closePopup = () => {
    window.clearInterval(dateTimeIntervalId);
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("keydown", handleFocusTrap);
    popupOverlay.classList.add("hide");
    setTimeout(() => {
      popupOverlay.remove();
      document.body.style.overflow = "";

      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    }, 220);
  };

  closeButton?.addEventListener("click", closePopup);
  okButton?.addEventListener("click", closePopup);

  popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", handleEscape);
  document.addEventListener("keydown", handleFocusTrap);

  document.body.appendChild(popupOverlay);
  document.body.style.overflow = "hidden";
  closeButton?.focus();
};

window.addEventListener("DOMContentLoaded", () => {
  showWelcomePopup();
});

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
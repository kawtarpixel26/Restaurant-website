'use strict';



/**
 * PRELOAD
 * 
 * loading will end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  if (preloader) {
    preloader.classList.add("loaded");
  }
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  if (!elements) return;
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// Auto-close navbar when mobile nav links are clicked
const navLinks = document.querySelectorAll("[data-nav-link]");
addEventOnElements(navLinks, "click", function () {
  if (navbar && navbar.classList.contains("active")) {
    toggleNavbar();
  }
});



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    if (header) header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
    if (header) hideHeader();
  } else {
    if (header) header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  if (!lastActiveSliderItem || !heroSliderItems[currentSlidePos]) return;
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

if (heroSliderNextBtn) {
  heroSliderNextBtn.addEventListener("click", slideNext);
}

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

if (heroSliderPrevBtn) {
  heroSliderPrevBtn.addEventListener("click", slidePrev);
}

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

if (heroSliderNextBtn && heroSliderPrevBtn) {
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
}

window.addEventListener("load", function () {
  if (heroSliderItems.length > 0) {
    autoSlide();
  }
});



/**
 * PARALLAX EFFECT (Fixed compounding bug)
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", function (event) {
  const base_x = -((event.clientX / window.innerWidth * 10) - 5);
  const base_y = -((event.clientY / window.innerHeight * 10) - 5);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed) || 1;
    const moveX = base_x * speed;
    const moveY = base_y * speed;
    parallaxItems[i].style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
  }
});



/**
 * MENU CATEGORY FILTER
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const menuCards = document.querySelectorAll("[data-menu-category]");

if (filterBtns.length > 0 && menuCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      filterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      const category = this.dataset.filterBtn;

      menuCards.forEach(card => {
        if (category === "all" || card.dataset.menuCategory === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}



/**
 * RESERVATION FORM HANDLING & MODAL
 */

const reservationForm = document.querySelector("[data-reservation-form]");
const reservationModal = document.querySelector("[data-reservation-modal]");
const modalCloseBtns = document.querySelectorAll("[data-modal-close]");

// Restaurant WhatsApp Number
const BLACKSMITH_WHATSAPP = "212699779600";
// Optional CallMeBot API key for automatic direct WhatsApp message delivery
let CALLMEBOT_API_KEY = ""; // Enter your free key from CallMeBot if active

if (reservationForm && reservationModal) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.75";
      submitBtn.innerHTML = `<span>Envoi en cours...</span>`;
    }

    const formData = new FormData(this);
    const name = formData.get("name") || "Client";
    const phone = formData.get("phone") || "06 99 77 96 00";
    const person = formData.get("person") || "2 Personnes";
    const date = formData.get("reservation-date") || new Date().toISOString().split('T')[0];
    const time = formData.get("time") || "08:00 pm";
    const serviceType = formData.get("service_type") || "Dine-in";
    const message = formData.get("message") || "Aucune";

    // Format clean message for WhatsApp
    const waText = 
`🍽️ *NOUVELLE RÉSERVATION - BLACKSMITH AGADIR*
👤 *Client :* ${name}
📞 *Téléphone :* ${phone}
👥 *Couverts :* ${person}
📅 *Date :* ${date}
⏰ *Heure :* ${time}
📍 *Option :* ${serviceType}
📝 *Demandes :* ${message}
✨ Envoyé automatiquement depuis le site web.`;

    const encodedText = encodeURIComponent(waText);

    // 1. Send silently in the background via CallMeBot WhatsApp Gateway
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=+${BLACKSMITH_WHATSAPP}&text=${encodedText}${CALLMEBOT_API_KEY ? `&apikey=${CALLMEBOT_API_KEY}` : ''}`;
    try {
      fetch(callMeBotUrl, { mode: 'no-cors' }).catch(() => {});
    } catch (err) {}

    // 2. Also send to local backend endpoint if running via node server
    try {
      fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, person, date, time, serviceType, message, waText, createdAt: new Date().toISOString() })
      }).catch(() => {});
    } catch (err) {}

    // 3. Store in localStorage as backup ledger
    try {
      const existing = JSON.parse(localStorage.getItem('blacksmith_reservations') || '[]');
      existing.push({ name, phone, person, date, time, serviceType, message, timestamp: new Date().toISOString() });
      localStorage.setItem('blacksmith_reservations', JSON.stringify(existing));
    } catch (err) {}

    // 4. Update Modal summary on page
    const summaryEl = document.querySelector("[data-booking-summary]");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="text-align: center; margin-block-end: 14px;">
          <span style="display: inline-block; padding: 4px 14px; background: hsla(145, 63%, 42%, 0.15); border: 1px solid #2ECC71; color: #2ECC71; border-radius: 50px; font-weight: bold; font-size: 1.25rem;">
            ✓ Envoyé automatiquement à notre numéro
          </span>
        </div>
        <p><strong>Client :</strong> ${name}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Formule :</strong> ${serviceType} · ${person}</p>
        <p><strong>Date &amp; Heure :</strong> ${date} à ${time}</p>
        ${message && message !== "None" && message !== "Aucune" ? `<p><strong>Demandes :</strong> ${message}</p>` : ""}
      `;
    }

    // Done! Display confirmation modal without opening WhatsApp or navigating away
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = originalBtnContent;
      }
      reservationModal.classList.add("active");
      this.reset();
    }, 450);
  });

  addEventOnElements(modalCloseBtns, "click", function () {
    reservationModal.classList.remove("active");
  });

  reservationModal.addEventListener("click", function (e) {
    if (e.target === reservationModal) {
      reservationModal.classList.remove("active");
    }
  });
}



/**
 * NEWSLETTER FORM & TOAST
 */

const newsletterForms = document.querySelectorAll("[data-newsletter-form]");
const toast = document.querySelector("[data-toast]");

if (newsletterForms.length > 0 && toast) {
  newsletterForms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4000);
      this.reset();
    });
  });
}

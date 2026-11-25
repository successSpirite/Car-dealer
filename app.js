/* =========================================================
   SUCCESS LIMITED — INTERACTIONS
   ========================================================= */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll("#navLinks a");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    console.log("Menu toggle clicked. isOpen:", isOpen);

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    console.log("Menu toggle clicked. isOpen:", isOpen);
    navLinks.classList.toggle("open", !isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Vehicle search and category filters */

const carSearch = document.querySelector("#carSearch");
const typeFilter = document.querySelector("#typeFilter");
const filterButtons = document.querySelectorAll(".filter-chip");
const carCards = document.querySelectorAll(".car-card");
const emptyState = document.querySelector("#emptyState");

let activeFilter = "all";

function filterCars() {
  const searchTerm = carSearch.value.trim().toLowerCase();
  const selectedType = typeFilter.value;
  let visibleCount = 0;

  carCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const type = card.dataset.type;
    const matchesSearch = name.includes(searchTerm);
    const matchesType = activeFilter === "all" || type === activeFilter;
    const matchesSelect = selectedType === "all" || type === selectedType;
    const isVisible = matchesSearch && matchesType && matchesSelect;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount !== 0;
}

if (carSearch) {
  carSearch.addEventListener("input", filterCars);
}

if (typeFilter) {
  typeFilter.addEventListener("change", filterCars);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    typeFilter.value = "all";
    filterCars();
  });
});

document.querySelector("#searchButton")?.addEventListener("click", filterCars);

/* Save a vehicle to favourites (visual state only) */

document.querySelectorAll(".favorite").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.classList.toggle("saved");
    button.textContent = isSaved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isSaved));
  });
});

/* Vehicle details modal */

const carModal = document.querySelector("#carModal");
const modalTitle = document.querySelector("#modalTitle");
const modalContact = document.querySelector("#modalContact");

function closeCarModal() {
  carModal.classList.remove("open");
  carModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const carName = button.dataset.car;

    modalTitle.textContent = `Interested in the ${carName}?`;
    modalContact.href = `mailto:hello@successlimited.com?subject=${encodeURIComponent(
      `Enquiry about ${carName}`
    )}`;

    carModal.classList.add("open");
    carModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeCarModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && carModal.classList.contains("open")) {
    closeCarModal();
  }
});

/* Testimonial slider */

const reviews = [
  {
    quote:
      "The team made the whole experience feel easy. They listened to what I needed and helped me understand my options.",
    name: "A valued customer",
    role: "Customer experience",
    initial: "A"
  },
  {
    quote:
      "I appreciated the clear communication and the attention given to my questions. It made the process feel more comfortable.",
    name: "A happy customer",
    role: "Customer experience",
    initial: "H"
  },
  {
    quote:
      "A helpful team makes a real difference. I would recommend taking the time to speak with them about your next vehicle.",
    name: "A satisfied customer",
    role: "Customer experience",
    initial: "S"
  }
];

let reviewIndex = 0;

function showReview(index) {
  const review = reviews[index];

  document.querySelector("#reviewQuote").textContent = review.quote;
  document.querySelector("#reviewName").textContent = review.name;
  document.querySelector("#reviewRole").textContent = review.role;
  document.querySelector("#reviewInitial").textContent = review.initial;
  document.querySelector("#reviewIndex").textContent =
    `0${index + 1} / 0${reviews.length}`;
}

document.querySelector("#prevReview")?.addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  showReview(reviewIndex);
});

document.querySelector("#nextReview")?.addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview(reviewIndex);
});




/* =========================================================
   REPLAYABLE SCROLL ANIMATIONS
   Add data-animation="animate__zoomIn" (or another
   Animate.css class) to any element with the .animation-box class.
   Animations play on entry and reset on exit, in both directions.
   ========================================================= */

document.documentElement.classList.add("js");

const animatedElements = document.querySelectorAll(".animation-box[data-animation]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Keep all content available without replaying motion.
  animatedElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const animationOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "-50px 0px -50px 0px"
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const animationName = element.dataset.animation?.trim();

      if (!animationName) return;

      if (entry.isIntersecting) {
        // Reset first so the same animation can replay on every entry.
        element.classList.remove("animate__animated", animationName);
        void element.offsetWidth;

        element.classList.add("is-visible");
        element.classList.add("animate__animated", animationName);
      } else {
        // Remove the animation so it can restart next time it enters.
        element.classList.remove("animate__animated", animationName);
        element.classList.remove("is-visible");
      }
    });
  }, animationOptions);

  animatedElements.forEach((element) => {
    animationObserver.observe(element);
  });
}



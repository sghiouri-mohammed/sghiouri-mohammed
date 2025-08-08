/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixer = mixitup(".work__container", {
  selectors: { target: ".work__card" },
  animation: { duration: 300 },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");
function activeWork(workLink) {
  workLinks.forEach((wl) => wl.classList.remove("active-work"));
  workLink.classList.add("active-work");
}
workLinks.forEach((wl) => wl.addEventListener("click", () => activeWork(wl)));

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: { 576: { slidesPerView: 2 }, 768: { slidesPerView: 2, spaceBetween: 48 } },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");
    const link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
    if (!link) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) link.classList.add("active-link");
    else link.classList.remove("active-link");
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT / DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";
if (themeButton) {
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");
  const getCurrentTheme = () => (document.body.classList.contains(lightTheme) ? "dark" : "light");
  const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun");
  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](lightTheme);
    themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](iconTheme);
  }
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({ origin: "top", distance: "60px", duration: 1200, delay: 200, reset: false });
try {
  sr.reveal(`.nav__menu`, { delay: 100, origin: "bottom", distance: "30px" });
  sr.reveal(`.home__data`);
  sr.reveal(`.home__handle`, { delay: 100 });
  sr.reveal(`.home__social, .home__scroll`, { delay: 100, origin: "bottom" });
  sr.reveal(`.about__img`, { delay: 100, origin: "left", distance: "30px" });
  sr.reveal(`.about__data, .about__description, .about__button-contact`, { delay: 100, origin: "right", distance: "30px" });
  sr.reveal(`.stats__item`, { origin: "bottom" });
  sr.reveal(`.xp__item`, { origin: "bottom" });
  sr.reveal(`.skill-card`, { origin: "bottom", distance: "30px" });
  sr.reveal(`.services__title, services__button`, { origin: "top", distance: "30px" });
  sr.reveal(`.work__card`, { origin: "bottom", distance: "30px" });
  sr.reveal(`.testimonial__container`, { origin: "bottom", distance: "30px" });
  sr.reveal(`.contact__info, .contact__title-info`, { origin: "left", distance: "30px" });
  sr.reveal(`.contact__form, .contact__title-form`, { origin: "right", distance: "30px" });
  sr.reveal(`.footer, footer__container`, { origin: "bottom", distance: "30px" });
} catch (e) {}

/*=============== TYPED HERO ===============*/
if (window.Typed) {
  new Typed("#typed-output", {
    strings: ["Ingénieur Big Data", "Data Scientist", "Cloud & MLOps Enthusiast"],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 1400,
    loop: true,
  });
}

/*=============== STATS COUNTERS ===============*/
(function countersInit() {
  const counters = document.querySelectorAll(".stats__num");
  if (!counters.length) return;
  const run = (entry) => {
    const el = entry.target;
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    let current = 0;
    const durationMs = 1200;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / durationMs);
      current = Math.floor(p * target);
      el.textContent = current.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run(e);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => obs.observe(c));
})();

/*=============== LANGUAGE SWITCHER ===============*/
const i18n = {
  en: {
    "home.greeting": "Hello, I'm",
    "home.about": "About",
    "home.cv": "Download CV",
    "home.contact": "Contact",
    "about.subtitle": "My Intro",
    "about.title": "About Me",
    "about.cta": "Contact Me",
    "stats.years": "Years of Experience",
    "stats.projects": "Projects Completed",
    "stats.clients": "Happy Clients",
    "xp.subtitle": "Journey",
    "xp.title": "Professional Experiences",
    "skills.subtitle": "My Abilities",
    "skills.title": "Tools & Technologies",
    "services.subtitle": "My Services",
    "services.title": "What I Offer",
    "work.subtitle": "My Portfolio",
    "work.title": "Recent Works",
    "testi.subtitle": "What people say about me",
    "testi.title": "Professional reputation",
    "edu.subtitle": "Education",
    "edu.title": "Education & Academic Path",
    "contact.subtitle": "Get in touch",
    "contact.title": "Contact Me",
    "contact.email": "Email",
    "contact.whatsapp": "Whatsapp",
    "contact.formtitle": "Write Me your Message",
    "contact.form": "Fill the Form",
    "footer.home": "Home",
    "footer.about": "About",
    "footer.skills": "Skills",
    "footer.work": "Work",
    "footer.contact": "Contact",
  },
  fr: {
    "home.greeting": "Bonjour, je suis",
    "home.about": "À propos",
    "home.cv": "Télécharger le CV",
    "home.contact": "Contact",
    "about.subtitle": "Mon Intro",
    "about.title": "À propos de moi",
    "about.cta": "Me contacter",
    "stats.years": "Années d'expérience",
    "stats.projects": "Projets réalisés",
    "stats.clients": "Clients satisfaits",
    "xp.subtitle": "Parcours",
    "xp.title": "Expériences professionnelles",
    "skills.subtitle": "Mes Compétences",
    "skills.title": "Outils & Technologies",
    "services.subtitle": "Mes Services",
    "services.title": "Ce que je propose",
    "work.subtitle": "Mon Portfolio",
    "work.title": "Travaux récents",
    "testi.subtitle": "Ce qu’on dit de moi",
    "testi.title": "Réputation professionnelle",
    "edu.subtitle": "Formation",
    "edu.title": "Formations & Parcours scolaire",
    "contact.subtitle": "Entrer en contact",
    "contact.title": "Me contacter",
    "contact.email": "Email",
    "contact.whatsapp": "Whatsapp",
    "contact.formtitle": "Écrivez-moi votre message",
    "contact.form": "Remplir le formulaire",
    "footer.home": "Accueil",
    "footer.about": "À propos",
    "footer.skills": "Compétences",
    "footer.work": "Travaux",
    "footer.contact": "Contact",
  },
};

function applyI18n(lang) {
  const dict = i18n[lang] || i18n.fr;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}

(function initLang() {
  const select = document.getElementById("lang-switch");
  const saved = localStorage.getItem("lang") || (document.documentElement.lang || "fr");
  applyI18n(saved);
  if (select) {
    select.value = saved;
    select.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("lang", lang);
      applyI18n(lang);
    });
  }
})();

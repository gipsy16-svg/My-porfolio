// ============ CONFIG ============
const SITE = {
  name: "Goodwin Gipsy F. Agno",
  role: "Back-end Web & Mobile App Developer",
  typing: [
    "I build reliable back-end services.",
    "I craft mobile applications.",
    "I love clean, scalable code.",
    "Let's build something great."
  ],
};

const PROJECTS = [
  {
    title: "SaaS Dashboard",
    desc: "Analytics dashboard with real-time charts, role-based access and dark mode.",
    tags: ["React", "TypeScript", "Node", "PostgreSQL"],
    category: "web",
    icon: "fa-chart-line",
    links: { live: "#", code: "#" },
    details: "A full-featured SaaS analytics dashboard built with React and Node. Features real-time data via WebSockets, RBAC, and a fully responsive UI."
  },
  {
    title: "E-commerce API",
    desc: "RESTful API with payments, inventory and order management.",
    tags: ["Node", "Express", "Stripe", "MongoDB"],
    category: "api",
    icon: "fa-cart-shopping",
    links: { live: "#", code: "#" },
    details: "Scalable e-commerce backend with Stripe payments, inventory tracking, JWT auth and comprehensive test coverage."
  },
  {
    title: "Chat App",
    desc: "Real-time messaging with rooms, presence and file sharing.",
    tags: ["Socket.io", "React", "Redis"],
    category: "web",
    icon: "fa-comments",
    links: { live: "#", code: "#" },
    details: "Real-time chat application supporting rooms, typing indicators, presence and file uploads."
  },
  {
    title: "Mobile Fitness Tracker",
    desc: "Cross-platform fitness app with workout plans and progress charts.",
    tags: ["React Native", "Firebase"],
    category: "mobile",
    icon: "fa-dumbbell",
    links: { live: "#", code: "#" },
    details: "Cross-platform mobile app for tracking workouts, nutrition and progress with offline support."
  },
  {
    title: "AI Content Tool",
    desc: "Generate and edit marketing copy with AI assistance.",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    category: "web",
    icon: "fa-wand-magic-sparkles",
    links: { live: "#", code: "#" },
    details: "AI-powered content generation tool with prompt templates, history and export features."
  },
  {
    title: "Auth Microservice",
    desc: "JWT/OAuth2 auth service with MFA and rate limiting.",
    tags: ["Go", "gRPC", "Docker"],
    category: "api",
    icon: "fa-shield-halved",
    links: { live: "#", code: "#" },
    details: "Standalone authentication microservice supporting OAuth2, MFA, session management and rate limiting."
  }
];

// ============ TYPING EFFECT ============
const typingEl = document.getElementById("typing");
if (typingEl) {
  let tIndex = 0, cIndex = 0, deleting = false;
  function type() {
    const word = SITE.typing[tIndex];
    if (!deleting) {
      typingEl.textContent = word.slice(0, ++cIndex);
      if (cIndex === word.length) { deleting = true; setTimeout(type, 1400); return; }
    } else {
      typingEl.textContent = word.slice(0, --cIndex);
      if (cIndex === 0) { deleting = false; tIndex = (tIndex + 1) % SITE.typing.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
}

// ============ NAVBAR ============
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
}
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
});

// ============ THEME ============
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
  themeToggle.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
  });
}
function updateThemeIcon(t) {
  if (themeToggle) themeToggle.innerHTML = t === "dark" ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}
// apply saved theme even if no toggle (shouldn't happen)
if (!themeToggle) {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// ============ GALLERY LIGHTBOX ============
window.openGallery = function(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if (lb && img) {
    img.src = src;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};
window.closeGallery = function() {
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape") window.closeGallery();
});

// ============ PARTICLES ============
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  function initParticles() {
    const count = Math.min(90, Math.floor(window.innerWidth / 18));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.4,
      });
    }
  }
  initParticles();
  window.addEventListener("resize", initParticles);
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00d9ff";
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.5;
      ctx.fill();
    });
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = accent;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ============ SCROLL REVEAL + SKILL BARS + COUNTERS ============
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      e.target.querySelectorAll?.(".skill-bar").forEach(sb => {
        const lvl = sb.getAttribute("data-level");
        const fill = sb.querySelector(".bar__fill");
        if (fill) fill.style.width = lvl + "%";
      });
      e.target.querySelectorAll?.("[data-count]").forEach(el => {
        if (el.dataset.done) return;
        el.dataset.done = "1";
        const target = +el.dataset.count;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const iv = setInterval(() => {
          cur = Math.min(target, cur + step);
          el.textContent = cur;
          if (cur >= target) clearInterval(iv);
        }, 30);
      });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".skill-bar").forEach(sb => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const lvl = sb.getAttribute("data-level");
        const fill = sb.querySelector(".bar__fill");
        if (fill) fill.style.width = lvl + "%";
      }
    });
  }, { threshold: 0.3 });
  io.observe(sb);
});

// ============ PROJECTS RENDER ============
const grid = document.getElementById("projectsGrid");
const homeGrid = document.getElementById("homeProjectsGrid");

function createProjectCard(p) {
  const card = document.createElement("div");
  card.className = "project-card reveal";
  card.innerHTML = `
    <div class="project-card__thumb"><i class="fa-solid ${p.icon}"></i></div>
    <div class="project-card__body">
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__desc">${p.desc}</p>
      <div class="project-card__tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="project-card__links">
        <a href="${p.links.live}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>
        <a href="${p.links.code}" target="_blank"><i class="fa-brands fa-github"></i> Code</a>
      </div>
    </div>`;
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    openModal(p);
  });
  return card;
}

if (grid) {
  function renderProjects(filter = "all") {
    grid.innerHTML = "";
    PROJECTS.filter(p => filter === "all" || p.category === filter).forEach(p => {
      const card = createProjectCard(p);
      grid.appendChild(card);
      observer.observe(card);
    });
  }
  renderProjects();

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });
}

if (homeGrid) {
  PROJECTS.slice(0, 3).forEach(p => {
    const card = createProjectCard(p);
    homeGrid.appendChild(card);
    observer.observe(card);
  });
}

// ============ MODAL ============
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
function openModal(p) {
  if (!modal || !modalBody) return;
  modalBody.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.details}</p>
    <div class="modal__tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    <div class="modal__links">
      <a href="${p.links.live}" target="_blank" class="btn btn--primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
      <a href="${p.links.code}" target="_blank" class="btn btn--ghost"><i class="fa-brands fa-github"></i> Source Code</a>
    </div>`;
  modal.classList.add("open");
}
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
if (modalClose) modalClose.addEventListener("click", () => modal.classList.remove("open"));
if (modalOverlay) modalOverlay.addEventListener("click", () => modal.classList.remove("open"));
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal) modal.classList.remove("open"); });

// ============ FOOTER YEAR ============

// ============ TILT EFFECT ON CODE CARD ============
const codeCard = document.querySelector(".code-card");
if (codeCard) {
  codeCard.addEventListener("mousemove", e => {
    const r = codeCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    codeCard.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  codeCard.addEventListener("mouseleave", () => {
    codeCard.style.transform = "perspective(1000px) rotateY(-6deg) rotateX(4deg)";
  });
}

// ============ SKILL MARQUEE (duplicate for seamless loop) ============
const skillTrack = document.querySelector(".skill-track");
if (skillTrack) {
  Array.from(skillTrack.children).forEach(node => {
    const clone = node.cloneNode(true);
    clone.classList.add("in");
    skillTrack.appendChild(clone);
  });
}


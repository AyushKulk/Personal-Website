/* Global interactions and projects rendering */

function setCurrentYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function createProjectCard(project) {
  const { title, description, tags = [], repoUrl, liveUrl, image } = project;

  const card = document.createElement("article");
  card.className = "project-card tilt";

  const media = document.createElement("div");
  media.className = "project-media";
  if (image) {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = `${title} cover`;
    img.src = image;
    media.appendChild(img);
  } else {
    media.textContent = "//";
  }

  const body = document.createElement("div");
  body.className = "project-body";

  const h3 = document.createElement("h3");
  h3.className = "project-title";
  h3.textContent = title;

  const p = document.createElement("p");
  p.className = "project-desc";
  p.textContent = description;

  const tagsWrap = document.createElement("div");
  tagsWrap.className = "project-tags";
  for (const tag of tags) {
    const t = document.createElement("span");
    t.className = "tag";
    t.textContent = tag;
    tagsWrap.appendChild(t);
  }

  const links = document.createElement("div");
  links.className = "card-links";
  if (repoUrl) {
    const a = document.createElement("a");
    a.className = "button-link";
    a.href = repoUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Repository";
    links.appendChild(a);
  }
  if (liveUrl) {
    const a = document.createElement("a");
    a.className = "button-link";
    a.href = liveUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Live Demo";
    links.appendChild(a);
  }

  body.appendChild(h3);
  body.appendChild(p);
  body.appendChild(tagsWrap);
  body.appendChild(links);

  card.appendChild(media);
  card.appendChild(body);
  return card;
}

function observeReveal(targets) {
  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        obs.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
  targets.forEach(t => io.observe(t));
}

function enableTilt(cards) {
  const max = 8; // degrees
  const damp = 18;
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rx = (-dy * max).toFixed(2);
      const ry = (dx * max).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const src = grid.getAttribute("data-projects-src");
  try {
    const res = await fetch(src, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
    const projects = await res.json();

    grid.innerHTML = "";
    for (const project of projects) {
      const card = createProjectCard(project);
      grid.appendChild(card);
    }
    // Stagger reveal
    const cards = Array.from(grid.querySelectorAll(".project-card"));
    cards.forEach((c, i) => setTimeout(() => c.classList.add("reveal"), 50 * i));
    enableTilt(cards);
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="no-js">Could not load projects. View them on <a href="https://github.com/yourhandle" target="_blank" rel="noopener">GitHub</a>.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  loadProjects();
});


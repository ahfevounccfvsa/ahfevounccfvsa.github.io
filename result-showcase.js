(function () {
  const toggle = document.querySelector("[data-showcase-toggle]");
  const toolbar = document.querySelector(".toolbar");

  if (toggle && toolbar) {
    toggle.addEventListener("click", () => {
      toolbar.classList.toggle("is-collapsed");
      const collapsed = toolbar.classList.contains("is-collapsed");
      toggle.textContent = collapsed ? "展开工具栏" : "收起工具栏";
      toggle.setAttribute("aria-expanded", String(!collapsed));
    });
  }

  const toc = document.querySelector(".toc");
  if (!toc) {
    return;
  }

  const tocLinks = Array.from(toc.querySelectorAll("a[href^='#']")).filter((link) => {
    const id = decodeURIComponent(link.hash.slice(1));
    return id && document.getElementById(id);
  });

  if (!tocLinks.length || document.querySelector(".quick-jump")) {
    return;
  }

  const quickJump = document.createElement("nav");
  quickJump.className = "quick-jump";
  quickJump.setAttribute("aria-label", "快速定位");

  const title = document.createElement("div");
  title.className = "quick-jump-title";
  title.textContent = "快速定位";

  const list = document.createElement("div");
  list.className = "quick-jump-list";

  const quickLinks = new Map();
  const tocLinksById = new Map();

  tocLinks.forEach((sourceLink) => {
    const id = decodeURIComponent(sourceLink.hash.slice(1));
    const quickLink = document.createElement("a");
    quickLink.href = sourceLink.hash;
    quickLink.textContent = compactLabel(sourceLink.textContent);
    quickLink.title = sourceLink.textContent.trim();
    list.appendChild(quickLink);
    quickLinks.set(id, quickLink);
    tocLinksById.set(id, sourceLink);
  });

  quickJump.appendChild(title);
  quickJump.appendChild(list);
  document.body.appendChild(quickJump);

  function compactLabel(label) {
    const text = label.trim().replace(/\s*\([^)]*\)\s*$/, "");
    const number = text.match(/\d+$/);
    if (number) {
      return number[0];
    }
    return text.replace(/\s+/g, " ");
  }

  function setActive(id) {
    quickLinks.forEach((link, linkId) => {
      link.classList.toggle("is-active", linkId === id);
    });
    tocLinksById.forEach((link, linkId) => {
      link.classList.toggle("is-active", linkId === id);
    });
  }

  function updateVisibility() {
    const toolbarBottom = toolbar ? toolbar.getBoundingClientRect().bottom + window.scrollY : 260;
    quickJump.classList.toggle("is-visible", window.scrollY > toolbarBottom - 24);
  }

  const sections = tocLinks
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.3, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
  } else {
    window.addEventListener("scroll", () => {
      let current = null;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 140) {
          current = section;
        }
      });
      if (current) {
        setActive(current.id);
      }
    }, { passive: true });
  }

  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
})();

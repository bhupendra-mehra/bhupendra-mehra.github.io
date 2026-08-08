document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});

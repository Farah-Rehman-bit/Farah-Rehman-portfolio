(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  var modal = document.getElementById("modal");

  function syncToggle() {
    var dark = root.getAttribute("data-theme") === "dark";
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  syncToggle();
  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncToggle();
  });

  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelectorAll("[data-title]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("mTitle").textContent = btn.dataset.title;
      document.getElementById("mText").textContent = btn.dataset.text;
      document.getElementById("mTech").textContent = btn.dataset.tech;
      document.getElementById("mLink").href = btn.dataset.link;
      modal.showModal();
    });
  });
  document.getElementById("mClose").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  // Hero glow follows the pointer, like a motion-activated light
  var hero = document.querySelector(".hero");
  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty("--x", e.clientX - r.left + "px");
    hero.style.setProperty("--y", e.clientY - r.top + "px");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();

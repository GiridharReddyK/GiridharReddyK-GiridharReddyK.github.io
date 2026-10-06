/* ==========================================================================
   main.js — small, dependency-free helpers for the site.
   Everything here is optional: every page still reads fine without JS.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Light / dark theme toggle ----------
     The early <script> in each page's <head> applies a saved choice before
     the page paints (no flash). This part handles the button. */
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var chosen = root.getAttribute("data-theme");
    if (chosen === "light" || chosen === "dark") return chosen;
    return systemPrefersDark() ? "dark" : "light";
  }

  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    var syncThemeLabel = function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      themeBtn.setAttribute("aria-label", "Switch to " + next + " mode");
      themeBtn.title = "Switch to " + next + " mode";
    };
    syncThemeLabel();

    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode / storage blocked: the toggle still works for this page */
      }
      syncThemeLabel();
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    var setNav = function (open) {
      navLinks.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    navToggle.addEventListener("click", function () {
      setNav(!navLinks.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* ---------- Publication panels (Summary / Bib) ----------
     A button with data-panel and aria-controls="some-id" shows/hides the
     element with that id. Opening one panel closes the others in the same entry. */
  var panelButtons = document.querySelectorAll("[data-panel]");
  Array.prototype.forEach.call(panelButtons, function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      var willOpen = panel.hidden;

      var entry = btn.closest(".pub");
      if (entry) {
        Array.prototype.forEach.call(entry.querySelectorAll("[data-panel]"), function (other) {
          var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
          if (otherPanel) otherPanel.hidden = true;
          other.setAttribute("aria-expanded", "false");
        });
      }

      panel.hidden = !willOpen;
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  /* ---------- Copy BibTeX ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(area);
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".copy-btn"), function (btn) {
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      var pre = btn.parentElement.querySelector("pre");
      if (!pre) return;
      copyText(pre.textContent.trim()).then(
        function () {
          btn.textContent = "Copied";
        },
        function () {
          btn.textContent = "Press Ctrl+C";
        }
      );
      setTimeout(function () {
        btn.textContent = label;
      }, 1600);
    });
  });

  /* ---------- Project filters ----------
     Buttons: <button data-filter="rf">. Cards: <li data-category="rf radio">. */
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var cards = document.querySelectorAll("[data-category]");
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");

      Array.prototype.forEach.call(filterBar.querySelectorAll("button[data-filter]"), function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      Array.prototype.forEach.call(cards, function (card) {
        var categories = card.getAttribute("data-category").split(/\s+/);
        card.hidden = filter !== "all" && categories.indexOf(filter) === -1;
      });
    });
  }

  /* ---------- Footer year ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

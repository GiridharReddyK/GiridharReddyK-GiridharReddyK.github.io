/* ==========================================================================
   main.js — small, dependency-free helpers for the site.
   Everything here is optional: every page still reads fine without JS.
   ========================================================================== */
(() => {
  "use strict";

  const root = document.documentElement;

  /* ---------- Light / dark theme toggle ----------
     The early <script> in each page's <head> applies a saved choice before
     the page paints (no flash). This part handles the button. */
  const systemPrefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentTheme = () => {
    const chosen = root.getAttribute("data-theme");
    if (chosen === "light" || chosen === "dark") return chosen;
    return systemPrefersDark() ? "dark" : "light";
  };

  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    const syncThemeLabel = () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      themeBtn.setAttribute("aria-label", `Switch to ${next} mode`);
      themeBtn.title = `Switch to ${next} mode`;
    };
    syncThemeLabel();

    themeBtn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode / storage blocked: the toggle still works for this page */
      }
      syncThemeLabel();
    });
  }

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    const setNav = (open) => {
      navLinks.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) navLinks.querySelector("a").focus();
    };

    navToggle.addEventListener("click", () => {
      setNav(!navLinks.classList.contains("is-open"));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* ---------- Publication panels (Summary / Bib) ----------
     A button with data-panel and aria-controls="some-id" shows/hides the
     element with that id. Opening one panel closes the others in the same entry. */
  document.querySelectorAll("[data-panel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      const willOpen = panel.hidden;

      btn
        .closest(".pub")
        ?.querySelectorAll("[data-panel]")
        .forEach((other) => {
          const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
          if (otherPanel) otherPanel.hidden = true;
          other.setAttribute("aria-expanded", "false");
        });

      panel.hidden = !willOpen;
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  /* ---------- Copy BibTeX ---------- */
  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for non-secure contexts
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    try {
      if (!document.execCommand("copy")) throw new Error("copy command was rejected");
    } finally {
      area.remove();
    }
  };

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener("click", async () => {
      const pre = btn.parentElement.querySelector("pre");
      if (!pre) return;
      try {
        await copyText(pre.textContent.trim());
        btn.textContent = "Copied";
      } catch {
        btn.textContent = "Press Ctrl+C";
      }
      setTimeout(() => {
        btn.textContent = label;
      }, 1600);
    });
  });

  /* ---------- Project filters ----------
     Buttons: <button data-filter="rf">. Cards: <li data-category="rf radio">. */
  const filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    const cards = document.querySelectorAll("[data-category]");
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      const filter = btn.dataset.filter;

      filterBar.querySelectorAll("button[data-filter]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      cards.forEach((card) => {
        const categories = card.dataset.category.split(/\s+/);
        card.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();

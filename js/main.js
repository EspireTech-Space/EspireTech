(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var toggleLabel = toggle.querySelector(".sr-only");
  var year = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var email = document.body.dataset.email || "lakshay@espiretech.in";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll("[data-mail]").forEach(function (link) {
    link.textContent = email;
    link.setAttribute("href", "mailto:" + email);
  });

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open, returnFocus) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggleLabel.textContent = open ? "Close menu" : "Open menu";
    if (open) {
      var firstLink = nav.querySelector("a");
      if (firstLink) firstLink.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    setMenu(open, !open);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) setMenu(false, false);
    });
  });

  document.addEventListener("click", function (event) {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setMenu(false, false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false, true);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860 && nav.classList.contains("is-open")) {
      setMenu(false, false);
    }
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    if (!reduceMotion) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.14 }
      );
      document.querySelectorAll(".reveal").forEach(function (item) {
        var rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) return;
        item.classList.add("will-reveal");
        revealObserver.observe(item);
      });
    }
  }

  var filterButtons = document.querySelectorAll(".filter-btn");
  var projects = document.querySelectorAll(".project");
  var emptyNote = document.querySelector(".filter-empty");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      var visible = 0;
      filterButtons.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      projects.forEach(function (project) {
        var show = filter === "all" || project.getAttribute("data-category") === filter;
        project.hidden = !show;
        if (show) {
          visible += 1;
          project.classList.add("is-in");
        }
      });
      if (emptyNote) emptyNote.hidden = visible !== 0;
    });
  });

  function setError(input, message) {
    var error = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.name.value.trim();
    var from = form.email.value.trim();
    var organization = form.organization.value.trim();
    var message = form.message.value.trim();
    var valid = true;

    if (name.length < 2) {
      setError(form.name, "Enter your name.");
      valid = false;
    } else {
      setError(form.name, "");
    }

    if (!validEmail(from)) {
      setError(form.email, "Enter a valid email address.");
      valid = false;
    } else {
      setError(form.email, "");
    }

    if (!form.need.value) {
      setError(form.need, "Choose the kind of work you need.");
      valid = false;
    } else {
      setError(form.need, "");
    }

    if (message.length < 12) {
      setError(form.message, "Add a few more words so we know what you need.");
      valid = false;
    } else {
      setError(form.message, "");
    }

    if (!valid) {
      status.textContent = "";
      var firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var body = "Name: " + name + "\nEmail: " + from + "\n";
    if (organization) body += "Organization: " + organization + "\n";
    body += "Need: " + form.need.value + "\n";
    body += "\n" + message;

    var subject = "Project inquiry from " + name;
    var mailto = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    if (mailto.length > 1800) {
      status.textContent = "This message is too long for an email link. Please write to " + email + " directly.";
      return;
    }

    status.textContent = "Your email app should open with this message ready to send. If it does not, write to " + email + ".";
    window.location.href = mailto;
  });
})();

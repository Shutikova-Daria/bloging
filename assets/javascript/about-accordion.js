document.addEventListener("DOMContentLoaded", function () {
  const modules = document.querySelectorAll(".about-module");

  modules.forEach((module) => {
    const header = module.querySelector(".about-module-header");
    const arrow = module.querySelector(".about-module-arrow");

    header.addEventListener("click", function () {
      const isActive = module.classList.contains("about-active");

      modules.forEach((m) => {
        m.classList.remove("about-active");
        m.querySelector(".about-module-arrow").classList.remove("about-up");
        m.querySelectorAll(".about-hash-content").forEach((content) => content.classList.remove("about-active"));
        m.querySelectorAll(".about-hash-button").forEach((button) => button.classList.remove("about-active"));
      });

      if (!isActive) {
        module.classList.add("about-active");
        arrow.classList.add("about-up");
      }
    });
  });

  const hashButtons = document.querySelectorAll(".about-hash-button");

  hashButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      const parentModule = button.closest(".about-module");

      parentModule
        .querySelectorAll(".about-hash-content")
        .forEach((content) => content.classList.remove("about-active"));
      parentModule.querySelectorAll(".about-hash-button").forEach((btn) => btn.classList.remove("about-active"));

      if (!button.classList.contains("about-active")) {
        button.classList.add("about-active");
        targetContent.classList.add("about-active");

        if (window.innerWidth <= 610) {
          targetContent.classList.add("show-close-button");
        }
      }
    });
  });

  const hashContents = document.querySelectorAll(".about-hash-content");

  hashContents.forEach((content) => {
    const closeButton = document.createElement("button");
    closeButton.classList.add("about-close-button");
    closeButton.setAttribute("aria-label", "Close module");
    closeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

    closeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      const parentModule = content.closest(".about-module");
      parentModule.classList.remove("about-active");
      parentModule.querySelector(".about-module-arrow").classList.remove("about-up");
      parentModule.querySelectorAll(".about-hash-content").forEach((c) => c.classList.remove("about-active"));
      parentModule.querySelectorAll(".about-hash-button").forEach((button) => button.classList.remove("about-active"));
    });

    function updateCloseButtonVisibility() {
      if (window.innerWidth <= 610) {
        closeButton.style.display = "block";
      } else {
        closeButton.style.display = "none";
      }
    }

    window.addEventListener("resize", updateCloseButtonVisibility);
    updateCloseButtonVisibility();
    content.appendChild(closeButton);
  });

  function updateCloseButtonsVisibility() {
    document.querySelectorAll(".about-hash-content").forEach((content) => {
      if (window.innerWidth > 610) {
        content.classList.remove("show-close-button");
      }
    });
  }

  window.addEventListener("resize", updateCloseButtonsVisibility);
  updateCloseButtonsVisibility();
});

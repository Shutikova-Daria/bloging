document.addEventListener("DOMContentLoaded", () => {
  // Module toggle functionality
  const moduleHeaders = document.querySelectorAll(".module-header");

  moduleHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const module = this.parentElement;

      // Close other open modules before opening this one
      if (!module.classList.contains("active")) {
        document.querySelectorAll(".module.active").forEach((openModule) => {
          if (openModule !== module) {
            openModule.classList.remove("active");
          }
        });
      }

      module.classList.toggle("active");
    });
  });

  // Hash button toggle functionality
  const hashButtons = document.querySelectorAll(".hash-toggle");

  hashButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent triggering module toggle
      const hashButton = this.parentElement;

      // Close other open hash buttons within the same module before opening this one
      if (!hashButton.classList.contains("active")) {
        const parentModule = hashButton.closest(".module");
        parentModule.querySelectorAll(".hash-button.active").forEach((openHashButton) => {
          if (openHashButton !== hashButton) {
            openHashButton.classList.remove("active");
          }
        });
      }

      hashButton.classList.toggle("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const starRating = document.getElementById("star-rating");
  const stars = starRating.querySelectorAll(".star");
  const ratingDisplay = document.getElementById("rating-display");
  let currentRating = 0;

  // Function to update the stars based on rating
  function updateStars(rating) {
    stars.forEach((star, index) => {
      // Add active class to stars that should be filled
      if (index < rating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });

    // Update the rating display
    ratingDisplay.textContent = rating;

    // Save the current rating
    currentRating = rating;
  }

  // Add click event listeners to each star
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = Number.parseInt(this.getAttribute("data-rating"));
      updateStars(rating);
    });

    // Optional: Add hover effect to preview rating
    star.addEventListener("mouseenter", function () {
      const rating = Number.parseInt(this.getAttribute("data-rating"));

      // Preview the rating on hover
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add("hover");
          s.style.fill = "#5d4fff";
        } else {
          s.classList.remove("hover");
          s.style.fill = "transparent";
        }
      });
    });
  });

  // Reset hover effect when mouse leaves the rating container
  starRating.addEventListener("mouseleave", () => {
    stars.forEach((star, index) => {
      star.classList.remove("hover");

      // Restore the actual rating
      if (index < currentRating) {
        star.style.fill = "#5d4fff";
      } else {
        star.style.fill = "transparent";
      }
    });
  });
});

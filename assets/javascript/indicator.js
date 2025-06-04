document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#thXP0uH5Zh"); // ID каруселі
  const indicators = document.querySelectorAll(".carousel-indicators button");

  function updateIndicators(activeIndex) {
    indicators.forEach((indicator, index) => {
      if (index >= activeIndex - 1 && index <= activeIndex + 1) {
        indicator.style.display = "inline-block"; // Показуємо три центральні індикатори
        indicator.style.opacity = "1";
        indicator.style.transform = "scale(1)";
      } else {
        indicator.style.display = "none"; // Ховаємо решту
      }

      // Додаємо активний стиль
      if (index === activeIndex) {
        indicator.classList.add("active");
        indicator.style.background = "linear-gradient(45deg, #6a00f4, #00d4ff)";
        indicator.style.transform = "scale(1.3)";
      } else {
        indicator.classList.remove("active");
        indicator.style.background = "#555";
        indicator.style.transform = "scale(1)";
      }
    });
  }

  // Додаємо стилі до індикаторів
  indicators.forEach((indicator, index) => {
    indicator.style.width = "10px";
    indicator.style.height = "10px";
    indicator.style.margin = "0 5px";
    indicator.style.borderRadius = "50%";
    indicator.style.backgroundColor = "#555";
    indicator.style.border = "none";
    indicator.style.transition = "transform 0.3s, opacity 0.3s";

    indicator.addEventListener("click", function () {
      updateIndicators(index);
    });
  });

  // Додаємо обробник подій для Bootstrap-каруселі
  carousel.addEventListener("slid.bs.carousel", function (event) {
    updateIndicators(event.to);
  });

  // Ініціалізація: знаходимо активний індикатор
  const initialActiveIndex = Array.from(indicators).findIndex((indicator) => indicator.classList.contains("active"));
  updateIndicators(initialActiveIndex);
});

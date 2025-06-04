document.addEventListener("DOMContentLoaded", function () {
  // Get all tab links
  const tabLinks = document.querySelectorAll(".nav-tabs .nav-link");
  const prevBtn = document.querySelector(".tab-nav-prev");
  const nextBtn = document.querySelector(".tab-nav-next");
  const tabNameDisplay = document.querySelector(".current-tab-name");
  const indicatorCircles = document.querySelectorAll(".indicator-circle");

  // Function to find the currently active tab index
  function getActiveTabIndex() {
    for (let i = 0; i < tabLinks.length; i++) {
      if (tabLinks[i].classList.contains("active")) {
        return i;
      }
    }
    return 0; // Default to first tab if none is active
  }

  // Function to update the indicator circles
  function updateIndicators(activeIndex) {
    indicatorCircles.forEach((circle, index) => {
      if (index === activeIndex) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
  }

  // Function to activate a specific tab
  function activateTab(index) {
    // Deactivate all tabs
    tabLinks.forEach((link) => {
      link.classList.remove("active", "show");
      link.setAttribute("aria-selected", "false");
    });

    // Activate the selected tab
    tabLinks[index].classList.add("active", "show");
    tabLinks[index].setAttribute("aria-selected", "true");

    // Update the tab name display
    const tabName = tabLinks[index].getAttribute("data-tab-name");
    tabNameDisplay.textContent = tabName;

    // Update indicator circles
    updateIndicators(index);

    // Trigger the tab change event for Bootstrap
    const tabEvent = new Event("shown.bs.tab");
    tabLinks[index].dispatchEvent(tabEvent);

    // Find and show the corresponding tab content
    const tabId = tabLinks[index].getAttribute("href");
    const tabContents = document.querySelectorAll(".tab-pane");

    tabContents.forEach((content) => {
      content.classList.remove("active", "show");
    });

    const activeContent = document.querySelector(tabId);
    if (activeContent) {
      activeContent.classList.add("active", "show");
    }
  }

  // Previous button click handler
  prevBtn.addEventListener("click", function () {
    let activeIndex = getActiveTabIndex();
    activeIndex = (activeIndex - 1 + tabLinks.length) % tabLinks.length;
    activateTab(activeIndex);
  });

  // Next button click handler
  nextBtn.addEventListener("click", function () {
    let activeIndex = getActiveTabIndex();
    activeIndex = (activeIndex + 1) % tabLinks.length;
    activateTab(activeIndex);
  });

  // Add click handlers to the indicator circles
  indicatorCircles.forEach((circle) => {
    circle.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      activateTab(index);
    });
  });

  // Initialize the tab display with the active tab name
  const initialActiveIndex = getActiveTabIndex();
  const initialTabName = tabLinks[initialActiveIndex].getAttribute("data-tab-name");
  tabNameDisplay.textContent = initialTabName;
  updateIndicators(initialActiveIndex);

  // Add click handlers to the tab links to update the display and indicators
  tabLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab-name");
      tabNameDisplay.textContent = tabName;
      updateIndicators(index);
    });
  });
});

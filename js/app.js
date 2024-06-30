// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Measure the performance start time
  const startTime = performance.now();

  // Get the nav list
  const navList = document.getElementById("navbar__list");

  // Get all the sections in the document
  const sections = document.querySelectorAll("section");

  // document fragment to append list items
  const fragment = document.createDocumentFragment();

  // Loop through each section
  sections.forEach((section) => {
    // Get the section id and data-nav attribute
    const sectionId = section.id;
    const sectionNav = section.getAttribute("data-nav");

    // New list item for the navigation
    const listItem = document.createElement("li");

    // New anchor element for the navigation link
    const anchor = document.createElement("a");
    anchor.href = `#${sectionId}`;
    anchor.textContent = sectionNav;
    anchor.classList.add("menu__link");

    // Prevent default action and implement smooth scroll
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth",
      });
    });

    // Append the anchor to the list item
    listItem.appendChild(anchor);

    // Append the list item to the nav list
    fragment.appendChild(listItem);
  });

  navList.appendChild(fragment);

  // Function to change sections state
  function makeActive() {
    sections.forEach((section) => {
      const box = section.getBoundingClientRect();
      if (box.top <= 150 && box.bottom >= 150) {
        section.classList.add("your-active-class");
        const activeLink = document.querySelector(`a[href="#${section.id}"]`);
        if (activeLink) {
          activeLink.classList.add("active-link");
        }
      } else {
        section.classList.remove("your-active-class");
        const inactiveLink = document.querySelector(`a[href="#${section.id}"]`);
        if (inactiveLink) {
          inactiveLink.classList.remove("active-link");
        }
      }
    });
  }

  // Make sections active on scroll
  document.addEventListener("scroll", () => {
    makeActive();
  });

  // Measure the performance end time
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: ${executionTime.toFixed(2)} milliseconds`);

  // call makeActive
  makeActive();
});

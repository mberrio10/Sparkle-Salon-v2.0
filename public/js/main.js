document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navigation__nav");
  const headerBg = document.querySelector(".header__background");
  const featuresBg = document.querySelector(".features-section__background");
  const hairBg = document.querySelector(".hair-banner__background");

  if (!navbar && !headerBg && !hairBg && !featuresBg) return;

  let lastScrollTop = 0;
  let ticking = false;

  function handlerScroll() {
    const scrollY = window.scrollY;

    // 🔺 Navbar scroll behavior
    if (scrollY > lastScrollTop) {
      // Scrolling down
      navbar.classList.add("navigation__nav--hidden");
      navbar.classList.remove("navigation__nav--scrolled");
    } else {
      // Scrolling up
      navbar.classList.remove("navigation__nav--hidden");
      if (scrollY > 5) {
        navbar.classList.add("navigation__nav--scrolled"); // drop shadow appears
      } else {
        navbar.classList.remove("navigation__nav--scrolled"); // remove shadow at top
      }
    }
    lastScrollTop = Math.max(scrollY, 0);

    // 🌁 Header parallax and blur
    const offset = scrollY * 0.3;
    const blur = Math.min(scrollY * 0.02, 6); // Limit blur to a maximum of 6px

    if (headerBg) {
      headerBg.style.transform = `translateY(${offset}px)`;
      headerBg.style.filter = `blur(${blur}px)`;
    }

    // 🌈 Hair banner parallax effect
    if (hairBg) {
      hairBg.style.transform = `translateY(${offset}px)`;
    }

    // 🌟 Features section parallax effect
    if (featuresBg) {
      const rect = featuresBg.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (rect.top < viewHeight && rect.bottom > 0) {
        const percentVisible = 1 - rect.top / viewHeight;
        const offset = percentVisible * 100;
        const scale = 1 + percentVisible * 0.05;

        featuresBg.style.transform = `translateY(${offset}px) scale(${scale})`;
      } else {
        featuresBg.style.transform = `translateY(0px)`; // Reset if out of view
      }
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(handlerScroll);
      ticking = true;
    }
  });
});

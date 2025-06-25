document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navigation__nav");
  const headerBg = document.querySelector(".header__background");

  if (!navbar || !headerBg) return;

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
    headerBg.style.transform = `translateY(${offset}px)`;
    headerBg.style.filter = `blur(${blur}px)`;

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(handlerScroll);
      ticking = true;
    }
  });
});

console.log("🔥 main.js is connected!");

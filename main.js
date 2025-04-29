const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  $("[data-lenis-start]").on("click", function() {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function() {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function() {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  window.onload = function() {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  };
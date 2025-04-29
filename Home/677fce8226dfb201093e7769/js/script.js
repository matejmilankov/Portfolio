function disableScroll() {
  lenis.stop();
}
function enableScroll() {
  lenis.start();
}

disableScroll();
let mm = gsap.matchMedia();
mm.add({
  isMobile: "(max-width: 991px)",
  isDesktop: "(min-width: 991px)"
}, (context) => {
  let {
    isMobile,
    isDesktop
  } = context.conditions;
  gsap.to(".blur", {
    duration: 2,
    delay: 0.5,
    width: "0%",
    ease: Expo.easeInOut
  });
  gsap.from(".is-scale", {
    scale: "2",
    duration: 2,
    ease: Expo.easeInOut
  }, "<");
  gsap.from(".svg-logo > path", {
    duration: 1,
    opacity: 0,
    stagger: {
      amount: 1,
      from: "end"
    },
    ease: Power2.easeOut,
    y: "100"
  }, ">-0.8");
  gsap.from(".is-stagger", {
    duration: 1,
    opacity: 0,
    ease: Power2.easeOut,
    y: "80",
    stagger: isMobile ? {
      each: 0.5,
      from: "end"
    } : {
      each: 0.2
    }
  }, "< 0.5");
  gsap.from(".is-animated", {
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
    onComplete: enableScroll
  }, ">-1.5");
});

window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
  });
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 90%",
      onEnter: () => timeline.play(),
    });
  }
  $("[letters-slide-up]").each(function(index) {
    let tl = gsap.timeline({
      paused: true
    });
    tl.from($(this).find(".char"), {
      yPercent: 100,
      duration: 0.5,
      stagger: {
        amount: 0.5
      },
    });
    createScrollTrigger($(this), tl);
  });
  // Avoid flash of unstyled content
  gsap.set("[text-split]", {
    opacity: 1
  });
});

let counter2 = document.querySelector(".counter-2");
let counterIndex = 0;

function animate(counter, duration, reverse = false) {
  const numHeight = counter.querySelector(".number").clientHeight;

  if (!reverse && counterIndex > 0) {
    gsap.to(counter, {
      duration: duration,
      y: -numHeight * counterIndex, 
      ease: "expo.out"
    });
  } else if (reverse && counterIndex > 1) {
    gsap.to(counter, {
      duration: duration,
      y: -numHeight * (counterIndex - 2), 
      ease: "expo.out"
    });
  }

  if (!reverse) {
    counterIndex++; 
  } else if (counterIndex > 0) {
    counterIndex--; 
  }
}

$(".work-wrap").each(function (index) {
  let childTriggers = $(this).find(".work-layout");

  childTriggers.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "top center",
      onEnter: () => {
        animate(counter2, 1.5);
      },
      onEnterBack: () => {
        animate(counter2, 1.5, true);
      }
    });
  });
});

let paragraph = document.querySelector(".split-word");
let spans = [];
let htmlString = "";
let pArray = paragraph.textContent.split("");
for (let i = 0; i < pArray.length; i++) {
  htmlString += `<span class="spec-span">${pArray[i]}</span>`;
}

paragraph.innerHTML = htmlString;
spans = [...document.querySelectorAll(".spec-span")];

function revealSpans() {
  for (let i = 0; i < spans.length; i++) {
    let {left,top} = spans[i].getBoundingClientRect();
    top = top - window.innerHeight * 0.6;
    let opacityValue = 1 - (top * 0.01 + left * 0.001) < 0.1 ? 0.1 : 1 - (top * 0.01 + left * 0.001).toFixed(3);
    opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3);
    spans[i].style.opacity = opacityValue;
  }
}
window.addEventListener("scroll", () => {
  revealSpans();
})

new CircleType(document.getElementById("brandingText"));


gsap.to(".transition-content", {
  width: "0%",
  duration: 0.8,
  onComplete: () => {
    gsap.set(".transition-content", {
      display: "none"
    });
  }
});
$(document).ready(function() {
  $("a").on("click", function(e) {
    if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".transition-content", {
        display: "block"
      });
      gsap.fromTo(".transition-content", {
        width: "0%",
      }, {
        width: "100%",
        duration: 0.8,
        onComplete: () => {
          window.location = destination;
        }
      });
    }
  });
});
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload();
  }
}
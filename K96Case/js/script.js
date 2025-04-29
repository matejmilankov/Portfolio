      $(".main-text-wrap").each(function(index) {
        let childTriggers = $(this).find(".main-content");
        let childTargets = $(this).find(".heading-wrap");
        let secondTarget = $(this).find(".sticky-dot-wrap");

        function makeItemActive(index) {
          childTriggers.removeClass("is-c-white");
          childTargets.removeClass("is-c-white");
          secondTarget.removeClass("width-auto");
          secondTarget.eq(index).addClass("width-auto");
          childTriggers.eq(index).addClass("is-c-white");
          childTargets.eq(index).addClass("is-c-white");
        }
        childTriggers.each(function(index) {
          ScrollTrigger.create({
            trigger: $(this),
            start: "top 70%",
            end: "bottom 70%",
            onToggle: (isActive) => {
              if (isActive) {
                makeItemActive(index);
              }
            }
          })
        });
      });



      let typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span",
      });
      let mm = gsap.matchMedia();
      gsap.set(".transition-content", {
        left: "auto"
      });
      gsap.to(".transition-content", {
        width: "0%",
        duration: 0.8,
        onComplete: () => {
          gsap.set(".project-info, .back-btn-circle, .nav-wrap, .main-rpject-heading", {
            opacity: 1
          });
          gsap.set(".transition-content", {
            display: "none"
          });
          mm.add({
            isMobile: "(max-width: 991px)",
            isDeksktop: "(min-width: 991px)"
          }, (context) => {
            let {
              isMobile,
              isDesktop
            } = context.conditions;
            let animationProps = isMobile ? {
              x: "-100%"
            } : {
              y: "-100%"
            };
            gsap.from(".char", {
              duration: 0.5,
              opacity: 0,
              stagger: {
                amount: 0.5
              },
              ease: Power2.easeOut,
              y: "100"
            });
            gsap.from(".project-info", {
              duration: 0.8,
              opacity: 0,
              ease: Power2.easeInOut,
              y: "80",
              stagger: {
                amount: 0.5
              }
            });
            gsap.to(".laptop-cover", {
              ...animationProps,
              duration: 0.8,
              ease: Expo.easeInOut
            });
            gsap.from(".back-btn-circle, .nav-wrap", {
              opacity: 0,
              duration: 1,
              ease: Expo.easeInOut
            }, ">");
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

function calcHeight() {
  let target = document.querySelector(".sticky-headings-wrap");
  let targetHeight = target.clientHeight;
  let root = document.querySelector(":root");
  root.style.setProperty('--element-height', `${targetHeight}px`);
}

window.addEventListener("DOMContentLoaded", () => {
  calcHeight();
})
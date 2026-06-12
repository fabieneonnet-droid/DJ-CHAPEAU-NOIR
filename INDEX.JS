//ANIMATION LOGO//

document.addEventListener("DOMContentLoaded", () => {
  const dj = document.getElementById("dj");
  const name = document.getElementById("name");
  const animation = document.getElementById("animation");

  function typeText(target, text, speed, callback) {
    let i = 0;

    function step() {
      if (i >= text.length) {
        if (callback) callback();
        return;
      }
      const span = document.createElement("span");
      span.textContent = text[i];
      target.appendChild(span);
      i++;
      setTimeout(step, speed);
    }
    step();
  }

  typeText(dj, "DJ", 150, () => {
    setTimeout(() => {
      typeText(name, "Chapeau-noir", 120, () => {
        setTimeout(() => {
          typeText(animation, "Animation", 20);
        }, 50);
      });
    }, 300);
  });
});
//---------------------------------------------------------------
//---PRESTATION---//
const image1 = document.querySelector("#mariage");
const image2 = document.querySelector("#anniversaire");
const image3 = document.querySelector("soiree");
const image4 = document.querySelector("karaoke");

let playOne = true;
// console.log(image1);
window.addEventListener("scroll", () => {
  if (image1) {
    let scrollValue =
      (window.scrollY + window.innerHeight) / document.body.offsetHeight;

    if (scrollValue > 0.7) {
      image1.style.opacity = 1;
      image2.style.opacity = 1;
      image3.style.opacity = 1;
      image4.style.opacity = 1;
      playOne = false;
    }
  }
});

//--------------------------------------------------------------

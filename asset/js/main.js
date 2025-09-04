const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });


//index top bar text animation

const container = document.getElementById("cubeContainer");
    const words = ["Innovate the Future", "AI-Powered Solutions", "Seamless Automation", "Precision Engineering", "Creative Electronics", "Reliable Designs"];
    let currentIndex = 0;

    function nextFlip() {
      // Set the next 4 faces in sequence
      const f1 = words[currentIndex % 6];
      const f2 = words[(currentIndex + 1) % 6];
      const f3 = words[(currentIndex + 2) % 6];
      const f4 = words[(currentIndex + 3) % 6];

      container.querySelector('.face-1').textContent = f1;
      container.querySelector('.face-2').textContent = f2;
      container.querySelector('.face-3').textContent = f3;
      container.querySelector('.face-4').textContent = f4;

      // Reset transform
      container.style.transition = 'none';
      container.style.transform = 'rotateX(0deg)';
      void container.offsetWidth; // Force reflow

      // Animate to +90deg (X-axis rotation for upward movement)
      container.style.transition = 'transform 0.8s ease-in-out';
      container.style.transform = 'rotateX(90deg)';

      // Move to next word
      currentIndex = (currentIndex + 1) % 6;

      // Repeat
      setTimeout(nextFlip, 4200);
    }

    // Start
    setTimeout(nextFlip, 400);





//index top bar image animation

(function () {
  const slides = document.querySelectorAll('#image-slider-right .slide');
  if (!slides.length) return;

  let current = 0;
  slides[current].classList.add('active');

  function nextSlide() {
    const curEl = slides[current];
    const next = (current + 1) % slides.length;
    const nxtEl = slides[next];

    // Mark current as exiting
    curEl.classList.remove('active');
    curEl.classList.add('exit');

    // Trigger next as active
    nxtEl.classList.add('active');

    // After transition, cleanup exit class
    setTimeout(() => {
      curEl.classList.remove('exit');
    }, 400); // same as CSS duration

    current = next;
  }

  setInterval(nextSlide, 4200); // 2s visible + 0.7s transition
})();




//carousol slider under the banner
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.getElementById('carousel-track');

  if (!viewport || !track) return;

  // Collect original items
  let originals = Array.from(track.children);
  const N = originals.length;
  const V = 3; // visible count (3 as you wanted)

  if (N === 0) return;

  // Clone last V and prepend, clone first V and append for infinite loop
  for (let i = N - V; i < N; i++) {
    const clone = originals[i].cloneNode(true);
    clone.classList.add('is-clone');
    track.insertBefore(clone, track.firstChild);
  }
  for (let i = 0; i < V; i++) {
    const clone = originals[i].cloneNode(true);
    clone.classList.add('is-clone');
    track.appendChild(clone);
  }

  // Update items list (now includes clones)
  let items = Array.from(track.children);
  let index = V; // start at first original (because we prepended V clones)
  let autoTimer = null;
  let slideWidth = 0;

  // compute px gap
  function getGapPx() {
    const gapStr = getComputedStyle(track).gap;
    return gapStr ? parseFloat(gapStr) : 0;
  }

  // set sizes and initial position
  function setSizes() {
    // ensure each item has correct width (flex basis already set with CSS calc)
    // compute the slide width as item bounding + gap
    const firstItem = items[0];
    if (!firstItem) return;
    const gapPx = getGapPx();
    slideWidth = firstItem.getBoundingClientRect().width + gapPx;
    // place track to show the correct index
    track.style.transition = 'none';
    track.style.transform = `translateX(${-index * slideWidth}px)`;
  }

  // call once, and after a short timeout (images may change size)
  setSizes();
  window.addEventListener('load', () => setTimeout(setSizes, 50));
  window.addEventListener('resize', () => { setTimeout(setSizes, 80); });

  // move one step in given direction (1 = next, -1 = prev)
  function moveSlide(direction = 1) {
    index += direction;
    track.style.transition = 'transform 700ms ease-in-out';
    track.style.transform = `translateX(${-index * slideWidth}px)`;

    // handle forward wrap
    if (index >= N + V) {
      track.addEventListener('transitionend', function forwardReset() {
        track.removeEventListener('transitionend', forwardReset);
        track.style.transition = 'none';
        index = index - N; // wrap back into originals
        track.style.transform = `translateX(${-index * slideWidth}px)`;
      });
    }

    // handle backward wrap
    if (index < V) {
      track.addEventListener('transitionend', function backReset() {
        track.removeEventListener('transitionend', backReset);
        track.style.transition = 'none';
        index = index + N; // wrap to the original block
        track.style.transform = `translateX(${-index * slideWidth}px)`;
      });
    }
  }

  // auto-start/stop
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => moveSlide(1), 2500);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }

  // pointer (drag/hold) support
  let isPointerDown = false;
  let startX = 0;
  let prevTranslate = 0;

  viewport.addEventListener('pointerdown', (e) => {
    // user starts hold/drag; stop auto slide but do not pause on hover
    isPointerDown = true;
    startX = e.clientX;
    prevTranslate = -index * slideWidth;
    stopAuto();
    // capture pointer so we get pointerup outside viewport
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    const dx = e.clientX - startX;
    track.style.transition = 'none';
    track.style.transform = `translateX(${prevTranslate + dx}px)`;
  });

  function endPointer(e) {
    if (!isPointerDown) return;
    isPointerDown = false;
    const dx = e.clientX - startX;
    // threshold to decide slide
    const threshold = Math.max(50, slideWidth * 0.15);
    if (dx < -threshold) {
      // user dragged left -> next
      moveSlide(1);
    } else if (dx > threshold) {
      // user dragged right -> prev
      moveSlide(-1);
    } else {
      // snap back
      track.style.transition = 'transform 300ms ease-in-out';
      track.style.transform = `translateX(${-index * slideWidth}px)`;
    }
    startAuto();
  }

  viewport.addEventListener('pointerup', endPointer);
  viewport.addEventListener('pointercancel', endPointer);
  viewport.addEventListener('pointerleave', (e) => {
    // If pointer leaves while down, treat as end
    if (isPointerDown) endPointer(e);
  });

  // Start auto-sliding
  startAuto();
});
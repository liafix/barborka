/* An interactive little thank-you. Works offline without libraries. */
(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const scenes = [...document.querySelectorAll('[data-scene]')];
  const nextButtons = [...document.querySelectorAll('.js-next')];
  const backButton = document.getElementById('back-control');
  const currentStep = document.getElementById('current-step');
  const progress = document.getElementById('story-progress');
  const dots = [...progress.querySelectorAll('.story-progress__dot')];
  const announcement = document.getElementById('scene-announcement');
  const giftStage = document.getElementById('gift-stage');
  const giftTrigger = document.getElementById('gift-trigger');
  const giftReveal = document.getElementById('gift-reveal');
  const giftNext = document.getElementById('gift-next');
  const giftBurst = document.getElementById('gift-burst');
  const restartButton = document.getElementById('restart-story');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let current = 0;
  let giftOpened = false;
  let inTransition = false;

  // Inactive scenes do not receive keyboard focus or accessibility navigation.
  scenes.forEach((scene, index) => {
    scene.inert = index !== 0;
    scene.setAttribute('aria-hidden', String(index !== 0));
  });

  function updateNavigation() {
    currentStep.textContent = String(current + 1).padStart(2, '0');
    progress.setAttribute('aria-valuenow', String(current + 1));
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-current', index === current);
      dot.classList.toggle('is-complete', index < current);
    });
    backButton.hidden = current === 0;
  }

  function activateScene(target, options = {}) {
    if (!Number.isInteger(target) || target < 0 || target >= scenes.length || target === current || inTransition) return;
    // The next chapter must not reveal the secret before the gift is opened.
    if (target === 4 && !giftOpened) return;

    const previouslyActive = scenes[current];
    const next = scenes[target];
    const movingForward = target > current;
    const originalFocus = document.activeElement;
    if (originalFocus instanceof HTMLElement && previouslyActive.contains(originalFocus)) originalFocus.blur();

    inTransition = true;
    previouslyActive.classList.remove('is-active');
    previouslyActive.classList.add('is-exiting');
    previouslyActive.inert = true;
    previouslyActive.setAttribute('aria-hidden', 'true');

    next.classList.add('is-active');
    next.classList.remove('is-exiting');
    next.inert = false;
    next.setAttribute('aria-hidden', 'false');
    next.scrollTop = 0;
    current = target;
    updateNavigation();

    const heading = next.querySelector('h1,h2');
    announcement.textContent = `Časť ${current + 1} z 5. ${heading ? heading.textContent.trim() : ''}`;
    // Focus follows the scene instead of remaining on an invisible button.
    if (heading && !options.silentFocus) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({preventScroll: true});
    }

    window.setTimeout(() => {
      previouslyActive.classList.remove('is-exiting');
      inTransition = false;
    }, reducedMotion.matches ? 20 : 760);
  }

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const destination = Number(button.dataset.next);
      activateScene(destination);
    });
  });

  backButton.addEventListener('click', () => activateScene(current - 1));
  restartButton.addEventListener('click', () => {
    // The present can stay opened when the visitor navigates backwards; restart resets it.
    resetGift();
    activateScene(0);
  });

  const particles = [
    [-154,-116,-19,'♡'],[-111,-180,35,'✦'],[-39,-204,-38,'♡'],[49,-192,21,'✳'],[136,-149,-14,'♡'],
    [186,-72,30,'✦'],[177,22,-45,'♡'],[126,110,38,'✧'],[37,149,23,'♡'],[-52,136,-35,'✳'],
    [-144,82,55,'♡'],[-191,-10,-27,'✧'],[13,-126,38,'♥'],[-22,88,-15,'♡']
  ];

  function burstHearts() {
    giftBurst.replaceChildren();
    if (reducedMotion.matches) return;
    const palette = ['#de739e','#efb3c7','#f4a6ba','#c57a9b'];
    const fragment = document.createDocumentFragment();
    particles.forEach(([x,y,rot,glyph], index) => {
      const particle = document.createElement('span');
      particle.className = 'gift-burst__particle';
      particle.textContent = glyph;
      particle.style.setProperty('--tx', `${x}px`);
      particle.style.setProperty('--ty', `${y}px`);
      particle.style.setProperty('--rotation', `${rot}deg`);
      particle.style.setProperty('--particle-color', palette[index % palette.length]);
      particle.style.setProperty('--scale', String(.75 + (index % 3) * .26));
      particle.style.setProperty('--delay', `${(index % 4) * 40}ms`);
      fragment.appendChild(particle);
    });
    giftBurst.appendChild(fragment);
    giftBurst.classList.remove('is-bursting');
    // Force the animation to start from the beginning on each reset.
    void giftBurst.offsetWidth;
    giftBurst.classList.add('is-bursting');
  }

  giftTrigger.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;
    giftStage.classList.add('is-open');
    giftTrigger.setAttribute('aria-expanded', 'true');
    giftTrigger.disabled = true;
    giftTrigger.setAttribute('aria-label', 'Darček je otvorený');
    giftReveal.hidden = false;
    giftNext.hidden = false;
    burstHearts();
    requestAnimationFrame(() => giftReveal.classList.add('is-visible'));
    announcement.textContent = 'Mám pre teba jedno prekvapenie. Ale to ti ukážem až osobne.';
    window.setTimeout(() => {
      if (current === 3 && giftOpened) giftNext.focus({preventScroll: true});
    }, reducedMotion.matches ? 30 : 1050);
  });

  function resetGift() {
    giftOpened = false;
    giftStage.classList.remove('is-open');
    giftBurst.classList.remove('is-bursting');
    giftBurst.replaceChildren();
    giftReveal.classList.remove('is-visible');
    giftReveal.hidden = true;
    giftNext.hidden = true;
    giftTrigger.disabled = false;
    giftTrigger.setAttribute('aria-expanded', 'false');
    giftTrigger.setAttribute('aria-label', 'Otvoriť prekvapenie');
  }

  // If JS has loaded successfully, the first screen gets an accessible label.
  updateNavigation();
})();

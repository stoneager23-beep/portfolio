import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const headingSelector = '.section-badge, .section-heading, .section-title, .section-subtitle';
const cardSelector = '.project-card, .skill-card, .timeline-item, .terminal-panel, .portrait-column, .filter-bar';

export default function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll(`${headingSelector}, ${cardSelector}`);

    if (reducedMotion) {
      revealTargets.forEach((element) => {
        element.style.opacity = '';
        element.style.transform = '';
        element.classList.add('is-revealed');
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray(headingSelector).forEach((element) => {
        if (element.closest('#hero')) return;

        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray(cardSelector).forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            delay: (index % 3) * 0.045,
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    }, document.body);

    return () => ctx.revert();
  }, []);

  return null;
}

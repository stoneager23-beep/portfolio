import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const createIntroDots = (count, compact) => {
  const targetX = compact ? 50 : 68;
  const targetY = compact ? 37 : 48;

  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index * 12.9898) * 43758.5453;
    const seed = wave - Math.floor(wave);
    const x = 8 + ((index * 17 + seed * 43) % 86);
    const y = 12 + ((index * 29 + seed * 37) % 72);
    const size = 2 + ((index + Math.floor(seed * 10)) % 3);

    return {
      id: index,
      x,
      y,
      size,
      tx: targetX - x,
      ty: targetY - y,
      delay: (index % 11) * 0.045,
      duration: 1.5 + (index % 5) * 0.12,
    };
  });
};

export default function CinematicIntro({ compact = false }) {
  const layerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const dots = useMemo(() => createIntroDots(compact ? 24 : 46, compact), [compact]);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = layer?.closest('.hero-section');
    if (!hero) return undefined;

    hero.classList.add('hero-intro-pending');
    hero.classList.remove('hero-intro-complete');

    const revealTargets = hero.querySelectorAll(
      '.hero-badge, .hero-title-line1, .hero-title-line2, .hero-role, .hero-tagline, .hero-actions, .hero-marquee, .scroll-indicator',
    );

    let fallbackTimer;

    const finishIntro = () => {
      hero.classList.remove('hero-intro-pending');
      hero.classList.add('hero-intro-complete');
    };

    if (prefersReducedMotion) {
      gsap.set(revealTargets, { clearProps: 'all', autoAlpha: 1, y: 0 });
      gsap.set(layer, { autoAlpha: 0 });
      finishIntro();
      return undefined;
    }

    const ctx = gsap.context(() => {
      const introDuration = compact ? 2.25 : 3;
      const titleStart = compact ? 0.78 : 1.55;

      gsap.set(revealTargets, { autoAlpha: 0, y: 30 });
      gsap.set('.hero-visual-inner', { autoAlpha: 0, scale: compact ? 0.96 : 0.86, y: compact ? 8 : 20 });
      gsap.set(layer, { autoAlpha: 1 });

      const forceCompleteIntro = () => {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
        gsap.set('.hero-visual-inner', { autoAlpha: compact ? 0.6 : 1, scale: 1, y: 0 });
        gsap.set('.scroll-indicator', { autoAlpha: 0.34, y: 0 });
        gsap.set(layer, { autoAlpha: 0 });
        finishIntro();
      };

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          window.clearTimeout(fallbackTimer);
          finishIntro();
        },
      });

      fallbackTimer = window.setTimeout(forceCompleteIntro, compact ? 3200 : 4400);

      timeline
        .fromTo(
          '.intro-grid',
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 0.78, scale: 1, duration: 0.9 },
          0,
        )
        .fromTo(
          '.intro-dot',
          { autoAlpha: 0, scale: 0.55 },
          {
            autoAlpha: compact ? 0.45 : 0.8,
            scale: 1,
            duration: 0.7,
            stagger: { amount: compact ? 0.45 : 0.7, from: 'random' },
          },
          0.08,
        )
        .fromTo(
          '.intro-core-glow',
          { autoAlpha: 0, scale: 0.42 },
          { autoAlpha: compact ? 0.34 : 0.56, scale: 1, duration: 1.3 },
          compact ? 0.34 : 0.55,
        )
        .to(
          '.intro-dot',
          {
            x: (_, dot) => dot.style.getPropertyValue('--tx'),
            y: (_, dot) => dot.style.getPropertyValue('--ty'),
            autoAlpha: compact ? 0.24 : 0.36,
            scale: 0.35,
            duration: compact ? 1.25 : 1.75,
            stagger: { amount: compact ? 0.3 : 0.48, from: 'center' },
            ease: 'expo.inOut',
          },
          compact ? 0.42 : 0.58,
        )
        .to(
          '.hero-visual-inner',
          {
            autoAlpha: compact ? 0.6 : 1,
            scale: 1,
            y: 0,
            duration: compact ? 1.1 : 1.55,
            ease: 'expo.out',
          },
          compact ? 0.58 : 0.92,
        )
        .fromTo(
          '.hero-title-line1',
          { autoAlpha: 0, y: 48, filter: 'blur(12px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.85 },
          titleStart,
        )
        .fromTo(
          '.hero-title-line2',
          { autoAlpha: 0, y: 36, filter: 'blur(10px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          titleStart + 0.32,
        )
        .to(
          '.hero-badge',
          { autoAlpha: 1, y: 0, duration: 0.58 },
          titleStart + 0.1,
        )
        .to(
          '.hero-role',
          { autoAlpha: 1, y: 0, duration: 0.58 },
          titleStart + 0.64,
        )
        .to(
          '.hero-tagline',
          { autoAlpha: 1, y: 0, duration: 0.58 },
          titleStart + 0.82,
        )
        .to(
          '.hero-actions',
          { autoAlpha: 1, y: 0, duration: 0.62 },
          titleStart + 1.02,
        )
        .to(
          '.hero-marquee',
          { autoAlpha: 1, y: 0, duration: 0.65 },
          titleStart + 1.18,
        )
        .to(
          '.scroll-indicator',
          { autoAlpha: 0.34, y: 0, duration: 0.5 },
          titleStart + 1.36,
        )
        .to(
          layer,
          { autoAlpha: 0, duration: 0.9, ease: 'power2.inOut' },
          introDuration - 0.55,
        );
    }, hero);

    return () => {
      window.clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, [compact, prefersReducedMotion]);

  return (
    <div ref={layerRef} className="cinematic-intro-layer" aria-hidden="true">
      <div className="intro-grid" />
      <div className="intro-vignette" />
      <div className="intro-core-glow" />
      <div className="intro-particle-field">
        {dots.map((dot) => (
          <span
            key={dot.id}
            className="intro-dot"
            style={{
              left: `${dot.x}vw`,
              top: `${dot.y}vh`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              '--tx': `${dot.tx}vw`,
              '--ty': `${dot.ty}vh`,
              '--intro-delay': `${dot.delay}s`,
              '--intro-duration': `${dot.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

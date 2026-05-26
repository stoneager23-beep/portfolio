import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import ScrollReveal from './components/animations/ScrollReveal';
import './index.css';

function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 18000);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.3,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.05,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.fill();
                if (!reducedMotion) {
                    p.x += p.speedX;
                    p.y += p.speedY;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                }
            });
            if (!reducedMotion) {
                animationId = requestAnimationFrame(draw);
            }
        };

        resize();
        createParticles();
        draw();

        const handleResize = () => {
            resize();
            createParticles();
            cancelAnimationFrame(animationId);
            draw();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} id="particle-canvas" />;
}

function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ height: `${progress}%` }} />
        </div>
    );
}

function App() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
            <ScrollReveal />
            <ParticleCanvas />
            <ProgressBar />
            <Header />
            <main style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
            </main>
            <Footer />
        </div>
    );
}

export default App;

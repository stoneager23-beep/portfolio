import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import './index.css';

function App() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1, // Trigger when 10% of element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    // Optional: Stop observing once revealed so it doesn't repeat
                    // observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Select all elements with the reveal class
        const revealElements = document.querySelectorAll('.reveal-on-scroll, section, .glass-card, .timeline-item');

        revealElements.forEach(el => {
            // Only add observer if it doesn't already have the initial class to prevent duplicates
            if (!el.classList.contains('reveal-on-scroll')) {
                el.classList.add('reveal-on-scroll');
            }
            observer.observe(el);
        });

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden bg-mesh">
            <Header />
            <main className="flex-1 w-full">
                <Hero />
                <About />
                <Projects />
                <Experience />
            </main>
            <Footer />
        </div>
    );
}

export default App;

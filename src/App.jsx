import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import './index.css';

function App() {
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

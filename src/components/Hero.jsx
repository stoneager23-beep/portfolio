import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-glow"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <span className="badge">Video Editor & Motion Designer</span>
          <h1 className="title">
            Hi, I'm <span className="text-gradient">Husnain Faisal</span>. <br />
            I Create <span className="highlight">Visual Stories</span> & <span className="highlight">Web Apps</span>.
          </h1>
          <p className="subtitle">
            Creative Video Editor & Motion Graphics Designer with a strong technical background in Web Development.
            Blending cinematic storytelling with robust code.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work <ArrowRight size={20} />
            </a>
            <a href="/resume.pdf" download="resume.pdf" className="btn btn-outline">
              Download CV <Download size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-circle"></div>
          <div className="visual-glass-card">
            <div className="code-snippet">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
              <code>
                <span className="purple">const</span> <span className="blue">creator</span> = {'{'} <br />
                &nbsp;&nbsp;name: <span className="green">'Husnain'</span>,<br />
                &nbsp;&nbsp;tools: [<span className="green">'Premiere'</span>, <span className="green">'Laravel'</span>]<br />
                {'}'};
              </code>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px; /* Navbar height */
          overflow: hidden;
        }

        .hero-bg-glow {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          background: var(--gradient-glow);
          filter: blur(100px);
          opacity: 0.5;
          z-index: -1;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          color: var(--color-primary);
          border-radius: 50px;
          border: 1px solid rgba(99, 102, 241, 0.2);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .subtitle {
          font-size: 1.125rem;
          color: var(--color-text-muted);
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        
        .btn-primary:hover {
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--color-text-muted);
          color: var(--color-text-main);
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--color-text-main);
        }

        /* Visual */
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-circle {
          position: absolute;
          width: 300px;
          height: 300px;
          background: var(--gradient-main);
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: float 6s ease-in-out infinite;
        }

        .visual-glass-card {
          position: relative;
          width: 320px;
          padding: 2rem;
          background: rgba(23, 23, 23, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          transform: rotate(-5deg);
          transition: transform 0.3s ease;
        }
        
        .visual-glass-card:hover {
          transform: rotate(0deg) scale(1.05);
        }

        .code-snippet {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
          margin-bottom: 1rem;
        }
        .red { background: #ef4444; }
        .yellow { background: #eab308; }
        .green { background: #22c55e; }

        .purple { color: #c084fc; }
        .blue { color: #60a5fa; }
        .green { color: #4ade80; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-bg-glow {
            width: 100vw;
            height: 50vh;
            top: 0;
            right: 0;
          }
           .hero-actions {
             justify-content: center;
           }
           .subtitle {
             margin: 0 auto 2.5rem;
           }
           .title {
             font-size: 2.5rem;
           }
        }
      `}</style>
    </section>
  );
};

export default Hero;

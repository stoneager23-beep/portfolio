import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="glass-card contact-card">
          <h2 className="section-title text-center">Let's Work <span className="text-gradient">Together</span></h2>
          <p className="contact-text text-center">
            Currently available for freelance projects and open to full-time opportunities.
          </p>

          <a href="mailto:stoneager23@gmail.com" className="email-btn text-gradient">
            <Mail size={24} /> stoneager23@gmail.com
          </a>

          <div className="contact-info-block">
            <p>📍 Lahore, Pakistan</p>
            <p>📞 0302-4149916</p>
          </div>

          <div className="social-links">
            <a href="https://github.com/stoneager23-beep/factory-management-system" className="social-icon"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/husnain-faisal-530009216/" className="social-icon"><Linkedin size={24} /></a>
            {/* <a href="#" className="social-icon"><Twitter size={24} /></a> */}
          </div>
        </div>

        <footer className="footer text-center">
          <p>© {new Date().getFullYear()} Portfolio. Built with React & Vite.</p>
        </footer>
      </div>

      <style>{`
        .contact-section {
          padding-bottom: 2rem;
        }
        .contact-card {
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 4rem;
          background: linear-gradient(180deg, var(--glass-bg) 0%, rgba(99, 102, 241, 0.05) 100%);
        }

        .contact-text {
          font-size: 1.1rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin-bottom: 2.5rem;
        }

        .email-btn {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          transition: transform 0.2s ease;
        }

        .email-btn:hover {
          transform: scale(1.05);
        }

        .contact-info-block {
          margin-bottom: 2rem;
          color: var(--color-text-main);
          font-size: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-main);
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon:hover {
          background: var(--color-primary);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
        }

        .footer {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 2rem;
        }
      `}</style>
    </section>
  );
};

export default Contact;

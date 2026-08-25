import React, { useEffect, useState } from 'react';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
  const [previewDoc, setPreviewDoc] = useState(null); // null | 'ats' | 'designed'

  const atsResumeUrl = `${import.meta.env.BASE_URL}Husnain_Faisal_Resume_Premium.pdf`;
  const designedResumeUrl = `${import.meta.env.BASE_URL}Husnain_Faisal_Resume_Designed.pdf`;

  // Reset preview mode when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPreviewDoc(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (previewDoc) {
          setPreviewDoc(null); // Escape backs out to selection first
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, previewDoc]);

  if (!isOpen) return null;

  const currentPreviewData = previewDoc === 'ats' 
    ? {
        title: 'ATS-Friendly / Recruiter CV',
        url: atsResumeUrl,
        downloadName: 'Husnain_Faisal_Resume_Premium.pdf',
        badge: 'ATS OPTIMIZED',
        badgeClass: 'ats-badge',
        otherKey: 'designed',
        otherLabel: 'Switch to Designed CV'
      }
    : previewDoc === 'designed'
    ? {
        title: 'Visual & Designed CV',
        url: designedResumeUrl,
        downloadName: 'Husnain_Faisal_Resume_Designed.pdf',
        badge: 'CREATIVE EDITION',
        badgeClass: 'designed-badge',
        otherKey: 'ats',
        otherLabel: 'Switch to ATS CV'
      }
    : null;

  return (
    <div className="resume-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
      <div 
        className={`resume-modal-container ${previewDoc ? 'preview-mode' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background inside modal */}
        <div className="modal-ambient-glow" aria-hidden="true" />

        {/* Close Button */}
        <button className="resume-modal-close" onClick={onClose} aria-label="Close modal">
          <span className="material-symbols-outlined">close</span>
        </button>

        {previewDoc && currentPreviewData ? (
          /* ================= LIVE PREVIEW VIEW ================= */
          <div className="resume-preview-wrapper">
            <div className="preview-top-bar">
              <div className="preview-left-controls">
                <button 
                  type="button" 
                  className="preview-back-btn" 
                  onClick={() => setPreviewDoc(null)}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>Back to Selection</span>
                </button>

                <div className="preview-doc-meta">
                  <h3 className="preview-doc-title">{currentPreviewData.title}</h3>
                  <span className={`card-badge ${currentPreviewData.badgeClass} preview-inline-badge`}>
                    {currentPreviewData.badge}
                  </span>
                </div>
              </div>

              <div className="preview-right-controls">
                <button 
                  type="button"
                  className="preview-switch-btn"
                  onClick={() => setPreviewDoc(currentPreviewData.otherKey)}
                  title="Switch preview to other format"
                >
                  <span className="material-symbols-outlined text-sm">sync_alt</span>
                  <span>{currentPreviewData.otherLabel}</span>
                </button>

                <a
                  href={currentPreviewData.url}
                  download={currentPreviewData.downloadName}
                  className="resume-btn primary-resume-btn preview-download-btn"
                >
                  <span className="material-symbols-outlined">download</span>
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Embedded Live PDF Document */}
            <div className="pdf-frame-container">
              <object
                data={`${currentPreviewData.url}#view=FitH&toolbar=1&navpanes=0`}
                type="application/pdf"
                className="pdf-embed-object"
              >
                {/* Fallback iframe */}
                <iframe
                  src={`${currentPreviewData.url}#view=FitH`}
                  title={currentPreviewData.title}
                  className="pdf-embed-iframe"
                >
                  <div className="pdf-fallback-message">
                    <p>Your browser cannot render the PDF preview directly inline.</p>
                    <a
                      href={currentPreviewData.url}
                      download={currentPreviewData.downloadName}
                      className="resume-btn primary-resume-btn"
                    >
                      <span className="material-symbols-outlined">download</span> Download PDF
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </div>
        ) : (
          /* ================= SELECTION VIEW ================= */
          <>
            {/* Modal Header */}
            <div className="resume-modal-header">
              <div className="resume-modal-eyebrow">
                <span className="eyebrow-dot"></span>
                <span>CURRICULUM VITAE</span>
              </div>
              <h2 id="resume-modal-title" className="resume-modal-title">
                Select <span className="serif-accent">Resume</span> Format
              </h2>
              <p className="resume-modal-subtitle">
                Choose the version tailored to your hiring platform or preview live on the site.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="resume-cards-grid">
              {/* ATS Option Card */}
              <div className="resume-card ats-card">
                <div className="card-badge ats-badge">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>ATS OPTIMIZED</span>
                </div>

                <div className="card-icon-wrapper">
                  <span className="material-symbols-outlined card-icon">description</span>
                </div>

                <div className="card-info">
                  <h3 className="card-title">ATS-Friendly / Recruiter CV</h3>
                  <p className="card-desc">Standard structured format designed for job portals & automated applicant tracking parsers.</p>
                </div>

                <div className="card-specs">
                  <span className="spec-tag">PDF • 50 KB</span>
                  <span className="spec-tag highlight">Single-Column</span>
                  <span className="spec-tag">Fast Parsing</span>
                </div>

                <ul className="card-points">
                  <li>
                    <span className="material-symbols-outlined point-icon">check_circle</span>
                    <span>100% compliant with ATS screening systems (Greenhouse, Lever, Workday)</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined point-icon">check_circle</span>
                    <span>Clean keyword-focused layout & accessible plain text hierarchy</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined point-icon">check_circle</span>
                    <span>Lightweight, streamlined document for instant downloading</span>
                  </li>
                </ul>

                <div className="card-actions">
                  <a
                    href={atsResumeUrl}
                    download="Husnain_Faisal_Resume_Premium.pdf"
                    className="resume-btn primary-resume-btn"
                    onClick={onClose}
                  >
                    <span className="material-symbols-outlined">download</span>
                    <span>Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewDoc('ats')}
                    className="resume-btn secondary-resume-btn"
                    title="Live preview on this site"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Designed Option Card */}
              <div className="resume-card designed-card">
                <div className="card-badge designed-badge">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  <span>CREATIVE EDITION</span>
                </div>

                <div className="card-icon-wrapper designed-icon-bg">
                  <span className="material-symbols-outlined card-icon">palette</span>
                </div>

                <div className="card-info">
                  <h3 className="card-title">Visual & Designed CV</h3>
                  <p className="card-desc">Custom formatted showcase edition highlighting visual hierarchy, branding, and typography.</p>
                </div>

                <div className="card-specs">
                  <span className="spec-tag">PDF • 1.18 MB</span>
                  <span className="spec-tag highlight">Visual Layout</span>
                  <span className="spec-tag">Cinematic</span>
                </div>

                <ul className="card-points">
                  <li>
                    <span className="material-symbols-outlined point-icon">check_circle</span>
                    <span>High-impact visual presentation for direct human and portfolio reviews</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined point-icon">check_circle</span>
                    <span>Rich typography, structured sections, and aesthetic polish</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined point-icon">check_circle</span>
                    <span>Ideal for freelance clients, team leads, and creative directors</span>
                  </li>
                </ul>

                <div className="card-actions">
                  <a
                    href={designedResumeUrl}
                    download="Husnain_Faisal_Resume_Designed.pdf"
                    className="resume-btn primary-resume-btn designed-action"
                    onClick={onClose}
                  >
                    <span className="material-symbols-outlined">download</span>
                    <span>Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewDoc('designed')}
                    className="resume-btn secondary-resume-btn"
                    title="Live preview on this site"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="resume-modal-footer">
              <span className="material-symbols-outlined footer-info-icon">info</span>
              <span>Click <strong>Preview</strong> to inspect either version live on the site, or <strong>Download</strong> to save immediately.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;

import './AboutModal.css';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="about-modal-overlay" onClick={onClose}>
      <div className="about-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="about-close-button" onClick={onClose}>×</button>

        <h2 className="about-title">About PM Simulator</h2>

        <div className="about-body">
          <p className="about-text">Created by</p>
          <a
            href="https://x.com/danielbressner"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            <span className="twitter-icon">𝕏</span>
            <span className="author-name">Dan Bressner</span>
          </a>
        </div>

        <div className="about-footer">
          <p className="about-description">
            A game about doing more with less
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;

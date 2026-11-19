import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { profile } from './profile';
import PageContent from './PageContent';
import './styles.css';

const socialLinks = [
  { key: 'scholar', label: 'Google Scholar', icon: SiGooglescholar },
  { key: 'github', label: 'GitHub', icon: FaGithub },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
];

const pageNames = { research: 'Research', work: 'Work', teaching: 'Teaching', projects: 'Projects' };

function currentPage() {
  const page = window.location.hash.slice(1);
  return Object.hasOwn(pageNames, page) ? page : 'home';
}

function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);
  const [progress, setProgress] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    const navigate = () => setPage(currentPage());
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);

  useEffect(() => {
    document.title = page === 'home' ? profile.name : `${pageNames[page]} | ${profile.name}`;
    document.getElementById('page-title')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? window.scrollY / distance : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    const observer = new ResizeObserver(updateProgress);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main')?.focus();
      }}>Skip to content</a>
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="header-name" href="#home" aria-label={`${profile.name}, home`}>{profile.name}</a>
          <nav className="header-nav" aria-label="Main navigation">
            {Object.entries(pageNames).map(([id, label]) => (
              <a className="header-link" key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined}>{label}</a>
            ))}
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
            </button>
          </nav>
        </div>
        <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <main id="main" className="container about-page" tabIndex={-1}>
        <aside className="profile" aria-label="Profile photo and links">
          {profile.photo && !photoFailed ? (
            <img className="portrait" src={profile.photo} alt={profile.name} width="320" height="320" onError={() => setPhotoFailed(true)} />
          ) : (
            <div className="portrait portrait-placeholder" role="img" aria-label="Profile photo coming soon">
              <span>{profile.initials}</span>
            </div>
          )}
          <div className="profile-links" aria-label="Professional profiles">
            {socialLinks.map(({ key, label, icon: Icon }) => profile.links[key] ? (
              <a key={key} href={profile.links[key]} aria-label={label} title={label} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" />
              </a>
            ) : (
              <span key={key} className="pending-link" role="img" aria-label={`${label} link coming soon`} title={`${label} link coming soon`}>
                <Icon aria-hidden="true" />
              </span>
            ))}
            {profile.links.cv ? (
              <a className="cv-mark" href={profile.links.cv} target="_blank" rel="noopener noreferrer" aria-label="Open CV in a new tab">CV</a>
            ) : (
              <span className="cv-mark pending-link" title="CV coming soon" aria-label="CV coming soon">CV</span>
            )}
          </div>
          {profile.email && <div className="contact">
            <a href={`mailto:${profile.email}`}>{profile.email.replace('@', ' [at] ')}</a>
          </div>}
        </aside>

        <div className="about-content">
          <PageContent page={page} />
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);

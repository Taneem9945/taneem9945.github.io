import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { profile } from './profile';
import './styles.css';

const socialLinks = [
  { key: 'scholar', label: 'Google Scholar', icon: SiGooglescholar },
  { key: 'github', label: 'GitHub', icon: FaGithub },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
];

function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);
  const [progress, setProgress] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [publicationSort, setPublicationSort] = useState('year');

  const sortedPublications = [...profile.publications].sort((first, second) => {
    const yearDifference = (Number(second.year) || 0) - (Number(first.year) || 0);
    const citationDifference = (second.citations ?? 0) - (first.citations ?? 0);
    return publicationSort === 'citations'
      ? citationDifference || yearDifference
      : yearDifference || citationDifference;
  });

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
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="container topbar-inner">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
          </button>
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
          <header className="intro">
            <h1>{profile.name}</h1>
            {profile.affiliation && <p className="affiliation">{profile.affiliationUrl ? <a href={profile.affiliationUrl}>{profile.affiliation}</a> : profile.affiliation}</p>}
          </header>
          <div className="biography">
            {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {profile.news.length > 0 && <section aria-labelledby="news-title">
            <h2 id="news-title">News</h2>
            <dl className="news-list">
              {profile.news.map((item) => (
                <div className="news-item" key={`${item.date}-${item.text}`}>
                  <dt><time dateTime={item.date}>{new Date(`${item.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</time></dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </section>}

          <section aria-labelledby="publications-title">
            <div className="publications-heading">
              <h2 id="publications-title">Publications</h2>
              {profile.publications.length > 0 && <div className="publication-sort">
                <label htmlFor="publication-sort">Sort by</label>
                <select id="publication-sort" value={publicationSort} onChange={(event) => setPublicationSort(event.target.value)} aria-controls="publication-list">
                  <option value="year">Year (newest first)</option>
                  <option value="citations">Citations (highest first)</option>
                </select>
              </div>}
            </div>
            {profile.links.scholar && <p>For the full list of publications, see my <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer">Google Scholar profile</a>.</p>}
            {profile.publications.length > 0 ? (
              <ol id="publication-list" className="publications">
                {sortedPublications.map((publication) => (
                  <li className="publication" key={publication.title}>
                    <div><span className="venue-badge">{publication.venue}</span></div>
                    <div>
                      <div className="publication-title">{publication.url ? <a href={publication.url} target="_blank" rel="noopener noreferrer">{publication.title}</a> : publication.title}</div>
                      <div><em>{publication.venue} {publication.year}</em></div>
                      {publication.citations != null && <div className="publication-citations">Cited by {publication.citations}</div>}
                      {publication.note && <div className="publication-note">{publication.note}</div>}
                    </div>
                  </li>
                ))}
              </ol>
            ) : <p className="placeholder-copy">Publications will be added here.</p>}
          </section>
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);

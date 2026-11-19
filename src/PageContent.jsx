import { profile } from './profile';
import content from './assets/content.json';
import Publications from './Publications';

export default function PageContent({ page }) {
  if (page === 'research') {
    return <>
      <h1 id="page-title" tabIndex={-1}>Research</h1>
      <p>{content.research.overview}</p>
      <ul className="research-interests">
        {content.research.interests.map((interest) => <li key={interest}>{interest}</li>)}
      </ul>
      <Publications publications={profile.publications} scholarUrl={profile.links.scholar} />
    </>;
  }

  if (page === 'work') {
    return <>
      <h1 id="page-title" tabIndex={-1}>Work</h1>
      {content.work.map((position) => <article className="content-entry" key={`${position.role}-${position.organization}`}>
        <h2>{position.role}</h2>
        <p className="entry-organization">{position.organization}</p>
        <p className="entry-period">{position.period}</p>
        <p>{position.description}</p>
      </article>)}
      {profile.links.cv && <p><a href={profile.links.cv} target="_blank" rel="noopener noreferrer">Download résumé (PDF)</a></p>}
    </>;
  }

  if (page === 'teaching') {
    return <>
      <h1 id="page-title" tabIndex={-1}>Teaching</h1>
      <p className="entry-organization">{content.teaching.role}, {content.teaching.organization}</p>
      <p className="entry-period">{content.teaching.period}</p>
      {content.teaching.philosophy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <h2>Courses</h2>
      <ul className="course-list">
        {content.teaching.courses.map((course) => <li key={course.code}><strong>{course.code}</strong> — {course.title}</li>)}
      </ul>
    </>;
  }

  if (page === 'projects') {
    return <>
      <h1 id="page-title" tabIndex={-1}>Projects</h1>
      {content.projects.map((project) => <article className="content-entry" key={project.name}>
        <h2>{project.name}</h2>
        <p className="entry-period">{project.period}</p>
        <p>{project.description}</p>
        <p className="project-technologies">{project.technologies}</p>
      </article>)}
    </>;
  }

  return <>
    <header className="intro">
      <h1 id="page-title" tabIndex={-1}>{profile.name}</h1>
      {profile.affiliation && <p className="affiliation">{profile.affiliationUrl ? <a href={profile.affiliationUrl}>{profile.affiliation}</a> : profile.affiliation}</p>}
    </header>
    <div className="biography">
      {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
    <Publications publications={profile.publications} scholarUrl={profile.links.scholar} />
  </>;
}

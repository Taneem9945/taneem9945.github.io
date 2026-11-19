import { useState } from 'react';

export default function Publications({ publications, scholarUrl }) {
  const [sortBy, setSortBy] = useState('year');
  const sortedPublications = [...publications].sort((first, second) => {
    const yearDifference = (Number(second.year) || 0) - (Number(first.year) || 0);
    const citationDifference = (second.citations ?? 0) - (first.citations ?? 0);
    return sortBy === 'citations'
      ? citationDifference || yearDifference
      : yearDifference || citationDifference;
  });

  return (
    <section aria-labelledby="publications-title">
      <div className="publications-heading">
        <h2 id="publications-title">Publications</h2>
        {publications.length > 0 && <div className="publication-sort">
          <label htmlFor="publication-sort">Sort by</label>
          <select id="publication-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-controls="publication-list">
            <option value="year">Year (newest first)</option>
            <option value="citations">Citations (highest first)</option>
          </select>
        </div>}
      </div>
      {scholarUrl && <p>For the full list of publications, see my <a href={scholarUrl} target="_blank" rel="noopener noreferrer">Google Scholar profile</a>.</p>}
      {publications.length > 0 ? (
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
  );
}

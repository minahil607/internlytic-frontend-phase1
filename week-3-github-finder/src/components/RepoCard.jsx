export default function RepoCard({ repo }) {
  const { name, description, language, stargazers_count, html_url } = repo;
  return (
    <li className="repo">
      <h3>
        <a href={html_url} target="_blank" rel="noopener noreferrer">{name}</a>
      </h3>
      {description && <p>{description}</p>}
      <div className="repo-meta">
        {language && <span className="lang">{language}</span>}
        <span aria-label={`${stargazers_count} stars`}>★ {stargazers_count}</span>
      </div>
    </li>
  );
}

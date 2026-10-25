export default function ProfileCard({ profile }) {
  const { avatar_url, login, name, bio, location, company, html_url, public_repos, followers, following } = profile;

  return (
    <section className="profile" aria-label={`Profile of ${login}`}>
      <img src={avatar_url} alt={`${login}'s avatar`} width="120" height="120" />
      <div className="profile-info">
        <h2>{name || login}</h2>
        <p className="login">
          <a href={html_url} target="_blank" rel="noopener noreferrer">@{login}</a>
        </p>
        {/* Optional fields are hidden when GitHub does not return them */}
        {bio && <p className="bio">{bio}</p>}
        <ul className="meta">
          {location && <li>Location: {location}</li>}
          {company && <li>Company: {company}</li>}
        </ul>
        <dl className="stats">
          <div><dt>Repositories</dt><dd>{public_repos}</dd></div>
          <div><dt>Followers</dt><dd>{followers}</dd></div>
          <div><dt>Following</dt><dd>{following}</dd></div>
        </dl>
      </div>
    </section>
  );
}

import RepoCard from "./RepoCard.jsx";

export default function RepoList({ repos, total, login }) {
  return (
    <section className="repos" aria-labelledby="repos-title">
      <h2 id="repos-title">Latest repositories</h2>
      {repos.length === 0 ? (
        <p className="empty">{login} has no public repositories yet.</p>
      ) : (
        <>
          <ul>
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </ul>
          {total > repos.length && (
            <p className="more">
              Showing {repos.length} of {total}.{" "}
              <a href={`https://github.com/${encodeURIComponent(login)}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                View all on GitHub
              </a>
            </p>
          )}
        </>
      )}
    </section>
  );
}

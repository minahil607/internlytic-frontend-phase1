import { useRef, useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import RepoList from "./components/RepoList.jsx";
import Message from "./components/Message.jsx";
import { fetchProfile } from "./api.js";

export default function App() {
  // status: idle | loading | success | error
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  async function handleSearch(username) {
    // Cancel any earlier request so old results never replace newer ones.
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError(null);
    setData(null); // clear previous user's data immediately

    try {
      const result = await fetchProfile(username, controller.signal);
      if (controller.signal.aborted) return;
      setData(result);
      setStatus("success");
    } catch (err) {
      if (err.name === "AbortError") return;
      setError({ type: err.type || "unknown", message: err.message });
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>GitHub Profile Finder</h1>
        <p>Enter a GitHub username to see their public profile and latest repositories.</p>
        <SearchForm onSearch={handleSearch} loading={status === "loading"} />
      </header>

      <main aria-live="polite">
        {status === "idle" && (
          <Message title="Start with a username" text="Try searching for “torvalds” or “gaearon”." />
        )}
        {status === "loading" && (
          <div className="loading" role="status">
            <span className="spinner" aria-hidden="true" />
            Loading profile…
          </div>
        )}
        {status === "error" && (
          <Message
            tone="error"
            title={error.type === "not-found" ? "User not found" : "Could not load profile"}
            text={error.message}
          />
        )}
        {status === "success" && (
          <>
            <ProfileCard profile={data.profile} />
            <RepoList repos={data.repos} total={data.profile.public_repos} login={data.profile.login} />
          </>
        )}
      </main>

      <footer>Data from the GitHub REST API. Unauthenticated requests are rate-limited.</footer>
    </div>
  );
}

import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState("");

  // A <form> gives Enter-key support for free.
  function handleSubmit(e) {
    e.preventDefault();
    const username = value.trim();
    if (!username) {
      setHint("Please enter a GitHub username.");
      return;
    }
    setHint("");
    onSearch(username);
  }

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label htmlFor="username" className="sr-only">GitHub username</label>
      <input
        id="username"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. octocat"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck="false"
        aria-describedby="username-hint"
        aria-invalid={hint ? "true" : "false"}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching…" : "Search"}
      </button>
      <p id="username-hint" className="hint" role={hint ? "alert" : undefined}>{hint}</p>
    </form>
  );
}

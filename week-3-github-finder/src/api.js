const BASE = "https://api.github.com/users";

// Custom error so the UI can show a specific message for each failure.
export class ApiError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type; // "not-found" | "rate-limit" | "network" | "unknown"
  }
}

async function getJson(url, signal) {
  let res;
  try {
    res = await fetch(url, {
      signal,
      headers: { Accept: "application/vnd.github+json" },
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new ApiError("network", "Network error. Check your internet connection and try again.");
  }

  if (res.status === 404) {
    throw new ApiError("not-found", "No GitHub user found with that username.");
  }
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    const when = reset
      ? ` Try again around ${new Date(Number(reset) * 1000).toLocaleTimeString()}.`
      : " Please wait a while and try again.";
    throw new ApiError("rate-limit", "GitHub API rate limit reached." + when);
  }
  if (!res.ok) {
    throw new ApiError("unknown", `Something went wrong (status ${res.status}). Please try again.`);
  }
  return res.json();
}

export async function fetchProfile(username, signal) {
  const name = encodeURIComponent(username);
  // Run both requests in parallel for faster results.
  const [profile, repos] = await Promise.all([
    getJson(`${BASE}/${name}`, signal),
    getJson(`${BASE}/${name}/repos?sort=updated&per_page=30`, signal),
  ]);
  return { profile, repos };
}

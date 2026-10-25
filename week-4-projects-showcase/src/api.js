import { sampleProjects } from "./data/sampleProjects.js";

// Simulates a network call. In production, replace the body with a Supabase query
// (see README). Demo switches: add ?state=error or ?state=empty to the page URL.
export function fetchProjects() {
  const mode = new URLSearchParams(window.location.search).get("state");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === "error") return reject(new Error("Could not load projects."));
      if (mode === "empty") return resolve([]);
      // Only company-approved projects are ever public.
      resolve(sampleProjects.filter((p) => p.approvalStatus === "approved"));
    }, 900);
  });
}

// Only allow http(s) links so bad data can never inject javascript: URLs.
export function isValidUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export default function FilterControls({ tracks, active, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter by track">
      {tracks.map((t) => (
        <button key={t} className={`pill ${t === active ? "on" : ""}`} aria-pressed={t === active} onClick={() => onChange(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}

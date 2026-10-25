export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search" className="sr-only">Search by project title or intern name</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by project title or intern name"
        autoComplete="off"
      />
    </div>
  );
}

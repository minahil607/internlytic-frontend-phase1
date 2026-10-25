export default function Message({ title, text, tone = "info", children }) {
  return (
    <div className={`message ${tone}`} role={tone === "error" ? "alert" : "status"}>
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}

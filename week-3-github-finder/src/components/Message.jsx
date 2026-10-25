export default function Message({ title, text, tone = "info" }) {
  return (
    <div className={`message ${tone}`} role={tone === "error" ? "alert" : undefined}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

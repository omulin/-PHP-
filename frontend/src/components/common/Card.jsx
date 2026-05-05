export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
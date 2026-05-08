export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        background: "var(--color-bg-card, #ffffff)",
        border: "1px solid var(--color-border, #e5e7eb)",
        borderRadius: "var(--radius-lg, 16px)",
        padding: 16,
        boxShadow: "var(--shadow-card, 0 1px 2px rgba(0, 0, 0, 0.04))",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
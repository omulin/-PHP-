export default function FilterChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active
          ? "1px solid var(--color-primary-border, #93c5fd)"
          : "1px solid var(--color-border-strong, #d1d5db)",
        borderRadius: "var(--radius-sm, 10px)",
        padding: "7px 11px",
        background: active
          ? "var(--color-primary-soft, #dbeafe)"
          : "var(--color-bg-card, #ffffff)",
        color: active
          ? "var(--color-primary-text, #1d4ed8)"
          : "var(--color-text-soft, #374151)",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
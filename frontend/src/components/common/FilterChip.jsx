export default function FilterChip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: active ? "1px solid #93c5fd" : "1px solid #d1d5db",
        borderRadius: 10,
        padding: "7px 11px",
        background: active ? "#dbeafe" : "#ffffff",
        color: active ? "#1d4ed8" : "#374151",
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
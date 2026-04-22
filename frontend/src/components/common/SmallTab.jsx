export default function SmallTab({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? "1px solid #93c5fd" : "1px solid #d1d5db",
        borderRadius: 10,
        padding: "8px 12px",
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 1.2,
        cursor: "pointer",
        background: active ? "#dbeafe" : "#ffffff",
        color: active ? "#1d4ed8" : "#374151",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
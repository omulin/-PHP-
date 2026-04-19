export default function SmallTab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: 10,
        padding: "8px 14px",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        background: active ? "#4f8fe7" : "#e5e7eb",
        color: active ? "#ffffff" : "#374151",
      }}
    >
      {children}
    </button>
  );
}